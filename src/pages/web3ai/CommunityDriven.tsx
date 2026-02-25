import { Users } from "lucide-react";
import ServicePageTemplate, { ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  icon: Users,
  title: "Community Driven",
  subtitle: "Web3AI",
  heroDescription: "Decentralized governance and network effects driving adoption through incentivized participation and stakeholder alignment across a global network.",
  overview: "TMRW's Community Driven model places stakeholders at the center of network growth and governance. Through decentralized decision-making, incentivized participation, and transparent treasury management, we create self-sustaining ecosystems where every participant benefits from network expansion. Our governance framework ensures that token holders, users, and contributors all have a voice in shaping the platform's future while being rewarded for their contributions to the network's success.",
  capabilities: [
    { title: "Decentralized Governance", description: "On-chain voting, proposal systems, and treasury management controlled by the community." },
    { title: "Incentive Programs", description: "Multi-tiered reward systems for contributors, validators, and active community participants." },
    { title: "Ambassador Network", description: "Global ambassador program driving local adoption and community building in key markets." },
    { title: "DAO Infrastructure", description: "Full-stack DAO tooling for transparent decision-making and resource allocation." },
  ],
  benefits: [
    { title: "Global Network Effects", description: "Each new participant increases value for all existing members through network growth." },
    { title: "Aligned Incentives", description: "Tokenomics that reward long-term commitment and active ecosystem participation." },
    { title: "Transparent Governance", description: "All decisions, votes, and treasury movements are verifiable on-chain." },
    { title: "Community Ownership", description: "Participants directly shape platform development and strategic direction." },
    { title: "Sustainable Growth", description: "Self-reinforcing adoption loops create organic, sustainable network expansion." },
    { title: "Cultural Diversity", description: "Localized programs spanning 35 languages and 160 countries for inclusive participation." },
  ],
  stats: [
    { label: "Community Members", value: "50K+" },
    { label: "Countries", value: "160" },
    { label: "Languages", value: "35" },
    { label: "Governance Proposals", value: "200+" },
  ],
};

const CommunityDriven = () => <ServicePageTemplate data={data} />;
export default CommunityDriven;
