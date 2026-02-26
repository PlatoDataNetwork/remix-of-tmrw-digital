import BlogPostTemplate, { BlogPostData } from "@/components/BlogPostTemplate";

const data: BlogPostData = {
  date: "December 5, 2025",
  category: "Rare Earth",
  readTime: "7 min read",
  title: "Rare Earth Minerals: Securing Critical Supply Chains on Chain",
  subtitle: "Blockchain-powered rare earth investments are addressing supply chain risks in defense and clean energy sectors.",
  sections: [
    {
      heading: "Strategic Importance",
      content: [
        "Rare earth minerals are essential for semiconductors, electric vehicles, wind turbines, and defense systems. Yet global supply chains are concentrated in a handful of countries.",
        "Tokenization enables diversified investment in rare earth exploration and production, reducing geopolitical risk and funding new supply sources.",
      ],
    },
    {
      heading: "Provenance & Compliance",
      content: [
        "Blockchain-based tracking ensures rare earth minerals meet ethical sourcing requirements and conflict-free certifications demanded by governments and manufacturers.",
        "Immutable records from extraction to processing create the transparency needed for defense-grade supply chain security.",
      ],
    },
    {
      heading: "Investment Access",
      content: [
        "Rare earth mining projects have historically been accessible only to specialized resource investors. Tokenization opens these opportunities to a global investor base.",
        "Fractional ownership of mining royalties and production streams provides exposure to critical minerals without the complexity of direct mining operations.",
      ],
    },
  ],
  keyTakeaways: [
    "Rare earth supply chain concentration creates significant geopolitical risk.",
    "Tokenization funds new supply sources and diversifies investment in critical minerals.",
    "Blockchain provenance tracking meets defense-grade supply chain requirements.",
    "Fractional mining royalties provide accessible exposure to rare earth markets.",
  ],
};

const RareEarthTokenization = () => <BlogPostTemplate data={data} />;
export default RareEarthTokenization;
