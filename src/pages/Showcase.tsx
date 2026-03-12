import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import platoIcon from "@/assets/plato-icon.webp";

interface PortfolioItem {
  name: string;
  url: string;
  description: string;
  category: "carbon" | "ai" | "web3" | "cyber" | "media" | "finance" | "nft";
}

const portfolioItems: PortfolioItem[] = [
  { name: "Carbon Distributed", url: "https://cut.eco/", description: "Blockchain-based carbon offsetting infrastructure. ISO-certified credits and FMA-regulated operations.", category: "carbon" },
  { name: "Carbon Utility Token (CUT)", url: "https://cut.eco/", description: "Native utility token powering the carbon ecosystem. Enterprise-grade tokenized carbon credits.", category: "carbon" },
  { name: "Plato AI Analyst", url: "https://analyst.platodata.io/", description: "AI Powered Data Analytics and Business Intelligence Platform. Real-time insights and reporting.", category: "ai" },
  { name: "Plato AI Carbon", url: "https://platocarbon.net/", description: "Carbon Tokenization and Trading Platform. Carbon / ESG Data Intelligence. Framework & Compliance Engine.", category: "carbon" },
  { name: "Plato AI Code Nexus", url: "https://nexus-web3-mirror.vercel.app/", description: "AI development platform for next-generation Web3 AI Applications. Multiprotocol. Token Generation & Issuance.", category: "web3" },
  { name: "Plato AI Creator", url: "https://dashboard.platodata.io/", description: "AI Powered Content Creation and Generation Platform. Create, curate, and distribute at scale.", category: "ai" },
  { name: "Plato AI Cyber Guard", url: "https://plato-guard-dash.vercel.app/", description: "Enterprise-grade cybersecurity protection platform with real-time threat detection and response.", category: "cyber" },
  { name: "Plato AI Cypher", url: "https://plato-ai-cypher.vercel.app/", description: "Protect your applications with intelligent, automated security scanning. Detect vulnerabilities before they become threats.", category: "cyber" },
  { name: "Plato AI Data Intelligence", url: "https://platodata.network/", description: "Vertically focused AI-powered data and intelligence engine. 45 Verticals. 35 Languages.", category: "ai" },
  { name: "Plato AI Ecommerce", url: "https://plato-ai-ascent.vercel.app/prototypes", description: "AI-powered ecommerce solutions. Framework. UI / UX. AI Recommendation Engine.", category: "web3" },
  { name: "Plato AI Media Network", url: "https://platow3.net/", description: "Web3 media streaming platform with decentralized content distribution and digital rights management.", category: "media" },
  { name: "Plato AI Moneyball", url: "https://aiio-plato.vercel.app/", description: "AI Powered Sports Data Analytic Engine and Scouting Platform. Moneyball Reimagined.", category: "ai" },
  { name: "Plato AI Payments (BSC)", url: "https://plato-swift-pay-bsc-e2mi.vercel.app/", description: "AI-powered payment solutions on Binance Smart Chain. Fast, secure cross-border transactions.", category: "finance" },
  { name: "Plato AI Payments (SOL)", url: "https://plato-swift-pay-solana.vercel.app/", description: "AI-powered payment solutions on Solana. Lightning-fast, low-cost cross-border transactions.", category: "finance" },
  { name: "Plato AI Sanction Sniffer", url: "https://plato-cyber.vercel.app/", description: "AI Powered Cyber Threat Detection and Sanctions Compliance Platform. Cross Protocol. Validated.", category: "cyber" },
  { name: "Plato AI SYNC DRM", url: "https://platomusic.net/", description: "AI Powered SYNC and DRM licensing Engine. Built for TV, Commercials & Film.", category: "media" },
  { name: "Plato AI Web3 Browser", url: "https://plato-w3-ai-browser.vercel.app/", description: "Decentralized browser with native Web3 integration and AI-powered features.", category: "web3" },
  { name: "Plato AI ESG Ark", url: "https://ark-intel-insights-platform.vercel.app/", description: "AI-powered ESG intelligence and sustainability insights platform. Environmental, Social, and Governance analytics.", category: "carbon" },
  { name: "Plato AI Gaming", url: "https://plato-ai-gaming.vercel.app/", description: "AI-powered gaming platform and analytics. Next-generation gaming experiences and player insights.", category: "web3" },
  { name: "Plato AI W3 Mail", url: "https://plato-ai-w3-mail.vercel.app/", description: "Decentralized Web3 email platform. Secure, encrypted communication on the blockchain.", category: "web3" },
  { name: "Plato RWA", url: "https://plato-rwa-jhfu.vercel.app/", description: "Real World Asset tokenization and exchange platform. Trade, invest, and manage tokenized real-world assets on-chain.", category: "finance" },
  { name: "Plato Cartoon NFT", url: "https://cn-cartoon-craze.vercel.app/", description: "Animated NFT Collection and Creative Digital Art Platform. Unique cartoon-style digital collectibles.", category: "nft" },
  { name: "Plato Maxim NFT", url: "https://maxim-hotlist-gems.vercel.app/", description: "NFT marketplace and collection platform. Discover, collect, and trade unique digital assets.", category: "nft" },
];

