import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { feedCategories } from "@/data/feed-categories";
import { useCurrentLanguage, langPath } from "@/hooks/useLanguage";
import { Rss, FileJson, Code2 } from "lucide-react";

const DataFeeds = () => {
  const currentLang = useCurrentLanguage();
  const lp = (path: string) => langPath(currentLang, path);
  const baseUrl = import.meta.env.VITE_SUPABASE_URL;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Data Feeds | The Tomorrow Company"
        description="Subscribe to our RSS and JSON feeds to get real-time updates on AI, Web3, and emerging technology news."
        path="/data-feeds"
      />
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Data Feeds
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              Subscribe to our RSS and JSON feeds to get real-time updates on AI, Web3,
              and emerging technology news.
            </p>
          </div>

          {/* Feed Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {feedCategories.map((cat) => (
              <div
                key={cat.slug}
                className="rounded-xl border border-border bg-card p-4 hover:border-blue-500/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground text-sm">{cat.name}</h3>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <a
                    href={`${baseUrl}/functions/v1/data-feed-proxy?vertical=${cat.slug}&format=json`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <FileJson className="w-3.5 h-3.5" />
                    JSON
                  </a>
                  <a
                    href={`${baseUrl}/functions/v1/data-feed-proxy?vertical=${cat.slug}&format=xml`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Rss className="w-3.5 h-3.5" />
                    RSS
                  </a>
                  <Link
                    to={lp("/api-documentation")}
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    API
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DataFeeds;
