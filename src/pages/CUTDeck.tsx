import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Leaf, Recycle, Shield, BarChart3, Coins, Globe, FileCheck, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import heroBackground from "@/assets/hero-bg.webp";
import platoIcon from "@/assets/plato-icon.webp";

// --- Reusable slide components (CUT green accent: hsl(142,70%,45%)) ---
interface Slide { id: string; render: () => React.ReactNode; }

function SlideBranding() {
  return (
    <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 z-20">
      <div className="h-5 w-5 animated-gradient-icon-bright shrink-0" style={{
        WebkitMaskImage: `url(${platoIcon})`, WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center",
        maskImage: `url(${platoIcon})`, maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center",
      }} />
      <span className="text-[10px] font-light tracking-[0.2em] text-muted-foreground/60 uppercase">
        TMRW <span className="text-muted-foreground/30">|</span> CUT
      </span>
    </div>
  );
}

function SlideAccent() {
  return (
    <div className="absolute top-0 left-0 z-10 pointer-events-none">
      <div className="w-px h-16 bg-gradient-to-b from-[hsl(142,70%,45%,0.6)] to-transparent" />
      <div className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-[hsl(142,70%,45%,0.6)] to-transparent" />
    </div>
  );
}

function SlideNumber({ n }: { n: number }) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:bottom-6 z-20 pointer-events-none">
      <span className="text-[10px] font-light tracking-[0.2em] text-[hsl(142,70%,45%,0.5)]">{String(n).padStart(2, "0")}</span>
    </div>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-tight text-[hsl(142,70%,45%)]">{value}</div>
      <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">{label}</div>
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
          <div className="w-1.5 h-1.5 rounded-full bg-[hsl(142,70%,45%)] mt-2.5 shrink-0" />
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
    <div className={cn("p-5 rounded-xl border border-[hsl(142,70%,45%,0.15)] bg-card space-y-2 relative overflow-hidden", className)}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[hsl(142,70%,45%,0.3)] via-[hsl(142,70%,45%,0.1)] to-transparent" />
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm uppercase tracking-[0.2em] text-[hsl(142,70%,45%,0.7)]">{children}</h3>;
}

