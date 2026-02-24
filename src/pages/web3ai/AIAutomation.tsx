import { Bot } from "lucide-react";
import ServicePageTemplate, { ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  icon: Bot,
  title: "AI Super Cloud",
  subtitle: "Web3 AI",
  heroDescription: "Advanced automation for compliance, AML/KYC, transaction scoring, and real-time reporting — reducing operational costs by up to 60%.",
  overview: "TMRW's AI-Powered Automation service deploys intelligent agents across compliance workflows, transaction monitoring, and regulatory reporting. Our models are trained on millions of financial transactions to detect anomalies, score risk, and automate manual processes that traditionally require large teams. From KYC onboarding to real-time AML screening, we deliver enterprise-grade automation that scales with your operations.",
  capabilities: [
    { title: "AML/KYC Automation", description: "AI-driven identity verification and ongoing monitoring with global sanctions screening." },
    { title: "Transaction Scoring", description: "Real-time risk scoring of transactions using deep learning models trained on financial crime patterns." },
    { title: "Regulatory Reporting", description: "Automated generation of compliance reports for multiple jurisdictions and regulatory frameworks." },
    { title: "Process Orchestration", description: "Intelligent workflow automation connecting compliance, operations, and finance teams seamlessly." },
  ],
  benefits: [
    { title: "60% Cost Reduction", description: "Eliminate manual processes and reduce compliance team overhead significantly." },
    { title: "Real-Time Monitoring", description: "Continuous transaction surveillance with instant alerts on suspicious activity." },
    { title: "Multi-Jurisdiction Coverage", description: "Compliance automation adapted to regulatory requirements across 160+ countries." },
    { title: "Reduced False Positives", description: "AI models reduce false positive rates by up to 80% compared to rule-based systems." },
    { title: "Audit-Ready Documentation", description: "Automated record-keeping with complete audit trails for regulatory examinations." },
    { title: "Scalable Infrastructure", description: "Process millions of transactions per day without performance degradation." },
  ],
  stats: [
    { label: "Cost Reduction", value: "60%" },
    { label: "False Positive Reduction", value: "80%" },
    { label: "Transactions/Day", value: "5M+" },
    { label: "Jurisdictions", value: "160+" },
  ],
};

const AIAutomation = () => <ServicePageTemplate data={data} />;
export default AIAutomation;
