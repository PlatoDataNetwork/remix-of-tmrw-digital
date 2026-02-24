import { Database } from "lucide-react";
import ServicePageTemplate, { ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  icon: Database,
  title: "RWA Infrastructure",
  subtitle: "Web3 AI",
  heroDescription: "Blockchain-verified tokenization of real-world assets including carbon credits, commodities, and digital securities on a compliant exchange.",
  overview: "TMRW's RWA Infrastructure provides the complete technology stack for bringing real-world assets on-chain. From asset origination and legal structuring to token issuance and secondary trading, our platform handles every stage of the tokenization lifecycle. Built on compliant exchange infrastructure, we enable institutions and issuers to create, distribute, and trade tokenized assets within a regulated framework that satisfies both traditional finance and Web3 requirements.",
  capabilities: [
    { title: "Compliant Exchange", description: "Regulated trading venue for tokenized securities, commodities, and carbon credits." },
    { title: "Token Issuance Platform", description: "End-to-end token creation with configurable compliance rules, vesting, and distribution." },
    { title: "Asset Verification", description: "Blockchain-verified proof of reserves, audits, and asset quality documentation." },
    { title: "Secondary Market", description: "Liquidity pools and order books enabling continuous trading of tokenized assets." },
  ],
  benefits: [
    { title: "Compliant by Design", description: "Built-in regulatory frameworks for securities, commodities, and environmental assets." },
    { title: "Multi-Asset Support", description: "Tokenize carbon credits, real estate, commodities, debt instruments, and more." },
    { title: "Institutional Grade", description: "Enterprise security, custody, and settlement standards for institutional participants." },
    { title: "Global Distribution", description: "Reach qualified investors worldwide through integrated distribution channels." },
    { title: "Transparent Valuation", description: "On-chain proof of reserves and real-time NAV calculations for all assets." },
    { title: "Interoperable", description: "Cross-chain compatibility enabling assets to move across blockchain ecosystems." },
  ],
  stats: [
    { label: "Asset Classes", value: "8+" },
    { label: "Assets Tokenized", value: "$2B+" },
    { label: "Compliance Frameworks", value: "12" },
    { label: "Trading Partners", value: "50+" },
  ],
};

const RWAInfrastructure = () => <ServicePageTemplate data={data} />;
export default RWAInfrastructure;
