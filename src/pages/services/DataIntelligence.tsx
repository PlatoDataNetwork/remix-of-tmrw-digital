import { Shield } from "lucide-react";
import ServicePageTemplate, { ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  icon: Shield,
  title: "Data Intelligence",
  subtitle: "Service",
  heroDescription: "Harnessing data-driven insights to identify opportunities and drive strategic decision-making across markets and verticals.",
  overview: "TMRW's Data Intelligence service leverages advanced analytics, machine learning, and proprietary data pipelines to deliver actionable insights at scale. We process billions of data points across financial markets, social sentiment, on-chain activity, and macroeconomic indicators to provide our clients with a decisive information advantage. Our platforms are designed for real-time decision support across investment, compliance, and operational workflows.",
  capabilities: [
    { title: "Predictive Analytics", description: "Machine learning models trained on proprietary datasets for market forecasting and trend identification." },
    { title: "Sentiment Analysis", description: "Real-time social and news sentiment tracking across global markets and asset classes." },
    { title: "On-Chain Analytics", description: "Deep blockchain data analysis including whale tracking, flow analysis, and network health metrics." },
    { title: "Custom Dashboards", description: "Tailored reporting and visualization platforms built for executive and operational decision-making." },
  ],
  benefits: [
    { title: "Faster Decision-Making", description: "Real-time data feeds and alerts reduce decision latency from days to minutes." },
    { title: "Risk Mitigation", description: "Early warning systems identify market risks and anomalies before they impact portfolios." },
    { title: "Competitive Advantage", description: "Proprietary data sources and models deliver insights unavailable through public channels." },
    { title: "Scalable Infrastructure", description: "Cloud-native architecture processes millions of events per second without degradation." },
    { title: "Cross-Market Coverage", description: "Unified analytics across traditional finance, crypto, and alternative asset markets." },
    { title: "Regulatory Reporting", description: "Automated compliance reporting with audit-ready documentation and data lineage." },
  ],
  stats: [
    { label: "Data Points Daily", value: "5B+" },
    { label: "Market Verticals", value: "45" },
    { label: "Uptime SLA", value: "99.9%" },
    { label: "Languages", value: "35" },
  ],
};

const DataIntelligenceService = () => <ServicePageTemplate data={data} />;
export default DataIntelligenceService;
