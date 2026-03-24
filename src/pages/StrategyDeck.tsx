import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import heroBackground from "@/assets/hero-bg.webp";
import platoIcon from "@/assets/plato-icon.webp";

interface Slide {
  id: string;
  render: () => React.ReactNode;
}

function SlideBranding() {
  return (
    <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 z-20">
      <div
        className="h-5 w-5 animated-gradient-icon-bright shrink-0"
        style={{
          WebkitMaskImage: `url(${platoIcon})`,
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskImage: `url(${platoIcon})`,
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "center",
        }}
      />
      <span className="text-[10px] font-light tracking-[0.2em] text-muted-foreground/60 uppercase">
        TMRW <span className="text-muted-foreground/30">|</span> Strategy
      </span>
    </div>
  );
}

function SlideAccent() {
  return (
    <div className="absolute top-0 left-0 z-10 pointer-events-none">
      <div className="w-px h-16 bg-gradient-to-b from-[hsl(82,85%,55%,0.6)] to-transparent" />
      <div className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-[hsl(82,85%,55%,0.6)] to-transparent" />
    </div>
  );
}

function SlideNumber({ n }: { n: number }) {
  return (
    <div className="absolute bottom-4 left-6 md:bottom-6 md:left-8 z-20 pointer-events-none">
      <span className="text-[10px] font-light tracking-[0.2em] text-[hsl(82,85%,55%,0.5)]">
        {String(n).padStart(2, "0")}
      </span>
    </div>
  );
}

function SlideTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-foreground">{children}</h2>;
}

function SlideSubtitle({ children }: { children: React.ReactNode }) {
  return <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed max-w-2xl">{children}</p>;
}

function BulletList({ items }: { items: { bold: string; text: string }[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4 items-start">
          <div className="w-1.5 h-1.5 rounded-full bg-[hsl(82,85%,55%)] mt-2.5 shrink-0" />
          <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">{item.bold}</span> {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}

function GreenCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(
      "p-5 rounded-xl border border-[hsl(82,85%,55%,0.15)] bg-card space-y-2 relative overflow-hidden",
      className
    )}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[hsl(82,85%,55%,0.3)] via-[hsl(82,85%,55%,0.1)] to-transparent" />
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm uppercase tracking-[0.2em] text-[hsl(82,85%,55%,0.7)]">{children}</h3>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-extralight tracking-tight text-[hsl(82,85%,55%)]">{value}</div>
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">{label}</div>
    </div>
  );
}

