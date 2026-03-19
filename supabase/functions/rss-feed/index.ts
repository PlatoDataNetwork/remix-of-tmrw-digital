import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://www.tmrw-digital.com";
const SITE_NAME = "The Tomorrow Company";
const SITE_DESCRIPTION = "Web3 Infrastructure, AI Analytics, and Real World Asset Tokenization";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const vertical = url.searchParams.get("vertical");

    if (!vertical) {
      const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} Feed</title>
    <link>${SITE_URL}/data-feeds</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/favicon.png</url>
      <title>${SITE_NAME}</title>
      <link>${SITE_URL}</link>
    </image>
  </channel>
</rss>`;
      return new Response(rss, {
        headers: { ...corsHeaders, "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=1800" },
      });
    }

    // Connect to PlatoData Supabase directly
    const platoUrl = Deno.env.get("PLATODATA_SUPABASE_URL");
    const platoKey = Deno.env.get("PLATODATA_ANON_KEY");

    if (!platoUrl || !platoKey) {
      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Feed unavailable</title></channel></rss>`,
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/rss+xml" } }
      );
    }

    const plato = createClient(platoUrl, platoKey);
    const slug = vertical.toLowerCase().replace(/\s+/g, "-");

    const { data: articles, error } = await plato
      .from("articles")
      .select("id, title, excerpt, author, published_at, external_url, image_url, vertical_slug")
      .eq("vertical_slug", slug)
      .order("published_at", { ascending: false })
      .limit(50);

    if (error || !articles || articles.length === 0) {
      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Feed not found</title></channel></rss>`,
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/rss+xml" } }
      );
    }

    const verticalName = slug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} - ${escapeXml(verticalName)}</title>
    <link>${SITE_URL}/data-feeds</link>
    <description>Latest ${escapeXml(verticalName)} news and intelligence from ${escapeXml(SITE_NAME)}</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/${slug}.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/favicon.png</url>
      <title>${escapeXml(SITE_NAME)}</title>
      <link>${SITE_URL}</link>
    </image>
${articles.map((a: any) => {
  const authorName = a.author === "PlatoData" ? SITE_NAME : (a.author || SITE_NAME);
  const extUrl = (a.external_url || SITE_URL).replace(/https?:\/\/www\.platodata\.io/g, SITE_URL);
  return `    <item>
      <title>${escapeXml(a.title)}</title>
      <description>${escapeXml(a.excerpt || "")}</description>
      <link>${escapeXml(extUrl)}</link>
      <guid isPermaLink="false">${a.id}</guid>
      <pubDate>${new Date(a.published_at).toUTCString()}</pubDate>
      <author>${escapeXml(authorName)}</author>
    </item>`;
}).join("\n")}
  </channel>
</rss>`;

    return new Response(rssXml, {
      headers: { ...corsHeaders, "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=1800" },
    });
  } catch (error) {
    console.error("RSS feed error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate RSS feed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
