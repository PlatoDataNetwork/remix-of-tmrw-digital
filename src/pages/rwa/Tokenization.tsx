import { Coins } from "lucide-react";
import RWASectorTemplate, { SectorPageData } from "@/components/RWASectorTemplate";

const data: SectorPageData = {
  icon: Coins,
  title: "Tokenization",
  subtitle: "RWA Tokenization · Digital Asset Infrastructure",
  heroDescription: "The technology layer enabling fractional ownership, programmable compliance, and liquid secondary markets for every real-world asset class through blockchain-powered digital securities.",
  overview: "Tokenization is the foundational technology transforming how the world invests in real assets. By representing ownership rights as digital tokens on distributed ledgers, we enable 24/7 trading, automated compliance, instant settlement, and programmable governance for assets that were previously locked in paper-based systems. Our tokenization infrastructure supports the full lifecycle—from asset origination and regulatory structuring to issuance, distribution, and secondary market trading.",
  stats: [
    { value: "$16T", label: "Projected Market by 2030" },
    { value: "80%", label: "Cost Reduction" },
    { value: "T+0", label: "Settlement Speed" },
    { value: "24/7", label: "Market Availability" },
  ],
  tokenizationBenefits: [
    { title: "Programmable Compliance", description: "Embed regulatory requirements directly into token smart contracts, automating KYC/AML, investor accreditation, and transfer restrictions." },
    { title: "Instant Settlement", description: "Eliminate T+2 settlement delays with atomic, blockchain-based settlement that reduces counterparty risk to near zero." },
    { title: "Interoperability", description: "Cross-chain bridges and standardized token frameworks enable seamless movement of assets across multiple blockchain networks." },
    { title: "Automated Governance", description: "Smart contracts handle voting rights, dividend distributions, and corporate actions without manual intervention." },
  ],
  useCases: [
    { title: "Security Token Offerings", description: "End-to-end issuance platform for compliant digital securities representing equity, debt, and hybrid instruments." },
    { title: "Secondary Market Trading", description: "Regulated trading venues for tokenized assets with order matching, price discovery, and compliance automation." },
    { title: "Cross-Border Settlement", description: "Instant, low-cost international settlement eliminating correspondent banking chains and FX complexity." },
    { title: "Cap Table Management", description: "Real-time, blockchain-verified cap table management for tokenized equity with automated corporate actions." },
    { title: "Custody Solutions", description: "Institutional-grade digital asset custody combining cold storage security with smart contract flexibility." },
    { title: "Compliance Automation", description: "Regulatory technology layer automating jurisdiction-specific compliance across the token lifecycle." },
  ],
  ctaText: "Build on the Future of Asset Ownership",
};

const TokenizationPage = () => <RWASectorTemplate data={data} />;
export default TokenizationPage;
