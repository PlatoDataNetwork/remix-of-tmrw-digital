const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://www.tmrw-digital.com";

const SUPPORTED_LANGUAGES = [
  "ar","bn","zh-CN","da","nl","et","fi","fr","de","el","iw","hi",
  "hu","id","it","ja","km","ko","ms","no","fa","pl","pt","pa","ro","ru","sl",
  "es","sv","th","tr","uk","ur","vi"
];

function generateRobotsTxt(): string {
  let txt = `User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  for (const lang of SUPPORTED_LANGUAGES) {
    txt += `Sitemap: ${SITE_URL}/${lang}/sitemap.xml\n`;
  }

  return txt;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  return new Response(generateRobotsTxt(), {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600",
      ...corsHeaders,
    },
  });
});
