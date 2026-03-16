const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://www.tmrw-digital.com";
const SITE_NAME = "The Tomorrow Company";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_DESCRIPTION =
  "The Tomorrow Company is a diversified Web3 infrastructure and digital asset holding company building the infrastructure for tomorrow's digital economy.";

const SUPPORTED_LANGS = [
  "en","ar","bn","zh-CN","da","nl","et","fi","fr","de","el","iw","hi",
  "hu","id","it","ja","km","ko","ms","no","fa","pl","pt","pa","ro","ru","sl",
  "es","sv","th","tr","uk","ur","vi"
];

// ── Page-specific metadata ──
const PAGE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "The Tomorrow Company — Web3 AI & Real World Assets",
    description: DEFAULT_DESCRIPTION,
  },
  "/intel": {
    title: "Intel — Real-Time Web3 & AI News",
    description: "Stay ahead with real-time intelligence across AI, blockchain, fintech, and 55+ emerging technology verticals.",
  },
  "/rwas": {
    title: "Real World Assets — RWA Tokenization",
    description: "Explore tokenized real world assets across energy, metals, real estate, carbon credits, and more.",
  },
  "/data-feeds": {
    title: "Data Feeds — RSS, JSON & API Access",
    description: "Subscribe to real-time RSS and JSON feeds across 55+ verticals. Access AI, Web3, and emerging tech data via authenticated API.",
  },
  "/api-documentation": {
    title: "API Documentation — Developer Access",
    description: "Integrate real-time data feeds into your platform with our authenticated REST API. JSON and XML formats available.",
  },
  "/showcase": {
    title: "Showcase — Live Web3 AI Integrations",
    description: "See our Web3 AI technology live across DeFi protocols, DEXs, and blockchain platforms.",
  },
  "/whitepaper": {
    title: "Whitepaper — Technical Vision",
    description: "Read the technical whitepaper outlining our Web3 infrastructure, AI analytics engine, and RWA tokenization framework.",
  },
  "/super-cloud": {
    title: "Super Cloud — Decentralized Infrastructure",
    description: "Next-generation decentralized cloud infrastructure powering Web3 applications at scale.",
  },
  "/cut-token": {
    title: "CUT Token — Utility Token Ecosystem",
    description: "The CUT token powers the Tomorrow Company ecosystem, enabling access to data feeds, AI analytics, and governance.",
  },
  "/security": {
    title: "Security — Enterprise-Grade Protection",
    description: "Our multi-layered security architecture protects digital assets and data across all infrastructure layers.",
  },
  "/rto": {
    title: "RTO — Reverse Takeover Strategy",
    description: "Strategic path to public markets through reverse takeover, unlocking institutional capital for Web3 infrastructure.",
  },
  "/investors": {
    title: "Investor Relations",
    description: "Investment opportunities in Web3 infrastructure, AI analytics, and real world asset tokenization.",
  },
  "/investors/presentation": {
    title: "Investor Presentation",
    description: "Detailed investor presentation covering market opportunity, technology stack, and growth strategy.",
  },
  "/deck": {
    title: "Pitch Deck",
    description: "The Tomorrow Company pitch deck — Web3 infrastructure, AI analytics, and RWA tokenization.",
  },
  "/corporate-deck": {
    title: "Corporate Deck",
    description: "Corporate overview of The Tomorrow Company's diversified Web3 and digital asset holdings.",
  },
  "/path-to-1b": {
    title: "Path to $1B — Growth Strategy",
    description: "Our strategic roadmap to building a billion-dollar Web3 infrastructure and digital asset holding company.",
  },
  "/legal": {
    title: "Legal — Terms & Policies",
    description: "Legal terms, privacy policy, and regulatory disclosures for The Tomorrow Company.",
  },
  // Services
  "/services/web3-ai": {
    title: "Web3 AI Services",
    description: "AI-powered Web3 solutions including smart contract automation, on-chain analytics, and decentralized intelligence.",
  },
  "/services/real-world-assets": {
    title: "Real World Asset Services",
    description: "End-to-end RWA tokenization services for energy, metals, real estate, carbon credits, and more.",
  },
  "/services/data-intelligence": {
    title: "Data Intelligence Services",
    description: "Real-time data intelligence across 55+ verticals powering investment decisions and market insights.",
  },
  "/services/ai-analytics": {
    title: "AI Analytics Services",
    description: "Advanced AI analytics for pattern recognition, sentiment analysis, and predictive modeling in Web3 markets.",
  },
  "/services/cyber-defense": {
    title: "Cyber Defense Services",
    description: "Enterprise-grade cybersecurity for blockchain infrastructure, smart contracts, and digital asset custody.",
  },
  "/services/digital-strategy": {
    title: "Digital Strategy Services",
    description: "Strategic consulting for Web3 adoption, tokenization roadmaps, and digital transformation.",
  },
  // Web3 AI
  "/web3ai/ai-automation": {
    title: "AI Automation — Web3 AI",
    description: "Automated AI workflows for smart contract deployment, on-chain monitoring, and decentralized governance.",
  },
  "/web3ai/token-ecosystem": {
    title: "Token Ecosystem — Web3 AI",
    description: "A comprehensive token ecosystem powering data access, governance, and cross-chain interoperability.",
  },
  "/web3ai/cross-border-settlements": {
    title: "Cross-Border Settlements — Web3 AI",
    description: "Instant cross-border settlement infrastructure leveraging blockchain for real-time global transactions.",
  },
  "/web3ai/rwa-infrastructure": {
    title: "RWA Infrastructure — Web3 AI",
    description: "Purpose-built infrastructure for tokenizing, trading, and managing real world assets on-chain.",
  },
  "/web3ai/vertical-intelligence": {
    title: "Vertical Intelligence — Web3 AI",
    description: "AI-driven vertical intelligence across 55+ sectors delivering actionable insights in real-time.",
  },
  "/web3ai/community-driven": {
    title: "Community Driven — Web3 AI",
    description: "Decentralized, consensus-driven AI network ensuring trust, transparency, and community governance.",
  },
  // RWA sectors
  "/rwas/collectables": {
    title: "Collectables — RWA Tokenization",
    description: "Tokenization of collectables, art, and luxury assets enabling fractional ownership and global liquidity.",
  },
  "/rwas/energy": {
    title: "Energy — RWA Tokenization",
    description: "Tokenized energy assets including renewable energy credits, power purchase agreements, and grid infrastructure.",
  },
  "/rwas/metals": {
    title: "Metals — RWA Tokenization",
    description: "Precious and industrial metals tokenization for gold, silver, platinum, and rare metals markets.",
  },
  "/rwas/rare-earth": {
    title: "Rare Earth — RWA Tokenization",
    description: "Tokenized rare earth elements powering the semiconductor, EV, and clean energy supply chains.",
  },
  "/rwas/infrastructure": {
    title: "Infrastructure — RWA Tokenization",
    description: "Tokenized infrastructure assets including bridges, highways, utilities, and public works.",
  },
  "/rwas/real-estate": {
    title: "Real Estate — RWA Tokenization",
    description: "Fractional real estate tokenization for commercial, residential, and industrial properties worldwide.",
  },
  "/rwas/commodities": {
    title: "Commodities — RWA Tokenization",
    description: "Tokenized commodity markets including agricultural products, oil, gas, and natural resources.",
  },
  "/rwas/carbon-credits": {
    title: "Carbon Credits — RWA Tokenization",
    description: "On-chain carbon credit markets enabling transparent trading and retirement of verified carbon offsets.",
  },
  "/rwas/sovereign-wealth": {
    title: "Sovereign Wealth — RWA Tokenization",
    description: "Tokenized sovereign wealth instruments for government bonds, treasury assets, and national reserves.",
  },
  "/rwas/stablecoins": {
    title: "Stablecoins — RWA Tokenization",
    description: "Asset-backed stablecoins pegged to real world assets for cross-border payments and DeFi liquidity.",
  },
  "/rwas/tax-credits": {
    title: "Tax Credits — RWA Tokenization",
    description: "Tokenized tax credits enabling secondary market trading for renewable energy and R&D incentives.",
  },
  "/rwas/utilities": {
    title: "Utilities — RWA Tokenization",
    description: "Tokenized utility assets including water, electricity, and telecommunications infrastructure.",
  },
  // Blog
  "/blog/rwa-tokenization": {
    title: "RWA Tokenization — Blog",
    description: "How real world asset tokenization is reshaping global finance and unlocking trillions in illiquid capital.",
  },
  "/blog/ai-investor-engagement": {
    title: "AI Investor Engagement — Blog",
    description: "Leveraging AI to transform investor relations, due diligence, and capital raising workflows.",
  },
  "/blog/pre-ipo-markets": {
    title: "Pre-IPO Markets — Blog",
    description: "The emerging pre-IPO tokenization market and how blockchain enables early-stage liquidity.",
  },
  "/blog/tmrw-launch": {
    title: "TMRW Launch — Blog",
    description: "The Tomorrow Company launches its Web3 AI infrastructure and RWA tokenization platform.",
  },
};

