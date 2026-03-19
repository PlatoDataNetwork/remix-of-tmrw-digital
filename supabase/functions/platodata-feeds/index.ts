import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-internal-key",
};

const OUR_DOMAIN = "https://www.tmrw-digital.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Protection is handled at the Supabase level (apikey header required)
    // For external access from other websites, use x-internal-key header

    // --- Connect to PlatoData Supabase ---
    const platoUrl = Deno.env.get("PLATODATA_SUPABASE_URL");
    const platoKey = Deno.env.get("PLATODATA_ANON_KEY");

    if (!platoUrl || !platoKey) {
      return new Response(
        JSON.stringify({ success: false, error: "PlatoData credentials not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const plato = createClient(platoUrl, platoKey);
    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    // ===== ACTION: verticals =====
    // Returns list of all verticals with article count
    if (action === "verticals") {
      const slugs = [
        "aerospace","ar-vr","artificial-intelligence","autism","automotive","aviation",
        "big-data","biotech","biotechnology","blockchain","cannabis","carbon","cleantech",
        "clinical-trials","code","crowdfunding","cyber-security","defense","ecommerce",
        "edtech","energy","environment","esg","esports","finance","financefeeds","fintech",
        "forex","gaming","hrtech","hydrogen","iot","medical-devices","music",
        "nano-technology","nfts","patents","payments","platohealth","private-equity",
        "psychedelics","quantum","real-estate","saas","semiconductor","seo","solar",
        "spacs","startups","stem-cell","supply-chain","trading","venture-capital",
        "waste-management"
      ];

      const slugNames: Record<string, string> = {
        "aerospace": "Aerospace", "ar-vr": "AR/VR", "artificial-intelligence": "AI",
        "autism": "Autism", "automotive": "Automotive", "aviation": "Aviation",
        "big-data": "Big Data", "biotech": "Biotech", "biotechnology": "Biotechnology",
        "blockchain": "Blockchain", "cannabis": "Cannabis", "carbon": "Carbon",
        "cleantech": "Cleantech", "clinical-trials": "Clinical Trials", "code": "Code",
        "crowdfunding": "Crowdfunding", "cyber-security": "Cyber Security",
        "defense": "Defense", "ecommerce": "Ecommerce", "edtech": "Edtech",
        "energy": "Energy", "environment": "Environment", "esg": "ESG",
        "esports": "Esports", "finance": "Finance", "financefeeds": "Financefeeds",
        "fintech": "Fintech", "forex": "Forex", "gaming": "Gaming", "hrtech": "HRTech",
        "hydrogen": "Hydrogen", "iot": "IoT", "medical-devices": "Medical Devices",
        "music": "Music", "nano-technology": "Nano Technology", "nfts": "NFTs",
        "patents": "Patents", "payments": "Payments", "platohealth": "PlatoHealth",
        "private-equity": "Private Equity", "psychedelics": "Psychedelics",
        "quantum": "Quantum", "real-estate": "Real Estate", "saas": "SaaS",
        "semiconductor": "Semiconductor", "seo": "SEO", "solar": "Solar",
        "spacs": "SPACs", "startups": "Startups", "stem-cell": "Stem Cell",
        "supply-chain": "Supply Chain", "trading": "Trading",
        "venture-capital": "Venture Capital", "waste-management": "Waste Management",
      };

      // Parallel count queries (batch of 10)
      const verticals: Array<{ slug: string; name: string; count: number }> = [];

      const countResults = await Promise.allSettled(
        slugs.map(async (slug) => {
          const { count, error } = await plato
            .from("articles")
            .select("id", { count: "exact", head: true })
            .eq("vertical_slug", slug);

          return { slug, count: error ? 0 : (count || 0) };
        })
      );

      for (const result of countResults) {
        if (result.status === "fulfilled") {
          const { slug, count } = result.value;
          verticals.push({
            slug,
            name: slugNames[slug] || slug,
            count,
          });
        }
      }

      // Sort by count desc
      verticals.sort((a, b) => b.count - a.count);

      return new Response(
        JSON.stringify({
          success: true,
          total_verticals: verticals.length,
          total_articles: verticals.reduce((sum, v) => sum + v.count, 0),
          verticals,
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=1800",
          },
        }
      );
    }

    // ===== ACTION: articles =====
    // Paginated list of articles for a specific vertical
    if (action === "articles") {
      const vertical = url.searchParams.get("vertical");
      if (!vertical) {
        return new Response(
          JSON.stringify({ success: false, error: "vertical parameter is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
      const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") || "20", 10)));
      const offset = (page - 1) * limit;

      // Get total count + paginated articles in parallel
      const [countResult, articlesResult] = await Promise.all([
        plato
          .from("articles")
          .select("id", { count: "exact", head: true })
          .eq("vertical_slug", vertical),
        plato
          .from("articles")
          .select("id, post_id, title, excerpt, author, published_at, read_time, category, vertical_slug, image_url, external_url")
          .eq("vertical_slug", vertical)
          .order("published_at", { ascending: false })
          .range(offset, offset + limit - 1),
      ]);

      const totalCount = countResult.count || 0;
      const articles = (articlesResult.data || []).map((article: any) => ({
        ...article,
        // Replace PlatoData domain references
        external_url: article.external_url
          ? article.external_url.replace(/https?:\/\/www\.platodata\.io/g, OUR_DOMAIN)
          : article.external_url,
      }));

      return new Response(
        JSON.stringify({
          success: true,
          vertical,
          page,
          limit,
          total: totalCount,
          total_pages: Math.ceil(totalCount / limit),
          articles,
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=300",
          },
        }
      );
    }

    // ===== ACTION: article =====
    // Single article by ID with full content
    if (action === "article") {
      const id = url.searchParams.get("id");
      if (!id) {
        return new Response(
          JSON.stringify({ success: false, error: "id parameter is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { data, error } = await plato
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        return new Response(
          JSON.stringify({ success: false, error: "Article not found" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Replace domain in content
      const article = {
        ...data,
        content: data.content
          ? data.content.replace(/https?:\/\/www\.platodata\.io/g, OUR_DOMAIN)
            .replace(/platodata\.io/g, "tmrw-digital.com")
            .replace(/PlatoData/g, "The Tomorrow Company")
          : data.content,
        external_url: data.external_url
          ? data.external_url.replace(/https?:\/\/www\.platodata\.io/g, OUR_DOMAIN)
          : data.external_url,
        author: data.author === "PlatoData" ? "The Tomorrow Company" : data.author,
      };

      // Return as JSON or XML based on format param
      const format = url.searchParams.get("format") || "json";

      if (format === "xml") {
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<article>
  <id>${escapeXml(article.id)}</id>
  <title>${escapeXml(article.title)}</title>
  <excerpt>${escapeXml(article.excerpt || "")}</excerpt>
  <content><![CDATA[${article.content || ""}]]></content>
  <author>${escapeXml(article.author || "")}</author>
  <published_at>${escapeXml(article.published_at || "")}</published_at>
  <read_time>${escapeXml(article.read_time || "")}</read_time>
  <category>${escapeXml(article.category || "")}</category>
  <vertical_slug>${escapeXml(article.vertical_slug || "")}</vertical_slug>
  <image_url>${escapeXml(article.image_url || "")}</image_url>
  <external_url>${escapeXml(article.external_url || "")}</external_url>
</article>`;
        return new Response(xml, {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=600",
          },
        });
      }

      return new Response(
        JSON.stringify({ success: true, article }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=600",
          },
        }
      );
    }

    // ===== ACTION: feed =====
    // Returns RSS/XML or JSON feed for a vertical (for feed readers)
    if (action === "feed") {
      const vertical = url.searchParams.get("vertical");
      const format = url.searchParams.get("format") || "json";
      const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get("limit") || "50", 10)));

      if (!vertical) {
        return new Response(
          JSON.stringify({ success: false, error: "vertical parameter is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { data: articles, error } = await plato
        .from("articles")
        .select("id, title, excerpt, content, author, published_at, external_url, image_url, vertical_slug")
        .eq("vertical_slug", vertical)
        .order("published_at", { ascending: false })
        .limit(limit);

      if (error) {
        return new Response(
          JSON.stringify({ success: false, error: "Failed to fetch feed" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const processedArticles = (articles || []).map((a: any) => ({
        ...a,
        content: a.content?.replace(/https?:\/\/www\.platodata\.io/g, OUR_DOMAIN)
          .replace(/platodata\.io/g, "tmrw-digital.com")
          .replace(/PlatoData/g, "The Tomorrow Company") || "",
        author: a.author === "PlatoData" ? "The Tomorrow Company" : a.author,
        external_url: a.external_url?.replace(/https?:\/\/www\.platodata\.io/g, OUR_DOMAIN) || "",
      }));

      if (format === "xml") {
        const verticalName = vertical.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
        const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Tomorrow Company - ${escapeXml(verticalName)}</title>
    <link>${OUR_DOMAIN}/data-feeds</link>
    <description>Latest ${escapeXml(verticalName)} news and intelligence from The Tomorrow Company</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${OUR_DOMAIN}/${vertical}.xml" rel="self" type="application/rss+xml"/>
${processedArticles.map((a: any) => `    <item>
      <title>${escapeXml(a.title)}</title>
      <description>${escapeXml(a.excerpt || "")}</description>
      <link>${a.external_url || `${OUR_DOMAIN}/data-feeds`}</link>
      <guid isPermaLink="false">${a.id}</guid>
      <pubDate>${new Date(a.published_at).toUTCString()}</pubDate>
      <author>${escapeXml(a.author)}</author>
    </item>`).join("\n")}
  </channel>
</rss>`;
        return new Response(rssXml, {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=1800",
          },
        });
      }

      // JSON Feed format
      const jsonFeed = {
        version: "https://jsonfeed.org/version/1.1",
        title: `The Tomorrow Company - ${vertical.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())}`,
        home_page_url: `${OUR_DOMAIN}/data-feeds`,
        feed_url: `${OUR_DOMAIN}/${vertical}.json`,
        description: `Latest news from the ${vertical.replace(/-/g, " ")} industry`,
        items: processedArticles.map((a: any) => ({
          id: a.id,
          title: a.title,
          summary: a.excerpt || "",
          content_html: a.content || "",
          url: a.external_url || `${OUR_DOMAIN}/data-feeds`,
          date_published: a.published_at,
          authors: [{ name: a.author }],
          image: a.image_url || undefined,
        })),
      };

      return new Response(JSON.stringify(jsonFeed, null, 2), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/feed+json; charset=utf-8",
          "Cache-Control": "public, max-age=1800",
        },
      });
    }

    // ===== Unknown action =====
    return new Response(
      JSON.stringify({
        success: false,
        error: "Invalid action. Use: verticals, articles, article, feed",
        usage: {
          verticals: "?action=verticals",
          articles: "?action=articles&vertical=blockchain&page=1&limit=20",
          article: "?action=article&id=UUID&format=json|xml",
          feed: "?action=feed&vertical=blockchain&format=json|xml&limit=50",
        },
      }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("PlatoData feeds error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
