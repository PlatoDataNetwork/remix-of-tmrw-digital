import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag, Clock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import blogHero from "@/assets/blog-hero.webp";

export interface BlogPostData {
  date: string;
  category: string;
  readTime?: string;
  title: string;
  subtitle: string;
  heroImage?: string;
  sections: {
    heading: string;
    content: string[];
  }[];
  keyTakeaways: string[];
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const BlogPostTemplate = ({ data }: { data: BlogPostData }) => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={data.title}
        description={data.subtitle}
        path={location.pathname}
        type="article"
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-10 lg:pt-44 lg:pb-14 bg-background overflow-hidden">
        <div className="absolute inset-0 pointer-events-none colorful-gradient opacity-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[hsl(250,80%,60%,0.08)] blur-[150px]" />
          <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full bg-[hsl(280,80%,60%,0.06)] blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <Link
              to="/intel"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Intel
            </Link>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.05 }} className="flex flex-wrap items-center gap-4 mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {data.date}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
              <Tag className="h-3 w-3" />
              {data.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {data.readTime}
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-light text-foreground leading-tight mb-6"
          >
            {data.title}
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground font-light leading-relaxed"
          >
            {data.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Hero Image */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative rounded-2xl overflow-hidden animated-gradient-icon"
        >
          <img
            src={data.heroImage || blogHero}
            alt={data.title}
            className="w-full h-[300px] md:h-[420px] object-cover"
          />
        </motion.div>
      </div>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 mt-10">
        <div className="border-t border-border" />
      </div>

      {/* Content */}
      <section className="py-14 lg:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {data.sections.map((section, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="mb-12 last:mb-0"
            >
              <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">
                {section.heading}
              </h2>
              {section.content.map((paragraph, j) => (
                <p key={j} className="text-muted-foreground font-light leading-relaxed text-base mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="py-14 lg:py-20 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Key Takeaways</p>
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-8">
              What You Need to Know
            </h2>
            <div className="space-y-4">
              {data.keyTakeaways.map((takeaway, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="text-xs font-medium text-foreground bg-foreground/10 rounded-full h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-muted-foreground font-light leading-relaxed">{takeaway}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6">
              Want to Learn More?
            </h2>
            <p className="text-muted-foreground font-light mb-10 max-w-xl mx-auto">
              Connect with our team to discuss how these insights apply to your investment strategy.
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

export default BlogPostTemplate;
