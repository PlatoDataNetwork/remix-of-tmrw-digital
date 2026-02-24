import { Gem } from "lucide-react";
import RWASectorTemplate, { SectorPageData } from "@/components/RWASectorTemplate";

const data: SectorPageData = {
  icon: Gem,
  title: "Rare Earth Minerals",
  subtitle: "RWA Tokenization · Rare Earth Sector",
  heroDescription: "Tokenizing critical mineral resources essential for advanced technology, defense systems, and clean energy applications—democratizing access to strategically vital assets.",
  overview: "Rare earth elements and critical minerals underpin modern technology—from smartphones and electric vehicles to missile guidance systems and wind turbines. Yet investment access has been extremely limited due to supply chain opacity and geopolitical concentration. Tokenization opens this strategically vital sector to a broader investor base while creating transparent, auditable supply chains that enhance national security and economic resilience.",
  stats: [
    { value: "$9.6B", label: "Rare Earth Market" },
    { value: "17", label: "Critical Elements" },
    { value: "28%", label: "Annual Demand Growth" },
    { value: "60%", label: "Supply Concentration" },
  ],
  tokenizationBenefits: [
    { title: "Strategic Exposure", description: "Gain investment access to geopolitically critical minerals that underpin defense, technology, and clean energy sectors." },
    { title: "Supply Chain Transparency", description: "Blockchain-verified tracking from mine to end-use, ensuring ethical sourcing and regulatory compliance." },
    { title: "Hedging Capability", description: "Tokenized rare earth positions provide manufacturers and governments with new tools to hedge supply disruption risk." },
    { title: "Research Funding", description: "Enable direct investment in rare earth exploration and processing R&D through fractional digital securities." },
  ],
  useCases: [
    { title: "Neodymium Reserves", description: "Tokenized ownership stakes in neodymium deposits critical for permanent magnets in EVs and wind turbines." },
    { title: "Lithium-Ion Supply", description: "Digital securities representing stakes in lithium extraction and processing facilities for battery production." },
    { title: "Cobalt Mining Rights", description: "Fractional investment in ethically sourced cobalt mining operations with blockchain-verified supply chains." },
    { title: "Graphite Production", description: "Tokenized graphite mining and processing assets essential for battery anode manufacturing." },
    { title: "Scandium Alloys", description: "Investment tokens for scandium extraction projects used in aerospace and advanced manufacturing." },
    { title: "Critical Mineral Funds", description: "Diversified tokenized funds providing exposure across the full spectrum of critical minerals." },
  ],
  ctaText: "Invest in the Elements Shaping Tomorrow",
};

const RareEarth = () => <RWASectorTemplate data={data} />;
export default RareEarth;