// --- SLIDES ---
const slides: Slide[] = [
  // 1 — Title
  {
    id: "title",
    render: () => (
      <div className="relative flex flex-col items-center justify-center h-full text-center gap-6">
        <div className="absolute inset-0 pointer-events-none">
          <img src={heroBackground} alt="" className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
          <div className="absolute inset-0 pointer-events-none animated-gradient-hero-overlay" />
          <div className="absolute inset-0 bg-[hsl(220,20%,4%,0.4)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-6">
          <SectionLabel>Internal Strategy</SectionLabel>
          <h1 className="text-4xl md:text-6xl font-extralight tracking-tight text-foreground">
            Product & Sales Funnels
          </h1>
          <p className="text-base md:text-lg font-light text-muted-foreground max-w-2xl">
            Organizational strategy across four core product verticals — W3AI Token, CUT Token, RWA Development, and Token Issuance & Distribution.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[hsl(82,85%,55%,0.6)] to-transparent" />
          <p className="text-sm font-light text-[hsl(82,85%,55%,0.5)] uppercase tracking-[0.3em]">Tomorrow Digital Inc.</p>
        </div>
        <SlideNumber n={1} />
      </div>
    ),
  },
  // ═══════════════════════════════════════
  // PRODUCT 1 — W3AI TOKEN
  // ═══════════════════════════════════════
  // 2 — W3AI Token: Product
  {
    id: "w3ai-product",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>W3AI Token — Product</SectionLabel>
        <SlideTitle>W3AI Token.</SlideTitle>
        <SlideSubtitle>The utility token powering the Tomorrow Company's Web3 AI ecosystem — enabling access, governance, and value capture across decentralized infrastructure.</SlideSubtitle>
        <div className="grid md:grid-cols-3 gap-5">
          <GreenCard className="space-y-3 py-6">
            <h3 className="text-sm font-medium text-foreground">Ecosystem Access</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">W3AI Browser, CodeNexus AI tools, decentralized compute network, and cross-chain DeFi access — all gated by W3AI token utility.</p>
          </GreenCard>
          <GreenCard className="space-y-3 py-6">
            <h3 className="text-sm font-medium text-foreground">SecureStake</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">Staking protocol delivering yield through network validation, compute contributions, and protocol fee sharing.</p>
          </GreenCard>
          <GreenCard className="space-y-3 py-6">
            <h3 className="text-sm font-medium text-foreground">Cross-Chain Native</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">Chain-agnostic architecture enabling seamless interoperability across Ethereum, Polkadot, Solana, and emerging L1/L2 networks.</p>
          </GreenCard>
        </div>
        <SlideNumber n={2} />
      </div>
    ),
  },
  // 4 — W3AI Token: Distribution Funnel
  {
    id: "w3ai-distribution",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>W3AI Token — Model</SectionLabel>
        <SlideTitle>Token Distribution Funnel.</SlideTitle>
        <div className="grid md:grid-cols-3 gap-5">
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Tier 1 — Community</SectionLabel>
            <BulletList items={[
              { bold: "Marketing:", text: "Brand awareness campaigns and community building." },
               { bold: "Influencers:", text: "KOL partnerships, advocacy programs, Community Airdrops." },
              { bold: "Staking Rewards:", text: "Incentivized long-term holding and network participation." },
              { bold: "Referral Programs:", text: "Viral growth through community-driven referrals." },
            ]} />
          </GreenCard>
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Tier 2 — Partners</SectionLabel>
            <BulletList items={[
              { bold: "Tranches:", text: "Allocations for funds, family offices, and strategic investors." },
              { bold: "Networks:", text: "Cross-chain partnerships and protocol integrations." },
              { bold: "Protocols:", text: "DeFi and infrastructure protocol collaborations." },
              { bold: "Foundations:", text: "Ecosystem development grants and long-term alignment." },
            ]} />
          </GreenCard>
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Tier 3 — Public Markets</SectionLabel>
             <BulletList items={[
               { bold: "CEX Listings:", text: "Centralized exchange listings for broad retail access." },
               { bold: "DEX Liquidity:", text: "Automated market-making and liquidity pool deployment." },
               { bold: "Secondary Markets:", text: "OTC desks and institutional trading venues." },
               { bold: "Token to Equity:", text: "Structured conversion pathway from token holdings to equity positions." },
               
             ]} />
          </GreenCard>
        </div>
        <SlideNumber n={3} />
      </div>
    ),
  },
  // 5 — W3AI Token: Marketing Channels
  {
    id: "w3ai-marketing",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>W3AI Token — Model</SectionLabel>
        <SlideTitle>Marketing Channels.</SlideTitle>
        <div className="grid md:grid-cols-2 gap-5">
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Surge / LabLab</SectionLabel>
            <BulletList items={[
              { bold: "Community:", text: "200K+ AI developer community." },
              { bold: "Function:", text: "Primary launchpad for token awareness, hackathons, and early adopter acquisition." },
            ]} />
          </GreenCard>
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Ethermail.io</SectionLabel>
            <BulletList items={[
              { bold: "Community:", text: "2.7M Web3-native users." },
              { bold: "Reach:", text: "500K impressions/month via targeted email campaigns, newsletter placements, and co-branded announcements." },
            ]} />
          </GreenCard>
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Lever.io</SectionLabel>
            <BulletList items={[
              { bold: "Network:", text: "Web3 influencer network with 10M+ combined reach." },
              { bold: "Function:", text: "KOL activations, sponsored content, and community-driven advocacy programs." },
            ]} />
          </GreenCard>
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>PR / IR</SectionLabel>
            <BulletList items={[
              { bold: "Strategy:", text: "Web3 community-focused press strategy." },
              { bold: "Function:", text: "Investor relations, media placements, AMAs, and thought leadership across crypto-native outlets." },
            ]} />
          </GreenCard>
        </div>
        <SlideNumber n={4} />
      </div>
    ),
  },
  // 5 — W3AI Token: Services
  {
    id: "w3ai-services",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>W3AI Token — Services</SectionLabel>
        <SlideTitle>Service Offerings.</SlideTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: "Token Advisory", desc: "Tokenomics design, supply schedule, and governance framework consulting." },
            { title: "Exchange Listing", desc: "End-to-end CEX and DEX listing management with market-making support." },
            { title: "Staking Infrastructure", desc: "White-label SecureStake deployment for enterprise and institutional clients." },
            { title: "Compliance & KYC", desc: "Regulatory compliance, investor verification, and jurisdiction-specific legal structuring." },
          ].map(s => (
            <GreenCard key={s.title} className="space-y-3 py-6">
              <h3 className="text-sm font-medium text-foreground">{s.title}</h3>
              <p className="text-xs font-light text-muted-foreground leading-relaxed">{s.desc}</p>
            </GreenCard>
          ))}
        </div>
        <SlideNumber n={5} />
      </div>
    ),
  },
  // 6 — W3AI Token: Economics
  {
    id: "w3ai-economics",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>W3AI Token — Economics</SectionLabel>
        <SlideTitle>Token Economics.</SlideTitle>
        <div className="grid grid-cols-4 gap-5 mb-4">
          <StatBlock value="$200B+" label="TAM by 2030" />
          <StatBlock value="0.50%" label="Protocol Fee" />
          <StatBlock value="3.5%" label="Annual Burn Rate" />
          <StatBlock value="12-18mo" label="Breakeven Target" />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Revenue Streams</SectionLabel>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Protocol Transaction Fees</span><span className="text-foreground">0.50%</span></div>
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Staking Commission</span><span className="text-foreground">15%</span></div>
              <div className="w-full h-px bg-border/30" />
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Compute Network Fees</span><span className="text-foreground">Pay-per-use</span></div>
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Enterprise Licensing</span><span className="text-foreground">Annual SaaS</span></div>
            </div>
          </GreenCard>
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Cost Structure</SectionLabel>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Infrastructure & Hosting</span><span className="text-foreground">25%</span></div>
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Engineering & Development</span><span className="text-foreground">35%</span></div>
              <div className="w-full h-px bg-border/30" />
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Marketing & BD</span><span className="text-foreground">20%</span></div>
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Legal & Compliance</span><span className="text-foreground">10%</span></div>
              <div className="flex justify-between text-sm font-medium"><span className="text-foreground">Target Gross Margin</span><span className="text-[hsl(82,85%,55%)]">60%+</span></div>
            </div>
          </GreenCard>
        </div>
        <SlideNumber n={6} />
      </div>
    ),
  },

  // ═══════════════════════════════════════
  // PRODUCT 2 — CUT TOKEN
  // ═══════════════════════════════════════
  // 7 — CUT Token: Product
  {
    id: "cut-product",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>CUT Token — Product</SectionLabel>
        <SlideTitle>CUT Token.</SlideTitle>
        <SlideSubtitle>Carbon Utility Token — a blockchain-verified digital asset representing certified carbon offsets, enabling transparent retirement and enterprise ESG compliance.</SlideSubtitle>
        <div className="grid md:grid-cols-3 gap-5">
          <GreenCard className="space-y-3 py-6">
            <h3 className="text-sm font-medium text-foreground">Certified Offsets</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">500,000 tonnes of ISO-certified carbon credits backed by verified environmental projects, with options for 2.3M additional tonnes.</p>
          </GreenCard>
          <GreenCard className="space-y-3 py-6">
            <h3 className="text-sm font-medium text-foreground">Blockchain Verification</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">Immutable audit trails, on-chain retirement records, and smart contract automation for transparent carbon lifecycle management.</p>
          </GreenCard>
          <GreenCard className="space-y-3 py-6">
            <h3 className="text-sm font-medium text-foreground">Retire App</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">Purpose-built interface for enterprise token burning, offset certification, and ESG reporting with 6M+ kg already retired on-chain.</p>
          </GreenCard>
        </div>
        <SlideNumber n={7} />
      </div>
    ),
  },
  // 8 — CUT Token: Model
  {
    id: "cut-model",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>CUT Token — Model</SectionLabel>
        <SlideTitle>Sales & Distribution Model.</SlideTitle>
        <div className="grid md:grid-cols-2 gap-5">
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Sales Funnel</SectionLabel>
            <BulletList items={[
              { bold: "Enterprise Direct:", text: "B2B sales to corporates needing ESG compliance and carbon neutrality commitments." },
              { bold: "Channel Partners:", text: "ESG consultancies, sustainability platforms, and carbon brokers as resellers." },
              { bold: "Marketplace:", text: "Listed on carbon exchanges and digital asset platforms for spot purchases." },
              { bold: "Government & NGO:", text: "Bulk procurement for national carbon reduction programs." },
            ]} />
          </GreenCard>
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Conversion Strategy</SectionLabel>
            <BulletList items={[
              { bold: "Awareness:", text: "Content marketing, ESG conferences, and NexusWave Carbon intelligence." },
              { bold: "Consideration:", text: "Free carbon footprint calculator and offset simulation tools." },
              { bold: "Decision:", text: "Custom offset packages with volume pricing and API integration." },
              { bold: "Retention:", text: "Annual offset subscriptions with automated retirement schedules." },
            ]} />
          </GreenCard>
        </div>
        <SlideNumber n={8} />
      </div>
    ),
  },
  // 9 — CUT Token: Services
  {
    id: "cut-services",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>CUT Token — Services</SectionLabel>
        <SlideTitle>Service Offerings.</SlideTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: "Carbon Advisory", desc: "End-to-end carbon strategy consulting — from footprint assessment to offset procurement and retirement." },
            { title: "Enterprise API", desc: "Programmatic access to carbon credit inventory, real-time pricing, and automated retirement workflows." },
            { title: "ESG Reporting", desc: "Automated compliance reporting with blockchain-verified audit trails for regulatory submissions." },
            { title: "White-Label Platform", desc: "Brandable carbon offset marketplace for partners to embed carbon retirement in their own products." },
          ].map(s => (
            <GreenCard key={s.title} className="space-y-3 py-6">
              <h3 className="text-sm font-medium text-foreground">{s.title}</h3>
              <p className="text-xs font-light text-muted-foreground leading-relaxed">{s.desc}</p>
            </GreenCard>
          ))}
        </div>
        <SlideNumber n={9} />
      </div>
    ),
  },
  // 10 — CUT Token: Economics
  {
    id: "cut-economics",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>CUT Token — Economics</SectionLabel>
        <SlideTitle>Token Economics.</SlideTitle>
        <div className="grid grid-cols-4 gap-5 mb-4">
          <StatBlock value="$50B+" label="Carbon Market 2030" />
          <StatBlock value="$0.10" label="Last Private Sale" />
          <StatBlock value="300M+" label="Treasury Tokens" />
          <StatBlock value="$5M" label="Asset Value" />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Revenue Streams</SectionLabel>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Carbon Credit Sales</span><span className="text-foreground">Primary</span></div>
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Enterprise Subscriptions</span><span className="text-foreground">Recurring</span></div>
              <div className="w-full h-px bg-border/30" />
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">API Access Fees</span><span className="text-foreground">Usage-based</span></div>
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">White-Label Licensing</span><span className="text-foreground">Annual</span></div>
            </div>
          </GreenCard>
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Unit Economics</SectionLabel>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Cost per Credit</span><span className="text-foreground">$3-8</span></div>
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Avg Selling Price</span><span className="text-foreground">$10-25</span></div>
              <div className="w-full h-px bg-border/30" />
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Gross Margin</span><span className="text-foreground">65-70%</span></div>
              <div className="flex justify-between text-sm font-medium"><span className="text-foreground">CAC Payback</span><span className="text-[hsl(82,85%,55%)]">&lt; 6 Months</span></div>
            </div>
          </GreenCard>
        </div>
        <SlideNumber n={10} />
      </div>
    ),
  },

  // ═══════════════════════════════════════
  // PRODUCT 3 — RWA DEVELOPMENT
  // ═══════════════════════════════════════
  // 11 — RWA Development: Product
  {
    id: "rwa-product",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>RWA Development — Product</SectionLabel>
        <SlideTitle>RWA Development.</SlideTitle>
        <SlideSubtitle>End-to-end infrastructure for tokenizing real-world assets — from real estate and commodities to carbon credits and sovereign wealth instruments.</SlideSubtitle>
        <div className="grid md:grid-cols-3 gap-5">
          <GreenCard className="space-y-3 py-6">
            <h3 className="text-sm font-medium text-foreground">Tokenization Engine</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">Modular smart contract framework supporting 12+ asset classes with configurable compliance rules, fractional ownership, and automated distributions.</p>
          </GreenCard>
          <GreenCard className="space-y-3 py-6">
            <h3 className="text-sm font-medium text-foreground">Compliance Layer</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">Built-in KYC/AML verification, jurisdiction-specific regulatory frameworks, and smart contract-enforced transfer restrictions.</p>
          </GreenCard>
          <GreenCard className="space-y-3 py-6">
            <h3 className="text-sm font-medium text-foreground">Secondary Markets</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">Integrated marketplace infrastructure for peer-to-peer trading of tokenized assets with real-time valuation and settlement.</p>
          </GreenCard>
        </div>
        <SlideNumber n={11} />
      </div>
    ),
  },
  // 12 — RWA Development: Model
  {
    id: "rwa-model",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>RWA Development — Model</SectionLabel>
        <SlideTitle>Platform Model.</SlideTitle>
        <div className="grid md:grid-cols-2 gap-5">
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Client Funnel</SectionLabel>
            <BulletList items={[
              { bold: "Inbound — Content & Thought Leadership:", text: "Blog, Intel, whitepapers, and conference presence driving qualified leads." },
              { bold: "Outbound — Institutional Sales:", text: "Direct BD targeting asset managers, family offices, and sovereign funds." },
              { bold: "Partner Channel:", text: "Law firms, investment banks, and financial advisors as referral partners." },
              { bold: "Self-Serve:", text: "Developer documentation and API sandbox for smaller issuers." },
            ]} />
          </GreenCard>
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Engagement Model</SectionLabel>
            <BulletList items={[
              { bold: "Discovery:", text: "Free asset assessment and tokenization feasibility report." },
              { bold: "Design:", text: "Custom token structure, legal wrapper, and smart contract architecture." },
              { bold: "Deploy:", text: "End-to-end launch with KYC integration, marketplace listing, and investor onboarding." },
              { bold: "Manage:", text: "Ongoing platform operations, compliance monitoring, and distribution management." },
            ]} />
          </GreenCard>
        </div>
        <SlideNumber n={12} />
      </div>
    ),
  },
  // 13 — RWA Development: Services
  {
    id: "rwa-services",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>RWA Development — Services</SectionLabel>
        <SlideTitle>Service Offerings.</SlideTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: "Asset Tokenization", desc: "Full-stack tokenization from legal structuring through smart contract deployment and marketplace integration." },
            { title: "Custody & Settlement", desc: "Institutional-grade custody solutions with T+0 settlement, automated reconciliation, and multi-sig security." },
            { title: "Investor Onboarding", desc: "White-label KYC/AML, investor accreditation verification, and jurisdiction-compliant onboarding flows." },
            { title: "Platform Licensing", desc: "White-label tokenization platform for financial institutions to launch their own RWA marketplace." },
          ].map(s => (
            <GreenCard key={s.title} className="space-y-3 py-6">
              <h3 className="text-sm font-medium text-foreground">{s.title}</h3>
              <p className="text-xs font-light text-muted-foreground leading-relaxed">{s.desc}</p>
            </GreenCard>
          ))}
        </div>
        <SlideNumber n={13} />
      </div>
    ),
  },
  // 14 — RWA Development: Economics
  {
    id: "rwa-economics",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>RWA Development — Economics</SectionLabel>
        <SlideTitle>Platform Economics.</SlideTitle>
        <div className="grid grid-cols-4 gap-5 mb-4">
          <StatBlock value="$16T+" label="RWA Market 2030" />
          <StatBlock value="0.50%" label="Servicing Rate" />
          <StatBlock value="12" label="Asset Classes" />
          <StatBlock value="160+" label="Countries" />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Revenue Streams</SectionLabel>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Tokenization Fees</span><span className="text-foreground">1-3% AUM</span></div>
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Annual Servicing</span><span className="text-foreground">0.50% / YR</span></div>
              <div className="w-full h-px bg-border/30" />
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Transaction Fees</span><span className="text-foreground">0.10-0.25%</span></div>
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Platform Licensing</span><span className="text-foreground">$250K-$1M/yr</span></div>
            </div>
          </GreenCard>
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Growth Projections</SectionLabel>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Year 1 AUM Target</span><span className="text-foreground">$500M+</span></div>
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Year 2 AUM Target</span><span className="text-foreground">$5B+</span></div>
              <div className="w-full h-px bg-border/30" />
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Year 3 AUM Target</span><span className="text-foreground">$15B+</span></div>
              <div className="flex justify-between text-sm font-medium"><span className="text-foreground">Target Net Margin</span><span className="text-[hsl(82,85%,55%)]">55%+</span></div>
            </div>
          </GreenCard>
        </div>
        <SlideNumber n={14} />
      </div>
    ),
  },

  // ═══════════════════════════════════════
  // PRODUCT 4 — TOKEN ISSUANCE & DISTRIBUTION
  // ═══════════════════════════════════════
  // 15 — Token Issuance: Product
  {
    id: "issuance-product",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Token Issuance — Product</SectionLabel>
        <SlideTitle>Token Issuance & Distribution.</SlideTitle>
        <SlideSubtitle>Full-service token launch platform — from tokenomics design and smart contract deployment to exchange listing and investor distribution.</SlideSubtitle>
        <div className="grid md:grid-cols-3 gap-5">
          <GreenCard className="space-y-3 py-6">
            <h3 className="text-sm font-medium text-foreground">Launchpad</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">Managed token generation events with configurable vesting schedules, cliff periods, and multi-round distribution mechanics.</p>
          </GreenCard>
          <GreenCard className="space-y-3 py-6">
            <h3 className="text-sm font-medium text-foreground">Smart Contract Suite</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">Audited, modular token contracts supporting ERC-20, ERC-721, ERC-1155, and cross-chain deployments with upgrade proxies.</p>
          </GreenCard>
          <GreenCard className="space-y-3 py-6">
            <h3 className="text-sm font-medium text-foreground">Distribution Engine</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">Automated investor allocations, airdrop campaigns, staking rewards, and vesting unlock notifications across multiple chains.</p>
          </GreenCard>
        </div>
        <SlideNumber n={15} />
      </div>
    ),
  },
  // 16 — Token Issuance: Model
  {
    id: "issuance-model",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Token Issuance — Model</SectionLabel>
        <SlideTitle>Service Delivery Model.</SlideTitle>
        <div className="grid md:grid-cols-2 gap-5">
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Client Acquisition</SectionLabel>
            <BulletList items={[
              { bold: "Web3 Projects:", text: "Early-stage protocols, DAOs, and DeFi platforms needing compliant token launches." },
              { bold: "Traditional Enterprises:", text: "Corporates exploring tokenized loyalty, rewards, or digital equity programs." },
              { bold: "RWA Issuers:", text: "Asset owners requiring security token issuance and distribution infrastructure." },
              { bold: "Fund Managers:", text: "Tokenized fund structures for private equity, venture, and real estate vehicles." },
            ]} />
          </GreenCard>
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Delivery Phases</SectionLabel>
            <BulletList items={[
              { bold: "Phase 1 — Design:", text: "Tokenomics modeling, legal structure, and smart contract specification." },
              { bold: "Phase 2 — Build:", text: "Contract development, security audit, and testnet deployment." },
              { bold: "Phase 3 — Launch:", text: "TGE execution, exchange listing, and initial distribution." },
              { bold: "Phase 4 — Scale:", text: "Market making, liquidity management, and ongoing token operations." },
            ]} />
          </GreenCard>
        </div>
        <SlideNumber n={16} />
      </div>
    ),
  },
  // 17 — Token Issuance: Services
  {
    id: "issuance-services",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Token Issuance — Services</SectionLabel>
        <SlideTitle>Service Offerings.</SlideTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: "Tokenomics Design", desc: "Supply modeling, distribution schedules, incentive mechanics, and governance framework architecture." },
            { title: "Smart Contract Dev", desc: "Custom token contracts with security audits, upgrade patterns, and cross-chain bridge integration." },
            { title: "TGE Management", desc: "Full token generation event orchestration including KYC, allocation, vesting, and exchange coordination." },
            { title: "Post-Launch Ops", desc: "Market making, liquidity provisioning, treasury management, and community token distribution." },
          ].map(s => (
            <GreenCard key={s.title} className="space-y-3 py-6">
              <h3 className="text-sm font-medium text-foreground">{s.title}</h3>
              <p className="text-xs font-light text-muted-foreground leading-relaxed">{s.desc}</p>
            </GreenCard>
          ))}
        </div>
        <SlideNumber n={17} />
      </div>
    ),
  },
  // 18 — Token Issuance: Economics
  {
    id: "issuance-economics",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Token Issuance — Economics</SectionLabel>
        <SlideTitle>Service Economics.</SlideTitle>
        <div className="grid grid-cols-4 gap-5 mb-4">
          <StatBlock value="$50K" label="Min Engagement" />
          <StatBlock value="$250K" label="Avg Deal Size" />
          <StatBlock value="2-5%" label="Token Allocation" />
          <StatBlock value="70%+" label="Gross Margin" />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Revenue Model</SectionLabel>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Setup & Design Fee</span><span className="text-foreground">$50K-$150K</span></div>
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Smart Contract Development</span><span className="text-foreground">$25K-$100K</span></div>
              <div className="w-full h-px bg-border/30" />
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">TGE Management</span><span className="text-foreground">$50K-$200K</span></div>
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Token Allocation</span><span className="text-foreground">2-5% of supply</span></div>
            </div>
          </GreenCard>
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Recurring Revenue</SectionLabel>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Post-Launch Retainer</span><span className="text-foreground">$10K-$25K/mo</span></div>
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Market Making Commission</span><span className="text-foreground">Performance</span></div>
              <div className="w-full h-px bg-border/30" />
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Platform Hosting</span><span className="text-foreground">$5K-$15K/mo</span></div>
              <div className="flex justify-between text-sm font-medium"><span className="text-foreground">LTV per Client</span><span className="text-[hsl(82,85%,55%)]">$500K+</span></div>
            </div>
          </GreenCard>
        </div>
        <SlideNumber n={18} />
      </div>
    ),
  },

  // 19 — Closing
  {
    id: "closing",
    render: () => (
      <div className="relative flex flex-col items-center justify-center h-full text-center gap-6">
        <div className="absolute inset-0 pointer-events-none">
          <img src={heroBackground} alt="" className="absolute inset-0 w-full h-full object-cover object-center opacity-80" />
          <div className="absolute inset-0 pointer-events-none animated-gradient-hero-overlay" />
          <div className="absolute inset-0 bg-[hsl(220,20%,4%,0.25)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-6">
          <SectionLabel>Strategy Summary</SectionLabel>
          <h1 className="text-4xl md:text-6xl font-extralight tracking-tight text-foreground">
            Four Products. One Platform.
          </h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl">
            {[
              { title: "W3AI Token", desc: "Ecosystem utility & compute" },
              { title: "CUT Token", desc: "Carbon credits & ESG" },
              { title: "RWA Development", desc: "Asset tokenization platform" },
              { title: "Token Issuance", desc: "Launch & distribution services" },
            ].map(c => (
              <GreenCard key={c.title} className="py-4 text-center border-[hsl(82,85%,55%,0.3)]">
                <h4 className="text-xs font-medium text-foreground">{c.title}</h4>
                <p className="text-[10px] text-muted-foreground mt-1">{c.desc}</p>
              </GreenCard>
            ))}
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[hsl(82,85%,55%,0.6)] to-transparent" />
          <p className="text-sm font-light text-[hsl(82,85%,55%,0.5)] uppercase tracking-[0.3em]">TMRW-DIGITAL.COM</p>
        </div>
        <SlideNumber n={19} />
      </div>
    ),
  },
];

