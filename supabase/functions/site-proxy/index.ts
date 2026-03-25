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
    // The path after the function name becomes the proxied path
    const proxyPath = url.searchParams.get("path") || "/";
    const targetUrl = `${TARGET}${proxyPath}`;

    const resp = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; LovableProxy/1.0)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      redirect: "follow",
    });

    const contentType = resp.headers.get("content-type") || "text/html";
    let body: string | Uint8Array;

    if (contentType.includes("text/html")) {
      let html = await resp.text();

      // Rewrite relative URLs to point back through the proxy or to the origin
      // Make relative asset URLs absolute so they load from the origin
      html = html.replace(
        /(href|src|action)="\/(?!\/)/g,
        `$1="${TARGET}/`
      );
      html = html.replace(
        /(href|src|action)='\/(?!\/)/g,
        `$1='${TARGET}/`
      );

      // Also fix url() in inline styles
      html = html.replace(
        /url\(["']?\/(?!\/)/g,
        `url("${TARGET}/`
      );

      // Inject a <base> tag so any remaining relative URLs resolve to the origin
      html = html.replace(
        /<head([^>]*)>/i,
        `<head$1><base href="${TARGET}/" />`
      );

      body = html;
    } else {
      body = new Uint8Array(await resp.arrayBuffer());
    }

    return new Response(body, {
      status: resp.status,
      headers: {
        ...corsHeaders,
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=300",
        // Deliberately omit X-Frame-Options and CSP frame-ancestors
      },
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
