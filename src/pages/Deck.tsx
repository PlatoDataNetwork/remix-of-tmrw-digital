import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import whitepaperHero from "@/assets/whitepaper-hero.webp";
import heroBackground from "@/assets/hero-bg.webp";
import logoIcon from "@/assets/plato-icon.webp";
import platoIcon from "@/assets/plato-icon.webp";

// --- Slide data derived from whitepaper ---
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
        TMRW <span className="text-muted-foreground/30">|</span> W3AI
      </span>
    </div>
  );
}

/** Subtle decorative accent — a short neon-green vertical line in the top-left corner */
function SlideAccent() {
  return (
    <div className="absolute top-0 left-0 z-10 pointer-events-none">
      <div className="w-px h-16 bg-gradient-to-b from-[hsl(82,85%,55%,0.6)] to-transparent" />
      <div className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-[hsl(82,85%,55%,0.6)] to-transparent" />
    </div>
  );
}

/** Slide number badge — small neon green pill in the bottom-left */
function SlideNumber({ n }: { n: number }) {
  return (
    <div className="absolute bottom-4 left-6 md:bottom-6 md:left-8 z-20 pointer-events-none">
      <span className="text-[10px] font-light tracking-[0.2em] text-[hsl(82,85%,55%,0.5)]">
        {String(n).padStart(2, "0")}
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

function TableSlide({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[hsl(82,85%,55%,0.2)]">
            {headers.map((h, i) => (
              <th key={i} className={cn("py-3 px-4 font-medium text-foreground text-xs uppercase tracking-wider", i > 0 && "text-right")}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-border/50 hover:bg-[hsl(82,85%,55%,0.02)] transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className={cn("py-3 px-4 text-muted-foreground font-light", ci > 0 && "text-right")}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const slides: Slide[] = [
  // 1 — Title
  {
    id: "title",
    render: () => (
      <div className="relative flex flex-col items-center justify-center h-full text-center gap-6">
        <div className="absolute inset-0 pointer-events-none">
          <img src={heroBackground} alt="" className="absolute inset-0 w-full h-full object-contain object-center scale-110" />
          <div className="absolute inset-0 pointer-events-none animated-gradient-hero-overlay" />
          <div className="absolute inset-0 bg-[hsl(220,20%,4%,0.25)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-extralight tracking-tight text-foreground">W3AI</h1>
            <p className="text-lg md:text-xl font-light text-muted-foreground tracking-wide">The Tomorrow Company</p>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[hsl(82,85%,55%,0.6)] to-transparent" />
          <p className="text-sm font-light text-[hsl(82,85%,55%,0.6)] uppercase tracking-[0.3em]">Project Deck — 2026</p>
        </div>
      </div>
    ),
  },
  // 2 — Disclaimer
  {
    id: "disclaimer",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-5 max-w-3xl mx-auto relative">

        <SlideTitle>Important Disclaimer</SlideTitle>
        <div className="space-y-3 text-left">
          <p className="text-xs font-light text-muted-foreground leading-relaxed">
            <span className="font-medium text-[hsl(82,85%,55%)]">Not an Offering.</span> This document does not constitute an offer to sell, or a solicitation of an offer to buy, any digital securities, tokens, or other financial instruments. No sale or offering of securities or tokens is being made pursuant to this presentation. Any future offering of digital securities or tokens would be conducted solely through a formal prospectus, offering memorandum, or equivalent disclosure document prepared in compliance with applicable securities laws and regulations.
          </p>
          <p className="text-xs font-light text-muted-foreground leading-relaxed">
            <span className="font-medium text-[hsl(82,85%,55%)]">Informational Purposes Only.</span> This presentation is provided strictly for informational and educational purposes. It does not constitute financial, legal, tax, or investment advice. Recipients should consult qualified professional advisors before making any decisions related to digital assets.
          </p>
          <p className="text-xs font-light text-muted-foreground leading-relaxed">
            <span className="font-medium text-[hsl(82,85%,55%)]">No Guarantees.</span> Forward-looking statements reflect current intentions and are not guarantees of future performance or results. Digital assets are inherently risky and volatile — purchasers may lose all invested funds. Regulatory landscapes vary by jurisdiction and are subject to change.
          </p>
          <p className="text-xs font-light text-muted-foreground leading-relaxed">
            <span className="font-medium text-[hsl(82,85%,55%)]">No Fiduciary Relationship.</span> No fiduciary, advisory, or agency relationship is created by the distribution or receipt of this document. Exchange listings are subject to independent approval. Third-party references do not constitute endorsement. All intellectual property belongs to respective owners.
          </p>
        </div>
        <div className="w-16 h-px bg-[hsl(82,85%,55%,0.3)] mx-auto mt-2" />
        <p className="text-xs font-light text-muted-foreground/50 uppercase tracking-[0.3em] text-center">W3AI — The Tomorrow Company</p>
      </div>
    ),
  },
  // 3 — Rise of the Machines
  {
    id: "rise",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">

        <SlideTitle>Rise of the Machines</SlideTitle>
        <SlideSubtitle>
          Browsers are evolving from passive viewers into agentic, AI-native operating systems. 
          W3AI is building the Web3 AI gateway for this new era.
        </SlideSubtitle>
        <div className="grid grid-cols-3 gap-8 pt-4">
          <StatBlock value="741M" label="Global Crypto Owners" />
          <StatBlock value="30M" label="Active Stablecoin Addresses" />
          <StatBlock value="101M" label="Brave MAU Benchmark" />
        </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[hsl(82,85%,55%,0.15)] to-transparent mt-2" />
      </div>
    ),
  },
  // 4 — Hero visual
  {
    id: "vision",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-6 max-w-3xl mx-auto relative">
        <div className="relative rounded-2xl overflow-hidden">
          <img src={whitepaperHero} alt="W3AI Vision" className="w-full h-[260px] md:h-[340px] object-cover" />
          <div className="absolute inset-0 border-2 border-[hsl(82,85%,55%,0.15)] rounded-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(82,85%,55%,0.4)] via-[hsl(82,85%,55%,0.2)] to-transparent" />
        </div>
        <div className="space-y-3">
          <SlideTitle>W3AI TMRW Browser</SlideTitle>
          <SlideSubtitle>
            A macOS desktop Web3 AI Browser built on Firefox. The browser is no longer a window — 
            it is the execution environment for AI, identity, and money.
          </SlideSubtitle>
        </div>
      </div>
    ),
  },
  // 5 — Architecture
  {
    id: "architecture",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <p className="text-xs uppercase tracking-[0.3em] text-[hsl(82,85%,55%,0.6)]">W3AI TMRW Browser</p>
        <SlideTitle>Architecture & Differentiation</SlideTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <SectionLabel>Inspired by AI. Built by Humans.</SectionLabel>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              Gecko engine, deep customization, open-source codebase. Strategic differentiation in a Chromium-dominated market.
            </p>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              W3AI combines human-centric design with AI-native architecture — ensuring every interaction 
              is intentional, transparent, and built for trust in a Web3 environment.
            </p>
          </div>
          <div className="space-y-4">
            <SectionLabel>Competitive Edge</SectionLabel>
            <BulletList items={[
              { bold: "vs Brave —", text: "Web3-specific safety beyond privacy" },
              { bold: "vs Safari —", text: "Web3 AI safety-first, not just privacy-first" },
              { bold: "vs Comet / Atlas —", text: "Agent safety patterns are Web3-native" },
            ]} />
          </div>
        </div>
      </div>
    ),
  },
  // 6 — AI Layer
  {
    id: "ai-layer",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">

        <SlideTitle>User-Selectable AI Layer</SlideTitle>
        <div className="grid md:grid-cols-2 gap-12">
          <GreenCard className="p-6">
            <h3 className="text-base font-medium text-[hsl(82,85%,55%)]">BYOK</h3>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              Bring Your Own Key — connect any LLM provider. Supports power users and enterprises 
              with preferred vendors and compliance requirements.
            </p>
          </GreenCard>
          <GreenCard className="p-6">
            <h3 className="text-base font-medium text-[hsl(82,85%,55%)]">Open Gateway</h3>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              Token-based billing with spending caps, per-session limits, and explicit controls. 
              Transparent 30% margin over provider costs.
            </p>
          </GreenCard>
        </div>
      </div>
    ),
  },
  // 7 — Security
  {
    id: "security",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">

        <SlideTitle>Security Intelligence</SlideTitle>
        <SlideSubtitle>
          Security posture integrated into every connection, signature, and transaction. 
          An in-browser trust layer with risk flags and verified proofs.
        </SlideSubtitle>
        <BulletList items={[
          { bold: "Smart contract audits", text: "& wallet audits via Hacken integration" },
          { bold: "Transaction simulation", text: "& explainability before every commit" },
          { bold: "No autonomous signing —", text: "explicit user control at every step" },
          { bold: "Isolated profiles", text: "for high-risk browsing and airdrop hunting" },
        ]} />
      </div>
    ),
  },
  // 8 — Identity
  {
    id: "identity",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">

        <SlideTitle>Identity & Institutional Rails</SlideTitle>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <SectionLabel>Anti-Sybil via Dentity</SectionLabel>
            <BulletList items={[
              { bold: "Pre-sale controls —", text: "credentialed wallet allowlists" },
              { bold: "Governance integrity —", text: "reduced bot influence" },
              { bold: "Trust campaigns —", text: "per-vertical onboarding" },
            ]} />
          </div>
          <div className="space-y-4">
            <SectionLabel>Institutional Positioning</SectionLabel>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              The browser becomes the interface where tokenized assets — RWAs, funds, 
              ESG credentials — are discovered, verified, and managed. Aligned with 
              Northern Trust's tokenization initiatives.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  // 9 — Community
  {
    id: "community",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">

        <SlideTitle>Multi-Chain Community</SlideTitle>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { chain: "Solana", focus: "DeFi-first execution", detail: "Trading Space + NFT identity + 48K+ builder ecosystem" },
            { chain: "Ethereum", focus: "Composable dApps", detail: "Transaction clarity + contract literacy + ETHGlobal network" },
            { chain: "BSC", focus: "Retail-first scale", detail: "1.2M DAU + execution cockpit + safety overlay for memecoins" },
          ].map(c => (
            <GreenCard key={c.chain} className="p-6 space-y-3">
              <h3 className="text-base font-medium text-foreground">{c.chain}</h3>
              <p className="text-xs uppercase tracking-[0.15em] text-[hsl(82,85%,55%,0.7)]">{c.focus}</p>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">{c.detail}</p>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },
  // 13 — Multi-Chain & Validators
  {
    id: "validators",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">

        <SlideTitle>Multi-Chain & Validators</SlideTitle>
        <SlideSubtitle>
          Solana as canonical mint hub. Ethereum and BSC as spoke chains via Wormhole NTT.
        </SlideSubtitle>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { chain: "Ethereum", req: "32 ETH deposit", detail: "Execution + consensus clients" },
            { chain: "BSC", req: "2,000 BNB minimum", detail: "Self-delegation with slashing rules" },
            { chain: "Solana", req: "Network backbone", detail: "Inflation rewards + staking + fees" },
          ].map(v => (
            <GreenCard key={v.chain}>
              <h3 className="text-sm font-medium text-[hsl(82,85%,55%)]">{v.chain}</h3>
              <p className="text-2xl font-extralight text-foreground">{v.req}</p>
              <p className="text-xs font-light text-muted-foreground">{v.detail}</p>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },
  // 14 — Liquidity
  {
    id: "liquidity",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">

        <SlideTitle>Liquidity & Market Making</SlideTitle>
        <BulletList items={[
          { bold: "DEX liquidity locked", text: "for no less than 12 months" },
          { bold: "LPs receive", text: "additional token rewards + 50% of MM rewards in USDC/USDT" },
          { bold: "Uniswap AMM pools", text: "on Ethereum; PancakeSwap Smart Router on BSC" },
          { bold: "CEX readiness —", text: "audited contracts, transparent tokenomics, operational reliability" },
          { bold: "G-20 Group —", text: "professional multi-venue liquidity framework" },
        ]} />
        <div className="w-full h-px bg-gradient-to-r from-[hsl(82,85%,55%,0.2)] via-[hsl(82,85%,55%,0.1)] to-transparent mt-2" />
      </div>
    ),
  },
  // 15 — Marketing
  {
    id: "marketing",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">

        <SlideTitle>Marketing & Distribution</SlideTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <SectionLabel>Objectives</SectionLabel>
            <div className="space-y-6">
              <StatBlock value="25K" label="Pre-listing Registry Users" />
              <StatBlock value="3M+" label="Monthly Users (12-18 mo)" />
            </div>
          </div>
          <div className="space-y-4">
            <SectionLabel>Partner Distribution</SectionLabel>
            <BulletList items={[
              { bold: "Changelly —", text: "2.7M community, instant exchange" },
              { bold: "Hacken —", text: "security co-marketing" },
              { bold: "Dentity —", text: "trusted onboarding" },
              { bold: "Surge —", text: "tokenized launch gateway" },
              { bold: "G-20 Group —", text: "treasury management" },
            ]} />
          </div>
        </div>
      </div>
    ),
  },
  // 16 — W3AI Protocol
  {
    id: "protocol",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">

        <SlideTitle>W3AI Protocol</SlideTitle>
        <SlideSubtitle>
          A cross-chain coordination protocol binding AI agent permissions to on-chain wallet permissions 
          as a single security domain.
        </SlideSubtitle>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Unified Execution", desc: "Intelligence and capital move together under explicit user control across Solana, Ethereum, and BSC." },
            { title: "Revenue Surfaces", desc: "Open Gateway AI fees, in-browser swap fees, validator yield, and premium feature access." },
            { title: "Treasury-Backed", desc: "52.5% of supply governed by progressive decentralization for long-term sustainability." },
          ].map(c => (
            <GreenCard key={c.title} className="p-5">
              <h3 className="text-sm font-medium text-foreground">{c.title}</h3>
              <p className="text-xs font-light text-muted-foreground">{c.desc}</p>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },
  // 17 — Real World Assets
  {
    id: "rwas",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">

        <SlideTitle>W3AI RWA's</SlideTitle>
        <SlideSubtitle>
          Tokenizing real-world assets across 12 verticals — bridging traditional finance with on-chain 
          liquidity and fractional ownership.
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
  // 18 — Governance
  {
    id: "governance",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">

        <SlideTitle>W3AI Governance</SlideTitle>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Governance Framework", desc: "Progressive decentralization from foundation-led to community-governed. Token-weighted voting with anti-sybil protections via Dentity credentials." },
            { title: "Treasury Management", desc: "On-chain treasury with multi-sig controls, transparent allocation reporting, and milestone-based fund releases." },
            { title: "Regulatory Compliance", desc: "Dual-jurisdiction framework: Canada (IFRS/FINTRAC) and Liechtenstein (TVTG/FMA) for global institutional credibility." },
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
  // 19 — Institutional Rails
  {
    id: "institutional",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">

        <SlideTitle>Institutional-Grade Rails</SlideTitle>
        <SlideSubtitle>
          Consumer-first mission with institutional-grade infrastructure for professionals and enterprise.
        </SlideSubtitle>
        <BulletList items={[
          { bold: "Custody —", text: "MPC & HSM key management with insurance-backed partnerships and SOC 2 Type II compliance" },
          { bold: "Compliance —", text: "Automated AML/KYC, Travel Rule compliance, real-time sanctions screening" },
          { bold: "RWA Access —", text: "Integrated marketplace with verified asset originators and secondary market access" },
          { bold: "Reporting —", text: "Portfolio analytics, tax lot tracking, and customizable audit trails" },
        ]} />
        <div className="w-full h-px bg-gradient-to-r from-[hsl(82,85%,55%,0.2)] via-[hsl(82,85%,55%,0.1)] to-transparent mt-2" />
      </div>
    ),
  },
  // 20 — Supported Networks
  {
    id: "networks",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">

        <SlideTitle>Supported Networks</SlideTitle>
        <SlideSubtitle>Multi-chain presence across 12+ foundational blockchain ecosystems.</SlideSubtitle>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {[
            "Solana", "Ethereum", "BNB Smart Chain", "Polygon",
            "zkSync", "Avalanche", "Arbitrum", "Optimism",
            "Base", "Fantom", "Cronos", "Moonbeam",
          ].map(n => (
            <div key={n} className="p-3 rounded-lg border border-[hsl(82,85%,55%,0.15)] bg-card text-center relative overflow-hidden hover:border-[hsl(82,85%,55%,0.3)] transition-colors">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[hsl(82,85%,55%,0.25)] via-transparent to-transparent" />
              <p className="text-xs font-medium text-foreground">{n}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // 21 — Network Partners
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
  // 22 — Infrastructure
  {
    id: "infrastructure",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">

        <SlideTitle>Infrastructure</SlideTitle>
        <BulletList items={[
          { bold: "Network architecture —", text: "Hub-and-spoke across Solana, Ethereum, BSC with Wormhole NTT for supply management" },
          { bold: "Edge computing —", text: "Geo-redundant infrastructure for latency-sensitive AI inference routing" },
          { bold: "Security layers —", text: "HSMs, MPC key management, browser sandboxing, and isolated agent profiles" },
          { bold: "Monitoring —", text: "Validator health, bridge volumes, treasury dashboards, and public status pages" },
        ]} />
        <div className="w-full h-px bg-gradient-to-r from-[hsl(82,85%,55%,0.2)] via-[hsl(82,85%,55%,0.1)] to-transparent mt-2" />
      </div>
    ),
  },
  // 23 — Cybersecurity
  {
    id: "cybersecurity",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">

        <SlideTitle>Cybersecurity</SlideTitle>
        <SlideSubtitle>
          Security as an architectural primitive — embedded at every level from browser runtime to on-chain execution.
        </SlideSubtitle>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Network Security", desc: "Validator hardening, node isolation, DDoS mitigation, and Wormhole NTT rate limits" },
            { title: "Blockchain Security", desc: "Hacken audits, formal verification, bug bounties, and multi-sig upgrade governance" },
            { title: "DeFi Security", desc: "Oracle manipulation detection, flash loan monitoring, and MEV protection" },
            { title: "AI Security", desc: "LLM prompt injection defense, model output validation, and agent permission boundaries" },
          ].map(c => (
            <GreenCard key={c.title} className="p-5">
              <h3 className="text-sm font-medium text-[hsl(82,85%,55%)]">{c.title}</h3>
              <p className="text-xs font-light text-muted-foreground">{c.desc}</p>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },
  // 24 — Auditing & Compliance
  {
    id: "auditing",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">

        <SlideTitle>Auditing & Compliance</SlideTitle>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <SectionLabel>Smart Contract Auditing</SectionLabel>
            <BulletList items={[
              { bold: "Hacken.io —", text: "comprehensive audit coverage for logic vulnerabilities, reentrancy, and access control" },
              { bold: "Continuous monitoring —", text: "post-deployment surveillance and anomaly detection" },
              { bold: "Bug bounties —", text: "community-driven vulnerability discovery with tiered rewards" },
            ]} />
          </div>
          <div className="space-y-4">
            <SectionLabel>Financial Auditing</SectionLabel>
            <BulletList items={[
              { bold: "Canada —", text: "IFRS standards, FINTRAC compliance, and CPA-governed auditing" },
              { bold: "Liechtenstein —", text: "TVTG regulatory framework and FMA oversight" },
              { bold: "Transparency —", text: "quarterly treasury reports and on-chain audit trails" },
            ]} />
          </div>
        </div>
      </div>
    ),
  },
  // 25 — Privacy & Risks
  {
    id: "privacy-risks",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">

        <SlideTitle>Privacy & Risk Management</SlideTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <SectionLabel>Privacy Architecture</SectionLabel>
            <BulletList items={[
              { bold: "Data minimization —", text: "collect only what's necessary for product function" },
              { bold: "On-chain privacy —", text: "zero-knowledge proofs for credential verification" },
              { bold: "User sovereignty —", text: "full control over data export and deletion" },
            ]} />
          </div>
          <div className="space-y-4">
            <SectionLabel>Risk Disclosures</SectionLabel>
            <BulletList items={[
              { bold: "Market volatility —", text: "digital assets are inherently speculative" },
              { bold: "Regulatory evolution —", text: "compliance frameworks vary by jurisdiction" },
              { bold: "Technology risk —", text: "smart contract and bridge vulnerabilities" },
            ]} />
          </div>
        </div>
      </div>
    ),
  },
  // Token Utility
  {
    id: "token-utility",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Token Utility</SlideTitle>
        <SlideSubtitle>Four demand drivers powering the W3AI token economy.</SlideSubtitle>
        <div className="grid grid-cols-2 gap-6">
          {[
            { title: "Browser Access", desc: "Premium features and AI workflows" },
            { title: "AI Gateway", desc: "Token-based credits for inference" },
            { title: "Network Incentives", desc: "Validator and operator rewards" },
            { title: "Governance", desc: "Treasury policy and fee parameters" },
          ].map(p => (
            <GreenCard key={p.title}>
              <h3 className="text-sm font-medium text-foreground">{p.title}</h3>
              <p className="text-xs font-light text-muted-foreground">{p.desc}</p>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },
  // Tokenomics
  {
    id: "tokenomics",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-6 max-w-4xl mx-auto relative">
        <div className="flex items-baseline justify-between">
          <SlideTitle>Tokenomics & Supply</SlideTitle>
          <div className="text-right">
            <span className="text-3xl font-extralight text-[hsl(82,85%,55%)]">2B</span>
            <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground ml-2">Total Supply</span>
          </div>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-[hsl(82,85%,55%,0.2)] via-[hsl(82,85%,55%,0.08)] to-transparent" />
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left — Allocation Table */}
          <div>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[hsl(82,85%,55%,0.15)]">
                    <th className="py-2.5 px-3 font-medium text-foreground text-left text-[10px] uppercase tracking-wider">Allocation</th>
                    <th className="py-2.5 px-3 font-medium text-foreground text-right text-[10px] uppercase tracking-wider">Tokens</th>
                    <th className="py-2.5 px-3 font-medium text-foreground text-right text-[10px] uppercase tracking-wider">Share</th>
                    <th className="py-2.5 px-3 font-medium text-foreground text-center text-[10px] uppercase tracking-wider">FDV</th>
                    <th className="py-2.5 px-3 font-medium text-foreground text-left text-[10px] uppercase tracking-wider">Lock Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Private Round", "200M", "10%", "$3.75M", "No"],
                    ["Private Pre-Sale", "200M", "10%", "$7.5M", "Yes"],
                    ["Seed Round", "200M", "10%", "$15M", "Yes"],
                    ["IDO / TGE", "200M", "10%", "—", "No"],
                    ["Team & Advisors", "200M", "10%", "—", "Yes"],
                    ["Rewards", "50M", "2.5%", "—", "No"],
                    ["Treasury", "1.15B", "52.5%", "$7.85M", "Yes"],
                  ].map(([a, t, s, f, l]) => (
                    <tr key={a} className="border-b border-border/20 hover:bg-[hsl(82,85%,55%,0.02)] transition-colors">
                      <td className="py-2.5 px-3 text-foreground font-light">{a}</td>
                      <td className="py-2.5 px-3 text-right text-muted-foreground font-light">{t}</td>
                      <td className="py-2.5 px-3 text-right text-muted-foreground font-light">{s}</td>
                      <td className="py-2.5 px-3 text-center text-muted-foreground font-light">{f}</td>
                      <td className="py-2.5 px-3 text-left">
                        <span className={cn(
                          "inline-flex items-center justify-center w-[72px] py-0.5 rounded text-[10px] uppercase tracking-wider font-medium border",
                          l === "Yes"
                            ? "text-[hsl(30,90%,55%)] border-[hsl(30,90%,55%,0.25)] bg-[hsl(30,90%,55%,0.08)]"
                            : "text-[hsl(82,85%,55%)] border-[hsl(82,85%,55%,0.25)] bg-[hsl(82,85%,55%,0.08)]"
                        )}>{l === "Yes" ? "Locked" : "Unlocked"}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Right — Treasury & Vesting */}
          <div className="flex flex-col gap-5 justify-end h-full">
            <GreenCard className="p-5 space-y-3">
              <div className="flex items-baseline justify-between">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-[hsl(82,85%,55%,0.7)]">Treasury Reserve</h3>
                <span className="text-2xl font-extralight text-[hsl(82,85%,55%)]">52.5%</span>
              </div>
              <div className="w-full h-px bg-border/30" />
              <p className="text-[11px] font-light text-muted-foreground leading-relaxed">
                Governed by progressive decentralization with institutional-quality reporting, multi-sig custody controls, and milestone-based fund releases.
              </p>
            </GreenCard>
            <GreenCard className="p-5 space-y-3">
              <div className="flex items-baseline justify-between">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-[hsl(82,85%,55%,0.7)]">Vesting Schedule</h3>
                <span className="text-2xl font-extralight text-[hsl(82,85%,55%)]">21 mo</span>
              </div>
              <div className="w-full h-px bg-border/30" />
              <div className="space-y-2">
                <p className="text-[11px] font-light text-muted-foreground leading-relaxed">
                  Team & Advisors vest over a 21-month period across 21 isochronic events, starting 30 days after IDO.
                </p>
                <p className="text-[11px] font-light text-muted-foreground leading-relaxed">
                  Pre-Sale 2 & Seed Round release over 6 months post-IDO. IDO tokens are without vesting period.
                </p>
              </div>
            </GreenCard>
          </div>
        </div>
      </div>
    ),
  },
  // Closing
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
            RWA's · Web3AI · Cyber · Data · Compliance
          </p>
        </div>
      </div>
    ),
  },
];

// --- Deck viewer ---
export default function Deck() {
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
      {/* Slide branding */}
      <SlideBranding />
      {/* Slide content */}
       <div key={current} className="absolute inset-0 p-8 md:p-16 flex flex-col animate-fade-in">
         {slides[current].render()}
       </div>

      {/* Bottom controls */}
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

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-border">
        <div className="h-full bg-[hsl(82,85%,55%)] transition-all duration-300" style={{ width: `${((current + 1) / total) * 100}%` }} />
      </div>
    </div>
  );

  // Thumbnail strip
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
              style={{
                width: "1280px",
                height: "720px",
                transform: "scale(0.1)",
              }}
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
