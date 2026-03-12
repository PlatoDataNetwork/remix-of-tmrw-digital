import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroBackground from "@/assets/hero-bg.png";
import platoIcon from "@/assets/plato-icon.png";
import dataCenterImg from "@/assets/data-center.jpeg";
import stockExchangeImg from "@/assets/stock-exchange.png";

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
        TMRW <span className="text-muted-foreground/30">|</span> Corporate
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
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">The Tomorrow Company</h1>
            <p className="text-lg md:text-xl font-light text-muted-foreground tracking-wide">Tomorrow Digital Inc.</p>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[hsl(82,85%,55%,0.6)] to-transparent" />
          <p className="text-sm font-light text-[hsl(82,85%,55%,0.6)] uppercase tracking-[0.3em]">Corporate Overview — 2026</p>
        </div>
      </div>
    ),
  },
  // 2 — Disclaimer
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
  // 3 — Company Overview
  {
    id: "overview",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Company Overview</SlideTitle>
        <SlideSubtitle>
          Tomorrow Digital Inc. (DBA: The Tomorrow Company) consolidates Plato AI with Carbon Distributed Technologies, 
          creating the foundation for tomorrow's digital economy.
        </SlideSubtitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
          <StatBlock value="13M+" label="Platform Visitors" />
          <StatBlock value="160+" label="Countries Reached" />
          <StatBlock value="35" label="Languages" />
          <StatBlock value="70K+" label="Enterprise Users" />
        </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[hsl(82,85%,55%,0.15)] to-transparent mt-2" />
      </div>
    ),
  },
  // 4 — Mission & Vision
  {
    id: "mission",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <p className="text-xs uppercase tracking-[0.3em] text-[hsl(82,85%,55%,0.6)]">Mission</p>
        <SlideTitle>Building the Infrastructure for Tomorrow's Digital Economy</SlideTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <SectionLabel>Our Mission</SectionLabel>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              To engineer the infrastructure layer that the next generation of capital markets will run on — 
              where AI is native, assets are programmable, and trust is verified.
            </p>
          </div>
          <div className="space-y-4">
            <SectionLabel>Our Vision</SectionLabel>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              A world where intelligence and capital move together under explicit user control, 
              bridging traditional finance with Web3 through institutional-grade infrastructure.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  // 5 — About
  {
    id: "about",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Built on Experience. Driven by Results.</SlideTitle>
        <SlideSubtitle>
          With over two decades of proven expertise, our team has guided hundreds of companies through 
          critical growth stages — delivering measurable outcomes backed by deep industry knowledge and strategic execution.
        </SlideSubtitle>
        <BulletList items={[
          { bold: "Disciplined capital deployment", text: "with forward-thinking execution across emerging and established markets." },
          { bold: "AI and Web3 convergence", text: "redefining how capital moves, how value is measured, and how trust is established." },
          { bold: "Institutional credibility", text: "with public market transparency and regulatory compliance from day one." },
        ]} />
      </div>
    ),
  },
  // 6 — Methodology
  {
    id: "methodology",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <p className="text-xs uppercase tracking-[0.3em] text-[hsl(82,85%,55%,0.6)]">Methodology</p>
        <SlideTitle>Conviction Over Convention</SlideTitle>
        <div className="grid grid-cols-2 gap-6">
          {[
            { num: "01", title: "Infrastructure First", desc: "We build the rails, not chase trends. Institutional-grade infrastructure designed to outlast market cycles." },
            { num: "02", title: "Vertical Intelligence", desc: "Embedding AI natively into each vertical so data, compliance, and execution become indivisible." },
            { num: "03", title: "Convergence by Design", desc: "Web3 + AI architected simultaneously — trust is verifiable, intelligence is decentralized." },
            { num: "04", title: "Capital-Ready", desc: "Every product built to withstand regulatory scrutiny, due diligence, and public market transparency." },
          ].map(p => (
            <GreenCard key={p.num} className="p-5 space-y-2">
              <span className="text-2xl font-extralight text-muted-foreground/30">{p.num}</span>
              <h3 className="text-sm font-medium text-foreground">{p.title}</h3>
              <p className="text-xs font-light text-muted-foreground leading-relaxed">{p.desc}</p>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },
  // 7 — Services
  {
    id: "services",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Service Verticals</SlideTitle>
        <SlideSubtitle>End-to-end capabilities driving growth, security, and competitive advantage.</SlideSubtitle>
        <div className="grid grid-cols-3 gap-4">
          {[
            { title: "Web3AI", desc: "Strategic guidance through Web3 and AI-powered digital transformation" },
            { title: "Real World Assets", desc: "Tokenization and management for broader investor accessibility" },
            { title: "Data Intelligence", desc: "Data-driven insights for opportunity identification" },
            { title: "AI Super Cloud", desc: "Distributed compute layer for AI inference and analytics" },
            { title: "Cyber Defense", desc: "Advanced threat detection and blockchain security audits" },
            { title: "Digital Strategy", desc: "Comprehensive social media and outreach for Web3 markets" },
          ].map(s => (
            <GreenCard key={s.title} className="p-4 space-y-2">
              <h3 className="text-sm font-medium text-foreground">{s.title}</h3>
              <p className="text-[11px] font-light text-muted-foreground leading-relaxed">{s.desc}</p>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },
  // 8 — W3AI TMRW Browser
  {
    id: "browser",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-6 max-w-3xl mx-auto relative">
        <p className="text-xs uppercase tracking-[0.3em] text-[hsl(82,85%,55%,0.6)]">Flagship Product</p>
        <SlideTitle>W3AI TMRW Browser</SlideTitle>
        <SlideSubtitle>
          A macOS desktop Web3 AI Browser built on Firefox. The browser is the execution environment 
          for AI, identity, and money.
        </SlideSubtitle>
        <BulletList items={[
          { bold: "Gecko engine —", text: "deep customization, open-source codebase, Chromium-independent." },
          { bold: "User-selectable AI —", text: "BYOK or Open Gateway with token-based billing." },
          { bold: "Security-first —", text: "smart contract audits, transaction simulation, no autonomous signing." },
          { bold: "Multi-chain —", text: "native support for Solana, Ethereum, BSC, and 12+ networks." },
        ]} />
      </div>
    ),
  },
  // 9 — RWA Tokenization
  {
    id: "rwas",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Real World Asset Tokenization</SlideTitle>
        <SlideSubtitle>
          12 verticals bridging traditional finance with on-chain liquidity and fractional ownership.
        </SlideSubtitle>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {[
            "Carbon Credits", "Collectables", "Commodities", "Energy",
            "Infrastructure", "Metals", "Rare Earth", "Real Estate",
            "Sovereign Wealth", "Stablecoins", "Tax Credits", "Utilities",
          ].map(v => (
            <div key={v} className="p-3 rounded-lg border border-[hsl(82,85%,55%,0.15)] bg-card text-center relative overflow-hidden hover:border-[hsl(82,85%,55%,0.3)] transition-colors">
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[hsl(82,85%,55%,0.2)] to-transparent" />
              <p className="text-xs font-medium text-foreground">{v}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // 10 — Market Opportunity
  {
    id: "market",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Market Opportunity</SlideTitle>
        <div className="grid grid-cols-3 gap-8 pt-4">
          <StatBlock value="$200B+" label="Web3/AI Market by 2030" />
          <StatBlock value="$50B+" label="Carbon Market by 2030" />
          <StatBlock value="741M" label="Global Crypto Owners" />
        </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[hsl(82,85%,55%,0.15)] to-transparent" />
        <BulletList items={[
          { bold: "Blockchain-verified", text: "carbon credit infrastructure with 500K+ tonnes ISO-certified" },
          { bold: "Enterprise adoption", text: "accelerating across DeFi, tokenization, and institutional custody" },
          { bold: "Public market access", text: "via TSX Venture Exchange listing targeting Q2 2026" },
        ]} />
      </div>
    ),
  },
  // 12 — Carbon & ESG Assets
  {
    id: "carbon",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Carbon & ESG Infrastructure</SlideTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <SectionLabel>Carbon Assets</SectionLabel>
            <BulletList items={[
              { bold: "500,000 tonnes", text: "ISO-certified carbon credits" },
              { bold: "~$5M USD", text: "valued carbon credit portfolio" },
              { bold: "Option for 2.3M", text: "additional tonnes available" },
              { bold: "300M+ CUT tokens", text: "in treasury reserve" },
            ]} />
          </div>
          <div className="space-y-4">
            <SectionLabel>ESG Technology</SectionLabel>
            <BulletList items={[
              { bold: "Blockchain verification", text: "with immutable audit trails" },
              { bold: "Retire App", text: "for transparent token burning" },
              { bold: "FMA regulated", text: "under Liechtenstein framework" },
              { bold: "6M+ kg", text: "carbon offsets already retired" },
            ]} />
          </div>
        </div>
      </div>
    ),
  },
  // 13 — RTO & Public Markets
  {
    id: "rto",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <div className="relative rounded-2xl overflow-hidden">
          <img src={stockExchangeImg} alt="Stock Exchange" className="w-full h-[200px] md:h-[260px] object-cover grayscale brightness-110" />
          <div className="absolute inset-0 animated-gradient-datacenter-bg" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(82,85%,55%,0.4)] via-[hsl(82,85%,55%,0.2)] to-transparent" />
        </div>
        <SlideTitle>RTO & Public Markets</SlideTitle>
        <SlideSubtitle>
          Reverse takeover transaction targeting TSX Venture Exchange listing in Q2 2026 — 
          bringing institutional credibility and public market access.
        </SlideSubtitle>
      </div>
    ),
  },
  // 14 — Competitive Landscape
  {
    id: "competitive",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Competitive Landscape</SlideTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <SectionLabel>What Sets Us Apart</SectionLabel>
            <BulletList items={[
              { bold: "Convergence —", text: "AI + Web3 + RWA in a single integrated platform" },
              { bold: "Public market path —", text: "TSX listing provides institutional confidence" },
              { bold: "Regulatory-first —", text: "dual-jurisdiction compliance (Canada + Liechtenstein)" },
              { bold: "Revenue generating —", text: "existing platform with proven traction" },
            ]} />
          </div>
          <div className="space-y-4">
            <SectionLabel>vs Market</SectionLabel>
            <BulletList items={[
              { bold: "vs Brave —", text: "Web3-specific security beyond privacy" },
              { bold: "vs Pure DeFi —", text: "institutional-grade rails + compliance" },
              { bold: "vs TradFi —", text: "on-chain transparency + fractional access" },
              { bold: "vs AI startups —", text: "integrated token economy + browser distribution" },
            ]} />
          </div>
        </div>
      </div>
    ),
  },
  // 15 — Leadership Team
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
  // 16 — Network Partners
  {
    id: "partners",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Network Partners</SlideTitle>
        <SlideSubtitle>Product-integrated partnerships covering security, identity, liquidity, and institutional credibility.</SlideSubtitle>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: "0x", role: "DEX aggregation & routing" },
            { name: "Changelly", role: "Instant exchange & on-ramp" },
            { name: "CLS", role: "FX settlement infrastructure" },
            { name: "Dentity", role: "Identity & anti-sybil" },
            { name: "G-20 Group", role: "Liquidity & treasury" },
            { name: "Hacken", role: "Security & audits" },
            { name: "LabLab", role: "AI builder community" },
            { name: "Northern Trust", role: "Institutional tokenization" },
            { name: "Surge", role: "Token launch gateway" },
          ].map(p => (
            <GreenCard key={p.name} className="p-4 space-y-1">
              <h3 className="text-sm font-medium text-foreground">{p.name}</h3>
              <p className="text-[11px] font-light text-muted-foreground">{p.role}</p>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },
  // 17 — Regulatory & Compliance
  {
    id: "regulatory",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Regulatory & Compliance</SlideTitle>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Canada", desc: "IFRS standards, FINTRAC compliance, CPA-governed auditing, and TSX Venture Exchange regulatory framework." },
            { title: "Liechtenstein", desc: "TVTG (Token & VT Service Provider Act) regulatory framework under FMA oversight — EU-passportable." },
            { title: "Global Standards", desc: "AML/KYC automation, Travel Rule compliance, real-time sanctions screening, and quarterly treasury reporting." },
          ].map(c => (
            <GreenCard key={c.title} className="p-6 space-y-3">
              <h3 className="text-base font-medium text-[hsl(82,85%,55%)]">{c.title}</h3>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">{c.desc}</p>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },
  // 18 — Infrastructure
  {
    id: "infrastructure",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-6 max-w-3xl mx-auto relative">
        <div className="relative rounded-2xl overflow-hidden">
          <img src={dataCenterImg} alt="Data Center" className="w-full h-[200px] md:h-[260px] object-cover grayscale brightness-110" />
          <div className="absolute inset-0 animated-gradient-datacenter-bg" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>
        <SlideTitle>Enterprise Infrastructure</SlideTitle>
        <BulletList items={[
          { bold: "Multi-chain architecture —", text: "Hub-and-spoke across Solana, Ethereum, BSC with Wormhole NTT" },
          { bold: "Edge computing —", text: "geo-redundant infrastructure for low-latency AI inference" },
          { bold: "Security layers —", text: "HSMs, MPC key management, browser sandboxing" },
          { bold: "Monitoring —", text: "validator health, bridge volumes, treasury dashboards" },
        ]} />
      </div>
    ),
  },
  // 19 — Revenue Model
  {
    id: "revenue",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Revenue Model</SlideTitle>
        <SlideSubtitle>Multiple revenue surfaces across the platform ecosystem.</SlideSubtitle>
        <div className="grid grid-cols-2 gap-6">
          {[
            { title: "AI Gateway Fees", desc: "Token-based credits for inference with transparent 30% margin over provider costs" },
            { title: "Browser Premium", desc: "Subscription access to advanced AI workflows and enterprise features" },
            { title: "RWA Marketplace", desc: "Transaction fees on tokenized asset issuance, trading, and settlement" },
            { title: "Carbon Credits", desc: "Blockchain-verified carbon offset trading and retirement infrastructure" },
            { title: "In-Browser Swaps", desc: "Aggregated DEX fees on native crypto exchange within the browser" },
            { title: "Validator Yield", desc: "Staking rewards from multi-chain validator operations" },
          ].map(r => (
            <GreenCard key={r.title} className="p-4 space-y-2">
              <h3 className="text-sm font-medium text-foreground">{r.title}</h3>
              <p className="text-[11px] font-light text-muted-foreground leading-relaxed">{r.desc}</p>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },
  // 20 — Corporate Structure
  {
    id: "structure",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Corporate Structure</SlideTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <SectionLabel>Tomorrow Digital Inc.</SectionLabel>
            <BulletList items={[
              { bold: "Headquarters —", text: "Richmond, BC, Canada" },
              { bold: "DBA —", text: "The Tomorrow Company" },
              { bold: "Subsidiaries —", text: "Plato AI, Carbon Distributed Technologies AG" },
              { bold: "Listing target —", text: "TSX Venture Exchange, Q2 2026" },
            ]} />
          </div>
          <div className="space-y-4">
            <SectionLabel>Governance</SectionLabel>
            <BulletList items={[
              { bold: "Board oversight —", text: "experienced directors from fintech and public markets" },
              { bold: "Multi-sig treasury —", text: "transparent allocation and milestone-based releases" },
              { bold: "Progressive decentralization —", text: "from foundation-led to community-governed" },
              { bold: "Auditing —", text: "Hacken smart contracts + CPA financial audits" },
            ]} />
          </div>
        </div>
      </div>
    ),
  },
  // 21 — Closing
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
          <div
            className="h-14 w-14 animated-gradient-icon-bright"
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
export default function CorporateDeck() {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const total = slides.length;

  const next = useCallback(() => setCurrent(c => Math.min(c + 1, total - 1)), [total]);
  const prev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
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
