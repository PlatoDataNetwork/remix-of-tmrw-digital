import { BarChart3 } from "lucide-react";
import ServicePageTemplate, { ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  icon: BarChart3,
  title: "Vertical Intelligence",
  subtitle: "Web3AI",
  heroDescription: "Industry-specific AI models delivering actionable insights across carbon markets, compliance, and financial operations in real-time.",
  overview: "TMRW's Vertical Intelligence service deploys purpose-built AI models tailored to specific industry verticals. Unlike generic analytics platforms, our models are trained on domain-specific datasets and fine-tuned for the unique dynamics of carbon markets, regulatory compliance, financial operations, and emerging digital asset sectors. Each model delivers actionable signals, risk assessments, and strategic recommendations calibrated to its vertical's specific requirements and market structure.",
  capabilities: [
    { title: "Carbon Market Intelligence", description: "Pricing models, offset verification, and regulatory tracking across voluntary and compliance carbon markets." },
    { title: "Compliance Analytics", description: "AI-driven regulatory change detection, impact assessment, and compliance gap analysis." },
    { title: "Financial Operations", description: "Treasury optimization, cash flow forecasting, and automated reconciliation powered by ML models." },
    { title: "Market Microstructure", description: "Order flow analysis, liquidity assessment, and market-making optimization for digital assets." },
  ],
  benefits: [
    { title: "Real-Time Insights", description: "Continuous model inference delivering actionable intelligence as market conditions change." },
    { title: "Domain Expertise", description: "Models trained by industry specialists with deep vertical knowledge and experience." },
    { title: "Predictive Accuracy", description: "Vertical-specific models outperform general-purpose analytics by 40%+ on key metrics." },
    { title: "Custom Signals", description: "Configurable alert frameworks tailored to your organization's risk appetite and strategy." },
    { title: "API Integration", description: "RESTful APIs enabling seamless integration with existing business intelligence platforms." },
    { title: "Historical Backtesting", description: "Validate model predictions against historical data before deploying in production." },
  ],
  stats: [
    { label: "Verticals Covered", value: "45" },
    { label: "Model Accuracy", value: "94%+" },
    { label: "Data Sources", value: "500+" },
    { label: "Updates/Second", value: "10K+" },
  ],
};

const VerticalIntelligence = () => <ServicePageTemplate data={data} />;
export default VerticalIntelligence;
