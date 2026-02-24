import { Building2 } from "lucide-react";
import RWASectorTemplate, { SectorPageData } from "@/components/RWASectorTemplate";

const data: SectorPageData = {
  icon: Building2,
  title: "Infrastructure",
  subtitle: "RWA Tokenization · Infrastructure Sector",
  heroDescription: "Tokenizing large-scale public and private infrastructure projects—from highways and airports to data centers and utilities—delivering stable, long-term returns through digital securities.",
  overview: "Infrastructure assets generate predictable, inflation-linked cash flows over decades, making them highly attractive to investors seeking stability. However, the scale of these investments has traditionally excluded all but the largest institutions. Tokenization breaks down billion-dollar infrastructure projects into accessible digital units, enabling retail and mid-market investors to participate in toll roads, airports, water systems, and digital infrastructure alongside institutional capital.",
  stats: [
    { value: "$130T", label: "Global Infrastructure" },
    { value: "7.2%", label: "Avg. Annual Return" },
    { value: "$15T", label: "Investment Gap by 2040" },
    { value: "25yr+", label: "Typical Asset Life" },
  ],
  tokenizationBenefits: [
    { title: "Stable Yield", description: "Infrastructure assets generate predictable, inflation-protected cash flows distributed automatically via smart contracts." },
    { title: "Scale Accessibility", description: "Fractional ownership makes billion-dollar projects accessible to investors at every level, not just sovereign funds." },
    { title: "Long-Duration Security", description: "Tokenized infrastructure offers long-term portfolio stability with asset lives spanning 25-99 years." },
    { title: "Public-Private Bridge", description: "Enable seamless participation in public-private partnerships through transparent, regulated digital securities." },
  ],
  useCases: [
    { title: "Toll Road Revenue", description: "Tokenized revenue streams from highway and bridge toll collections with predictable traffic-based cash flows." },
    { title: "Airport Concessions", description: "Fractional ownership in airport terminal operations, retail concessions, and landing fee revenue." },
    { title: "Data Center Equity", description: "Digital securities representing ownership in hyperscale data center campuses with long-term tenant contracts." },
    { title: "Water Utilities", description: "Tokenized stakes in water treatment and distribution systems with regulated, inflation-adjusted tariffs." },
    { title: "Port & Logistics", description: "Investment tokens for seaport terminals and logistics hubs handling global trade flows." },
    { title: "5G & Fiber Networks", description: "Fractional ownership in telecommunications infrastructure supporting next-generation connectivity." },
  ],
  ctaText: "Build the Foundation of Tomorrow's Economy",
};

const Infrastructure = () => <RWASectorTemplate data={data} />;
export default Infrastructure;
