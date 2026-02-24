import { Home } from "lucide-react";
import RWASectorTemplate, { SectorPageData } from "@/components/RWASectorTemplate";

const data: SectorPageData = {
  icon: Home,
  title: "Real Estate",
  subtitle: "RWA Tokenization · Real Estate Sector",
  heroDescription: "Tokenizing commercial and residential real estate assets worldwide, enabling fractional ownership, enhanced liquidity, and borderless investment in the world's largest asset class.",
  overview: "Real estate is the world's most valuable asset class, yet it remains one of the least liquid. Tokenization transforms physical properties—office towers, residential complexes, retail centers, and hospitality assets—into tradeable digital securities. Investors can own fractions of premium properties across global markets, receive automated rental distributions, and trade positions on secondary markets, all while maintaining the fundamental value proposition of real estate ownership.",
  stats: [
    { value: "$326T", label: "Global Real Estate Value" },
    { value: "9.5%", label: "Avg. Annual Return" },
    { value: "$3.8T", label: "Annual Transaction Vol." },
    { value: "45%", label: "Of Global Wealth" },
  ],
  tokenizationBenefits: [
    { title: "Global Diversification", description: "Own fractions of properties across cities and continents without the complexities of cross-border real estate transactions." },
    { title: "Automated Distributions", description: "Smart contracts handle rental income distribution, reducing administrative overhead and ensuring timely investor payments." },
    { title: "Lower Entry Barriers", description: "Participate in institutional-grade real estate with investment minimums as low as $100, versus traditional six-figure requirements." },
    { title: "Secondary Market Trading", description: "Trade tokenized real estate positions on compliant exchanges, unlocking liquidity in a traditionally illiquid market." },
  ],
  useCases: [
    { title: "Commercial Office Towers", description: "Fractional ownership in Class A office buildings with long-term corporate tenant leases and stable yields." },
    { title: "Residential Portfolios", description: "Tokenized multi-family residential complexes generating consistent rental income across urban markets." },
    { title: "Hospitality Assets", description: "Digital securities representing ownership in hotels, resorts, and serviced apartments with revenue-based returns." },
    { title: "Industrial & Warehouse", description: "Investment tokens for logistics warehouses and distribution centers driven by e-commerce growth." },
    { title: "Student Housing", description: "Tokenized purpose-built student accommodation near major universities with predictable occupancy cycles." },
    { title: "Mixed-Use Developments", description: "Fractional ownership in urban mixed-use projects combining retail, residential, and commercial spaces." },
  ],
  ctaText: "Unlock the World's Largest Asset Class",
};

const RealEstate = () => <RWASectorTemplate data={data} />;
export default RealEstate;
