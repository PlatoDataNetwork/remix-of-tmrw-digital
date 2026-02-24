import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 lg:py-40 bg-background overflow-hidden" ref={ref}>
      {/* Colorful theme gradient */}
      <div className="absolute inset-0 pointer-events-none colorful-gradient opacity-0">
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-[hsl(250,80%,60%,0.08)] blur-[100px]" />
        <div className="absolute bottom-0 -left-20 w-[300px] h-[300px] rounded-full bg-[hsl(200,90%,50%,0.06)] blur-[80px]" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">About</p>
            <h2 className="text-3xl md:text-5xl font-light leading-tight text-foreground mb-8">
              Built on Experience.
              <br />
              Driven by Results.
            </h2>
            <div className="w-16 h-px bg-foreground/20 mb-8" />
            <p className="text-muted-foreground leading-relaxed text-base lg:text-lg font-light">
              With over two decades of proven expertise, our team has guided hundreds of companies through critical growth stages — delivering measurable outcomes backed by deep industry knowledge and strategic execution. We combine disciplined capital deployment with forward-thinking advisory to unlock lasting value across emerging and established markets alike.
            </p>
          </motion.div>

          {/* Right - Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Philosophy</p>
            <h3 className="text-3xl md:text-5xl font-light leading-tight text-foreground mb-6">
              Where Intelligence Meets
              <br />
              the New Economy.
            </h3>
            <div className="w-16 h-px bg-foreground/20 mb-8" />
            <p className="text-muted-foreground leading-relaxed text-base lg:text-lg font-light">
              The convergence of AI, Web3, and blockchain is redefining how capital moves,
              how value is measured, and how trust is established. We believe tomorrow's
              markets will be built on transparency, decentralization, and intelligent
              infrastructure — and we're positioning ourselves to take the lead and drive excellence across this emerging sector.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-8">
              {[
                { number: "100+", label: "Years Experience" },
                { number: "70K+", label: "Enterprise Engagements" },
                { number: "$2B+", label: "Value Created" },
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
