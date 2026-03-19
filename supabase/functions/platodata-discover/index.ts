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
      return new Response(JSON.stringify({ error: "Missing PlatoData credentials" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const plato = createClient(platoUrl, platoKey);

    // Try to discover tables by querying common table names
    const tableNames = ["articles", "feeds", "verticals", "categories", "posts", "entries", "feed_items", "content", "news", "items"];
    const results: Record<string, any> = {};

    for (const table of tableNames) {
      try {
        const { data, error, count } = await plato
          .from(table)
          .select("*", { count: "exact" })
          .limit(2);
        
        if (!error) {
          results[table] = {
            exists: true,
            count,
            sample: data,
            columns: data && data.length > 0 ? Object.keys(data[0]) : [],
          };
        } else {
          results[table] = { exists: false, error: error.message };
        }
      } catch (e) {
        results[table] = { exists: false, error: String(e) };
      }
    }

    return new Response(JSON.stringify(results, null, 2), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
