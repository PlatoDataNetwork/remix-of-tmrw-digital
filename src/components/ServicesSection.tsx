import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Users, Shield, Cpu, BarChart3, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: TrendingUp,
    title: "Web3AI",
    slug: "web3-ai",
    description: "Strategic guidance through Web3 and AI-powered solutions for optimal digital transformation.",
  },
  {
    icon: Users,
    title: "Real World Assets",
    slug: "real-world-assets",
    description: "Tokenizing and managing real world assets for broader investor accessibility and liquidity.",
  },
  {
    icon: Shield,
    title: "Data Intelligence",
    slug: "data-intelligence",
    description: "Harnessing data-driven insights to identify opportunities and drive strategic decision-making.",
  },
  {
    icon: Cpu,
    title: "AI Super Cloud",
    slug: "ai-analytics",
    description: "Leveraging cutting-edge artificial intelligence to identify and engage with high-value investors.",
  },
  {
    icon: BarChart3,
    title: "Cyber Defense",
    slug: "cyber-defense",
    description: "Advanced threat detection and blockchain security audits to protect digital assets.",
  },
  {
    icon: Globe,
    title: "Digital Strategy",
    slug: "digital-strategy",
    description: "Comprehensive social media and digital outreach programs tailored to Web3 and RWA markets.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="services" className="relative py-16 lg:py-24 bg-background overflow-hidden" ref={ref}>
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
            Comprehensive Solutions for
            <br />
            the Digital Economy
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto font-light">
            From Web3 infrastructure and AI analytics to cyber defense and digital strategy — we deliver end-to-end capabilities that drive growth, security, and competitive advantage.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:border-border/80 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <service.icon className="h-8 w-8 text-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-3">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light flex-1">
                {service.description}
              </p>
              <div className="mt-6 flex justify-end">
                <Link
                  to={`/services/${service.slug}`}
                  className="learn-more-link text-xs uppercase tracking-[0.15em] animated-gradient-text transition-colors duration-300"
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

export default ServicesSection;
