import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[110vh] flex items-end justify-center overflow-hidden pb-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-contain object-center translate-y-8 dark:translate-y-8 scale-100 dark:scale-110"
        />
        <div className="absolute inset-0 bg-[hsl(var(--hero-overlay))]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,20%,4%,0.4)] via-[hsl(220,20%,4%,0.2)] to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/60 mb-6"
        >
          Capital Markets · Investor Relations · Strategic Advisory
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-8xl font-light leading-[1.05] tracking-tight text-white mb-8"
        >
          Accelerating Growth
          <br />
          Through Trust.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed font-light"
        >
          RCA Financial Partners provides capital markets and investor relations advice
          to small and micro-cap public and pre-IPO management teams at the critical
          inflection point where proven results require prudent financing for success.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#about"
            className="inline-flex h-12 px-8 items-center justify-center rounded-full bg-white text-[hsl(220,20%,4%)] text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Learn More
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 px-8 items-center justify-center rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Contact Us
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="h-5 w-5 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
