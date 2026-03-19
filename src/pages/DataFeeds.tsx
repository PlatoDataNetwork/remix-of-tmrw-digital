import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useCurrentLanguage, langPath } from "@/hooks/useLanguage";
import { Rss, FileJson, Code2 } from "lucide-react";

interface Vertical {
  slug: string;
  name: string;
  count: number;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const DataFeeds = () => {
  const currentLang = useCurrentLanguage();
  const lp = (path: string) => langPath(currentLang, path);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [verticals, setVerticals] = useState<Vertical[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalArticles, setTotalArticles] = useState(0);

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";

  useEffect(() => {
    const fetchVerticals = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/platodata-feeds?action=verticals`,
          {
            headers: {
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
          }
        );

        if (res.ok) {
          const json = await res.json();
          if (json.success && json.verticals) {
            setVerticals(json.verticals);
            setTotalArticles(json.total_articles || 0);
          }
        }
      } catch (err) {
        console.error("Failed to fetch verticals:", err);
      }
      setLoading(false);
    };

    fetchVerticals();
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
              Across {verticals.length || "55"}+ Verticals
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto font-light">
              Subscribe to our RSS and JSON feeds to get real-time updates on AI, Web3,
              and emerging technology news. Access via direct feeds or our authenticated API.
              {totalArticles > 0 && (
                <span className="block mt-2 text-sm text-primary">
                  {totalArticles.toLocaleString()} articles across all verticals
                </span>
              )}
            </p>
          </motion.div>

          {/* Feed Grid */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-2xl p-8 animate-pulse"
                >
                  <div className="h-5 bg-muted rounded w-2/3 mb-4" />
                  <div className="h-4 bg-muted rounded w-full mb-2" />
                  <div className="h-4 bg-muted rounded w-4/5" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {verticals.map((v, i) => (
                <motion.div
                  key={v.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.03 }}
                  className="group relative bg-card border border-border rounded-2xl p-8 hover:border-border/80 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  {/* Title row: name left, count right */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-foreground">{v.name}</h3>
                    {v.count > 0 && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary px-2.5 py-1 rounded-full bg-primary/10">
                        {v.count.toLocaleString()} Articles
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed font-light flex-1">
                    Latest news and insights from the {v.name.toLowerCase()} industry, updated in real-time.
                  </p>

                  {/* Feed links */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <a
                        href={`${siteUrl}/${v.slug}.json`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <FileJson className="w-4 h-4" />
                        JSON
                      </a>
                      <a
                        href={`${siteUrl}/${v.slug}.xml`}
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
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DataFeeds;
