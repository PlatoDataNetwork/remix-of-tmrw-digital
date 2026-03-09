import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, Zap, Target, ArrowRight } from "lucide-react";

const pillars = [
  {
    icon: Layers,
    number: "01",
    title: "Infrastructure First",
    description:
      "We don't chase trends — we build the rails they run on. Every protocol, every platform, every token begins with institutional-grade infrastructure designed to outlast market cycles.",
  },
  {
    icon: Target,
    number: "02",
    title: "Vertical Intelligence",
    description:
      "Horizontal platforms commoditize. We go deep — embedding AI natively into each vertical so that data, compliance, and execution become a single, indivisible layer.",
  },
  {
    icon: Zap,
    number: "03",
    title: "Convergence by Design",
    description:
      "Web3 without AI is plumbing. AI without Web3 is a black box. We architect both simultaneously — creating systems where trust is verifiable and intelligence is decentralized.",
  },
  {
    icon: ArrowRight,
    number: "04",
    title: "Capital-Ready from Day One",
    description:
      "Every product we ship is built to withstand regulatory scrutiny, institutional due diligence, and public market transparency. If it can't survive the light, we don't build it.",
  },
];

const MethodologySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      id="methodology"
      className="relative py-16 lg:py-24 bg-background overflow-hidden"
      ref={ref}
    >
      {/* Subtle background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[140px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Methodology
          </p>
          <h2 className="text-3xl md:text-5xl font-light leading-tight text-foreground mb-6">
            Conviction Over Convention
          </h2>
          <div className="w-16 h-px bg-foreground/20 mb-8" />
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl font-light leading-relaxed">
            Most companies optimize for the next quarter. We engineer for the next era. Our methodology is rooted in a single premise: the future belongs to those who build its infrastructure — not those who speculate on its surface.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid md:grid-cols-2 gap-px bg-border rounded-xl overflow-hidden">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-card p-8 lg:p-10 group"
            >
              <div className="flex items-start gap-5">
                <span className="text-3xl font-extralight text-muted-foreground/30 select-none">
                  {pillar.number}
                </span>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <pillar.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                    <h3 className="text-lg font-semibold text-foreground">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chairman quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 border-l-2 border-foreground/10 pl-8 max-w-2xl mx-auto"
        >
          <p className="text-base lg:text-lg text-muted-foreground font-light italic leading-relaxed mb-4">
            "We're not building another fintech company. We're engineering the infrastructure layer that the next generation of capital markets will run on — where AI is native, assets are programmable, and trust is verifiable by default."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-foreground/20" />
            <p className="text-sm font-medium text-foreground">
              Justin Hartzman
              <span className="text-muted-foreground font-light"> — Chairman</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MethodologySection;
