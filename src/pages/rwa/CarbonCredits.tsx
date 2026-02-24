import { Leaf } from "lucide-react";
import RWASectorTemplate, { SectorPageData } from "@/components/RWASectorTemplate";

const data: SectorPageData = {
  icon: Leaf,
  title: "Carbon Credits",
  subtitle: "RWA Tokenization · Carbon Credits Sector",
  heroDescription: "Tokenizing verified carbon credits and environmental assets—bringing transparency, liquidity, and accessibility to global carbon markets and climate finance.",
  overview: "Carbon markets are critical to the global fight against climate change, yet they have long been plagued by opacity, fragmentation, and limited accessibility. Tokenization transforms verified carbon credits into transparent, tradeable digital assets on blockchain networks. This enables fractional ownership, real-time price discovery, and automated retirement tracking—empowering institutions, corporations, and individuals to participate in climate action with confidence and efficiency.",
  stats: [
    { value: "$2B+", label: "Voluntary Carbon Market" },
    { value: "30%", label: "Annual Market Growth" },
    { value: "170+", label: "Countries Participating" },
    { value: "Net Zero", label: "2050 Global Target" },
  ],
  tokenizationBenefits: [
    { title: "Verified Impact", description: "Every token is backed by independently verified carbon offset projects with transparent monitoring, reporting, and verification (MRV)." },
    { title: "Fractional Access", description: "Enable retail and institutional investors to purchase fractional carbon credits, lowering barriers to climate-positive investing." },
    { title: "Transparent Retirement", description: "Blockchain-based retirement tracking ensures credits are permanently removed from circulation, preventing double-counting." },
    { title: "Global Liquidity", description: "Tokenized carbon credits trade 24/7 across borders, creating deep liquidity pools and efficient price discovery." },
  ],
  useCases: [
    { title: "Forestry & REDD+", description: "Tokenized credits from forest conservation and reforestation projects verified under REDD+ and similar standards." },
    { title: "Renewable Energy Credits", description: "Digital securities representing verified emission reductions from solar, wind, and hydroelectric generation projects." },
    { title: "Blue Carbon", description: "Tokenized credits from coastal and marine ecosystem conservation including mangroves, seagrasses, and tidal marshes." },
    { title: "Direct Air Capture", description: "Investment tokens for next-generation carbon removal technology capturing CO₂ directly from the atmosphere." },
    { title: "Corporate Offset Programs", description: "Automated corporate carbon offset procurement and retirement with real-time ESG reporting integration." },
    { title: "Carbon Credit Funds", description: "Diversified tokenized funds providing exposure across multiple carbon credit vintages, standards, and project types." },
  ],
  ctaText: "Invest in the Future of Climate Action",
};

const CarbonCredits = () => <RWASectorTemplate data={data} />;
export default CarbonCredits;
