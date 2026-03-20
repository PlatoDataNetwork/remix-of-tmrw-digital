import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface HeaderCheck {
  id: string;
  name: string;
  category: "transport" | "headers" | "content" | "cookies";
  description: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  passed: boolean;
  value: string | null;
  recommendation: string;
}

function checkHeaders(headers: Headers, url: string, body: string): HeaderCheck[] {
  const checks: HeaderCheck[] = [];

  // --- Transport Security ---
  checks.push({
    id: "https",
    name: "HTTPS Enabled",
    category: "transport",
    description: "Site is served over a secure HTTPS connection",
    severity: "critical",
    passed: url.startsWith("https://"),
    value: url.startsWith("https://") ? "Yes" : "No",
    recommendation: "Ensure all traffic is served over HTTPS with a valid TLS certificate.",
  });

  const hsts = headers.get("strict-transport-security");
  checks.push({
    id: "hsts",
    name: "HTTP Strict Transport Security",
    category: "transport",
    description: "Forces browsers to use HTTPS for all future requests",
    severity: "high",
    passed: !!hsts,
    value: hsts || "Not set",
    recommendation: "Add Strict-Transport-Security header with max-age of at least 31536000 and includeSubDomains.",
  });

  const hstsMaxAge = hsts ? parseInt(hsts.match(/max-age=(\d+)/)?.[1] || "0") : 0;
  checks.push({
    id: "hsts-duration",
    name: "HSTS Max-Age ≥ 1 Year",
    category: "transport",
    description: "HSTS max-age should be at least 31536000 seconds (1 year)",
    severity: "medium",
    passed: hstsMaxAge >= 31536000,
    value: hsts ? `${hstsMaxAge}s` : "N/A",
    recommendation: "Set max-age=31536000 or higher in your HSTS header.",
  });

  checks.push({
    id: "hsts-subdomains",
    name: "HSTS Includes Subdomains",
    category: "transport",
    description: "HSTS policy should cover all subdomains",
    severity: "medium",
    passed: !!hsts && hsts.toLowerCase().includes("includesubdomains"),
    value: hsts && hsts.toLowerCase().includes("includesubdomains") ? "Yes" : "No",
    recommendation: "Add includeSubDomains to your HSTS header.",
  });

  // --- Security Headers ---
  const csp = headers.get("content-security-policy");
  checks.push({
    id: "csp",
    name: "Content Security Policy",
    category: "headers",
    description: "Controls which resources the browser is allowed to load",
    severity: "high",
    passed: !!csp,
    value: csp ? (csp.length > 80 ? csp.substring(0, 80) + "…" : csp) : "Not set",
    recommendation: "Implement a Content-Security-Policy header to prevent XSS and data injection attacks.",
  });

  const xfo = headers.get("x-frame-options");
  checks.push({
    id: "x-frame-options",
    name: "X-Frame-Options",
    category: "headers",
    description: "Prevents clickjacking by controlling iframe embedding",
    severity: "high",
    passed: !!xfo,
    value: xfo || "Not set",
    recommendation: "Set X-Frame-Options to DENY or SAMEORIGIN to prevent clickjacking.",
  });

  const xcto = headers.get("x-content-type-options");
  checks.push({
    id: "x-content-type",
    name: "X-Content-Type-Options",
    category: "headers",
    description: "Prevents MIME-type sniffing attacks",
    severity: "medium",
    passed: xcto?.toLowerCase() === "nosniff",
    value: xcto || "Not set",
    recommendation: "Set X-Content-Type-Options: nosniff to prevent MIME sniffing.",
  });

  const xxss = headers.get("x-xss-protection");
  checks.push({
    id: "x-xss-protection",
    name: "X-XSS-Protection",
    category: "headers",
    description: "Legacy XSS protection header (deprecated but still recommended)",
    severity: "low",
    passed: !!xxss,
    value: xxss || "Not set",
    recommendation: "Set X-XSS-Protection: 1; mode=block (or rely on CSP for modern browsers).",
  });

  const refPol = headers.get("referrer-policy");
  checks.push({
    id: "referrer-policy",
    name: "Referrer Policy",
    category: "headers",
    description: "Controls how much referrer info is sent with requests",
    severity: "medium",
    passed: !!refPol,
    value: refPol || "Not set",
    recommendation: "Set Referrer-Policy to strict-origin-when-cross-origin or no-referrer.",
  });

  const permPol = headers.get("permissions-policy") || headers.get("feature-policy");
  checks.push({
    id: "permissions-policy",
    name: "Permissions Policy",
    category: "headers",
    description: "Controls which browser features and APIs can be used",
    severity: "medium",
    passed: !!permPol,
    value: permPol ? (permPol.length > 80 ? permPol.substring(0, 80) + "…" : permPol) : "Not set",
    recommendation: "Set Permissions-Policy to restrict access to sensitive browser features like camera, microphone, geolocation.",
  });

  const server = headers.get("server");
  checks.push({
    id: "server-header",
    name: "Server Header Hidden",
    category: "headers",
    description: "Server header should not reveal technology stack details",
    severity: "low",
    passed: !server || server.toLowerCase() === "cloudflare",
    value: server || "Not exposed",
    recommendation: "Remove or minimize the Server header to avoid revealing your technology stack.",
  });

  const xPowered = headers.get("x-powered-by");
  checks.push({
    id: "x-powered-by",
    name: "X-Powered-By Hidden",
    category: "headers",
    description: "Should not reveal server-side technology",
    severity: "low",
    passed: !xPowered,
    value: xPowered || "Not exposed",
    recommendation: "Remove the X-Powered-By header to prevent technology fingerprinting.",
  });

  // --- Content Security ---
  const hasMixedContent = body.includes('http://') && url.startsWith("https://");
  checks.push({
    id: "mixed-content",
    name: "No Mixed Content",
    category: "content",
    description: "No HTTP resources loaded on HTTPS pages",
    severity: "high",
    passed: !hasMixedContent,
    value: hasMixedContent ? "Potential mixed content detected" : "Clean",
    recommendation: "Ensure all resources (scripts, styles, images) are loaded over HTTPS.",
  });

  const hasInlineJS = /<script(?![^>]*src)[^>]*>/i.test(body);
  checks.push({
    id: "inline-scripts",
    name: "Minimal Inline Scripts",
    category: "content",
    description: "Inline scripts increase XSS risk; prefer external files",
    severity: "medium",
    passed: !hasInlineJS,
    value: hasInlineJS ? "Inline scripts detected" : "No inline scripts",
    recommendation: "Move inline JavaScript to external files and use CSP nonces or hashes.",
  });

  const coop = headers.get("cross-origin-opener-policy");
  checks.push({
    id: "coop",
    name: "Cross-Origin Opener Policy",
    category: "headers",
    description: "Isolates the browsing context from cross-origin documents",
    severity: "medium",
    passed: !!coop,
    value: coop || "Not set",
    recommendation: "Set Cross-Origin-Opener-Policy to same-origin for stronger isolation.",
  });

  const coep = headers.get("cross-origin-embedder-policy");
  checks.push({
    id: "coep",
    name: "Cross-Origin Embedder Policy",
    category: "headers",
    description: "Controls embedding of cross-origin resources",
    severity: "low",
    passed: !!coep,
    value: coep || "Not set",
    recommendation: "Set Cross-Origin-Embedder-Policy to require-corp for enhanced isolation.",
  });

  const corp = headers.get("cross-origin-resource-policy");
  checks.push({
    id: "corp",
    name: "Cross-Origin Resource Policy",
    category: "headers",
    description: "Protects resources from being loaded by other origins",
    severity: "low",
    passed: !!corp,
    value: corp || "Not set",
    recommendation: "Set Cross-Origin-Resource-Policy to same-origin or same-site.",
  });

  return checks;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    if (!url) {
      return new Response(
        JSON.stringify({ error: "Missing 'url' parameter" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch the target URL
    const siteRes = await fetch(url, {
      headers: {
        "User-Agent": "TMRW-Security-Audit/1.0",
        "Accept": "text/html",
      },
      redirect: "follow",
    });

    const body = await siteRes.text();
    const checks = checkHeaders(siteRes.headers, url, body);

    // Calculate category scores
    const categories: Record<string, { checks: HeaderCheck[]; score: number }> = {
      transport: { checks: [], score: 0 },
      headers: { checks: [], score: 0 },
      content: { checks: [], score: 0 },
    };

    for (const check of checks) {
      const cat = check.category === "cookies" ? "content" : check.category;
      if (!categories[cat]) categories[cat] = { checks: [], score: 0 };
      categories[cat].checks.push(check);
    }

    // Weight by severity
    const severityWeight: Record<string, number> = {
      critical: 4,
      high: 3,
      medium: 2,
      low: 1,
      info: 0,
    };

    for (const cat of Object.values(categories)) {
      if (cat.checks.length === 0) { cat.score = 1; continue; }
      let totalWeight = 0;
      let passedWeight = 0;
      for (const c of cat.checks) {
        const w = severityWeight[c.severity] || 1;
        totalWeight += w;
        if (c.passed) passedWeight += w;
      }
      cat.score = totalWeight > 0 ? passedWeight / totalWeight : 1;
    }

    // Overall score
    const allWeight = checks.reduce((s, c) => s + (severityWeight[c.severity] || 1), 0);
    const passWeight = checks.filter(c => c.passed).reduce((s, c) => s + (severityWeight[c.severity] || 1), 0);
    const overallScore = allWeight > 0 ? passWeight / allWeight : 1;

    const result = {
      url,
      fetchedAt: new Date().toISOString(),
      overallScore,
      totalChecks: checks.length,
      passed: checks.filter(c => c.passed).length,
      failed: checks.filter(c => !c.passed).length,
      categories: Object.fromEntries(
        Object.entries(categories).map(([k, v]) => [k, { score: v.score, total: v.checks.length, passed: v.checks.filter(c => c.passed).length }])
      ),
      checks,
      responseHeaders: Object.fromEntries([...siteRes.headers.entries()]),
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e.message || "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
