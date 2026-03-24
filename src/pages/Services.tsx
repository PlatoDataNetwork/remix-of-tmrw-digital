import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { useCurrentLanguage, langPath } from "@/hooks/useLanguage";
import { TrendingUp, Users, Shield, Cpu, BarChart3, Globe, ArrowRight } from "lucide-react";
import AnimatedImage from "@/components/AnimatedImage";
import servicesHeroImg from "@/assets/services-hero.jpg";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const services = [
  {
    icon: TrendingUp,
    title: "Web3AI",
    slug: "web3-ai",
    description: "Strategic guidance through Web3 and AI-powered solutions for optimal digital transformation.",
    details: "From smart contract architecture to AI model deployment, we build the technical foundation for next-generation financial infrastructure.",
  },
  {
    icon: Users,
    title: "Real World Assets",
    slug: "real-world-assets",
    description: "Tokenizing and managing real world assets for broader investor accessibility and liquidity.",
    details: "End-to-end RWA issuance covering compliance frameworks, custody solutions, and secondary market infrastructure.",
  },
  {
    icon: Shield,
    title: "Data Intelligence",
    slug: "data-intelligence",
    description: "Harnessing data-driven insights to identify opportunities and drive strategic decision-making.",
    details: "Proprietary data pipelines, NLP-powered market analysis, and real-time intelligence feeds for institutional decision support.",
  },
  {
    icon: Cpu,
    title: "AI Super Cloud",
    slug: "ai-analytics",
    description: "Leveraging cutting-edge artificial intelligence to identify and engage with high-value investors.",
    details: "GPU-accelerated inference, model training infrastructure, and AI-as-a-Service for Web3 and financial applications.",
  },
  {
    icon: BarChart3,
    title: "Cyber Defense",
    slug: "cyber-defense",
    description: "Advanced threat detection and blockchain security audits to protect digital assets.",
    details: "Smart contract auditing, penetration testing, real-time monitoring, and incident response for decentralized protocols.",
  },
  {
    icon: Globe,
    title: "Digital Strategy",
    slug: "digital-strategy",
    description: "Comprehensive social media and digital outreach programs tailored to Web3 and RWA markets.",
    details: "Community building, KOL partnerships, performance marketing, and brand positioning across Web3 ecosystems.",
  },
];

const Services = () => {
  const currentLang = useCurrentLanguage();
  const lp = (path: string) => langPath(currentLang, path);

  return (
    <>
      <SEOHead
        title="Services | Tomorrow Company"
        description="Comprehensive Web3, AI, RWA, and cybersecurity solutions — from tokenization infrastructure to digital strategy and AI-powered analytics."
        path="/services"
      />
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        {/* Hero */}
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[140px]" />
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.p variants={fadeIn} custom={0} className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                Services
              </motion.p>
              <motion.h1 variants={fadeIn} custom={1} className="text-4xl sm:text-5xl lg:text-7xl font-light text-foreground mb-6">
                Comprehensive Solutions
                <br />
                for the Digital Economy
              </motion.h1>
              <motion.p variants={fadeIn} custom={2} className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                From Web3 infrastructure and AI analytics to cyber defense and digital strategy — we deliver end-to-end capabilities that drive growth, security, and value.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Data Center Image */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative rounded-2xl overflow-hidden"
            >
              <AnimatedImage
                src={servicesHeroImg}
                alt="Digital infrastructure and connectivity"
                className="w-full h-[260px] md:h-[380px] grayscale brightness-110"
              />
              <div className="absolute inset-0 animated-gradient-datacenter-bg" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Service Cards */}
        <section className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  custom={i}
                  className="group relative bg-card border border-border rounded-2xl p-8 hover:border-border/80 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  <service.icon className="h-8 w-8 text-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-3">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light mb-2">
                    {service.description}
                  </p>
                  <p className="text-xs text-muted-foreground/70 leading-relaxed font-light flex-1">
                    {service.details}
                  </p>
                  <div className="mt-6 flex justify-end">
                    <Link
                      to={lp(`/services/${service.slug}`)}
                      className="learn-more-link text-xs uppercase tracking-[0.15em] animated-gradient-neon-text transition-colors duration-300 inline-flex items-center gap-1"
                    >
                      Learn More <ArrowRight className="h-3 w-3" />
                    </Link>
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
                Ready to Build?
              </motion.h2>
              <motion.p variants={fadeIn} custom={1} className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                Whether you need tokenization infrastructure, AI-powered analytics, or enterprise-grade cybersecurity — our team delivers.
              </motion.p>
              <motion.div variants={fadeIn} custom={2} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to={lp("/#contact")}
                  className="inline-flex h-12 px-8 items-center justify-center rounded-full bg-gradient-to-r from-[hsl(260,80%,55%)] to-[hsl(220,90%,55%)] text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to={lp("/labs")}
                  className="inline-flex h-12 px-8 items-center justify-center rounded-full border border-border text-foreground font-medium hover:bg-muted/50 transition-colors"
                >
                  Explore TMRW Labs
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

export default Services;
