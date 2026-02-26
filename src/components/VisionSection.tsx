import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Coins, ShieldCheck, TrendingUp } from "lucide-react";

const visionCards = [
  {
    icon: Globe,
    title: "Web3AI Platform",
    stat: "13M+ Visitors",
    description: "Next-generation decentralized browser and AI / Web3 Dev Tools across 160+ countries and 35 languages. Web3 secured access through an Immersive UI / UX.",
  },
  {
    icon: Coins,
    title: "RWA Tokenization",
    stat: "RWA Exchange",
    description: "Blockchain-based tokenization of real-world assets including carbon credits, commodities, and digital securities with regulatory compliance.",
  },
  {
    icon: ShieldCheck,
    title: "Regulatory Excellence",
    stat: "Fully Compliant",
    description: "FMA-regulated blockchain infrastructure combined with TSX public market credibility and transparency.",
  },
  {
    icon: TrendingUp,
    title: "Public Market Access",
    stat: "Q2 2026 Launch",
    description: "RTO transaction targeting TSX Venture Exchange listing Q2 2026 with experienced management team.",
  },
];

const VisionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="vision" className="relative py-16 lg:py-24 bg-background overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none colorful-gradient opacity-0">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[hsl(200,90%,50%,0.06)] blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[hsl(280,80%,60%,0.05)] blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Vision</p>
          <h2 className="text-3xl md:text-5xl font-light leading-tight text-foreground mb-6">
            Building the Infrastructure for
            <br />
            Tomorrow's Digital Economy
          </h2>
          <div className="w-16 h-px bg-foreground/20 mb-8" />
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl font-light leading-relaxed">
            Tomorrow Digital Inc. (DBA: The Tomorrow Company) consolidates Plato AI with Carbon Distributed Technologies, creating the Foundation for Tomorrow's Digital Economy.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visionCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:border-foreground/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-foreground/10 transition-colors">
                <card.icon className="h-5 w-5 text-foreground" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 block">{card.stat}</span>
              <h3 className="text-lg font-medium text-foreground mb-3">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
