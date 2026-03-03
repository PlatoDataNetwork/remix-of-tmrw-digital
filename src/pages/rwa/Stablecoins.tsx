import { Coins } from "lucide-react";
import RWASectorTemplate, { SectorPageData } from "@/components/RWASectorTemplate";

const data: SectorPageData = {
  icon: Coins,
  title: "Stablecoins",
  subtitle: "RWA Tokenization · Stablecoins",
  heroDescription: "Institutional-grade stablecoin infrastructure bridging fiat currencies, treasury-backed reserves, and decentralized finance—powering the settlement layer for tokenized real world assets.",
  overview: "Stablecoins represent the critical bridge between traditional finance and the on-chain economy. Backed by fiat reserves, government treasuries, or algorithmically managed collateral pools, they provide the price stability essential for tokenized asset settlement, cross-border payments, and yield generation. As the tokenized RWA ecosystem scales, stablecoins serve as the foundational settlement and liquidity layer enabling seamless capital flows across jurisdictions.",
  stats: [
    { value: "$170B+", label: "Stablecoin Market Cap" },
    { value: "$7T+", label: "Annual Settlement Volume" },
    { value: "190+", label: "Countries Reached" },
    { value: "24/7", label: "Settlement Availability" },
  ],
  tokenizationBenefits: [
    { title: "Price Stability", description: "Pegged to fiat currencies or treasury reserves, providing the predictable value essential for real-world asset transactions." },
    { title: "Instant Settlement", description: "Near-instant cross-border settlement eliminating traditional T+2 banking delays and reducing counterparty risk." },
    { title: "Yield Generation", description: "Treasury-backed stablecoins pass through underlying yield from government bonds and money market instruments." },
    { title: "Regulatory Compliance", description: "Fully audited reserves with transparent attestation reports meeting evolving global regulatory frameworks." },
  ],
  useCases: [
    { title: "Treasury-Backed Coins", description: "Stablecoins collateralized by U.S. Treasury bills and government securities providing transparent, yield-bearing stability." },
    { title: "Cross-Border Settlements", description: "Instant settlement rails for international trade and tokenized asset transactions across 190+ countries." },
    { title: "RWA Payment Rails", description: "Native payment infrastructure for tokenized real estate, commodities, and infrastructure dividend distributions." },
    { title: "Institutional Yield Vaults", description: "Managed stablecoin pools generating competitive yields through diversified treasury and money market strategies." },
    { title: "Multi-Currency Stables", description: "EUR, GBP, and emerging market currency stablecoins enabling localized tokenized asset access." },
    { title: "DeFi Liquidity Pools", description: "Stablecoin-powered liquidity provision for decentralized exchanges trading tokenized real world assets." },
  ],
  ctaText: "Build on the Stability Layer of Web3",
};

const Stablecoins = () => <RWASectorTemplate data={data} />;
export default Stablecoins;
