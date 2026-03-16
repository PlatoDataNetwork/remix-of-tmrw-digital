const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://www.tmrw-digital.com";
const SITE_NAME = "The Tomorrow Company";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_DESCRIPTION =
  "The Tomorrow Company is a diversified Web3 infrastructure and digital asset holding company building the infrastructure for tomorrow's digital economy. RWA tokenization, AI analytics, and blockchain solutions.";

const SUPPORTED_LANGS = [
  "en","ar","bn","zh-CN","da","nl","et","fi","fr","de","el","iw","hi",
  "hu","id","it","ja","km","ko","ms","no","fa","pl","pt","pa","ro","ru","sl",
  "es","sv","th","tr","uk","ur","vi"
];

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

function generateMetaHtml(meta: {
  title: string;
  description: string;
  image: string;
  url: string;
  type: string;
  lang: string;
  pagePath?: string;
}): string {
  const ogLocale = langToOgLocale(meta.lang);

  const basePath = meta.pagePath || "/";
  const hreflangLinks = SUPPORTED_LANGS.map((l) => {
    const href = l === "en"
      ? `${SITE_URL}${basePath}`
      : `${SITE_URL}/${l}${basePath}`;
    return `  <link rel="alternate" hreflang="${l}" href="${href}" />`;
  }).join("\n") + `\n  <link rel="alternate" hreflang="x-default" href="${SITE_URL}${basePath}" />`;

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

    const html = generateMetaHtml({
      title: `${SITE_NAME} — Web3 AI & Real World Assets`,
      description: DEFAULT_DESCRIPTION,
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
