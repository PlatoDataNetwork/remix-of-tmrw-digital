import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Users, Shield, Cpu, BarChart3, Globe } from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "Capital Markets Advisory",
    description: "Strategic guidance through public and private financing activities for optimal capital structure.",
  },
  {
    icon: Users,
    title: "Investor Relations",
    description: "Building and maintaining a well-informed, loyal shareholder base through targeted engagement.",
  },
  {
    icon: Shield,
    title: "Strategic Partnerships",
    description: "Cultivating meaningful relationships that accelerate growth and create lasting value.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Analytics",
    description: "Leveraging cutting-edge artificial intelligence to identify and engage with high-value investors.",
  },
  {
    icon: BarChart3,
    title: "Market Intelligence",
    description: "Data-driven insights to position your company for maximum visibility and investor interest.",
  },
  {
    icon: Globe,
    title: "Digital Strategy",
    description: "Comprehensive social media and digital outreach programs tailored to the capital markets.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-32 lg:py-40 bg-card" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Services</p>
          <h2 className="text-3xl md:text-5xl font-light text-foreground">
            What We <span className="font-semibold">Deliver</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-card p-10 group hover:bg-accent/50 transition-colors duration-300"
            >
              <service.icon className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors mb-6" />
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
