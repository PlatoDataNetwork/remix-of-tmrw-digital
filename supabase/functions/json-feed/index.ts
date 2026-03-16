const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://www.tmrw-digital.com";
const SITE_NAME = "The Tomorrow Company";
const SITE_DESCRIPTION = "Web3 Infrastructure, AI Analytics, and Real World Asset Tokenization";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const vertical = url.searchParams.get("vertical");

    if (!vertical) {
      // Global JSON feed
      const jsonFeed = {
        version: "https://jsonfeed.org/version/1.1",
        title: `${SITE_NAME} Feed`,
        home_page_url: `${SITE_URL}/data-feeds`,
        feed_url: `${SITE_URL}/feed.json`,
        description: SITE_DESCRIPTION,
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

    // Proxy to PlatoData feed for specific vertical
    const slug = vertical.toLowerCase().replace(/\s+/g, "-");
    const platoUrl = `https://www.platodata.io/feed/${slug}.json`;

    console.log(`Proxying JSON feed: ${platoUrl}`);
    const response = await fetch(platoUrl);

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `Feed not found for ${vertical}` }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let body = await response.text();
    // Replace PlatoData references with TMRW
    body = body.replace(/platodata\.io/g, "tmrw-digital.com");
    body = body.replace(/PlatoData/g, SITE_NAME);

    return new Response(body, {
      headers: { ...corsHeaders, "Content-Type": "application/feed+json; charset=utf-8", "Cache-Control": "public, max-age=1800" },
    });
  } catch (error) {
    console.error("JSON feed error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate JSON feed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
