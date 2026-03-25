import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const TARGET = "https://tmrw-digital.com";

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const proxyPath = url.searchParams.get("path") || "/";
    const targetUrl = `${TARGET}${proxyPath}`;

    const resp = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      redirect: "follow",
    });

    let html = await resp.text();

    // Make relative asset URLs absolute
    html = html.replace(/(href|src|action)="\/(?!\/)/g, `$1="${TARGET}/`);
    html = html.replace(/(href|src|action)='\/(?!\/)/g, `$1='${TARGET}/`);
    html = html.replace(/url\(["']?\/(?!\/)/g, `url("${TARGET}/`);

    // Inject <base> tag
    html = html.replace(/<head([^>]*)>/i, `<head$1><base href="${TARGET}/" />`);

    // Return with explicit content-type header using Headers object
    const headers = new Headers();
    headers.set("Content-Type", "text/html; charset=utf-8");
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Headers", "authorization, x-client-info, apikey, content-type");
    headers.set("Cache-Control", "public, max-age=300");
    // Remove frame-blocking
    headers.delete("X-Frame-Options");
    headers.delete("Content-Security-Policy");

    return new Response(html, {
      status: 200,
      headers,
    });
  } catch (err) {
    console.error("Proxy error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to proxy site" }),
      {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
