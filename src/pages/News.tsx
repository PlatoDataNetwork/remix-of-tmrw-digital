import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import platoIcon from "@/assets/plato-icon.webp";

const articles = [
  {
    date: "Mar 2026",
    category: "Press Release",
    title: "The Tomorrow Company Launches With a Bold Mandate to Build the Infrastructure Layer of the AI-Native Financial Era",
    excerpt: "Strategic merger forms an integrated Web3 infrastructure platform at the convergence of AI, tokenized real-world assets, and programmable climate markets.",
    slug: "/intelligence/tmrw-launch",
  },
];

const News = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="News" description="The latest news, press releases, and announcements from The Tomorrow Company." path="/news" />
      <Navbar />

      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 bg-background overflow-hidden" ref={ref}>
        <div className="absolute inset-0 pointer-events-none colorful-gradient opacity-0">
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[hsl(330,80%,55%,0.06)] blur-[100px]" />
          <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] rounded-full bg-[hsl(200,90%,50%,0.05)] blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">News</p>
            <h1 className="text-3xl md:text-5xl font-light text-foreground mb-6">
              Company News
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl font-light">
              Press releases, announcements, and updates from The Tomorrow Company.
            </p>
          </motion.div>

          <div className="space-y-0 divide-y divide-border/40">
            {articles.map((article, i) => (
              <Link to={article.slug} key={article.title}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="group py-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 cursor-pointer hover:bg-accent/30 -mx-6 px-6 transition-colors rounded-lg"
                >
                  <div
                    className="h-8 w-8 animated-gradient-icon-bright shrink-0"
                    style={{
                      WebkitMaskImage: `url(${platoIcon})`,
                      maskImage: `url(${platoIcon})`,
                      WebkitMaskSize: 'contain',
                      maskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskPosition: 'center',
                    }}
                  />
                  <div className="flex items-center gap-4 md:w-48 shrink-0">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{article.date}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">{article.category}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-medium text-foreground group-hover:text-foreground/80 transition-colors mb-1">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-light">{article.excerpt}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 hidden md:block" />
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default News;
