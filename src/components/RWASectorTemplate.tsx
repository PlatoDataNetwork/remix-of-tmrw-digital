import { motion } from "framer-motion";
import { LucideIcon, ArrowLeft, CheckCircle2, TrendingUp, Shield, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export interface SectorPageData {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  heroDescription: string;
  overview: string;
  tokenizationBenefits: {
    title: string;
    description: string;
  }[];
  useCases: {
    title: string;
    description: string;
  }[];
  stats: {
    label: string;
    value: string;
  }[];
  ctaText: string;
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const RWASectorTemplate = ({ data }: { data: SectorPageData }) => {
  const Icon = data.icon;
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${data.title} — RWA Tokenization`}
        description={data.heroDescription}
        path={location.pathname}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-10 lg:pt-44 lg:pb-14 bg-background overflow-hidden">
        <div className="absolute inset-0 pointer-events-none colorful-gradient opacity-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[hsl(200,90%,50%,0.08)] blur-[150px]" />
          <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full bg-[hsl(280,80%,60%,0.06)] blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <Link
              to="/#rwas"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Real World Assets
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

      {/* Stats Bar */}
      <section className="py-10 lg:py-14 bg-secondary/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {data.stats.map((stat, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-2xl md:text-3xl font-light text-foreground mb-1">{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="pt-10 pb-14 lg:pt-14 lg:pb-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none colorful-gradient opacity-0">
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-[hsl(160,70%,50%,0.05)] blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Overview</p>
              <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6">
                Sector Deep Dive
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
                Tokenization Benefits
              </p>
              {data.tokenizationBenefits.map((benefit, i) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle2 className="h-5 w-5 text-foreground shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="pt-14 pb-24 lg:pt-20 lg:pb-32 bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none colorful-gradient opacity-0">
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[hsl(220,80%,60%,0.06)] blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Applications</p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground">
              Tokenization Use Cases
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.useCases.map((useCase, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-8 hover:border-foreground/20 transition-all duration-300"
              >
                {i % 3 === 0 ? (
                    <TrendingUp className="h-8 w-8 text-foreground" />
                  ) : i % 3 === 1 ? (
                    <Shield className="h-8 w-8 text-foreground" />
                  ) : (
                    <Globe className="h-8 w-8 text-foreground" />
                  )}
                <h3 className="text-lg font-medium text-foreground mb-3">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  {useCase.description}
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
              {data.ctaText}
            </h2>
            <p className="text-muted-foreground font-light mb-10 max-w-xl mx-auto">
              Connect with our team to explore tokenization opportunities in the {data.title.toLowerCase()} sector.
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

export default RWASectorTemplate;
