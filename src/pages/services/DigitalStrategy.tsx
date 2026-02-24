import { Globe } from "lucide-react";
import ServicePageTemplate, { ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  icon: Globe,
  title: "Digital Strategy",
  subtitle: "Service",
  heroDescription: "Comprehensive social media and digital outreach programs tailored to Web3 and RWA markets, driving engagement and brand authority.",
  overview: "TMRW's Digital Strategy service helps organizations establish and amplify their presence across Web3 and traditional digital channels. From community building and influencer partnerships to content strategy and paid acquisition, we create integrated campaigns that drive awareness, engagement, and conversion. Our data-driven approach ensures every initiative is measurable, optimized, and aligned with your growth objectives.",
  capabilities: [
    { title: "Community Building", description: "Strategic community development across Discord, Telegram, Twitter/X, and emerging platforms." },
    { title: "Content Strategy", description: "Thought leadership content, whitepapers, and editorial programs for brand authority." },
    { title: "Influencer Partnerships", description: "Vetted KOL and influencer networks for authentic brand amplification in Web3 markets." },
    { title: "Performance Marketing", description: "Data-driven paid campaigns across search, social, and programmatic channels." },
  ],
  benefits: [
    { title: "Brand Authority", description: "Position your organization as a thought leader in Web3 and digital assets." },
    { title: "Community Growth", description: "Build engaged communities that drive organic adoption and network effects." },
    { title: "Measurable ROI", description: "Full-funnel analytics tracking from awareness through conversion and retention." },
    { title: "Multi-Channel Reach", description: "Coordinated campaigns across 15+ digital channels for maximum exposure." },
    { title: "Regulatory-Aware Content", description: "Content strategies designed within the bounds of global crypto marketing regulations." },
    { title: "Rapid Scaling", description: "Proven playbooks for scaling community and user acquisition in compressed timelines." },
  ],
  stats: [
    { label: "Communities Built", value: "150+" },
    { label: "Total Reach", value: "50M+" },
    { label: "Engagement Rate", value: "8.5%" },
    { label: "Campaigns Run", value: "500+" },
  ],
};

const DigitalStrategyService = () => <ServicePageTemplate data={data} />;
export default DigitalStrategyService;
