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
  "/intelligence": {
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
  "/intelligence/sec-nasdaq-tokenized-stocks": {
    title: "SEC Approves Nasdaq Pilot Enabling Investors to Trade Tokenized Stocks",
    description: "The SEC has greenlit a landmark Nasdaq pilot program allowing investors to trade tokenized equities — marking one of the most significant regulatory endorsements of blockchain-based capital markets.",
  },
  "/intelligence/tokenization-alternatives": {
    title: "How Tokenization Can Unlock a $400 Billion Opportunity in Alternative Investments",
    description: "Tokenization is poised to transform how $150 trillion in individual wealth accesses private equity, real estate, and hedge funds — representing a $400B annual revenue opportunity.",
  },
  "/intelligence/web3-ai-convergence": {
    title: "The Convergence of Web3 & AI: From Hype Cycles to Autonomous Economies",
    description: "How AI agents and smart contracts are forming self-executing economic systems. AI market projected to exceed $1.8T by 2030, tokenized assets could hit $16T.",
  },
  "/intelligence/ai-tokenization-capital-markets": {
    title: "When AI Meets Tokenization: Rewiring the $400 Trillion Global Capital Markets",
    description: "How AI is unlocking liquidity in traditionally illiquid assets through tokenization — positioning AI as the market maker of illiquidity.",
  },
  "/intelligence/rwa-security-attack-surface": {
    title: "How Secure Is Your RWA? The Hidden Attack Surface of Tokenized Assets",
    description: "Over $3.8B lost to DeFi hacks in 2022–2023. As real-world assets move on-chain, the stakes and attack vectors are fundamentally different.",
  },
  "/intelligence/future-proofing-rwa": {
    title: "Future-Proofing the RWA Market: Infrastructure, Compliance, and Trust Layers",
    description: "The 3-layer architecture needed for scalable RWA platforms — and why Compliance-as-Code is the key to institutional adoption.",
  },
  "/intelligence/programmable-yield-rwa": {
    title: "The Next Generation of RWA: From Static Assets to Programmable Yield",
    description: "Tokenized treasuries surpassed $3B+ in 2025. The next frontier isn't tokenization — it's programmable, AI-managed dynamic yields.",
  },
  "/intelligence/autonomous-capital-markets": {
    title: "AI + RWA + Web3: The Birth of Autonomous Capital Markets",
    description: "Humans become LPs, AI becomes the portfolio manager. How autonomous agents are creating a new paradigm for capital allocation.",
  },
  "/intelligence/why-rwa-projects-fail": {
    title: "Tokenization Is Not Enough: Why Most RWA Projects Will Fail by Design",
    description: "Less than 10% of tokenized assets achieve meaningful secondary market liquidity. The problem isn't technology — it's design.",
  },
  "/intelligence/wall-street-to-wallets": {
    title: "From Wall Street to Wallets: How Web3 Is Democratizing Access to Real-World Assets",
    description: "Over 80% of global assets remain inaccessible to retail investors. Tokenization is dismantling the gatekeeping structures of traditional finance.",
  },
  "/intelligence/vibe-coding-startup": {
    title: "Building a Unicorn with Vibe-Coding: The AI-Driven Startup Playbook No One Talks About",
    description: "Replace traditional product-market fit with signal-market fit. The new startup playbook combines AI copilots, rapid iteration, and token incentives.",
  },
  "/intelligence/compliance-paradox-rwa": {
    title: "The Compliance Paradox: Can Decentralized RWA Markets Satisfy Centralized Regulation?",
    description: "Exploring MiCA, SEC pressure, and global regulatory fragmentation — and how programmable regulation via smart contracts could resolve it.",
  },
  "/intelligence/liquidity-2-tokenization-ai": {
    title: "Liquidity 2.0: How Tokenization + AI Will Unlock Trillions in Dormant Capital",
    description: "Global real estate alone is a $300T+ asset class, mostly illiquid. Tokenization and AI are creating the infrastructure to mobilize dormant capital at unprecedented scale.",
  },
  "/intelligence/protocol-layer-evolution": {
    title: "The Protocol Layer: How Tokenization Is Transforming Brokers, Custodians, and Asset Managers Into Code",
    description: "The disruption of financial intermediaries isn't elimination — it's evolution into protocol layers in a programmable financial stack.",
  },
  "/intelligence/rwa-tokenization": {
    title: "The Future of RWA Tokenization in Web3 Markets",
    description: "How real-world asset tokenization is reshaping investor access to previously illiquid markets.",
  },
  "/intelligence/carbon-credits-tokenization": {
    title: "Tokenized Carbon Credits: Building Trust in Climate Finance",
    description: "How blockchain-verified carbon credits are transforming environmental markets and enabling transparent climate action.",
  },
  "/intelligence/carbon-market-tokenization-pivot": {
    title: "The $16 Billion Pivot: How Tokenization Is Reshaping Global Carbon Markets",
    description: "Carbon markets surged past $16 billion in 2025. Tokenization is bringing transparency, liquidity, and institutional trust to the fastest-growing ESG asset class.",
  },
  "/intelligence/ai-carbon-verification": {
    title: "AI-Powered Carbon Verification: Why Tokenized MRV Is the Future of Climate Accountability",
    description: "Digital MRV systems combining AI, satellite imagery, and IoT sensors are cutting verification costs by 60% and making tokenized carbon credits the gold standard for climate finance.",
  },
  "/intelligence/carbon-credit-defi": {
    title: "Carbon Credit DeFi: How Programmable Carbon Is Creating a New Asset Class",
    description: "From carbon-backed loans to yield-generating carbon pools, DeFi protocols are transforming tokenized carbon credits into composable financial instruments.",
  },
  "/intelligence/compliance-carbon-blockchain": {
    title: "Compliance Carbon Meets Blockchain: How CBAM and Article 6 Are Driving Tokenized Carbon Adoption",
    description: "The EU CBAM and Paris Agreement Article 6 are creating regulatory tailwinds that make tokenized carbon credits essential infrastructure.",
  },
  "/intelligence/commodities-tokenization": {
    title: "Commodity Tokenization: Democratizing Access to Global Markets",
    description: "From agricultural products to energy futures, tokenization is unlocking fractional access to commodity investments.",
  },
  "/intelligence/real-estate-tokenization": {
    title: "Real Estate Tokenization: From Bricks to Blocks",
    description: "Fractional real estate ownership is breaking barriers, enabling global investors to access premium property markets.",
  },
  "/intelligence/sovereign-wealth-tokenization": {
    title: "Sovereign Wealth Funds & Tokenization: A Strategic Alliance",
    description: "How sovereign wealth funds are leveraging tokenized assets to diversify portfolios and enhance transparency.",
  },
  "/intelligence/ai-investor-engagement": {
    title: "AI-Driven Investor Engagement: A New Paradigm",
    description: "Leveraging machine learning to identify, target, and engage institutional investors at scale.",
  },
  "/intelligence/energy-tokenization": {
    title: "Energy Assets on Chain: Powering the Next Generation of Investment",
    description: "Tokenized energy infrastructure is attracting institutional capital to renewables, oil, and gas assets worldwide.",
  },
  "/intelligence/infrastructure-tokenization": {
    title: "Infrastructure Tokenization: Funding the World's Backbone",
    description: "How tokenized infrastructure projects are delivering stable, long-term returns to a broader investor base.",
  },
  "/intelligence/pre-ipo-markets": {
    title: "Navigating Pre-IPO Markets in a Volatile Landscape",
    description: "Strategic considerations for management teams preparing for public market transitions.",
  },
  "/intelligence/metals-tokenization": {
    title: "Precious & Industrial Metals: The Digital Gold Rush",
    description: "Tokenized metals markets are enabling real-time trading and fractional ownership of gold, silver, and beyond.",
  },
  "/intelligence/rare-earth-tokenization": {
    title: "Rare Earth Minerals: Securing Critical Supply Chains on Chain",
    description: "Blockchain-powered rare earth investments are addressing supply chain risks in defense and clean energy sectors.",
  },
  "/intelligence/tmrw-launch": {
    title: "The Tomorrow Company Launches With a Bold Mandate to Build the Infrastructure Layer of the AI-Native Financial Era",
    description: "Strategic merger forms an integrated Web3 infrastructure platform at the convergence of AI, tokenized real-world assets, and programmable climate markets.",
  },
  "/intelligence/stablecoins-tokenization": {
    title: "Stablecoins: The Foundation of Tokenized Finance",
    description: "How asset-backed stablecoins are bridging traditional finance and DeFi, enabling cross-border payments and on-chain liquidity.",
  },
  "/intelligence/tax-credits-tokenization": {
    title: "Tax Credits on Chain: Unlocking Secondary Markets for Government Incentives",
    description: "Tokenized tax credits are creating liquid secondary markets for renewable energy and R&D incentives.",
  },
  "/intelligence/collectables-tokenization": {
    title: "Collectables Tokenization: Fractionalizing Art, Luxury, and Cultural Assets",
    description: "How tokenization is enabling fractional ownership and global liquidity for art, collectables, and luxury assets.",
  },
  "/intelligence/utilities-tokenization": {
    title: "Utilities Tokenization: Investing in Essential Infrastructure",
    description: "Tokenized utility assets including water, electricity, and telecommunications infrastructure on-chain.",
  },
  // News
  "/news": {
    title: "Company News — The Tomorrow Company",
    description: "Press releases, announcements, and updates from The Tomorrow Company.",
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

    return new Response(isHead ? null : html, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (err) {
    console.error("og-meta error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to generate OG meta" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
