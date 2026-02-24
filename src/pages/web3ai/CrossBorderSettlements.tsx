import { Zap } from "lucide-react";
import ServicePageTemplate, { ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  icon: Zap,
  title: "Cross-Border Settlements",
  subtitle: "Web3 AI",
  heroDescription: "Solana-based stablecoin infrastructure enabling near-instant settlements with zero FX friction across global markets.",
  overview: "TMRW's Cross-Border Settlement infrastructure leverages Solana's high-throughput blockchain and stablecoin rails to eliminate the friction, delays, and costs associated with traditional international payments. Our solution processes settlements in under one minute, compared to 2-5 business days through conventional banking channels. By removing intermediary banks and FX conversion overhead, we deliver cost savings of up to 90% on international transfers.",
  capabilities: [
    { title: "Stablecoin Rails", description: "USDC and multi-currency stablecoin support for frictionless cross-border value transfer." },
    { title: "Solana Infrastructure", description: "High-throughput, low-cost settlement on Solana with sub-second finality." },
    { title: "FX Optimization", description: "AI-driven foreign exchange routing to minimize conversion costs and slippage." },
    { title: "Compliance Integration", description: "Built-in travel rule compliance and sanctions screening for regulated corridors." },
  ],
  benefits: [
    { title: "Sub-Minute Settlement", description: "Transactions finalize in under 60 seconds, 24/7/365 with no banking hours restrictions." },
    { title: "90% Cost Savings", description: "Eliminate correspondent banking fees, FX markups, and intermediary charges." },
    { title: "Zero FX Friction", description: "Stablecoin-denominated transfers remove currency conversion volatility and delays." },
    { title: "Global Coverage", description: "Settlement corridors spanning 160+ countries with local currency on/off-ramps." },
    { title: "Transparent Pricing", description: "Fixed, predictable fees with no hidden charges or variable spreads." },
    { title: "Regulatory Compliance", description: "Full compliance with international payment regulations and reporting requirements." },
  ],
  stats: [
    { label: "Settlement Time", value: "<1 Min" },
    { label: "Cost Savings", value: "90%" },
    { label: "Countries", value: "160+" },
    { label: "Daily Volume", value: "$50M+" },
  ],
};

const CrossBorderSettlements = () => <ServicePageTemplate data={data} />;
export default CrossBorderSettlements;
