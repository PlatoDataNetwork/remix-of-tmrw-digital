const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://www.tmrw-digital.com";
const XSL_URL = `${SITE_URL}/sitemap.xsl`;

const SUPPORTED_LANGUAGES = [
  "ar","bn","zh-CN","da","nl","et","fi","fr","de","el","iw","hi",
  "hu","id","it","ja","km","ko","ms","no","fa","pl","pt","pa","ro","ru","sl",
  "es","sv","th","tr","uk","ur","vi"
];

const ALL_LANGUAGES = ["en", ...SUPPORTED_LANGUAGES];

const hreflangCode = (code: string): string => {
  const map: Record<string, string> = {
    "zh-CN": "zh-Hans",
    "iw": "he",
    "no": "nb",
  };
  return map[code] || code;
};

const generateHreflangLinks = (urlPath: string): string => {
  let links = "";
  for (const lc of ALL_LANGUAGES) {
    const href = lc === "en"
      ? `${SITE_URL}${urlPath}`
      : `${SITE_URL}/${lc}${urlPath}`;
    const hl = hreflangCode(lc);
    links += `    <xhtml:link rel="alternate" hreflang="${hl}" href="${href}" />\n`;
  }
  links += `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${urlPath}" />\n`;
  return links;
};

// All static pages on the site
const STATIC_PAGES = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/intel", changefreq: "hourly", priority: "0.9" },
  { path: "/rwas", changefreq: "weekly", priority: "0.8" },
  { path: "/data-feeds", changefreq: "daily", priority: "0.8" },
  { path: "/api-documentation", changefreq: "weekly", priority: "0.7" },
  { path: "/showcase", changefreq: "weekly", priority: "0.7" },
  { path: "/whitepaper", changefreq: "monthly", priority: "0.7" },
  { path: "/super-cloud", changefreq: "weekly", priority: "0.7" },
  { path: "/cut-token", changefreq: "weekly", priority: "0.7" },
  { path: "/security", changefreq: "monthly", priority: "0.6" },
  { path: "/rto", changefreq: "monthly", priority: "0.6" },
  { path: "/investors", changefreq: "monthly", priority: "0.6" },
  { path: "/investors/presentation", changefreq: "monthly", priority: "0.6" },
  { path: "/deck", changefreq: "monthly", priority: "0.5" },
  { path: "/corporate-deck", changefreq: "monthly", priority: "0.5" },
  { path: "/path-to-1b", changefreq: "monthly", priority: "0.5" },
  // Services
  { path: "/services/web3-ai", changefreq: "weekly", priority: "0.7" },
  { path: "/services/real-world-assets", changefreq: "weekly", priority: "0.7" },
  { path: "/services/data-intelligence", changefreq: "weekly", priority: "0.7" },
  { path: "/services/ai-analytics", changefreq: "weekly", priority: "0.7" },
  { path: "/services/cyber-defense", changefreq: "weekly", priority: "0.7" },
  { path: "/services/digital-strategy", changefreq: "weekly", priority: "0.7" },
  // Web3 AI
  { path: "/web3ai/ai-automation", changefreq: "weekly", priority: "0.7" },
  { path: "/web3ai/token-ecosystem", changefreq: "weekly", priority: "0.7" },
  { path: "/web3ai/cross-border-settlements", changefreq: "weekly", priority: "0.7" },
  { path: "/web3ai/rwa-infrastructure", changefreq: "weekly", priority: "0.7" },
  { path: "/web3ai/vertical-intelligence", changefreq: "weekly", priority: "0.7" },
  { path: "/web3ai/community-driven", changefreq: "weekly", priority: "0.7" },
  // RWA sectors
  { path: "/rwas/collectables", changefreq: "weekly", priority: "0.6" },
  { path: "/rwas/energy", changefreq: "weekly", priority: "0.6" },
  { path: "/rwas/metals", changefreq: "weekly", priority: "0.6" },
  { path: "/rwas/rare-earth", changefreq: "weekly", priority: "0.6" },
  { path: "/rwas/infrastructure", changefreq: "weekly", priority: "0.6" },
  { path: "/rwas/real-estate", changefreq: "weekly", priority: "0.6" },
  { path: "/rwas/commodities", changefreq: "weekly", priority: "0.6" },
  { path: "/rwas/carbon-credits", changefreq: "weekly", priority: "0.6" },
  { path: "/rwas/sovereign-wealth", changefreq: "weekly", priority: "0.6" },
  { path: "/rwas/stablecoins", changefreq: "weekly", priority: "0.6" },
  { path: "/rwas/tax-credits", changefreq: "weekly", priority: "0.6" },
  { path: "/rwas/utilities", changefreq: "weekly", priority: "0.6" },
  // Blog
  { path: "/blog/rwa-tokenization", changefreq: "monthly", priority: "0.6" },
  { path: "/blog/ai-investor-engagement", changefreq: "monthly", priority: "0.6" },
  { path: "/blog/pre-ipo-markets", changefreq: "monthly", priority: "0.6" },
  { path: "/blog/carbon-credits-tokenization", changefreq: "monthly", priority: "0.6" },
  { path: "/blog/commodities-tokenization", changefreq: "monthly", priority: "0.6" },
  { path: "/blog/energy-tokenization", changefreq: "monthly", priority: "0.6" },
  { path: "/blog/infrastructure-tokenization", changefreq: "monthly", priority: "0.6" },
  { path: "/blog/metals-tokenization", changefreq: "monthly", priority: "0.6" },
  { path: "/blog/rare-earth-tokenization", changefreq: "monthly", priority: "0.6" },
  { path: "/blog/real-estate-tokenization", changefreq: "monthly", priority: "0.6" },
  { path: "/blog/sovereign-wealth-tokenization", changefreq: "monthly", priority: "0.6" },
  { path: "/blog/tax-credits-tokenization", changefreq: "monthly", priority: "0.6" },
  { path: "/blog/collectables-tokenization", changefreq: "monthly", priority: "0.6" },
  { path: "/blog/stablecoins-tokenization", changefreq: "monthly", priority: "0.6" },
  { path: "/blog/utilities-tokenization", changefreq: "monthly", priority: "0.6" },
  { path: "/blog/tmrw-launch", changefreq: "monthly", priority: "0.6" },
];

