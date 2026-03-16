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
    const format = url.searchParams.get("format") || "json"; // json, xml, api
    const apiKey = url.searchParams.get("api_key") || req.headers.get("X-API-Key");

    if (!vertical) {
      return new Response(
        JSON.stringify({ success: false, error: "vertical parameter is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // For API format, validate API key
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
    }

    const slug = vertical.toLowerCase().replace(/\s+/g, "-");
    const ext = format === "xml" ? "xml" : "json";
    const platoUrl = `https://www.platodata.io/feed/${slug}.${ext}`;

    console.log(`Fetching feed: ${platoUrl}`);

    const response = await fetch(platoUrl);

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
  } catch (error) {
    console.error("Error proxying feed:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
