import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Users, Shield, Cpu, BarChart3, Globe } from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "Web3 AI",
    description: "Strategic guidance through Web3 and AI-powered solutions for optimal digital transformation.",
  },
  {
    icon: Users,
    title: "Real World Assets",
    description: "Tokenizing and managing real world assets for broader investor accessibility and liquidity.",
  },
  {
    icon: Shield,
    title: "Data Intelligence",
    description: "Harnessing data-driven insights to identify opportunities and drive strategic decision-making.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Analytics",
    description: "Leveraging cutting-edge artificial intelligence to identify and engage with high-value investors.",
  },
  {
    icon: BarChart3,
    title: "Cyber Defense",
    description: "Advanced threat detection and blockchain security audits to protect digital assets.",
  },
  {
    icon: Globe,
    title: "Digital Strategy",
    description: "Comprehensive social media and digital outreach programs tailored to Web3 and RWA markets.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="services" className="relative py-32 lg:py-40 bg-background overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none colorful-gradient opacity-0">
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(250,80%,60%,0.06)] blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Services</p>
          <h2 className="text-3xl md:text-5xl font-light text-foreground mb-6">
            What We Deliver
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:border-[hsl(250,80%,60%,0.4)] hover:shadow-[0_0_30px_-10px_hsl(250,80%,60%,0.2)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-[hsl(250,80%,60%,0.15)] transition-colors">
                <service.icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-3">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
