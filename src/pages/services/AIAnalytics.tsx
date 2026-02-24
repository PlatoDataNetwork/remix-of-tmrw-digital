import { Cpu } from "lucide-react";
import ServicePageTemplate, { ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  icon: Cpu,
  title: "AI Super Cloud",
  subtitle: "Service",
  heroDescription: "Leveraging cutting-edge artificial intelligence to identify and engage with high-value investors, optimize portfolios, and drive strategic growth.",
  overview: "Our AI-Powered Analytics service goes beyond traditional business intelligence by deploying deep learning models, natural language processing, and reinforcement learning across your operational stack. We specialize in investor identification, portfolio optimization, and market prediction — delivering intelligence that transforms raw data into strategic advantage. Our models continuously learn and adapt, ensuring your analytics stay ahead of market dynamics.",
  capabilities: [
    { title: "Investor Profiling", description: "AI-driven identification and scoring of high-value investor prospects across global networks." },
    { title: "Portfolio Optimization", description: "Reinforcement learning models for dynamic asset allocation and risk-adjusted returns." },
    { title: "Natural Language Processing", description: "Automated analysis of earnings calls, filings, and research reports for actionable signals." },
    { title: "Anomaly Detection", description: "Real-time detection of market anomalies, fraud patterns, and operational irregularities." },
  ],
  benefits: [
    { title: "Higher Conversion Rates", description: "AI-scored leads convert at 3x the rate of traditional outreach methods." },
    { title: "Optimized Portfolios", description: "Dynamic rebalancing driven by AI reduces drawdowns and enhances risk-adjusted returns." },
    { title: "Automated Reporting", description: "Natural language generation creates investor-ready reports in seconds, not hours." },
    { title: "Continuous Learning", description: "Models retrain on new data, ensuring predictions improve over time." },
    { title: "Multi-Asset Coverage", description: "Analytics spanning equities, fixed income, crypto, and alternative investments." },
    { title: "White-Label Solutions", description: "Embeddable analytics modules for integration into existing platforms and workflows." },
  ],
  stats: [
    { label: "Lead Conversion", value: "3x" },
    { label: "Models Deployed", value: "200+" },
    { label: "Accuracy Rate", value: "94%" },
    { label: "Processing Speed", value: "<50ms" },
  ],
};

const AIAnalyticsService = () => <ServicePageTemplate data={data} />;
export default AIAnalyticsService;
