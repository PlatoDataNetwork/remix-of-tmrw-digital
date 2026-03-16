import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { feedCategories } from "@/data/feed-categories";
import { useCurrentLanguage, langPath } from "@/hooks/useLanguage";
import { Rss, FileJson, Code2, Newspaper } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const DataFeeds = () => {
  const currentLang = useCurrentLanguage();
  const lp = (path: string) => langPath(currentLang, path);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [articleCounts, setArticleCounts] = useState<Record<string, number>>({});

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";

  useEffect(() => {
    // Fetch article counts for all verticals via edge function
    const fetchCounts = async () => {
      const counts: Record<string, number> = {};
      // Fetch in batches of 10 to avoid overwhelming
      for (let i = 0; i < feedCategories.length; i += 10) {
        const batch = feedCategories.slice(i, i + 10);
        const results = await Promise.allSettled(
          batch.map(async (cat) => {
            try {
              const { data, error } = await supabase.functions.invoke("data-feed-proxy", {
                body: null,
                headers: {},
              });
              // Use fetch directly to get the count
              const res = await fetch(
                `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/data-feed-proxy?vertical=${cat.slug}&format=json`,
                {
                  headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
                  },
                }
              );
              if (res.ok) {
                const json = await res.json();
                const count = Array.isArray(json) ? json.length : json?.items?.length || json?.articles?.length || 0;
                counts[cat.slug] = count;
              }
            } catch {
              // ignore
            }
          })
        );
      }
      setArticleCounts(counts);
    };
    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Data Feeds | The Tomorrow Company"
        description="Subscribe to our RSS and JSON feeds to get real-time updates on AI, Web3, and emerging technology news."
        path="/data-feeds"
      />
      <Navbar />

      <main className="pt-24 pb-16" ref={ref}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header - matches site section style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Data Feeds</p>
            <h1 className="text-3xl md:text-5xl font-light text-foreground mb-6">
              Real-Time Intelligence
              <br />
              Across 55+ Verticals
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto font-light">
              Subscribe to our RSS and JSON feeds to get real-time updates on AI, Web3,
              and emerging technology news. Access via direct feeds or our authenticated API.
            </p>
          </motion.div>

          {/* Feed Grid - matches homepage card style */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedCategories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.03 }}
                className="group relative bg-card border border-border rounded-2xl p-8 hover:border-border/80 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <Newspaper className="h-8 w-8 text-foreground mb-4" />
                {articleCounts[cat.slug] !== undefined && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 block">
                    {articleCounts[cat.slug].toLocaleString()} Articles
                  </span>
                )}
                <h3 className="text-lg font-medium text-foreground mb-3">{cat.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light flex-1">
                  Latest news and insights from the {cat.name.toLowerCase()} industry, updated in real-time.
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs">
                    <a
                      href={`${siteUrl}/${cat.slug}.json`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <FileJson className="w-3.5 h-3.5" />
                      JSON
                    </a>
                    <a
                      href={`${siteUrl}/${cat.slug}.xml`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Rss className="w-3.5 h-3.5" />
                      RSS
                    </a>
                  </div>
                  <Link
                    to={lp("/api-documentation")}
                    className="learn-more-link text-xs uppercase tracking-[0.15em] animated-gradient-neon-text transition-colors duration-300"
                  >
                    API →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DataFeeds;