function langToOgLocale(lang: string): string {
  const map: Record<string, string> = {
    en: "en_US", ar: "ar_SA", bn: "bn_BD", "zh-CN": "zh_CN",
    da: "da_DK", nl: "nl_NL", et: "et_EE", fi: "fi_FI", fr: "fr_FR",
    de: "de_DE", el: "el_GR", iw: "he_IL", hi: "hi_IN", hu: "hu_HU",
    id: "id_ID", it: "it_IT", ja: "ja_JP", km: "km_KH", ko: "ko_KR",
    ms: "ms_MY", no: "nb_NO", fa: "fa_IR", pl: "pl_PL", pt: "pt_PT",
    pa: "pa_IN", ro: "ro_RO", ru: "ru_RU", sl: "sl_SI", es: "es_ES",
    sv: "sv_SE", th: "th_TH", tr: "tr_TR", uk: "uk_UA", ur: "ur_PK",
    vi: "vi_VN",
  };
  return map[lang] || "en_US";
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getPageMeta(path: string): { title: string; description: string } {
  // Exact match first
  if (PAGE_META[path]) return PAGE_META[path];

  // Try prefix matching for blog posts with tokenization pattern
  for (const [key, meta] of Object.entries(PAGE_META)) {
    if (path.startsWith(key) && key !== "/") return meta;
  }

  // Fallback: generate from path
  const segments = path.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1] || "";
  const formatted = lastSegment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${formatted} | ${SITE_NAME}`,
    description: DEFAULT_DESCRIPTION,
  };
}

function generateMetaHtml(meta: {
  title: string;
  description: string;
  image: string;
  url: string;
  type: string;
  lang: string;
  pagePath: string;
}): string {
  const ogLocale = langToOgLocale(meta.lang);

  const hreflangLinks = SUPPORTED_LANGS.map((l) => {
    const href = l === "en"
      ? `${SITE_URL}${meta.pagePath}`
      : `${SITE_URL}/${l}${meta.pagePath === "/" ? "" : meta.pagePath}`;
    return `  <link rel="alternate" hreflang="${l}" href="${href}" />`;
  }).join("\n") + `\n  <link rel="alternate" hreflang="x-default" href="${SITE_URL}${meta.pagePath}" />`;

  return `<!DOCTYPE html>
<html lang="${meta.lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeHtml(meta.description)}" />

  <!-- Open Graph -->
  <meta property="og:type" content="${meta.type}" />
  <meta property="og:url" content="${meta.url}" />
  <meta property="og:title" content="${escapeHtml(meta.title)}" />
  <meta property="og:description" content="${escapeHtml(meta.description)}" />
  <meta property="og:image" content="${meta.image}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:locale" content="${ogLocale}" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@taborcompany" />
  <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
  <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
  <meta name="twitter:image" content="${meta.image}" />

  <link rel="canonical" href="${meta.url}" />
${hreflangLinks}
</head>
<body>
  <main>
    <h1>${escapeHtml(meta.title)}</h1>
    <p>${escapeHtml(meta.description)}</p>
    <p><a href="${meta.url}">Visit page</a></p>
  </main>
</body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const isHead = req.method === "HEAD";

  try {
    const url = new URL(req.url);
    const pagePath = url.searchParams.get("path") || "/";
    const lang = url.searchParams.get("lang") || "en";

    const langPrefix = lang !== "en" ? `/${lang}` : "";
    const pageUrl = `${SITE_URL}${langPrefix}${pagePath === "/" ? "" : pagePath}`;

    const { title, description } = getPageMeta(pagePath);

    const html = generateMetaHtml({
      title,
      description,
      image: DEFAULT_IMAGE,
      url: pageUrl,
      type: "website",
      lang,
      pagePath,
    });

    const headers = new Headers(corsHeaders);
    headers.set("Content-Type", "text/html; charset=utf-8");
    headers.set("Cache-Control", "public, max-age=300");

    return new Response(isHead ? null : html, { status: 200, headers });
  } catch (err) {
    console.error("og-meta error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to generate OG meta" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
