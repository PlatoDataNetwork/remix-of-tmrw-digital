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
    const platoUrl = Deno.env.get("PLATODATA_SUPABASE_URL");
    const platoKey = Deno.env.get("PLATODATA_ANON_KEY");

    if (!platoUrl || !platoKey) {
      return new Response(
        JSON.stringify({ success: false, error: "PlatoData credentials not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const url = new URL(req.url);
    const slugsParam = url.searchParams.get("slugs");

    if (!slugsParam) {
      return new Response(
        JSON.stringify({ success: false, error: "slugs parameter is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const slugs = slugsParam.split(",").slice(0, 15);
    const plato = createClient(platoUrl, platoKey);
    const counts: Record<string, number> = {};

    const results = await Promise.allSettled(
      slugs.map(async (slug) => {
        const trimmed = slug.trim();
        try {
          const { count, error } = await plato
            .from("articles")
            .select("id", { count: "exact", head: true })
            .eq("vertical_slug", trimmed);

          counts[trimmed] = error ? 0 : (count || 0);
        } catch {
          counts[trimmed] = 0;
        }
      })
    );

    return new Response(
      JSON.stringify({ success: true, counts }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=1800",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching feed counts:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