// Feed verticals for vertical-sitemap
const FEED_VERTICALS = [
  "aerospace","ar-vr","artificial-intelligence","autism","automotive","aviation",
  "big-data","biotech","biotechnology","blockchain","cannabis","carbon","cleantech",
  "clinical-trials","code","crowdfunding","cyber-security","defense","ecommerce",
  "edtech","energy","environment","esg","esports","finance","financefeeds","fintech",
  "forex","gaming","hrtech","hydrogen","iot","medical-devices","music","nano-technology",
  "nfts","patents","payments","platohealth","private-equity","psychedelics","quantum",
  "real-estate","saas","semiconductor","seo","solar","spacs","startups","stem-cell",
  "supply-chain","trading","venture-capital","waste-management"
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.searchParams.get("path") || "sitemap.xml";
    const lang = url.searchParams.get("lang") || "";

    const langPrefix = lang ? `/${lang}` : "";
    const baseUrl = `${SITE_URL}${langPrefix}`;
    const today = new Date().toISOString().split("T")[0];

    const urlsetOpen = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

    const xmlResponse = (xml: string) =>
      new Response(xml, {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/xml; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      });

    // ── Main sitemap index ──
    if (path === "sitemap.xml") {
      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="${XSL_URL}"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/page-sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/vertical-sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
      return xmlResponse(xml);
    }

    // ── Page sitemap ──
    if (path === "page-sitemap.xml") {
      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="${XSL_URL}"?>
${urlsetOpen}
`;
      for (const p of STATIC_PAGES) {
        xml += `  <url>
    <loc>${baseUrl}${p.path === "/" ? "" : p.path}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
${generateHreflangLinks(p.path)}  </url>
`;
      }
      xml += `</urlset>`;
      return xmlResponse(xml);
    }

    // ── Vertical sitemap (data feed verticals) ──
    if (path === "vertical-sitemap.xml") {
      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="${XSL_URL}"?>
${urlsetOpen}
`;
      for (const slug of FEED_VERTICALS) {
        // Each vertical maps to the data-feeds page or a future vertical detail page
        const vPath = `/data-feeds`;
        xml += `  <url>
    <loc>${baseUrl}${vPath}</loc>
    <changefreq>hourly</changefreq>
    <priority>0.8</priority>
${generateHreflangLinks(vPath)}  </url>
`;
      }
      // Deduplicate — all verticals currently point to /data-feeds
      // Just emit one entry
      xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="${XSL_URL}"?>
${urlsetOpen}
`;
      for (const slug of FEED_VERTICALS) {
        xml += `  <url>
    <loc>${baseUrl}/feed/${slug}.xml</loc>
    <changefreq>hourly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/feed/${slug}.json</loc>
    <changefreq>hourly</changefreq>
    <priority>0.7</priority>
  </url>
`;
      }
      xml += `</urlset>`;
      return xmlResponse(xml);
    }

    return new Response("Not Found", { status: 404, headers: corsHeaders });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate sitemap" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
