import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Flame, Mountain, Gem, Building2, Home, BarChart3, Leaf, Landmark } from "lucide-react";

const sectors = [
  { icon: Leaf, title: "Carbon Credits", slug: "carbon-credits", description: "Tokenized verified carbon credits and environmental assets bringing transparency and liquidity to global climate finance." },
  { icon: BarChart3, title: "Commodities", slug: "commodities", description: "Agricultural, energy, and material commodities structured for institutional and retail participation." },
  { icon: Flame, title: "Energy", slug: "energy", description: "Oil, gas, renewables, and next-generation energy infrastructure investments driving the global transition." },
  { icon: Building2, title: "Infrastructure", slug: "infrastructure", description: "Large-scale public and private infrastructure projects delivering long-term, stable returns." },
  { icon: Mountain, title: "Metals", slug: "metals", description: "Precious and industrial metals exploration, production, and supply chain investment opportunities." },
  { icon: Gem, title: "Rare Earth Minerals", slug: "rare-earth", description: "Critical mineral resources essential for advanced technology, defense, and clean energy applications." },
  { icon: Home, title: "Real Estate", slug: "real-estate", description: "Commercial and residential real estate assets tokenized for broader investor accessibility." },
  { icon: Landmark, title: "Sovereign Wealth", slug: "sovereign-wealth", description: "Strategic partnerships with sovereign wealth funds and government-backed investment vehicles." },
];

const RWASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="rwas" className="relative py-16 lg:py-24 bg-background overflow-hidden" ref={ref}>
      {/* Colorful theme gradient */}
      <div className="absolute inset-0 pointer-events-none colorful-gradient opacity-0">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-[hsl(200,90%,50%,0.07)] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[hsl(250,80%,60%,0.06)] blur-[100px]" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Real World Assets (RWAs)</p>
          <h2 className="text-3xl md:text-5xl font-light text-foreground mb-6">
            Investing in the Real World of Asset Tokenization
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Bridging traditional assets with modern Web3AI markets through tokenization,
            data intelligence, and institutional-grade access.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sector, i) => (
            <Link to={`/rwas/${sector.slug}`} key={sector.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative bg-card border border-border rounded-2xl p-8 hover:border-foreground/20 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
              >
                <sector.icon className="h-8 w-8 text-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-3">{sector.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light mb-6">
                  {sector.description}
                </p>
                <span className="learn-more-link mt-auto self-end text-xs uppercase tracking-[0.15em] animated-gradient-text">
                  Learn More →
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RWASection;
