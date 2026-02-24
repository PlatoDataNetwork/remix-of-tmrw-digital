import { TrendingUp } from "lucide-react";
import ServicePageTemplate, { ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  icon: TrendingUp,
  title: "Web3 AI",
  subtitle: "Service",
  heroDescription: "Strategic guidance through Web3 and AI-powered solutions for optimal digital transformation. We bridge the gap between traditional systems and decentralized innovation.",
  overview: "TMRW's Web3 AI service combines blockchain infrastructure with artificial intelligence to create next-generation digital solutions. Our team of experts helps organizations navigate the complexities of decentralized technologies while leveraging AI to automate processes, enhance decision-making, and unlock new revenue streams. From smart contract development to AI-driven market analysis, we provide end-to-end support for your digital transformation journey.",
  capabilities: [
    { title: "Smart Contract Development", description: "Custom smart contract architecture and deployment across multiple blockchain networks." },
    { title: "AI Integration", description: "Seamless integration of machine learning models into Web3 applications for enhanced automation." },
    { title: "DeFi Solutions", description: "Decentralized finance protocol design, auditing, and optimization for maximum yield and security." },
    { title: "Token Engineering", description: "Economic modeling and tokenomics design to align incentives across stakeholder ecosystems." },
  ],
  benefits: [
    { title: "Reduced Operational Costs", description: "AI automation reduces manual processes by up to 60%, driving significant cost savings." },
    { title: "Enhanced Transparency", description: "Blockchain-verified transactions and immutable audit trails for complete operational visibility." },
    { title: "Faster Time-to-Market", description: "Pre-built modules and frameworks accelerate deployment of Web3 solutions." },
    { title: "Scalable Architecture", description: "Solutions designed to scale from pilot programs to enterprise-wide deployment." },
    { title: "Cross-Chain Compatibility", description: "Multi-chain support ensuring interoperability across major blockchain networks." },
    { title: "Regulatory Compliance", description: "Built-in compliance frameworks adapted to evolving global regulations." },
  ],
  stats: [
    { label: "Cost Reduction", value: "60%" },
    { label: "Chains Supported", value: "12+" },
    { label: "Smart Contracts", value: "500+" },
    { label: "Global Clients", value: "80+" },
  ],
};

const Web3AIService = () => <ServicePageTemplate data={data} />;
export default Web3AIService;
