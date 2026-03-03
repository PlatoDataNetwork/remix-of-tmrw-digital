import { Plug } from "lucide-react";
import RWASectorTemplate, { SectorPageData } from "@/components/RWASectorTemplate";

const data: SectorPageData = {
  icon: Plug,
  title: "Utilities",
  subtitle: "RWA Tokenization · Utilities",
  heroDescription: "Tokenizing utility infrastructure assets—from power generation and water systems to telecommunications networks—creating new pathways for institutional and retail investment in essential services.",
  overview: "Utility infrastructure represents one of the most stable and essential asset classes globally, generating predictable cash flows from electricity, water, gas, and telecommunications services. However, direct investment in utility assets has historically been limited to governments, sovereign funds, and large institutional players. Tokenization democratizes access to these inflation-protected, yield-generating assets by converting ownership stakes into digital tokens that can be fractionalized, traded, and managed with unprecedented transparency.",
  stats: [
    { value: "$5T+", label: "Global Utility Market Cap" },
    { value: "6-8%", label: "Average Yield Range" },
    { value: "200+", label: "Countries with Utility Assets" },
    { value: "30yr+", label: "Average Asset Lifespan" },
  ],
  tokenizationBenefits: [
    { title: "Stable Yield Access", description: "Tokenized utility assets provide exposure to regulated, inflation-linked revenue streams with predictable distribution schedules." },
    { title: "Infrastructure Democratization", description: "Fractional tokens enable retail investors to participate in utility ownership previously reserved for institutional allocators." },
    { title: "Smart Metering Integration", description: "IoT-connected utility infrastructure feeds real-time usage and revenue data directly to token holders via smart contracts." },
    { title: "Cross-Border Investment", description: "Digital tokens eliminate geographic barriers, allowing global investors to access utility assets across multiple jurisdictions." },
  ],
  useCases: [
    { title: "Power Generation", description: "Tokenized ownership in solar farms, wind parks, hydroelectric facilities, and natural gas power plants with revenue-sharing distributions." },
    { title: "Water Infrastructure", description: "Digital tokens representing stakes in water treatment plants, desalination facilities, and municipal water distribution systems." },
    { title: "Telecommunications Networks", description: "Fractionalized ownership of fiber optic networks, cell towers, and 5G infrastructure with recurring lease-based revenue." },
    { title: "Electric Grid Assets", description: "Tokenized transmission and distribution infrastructure providing stable, regulated returns from grid usage fees." },
    { title: "District Heating & Cooling", description: "Investment tokens for centralized thermal energy systems serving commercial and residential developments." },
    { title: "Waste Management Systems", description: "Tokenized waste processing and recycling facilities generating revenue from tipping fees and recovered materials." },
  ],
  ctaText: "Invest in Essential Infrastructure",
};

const Utilities = () => <RWASectorTemplate data={data} />;
export default Utilities;
