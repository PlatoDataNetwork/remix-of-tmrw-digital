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
    const slugsParam = url.searchParams.get("slugs");

    if (!slugsParam) {
      return new Response(
        JSON.stringify({ success: false, error: "slugs parameter is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const slugs = slugsParam.split(",").slice(0, 15); // max 15 per request
    const counts: Record<string, number> = {};

    const results = await Promise.allSettled(
      slugs.map(async (slug) => {
        try {
          const res = await fetch(`https://www.platodata.io/feed/${slug.trim()}.json`);
          if (res.ok) {
            const json = await res.json();
            const count = Array.isArray(json)
              ? json.length
              : json?.items?.length || json?.articles?.length || json?.channel?.item?.length || 0;
            counts[slug.trim()] = count;
          } else {
            counts[slug.trim()] = 0;
          }
        } catch {
          counts[slug.trim()] = 0;
        }
      })
    );

    return new Response(
      JSON.stringify({ success: true, counts }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching feed counts:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
