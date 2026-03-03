import { Crown } from "lucide-react";
import RWASectorTemplate, { SectorPageData } from "@/components/RWASectorTemplate";

const data: SectorPageData = {
  icon: Crown,
  title: "Collectables",
  subtitle: "RWA Tokenization · Collectables",
  heroDescription: "Tokenizing fine art, luxury watches, rare wines, vintage cars, and other high-value collectables—unlocking fractional ownership and global liquidity in alternative asset markets.",
  overview: "The global collectables market—spanning fine art, rare wines, classic automobiles, sports memorabilia, and luxury goods—represents trillions in stored value largely inaccessible to everyday investors. Tokenization transforms these illiquid treasures into fractional digital assets, enabling transparent provenance tracking, instant settlement, and democratized access. Blockchain-verified authenticity and smart contract–governed ownership bring institutional rigor to passion-driven markets.",
  stats: [
    { value: "$2.1T+", label: "Global Collectables Market" },
    { value: "25%", label: "Annual Market Growth" },
    { value: "$65B", label: "Art Market Value" },
    { value: "12M+", label: "Active Collectors Worldwide" },
  ],
  tokenizationBenefits: [
    { title: "Verified Authenticity", description: "Immutable blockchain provenance records ensure every collectable's history, ownership chain, and authenticity are permanently verified." },
    { title: "Fractional Access", description: "Own shares of a Picasso, a vintage Rolex, or a rare Bordeaux without needing millions in capital." },
    { title: "Global Liquidity", description: "Trade tokenized collectables 24/7 on secondary markets, unlocking value trapped in traditionally illiquid assets." },
    { title: "Insured Custody", description: "Physical assets stored in insured, climate-controlled vaults with real-time digital verification of condition and location." },
  ],
  useCases: [
    { title: "Fine Art Tokens", description: "Fractional ownership of blue-chip artworks from masters like Picasso, Basquiat, and Warhol held in museum-grade storage." },
    { title: "Luxury Watch Shares", description: "Tokenized rare timepieces from Patek Philippe, Rolex, and Audemars Piguet with verified authentication." },
    { title: "Rare Wine Portfolios", description: "Digital securities representing curated wine collections stored in bonded, temperature-controlled warehouses." },
    { title: "Classic Car Investments", description: "Fractional ownership in vintage automobiles from Ferrari, Porsche, and Aston Martin with professional maintenance." },
    { title: "Sports Memorabilia", description: "Tokenized championship rings, signed jerseys, and historic game-used equipment with verified provenance." },
    { title: "Luxury Goods Index", description: "Diversified tokenized funds spanning multiple collectable categories for balanced alternative asset exposure." },
  ],
  ctaText: "Unlock the Value of Exceptional Assets",
};

const Collectables = () => <RWASectorTemplate data={data} />;
export default Collectables;
