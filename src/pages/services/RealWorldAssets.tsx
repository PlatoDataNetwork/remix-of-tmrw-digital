import { Users } from "lucide-react";
import ServicePageTemplate, { ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  icon: Users,
  title: "Real World Assets",
  subtitle: "Service",
  heroDescription: "Tokenizing and managing real world assets for broader investor accessibility and liquidity. We unlock value in traditionally illiquid markets through blockchain technology.",
  overview: "Our Real World Assets service transforms physical and financial assets into digital tokens on the blockchain, enabling fractional ownership, enhanced liquidity, and global accessibility. From real estate and commodities to carbon credits and infrastructure projects, we provide the full technology stack and advisory expertise to bring assets on-chain while maintaining regulatory compliance across jurisdictions.",
  capabilities: [
    { title: "Asset Tokenization", description: "End-to-end tokenization of physical and financial assets with compliant token structures." },
    { title: "Fractional Ownership", description: "Enable fractional investment in high-value assets, lowering barriers to entry for global investors." },
    { title: "Secondary Market Infrastructure", description: "Build and integrate secondary trading platforms for tokenized assets." },
    { title: "Custody & Settlement", description: "Institutional-grade custody solutions with automated settlement and reconciliation." },
  ],
  benefits: [
    { title: "Enhanced Liquidity", description: "Transform illiquid assets into tradeable tokens with 24/7 global market access." },
    { title: "Lower Entry Barriers", description: "Fractional ownership enables investment starting from minimal capital requirements." },
    { title: "Global Distribution", description: "Reach investors across 160+ countries through digital asset marketplaces." },
    { title: "Automated Compliance", description: "Smart contract-enforced regulatory requirements reduce compliance overhead." },
    { title: "Transparent Pricing", description: "Real-time valuation and pricing driven by on-chain data and AI analytics." },
    { title: "Operational Efficiency", description: "Eliminate intermediaries and reduce transaction costs by up to 40%." },
  ],
  stats: [
    { label: "Assets Tokenized", value: "$2B+" },
    { label: "Countries", value: "160+" },
    { label: "Asset Classes", value: "10" },
    { label: "Investors Served", value: "10K+" },
  ],
};

const RealWorldAssetsService = () => <ServicePageTemplate data={data} />;
export default RealWorldAssetsService;
