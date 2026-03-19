import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, List, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import platoIcon from "@/assets/plato-icon.webp";

const articles = [
  {
    date: "Mar 2026",
    subject: "Press Release",
    category: "Launch",
    title: "The Tomorrow Company Launches to Build the Infrastructure Layer of the AI-Native Financial Era",
    excerpt: "Strategic merger forms an integrated Web3 infrastructure platform at the convergence of AI, tokenized real-world assets, and programmable climate markets.",
    slug: "/blog/tmrw-launch",
  },
  {
    date: "Mar 2026",
    subject: "Regulation",
    category: "Tokenization",
    title: "SEC Approves Nasdaq Pilot Enabling Investors to Trade Tokenized Stocks",
    excerpt: "The SEC has greenlit a landmark Nasdaq pilot program allowing investors to trade tokenized equities — marking one of the most significant regulatory endorsements of blockchain-based capital markets.",
    slug: "/blog/sec-nasdaq-tokenized-stocks",
  },
  {
    date: "Mar 2026",
    subject: "Alternative Investments",
    category: "Tokenization",
    title: "How Tokenization Can Unlock a $400 Billion Opportunity in Alternative Investments",
    excerpt: "Tokenization is poised to transform how $150 trillion in individual wealth accesses private equity, real estate, and hedge funds — representing a $400B annual revenue opportunity.",
    slug: "/blog/tokenization-alternatives",
  },
  {
    date: "Mar 2026",
    subject: "Web3",
    category: "Tokenization",
    title: "The Future of RWA Tokenization in Web3 Markets",
    excerpt: "How real-world asset tokenization is reshaping investor access to previously illiquid markets.",
    slug: "/blog/rwa-tokenization",
  },
  {
    date: "Mar 2026",
    subject: "Carbon Credits",
    category: "Tokenization",
    title: "Tokenized Carbon Credits: Building Trust in Climate Finance",
    excerpt: "How blockchain-verified carbon credits are transforming environmental markets and enabling transparent climate action.",
    slug: "/blog/carbon-credits-tokenization",
  },
  {
    date: "Mar 2026",
    subject: "Commodities",
    category: "Tokenization",
    title: "Commodity Tokenization: Democratizing Access to Global Markets",
    excerpt: "From agricultural products to energy futures, tokenization is unlocking fractional access to commodity investments.",
    slug: "/blog/commodities-tokenization",
  },
  {
    date: "Mar 2026",
    subject: "Real Estate",
    category: "Tokenization",
    title: "Real Estate Tokenization: From Bricks to Blocks",
    excerpt: "Fractional real estate ownership is breaking barriers, enabling global investors to access premium property markets.",
    slug: "/blog/real-estate-tokenization",
  },
  {
    date: "Mar 2026",
    subject: "Sovereign Wealth",
    category: "Tokenization",
    title: "Sovereign Wealth Funds & Tokenization: A Strategic Alliance",
    excerpt: "How sovereign wealth funds are leveraging tokenized assets to diversify portfolios and enhance transparency.",
    slug: "/blog/sovereign-wealth-tokenization",
  },
  {
    date: "Mar 2026",
    subject: "Artificial Intelligence",
    category: "Tokenization",
    title: "AI-Driven Investor Engagement: A New Paradigm",
    excerpt: "Leveraging machine learning to identify, target, and engage institutional investors at scale.",
    slug: "/blog/ai-investor-engagement",
  },
  {
    date: "Mar 2026",
    subject: "Energy",
    category: "Tokenization",
    title: "Energy Assets on Chain: Powering the Next Generation of Investment",
    excerpt: "Tokenized energy infrastructure is attracting institutional capital to renewables, oil, and gas assets worldwide.",
    slug: "/blog/energy-tokenization",
  },
  {
    date: "Mar 2026",
    subject: "Infrastructure",
    category: "Tokenization",
    title: "Infrastructure Tokenization: Funding the World's Backbone",
    excerpt: "How tokenized infrastructure projects are delivering stable, long-term returns to a broader investor base.",
    slug: "/blog/infrastructure-tokenization",
  },
  {
    date: "Mar 2026",
    subject: "Markets",
    category: "Tokenization",
    title: "Navigating Pre-IPO Markets in a Volatile Landscape",
    excerpt: "Strategic considerations for management teams preparing for public market transitions.",
    slug: "/blog/pre-ipo-markets",
  },
  {
    date: "Mar 2026",
    subject: "Metals",
    category: "Tokenization",
    title: "Precious & Industrial Metals: The Digital Gold Rush",
    excerpt: "Tokenized metals markets are enabling real-time trading and fractional ownership of gold, silver, and beyond.",
    slug: "/blog/metals-tokenization",
  },
  {
    date: "Mar 2026",
    subject: "Rare Earth Minerals",
    category: "Tokenization",
    title: "Rare Earth Minerals: Securing Critical Supply Chains on Chain",
    excerpt: "Blockchain-powered rare earth investments are addressing supply chain risks in defense and clean energy sectors.",
    slug: "/blog/rare-earth-tokenization",
  },
];

const Intel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Intelligence" description="Latest insights, market analysis, and research from The Tomorrow Company on Web3, AI, RWA tokenization, and digital assets." path="/intel" />
      <Navbar />
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 bg-background overflow-hidden" ref={ref}>
        <div className="absolute inset-0 pointer-events-none colorful-gradient opacity-0">
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[hsl(330,80%,55%,0.06)] blur-[100px]" />
          <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] rounded-full bg-[hsl(200,90%,50%,0.05)] blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Intelligence</p>
              <h1 className="text-3xl md:text-5xl font-light text-foreground mb-6">
                Latest Insights
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl font-light">
                Deep dives into tokenization, Web3AI markets, and the future of real-world assets.
              </p>
            </div>
            {/* View Toggle */}
            <div className="flex items-center gap-1 rounded-lg border border-border p-1 shrink-0 self-start md:self-auto">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
                aria-label="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          {viewMode === "list" ? (
            <div className="space-y-0 divide-y divide-border/40">
              {articles.map((article, i) => (
                <Link to={article.slug} key={article.title}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="group py-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 cursor-pointer hover:bg-accent/30 -mx-6 px-6 transition-colors rounded-lg"
                  >
                    <div
                      className="h-8 w-8 animated-gradient-icon-bright shrink-0"
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
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-medium text-foreground group-hover:text-foreground/80 transition-colors mb-1">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-light">{article.excerpt}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 hidden md:block" />
                  </motion.article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, i) => (
                <Link to={article.slug} key={article.title}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="group relative rounded-xl border border-border/50 bg-card p-6 hover:border-border hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="h-7 w-7 animated-gradient-icon-bright shrink-0"
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
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{article.date}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{article.subject}</span>
                      </div>
                    </div>
                    <h3 className="text-base font-medium text-foreground group-hover:text-foreground/80 transition-colors mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-light line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/50 text-accent-foreground">{article.category}</span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Intel;
