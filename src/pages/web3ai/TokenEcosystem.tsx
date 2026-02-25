import { Coins } from "lucide-react";
import ServicePageTemplate, { ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  icon: Coins,
  title: "Token Ecosystem",
  subtitle: "Web3AI",
  heroDescription: "Proprietary token driving rewards, incentives, and cross-border transactions across the network — enabling dual revenue streams for participants.",
  overview: "The TMRW Token Ecosystem is designed to align incentives across all network participants through a carefully engineered tokenomics model. Our dual-token architecture supports both utility and governance functions, enabling seamless cross-border payments, staking rewards, and decentralized decision-making. The ecosystem creates sustainable value through transaction fees, staking yields, and ecosystem fund allocations.",
  capabilities: [
    { title: "Dual-Token Architecture", description: "Utility and governance tokens working in concert to drive network participation and value accrual." },
    { title: "Staking & Rewards", description: "Tiered staking programs with competitive yields and loyalty-based reward multipliers." },
    { title: "Cross-Border Payments", description: "Token-powered settlements enabling instant, low-cost international transactions." },
    { title: "Governance Framework", description: "On-chain voting and proposal systems for decentralized network decision-making." },
  ],
  benefits: [
    { title: "Dual Revenue Streams", description: "Earn from both transaction fees and staking yields within the ecosystem." },
    { title: "Aligned Incentives", description: "Tokenomics designed to reward long-term participation and network growth." },
    { title: "Instant Settlements", description: "Token-based payments settle in seconds, eliminating traditional banking delays." },
    { title: "Community Governance", description: "Token holders directly influence protocol upgrades and treasury allocations." },
    { title: "Deflationary Mechanics", description: "Built-in burn mechanisms create scarcity and long-term value appreciation." },
    { title: "Interoperability", description: "Cross-chain bridges enable token utility across multiple blockchain networks." },
  ],
  stats: [
    { label: "Revenue Streams", value: "Dual" },
    { label: "Staking APY", value: "Up to 18%" },
    { label: "Settlement Time", value: "<3 sec" },
    { label: "Network Participants", value: "25K+" },
  ],
};

const TokenEcosystem = () => <ServicePageTemplate data={data} />;
export default TokenEcosystem;