const categories = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI & Data" },
  { key: "carbon", label: "Carbon & ESG" },
  { key: "web3", label: "Web3" },
  { key: "cyber", label: "Cybersecurity" },
  { key: "finance", label: "Finance" },
  { key: "media", label: "Media" },
  { key: "nft", label: "NFTs" },
];

const categoryColors: Record<string, string> = {
  carbon: "from-[hsl(145,100%,38%)] to-[hsl(175,100%,42%)]",
  ai: "from-[hsl(275,85%,55%)] to-[hsl(220,100%,55%)]",
  web3: "from-[hsl(200,100%,55%)] to-[hsl(250,80%,60%)]",
  cyber: "from-[hsl(0,90%,55%)] to-[hsl(330,100%,55%)]",
  media: "from-[hsl(330,100%,55%)] to-[hsl(275,85%,55%)]",
  finance: "from-[hsl(50,95%,55%)] to-[hsl(30,100%,52%)]",
  nft: "from-[hsl(190,100%,48%)] to-[hsl(220,100%,55%)]",
};

const categoryLabels: Record<string, string> = {
  carbon: "Carbon & ESG",
  ai: "AI & Data",
  web3: "Web3",
  cyber: "Cybersecurity",
  media: "Media",
  finance: "Finance",
  nft: "NFT",
};

const Showcase = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title="Showcase" description="Portfolio showcase of The Tomorrow Company's investments and ventures across Web3, AI, and real-world assets." path="/showcase" />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(275,85%,55%,0.08)] via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border text-xs font-medium text-muted-foreground mb-6">
              <Sparkles className="h-3 w-3" /> Tomorrow Company Portfolio
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-3 text-foreground">
              Multi-Platform Ecosystem
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Consolidating Carbon Distributed Technologies AG and Plato Web3 AI into a unified Web3 infrastructure powerhouse — streamlining operations in a diversified revenue / profit driven model.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat.key
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, delay: i * 0.02, ease: "easeOut" }}
                className="group relative rounded-xl border border-border bg-card p-6 hover:border-[hsl(250,80%,60%,0.4)] transition-all duration-500 hover:shadow-[0_0_40px_-12px_hsl(250,80%,60%,0.2)] overflow-hidden"
              >
                {/* Gradient line top */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${categoryColors[item.category]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Floating orb */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${categoryColors[item.category]} opacity-0 group-hover:opacity-[0.06] blur-3xl transition-opacity duration-700`} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-8 w-8 animated-gradient-icon-bright flex-shrink-0"
                        style={{
                          WebkitMaskImage: `url(${platoIcon})`,
                          maskImage: `url(${platoIcon})`,
                          WebkitMaskSize: "contain",
                          maskSize: "contain",
                          WebkitMaskRepeat: "no-repeat",
                          maskRepeat: "no-repeat",
                          WebkitMaskPosition: "center",
                          maskPosition: "center",
                        }}
                      />
                      <div>
                        <h3 className="text-base font-semibold text-foreground group-hover:text-foreground transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-sm font-medium text-muted-foreground">
                          {categoryLabels[item.category]}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 transition-all duration-300" />
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <span className={`text-sm font-semibold bg-gradient-to-r ${categoryColors[item.category]} bg-clip-text text-transparent`}>
                      Visit Showcase →
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
            </AnimatePresence>
          </div>

          {/* Count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-muted-foreground mt-10"
          >
            Showing {filtered.length} of {portfolioItems.length} platforms
          </motion.p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Showcase;