// --- Deck Viewer ---
export default function StrategyDeck() {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const total = slides.length;

  const next = useCallback(() => setCurrent(c => Math.min(c + 1, total - 1)), [total]);
  const prev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "Escape") setFullscreen(false);
      if (e.key === "f" || e.key === "F") setFullscreen(f => !f);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  const slideContent = (
    <div className={cn(
      "relative w-full bg-background border border-border rounded-2xl overflow-hidden transition-all duration-300",
      fullscreen ? "fixed inset-0 z-[80] rounded-none border-none" : "aspect-video"
    )}>
      <SlideBranding />
      <div key={current} className="absolute inset-0 p-8 md:p-16 flex flex-col animate-fade-in">
        {slides[current].render()}
      </div>

      <div className={cn(
        "absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-4",
        "bg-gradient-to-t from-background/80 to-transparent"
      )}>
        <button onClick={prev} disabled={current === 0}
          className="h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-[hsl(82,85%,55%)] hover:border-[hsl(82,85%,55%,0.3)] disabled:opacity-30 transition-all">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-xs font-light text-muted-foreground tracking-wider">
          {current + 1} / {total}
        </span>
        <div className="flex items-center gap-2">
          <button onClick={() => setFullscreen(f => !f)}
            className="h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-[hsl(82,85%,55%)] hover:border-[hsl(82,85%,55%,0.3)] transition-all">
            {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button onClick={next} disabled={current === total - 1}
            className="h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-[hsl(82,85%,55%)] hover:border-[hsl(82,85%,55%,0.3)] disabled:opacity-30 transition-all">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-0.5 bg-border">
        <div className="h-full bg-[hsl(82,85%,55%)] transition-all duration-300" style={{ width: `${((current + 1) / total) * 100}%` }} />
      </div>
    </div>
  );

  const thumbnails = (
    <div className="flex gap-3 overflow-x-auto py-4 px-1 scrollbar-thin">
      {slides.map((s, i) => (
        <button
          key={s.id}
          onClick={() => setCurrent(i)}
          className={cn(
            "shrink-0 w-32 h-[72px] rounded-lg border overflow-hidden relative transition-all",
            i === current
              ? "border-[hsl(82,85%,55%)] shadow-[0_0_12px_hsl(82,85%,55%,0.3)] ring-1 ring-[hsl(82,85%,55%)]"
              : "border-border opacity-60 hover:opacity-100 hover:border-[hsl(82,85%,55%,0.3)]"
          )}
        >
          <div className="absolute inset-0 bg-background">
            <div
              className="origin-top-left pointer-events-none"
              style={{ width: "1280px", height: "720px", transform: "scale(0.1)" }}
            >
              <div className="w-full h-full p-8 md:p-16 flex flex-col">
                {s.render()}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );

  if (fullscreen) return slideContent;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title="TMRW Strategy Deck" description="Internal strategy deck — Product & Sales Funnels across W3AI Token, CUT Token, RWA Development, and Token Issuance." path="/strategy-deck" noindex />
      <Navbar />
      <div className="pt-20 lg:pt-24 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
        {slideContent}
        {thumbnails}
        <p className="text-xs text-muted-foreground/50 mt-4 text-center">
          Arrow keys to navigate · F for fullscreen · Esc to exit
        </p>
      </div>
      <Footer />
    </div>
  );
}
