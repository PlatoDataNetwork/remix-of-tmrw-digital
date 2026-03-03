import { Receipt } from "lucide-react";
import RWASectorTemplate, { SectorPageData } from "@/components/RWASectorTemplate";

const data: SectorPageData = {
  icon: Receipt,
  title: "Tax Credits",
  subtitle: "RWA Tokenization · Tax Credits",
  heroDescription: "Tokenizing federal and state tax credits to unlock liquidity, broaden investor access, and streamline compliance in one of the fastest-growing alternative asset classes.",
  overview: "Tax credits—including renewable energy investment tax credits (ITCs), production tax credits (PTCs), historic rehabilitation credits, and low-income housing tax credits (LIHTCs)—represent billions in annual government incentives. Yet accessing these credits has traditionally required complex syndication structures, long negotiation timelines, and significant minimum commitments. Tokenization transforms tax credits into transparent, tradeable digital assets, enabling fractional ownership, faster settlement, and programmatic compliance verification.",
  stats: [
    { value: "$50B+", label: "Annual US Tax Credit Market" },
    { value: "40%", label: "Efficiency Gains via Tokenization" },
    { value: "24/7", label: "Global Trading Access" },
    { value: "100+", label: "Credit Programs Supported" },
  ],
  tokenizationBenefits: [
    { title: "Fractional Syndication", description: "Break large tax credit allocations into smaller digital tokens, enabling broader investor participation without complex partnership structures." },
    { title: "Automated Compliance", description: "Smart contracts enforce eligibility requirements, recapture provisions, and holding period rules automatically." },
    { title: "Accelerated Settlement", description: "Reduce syndication timelines from months to days with blockchain-based transfer and settlement infrastructure." },
    { title: "Transparent Pricing", description: "Real-time market pricing replaces opaque broker-dealer negotiations, improving price discovery for all participants." },
  ],
  useCases: [
    { title: "Renewable Energy ITCs", description: "Tokenized investment tax credits from solar, wind, and battery storage projects enabling fractional participation in clean energy incentives." },
    { title: "Low-Income Housing (LIHTC)", description: "Digital tokens representing allocations in affordable housing tax credit programs with automated compliance tracking." },
    { title: "Historic Rehabilitation Credits", description: "Tokenized credits from certified historic building renovations, broadening access to preservation-linked tax benefits." },
    { title: "R&D Tax Credits", description: "Fractionalized research and development credits allowing technology companies to monetize unused credit allocations." },
    { title: "Opportunity Zone Incentives", description: "Tokenized opportunity zone investments combining capital gains deferral with community development impact." },
    { title: "Carbon & Clean Energy PTCs", description: "Production tax credits from renewable energy generation tokenized for secondary market liquidity and portfolio diversification." },
  ],
  ctaText: "Unlock the Value of Tax Credit Markets",
};

const TaxCredits = () => <RWASectorTemplate data={data} />;
export default TaxCredits;
