import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { feedCategories } from "@/data/feed-categories";
import { useCurrentLanguage, langPath } from "@/hooks/useLanguage";
import { Rss, FileJson, Code2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const DataFeeds = () => {
  const currentLang = useCurrentLanguage();
  const lp = (path: string) => langPath(currentLang, path);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [articleCounts, setArticleCounts] = useState<Record<string, number>>({});
  const [loadingCounts, setLoadingCounts] = useState(true);

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";

  useEffect(() => {
    const fetchCounts = async () => {
      setLoadingCounts(true);
      const counts: Record<string, number> = {};

      // Batch into groups of 10 to avoid overwhelming the edge function
      for (let i = 0; i < feedCategories.length; i += 10) {
        const batch = feedCategories.slice(i, i + 10);
        const slugs = batch.map((c) => c.slug).join(",");

        try {
          const { data, error } = await supabase.functions.invoke("feed-counts", {
            body: null,
            headers: {},
          });

          // Use fetch directly with query params
          const res = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/feed-counts?slugs=${slugs}`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
              },
            }
          );

          if (res.ok) {
            const json = await res.json();
            if (json.success && json.counts) {
              Object.assign(counts, json.counts);
            }
          }
        } catch {
          // ignore batch errors
        }
      }

      setArticleCounts(counts);
      setLoadingCounts(false);
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
          {/* Header */}
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

          {/* Feed Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedCategories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.03 }}
                className="group relative bg-card border border-border rounded-2xl p-8 hover:border-border/80 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Title row: name left, count right */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-foreground">{cat.name}</h3>
                  {loadingCounts ? (
                    <span className="text-xs text-muted-foreground animate-pulse">...</span>
                  ) : articleCounts[cat.slug] !== undefined ? (
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary px-2.5 py-1 rounded-full bg-primary/10">
                      {articleCounts[cat.slug].toLocaleString()} Articles
                    </span>
                  ) : null}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed font-light flex-1">
                  Latest news and insights from the {cat.name.toLowerCase()} industry, updated in real-time.
                </p>

                {/* Feed links - bigger text with icons */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <a
                      href={`${siteUrl}/${cat.slug}.json`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <FileJson className="w-4 h-4" />
                      JSON
                    </a>
                    <a
                      href={`${siteUrl}/${cat.slug}.xml`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Rss className="w-4 h-4" />
                      RSS
                    </a>
                  </div>
                  <Link
                    to={lp("/api-documentation")}
                    className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.1em] animated-gradient-neon-text transition-colors duration-300"
                  >
                    <Code2 className="w-4 h-4" />
                    API
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
