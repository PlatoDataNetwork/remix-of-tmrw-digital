import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import heroBg from "@/assets/hero-bg.png";

const heroMessages = [
  { line1: "Accelerating Growth", line2: "Through Space & Time." },
  { line1: "Secure Network Protocol", line2: "For the Next Web." },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-[hsl(220,20%,4%)]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-contain object-center translate-y-8 dark:translate-y-8 scale-100 dark:scale-110"
        />
        {/* Animated Gradient Overlay - tints the image */}
        <div className="absolute inset-0 pointer-events-none animated-gradient-hero-overlay" />
        {/* Dark Overlays - on top for contrast */}
        <div className="absolute inset-0 bg-[hsl(220,20%,4%,0.25)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,20%,4%,0.3)] via-transparent to-[hsl(220,20%,4%)]" />
      </div>

      {/* Colorful theme gradient orbs */}
      <div className="absolute inset-0 pointer-events-none colorful-gradient-hero opacity-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[hsl(250,80%,60%,0.15)] blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[hsl(200,90%,50%,0.1)] blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(330,80%,55%,0.08)] blur-[140px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <div className="relative h-[110px] md:h-[160px] lg:h-[200px] mb-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="text-[2.2rem] md:text-[3rem] lg:text-[4.5rem] font-extralight leading-[1.1] tracking-tight text-white absolute whitespace-nowrap"
            >
              {heroMessages[currentIndex].line1}
              <br />
              {heroMessages[currentIndex].line2}
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base md:text-lg uppercase tracking-[0.4em] text-white/50"
        >
          RWA's · Web3 AI · Cyber · Data · Compliance
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed font-light mt-3"
        >
          The Tomorrow Company is a Diversified Web3 Infrastructure and Digital Asset
          Holding Company Building the Infrastructure for Tomorrow's Digital Economy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-14 flex flex-col sm:flex-row gap-6 justify-center"
        >
          <a
            href="#about"
            className="inline-flex h-14 px-12 items-center justify-center rounded-full bg-gradient-to-r from-[hsl(260,80%,55%)] to-[hsl(220,90%,55%)] text-white text-base font-medium hover:opacity-90 transition-opacity"
          >
            Learn More
          </a>
          <a
            href="#contact"
            className="inline-flex h-14 px-12 items-center justify-center rounded-full border border-white/30 text-white text-base font-medium hover:bg-white/10 transition-colors"
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
