import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 lg:py-40 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">About</p>
            <h2 className="text-3xl md:text-5xl font-light leading-tight text-foreground mb-8">
              Built on <span className="font-semibold">Experience.</span>
              <br />
              Driven by <span className="font-semibold">Results.</span>
            </h2>
            <div className="w-16 h-px bg-foreground/20 mb-8" />
            <p className="text-muted-foreground leading-relaxed text-base lg:text-lg font-light">
              RCA Financial Partners provides capital markets and investor relations advice
              to small and micro-cap public and pre-IPO management teams at the critical
              inflection point where proven results require prudent financing for success.
            </p>
          </motion.div>

          {/* Right - Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Philosophy</p>
            <h3 className="text-2xl md:text-3xl font-light leading-tight text-foreground mb-6">
              Acceleration Through
              <br />
              <span className="font-semibold">Strategic Partnerships</span>
            </h3>
            <div className="w-16 h-px bg-foreground/20 mb-8" />
            <p className="text-muted-foreground leading-relaxed text-base lg:text-lg font-light">
              RCA principals utilize extensive investor relations, social media, and capital
              markets expertise to create a well-informed, loyal, and supportive shareholder
              base coordinated with successful navigation through both private and public
              financing activities.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-8">
              {[
                { number: "20+", label: "Years Experience" },
                { number: "150+", label: "Clients Served" },
                { number: "$2B+", label: "Capital Raised" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl md:text-3xl font-semibold text-foreground">{stat.number}</p>
                  <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
