import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import heroBackground from "@/assets/hero-bg.webp";
import platoIcon from "@/assets/plato-icon.webp";
import dataCenterImg from "@/assets/data-center.webp";
import stockExchangeImg from "@/assets/stock-exchange.webp";

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
        TMRW <span className="text-muted-foreground/30">|</span> Ordior
      </span>
    </div>
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

const slides: Slide[] = [
  // ===== 1 — Title =====
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
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">The Tomorrow Company</h1>
            <p className="text-lg md:text-xl font-light text-muted-foreground tracking-wide">Tomorrow Digital Inc.</p>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[hsl(82,85%,55%,0.6)] to-transparent" />
          <p className="text-sm font-light text-[hsl(82,85%,55%,0.6)] uppercase tracking-[0.3em]">Prepared for Ordior</p>
          <p className="text-xs font-light text-muted-foreground/40 uppercase tracking-[0.2em]">Private & Confidential</p>
        </div>
      </div>
    ),
  },

  // ===== 2 — Disclaimer =====
  {
    id: "disclaimer",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-5 max-w-3xl mx-auto relative">
        <SlideTitle>Confidential</SlideTitle>
        <div className="space-y-3 text-left">
          <p className="text-xs font-light text-muted-foreground leading-relaxed">
            <span className="font-medium text-[hsl(82,85%,55%)]">Forward-Looking Statements.</span> This presentation contains forward-looking statements that reflect current intentions and are not guarantees of future performance or results. Recipients should consult qualified professional advisors before making any decisions.
          </p>
          <p className="text-xs font-light text-muted-foreground leading-relaxed">
            <span className="font-medium text-[hsl(82,85%,55%)]">Confidential Material.</span> This document is provided strictly for informational purposes. It does not constitute an offer to sell, or a solicitation of an offer to buy, any securities. Distribution without express written consent is prohibited.
          </p>
        </div>
        <div className="w-16 h-px bg-[hsl(82,85%,55%,0.3)] mx-auto mt-2" />
        <p className="text-xs font-light text-muted-foreground/50 uppercase tracking-[0.3em] text-center">Tomorrow Digital Inc.</p>
      </div>
    ),
  },

  // ===== 3 — TMRW Framework Overview =====
  {
    id: "framework",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <p className="text-xs uppercase tracking-[0.3em] text-[hsl(82,85%,55%,0.6)]">The TMRW Framework</p>
        <SlideTitle>Licensed Data Intelligence & Tokenization Infrastructure</SlideTitle>
        <SlideSubtitle>
          A best-in-class white-label tokenization solution for real-world assets — combining data intelligence, 
          blockchain infrastructure, and institutional-grade analytics into a single deployable platform.
        </SlideSubtitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
          <StatBlock value="12+" label="Asset Classes" />
          <StatBlock value="160+" label="Countries" />
          <StatBlock value="$2B+" label="Assets Tokenized" />
          <StatBlock value="24/7" label="Settlement" />
        </div>
      </div>
    ),
  },

  // ===== 4 — Whitelabel Model =====
  {
    id: "whitelabel",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <p className="text-xs uppercase tracking-[0.3em] text-[hsl(82,85%,55%,0.6)]">Whitelabel Tokenization</p>
        <SlideTitle>Your Brand. Our Infrastructure.</SlideTitle>
        <SlideSubtitle>
          Deploy a fully branded tokenization and data intelligence platform — built on the TMRW Licensed Data Framework — 
          without building from scratch.
        </SlideSubtitle>
        <div className="grid grid-cols-2 gap-6">
          {[
            { title: "Custom Branded Interface", desc: "Fully white-labeled application with your identity, dashboards, and investor portal." },
            { title: "Data Intelligence Engine", desc: "Real-time analytics, asset valuation tracking, NAV calculations, and market data feeds." },
            { title: "Token Lifecycle Management", desc: "End-to-end token minting, distribution, burn, retirement, and supply tracking." },
            { title: "Blockchain Infrastructure", desc: "Ethereum / EVM compatible smart contracts, asset registries, and ownership records." },
          ].map(c => (
            <GreenCard key={c.title} className="p-5 space-y-2">
              <h3 className="text-sm font-medium text-foreground">{c.title}</h3>
              <p className="text-[11px] font-light text-muted-foreground leading-relaxed">{c.desc}</p>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },

  // ===== 5 — Platform Architecture =====
  {
    id: "architecture",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-6 max-w-3xl mx-auto relative">
        <SlideTitle>Platform Architecture</SlideTitle>
        <SlideSubtitle>Four integrated layers powering the complete tokenization lifecycle.</SlideSubtitle>
        <div className="grid grid-cols-2 gap-4">
          {[
            { num: "L1", title: "Blockchain Infrastructure", desc: "Ethereum / EVM compatible — token minting, smart contracts, asset registry, transfers, ownership records, and interoperability." },
            { num: "L2", title: "Token Lifecycle Engine", desc: "Token minting, distribution, burn and retirement management, asset reserve reconciliation, and supply integrity tracking." },
            { num: "L3", title: "Data Intelligence Engine", desc: "Powered by the TMRW Data Framework — real-time analytics, reserve intelligence, market feeds, NAV calculations, and investor dashboards." },
            { num: "L4", title: "Application & Trading Layer", desc: "White-label platform with asset dashboard, investor reporting, minting controls, registry management, and trading integration." },
          ].map(l => (
            <GreenCard key={l.num} className="p-5 space-y-2">
              <span className="text-2xl font-extralight text-muted-foreground/30">{l.num}</span>
              <h3 className="text-sm font-medium text-foreground">{l.title}</h3>
              <p className="text-[11px] font-light text-muted-foreground leading-relaxed">{l.desc}</p>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },

  // ===== 6 — RWA Tokenization Sectors =====
  {
    id: "rwas",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Real World Asset Tokenization</SlideTitle>
        <SlideSubtitle>
          Tokenization transforms illiquid assets into programmable, borderless capital — unlocking trillions in previously inaccessible value.
        </SlideSubtitle>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {[
            "Carbon Credits", "Collectables", "Commodities", "Energy",
            "Infrastructure", "Metals", "Rare Earth", "Real Estate",
            "Sovereign Wealth", "Stablecoins", "Tax Credits", "Utilities",
          ].map(v => (
            <div key={v} className="p-3 rounded-lg border border-[hsl(82,85%,55%,0.3)] bg-card text-center relative overflow-hidden hover:border-[hsl(82,85%,55%,0.8)] hover:shadow-[0_0_20px_-5px_hsl(82,85%,55%,0.4)] transition-all group">
              <p className="text-xs font-medium text-foreground group-hover:text-[hsl(82,85%,55%)] transition-colors">{v}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // ===== 7 — Institutional Vision =====
  {
    id: "vision",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <div className="relative rounded-2xl overflow-hidden">
          <img src={stockExchangeImg} alt="Stock Exchange" className="w-full h-[200px] md:h-[260px] object-cover grayscale brightness-110" />
          <div className="absolute inset-0 animated-gradient-datacenter-bg" />
        </div>
        <SlideTitle>Institutional Trading Vision</SlideTitle>
        <SlideSubtitle>
          Enabling tokenized assets to trade across institutional platforms — bank commodity desks, digital asset exchanges, 
          institutional RWA platforms, and OTC trading systems with blockchain-based settlement and transparency.
        </SlideSubtitle>
      </div>
    ),
  },

  // ===== 8 — Leadership Team =====
  {
    id: "team",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Leadership Team</SlideTitle>
        <SlideSubtitle>Proven executives with track records in Fintech, AI, Blockchain, and Public Markets.</SlideSubtitle>
        <div className="grid grid-cols-2 gap-5">
          {[
            { name: "Justin Hartzman", role: "Chairman", bio: "Serial entrepreneur. Co-founded CoinSmart, leading it to a public listing and sale to WonderFi (TSX:WNDR). Over a decade scaling fintech companies." },
            { name: "Paul Thomson", role: "CEO", bio: "Founder of Carbon Distributed Technologies AG. Independent Director at eXeBlock Technology Inc. Deep expertise in corporate governance and compliance." },
            { name: "Bryan Feinberg", role: "COO / CTO", bio: "Founder of Zephyr Technology Ventures, Platodata and AmplifiX. Led startup from inception to $130M revenue and public listing. Licensed Investment Banker." },
            { name: "Zach Goldenberg", role: "Advisor", bio: "Principal at Liberty Venture Partners. Corporate securities lawyer. ICD.D designate and TSXV Advisory Committee member." },
          ].map(m => (
            <GreenCard key={m.name} className="p-5 space-y-2">
              <h3 className="text-sm font-medium text-foreground">{m.name}</h3>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(82,85%,55%,0.7)]">{m.role}</p>
              <p className="text-[11px] font-light text-muted-foreground leading-relaxed">{m.bio}</p>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "team",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Leadership Team</SlideTitle>
        <SlideSubtitle>Proven executives with track records in Fintech, AI, Blockchain, and Public Markets.</SlideSubtitle>
        <div className="grid grid-cols-2 gap-5">
          {[
            { name: "Justin Hartzman", role: "Chairman", bio: "Serial entrepreneur. Co-founded CoinSmart, leading it to a public listing and sale to WonderFi (TSX:WNDR). Over a decade scaling fintech companies." },
            { name: "Paul Thomson", role: "CEO", bio: "Founder of Carbon Distributed Technologies AG. Independent Director at eXeBlock Technology Inc. Deep expertise in corporate governance and compliance." },
            { name: "Bryan Feinberg", role: "COO / CTO", bio: "Founder of Zephyr Technology Ventures, Platodata and AmplifiX. Led startup from inception to $130M revenue and public listing. Licensed Investment Banker." },
            { name: "Zach Goldenberg", role: "Advisor", bio: "Principal at Liberty Venture Partners. Corporate securities lawyer. ICD.D designate and TSXV Advisory Committee member." },
          ].map(m => (
            <GreenCard key={m.name} className="p-5 space-y-2">
              <h3 className="text-sm font-medium text-foreground">{m.name}</h3>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(82,85%,55%,0.7)]">{m.role}</p>
              <p className="text-[11px] font-light text-muted-foreground leading-relaxed">{m.bio}</p>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },

  // ===== 11 — Tokenized Mining Assets (Pilot Intro) =====
  {
    id: "pilot-intro",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <p className="text-xs uppercase tracking-[0.3em] text-[hsl(82,85%,55%,0.6)]">Pilot Program</p>
        <SlideTitle>Tokenized Mining Assets Platform</SlideTitle>
        <SlideSubtitle>
          Custom Data Intelligence & Tokenization Engine for Real World Gold Assets — bridging traditional commodity markets 
          and blockchain infrastructure.
        </SlideSubtitle>
        <BulletList items={[
          { bold: "RWA Tokenization Infrastructure —", text: "end-to-end token lifecycle from minting to retirement." },
          { bold: "Custom Data Intelligence Engine —", text: "real-time analytics powered by the TMRW Data Framework." },
          { bold: "Institutional-Grade Analytics —", text: "asset valuation, NAV calculations, and reserve intelligence." },
          { bold: "Trading & Transfer Infrastructure —", text: "built for eventual institutional desk integration." },
        ]} />
      </div>
    ),
  },

  // ===== 12 — Core Offering: $25,000 Pilot =====
  {
    id: "pilot-offering",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <div className="flex items-baseline gap-4">
          <SlideTitle>Core Offering</SlideTitle>
          <span className="text-2xl font-extralight text-[hsl(82,85%,55%)]">$25,000</span>
        </div>
        <SlideSubtitle>
          The Pilot Program enables mining operators or asset owners to deploy a fully branded tokenization 
          and intelligence platform to represent their gold assets digitally.
        </SlideSubtitle>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <SectionLabel>White Label Application</SectionLabel>
            <BulletList items={[
              { bold: "Custom branded interface", text: "built on the TMRW Data Framework." },
              { bold: "Asset analytics dashboards", text: "with data visualization and reporting." },
              { bold: "Token lifecycle management", text: "system with backend registry." },
            ]} />
          </div>
          <div className="space-y-4">
            <SectionLabel>Blockchain Infrastructure</SectionLabel>
            <BulletList items={[
              { bold: "Ethereum / EVM compatible", text: "testnet deployment." },
              { bold: "Token minting infrastructure", text: "with smart contract deployment." },
              { bold: "Asset token registry", text: "with lifecycle management tools." },
            ]} />
          </div>
        </div>
      </div>
    ),
  },

  // ===== 13 — Tokenized Asset Model =====
  {
    id: "token-model",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Tokenized Asset Model</SlideTitle>
        <SlideSubtitle>
          Each token series represents specific asset allocations or reserve blocks — verified in-ground gold reserves 
          linked to asset metadata, reserve documentation, and chain-verified minting records.
        </SlideSubtitle>
        <div className="grid grid-cols-3 gap-4">
          {[
            { title: "Verified Reserves", desc: "Tokens represent verified in-ground gold reserves with linked geological data." },
            { title: "Asset Metadata", desc: "Complete asset documentation framework with ownership records and chain verification." },
            { title: "Supply Integrity", desc: "Reserve reconciliation, asset reporting, and transparent supply tracking on-chain." },
          ].map(c => (
            <GreenCard key={c.title} className="p-5 space-y-2">
              <h3 className="text-sm font-medium text-foreground">{c.title}</h3>
              <p className="text-[11px] font-light text-muted-foreground leading-relaxed">{c.desc}</p>
            </GreenCard>
          ))}
        </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[hsl(82,85%,55%,0.15)] to-transparent" />
      </div>
    ),
  },

  // ===== 14 — Pilot Deliverables =====
  {
    id: "deliverables",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-6 max-w-3xl mx-auto relative">
        <SlideTitle>Pilot Deliverables</SlideTitle>
        <div className="grid grid-cols-2 gap-4">
          {[
            "Custom branded application",
            "Token minting on EVM testnet",
            "Token lifecycle management system",
            "Asset registry & verification layer",
            "Custom analytics dashboard",
            "Secure backend administration",
            "Smart contract deployment",
            "Token issuance test environment",
            "12 months hosting & infrastructure",
            "Security monitoring",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-[hsl(82,85%,55%,0.1)] bg-card/50">
              <div className="w-5 h-5 rounded-full border border-[hsl(82,85%,55%,0.4)] flex items-center justify-center shrink-0">
                <div className="w-2 h-2 rounded-full bg-[hsl(82,85%,55%)]" />
              </div>
              <p className="text-xs font-light text-muted-foreground">{item}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // ===== 15 — Conversion & Ongoing Costs =====
  {
    id: "costs",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Conversion & Ongoing Costs</SlideTitle>
        <div className="grid md:grid-cols-3 gap-6">
          <GreenCard className="p-6 space-y-3">
            <h3 className="text-base font-medium text-[hsl(82,85%,55%)]">Testnet → Mainnet</h3>
            <p className="text-3xl font-extralight text-foreground">1%</p>
            <p className="text-xs font-light text-muted-foreground">of Minted Asset NAV plus ancillary operational costs. Clients have up to 12 months to convert.</p>
          </GreenCard>
          <GreenCard className="p-6 space-y-3">
            <h3 className="text-base font-medium text-[hsl(82,85%,55%)]">Pilot Maintenance</h3>
            <p className="text-3xl font-extralight text-foreground">$1,500<span className="text-lg text-muted-foreground">/mo</span></p>
            <p className="text-xs font-light text-muted-foreground">Platform maintenance, security monitoring, infrastructure hosting, and token management support.</p>
          </GreenCard>
          <GreenCard className="p-6 space-y-3">
            <h3 className="text-base font-medium text-[hsl(82,85%,55%)]">Live Mainnet</h3>
            <p className="text-3xl font-extralight text-foreground">$20–40K<span className="text-lg text-muted-foreground">/yr</span></p>
            <p className="text-xs font-light text-muted-foreground">Hosting, security, smart contract monitoring, compliance support, and trading system integration.</p>
          </GreenCard>
        </div>
      </div>
    ),
  },

  // ===== 16 — 90-Day Deployment Roadmap =====
  {
    id: "roadmap",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-6 max-w-3xl mx-auto relative">
        <SlideTitle>90-Day Deployment Roadmap</SlideTitle>
        <div className="grid grid-cols-2 gap-4">
          {[
            { phase: "01", title: "Assessment & Planning", duration: "2 Weeks", items: "Evaluate asset class, review reserve documentation, define token model, establish economics, identify compliance requirements." },
            { phase: "02", title: "Custom Design & Branding", duration: "2 Weeks", items: "Develop client branding, design dashboard interface, investor portal, analytics displays, and UX architecture." },
            { phase: "03", title: "Development", duration: "30 Days", items: "Smart contract layer, token minting contracts, application layer with dashboards, data infrastructure with asset registry." },
            { phase: "04", title: "Testing & Validation", duration: "30 Days", items: "Security testing, token minting validation, data integrity testing, penetration testing, EVM testnet deployment." },
          ].map(p => (
            <GreenCard key={p.phase} className="p-5 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extralight text-muted-foreground/30">{p.phase}</span>
                <span className="text-[10px] uppercase tracking-wider text-[hsl(82,85%,55%,0.6)]">{p.duration}</span>
              </div>
              <h3 className="text-sm font-medium text-foreground">{p.title}</h3>
              <p className="text-[11px] font-light text-muted-foreground leading-relaxed">{p.items}</p>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },

  // ===== 17 — Pilot Launch (Day 90) =====
  {
    id: "launch",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <div className="relative rounded-2xl overflow-hidden">
          <img src={dataCenterImg} alt="Data Center" className="w-full h-[200px] md:h-[260px] object-cover grayscale brightness-110" />
          <div className="absolute inset-0 animated-gradient-datacenter-bg" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>
        <SlideTitle>Pilot Launch — Day 90</SlideTitle>
        <div className="grid grid-cols-2 gap-4">
          {[
            "Fully deployed branded application",
            "Token minting system operational",
            "Testnet token series live",
            "Asset analytics dashboards",
            "Admin management console",
            "Investor portal access",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border border-[hsl(82,85%,55%,0.4)] flex items-center justify-center shrink-0">
                <div className="w-2 h-2 rounded-full bg-[hsl(82,85%,55%)]" />
              </div>
              <p className="text-sm font-light text-muted-foreground">{item}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // ===== 18 — Mainnet Migration =====
  {
    id: "mainnet",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <p className="text-xs uppercase tracking-[0.3em] text-[hsl(82,85%,55%,0.6)]">Post-Launch</p>
        <SlideTitle>Mainnet Migration Path</SlideTitle>
        <SlideSubtitle>
          During the 12-month pilot period, clients can expand token supply, onboard investors, validate trading models, 
          and integrate institutional partners — converting to mainnet at any time.
        </SlideSubtitle>
        <div className="grid grid-cols-3 gap-4">
          {[
            { num: "01", title: "Smart Contract Audit", desc: "Comprehensive security review of all deployed contracts." },
            { num: "02", title: "Mainnet Deployment", desc: "Contract deployment to production blockchain." },
            { num: "03", title: "Asset Verification", desc: "Final confirmation of reserve documentation." },
            { num: "04", title: "Custody Integration", desc: "Institutional-grade custody system setup." },
            { num: "05", title: "Settlement Rails", desc: "Institutional settlement infrastructure." },
            { num: "06", title: "Liquidity Partners", desc: "Onboarding market makers and exchanges." },
          ].map(s => (
            <GreenCard key={s.num} className="p-4 space-y-1">
              <span className="text-lg font-extralight text-muted-foreground/30">{s.num}</span>
              <h3 className="text-xs font-medium text-foreground">{s.title}</h3>
              <p className="text-[10px] font-light text-muted-foreground leading-relaxed">{s.desc}</p>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },

  // ===== 19 — Strategic Value =====
  {
    id: "strategic",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Strategic Value</SlideTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <SectionLabel>For Mining Companies</SectionLabel>
            <BulletList items={[
              { bold: "Unlock liquidity", text: "from verified reserves through tokenization." },
              { bold: "Digitize ownership", text: "with blockchain-verified provenance." },
              { bold: "Create tradable tokens", text: "backed by real-world gold assets." },
              { bold: "Attract institutional investors", text: "with transparent, auditable infrastructure." },
            ]} />
          </div>
          <div className="space-y-4">
            <SectionLabel>For Financial Institutions</SectionLabel>
            <BulletList items={[
              { bold: "Commodity-backed digital assets", text: "with verifiable provenance." },
              { bold: "Programmable infrastructure", text: "enabling automated compliance and settlement." },
              { bold: "Expansion potential", text: "across precious metals, energy, minerals, and infrastructure." },
            ]} />
          </div>
        </div>
      </div>
    ),
  },

  // ===== 20 — Closing =====
  {
    id: "closing",
    render: () => (
      <div className="relative flex flex-col items-center justify-center h-full text-center gap-6">
        <div className="absolute inset-0 pointer-events-none animate-fade-in">
          <img src={heroBackground} alt="" className="absolute inset-0 w-full h-full object-cover object-center opacity-80" />
          <div className="absolute inset-0 pointer-events-none animated-gradient-hero-overlay" />
          <div className="absolute inset-0 bg-[hsl(220,20%,4%,0.25)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-extralight tracking-tight text-foreground">Thank You</h1>
            <p className="text-lg md:text-xl font-light text-muted-foreground tracking-wide">The Tomorrow Company</p>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[hsl(82,85%,55%,0.6)] to-transparent" />
          <p className="text-sm font-light text-[hsl(82,85%,55%,0.5)] uppercase tracking-[0.3em]">TMRW-DIGITAL.COM</p>
          <p className="text-xs font-light text-muted-foreground/40 max-w-md">
            bf@tmrw-digital.com · 300-10991 Shellbridge Way, Richmond, BC V6X 3C6
          </p>
        </div>
      </div>
    ),
  },
];

// --- Deck viewer ---
export default function OrdiorDeck() {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const total = slides.length;

  const next = useCallback(() => setCurrent(c => Math.min(c + 1, total - 1)), [total]);
  const prev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;
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
      <SEOHead title="Ordior | TMRW Deck" description="TMRW tokenization platform deck prepared for Ordior." path="/Ordior" noindex />
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
