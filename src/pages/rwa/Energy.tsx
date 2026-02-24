import { Flame } from "lucide-react";
import RWASectorTemplate, { SectorPageData } from "@/components/RWASectorTemplate";

const data: SectorPageData = {
  icon: Flame,
  title: "Energy",
  subtitle: "RWA Tokenization · Energy Sector",
  heroDescription: "Tokenizing oil, gas, renewable energy, and next-generation energy infrastructure to unlock liquidity, broaden investor access, and accelerate the global energy transition.",
  overview: "The energy sector represents one of the largest asset classes globally, yet access has historically been limited to institutional investors and sovereign entities. Tokenization transforms energy assets—from solar farms and wind installations to oil reserves and LNG terminals—into fractional, tradeable digital securities. This democratizes participation while providing asset owners with new capital formation tools and enhanced liquidity for traditionally illiquid holdings.",
  stats: [
    { value: "$8T+", label: "Global Energy Market" },
    { value: "42%", label: "Renewable Growth Rate" },
    { value: "$1.2T", label: "Annual Investment" },
    { value: "190+", label: "Countries Impacted" },
  ],
  tokenizationBenefits: [
    { title: "Fractional Ownership", description: "Invest in large-scale energy projects with lower minimums, enabling broader participation in solar farms, wind parks, and power plants." },
    { title: "Enhanced Liquidity", description: "Trade tokenized energy assets on secondary markets, unlocking capital from traditionally illiquid long-term infrastructure investments." },
    { title: "Transparent Cash Flows", description: "Smart contracts automate revenue distribution from energy production, providing real-time visibility into yield generation." },
    { title: "Global Access", description: "Remove geographic barriers to energy investment, allowing global investors to participate in projects across jurisdictions." },
  ],
  useCases: [
    { title: "Solar Farm Tokens", description: "Fractional ownership of utility-scale solar installations with automated revenue sharing from power purchase agreements." },
    { title: "Oil & Gas Royalties", description: "Tokenized royalty streams from producing wells, offering investors direct exposure to commodity cash flows." },
    { title: "Wind Energy Credits", description: "Digital securities backed by wind farm output and associated renewable energy certificates." },
    { title: "EV Charging Networks", description: "Tokenized ownership stakes in electric vehicle charging infrastructure with usage-based revenue distribution." },
    { title: "LNG Terminal Access", description: "Fractional investment in liquefied natural gas terminals and export facilities." },
    { title: "Carbon Credit Portfolios", description: "Tokenized bundles of verified carbon credits linked to energy transition projects." },
  ],
  ctaText: "Power the Future of Energy Investment",
};

const Energy = () => <RWASectorTemplate data={data} />;
export default Energy;
