import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { useCurrentLanguage, langPath } from "@/hooks/useLanguage";
import { Rocket, Brain, Shield, Globe, Layers, Zap, ArrowRight, Users, TrendingUp, Code } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const verticals = [
  {
    icon: Layers,
    title: "RWA Tokenization",
    desc: "End-to-end infrastructure for tokenizing real-world assets — from carbon credits to real estate, commodities to sovereign debt.",
    tags: ["ERC-3643", "Compliance", "Issuance"],
  },
  {
    icon: Brain,
    title: "AI-Powered Analytics",
    desc: "Machine learning models for asset valuation, risk scoring, market intelligence, and autonomous portfolio management.",
    tags: ["NLP", "Predictive Models", "Data Pipelines"],
  },
  {
    icon: Shield,
    title: "DeFi Security",
    desc: "Smart contract auditing, penetration testing, and real-time threat detection for decentralized protocols.",
    tags: ["Audit", "Monitoring", "Incident Response"],
  },
  {
    icon: Globe,
    title: "Cross-Border Settlement",
    desc: "Stablecoin-native payment rails and multi-chain bridging for institutional-grade cross-border transactions.",
    tags: ["SWIFT Alternative", "Multi-Chain", "Stablecoins"],
  },
  {
    icon: Code,
    title: "Protocol Development",
    desc: "Custom smart contract development, SDK tooling, and developer infrastructure for Web3 ecosystems.",
    tags: ["Solidity", "Rust", "SDKs"],
  },
  {
    icon: Zap,
    title: "Carbon & ESG Tech",
    desc: "Blockchain-verified carbon credit platforms, ESG scoring engines, and sustainability reporting tools.",
    tags: ["MRV", "Verification", "Offsets"],
  },
];

const stats = [
  { value: "12+", label: "Active Portfolio Companies" },
  { value: "$200B+", label: "Addressable Market by 2030" },
  { value: "6", label: "Core Verticals" },
  { value: "3", label: "Continents" },
];


const Labs = () => {
  const currentLang = useCurrentLanguage();
  const lp = (path: string) => langPath(currentLang, path);

  return (
    <>
      <SEOHead
        title="Tomorrow Labs"
        description="Tomorrow Labs is a Web3 AI & RWA venture lab and incubator — building, funding, and scaling the next generation of tokenization and decentralized infrastructure."
        path="/labs"
      />
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        {/* Hero */}
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div variants={fadeIn} custom={0} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted/50 mb-8">
                <Rocket className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Venture Lab & Incubator</span>
              </motion.div>

              <motion.h1 variants={fadeIn} custom={1} className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground">
                Tomorrow Labs
              </motion.h1>

              <motion.p variants={fadeIn} custom={2} className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                We build, fund, and scale the infrastructure layer of tokenized finance.
                A venture lab purpose-built for Web3 AI and real-world asset development.
              </motion.p>

              <motion.div variants={fadeIn} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to={lp("/investors")}
                  className="inline-flex h-12 px-8 items-center justify-center rounded-full bg-gradient-to-r from-[hsl(260,80%,55%)] to-[hsl(220,90%,55%)] text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Partner With Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to={lp("/whitepaper")}
                  className="inline-flex h-12 px-8 items-center justify-center rounded-full border border-border text-foreground font-medium hover:bg-muted/50 transition-colors"
                >
                  Read the Whitepaper
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>


        {/* Thesis */}
        <section className="py-20 sm:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <motion.h2 variants={fadeIn} custom={0} className="text-3xl sm:text-4xl font-bold mb-6">
                The Issuance Layer Thesis
              </motion.h2>
              <motion.p variants={fadeIn} custom={1} className="text-muted-foreground text-lg leading-relaxed">
                Individual assets come and go. The infrastructure that issues, manages, and settles them captures value indefinitely.
                Tomorrow Labs identifies and incubates teams building at this critical layer — where compliance meets composability
                and real-world value meets on-chain liquidity.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {[
                { icon: TrendingUp, title: "Capital Efficiency", desc: "Tokenized assets unlock 24/7 liquidity, fractional ownership, and programmable yield — reducing friction by orders of magnitude." },
                { icon: Shield, title: "Regulatory-First", desc: "Every project in our portfolio is built with compliance as a feature, not an afterthought. ERC-3643, KYC/AML, jurisdictional frameworks." },
                { icon: Users, title: "Ecosystem Network Effects", desc: "Portfolio companies share infrastructure, data feeds, smart contract libraries, and distribution — creating compounding returns." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeIn}
                  custom={i}
                  className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-colors"
                >
                  <item.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Verticals */}
        <section className="py-20 sm:py-28 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeIn} custom={0} className="text-3xl sm:text-4xl font-bold mb-4">
                Core Verticals
              </motion.h2>
              <motion.p variants={fadeIn} custom={1} className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Six high-conviction sectors where we deploy capital, talent, and infrastructure.
              </motion.p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {verticals.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  custom={i}
                  className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all duration-300"
                >
                  <v.icon className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{v.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {v.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* CTA */}
        <section className="py-20 sm:py-28 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h2 variants={fadeIn} custom={0} className="text-3xl sm:text-4xl font-bold mb-6">
                Building in Web3, AI, or RWA?
              </motion.h2>
              <motion.p variants={fadeIn} custom={1} className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                Tomorrow Labs provides capital, infrastructure, and distribution for founders building
                the tokenized economy. If you're working on issuance, compliance, DeFi, or AI-powered financial infrastructure —
                we want to hear from you.
              </motion.p>
              <motion.div variants={fadeIn} custom={2} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to={lp("/#contact")}
                  className="inline-flex h-12 px-8 items-center justify-center rounded-full bg-gradient-to-r from-[hsl(260,80%,55%)] to-[hsl(220,90%,55%)] text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Apply to Labs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to={lp("/deck")}
                  className="inline-flex h-12 px-8 items-center justify-center rounded-full border border-border text-foreground font-medium hover:bg-muted/50 transition-colors"
                >
                  View Our Deck
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Labs;
