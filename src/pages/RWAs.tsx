import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Flame, Mountain, Gem, Building2, Home, BarChart3, Leaf, Landmark, Receipt, Plug, Crown, Coins } from "lucide-react";

const sectors = [
  { icon: Leaf, title: "Carbon Credits", description: "Tokenized verified carbon credits and environmental assets bringing transparency and liquidity to global climate finance." },
  { icon: Crown, title: "Collectables", description: "Tokenized fine art, luxury watches, rare wines, and vintage cars unlocking fractional ownership in alternative asset markets." },
  { icon: BarChart3, title: "Commodities", description: "Agricultural, energy, and material commodities structured for institutional and retail participation." },
  { icon: Flame, title: "Energy", description: "Oil, gas, renewables, and next-generation energy infrastructure investments driving the global transition." },
  { icon: Building2, title: "Infrastructure", description: "Large-scale public and private infrastructure projects delivering long-term, stable returns." },
  { icon: Mountain, title: "Metals", description: "Precious and industrial metals exploration, production, and supply chain investment opportunities." },
  { icon: Gem, title: "Rare Earth Minerals", description: "Critical mineral resources essential for advanced technology, defense, and clean energy applications." },
  { icon: Home, title: "Real Estate", description: "Commercial and residential real estate assets tokenized for broader investor accessibility." },
  { icon: Landmark, title: "Sovereign Wealth", description: "Strategic partnerships with sovereign wealth funds and government-backed investment vehicles." },
  { icon: Coins, title: "Stablecoins", description: "Institutional-grade stablecoin infrastructure powering settlement, cross-border payments, and yield generation for tokenized assets." },
  { icon: Receipt, title: "Tax Credits", description: "Tokenized federal and state tax credits unlocking liquidity in renewable energy, housing, and R&D incentive programs." },
  { icon: Plug, title: "Utilities", description: "Tokenized utility infrastructure assets from power generation and water systems to telecommunications networks." },
];

const RWAs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Real World Assets" description="Explore tokenized real-world asset sectors including carbon credits, commodities, energy, metals, real estate, and more." path="/rwas" />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-44 lg:pb-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4"
          >
            Real World Assets (RWAs)
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-6"
          >
            Investing in the <span className="font-semibold">Real World of Asset Tokenization</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-light"
          >
            Bridging traditional assets with modern Web3AI markets through tokenization,
            data intelligence, and institutional-grade access.
          </motion.p>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="pb-32 lg:pb-40 bg-background" ref={ref}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectors.map((sector, i) => (
              <motion.div
                key={sector.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative bg-card border border-border rounded-2xl p-8 hover:border-foreground/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-foreground/10 transition-colors">
                  <sector.icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-3">{sector.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  {sector.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RWAs;
