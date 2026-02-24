import { BarChart3 } from "lucide-react";
import ServicePageTemplate, { ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  icon: BarChart3,
  title: "Cyber Defense",
  subtitle: "Service",
  heroDescription: "Advanced threat detection and blockchain security audits to protect digital assets, smart contracts, and decentralized infrastructure.",
  overview: "TMRW's Cyber Defense service provides comprehensive security solutions tailored for Web3 and digital asset environments. Our team combines traditional cybersecurity expertise with deep blockchain knowledge to identify vulnerabilities, monitor threats in real-time, and respond to incidents across both centralized and decentralized systems. From smart contract audits to SOC-as-a-Service, we protect the entire digital asset lifecycle.",
  capabilities: [
    { title: "Smart Contract Auditing", description: "Thorough code review and formal verification of smart contracts across all major chains." },
    { title: "Threat Monitoring", description: "24/7 security operations center monitoring blockchain transactions and network activity." },
    { title: "Penetration Testing", description: "Offensive security testing of Web3 applications, APIs, and infrastructure." },
    { title: "Incident Response", description: "Rapid response team for security breaches, exploits, and fund recovery operations." },
  ],
  benefits: [
    { title: "Asset Protection", description: "Proactive security measures prevent exploits before they impact digital assets." },
    { title: "Regulatory Compliance", description: "Security frameworks aligned with SOC 2, ISO 27001, and emerging Web3 standards." },
    { title: "Reduced Attack Surface", description: "Comprehensive vulnerability assessments minimize entry points for attackers." },
    { title: "Real-Time Alerts", description: "Instant notification of suspicious activity across wallets, contracts, and networks." },
    { title: "Expert Team", description: "Security researchers with proven track records in DeFi exploit prevention and recovery." },
    { title: "Insurance Readiness", description: "Security posture documentation that satisfies digital asset insurance requirements." },
  ],
  stats: [
    { label: "Audits Completed", value: "300+" },
    { label: "Threats Blocked", value: "50K+" },
    { label: "Response Time", value: "<15min" },
    { label: "Assets Protected", value: "$5B+" },
  ],
};

const CyberDefenseService = () => <ServicePageTemplate data={data} />;
export default CyberDefenseService;
