import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const psiApiKey = Deno.env.get("GOOGLE_PSI_API_KEY");
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    if (!psiApiKey) {
      return new Response(
        JSON.stringify({ error: "GOOGLE_PSI_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get config
    const { data: config } = await supabase
      .from("psi_alert_config")
      .select("*")
      .eq("id", 1)
      .single();

    if (!config || !config.is_enabled) {
      return new Response(
        JSON.stringify({ message: "Scheduled PSI audits are disabled" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { target_url, strategy, performance_threshold, accessibility_threshold, best_practices_threshold, seo_threshold } = config;

    // Run PSI audit
    const params = new URLSearchParams({ url: target_url, strategy, key: psiApiKey });
    ["PERFORMANCE", "ACCESSIBILITY", "BEST_PRACTICES", "SEO"].forEach((c) =>
      params.append("category", c)
    );

    const psiRes = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`
    );
    const data = await psiRes.json();

    if (!psiRes.ok || data.error) {
      const errMsg = data.error?.message || `PSI API returned ${psiRes.status}`;
      return new Response(
        JSON.stringify({ error: errMsg }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const cats = data.lighthouseResult?.categories;
    const audits = data.lighthouseResult?.audits;
    if (!cats) {
      return new Response(
        JSON.stringify({ error: "No categories in PSI response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const scores = {
      performance_score: cats.performance?.score ?? null,
      accessibility_score: cats.accessibility?.score ?? null,
      best_practices_score: cats["best-practices"]?.score ?? null,
      seo_score: cats.seo?.score ?? null,
    };

    const metrics = {
      fcp_ms: audits?.["first-contentful-paint"]?.numericValue ?? null,
      lcp_ms: audits?.["largest-contentful-paint"]?.numericValue ?? null,
      tbt_ms: audits?.["total-blocking-time"]?.numericValue ?? null,
      cls: audits?.["cumulative-layout-shift"]?.numericValue ?? null,
      speed_index_ms: audits?.["speed-index"]?.numericValue ?? null,
      tti_ms: audits?.["interactive"]?.numericValue ?? null,
    };

    // Check thresholds and generate alerts
    const alerts: { category: string; score: number; threshold: number }[] = [];
    const thresholdMap: Record<string, { score: number | null; threshold: number }> = {
      Performance: { score: scores.performance_score, threshold: performance_threshold },
      Accessibility: { score: scores.accessibility_score, threshold: accessibility_threshold },
      "Best Practices": { score: scores.best_practices_score, threshold: best_practices_threshold },
      SEO: { score: scores.seo_score, threshold: seo_threshold },
    };

    for (const [category, { score, threshold }] of Object.entries(thresholdMap)) {
      if (score !== null && score < threshold) {
        alerts.push({ category, score, threshold });
      }
    }

    // Store result
    const { error: insertError } = await supabase.from("psi_audit_history").insert({
      url: target_url,
      strategy,
      ...scores,
      ...metrics,
      is_scheduled: true,
      alerts: alerts.length > 0 ? alerts : [],
    });

    if (insertError) {
      console.error("Failed to insert PSI audit:", insertError);
    }

    return new Response(
      JSON.stringify({
        message: "Audit complete",
        scores,
        alerts,
        alertCount: alerts.length,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Scheduled PSI audit error:", e);
    return new Response(
      JSON.stringify({ error: e.message || "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
