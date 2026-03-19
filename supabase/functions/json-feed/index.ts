import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://www.tmrw-digital.com";
const SITE_NAME = "The Tomorrow Company";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const vertical = url.searchParams.get("vertical");

    if (!vertical) {
      const jsonFeed = {
        version: "https://jsonfeed.org/version/1.1",
        title: `${SITE_NAME} Feed`,
        home_page_url: `${SITE_URL}/data-feeds`,
        feed_url: `${SITE_URL}/feed.json`,
        description: "Web3 Infrastructure, AI Analytics, and Real World Asset Tokenization",
        icon: `${SITE_URL}/favicon.png`,
        favicon: `${SITE_URL}/favicon.ico`,
        language: "en-US",
        authors: [{ name: SITE_NAME, url: SITE_URL }],
        items: [],
      };
      return new Response(JSON.stringify(jsonFeed, null, 2), {
        headers: { ...corsHeaders, "Content-Type": "application/feed+json; charset=utf-8", "Cache-Control": "public, max-age=1800" },
      });
    }

    // Connect to PlatoData Supabase
    const platoUrl = Deno.env.get("PLATODATA_SUPABASE_URL");
    const platoKey = Deno.env.get("PLATODATA_ANON_KEY");

    if (!platoUrl || !platoKey) {
      // Fallback to HTTP proxy
      const slug = vertical.toLowerCase().replace(/\s+/g, "-");
      const platoFeedUrl = `https://www.platodata.io/feed/${slug}.json`;
      const response = await fetch(platoFeedUrl);
      if (!response.ok) {
        return new Response(JSON.stringify({ error: `Feed not found for ${vertical}` }), {
          status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      let body = await response.text();
      body = body.replace(/platodata\.io/g, "tmrw-digital.com").replace(/PlatoData/g, SITE_NAME);
      return new Response(body, {
        headers: { ...corsHeaders, "Content-Type": "application/feed+json; charset=utf-8", "Cache-Control": "public, max-age=1800" },
      });
    }

    const plato = createClient(platoUrl, platoKey);
    const slug = vertical.toLowerCase().replace(/\s+/g, "-");

    const { data: articles, error } = await plato
      .from("articles")
      .select("id, title, excerpt, content, author, published_at, external_url, image_url")
      .eq("vertical_slug", slug)
      .order("published_at", { ascending: false })
      .limit(50);

    if (error || !articles) {
      return new Response(JSON.stringify({ error: `Feed not found for ${vertical}` }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const verticalName = slug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());

    const jsonFeed = {
      version: "https://jsonfeed.org/version/1.1",
      title: `${SITE_NAME} - ${verticalName}`,
      home_page_url: `${SITE_URL}/data-feeds`,
      feed_url: `${SITE_URL}/${slug}.json`,
      description: `Latest ${verticalName} news from ${SITE_NAME}`,
      icon: `${SITE_URL}/favicon.png`,
      language: "en-US",
      authors: [{ name: SITE_NAME, url: SITE_URL }],
      items: articles.map((a: any) => ({
        id: a.id,
        title: a.title,
        summary: a.excerpt || "",
        content_html: (a.content || "")
          .replace(/https?:\/\/www\.platodata\.io/g, SITE_URL)
          .replace(/platodata\.io/g, "tmrw-digital.com")
          .replace(/PlatoData/g, SITE_NAME),
        url: (a.external_url || SITE_URL)
          .replace(/https?:\/\/www\.platodata\.io/g, SITE_URL),
        date_published: a.published_at,
        image: a.image_url || undefined,
        authors: [{ name: a.author === "PlatoData" ? SITE_NAME : (a.author || SITE_NAME) }],
      })),
    };

    return new Response(JSON.stringify(jsonFeed, null, 2), {
      headers: { ...corsHeaders, "Content-Type": "application/feed+json; charset=utf-8", "Cache-Control": "public, max-age=1800" },
    });
  } catch (error) {
    console.error("JSON feed error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate JSON feed" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
