import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import whitepaperHero from "@/assets/whitepaper-hero.png";
import heroBackground from "@/assets/hero-bg.png";
import logoIcon from "@/assets/plato-icon.png";

// --- Slide data derived from whitepaper ---
interface Slide {
  id: string;
  render: () => React.ReactNode;
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

function TableSlide({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {headers.map((h, i) => (
              <th key={i} className={cn("py-3 px-4 font-medium text-foreground text-xs uppercase tracking-wider", i > 0 && "text-right")}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-border/50">
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
      <div className="flex flex-col items-center justify-center h-full text-center gap-8">
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden animated-gradient-icon">
          <img src={logoIcon} alt="W3AI" className="w-full h-full object-cover" />
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl md:text-6xl font-extralight tracking-tight text-foreground">W3AI</h1>
          <p className="text-lg md:text-xl font-light text-muted-foreground tracking-wide">The Tomorrow Company</p>
        </div>
        <div className="w-16 h-px bg-border" />
        <p className="text-sm font-light text-muted-foreground/60 uppercase tracking-[0.3em]">Project Deck — 2026</p>
      </div>
    ),
  },
  // 2 — Rise of the Machines
  {
    id: "rise",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto">
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
      </div>
    ),
  },
  // 3 — Hero visual
  {
    id: "vision",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-6 max-w-3xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden animated-gradient-icon">
          <img src={whitepaperHero} alt="W3AI Vision" className="w-full h-[260px] md:h-[340px] object-cover" />
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
  // 4 — Architecture
  {
    id: "architecture",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto">
        <SlideTitle>Architecture & Differentiation</SlideTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Why Firefox</h3>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              Gecko engine, deep customization, open-source codebase. Strategic differentiation in a Chromium-dominated market.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Competitive Edge</h3>
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
  // 5 — AI Layer
  {
    id: "ai-layer",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto">
        <SlideTitle>User-Selectable AI Layer</SlideTitle>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4 p-6 rounded-xl border border-border bg-card">
            <h3 className="text-base font-medium text-foreground">BYOK</h3>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              Bring Your Own Key — connect any LLM provider. Supports power users and enterprises 
              with preferred vendors and compliance requirements.
            </p>
          </div>
          <div className="space-y-4 p-6 rounded-xl border border-border bg-card">
            <h3 className="text-base font-medium text-foreground">Open Gateway</h3>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              Token-based billing with spending caps, per-session limits, and explicit controls. 
              Transparent 30% margin over provider costs.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  // 6 — Security
  {
    id: "security",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto">
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
  // 7 — Identity
  {
    id: "identity",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto">
        <SlideTitle>Identity & Institutional Rails</SlideTitle>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Anti-Sybil via Dentity</h3>
            <BulletList items={[
              { bold: "Pre-sale controls —", text: "credentialed wallet allowlists" },
              { bold: "Governance integrity —", text: "reduced bot influence" },
              { bold: "Trust campaigns —", text: "per-vertical onboarding" },
            ]} />
          </div>
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Institutional Positioning</h3>
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
  // 8 — Community
  {
    id: "community",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto">
        <SlideTitle>Multi-Chain Community</SlideTitle>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { chain: "Solana", focus: "DeFi-first execution", detail: "Trading Space + NFT identity + 48K+ builder ecosystem" },
            { chain: "Ethereum", focus: "Composable dApps", detail: "Transaction clarity + contract literacy + ETHGlobal network" },
            { chain: "BSC", focus: "Retail-first scale", detail: "1.2M DAU + execution cockpit + safety overlay for memecoins" },
          ].map(c => (
            <div key={c.chain} className="p-6 rounded-xl border border-border bg-card space-y-3">
              <h3 className="text-base font-medium text-foreground">{c.chain}</h3>
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{c.focus}</p>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">{c.detail}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // 9 — Token Utility
  {
    id: "token-utility",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto">
        <SlideTitle>Token Utility</SlideTitle>
        <SlideSubtitle>Four demand drivers powering the W3AI token economy.</SlideSubtitle>
        <div className="grid grid-cols-2 gap-6">
          {[
            { title: "Browser Access", desc: "Premium features and AI workflows" },
            { title: "AI Gateway", desc: "Token-based credits for inference" },
            { title: "Network Incentives", desc: "Validator and operator rewards" },
            { title: "Governance", desc: "Treasury policy and fee parameters" },
          ].map(p => (
            <div key={p.title} className="p-5 rounded-xl border border-border bg-card space-y-2">
              <h3 className="text-sm font-medium text-foreground">{p.title}</h3>
              <p className="text-xs font-light text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // 10 — Tokenomics
  {
    id: "tokenomics",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto">
        <SlideTitle>Tokenomics & Supply</SlideTitle>
        <div className="text-center mb-2">
          <StatBlock value="2B" label="Total Token Supply" />
        </div>
        <TableSlide
          headers={["Allocation", "Tokens", "Share", "Locked"]}
          rows={[
            ["Private Round", "200M", "10%", "No"],
            ["Private Pre-Sale", "200M", "10%", "Yes"],
            ["Seed Round", "200M", "10%", "Yes"],
            ["IDO / TGE", "200M", "10%", "No"],
            ["Team & Advisors", "200M", "10%", "Yes"],
            ["Rewards", "50M", "2.5%", "No"],
            ["Treasury", "1.15B", "52.5%", "Yes"],
          ]}
        />
      </div>
    ),
  },
  // 11 — Sale Rounds
  {
    id: "sale-rounds",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto">
        <SlideTitle>Sale Rounds & Pricing</SlideTitle>
        <TableSlide
          headers={["Round", "Price", "Raise", "FDV"]}
          rows={[
            ["Private Pre-Sale 1", "$0.001875", "$375.5K", "$3.75M"],
            ["Private Pre-Sale 2", "$0.003750", "$750K", "$7.5M"],
            ["Seed Round", "$0.007500", "$1M", "$15M"],
            ["IDO / TGE", "$0.015000", "$1M", "$30M"],
          ]}
        />
        <p className="text-xs font-light text-muted-foreground italic">
          Amounts represent reserved allocations. Actual sold may vary.
        </p>
      </div>
    ),
  },
  // 12 — Multi-Chain & Validators
  {
    id: "validators",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto">
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
            <div key={v.chain} className="p-5 rounded-xl border border-border bg-card space-y-2">
              <h3 className="text-sm font-medium text-foreground">{v.chain}</h3>
              <p className="text-2xl font-extralight text-foreground">{v.req}</p>
              <p className="text-xs font-light text-muted-foreground">{v.detail}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // 13 — Liquidity
  {
    id: "liquidity",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto">
        <SlideTitle>Liquidity & Market Making</SlideTitle>
        <BulletList items={[
          { bold: "DEX liquidity locked", text: "for no less than 12 months" },
          { bold: "LPs receive", text: "additional token rewards + 50% of MM rewards in USDC/USDT" },
          { bold: "Uniswap AMM pools", text: "on Ethereum; PancakeSwap Smart Router on BSC" },
          { bold: "CEX readiness —", text: "audited contracts, transparent tokenomics, operational reliability" },
          { bold: "G-20 Group —", text: "professional multi-venue liquidity framework" },
        ]} />
      </div>
    ),
  },
  // 14 — Marketing
  {
    id: "marketing",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto">
        <SlideTitle>Marketing & Distribution</SlideTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Objectives</h3>
            <div className="space-y-6">
              <StatBlock value="25K" label="Pre-listing Registry Users" />
              <StatBlock value="3M+" label="Monthly Users (12-18 mo)" />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Partner Distribution</h3>
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
  // 15 — Disclaimer
  {
    id: "disclaimer",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-6 max-w-3xl mx-auto text-center">
        <SlideTitle>Disclaimer</SlideTitle>
        <div className="space-y-4 text-left">
          <p className="text-xs font-light text-muted-foreground leading-relaxed">
            This document is for informational purposes only and does not constitute financial, legal, tax, or investment advice. 
            Digital assets are inherently risky and volatile. Purchasers may lose all funds.
          </p>
          <p className="text-xs font-light text-muted-foreground leading-relaxed">
            Forward-looking statements reflect current intentions and are not guarantees. Regulatory landscapes vary by jurisdiction. 
            Exchange listings are subject to independent approval. Third-party references do not constitute endorsement.
          </p>
          <p className="text-xs font-light text-muted-foreground leading-relaxed">
            No fiduciary relationship is created. Information is provided "as is." All intellectual property belongs to respective owners.
          </p>
        </div>
        <div className="w-16 h-px bg-border mx-auto mt-4" />
        <p className="text-xs font-light text-muted-foreground/50 uppercase tracking-[0.3em]">W3AI — The Tomorrow Company</p>
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
      fullscreen ? "fixed inset-0 z-50 rounded-none border-none" : "aspect-video"
    )}>
      {/* Slide content */}
      <div className="absolute inset-0 p-8 md:p-16 flex flex-col">
        {slides[current].render()}
      </div>

      {/* Bottom controls */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-4",
        "bg-gradient-to-t from-background/80 to-transparent"
      )}>
        <button onClick={prev} disabled={current === 0}
          className="h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 transition-all">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-xs font-light text-muted-foreground tracking-wider">
          {current + 1} / {total}
        </span>
        <div className="flex items-center gap-2">
          <button onClick={() => setFullscreen(f => !f)}
            className="h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
            {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button onClick={next} disabled={current === total - 1}
            className="h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 transition-all">
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
              : "border-border opacity-60 hover:opacity-100"
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
