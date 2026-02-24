import { Mountain } from "lucide-react";
import RWASectorTemplate, { SectorPageData } from "@/components/RWASectorTemplate";

const data: SectorPageData = {
  icon: Mountain,
  title: "Metals",
  subtitle: "RWA Tokenization · Metals Sector",
  heroDescription: "Tokenizing precious and industrial metals—from gold and silver to copper and lithium—bringing transparency, fractional access, and liquidity to the metals supply chain.",
  overview: "Metals have served as stores of value and industrial inputs for millennia. Today, tokenization bridges physical metal assets with digital capital markets, enabling fractional ownership of vaulted gold, silver reserves, copper mines, and lithium deposits. Blockchain verification ensures provenance and purity while smart contracts automate custody, settlement, and dividend distribution across the metals value chain.",
  stats: [
    { value: "$12T+", label: "Global Metals Market" },
    { value: "35%", label: "Lithium Demand Growth" },
    { value: "$320B", label: "Gold Annual Trade" },
    { value: "7,000+", label: "Active Mines Worldwide" },
  ],
  tokenizationBenefits: [
    { title: "Verified Provenance", description: "Blockchain-tracked chain of custody from mine to vault, ensuring authenticity and ethical sourcing compliance." },
    { title: "Fractional Bullion", description: "Own fractions of gold, silver, and platinum bars without the complexities of physical storage and insurance." },
    { title: "Real-Time Pricing", description: "Tokenized metals reflect live spot prices with instant settlement, eliminating traditional T+2 delays." },
    { title: "Portfolio Diversification", description: "Access a broad spectrum of metals as digital assets, from precious to industrial, in a single portfolio." },
  ],
  useCases: [
    { title: "Gold-Backed Tokens", description: "Digital tokens representing fractional ownership of allocated gold bars held in insured, audited vaults." },
    { title: "Silver Mining Royalties", description: "Tokenized revenue streams from silver mining operations with transparent production reporting." },
    { title: "Copper Supply Contracts", description: "Digital securities representing future copper delivery contracts for industrial buyers and investors." },
    { title: "Lithium Deposit Rights", description: "Fractional ownership in lithium extraction projects critical to the EV battery supply chain." },
    { title: "Platinum Group Metals", description: "Tokenized exposure to platinum, palladium, and rhodium used in automotive and industrial applications." },
    { title: "Recycled Metals Market", description: "Digital marketplace for tokenized recycled and reclaimed metal inventories supporting circular economies." },
  ],
  ctaText: "Forge the Future of Metals Investment",
};

const Metals = () => <RWASectorTemplate data={data} />;
export default Metals;
