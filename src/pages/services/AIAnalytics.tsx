import { Cpu } from "lucide-react";
import ServicePageTemplate, { ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  icon: Cpu,
  title: "AI Super Cloud",
  subtitle: "Service · Distributed Infrastructure",
  heroDescription: "A decentralized AI compute layer purpose-built for Web3 — distributing inference, training, and compliance workloads across a global mesh of GPU and TPU resources so projects ship faster, cheaper, and without centralized bottlenecks.",
  overview: "The AI Super Cloud is TMRW's distributed infrastructure backbone — a permissionless compute network that pools GPU/TPU capacity from data centers, edge nodes, and partner clusters worldwide. Rather than locking Web3 builders into expensive, centralized cloud providers, we offer elastic AI resources on-demand: model hosting, fine-tuning pipelines, real-time inference, and compliance automation — all orchestrated through smart contracts with transparent pricing and verifiable uptime. Open by design, the Super Cloud actively sponsors and supports emerging Web3 AI projects through subsidized compute grants, hackathon infrastructure, and plug-and-play starter environments. If you're building at the intersection of AI and decentralization, this is your launchpad.",
  capabilities: [
    { title: "Distributed GPU/TPU Mesh", description: "Elastic compute pooled from global data centers and edge nodes — no single point of failure, no vendor lock-in. Scale from prototype to production seamlessly." },
    { title: "Open Web3 AI Grants", description: "Subsidized compute credits, free inference tiers, and dedicated sandbox environments for early-stage Web3 AI projects building on-chain intelligence." },
    { title: "On-Chain Compliance Engine", description: "Automated AML/KYC screening, transaction scoring, and regulatory reporting powered by AI models running directly on distributed infrastructure — 60% cost reduction vs. legacy providers." },
    { title: "Model Hosting & Fine-Tuning", description: "Deploy, serve, and continuously fine-tune LLMs, vision models, and custom AI pipelines with token-metered billing and verifiable compute proofs." },
  ],
  benefits: [
    { title: "60% Cost Reduction", description: "Distributed resource pooling eliminates cloud markup — pay only for the compute you consume, metered on-chain with full transparency." },
    { title: "Zero Vendor Lock-In", description: "Open architecture lets projects migrate workloads freely between nodes, regions, and providers without rewriting a single line of code." },
    { title: "Builder-First Ecosystem", description: "Hackathon sponsorships, compute grants, and mentorship pipelines ensure emerging Web3 AI projects get the resources they need to launch." },
    { title: "Real-Time Inference at Scale", description: "Sub-50ms latency for AI agent decisions, swap routing, risk scoring, and NLP analysis — even under peak network load." },
    { title: "Verifiable Compute", description: "Every inference job is cryptographically attested on-chain, giving users and auditors proof that models ran as specified on trusted hardware." },
    { title: "Plug-and-Play Integration", description: "SDKs, REST APIs, and smart contract hooks make it trivial to connect any dApp, browser extension, or DeFi protocol to the Super Cloud." },
  ],
  stats: [
    { label: "Cost Reduction", value: "60%" },
    { label: "Global Nodes", value: "500+" },
    { label: "Inference Latency", value: "<50ms" },
    { label: "Projects Supported", value: "120+" },
  ],
};

const AIAnalyticsService = () => <ServicePageTemplate data={data} />;
export default AIAnalyticsService;
