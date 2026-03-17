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
        TMRW <span className="text-muted-foreground/30">|</span> RTO Deck
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

// --- Slides ---
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
          <SectionLabel>Reverse Takeover</SectionLabel>
          <h1 className="text-4xl md:text-6xl font-extralight tracking-tight text-foreground">
            Tomorrow Digital RTO
          </h1>
          <p className="text-base md:text-lg font-light text-muted-foreground max-w-2xl">
            Consolidating Carbon Distributed Technologies and Plato AI into a diversified Web3 / AI Infrastructure and Digital Asset Company.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[hsl(82,85%,55%,0.6)] to-transparent" />
          <p className="text-sm font-light text-[hsl(82,85%,55%,0.5)] uppercase tracking-[0.3em]">TSX Venture Exchange</p>
        </div>
        <SlideNumber n={1} />
      </div>
    ),
  },
  // 2 — Market Opportunity
  {
    id: "market-opportunity",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Market Snapshot</SectionLabel>
        <SlideTitle>The Opportunity.</SlideTitle>
        <div className="grid grid-cols-3 gap-8">
          <StatBlock value="$200B+" label="Web3/AI Market by 2030" />
          <StatBlock value="13M+" label="Organic Platform Visitors" />
          <StatBlock value="Q2 2026" label="Targeted TSX Listing" />
        </div>
        <SlideSubtitle>
          The Tomorrow Company positions itself at the forefront of Web3 AI infrastructure — transforming pioneering platforms into a unified backbone for blockchain-enabled carbon credits and decentralized intelligence solutions.
        </SlideSubtitle>
        <SlideNumber n={2} />
      </div>
    ),
  },
  // 3 — Challenge & Opportunity
  {
    id: "challenge-opportunity",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Industry Landscape</SectionLabel>
        <SlideTitle>The Challenge & Opportunity.</SlideTitle>
        <div className="grid md:grid-cols-2 gap-5">
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>The Challenge</SectionLabel>
            <BulletList items={[
              { bold: "Fragmented infrastructure", text: "across Web3 platforms." },
              { bold: "Lack of transparency", text: "in carbon credit verification." },
              { bold: "Limited enterprise adoption", text: "of blockchain solutions." },
              { bold: "Regulatory uncertainty", text: "in digital assets." },
              { bold: "Lack of institutional-grade", text: "RWA tokenization infrastructure." },
            ]} />
          </GreenCard>
          <GreenCard className="space-y-4 py-6 border-[hsl(82,85%,55%,0.3)]">
            <SectionLabel>The Opportunity</SectionLabel>
            <BulletList items={[
              { bold: "$200B+", text: "Web3/AI market projected by 2030." },
              { bold: "$50B+", text: "voluntary carbon market by 2030." },
              { bold: "$16T+", text: "RWA tokenization market projected by 2030." },
              { bold: "Blockchain-verified", text: "carbon credit infrastructure." },
              { bold: "Public market access", text: "via TSX listing." },
            ]} />
          </GreenCard>
        </div>
        <SlideNumber n={3} />
      </div>
    ),
  },
  // 4 — The Tomorrow Company
  {
    id: "tomorrow-company",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Corporate Overview</SectionLabel>
        <SlideTitle>The Tomorrow Company.</SlideTitle>
        <SlideSubtitle>Tomorrow Digital Inc. (DBA: The Tomorrow Company) — A diversified Web3 / AI Infrastructure and Digital Asset Company.</SlideSubtitle>
        <div className="grid md:grid-cols-3 gap-5">
          <GreenCard className="space-y-3 py-6">
            <h3 className="text-sm font-medium text-foreground">RWA Infrastructure</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">Blockchain-based carbon offsetting with 500,000 tonnes of ISO-certified credits, CUT utility token, and institutional-grade RWA tokenization platform.</p>
          </GreenCard>
          <GreenCard className="space-y-3 py-6">
            <h3 className="text-sm font-medium text-foreground">W3AI Platform</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">W3AI Browser with integrated DeFi access, CodeNexus AI development tools, and decentralized data intelligence across 160+ countries.</p>
          </GreenCard>
          <GreenCard className="space-y-3 py-6">
            <h3 className="text-sm font-medium text-foreground">Public Market Access</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">RTO transaction targeting TSX listing with experienced management team. Provides investors regulated exposure to Web3, AI, and digital asset growth.</p>
          </GreenCard>
        </div>
        <SlideNumber n={4} />
      </div>
    ),
  },
  // 5 — The Structure
  {
    id: "structure",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Transaction Structure</SectionLabel>
        <SlideTitle>The Structure.</SlideTitle>
        <div className="grid md:grid-cols-2 gap-5">
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Carbon Distributed Technologies</SectionLabel>
            <BulletList items={[
              { bold: "500,000 tonnes", text: "ISO-certified carbon credits." },
              { bold: "300M+ CUT tokens", text: "in treasury." },
              { bold: "FMA regulated", text: "under Blockchain Act." },
              { bold: "6M+ kg", text: "carbon offsets retired on-chain." },
            ]} />
          </GreenCard>
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Plato AI</SectionLabel>
            <BulletList items={[
              { bold: "Plato Web3 Browser", text: "and AI compute network." },
              { bold: "13M+ organic visitors", text: "across 160+ countries." },
              { bold: "CodeNexus, NexusWave Carbon,", text: "Plato Media." },
              { bold: "$1.4M revenue", text: "with 70K+ enterprises." },
            ]} />
          </GreenCard>
        </div>
        <SlideNumber n={5} />
      </div>
    ),
  },
  // 6 — Core Business Pillars
  {
    id: "pillars",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Business Pillars</SectionLabel>
        <SlideTitle>Four Integrated Pillars.</SlideTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: "Carbon Credits", desc: "Blockchain-verified carbon offsetting infrastructure." },
            { title: "Web3 Browser", desc: "Decentralized access gateway with native blockchain support." },
            { title: "AI Tools", desc: "CodeNexus, NexusWave Carbon, and AI-powered solutions." },
            { title: "Token Economy", desc: "CUT and W3AI tokens powering the ecosystem." },
          ].map(p => (
            <GreenCard key={p.title} className="space-y-3 py-6 text-center">
              <h3 className="text-sm font-medium text-foreground">{p.title}</h3>
              <p className="text-xs font-light text-muted-foreground leading-relaxed">{p.desc}</p>
            </GreenCard>
          ))}
        </div>
        <SlideNumber n={6} />
      </div>
    ),
  },
  // 7 — Carbon Credits Infrastructure
  {
    id: "carbon-infra",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Pillar 1</SectionLabel>
        <SlideTitle>Carbon Credits Infrastructure.</SlideTitle>
        <div className="grid md:grid-cols-3 gap-5">
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Asset Base</SectionLabel>
            <BulletList items={[
              { bold: "500,000 tonnes", text: "ISO-certified credits." },
              { bold: "Valued at", text: "~$5M USD." },
              { bold: "Option for", text: "2.3M additional tonnes." },
              { bold: "300M+ CUT tokens", text: "in treasury." },
            ]} />
          </GreenCard>
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Technology</SectionLabel>
            <BulletList items={[
              { bold: "Blockchain verification", text: "system." },
              { bold: "Retire App", text: "for token burning." },
              { bold: "Immutable", text: "audit trails." },
              { bold: "Smart contract", text: "automation." },
            ]} />
          </GreenCard>
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Market Position</SectionLabel>
            <BulletList items={[
              { bold: "FMA regulated", text: "(Liechtenstein)." },
              { bold: "6M+ kg", text: "carbon offsets retired." },
              { bold: "Enterprise partnerships", text: "active." },
              { bold: "$50B market", text: "by 2030." },
            ]} />
          </GreenCard>
        </div>
        <SlideNumber n={7} />
      </div>
    ),
  },
  // 8 — Web3 AI Platform
  {
    id: "web3-ai",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Pillar 2</SectionLabel>
        <SlideTitle>Web3 AI Platform.</SlideTitle>
        <div className="grid md:grid-cols-2 gap-5">
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Plato Web3 Browser</SectionLabel>
            <BulletList items={[
              { bold: "Native blockchain", text: "application support." },
              { bold: "Decentralized identity", text: "(DID) integration." },
              { bold: "Built-in token wallet", text: "functionality." },
              { bold: "AI-powered search", text: "capabilities." },
              { bold: "Smart contract", text: "compatibility." },
            ]} />
          </GreenCard>
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>AI Development Tools</SectionLabel>
            <BulletList items={[
              { bold: "CodeNexus:", text: "AI code generation for Web3." },
              { bold: "NexusWave Carbon:", text: "Climate data intelligence." },
              { bold: "Plato Media:", text: "Web3 sync licensing." },
              { bold: "Plato RWA:", text: "Real-world asset tokenization." },
              { bold: "SecureStake:", text: "Cross-chain staking protocol." },
            ]} />
          </GreenCard>
        </div>
        <SlideNumber n={8} />
      </div>
    ),
  },
  // 9 — Market Traction
  {
    id: "market-traction",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Traction</SectionLabel>
        <SlideTitle>Market Traction & Metrics.</SlideTitle>
        <div className="grid md:grid-cols-2 gap-5">
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Platform Performance</SectionLabel>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Organic Visitors</span><span className="text-foreground">13M+</span></div>
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Enterprises</span><span className="text-foreground">70,000+</span></div>
              <div className="w-full h-px bg-border/30" />
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Revenue</span><span className="text-foreground">$1.4M</span></div>
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Languages</span><span className="text-foreground">35</span></div>
            </div>
          </GreenCard>
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Asset Value</SectionLabel>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Carbon Credits</span><span className="text-foreground">$5M</span></div>
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">IP & Infrastructure</span><span className="text-foreground">$5M</span></div>
              <div className="w-full h-px bg-border/30" />
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">CUT Tokens</span><span className="text-foreground">300M+</span></div>
              <div className="flex justify-between text-sm font-medium"><span className="text-foreground">Financial Health</span><span className="text-[hsl(82,85%,55%)]">Zero Debt</span></div>
            </div>
          </GreenCard>
        </div>
        <SlideNumber n={9} />
      </div>
    ),
  },
  // 10 — Token Architecture
  {
    id: "token-architecture",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Token Design</SectionLabel>
        <SlideTitle>Token Architecture.</SlideTitle>
        <SlideSubtitle>Dual-token ecosystem: CUT (carbon credits) + Plato (Web3 AI utility).</SlideSubtitle>
        <div className="grid md:grid-cols-2 gap-5">
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>CUT Token</SectionLabel>
            <BulletList items={[
              { bold: "Represents", text: "certified carbon offsets." },
              { bold: "Blockchain-verified", text: "retirement." },
              { bold: "300M+ tokens", text: "in treasury." },
              { bold: "Last private sale:", text: "$0.10 USD." },
            ]} />
          </GreenCard>
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>W3AI Token</SectionLabel>
            <BulletList items={[
              { bold: "Powers", text: "W3AI Browser." },
              { bold: "SecureStake", text: "staking rewards." },
              { bold: "AI compute", text: "network incentives." },
              { bold: "Cross-chain", text: "integration." },
            ]} />
          </GreenCard>
        </div>
        <SlideNumber n={10} />
      </div>
    ),
  },
  // 11 — Business Model
  {
    id: "business-model",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Revenue</SectionLabel>
        <SlideTitle>Business Model & Growth Strategy.</SlideTitle>
        <div className="grid md:grid-cols-3 gap-5">
          <GreenCard className="space-y-3 py-6">
            <div className="text-2xl font-extralight text-[hsl(82,85%,55%,0.4)]">01</div>
            <h3 className="text-sm font-medium text-foreground">Carbon Solutions</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">Enterprise carbon offsetting, CUT token sales, blockchain verification.</p>
          </GreenCard>
          <GreenCard className="space-y-3 py-6">
            <div className="text-2xl font-extralight text-[hsl(82,85%,55%,0.4)]">02</div>
            <h3 className="text-sm font-medium text-foreground">Platform Services</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">Web3 browser, AI tools, developer licensing, white-label solutions.</p>
          </GreenCard>
          <GreenCard className="space-y-3 py-6">
            <div className="text-2xl font-extralight text-[hsl(82,85%,55%,0.4)]">03</div>
            <h3 className="text-sm font-medium text-foreground">Network Economy</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">Token distribution, staking rewards, transaction fees.</p>
          </GreenCard>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-2">
          <GreenCard className="text-center py-4 border-[hsl(82,85%,55%,0.3)]">
            <div className="text-lg font-extralight text-[hsl(82,85%,55%)]">$6M CAD</div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1">Pre-Money Valuation</div>
          </GreenCard>
          <GreenCard className="text-center py-4 border-[hsl(82,85%,55%,0.3)]">
            <div className="text-lg font-extralight text-[hsl(82,85%,55%)]">$0.15 CAD</div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1">Share Price</div>
          </GreenCard>
          <GreenCard className="text-center py-4 border-[hsl(82,85%,55%,0.3)]">
            <div className="text-lg font-extralight text-[hsl(82,85%,55%)]">16.66%</div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1">Available to Investors</div>
          </GreenCard>
        </div>
        <SlideNumber n={11} />
      </div>
    ),
  },
  // 12 — Why Acquisition
  {
    id: "why-acquisition",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Strategic Rationale</SectionLabel>
        <SlideTitle>Why Acquisition, Not Partnership.</SlideTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: "Deep Data Integration", desc: "AI OS requires full-funnel data access, far easier within single entity." },
            { title: "Control of Rails & Token", desc: "Stablecoin and token are core financial infrastructure requiring group-level governance." },
            { title: "Aligned Roadmap & Incentives", desc: "One cap table, unified product roadmap, consistent capital markets story." },
            { title: "IP Ownership", desc: "AI models, risk engines, smart contracts live on TMRW balance sheet." },
            { title: "Capital Markets Story", desc: "Public market investors can clearly understand and price a unified, integrated platform." },
            { title: "Regulatory Alignment", desc: "Single-entity structure simplifies compliance across jurisdictions and accelerates time to market." },
          ].map(w => (
            <GreenCard key={w.title} className="space-y-3 py-6">
              <h3 className="text-sm font-medium text-foreground">{w.title}</h3>
              <p className="text-xs font-light text-muted-foreground leading-relaxed">{w.desc}</p>
            </GreenCard>
          ))}
        </div>
        <SlideNumber n={12} />
      </div>
    ),
  },
  // 13 — Roadmap
  {
    id: "roadmap",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Execution Timeline</SectionLabel>
        <SlideTitle>Roadmap.</SlideTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { phase: "Q2 2026", title: "RTO & TSX Listing", items: ["Execute RTO on TSX Venture Exchange.", "Complete Seed Round financing.", "Announce Listing Vehicle.", "Secure Board of Directors."] },
            { phase: "Q3 2026", title: "Platform Expansion", items: ["Scale Web3 browser adoption.", "Expand carbon enterprise partnerships.", "Launch AI-powered services.", "Complete regulatory audit."] },
            { phase: "Q4 2026", title: "Global Footprint", items: ["Expand into international markets.", "Establish institutional partnerships.", "Pursue TSX graduation."] },
            { phase: "Q1 2027", title: "Global Execution", items: ["Deploy global operations.", "Onboard institutional investors.", "Enable cross-border settlements.", "Monetize ecosystem."] },
          ].map(r => (
            <GreenCard key={r.phase} className="space-y-3 py-5">
              <span className="text-xs font-medium text-[hsl(82,85%,55%)]">{r.phase}</span>
              <h3 className="text-sm font-medium text-foreground">{r.title}</h3>
              <div className="space-y-2">
                {r.items.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-1 h-1 rounded-full bg-[hsl(82,85%,55%,0.5)] mt-2 shrink-0" />
                    <p className="text-xs font-light text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </GreenCard>
          ))}
        </div>
        <SlideNumber n={13} />
      </div>
    ),
  },
  // 14 — Investment Highlights
  {
    id: "investment-highlights",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Investment Case</SectionLabel>
        <SlideTitle>Investment Highlights.</SlideTitle>
        <div className="grid md:grid-cols-2 gap-5">
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Carbon Distributed Technologies</SectionLabel>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">ISO Carbon Credits</span><span className="text-foreground">$5M</span></div>
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">CUT Token Treasury</span><span className="text-foreground">300M+</span></div>
              <div className="w-full h-px bg-border/30" />
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Blockchain Infrastructure</span><span className="text-foreground">FMA Regulated</span></div>
            </div>
          </GreenCard>
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Plato AI</SectionLabel>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Technology IP</span><span className="text-foreground">$5M</span></div>
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">User Base</span><span className="text-foreground">13M+</span></div>
              <div className="w-full h-px bg-border/30" />
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Revenue Run Rate</span><span className="text-foreground">$1.4M</span></div>
            </div>
          </GreenCard>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-2">
          {[
            { title: "Public Market Access", desc: "TSX listing provides liquidity and institutional credibility." },
            { title: "Growth Markets", desc: "$200B+ Web3/AI and $50B+ carbon markets by 2030." },
            { title: "Proven Technology", desc: "Live platforms with real users and revenue generation." },
          ].map(h => (
            <GreenCard key={h.title} className="space-y-2 py-5 text-center">
              <h3 className="text-sm font-medium text-foreground">{h.title}</h3>
              <p className="text-xs font-light text-muted-foreground">{h.desc}</p>
            </GreenCard>
          ))}
        </div>
        <SlideNumber n={14} />
      </div>
    ),
  },
  // 15 — Leadership Team
  {
    id: "leadership",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Team</SectionLabel>
        <SlideTitle>Leadership Team.</SlideTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Justin Hartzman", role: "Chairman", bio: "Co-founded CoinSmart, led to public listing and sale to WonderFi. Board director at WonderFi. Over a decade scaling fintech companies." },
            { name: "Paul Thomson", role: "CEO", bio: "Founder of Carbon Distributed Technologies. Independent Director at eXeBlock Technology. Deep expertise in corporate governance." },
            { name: "Bryan Feinberg", role: "COO / CTO", bio: "CEO of Zephyr Technology Ventures and Plato AI. Licensed Investment Banker. Led startup from zero to $130M revenue." },
            { name: "Zach Goldenberg", role: "Advisor", bio: "Principal of Liberty Venture Partners. Corporate-securities lawyer. ICD.D designation, TSXV Advisory Committee member." },
          ].map(t => (
            <GreenCard key={t.name} className="space-y-3 py-5">
              <h3 className="text-sm font-medium text-foreground">{t.name}</h3>
              <span className="text-xs text-[hsl(82,85%,55%,0.7)]">{t.role}</span>
              <p className="text-xs font-light text-muted-foreground leading-relaxed">{t.bio}</p>
            </GreenCard>
          ))}
        </div>
        <SlideNumber n={15} />
      </div>
    ),
  },
  // 16 — CTA / Closing
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
          <SectionLabel>Join Us</SectionLabel>
          <h1 className="text-4xl md:text-6xl font-extralight tracking-tight text-foreground">
            Join the Web3 AI Revolution
          </h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl">
            {[
              { n: "1", title: "Pre-Money: $6M CAD", desc: "Up to 16.66% available" },
              { n: "2", title: "Share: $0.15 CAD", desc: "40M shares, 9-month lockup" },
              { n: "3", title: "TSX Listing Q2 2026", desc: "Symbol: TMRW" },
              { n: "4", title: "Plato Allocation", desc: "Strategic token allocation" },
            ].map(c => (
              <GreenCard key={c.n} className="py-4 text-center border-[hsl(82,85%,55%,0.3)]">
                <h4 className="text-xs font-medium text-foreground">{c.title}</h4>
                <p className="text-[10px] text-muted-foreground mt-1">{c.desc}</p>
              </GreenCard>
            ))}
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[hsl(82,85%,55%,0.6)] to-transparent" />
          <p className="text-sm font-light text-[hsl(82,85%,55%,0.5)] uppercase tracking-[0.3em]">TMRW-DIGITAL.COM</p>
        </div>
        <SlideNumber n={16} />
      </div>
    ),
  },
];

// --- Deck viewer ---
export default function RTODeck() {
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
      <SEOHead title="TMRW RTO Deck" description="Tomorrow Digital reverse takeover presentation deck — TSX Venture Exchange listing." path="/rto-deck" noindex />
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
