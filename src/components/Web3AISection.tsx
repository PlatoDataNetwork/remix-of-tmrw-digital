import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bot, Coins, Zap, BarChart3, Users, Database } from "lucide-react";
import { Link } from "react-router-dom";

const innovations = [
  {
    icon: Bot,
    title: "AI-Powered Automation",
    slug: "ai-automation",
    stat: "60% Cost Reduction",
    description: "Advanced automation for compliance, AML/KYC, transaction scoring, and real-time reporting.",
  },
  {
    icon: Coins,
    title: "Token Ecosystem",
    slug: "token-ecosystem",
    stat: "Dual Revenue",
    description: "Proprietary token driving rewards, incentives, and cross-border transactions across the network.",
  },
  {
    icon: Zap,
    title: "Cross-Border Settlements",
    slug: "cross-border-settlements",
    stat: "<1 Min Settlement",
    description: "Solana-based stablecoin infrastructure enabling near-instant settlements with zero FX friction.",
  },
  {
    icon: Database,
    title: "RWA Infrastructure",
    slug: "rwa-infrastructure",
    stat: "Compliant Exchange",
    description: "Blockchain-verified tokenization of real-world assets including carbon credits, commodities, and digital securities.",
  },
  {
    icon: BarChart3,
    title: "Vertical Intelligence",
    slug: "vertical-intelligence",
    stat: "Real-Time Analytics",
    description: "Industry-specific AI models delivering actionable insights across carbon markets, compliance, and financial operations.",
  },
  {
    icon: Users,
    title: "Community Driven",
    slug: "community-driven",
    stat: "Global Network",
    description: "Decentralized governance and network effects driving adoption through incentivized participation and stakeholder alignment.",
  },
];

const Web3AISection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="web3ai" className="relative py-32 lg:py-40 bg-background overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none colorful-gradient opacity-0">
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(220,90%,50%,0.06)] blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Web3 AI</p>
          <h2 className="text-3xl md:text-5xl font-light text-foreground mb-6">
            Digital Transformation Through
            <br />
            Web3 AI & Tokenization
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto font-light">
            TMRW brings deep expertise in AI-driven automation and blockchain infrastructure to transform how data is created, stored and distributed — creating unprecedented efficiency, transparency, and shareholder value.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {innovations.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:bg-[hsl(250,80%,60%,0.12)] hover:border-[hsl(250,80%,60%,0.4)] hover:shadow-[0_0_30px_-10px_hsl(250,80%,60%,0.25)] transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="h-8 w-8 mb-4 animated-gradient-card-icon">
                <item.icon className="h-full w-full" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 block">{item.stat}</span>
              <h3 className="text-lg font-medium text-foreground mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light flex-1">{item.description}</p>
              <div className="mt-6 flex justify-end">
                <Link
                  to={`/web3ai/${item.slug}`}
                  className="learn-more-link text-xs uppercase tracking-[0.15em] text-muted-foreground group-hover:animated-gradient-text transition-colors duration-300"
                >
                  Learn More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Web3AISection;
