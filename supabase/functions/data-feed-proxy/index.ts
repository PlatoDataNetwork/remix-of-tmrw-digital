import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const vertical = url.searchParams.get("vertical");
    const format = url.searchParams.get("format") || "json";
    const apiKey = url.searchParams.get("api_key") || req.headers.get("X-API-Key");

    if (!vertical) {
      return new Response(
        JSON.stringify({ success: false, error: "vertical parameter is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // For API format, validate API key and log usage
    if (format === "api") {
      if (!apiKey) {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid or missing API key" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data: keyData, error: keyError } = await supabase
        .from("api_keys")
        .select("id, is_active")
        .eq("api_key", apiKey)
        .eq("is_active", true)
        .maybeSingle();

      if (keyError || !keyData) {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid or missing API key" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // --- Log API usage ---
      const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
        || req.headers.get("cf-connecting-ip")
        || req.headers.get("x-real-ip")
        || "unknown";
      const countryCode = req.headers.get("cf-ipcountry") || null;

      await supabase.from("api_usage_logs").insert({
        api_key_id: keyData.id,
        endpoint: `/data-feed-proxy?vertical=${vertical}&format=${format}`,
        method: req.method,
        ip_address: clientIp,
        country_code: countryCode,
        status_code: 200,
      });
    }

    // --- Fetch from PlatoData Supabase directly ---
    const platoUrl = Deno.env.get("PLATODATA_SUPABASE_URL");
    const platoKey = Deno.env.get("PLATODATA_ANON_KEY");

    if (!platoUrl || !platoKey) {
      // Fallback to HTTP feed proxy
      const slug = vertical.toLowerCase().replace(/\s+/g, "-");
      const ext = format === "xml" ? "xml" : "json";
      const platoFeedUrl = `https://www.platodata.io/feed/${slug}.${ext}`;

      console.log(`Fallback - Fetching feed: ${platoFeedUrl}`);
      const response = await fetch(platoFeedUrl);

      if (!response.ok) {
        return new Response(
          JSON.stringify({ success: false, error: `Feed not found for ${vertical}` }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const contentType = format === "xml" ? "application/xml" : "application/json";
      const body = await response.text();

      return new Response(body, {
        headers: { ...corsHeaders, "Content-Type": contentType },
      });
    }

    // Direct database access
    const plato = createClient(platoUrl, platoKey);
    const slug = vertical.toLowerCase().replace(/\s+/g, "-");
    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") || "20", 10)));
    const offset = (page - 1) * limit;

    const [countResult, articlesResult] = await Promise.all([
      plato.from("articles").select("id", { count: "exact", head: true }).eq("vertical_slug", slug),
      plato.from("articles")
        .select("id, title, excerpt, content, author, published_at, read_time, image_url, external_url, vertical_slug")
        .eq("vertical_slug", slug)
        .order("published_at", { ascending: false })
        .range(offset, offset + limit - 1),
    ]);

    const totalCount = countResult.count || 0;
    const articles = (articlesResult.data || []).map((a: any) => ({
      ...a,
      content: a.content?.replace(/https?:\/\/www\.platodata\.io/g, "https://www.tmrw-digital.com")
        .replace(/platodata\.io/g, "tmrw-digital.com")
        .replace(/PlatoData/g, "The Tomorrow Company") || "",
      author: a.author === "PlatoData" ? "The Tomorrow Company" : a.author,
      external_url: a.external_url?.replace(/https?:\/\/www\.platodata\.io/g, "https://www.tmrw-digital.com") || "",
    }));

    if (format === "xml") {
      const verticalName = slug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
      const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>The Tomorrow Company - ${verticalName}</title>
    <link>https://www.tmrw-digital.com/data-feeds</link>
    <description>Latest ${verticalName} news</description>
${articles.map((a: any) => `    <item>
      <title><![CDATA[${a.title}]]></title>
      <description><![CDATA[${a.excerpt || ""}]]></description>
      <link>${a.external_url}</link>
      <guid>${a.id}</guid>
      <pubDate>${new Date(a.published_at).toUTCString()}</pubDate>
    </item>`).join("\n")}
  </channel>
</rss>`;
      return new Response(rssXml, {
        headers: { ...corsHeaders, "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=1800" },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        vertical: slug,
        page,
        limit,
        total: totalCount,
        total_pages: Math.ceil(totalCount / limit),
        articles,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, max-age=300" },
      }
    );
  } catch (error) {
    console.error("Error proxying feed:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
