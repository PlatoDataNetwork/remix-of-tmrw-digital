import { motion } from "framer-motion";
import { LucideIcon, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export interface ServicePageData {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  heroDescription: string;
  overview: string;
  capabilities: {
    title: string;
    description: string;
  }[];
  benefits: {
    title: string;
    description: string;
  }[];
  stats: {
    label: string;
    value: string;
  }[];
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const ServicePageTemplate = ({ data }: { data: ServicePageData }) => {
  const Icon = data.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-10 lg:pt-44 lg:pb-14 bg-background overflow-hidden">
        <div className="absolute inset-0 pointer-events-none colorful-gradient opacity-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[hsl(250,80%,60%,0.08)] blur-[150px]" />
          <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full bg-[hsl(280,80%,60%,0.06)] blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <Link
              to="/#services"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Link>
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3"
          >
            {data.subtitle}
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4 mb-8"
          >
            <Icon className="h-[1.875rem] w-[1.875rem] md:h-[2.25rem] md:w-[2.25rem] text-foreground" />
            <h1 className="text-3xl md:text-4xl font-light text-foreground">
              {data.title}
            </h1>
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground max-w-3xl font-light leading-relaxed"
          >
            {data.heroDescription}
          </motion.p>
        </div>
      </section>

      {/* Overview + Capabilities */}
      <section className="pt-10 pb-14 lg:pt-14 lg:pb-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none colorful-gradient opacity-0">
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-[hsl(250,70%,50%,0.05)] blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Overview</p>
              <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6">
                Service Deep Dive
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed text-base">
                {data.overview}
              </p>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-6"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                Core Capabilities
              </p>
              {data.capabilities.map((cap, i) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle2 className="h-5 w-5 text-foreground shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">{cap.title}</h4>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="pt-14 pb-24 lg:pt-20 lg:pb-32 bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none colorful-gradient opacity-0">
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[hsl(250,80%,60%,0.06)] blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Benefits</p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground">
              Why It Matters
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-8 hover:border-foreground/20 transition-all duration-300"
              >
                <h3 className="text-lg font-medium text-foreground mb-3">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground font-light mb-10 max-w-xl mx-auto">
              Connect with our team to explore how our {data.title.toLowerCase()} solutions can transform your operations.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center px-8 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicePageTemplate;
