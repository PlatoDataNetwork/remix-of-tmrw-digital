import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useCurrentLanguage, langPath } from "@/hooks/useLanguage";
import { Rss, FileJson, Code2, ArrowUpRight } from "lucide-react";
import platoIcon from "@/assets/plato-icon.webp";

interface Vertical {
  slug: string;
  name: string;
  count: number;
}

interface FeedArticle {
  title: string;
  description: string;
  pubDate: string;
  guid: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const parseFeedArticles = (xml: string): FeedArticle[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  const items = doc.querySelectorAll("item");
  const articles: FeedArticle[] = [];
  items.forEach((item, i) => {
    if (i >= 10) return;
    articles.push({
      title: item.querySelector("title")?.textContent || "",
      description: item.querySelector("description")?.textContent || "",
      pubDate: item.querySelector("pubDate")?.textContent || "",
      guid: item.querySelector("guid")?.textContent || String(i),
    });
  });
  return articles;
};

const DataFeeds = () => {
  const currentLang = useCurrentLanguage();
  const lp = (path: string) => langPath(currentLang, path);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [verticals, setVerticals] = useState<Vertical[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalArticles, setTotalArticles] = useState(0);
  const [feedArticles, setFeedArticles] = useState<FeedArticle[]>([]);
  const [feedLoading, setFeedLoading] = useState(true);

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";

  useEffect(() => {
    const fetchVerticals = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/platodata-feeds?action=verticals`,
          { headers: { Authorization: `Bearer ${SUPABASE_KEY}` } }
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

    const fetchFeed = async () => {
      setFeedLoading(true);
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/rss-feed?vertical=blockchain`,
          { headers: { Authorization: `Bearer ${SUPABASE_KEY}` } }
        );
        if (res.ok) {
          const xml = await res.text();
          setFeedArticles(parseFeedArticles(xml));
        }
      } catch (err) {
        console.error("Failed to fetch blockchain feed:", err);
      }
      setFeedLoading(false);
    };

    fetchVerticals();
    fetchFeed();
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
              OpenSource Real-Time
              <br />
              Training Data
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto font-light">
              Subscribe to our RSS and JSON feeds to get real-time updates on all {verticals.length || "54"} Technology / Capital Markets verticals we support. Access via direct feeds or our authenticated API. Free to Use.
              {totalArticles > 0 && (
                <span className="block mt-2 text-sm text-primary">
                  {totalArticles.toLocaleString()} articles across all verticals
                </span>
              )}
            </p>
          </motion.div>

          {/* Featured Blockchain Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Live Feed</p>
                <h2 className="text-2xl md:text-3xl font-light text-foreground">Blockchain</h2>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`${siteUrl}/blockchain.json`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FileJson className="w-3.5 h-3.5" />
                  JSON
                </a>
                <a
                  href={`${siteUrl}/blockchain.xml`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Rss className="w-3.5 h-3.5" />
                  RSS
                </a>
              </div>
            </div>

            {feedLoading ? (
              <div className="space-y-0 divide-y divide-border/40">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="py-8 animate-pulse">
                    <div className="h-5 bg-muted rounded w-3/4 mb-3" />
                    <div className="h-4 bg-muted rounded w-full mb-1" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-0 divide-y divide-border/40">
                {feedArticles.map((article, i) => (
                  <motion.article
                    key={article.guid}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                    className="group py-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 hover:bg-accent/30 -mx-6 px-6 transition-colors rounded-lg"
                  >
                    <div
                      className="h-7 w-7 animated-gradient-icon-bright shrink-0 hidden md:block"
                      style={{
                        WebkitMaskImage: `url(${platoIcon})`,
                        maskImage: `url(${platoIcon})`,
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskPosition: 'center',
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground shrink-0">
                          {new Date(article.pubDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground shrink-0">Blockchain</span>
                      </div>
                      <h3 className="text-base md:text-lg font-medium text-foreground group-hover:text-foreground/80 transition-colors mb-1 line-clamp-1">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-light line-clamp-2">{article.description}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 hidden md:block" />
                  </motion.article>
                ))}
              </div>
            )}
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
