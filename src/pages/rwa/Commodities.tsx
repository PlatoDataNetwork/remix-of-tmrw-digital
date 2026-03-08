import { BarChart3 } from "lucide-react";
import RWASectorTemplate, { SectorPageData } from "@/components/RWASectorTemplate";

const data: SectorPageData = {
  icon: BarChart3,
  title: "Commodities",
  subtitle: "RWA Tokenization · Commodities",
  heroDescription: "Tokenizing agricultural, energy, and material commodities—creating transparent, accessible, and efficient markets for institutional and retail investors alike.",
  overview: "Commodity markets form the backbone of the global economy, yet participation has been dominated by futures exchanges and specialized trading desks. Tokenization creates a direct bridge between physical commodity assets and digital investors, enabling fractional ownership of grain silos, coffee plantations, cotton inventories, and timber forests. Smart contracts handle settlement, custody verification, and yield distribution, bringing 21st-century efficiency to centuries-old markets.",
  stats: [
    { value: "$6.5T", label: "Global Commodities Trade" },
    { value: "120+", label: "Tradeable Commodities" },
    { value: "$2.7T", label: "Annual Derivatives Volume" },
    { value: "3B+", label: "People Dependent" },
  ],
  tokenizationBenefits: [
    { title: "Physical Asset Backing", description: "Every token represents verified, audited physical commodity inventories held in certified warehouses and storage facilities." },
    { title: "Inflation Hedge", description: "Commodity-backed tokens provide natural inflation protection as physical goods appreciate with rising price levels." },
    { title: "Supply Chain Finance", description: "Tokenization enables producers to access capital against verified inventories, improving working capital efficiency." },
    { title: "Reduced Counterparty Risk", description: "Smart contract settlement eliminates traditional counterparty risk inherent in OTC commodity trading." },
  ],
  useCases: [
    { title: "Agricultural Futures", description: "Tokenized crop futures and warehouse receipts for wheat, corn, soybeans, and specialty grains." },
    { title: "Coffee & Cocoa Origins", description: "Direct investment in single-origin coffee and cocoa production with fair-trade verified supply chains." },
    { title: "Timber & Forestry", description: "Fractional ownership in managed timber plantations combining carbon sequestration with harvest revenue." },
    { title: "Cotton Inventories", description: "Digital securities backed by graded cotton bales in certified warehouses with quality verification." },
    { title: "Sugar & Ethanol", description: "Tokenized sugarcane production and ethanol processing facilities in major producing regions." },
    { title: "Water Rights", description: "Digital tokens representing transferable water usage rights in water-scarce regions and markets." },
  ],
  ctaText: "Invest in the Resources That Move the World",
};

const Commodities = () => <RWASectorTemplate data={data} />;
export default Commodities;
