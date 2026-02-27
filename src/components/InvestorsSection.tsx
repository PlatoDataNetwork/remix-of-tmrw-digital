import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Shield, Globe, Users, BarChart3, Briefcase } from "lucide-react";

const highlights = [
  {
    icon: TrendingUp,
    title: "Institutional-Grade Returns",
    description: "Access diversified portfolios across real-world assets with risk-adjusted performance benchmarks.",
  },
  {
    icon: Shield,
    title: "Regulatory Compliance",
    description: "Fully compliant investment structures across multiple jurisdictions with transparent reporting.",
  },
  {
    icon: Globe,
    title: "Global Market Access",
    description: "Participate in cross-border opportunities spanning energy, infrastructure, and commodities.",
  },
  {
    icon: Users,
    title: "Strategic Partnerships",
    description: "Co-invest alongside sovereign wealth funds, family offices, and institutional allocators.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Insights",
    description: "AI-powered analytics and real-time reporting for informed investment decisions.",
  },
  {
    icon: Briefcase,
    title: "Tailored Mandates",
    description: "Custom investment mandates aligned with your risk appetite, sector focus, and ESG criteria.",
  },
];

const InvestorsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="investors" className="relative py-16 lg:py-24 bg-background overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-[hsl(var(--primary)/0.05)] blur-[120px]" />
        <div className="absolute bottom-1/3 right-0 w-[350px] h-[350px] rounded-full bg-[hsl(var(--accent)/0.05)] blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Investors</p>
          <h2 className="text-3xl md:text-5xl font-light text-foreground mb-6">
            Partner With Confidence
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl font-light">
            We provide institutional and accredited investors with structured access to
            high-conviction opportunities across global real-world asset markets.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:border-foreground/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-foreground/10 transition-colors">
                <item.icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <Link
            to="/investors"
            className="inline-flex h-12 px-8 items-center justify-center rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Request Investor Access
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default InvestorsSection;
