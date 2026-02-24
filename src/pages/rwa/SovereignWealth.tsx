import { Landmark } from "lucide-react";
import RWASectorTemplate, { SectorPageData } from "@/components/RWASectorTemplate";

const data: SectorPageData = {
  icon: Landmark,
  title: "Sovereign Wealth",
  subtitle: "RWA Tokenization · Sovereign & Institutional",
  heroDescription: "Strategic partnerships with sovereign wealth funds and government-backed investment vehicles, leveraging tokenization to modernize national asset management and cross-border capital deployment.",
  overview: "Sovereign wealth funds manage over $11 trillion in assets globally, representing the long-term savings and strategic reserves of nations. Tokenization offers these institutions unprecedented tools for portfolio diversification, co-investment structuring, and cross-border capital deployment. By digitizing sovereign holdings, governments gain real-time portfolio visibility, enhanced liquidity management, and the ability to democratize national wealth for citizen participation programs.",
  stats: [
    { value: "$11.5T", label: "Global SWF Assets" },
    { value: "90+", label: "Active SWFs" },
    { value: "50yr+", label: "Investment Horizons" },
    { value: "40%", label: "Alternative Allocation" },
  ],
  tokenizationBenefits: [
    { title: "National Asset Digitization", description: "Transform sovereign holdings—natural resources, infrastructure, real estate—into transparent, auditable digital portfolios." },
    { title: "Citizen Participation", description: "Enable citizens to participate in national wealth through tokenized sovereign investment programs and digital bonds." },
    { title: "Co-Investment Structuring", description: "Streamline cross-border co-investment between sovereign entities with smart contract-based governance and settlement." },
    { title: "Real-Time Reporting", description: "Blockchain-based portfolio management provides governments with instant, transparent reporting on national asset performance." },
  ],
  useCases: [
    { title: "Sovereign Digital Bonds", description: "Government-issued digital bonds on blockchain with automated coupon payments and instant settlement for global investors." },
    { title: "National Resource Funds", description: "Tokenized natural resource royalties enabling citizens to directly benefit from national oil, gas, and mineral wealth." },
    { title: "Cross-Border Co-Investment", description: "Smart contract platforms facilitating multi-sovereign co-investment in mega infrastructure and technology projects." },
    { title: "Citizen Wealth Programs", description: "Digital platforms distributing tokenized sovereign fund dividends directly to citizen wallets." },
    { title: "Strategic Reserve Management", description: "Blockchain-based management of national strategic reserves with real-time auditing and compliance." },
    { title: "Development Finance", description: "Tokenized development finance instruments channeling sovereign capital into emerging market infrastructure." },
  ],
  ctaText: "Partner at the Sovereign Level",
};

const SovereignWealth = () => <RWASectorTemplate data={data} />;
export default SovereignWealth;
