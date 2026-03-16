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
      // Global feed — return a channel with links to vertical feeds
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

    // Proxy to PlatoData feed for specific vertical
    const slug = vertical.toLowerCase().replace(/\s+/g, "-");
    const platoUrl = `https://www.platodata.io/feed/${slug}.xml`;

    console.log(`Proxying RSS feed: ${platoUrl}`);
    const response = await fetch(platoUrl);

    if (!response.ok) {
      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Feed not found</title></channel></rss>`,
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/rss+xml" } }
      );
    }

    let body = await response.text();
    // Replace PlatoData references with TMRW
    body = body.replace(/platodata\.io/g, "tmrw-digital.com");
    body = body.replace(/PlatoData/g, SITE_NAME);

    return new Response(body, {
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