// --- Slides ---
const slides: Slide[] = [
  // 1 — Title
  {
    id: "title",
    render: () => (
      <div className="relative flex flex-col items-center justify-center min-h-[350px] sm:min-h-[450px] h-full text-center gap-6">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img src={heroBackground} alt="" className="absolute inset-0 w-full h-full object-cover object-top" />
          <div className="absolute inset-0 pointer-events-none animated-gradient-hero-overlay" />
          <div className="absolute inset-0 bg-[hsl(220,20%,4%,0.25)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent via-40% to-background" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/90 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white leading-[1.1]">
              Carbon Utility Token
              <br />
              For Climate Impact.
            </h1>
          </div>
          <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-white/50">
            Carbon Offsets · Blockchain · Sustainability
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[hsl(142,70%,45%,0.6)] to-transparent" />
          <p className="text-sm font-light text-[hsl(142,70%,45%,0.6)] uppercase tracking-[0.3em]">CUT Deck — 2026</p>
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
            <span className="font-medium text-[hsl(142,70%,45%)]">Not an Offering.</span> This document does not constitute an offer to sell, or a solicitation of an offer to buy, any digital securities, tokens, or other financial instruments. The CUT whitepaper, CUT website, and CUT tokens (rCUT & aCUT) are not available in the United States of America or any other prohibited jurisdictions.
          </p>
          <p className="text-xs font-light text-muted-foreground leading-relaxed">
            <span className="font-medium text-[hsl(142,70%,45%)]">Informational Purposes Only.</span> This presentation is provided strictly for informational and educational purposes. It does not constitute financial, legal, tax, or investment advice. Recipients should consult qualified professional advisors before making any decisions related to digital assets.
          </p>
          <p className="text-xs font-light text-muted-foreground leading-relaxed">
            <span className="font-medium text-[hsl(142,70%,45%)]">No Guarantees.</span> Digital assets are inherently risky and volatile — purchasers may lose all invested funds. Forward-looking statements reflect current intentions and are not guarantees of future performance.
          </p>
          <p className="text-xs font-light text-muted-foreground leading-relaxed">
            <span className="font-medium text-[hsl(142,70%,45%)]">No Fiduciary Relationship.</span> No fiduciary, advisory, or agency relationship is created by the distribution or receipt of this document.
          </p>
        </div>
        <div className="w-16 h-px bg-[hsl(142,70%,45%,0.3)] mx-auto mt-2" />
        <p className="text-xs font-light text-muted-foreground/50 uppercase tracking-[0.3em] text-center">CUT Carbon Distributed Technologies AG</p>
      </div>
    ),
  },
  // 3 — Abstract
  {
    id: "abstract",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Abstract</SlideTitle>
        <SlideSubtitle>
          The Carbon Utility Token (CUT) leverages the trust and immutability of Blockchain Technology to offer a public ledger for certified Carbon Offsets.
        </SlideSubtitle>
        <BulletList items={[
          { bold: "Peer-to-peer transfers —", text: "Carbon Offsets available for direct transfer and retirement" },
          { bold: "Full or partial offset —", text: "retire the Carbon Footprint of any activity across AI, Web3, ReFi, TradFi, and ESG" },
          { bold: "Immutable ledger —", text: "blockchain-powered audit trail from creation to retirement" },
        ]} />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[hsl(142,70%,45%,0.15)] to-transparent mt-2" />
      </div>
    ),
  },
  // 4 — Vision + Mission
  {
    id: "vision-mission",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Vision + Mission</SlideTitle>
        <SlideSubtitle>
          Support more clean energy and greenhouse gas reducing projects with a commitment to ongoing positive environmental impact.
        </SlideSubtitle>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 pt-4">
          <StatBlock value="565K" label="Tonnes of Carbon Offsets" />
          <StatBlock value="ERC-20" label="Token Standard" />
          <StatBlock value="2" label="Blockchain Networks" />
        </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[hsl(142,70%,45%,0.15)] to-transparent mt-2" />
      </div>
    ),
  },
  // 5 — Strategy: Real Utility
  {
    id: "real-utility",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Real Utility for Climate Change</SlideTitle>
        <SlideSubtitle>
          Verified Carbon Offsets on-chain — ISO, CDM, ETS, VCR certified and accredited by third-party organizations.
        </SlideSubtitle>
        <BulletList items={[
          { bold: "Smart Contract ledger —", text: "storing, distributing, tracking and retiring Carbon Offsets" },
          { bold: "Living + Historical Supply —", text: "full visibility into retired and active CUT tokens" },
          { bold: "Project types —", text: "greenhouse gas capture and destruction, biomass, wind, solar, and small hydro power" },
          { bold: "No REDD+ credits —", text: "only direct capture and destruction offsets with verified provenance" },
        ]} />
      </div>
    ),
  },
  // 6 — Ease of Access
  {
    id: "ease-of-access",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Ease of Access and Use</SlideTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
          <GreenCard className="p-6">
            <h3 className="text-base font-medium text-[hsl(142,70%,45%)]">Fractionalized Offsets</h3>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              CUT fractionalizes tonnes into small amounts of grams — from individual cups of coffee to large-scale industrial processes.
            </p>
          </GreenCard>
          <GreenCard className="p-6">
            <h3 className="text-base font-medium text-[hsl(142,70%,45%)]">Direct Consumer Access</h3>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              In a market traditionally operated as a brokerage model, CUT provides CO2E retirement directly to consumers in any increment.
            </p>
          </GreenCard>
        </div>
      </div>
    ),
  },
  // 7 — Transparency
  {
    id: "transparency",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Transparency + Auditability</SlideTitle>
        <SlideSubtitle>
          Full audit trail from creation to retirement on the blockchain — immutable, verifiable, and transparent.
        </SlideSubtitle>
        <BulletList items={[
          { bold: "Project type —", text: "the type of activity that created the offset" },
          { bold: "Location —", text: "geographic location of the emission reduction project" },
          { bold: "Certification —", text: "the protocol followed (ISO, CDM, VCR, ETS)" },
          { bold: "Third-party verifier —", text: "the accredited organization that certified the offset" },
        ]} />
      </div>
    ),
  },
  // 8 — The Token
  {
    id: "the-token",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>The Token (CUT)</SlideTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-4">
            <SectionLabel>rCUT — Ethereum</SectionLabel>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              Retire Carbon Utility Token on the Ethereum Blockchain. ERC-20 compatible, built on OpenZeppelin standards with custom Smart Contract architecture for carbon verification.
            </p>
          </div>
          <div className="space-y-4">
            <SectionLabel>aCUT — Arbitrum</SectionLabel>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              Arbitrum Carbon Utility Token on the Layer 2 Network. Offers improved transaction costs and speed while maintaining the same carbon offset workflow and verification.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  // 9 — Applications
  {
    id: "applications",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Applications for CUT</SlideTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {[
            { title: "Wallet Integration", desc: "Compatible with any ERC-20 wallet — MetaMask, hardware wallets, and dApp frontends" },
            { title: "Retirement Certificates", desc: "Generate certificates linking your action to the actual CO2E project with full provenance" },
            { title: "QR Code Tracking", desc: "Create QR codes linking to an explorer of retirement activity for public verification" },
          ].map(p => (
            <GreenCard key={p.title} className="p-5">
              <h3 className="text-sm font-medium text-foreground">{p.title}</h3>
              <p className="text-xs font-light text-muted-foreground">{p.desc}</p>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },
  // 10 — Minting + Retirement
  {
    id: "minting-retirement",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Minting + Retirement</SlideTitle>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 pt-2">
          <StatBlock value="1,000" label="CUT per Tonne of CO2E" />
          <StatBlock value="Bot" label="Automated Retirement Matching" />
          <StatBlock value="∞" label="On-Chain Record Keeping" />
        </div>
        <BulletList items={[
          { bold: "Lock & retire —", text: "signal intent via wallet or ABI, locked allowances cannot be transferred" },
          { bold: "Retirement bot —", text: "pairs locked CUT with unique Carbon Offset entries on-chain" },
          { bold: "Contribution log —", text: "each retirement links the account, project, and CUT amount permanently" },
        ]} />
      </div>
    ),
  },
  // 11 — Launch Supply
  {
    id: "supply",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-6 max-w-4xl mx-auto relative">
        <div className="flex items-baseline justify-between">
          <SlideTitle>Launch Supply + Release</SlideTitle>
          <div className="text-right">
            <span className="text-3xl font-extralight text-[hsl(142,70%,45%)]">565K</span>
            <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground ml-2">Total Tonnes</span>
          </div>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-[hsl(142,70%,45%,0.2)] via-[hsl(142,70%,45%,0.08)] to-transparent" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[hsl(142,70%,45%,0.15)]">
                    <th className="py-2.5 px-3 font-medium text-foreground text-left text-[10px] uppercase tracking-wider">Allocation</th>
                    <th className="py-2.5 px-3 font-medium text-foreground text-right text-[10px] uppercase tracking-wider">Tonnes</th>
                    <th className="py-2.5 px-3 font-medium text-foreground text-right text-[10px] uppercase tracking-wider">CUT Tokens</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Pre-Sale", "45,822", "45,822,000"],
                    ["Main Sale", "400,000", "400,000,000"],
                    ["Strategic Reserve", "75,000", "75,000,000"],
                    ["Founders & Team", "25,000", "25,000,000"],
                    ["Arbitrum (aCUT)", "19,299", "19,299,000"],
                  ].map(([a, t, c]) => (
                    <tr key={a} className="border-b border-border/20 hover:bg-[hsl(142,70%,45%,0.02)] transition-colors">
                      <td className="py-2.5 px-3 text-foreground font-light">{a}</td>
                      <td className="py-2.5 px-3 text-right text-muted-foreground font-light">{t}</td>
                      <td className="py-2.5 px-3 text-right text-muted-foreground font-light">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col gap-5 justify-end h-full">
            <GreenCard className="p-5 space-y-3">
              <div className="flex items-baseline justify-between">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-[hsl(142,70%,45%,0.7)]">Proceeds Allocation</h3>
              </div>
              <div className="w-full h-px bg-border/30" />
              <BulletList items={[
                { bold: "5%", text: "— Carbon Offset Purchases" },
                { bold: "15%", text: "— Technology Advancement" },
                { bold: "—", text: "Marketing CUT" },
              ]} />
            </GreenCard>
            <GreenCard className="p-5 space-y-3">
              <div className="flex items-baseline justify-between">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-[hsl(142,70%,45%,0.7)]">Supply Dynamics</h3>
              </div>
              <div className="w-full h-px bg-border/30" />
              <p className="text-[11px] font-light text-muted-foreground leading-relaxed">
                As CUT are retired, the team sources new Carbon Offsets to mint more CUT. Retirement drives real-world climate action — each retirement triggers more certified offsets to be sourced.
              </p>
            </GreenCard>
          </div>
        </div>
      </div>
    ),
  },
  // 12 — Sustainability
  {
    id: "sustainability",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Commitment to Sustainability</SlideTitle>
        <SlideSubtitle>
          CUT calculates and offsets its own blockchain activity footprint — making the project itself Carbon Neutral.
        </SlideSubtitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
          <GreenCard className="p-6">
            <h3 className="text-base font-medium text-[hsl(142,70%,45%)]">Ethereum Footprint</h3>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              Monitors hashrate and relative activity footprint of rCUT on the Public Ethereum Blockchain, offsetting with CUT tokens.
            </p>
          </GreenCard>
          <GreenCard className="p-6">
            <h3 className="text-base font-medium text-[hsl(142,70%,45%)]">Arbitrum Footprint</h3>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              Extends carbon neutrality to aCUT operations on the Arbitrum Layer 2 Network, including hosting and infrastructure.
            </p>
          </GreenCard>
        </div>
      </div>
    ),
  },
  // 13 — Carbon Terminology
  {
    id: "terminology",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <SlideTitle>Carbon Terminology</SlideTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {[
            { title: "Emission Reduction", desc: "The amount of reduction of Carbon Dioxide or equivalent (CO2E) from entering the atmosphere." },
            { title: "Verified Emission Reduction", desc: "Emission reductions verified by an independent third party utilizing internationally recognized protocols (ISO, CDM, VCR, ETS)." },
            { title: "Carbon Offset", desc: "A VER which can be utilized to 'offset' the carbon footprint of any activity." },
            { title: "CO2E", desc: "Carbon Dioxide Equivalent — a common unit for various GHGs expressed in terms of their CO2 equivalent relative to global warming potential." },
          ].map(p => (
            <GreenCard key={p.title} className="p-5">
              <h3 className="text-sm font-medium text-foreground">{p.title}</h3>
              <p className="text-xs font-light text-muted-foreground">{p.desc}</p>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },
  // 14 — Closing
  {
    id: "closing",
    render: () => (
      <div className="relative flex flex-col items-center justify-center min-h-[350px] sm:min-h-[450px] h-full text-center gap-6">
        <div className="absolute inset-0 pointer-events-none animate-fade-in">
          <img src={heroBackground} alt="" className="absolute inset-0 w-full h-full object-cover object-center opacity-80" />
          <div className="absolute inset-0 pointer-events-none animated-gradient-hero-overlay" />
          <div className="absolute inset-0 bg-[hsl(220,20%,4%,0.25)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-extralight tracking-tight text-foreground">Thank You</h1>
            <p className="text-lg md:text-xl font-light text-muted-foreground tracking-wide">CUT Carbon Distributed Technologies AG</p>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[hsl(142,70%,45%,0.6)] to-transparent" />
          <p className="text-sm font-light text-[hsl(142,70%,45%,0.5)] uppercase tracking-[0.3em]">CUT.ECO</p>
          <p className="text-xs font-light text-muted-foreground/40 max-w-md">
            Carbon Offsets · Blockchain · Sustainability
          </p>
        </div>
      </div>
    ),
  },
];

// --- Deck viewer ---
export default function CUTDeck() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [hasNavigated, setHasNavigated] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const total = slides.length;

  const next = useCallback(() => { setHasNavigated(true); setDirection('right'); setCurrent(c => Math.min(c + 1, total - 1)); }, [total]);
  const prev = useCallback(() => { setHasNavigated(true); setDirection('left'); setCurrent(c => Math.max(c - 1, 0)); }, []);

  useEffect(() => {
    thumbRefs.current[current]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [current]);

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
      "relative w-full bg-background border-x border-t border-border rounded-t-2xl overflow-hidden transition-all duration-300",
      fullscreen ? "fixed inset-0 z-[80] rounded-none border-none flex flex-col" : "min-h-[400px] sm:min-h-[500px] flex flex-col"
    )}>
      <SlideBranding />
      <div key={current} className={cn(
        "p-6 sm:p-8 md:p-16 flex flex-col",
        fullscreen ? "flex-1" : "flex-1",
        hasNavigated ? (direction === 'right' ? "animate-slide-in-right" : "animate-slide-in-left") : ""
      )}>
        {slides[current].render()}
      </div>

      <div className="flex items-center justify-between px-6 py-4">
        <button onClick={prev} disabled={current === 0}
          className="h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-[hsl(142,70%,45%)] hover:border-[hsl(142,70%,45%,0.3)] disabled:opacity-30 transition-all">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-xs font-light text-muted-foreground tracking-wider ml-8">
          {current + 1} / {total}
        </span>
        <div className="flex items-center gap-2">
          <button onClick={() => setFullscreen(f => !f)}
            className="h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-[hsl(142,70%,45%)] hover:border-[hsl(142,70%,45%,0.3)] transition-all">
            {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button onClick={next} disabled={current === total - 1}
            className="h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-[hsl(142,70%,45%)] hover:border-[hsl(142,70%,45%,0.3)] disabled:opacity-30 transition-all">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const thumbnails = (
    <div className="flex gap-3 overflow-x-auto pt-6 pb-4 px-1 scrollbar-thin">
      {slides.map((s, i) => (
        <button
          key={s.id}
          ref={el => { thumbRefs.current[i] = el; }}
          onClick={() => { setHasNavigated(true); setDirection(i > current ? 'right' : 'left'); setCurrent(i); }}
          className={cn(
            "shrink-0 w-40 h-[90px] rounded-lg border overflow-hidden relative transition-all bg-background",
            i === current
              ? "border-[hsl(142,70%,45%)] shadow-[0_0_12px_hsl(142,70%,45%,0.3)] ring-1 ring-[hsl(142,70%,45%)]"
              : "border-border opacity-60 hover:opacity-100 hover:border-[hsl(142,70%,45%,0.3)]"
          )}
        >
          <div className="absolute inset-0 origin-top-left pointer-events-none" style={{ width: 1280, height: 720, transform: `scale(${160 / 1280})` }}>
            <div className="w-full h-full bg-background p-6 sm:p-8 md:p-16 flex flex-col">
              {s.render()}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-1.5 pb-1 pt-3">
            <span className={cn(
              "text-[7px] font-medium uppercase tracking-wider leading-tight block truncate",
              i === current ? "text-[hsl(142,70%,45%)]" : "text-white/60"
            )}>
              {s.id.replace(/-/g, ' ')}
            </span>
          </div>
        </button>
      ))}
    </div>
  );

  if (fullscreen) return slideContent;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title="CUT Deck" description="Carbon Utility Token (CUT) investor deck — blockchain-powered Carbon Offsets, sustainability, and climate impact." path="/cut-deck" />
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
