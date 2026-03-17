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
        TMRW <span className="text-muted-foreground/30">|</span> Path to $1B
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

function TableRow({ cells, highlight }: { cells: string[]; highlight?: boolean }) {
  return (
    <tr className={cn("border-b border-border/20", highlight && "bg-[hsl(82,85%,55%,0.04)]")}>
      {cells.map((c, i) => (
        <td key={i} className={cn(
          "py-2.5 px-3 text-xs font-light",
          i === 0 ? "text-foreground" : "text-muted-foreground text-right"
        )}>{c}</td>
      ))}
    </tr>
  );
}

const slides: Slide[] = [
  // 01 — Title
  {
    id: "title",
    render: () => (
      <div className="relative flex flex-col items-center justify-center h-full text-center gap-6">
        <SlideAccent />
        <div className="absolute inset-0 pointer-events-none">
          <img src={heroBackground} alt="" className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
          <div className="absolute inset-0 pointer-events-none animated-gradient-hero-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-5">
          <p className="text-xs uppercase tracking-[0.3em] text-[hsl(82,85%,55%,0.7)]">Tomorrow Digital</p>
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tight text-foreground leading-tight">
            Path to <span className="text-[hsl(82,85%,55%)]">$1B+</span>
          </h1>
          <p className="text-lg md:text-xl font-light text-muted-foreground max-w-xl">
            How TMRW captures the tokenized RWA opportunity.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[hsl(82,85%,55%,0.6)] to-transparent" />
          <p className="text-[10px] font-light text-muted-foreground/40 uppercase tracking-[0.2em]">Confidential · Q1 2026</p>
        </div>
        <SlideNumber n={1} />
      </div>
    ),
  },
  // 02 — The Tokenization Megatrend
  {
    id: "megatrend",
    render: () => (
      <div className="flex flex-col h-full gap-8 justify-center">
        <SlideAccent />
        <SectionLabel>The Opportunity</SectionLabel>
        <SlideTitle>The Tokenization Market Is Expected to Explode.</SlideTitle>
        <div className="grid grid-cols-3 gap-6">
          <GreenCard>
            <StatBlock value="$16T" label="BCG Projection by 2030" />
          </GreenCard>
          <GreenCard>
            <StatBlock value="$4-5T" label="Citigroup Tokenized Securities" />
          </GreenCard>
          <GreenCard>
            <StatBlock value="BUIDL" label="BlackRock Tokenized Fund" />
          </GreenCard>
        </div>
        <SlideSubtitle>Even capturing a tiny share of that market could create large valuations.</SlideSubtitle>
        <SlideNumber n={2} />
      </div>
    ),
  },
  // 03 — Three Revenue Layers
  {
    id: "revenue-layers",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Revenue Model</SectionLabel>
        <SlideTitle>How Tokenization Companies Make Money.</SlideTitle>
        <div className="grid md:grid-cols-3 gap-5">
          <GreenCard className="space-y-3">
            <div className="text-2xl font-extralight text-[hsl(82,85%,55%)]">01</div>
            <h3 className="text-sm font-medium text-foreground">Asset Issuance Fees</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">$20k–$100k setup fee + 0.5%–2% tokenization fee per asset minted.</p>
          </GreenCard>
          <GreenCard className="space-y-3">
            <div className="text-2xl font-extralight text-[hsl(82,85%,55%)]">02</div>
            <h3 className="text-sm font-medium text-foreground">Annual Servicing Fees</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">0.1%–0.5% annually on all assets under management on the platform.</p>
          </GreenCard>
          <GreenCard className="space-y-3">
            <div className="text-2xl font-extralight text-[hsl(82,85%,55%)]">03</div>
            <h3 className="text-sm font-medium text-foreground">Transaction & Trading Fees</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">0.1%–1% per trade on secondary markets. Scales with liquidity.</p>
          </GreenCard>
        </div>
        <SlideNumber n={3} />
      </div>
    ),
  },
  // 05 — Year 1-2 Growth
  {
    id: "year-1-2",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Growth Scenario</SectionLabel>
        <SlideTitle>Year 1–2: Foundation.</SlideTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">Assets Tokenized</h3>
            <BulletList items={[
              { bold: "$300M", text: "gold reserves." },
              { bold: "$200M", text: "real estate portfolios." },
              { bold: "$100M", text: "private equity positions." },
            ]} />
            <div className="pt-2">
              <StatBlock value="$600M" label="Total Tokenized" />
            </div>
          </div>
          <div className="space-y-5">
            <GreenCard className="space-y-3">
              <SectionLabel>Revenue Estimate</SectionLabel>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Issuance</span><span className="text-foreground">~$6M</span></div>
                <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Servicing</span><span className="text-foreground">~$1.5M</span></div>
                <div className="w-full h-px bg-border/30" />
                <div className="flex justify-between text-sm font-medium"><span className="text-foreground">Total</span><span className="text-[hsl(82,85%,55%)]">≈ $7–8M</span></div>
              </div>
            </GreenCard>
            <GreenCard>
              <SectionLabel>Implied Valuation</SectionLabel>
              <div className="text-3xl font-extralight text-[hsl(82,85%,55%)] mt-2">$70M – $150M</div>
              <p className="text-[10px] text-muted-foreground">At 10–20× revenue multiple.</p>
            </GreenCard>
          </div>
        </div>
        <SlideNumber n={4} />
      </div>
    ),
  },
  // 06 — Year 3-4 Growth
  {
    id: "year-3-4",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Growth Scenario</SectionLabel>
        <SlideTitle>Year 3–4: Scale.</SlideTitle>
        <div className="grid grid-cols-3 gap-5">
          <GreenCard className="text-center py-6 space-y-2">
            <SectionLabel>Assets Tokenized</SectionLabel>
            <div className="text-3xl font-extralight text-[hsl(82,85%,55%)]">$3B</div>
          </GreenCard>
          <GreenCard className="space-y-3 py-6">
            <SectionLabel>Revenue Estimate</SectionLabel>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Issuance</span><span className="text-foreground">~$30M</span></div>
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Servicing</span><span className="text-foreground">~$7M</span></div>
              <div className="w-full h-px bg-border/30" />
              <div className="flex justify-between text-sm font-medium"><span className="text-foreground">Total</span><span className="text-[hsl(82,85%,55%)]">≈ $35–40M</span></div>
            </div>
          </GreenCard>
          <GreenCard className="text-center py-6 space-y-2">
            <SectionLabel>Implied Valuation</SectionLabel>
            <div className="text-3xl font-extralight text-[hsl(82,85%,55%)]">$400M – $800M</div>
          </GreenCard>
        </div>
        <SlideNumber n={5} />
      </div>
    ),
  },
  // 07 — Year 5+ Breakout
  {
    id: "year-5",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Growth Scenario</SectionLabel>
        <SlideTitle>Year 5+: Breakout.</SlideTitle>
        <div className="grid grid-cols-3 gap-5">
          <GreenCard className="text-center py-6 space-y-2">
            <SectionLabel>Assets Tokenized</SectionLabel>
            <div className="text-3xl font-extralight text-[hsl(82,85%,55%)]">$10B+</div>
          </GreenCard>
          <GreenCard className="text-center py-6 space-y-2">
            <SectionLabel>Revenue Estimate</SectionLabel>
            <div className="text-xs font-light text-muted-foreground space-y-1 mt-1">
              <div className="flex justify-between"><span>Issuance</span><span className="text-foreground">~$100M</span></div>
              <div className="flex justify-between"><span>Servicing</span><span className="text-foreground">~$25M</span></div>
              <div className="w-full h-px bg-border/30" />
              <div className="flex justify-between font-medium"><span className="text-foreground">Total</span><span className="text-[hsl(82,85%,55%)]">≈ $120M+</span></div>
            </div>
          </GreenCard>
          <GreenCard className="text-center py-6 space-y-2">
            <SectionLabel>Implied Valuation</SectionLabel>
            <div className="text-3xl font-extralight text-[hsl(82,85%,55%)]">$1B – $3B</div>
          </GreenCard>
        </div>
        <SlideNumber n={6} />
      </div>
    ),
  },
  // 08 — Exchange Liquidity Strategy
  {
    id: "exchange-liquidity",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Distribution</SectionLabel>
        <SlideTitle>Exchange Partnerships as Growth Multipliers.</SlideTitle>
        <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed">TMRW-issued assets trading on major exchanges creates a compounding flywheel.</p>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { name: "Kraken", desc: "Institutional-grade trading infrastructure with deep liquidity pools." },
            { name: "Coinbase", desc: "Regulatory-first platform with 100M+ verified users globally." },
            { name: "Robinhood", desc: "Retail access layer reaching next-generation investors." },
          ].map(e => (
            <GreenCard key={e.name} className="space-y-3">
              <h3 className="text-lg font-light text-foreground">{e.name}</h3>
              <p className="text-xs font-light text-muted-foreground leading-relaxed">{e.desc}</p>
            </GreenCard>
          ))}
        </div>
        <BulletList items={[
          { bold: "Liquidity increases", text: "— more trading volume, tighter spreads." },
          { bold: "Asset demand increases", text: "— more investor access, broader distribution." },
          { bold: "Issuance volume increases", text: "— more issuers attracted by proven liquidity." },
        ]} />
        <SlideNumber n={7} />
      </div>
    ),
  },
  // 09 — Competitive Landscape
  {
    id: "competitive",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Market Comparables</SectionLabel>
        <SlideTitle>Companies Already Proving the Model.</SlideTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[hsl(82,85%,55%,0.15)]">
                <th className="py-2.5 px-3 text-left text-[10px] uppercase tracking-wider font-medium text-foreground">Company</th>
                <th className="py-2.5 px-3 text-left text-[10px] uppercase tracking-wider font-medium text-foreground">Focus</th>
                <th className="py-2.5 px-3 text-right text-[10px] uppercase tracking-wider font-medium text-foreground">Implied Valuation</th>
              </tr>
            </thead>
            <tbody>
              <TableRow cells={["Ondo Finance", "Tokenized Treasuries", "$2B+"]} />
              <TableRow cells={["Securitize", "Digital Securities", "$1B+"]} highlight />
              <TableRow cells={["Polymesh", "Regulated Tokenization", "$50M+"]} />
              <TableRow cells={["Centrifuge", "RWA Lending", "$100M+"]} highlight />
            </tbody>
          </table>
        </div>
        <GreenCard>
          <p className="text-sm font-light text-muted-foreground leading-relaxed">
            The issuance platform is the most valuable layer — whoever controls issuance earns fees on every asset and owns issuer relationships.
          </p>
        </GreenCard>
        <SlideNumber n={8} />
      </div>
    ),
  },
  // 10 — The Critical Insight
  {
    id: "critical-insight",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full text-center gap-8">
        <SlideAccent />
        <SectionLabel>The Critical Insight</SectionLabel>
        <SlideTitle>Don't Be the Issuer. Be the Infrastructure.</SlideTitle>
        <p className="text-lg font-light text-muted-foreground max-w-2xl leading-relaxed">
          The fastest path to $1B+ is not tokenizing assets directly — it's becoming the platform <span className="text-foreground">powering every tokenization platform</span>.
        </p>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[hsl(82,85%,55%,0.6)] to-transparent" />
        <p className="text-2xl font-extralight text-[hsl(82,85%,55%)]">"Stripe for RWAs."</p>
        <SlideNumber n={9} />
      </div>
    ),
  },
  // 11 — Infrastructure Wins
  {
    id: "infra-wins",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Why Infrastructure Wins</SectionLabel>
        <SlideTitle>The Precedent Is Clear.</SlideTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[hsl(82,85%,55%,0.15)]">
                <th className="py-2.5 px-3 text-left text-[10px] uppercase tracking-wider font-medium text-foreground">Industry</th>
                <th className="py-2.5 px-3 text-left text-[10px] uppercase tracking-wider font-medium text-foreground">Marketplace</th>
                <th className="py-2.5 px-3 text-left text-[10px] uppercase tracking-wider font-medium text-foreground">Infrastructure Winner</th>
              </tr>
            </thead>
            <tbody>
              <TableRow cells={["Ecommerce", "Shopify Merchants", "Stripe"]} />
              <TableRow cells={["Ride Sharing", "Uber", "Stripe / Plaid"]} highlight />
              <TableRow cells={["Crypto Trading", "Exchanges", "Fireblocks"]} />
              <TableRow cells={["Cloud", "SaaS Apps", "AWS"]} highlight />
              <TableRow cells={["RWA Tokenization", "Issuers", "TMRW"]} />
            </tbody>
          </table>
        </div>
        <BulletList items={[
          { bold: "Every platform uses it", text: "— revenue scales automatically with ecosystem growth." },
          { bold: "Customer acquisition is indirect", text: "— platforms bring their own users and assets." },
        ]} />
        <SlideNumber n={10} />
      </div>
    ),
  },
  // 12 — The TMRW Infrastructure Model
  {
    id: "infra-model",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Product</SectionLabel>
        <SlideTitle>TMRW RWA Issuance APIs.</SlideTitle>
        <SlideSubtitle>Platforms launch tokenized assets in minutes, not months.</SlideSubtitle>
        <GreenCard className="font-mono text-xs space-y-1 p-6">
          <div className="text-[hsl(82,85%,55%)]">POST /tokenize-asset</div>
          <div className="text-muted-foreground pl-4">asset: real_estate</div>
          <div className="text-muted-foreground pl-4">value: $25M</div>
          <div className="text-muted-foreground pl-4">jurisdiction: Singapore</div>
          <div className="text-muted-foreground pl-4">investor_access: accredited</div>
        </GreenCard>
        <div className="grid md:grid-cols-3 gap-4">
          {["Token Issuance", "Compliance & KYC", "Custody Integration", "Cap Tables", "Transfer Restrictions", "Settlement"].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[hsl(82,85%,55%)]" />
              <span className="text-xs font-light text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>
        <SlideNumber n={11} />
      </div>
    ),
  },
  // 13 — Infrastructure Revenue Model
  {
    id: "infra-revenue",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Revenue Explosion</SectionLabel>
        <SlideTitle>Infrastructure Pricing at Scale.</SlideTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[hsl(82,85%,55%,0.15)]">
                    <th className="py-2.5 px-3 text-left text-[10px] uppercase tracking-wider font-medium text-foreground">Fee Type</th>
                    <th className="py-2.5 px-3 text-right text-[10px] uppercase tracking-wider font-medium text-foreground">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <TableRow cells={["Asset Minting", "0.5%"]} />
                  <TableRow cells={["Compliance API", "$5K/month"]} highlight />
                  <TableRow cells={["Settlement Fee", "0.1%"]} />
                  <TableRow cells={["Transfer Fee", "0.05%"]} highlight />
                </tbody>
              </table>
            </div>
          </div>
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>At $10B Tokenized via Partners</SectionLabel>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Issuance (0.5%)</span><span className="text-foreground">$50M</span></div>
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Servicing (0.50%)</span><span className="text-foreground">$50M</span></div>
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Settlement + Transfers</span><span className="text-foreground">$30M+</span></div>
              <div className="w-full h-px bg-border/30" />
              <div className="flex justify-between text-sm font-medium"><span className="text-foreground">Total Revenue</span><span className="text-[hsl(82,85%,55%)] text-lg">$130M+</span></div>
            </div>
          </GreenCard>
        </div>
        <SlideNumber n={12} />
      </div>
    ),
  },
  // 15 — Speed Advantage
  {
    id: "speed-advantage",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Why Faster</SectionLabel>
        <SlideTitle>Infrastructure Scales Exponentially.</SlideTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <GreenCard className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Traditional Model</h3>
            <p className="text-xs text-muted-foreground/60 uppercase tracking-wider">6–18 months per deal</p>
            <BulletList items={[
              { bold: "Find asset.", text: "" },
              { bold: "Structure deal.", text: "" },
              { bold: "Tokenize asset.", text: "" },
              { bold: "Find investors.", text: "" },
              { bold: "Build liquidity.", text: "" },
            ]} />
          </GreenCard>
          <GreenCard className="space-y-4 border-[hsl(82,85%,55%,0.3)]">
            <h3 className="text-sm font-medium text-[hsl(82,85%,55%)]">Infrastructure Model</h3>
            <p className="text-xs text-[hsl(82,85%,55%,0.6)] uppercase tracking-wider">Exponential scaling</p>
            <BulletList items={[
              { bold: "Onboard platform.", text: "" },
              { bold: "Platform brings assets.", text: "" },
              { bold: "Platform brings investors.", text: "" },
              { bold: "Platform brings liquidity.", text: "" },
            ]} />
          </GreenCard>
        </div>
        <SlideNumber n={13} />
      </div>
    ),
  },
  // 16 — The Secret
  {
    id: "secret",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full text-center gap-8">
        <SlideAccent />
        <SectionLabel>The Key Question</SectionLabel>
        <div className="space-y-6">
          <p className="text-lg font-light text-muted-foreground line-through">
            "What assets can we tokenize?"
          </p>
          <SlideTitle>
            "Who Already Controls the Investors?"
          </SlideTitle>
        </div>
        <div className="grid grid-cols-3 gap-4 max-w-xl">
          {["Exchanges", "Broker Platforms", "Neobanks", "Fintech Apps", "Wealth Managers", "Investment Marketplaces"].map(e => (
            <div key={e} className="text-xs font-light text-muted-foreground border border-border/30 rounded-lg p-3 text-center">{e}</div>
          ))}
        </div>
        <SlideNumber n={14} />
      </div>
    ),
  },
  // 17 — Explosive Asset Classes
  {
    id: "asset-classes",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>High-Velocity Asset Classes</SectionLabel>
        <SlideTitle>Where Volume Scales Fastest.</SlideTitle>
        <div className="grid md:grid-cols-2 gap-5">
          <GreenCard className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Tokenized Treasury Products</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">Ondo Finance reached $1B+ TVL rapidly. Massive institutional demand for on-chain yield products.</p>
          </GreenCard>
          <GreenCard className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Private Credit</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">$1.7T market size with surging institutional demand for on-chain access and transparency.</p>
          </GreenCard>
          <GreenCard className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Commodities</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">Gold, silver, lithium, copper. Especially powerful with direct mining partnerships.</p>
          </GreenCard>
          <GreenCard className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Real Estate Funds</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">Tokenize funds, not single properties. Much larger volumes, broader investor appeal.</p>
          </GreenCard>
        </div>
        <SlideNumber n={15} />
      </div>
    ),
  },
  // 18 — Three Valuation Accelerators
  {
    id: "accelerators",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Valuation Drivers</SectionLabel>
        <SlideTitle>What Gets TMRW to $5B.</SlideTitle>
        <div className="grid md:grid-cols-3 gap-5">
          <GreenCard className="space-y-3">
            <div className="text-2xl font-extralight text-[hsl(82,85%,55%)]">01</div>
            <h3 className="text-sm font-medium text-foreground">Major Asset Partnerships</h3>
            <BulletList items={[
              { bold: "Mining companies.", text: "" },
              { bold: "Commodity vaults.", text: "" },
              { bold: "Infrastructure funds.", text: "" },
              { bold: "Sovereign assets.", text: "" },
            ]} />
          </GreenCard>
          <GreenCard className="space-y-3">
            <div className="text-2xl font-extralight text-[hsl(82,85%,55%)]">02</div>
            <h3 className="text-sm font-medium text-foreground">Exchange Partnerships</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">TMRW-issued assets trade on Kraken, Coinbase, and emerging regulated exchanges.</p>
          </GreenCard>
          <GreenCard className="space-y-3">
            <div className="text-2xl font-extralight text-[hsl(82,85%,55%)]">03</div>
            <h3 className="text-sm font-medium text-foreground">Institutional Custody</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">Partnerships with Fireblocks & Anchorage Digital enable institutions to hold assets safely.</p>
          </GreenCard>
        </div>
        <SlideNumber n={16} />
      </div>
    ),
  },
  // 19 — Accelerated Path: Year 1
  {
    id: "accel-year-1",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Infrastructure Path</SectionLabel>
        <SlideTitle>Year 1: Launch Infrastructure.</SlideTitle>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <BulletList items={[
            { bold: "3 fintech partners", text: "onboarded to the API platform." },
            { bold: "$1B", text: "in assets tokenized through partner platforms." },
          ]} />
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Financials</SectionLabel>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Revenue</span><span className="text-foreground">$10M–$15M</span></div>
              <div className="w-full h-px bg-border/30" />
              <div className="flex justify-between text-sm font-medium"><span className="text-foreground">Valuation</span><span className="text-[hsl(82,85%,55%)] text-lg">$150M–$250M</span></div>
            </div>
          </GreenCard>
        </div>
        <SlideNumber n={17} />
      </div>
    ),
  },
  // 20 — Accelerated Path: Year 2
  {
    id: "accel-year-2",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Infrastructure Path</SectionLabel>
        <SlideTitle>Year 2: Exchange Partnerships.</SlideTitle>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <StatBlock value="$5B" label="Assets Tokenized" />
            <BulletList items={[
              { bold: "Exchange listings", text: "for TMRW-issued assets on major platforms." },
              { bold: "Platform adoption", text: "accelerating through network effects." },
            ]} />
          </div>
          <GreenCard className="space-y-4 py-6">
            <SectionLabel>Financials</SectionLabel>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Revenue</span><span className="text-foreground">$40M–$60M</span></div>
              <div className="w-full h-px bg-border/30" />
              <div className="flex justify-between text-sm font-medium"><span className="text-foreground">Valuation</span><span className="text-[hsl(82,85%,55%)] text-lg">$500M–$800M</span></div>
            </div>
          </GreenCard>
        </div>
        <SlideNumber n={18} />
      </div>
    ),
  },
  // 21 — Accelerated Path: Year 3
  {
    id: "accel-year-3",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Infrastructure Path</SectionLabel>
        <SlideTitle>Year 3: The $1B+ Milestone.</SlideTitle>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <StatBlock value="$15B" label="Assets Tokenized" />
            <BulletList items={[
              { bold: "Platform adoption", text: "accelerates exponentially." },
              { bold: "Network effects", text: "compound across partner ecosystem." },
            ]} />
          </div>
          <GreenCard className="space-y-4 py-6 border-[hsl(82,85%,55%,0.3)]">
            <SectionLabel>Financials</SectionLabel>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-light"><span className="text-muted-foreground">Revenue</span><span className="text-foreground">$120M+</span></div>
              <div className="w-full h-px bg-border/30" />
              <div className="flex justify-between text-sm font-medium"><span className="text-foreground">Valuation</span><span className="text-[hsl(82,85%,55%)] text-2xl">$1B–$3B</span></div>
            </div>
          </GreenCard>
        </div>
        <SlideNumber n={19} />
      </div>
    ),
  },
  // 22 — Universal Token Standard
  {
    id: "token-standard",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full text-center gap-8">
        <SlideAccent />
        <SectionLabel>The Bigger Play</SectionLabel>
        <SlideTitle>Create the Universal RWA Token Standard.</SlideTitle>
        <p className="text-base font-light text-muted-foreground max-w-2xl leading-relaxed">
          If TMRW becomes the default standard for RWAs — like ERC-3643 or ERC-1400 but dominant — every issuer builds on it.
        </p>
        <GreenCard className="max-w-md text-center py-6">
          <SectionLabel>Potential Valuation</SectionLabel>
          <div className="text-5xl font-extralight text-[hsl(82,85%,55%)] mt-3">$10B+</div>
        </GreenCard>
        <SlideNumber n={20} />
      </div>
    ),
  },
  // 23 — Reality Check
  {
    id: "reality-check",
    render: () => (
      <div className="flex flex-col h-full gap-6 justify-center">
        <SlideAccent />
        <SectionLabel>Reality Check</SectionLabel>
        <SlideTitle>What Separates Winners from the Rest.</SlideTitle>
        <SlideSubtitle>Most tokenization startups fail to reach scale. The ones that succeed share three traits.</SlideSubtitle>
        <div className="grid md:grid-cols-3 gap-5">
          <GreenCard className="space-y-3">
            <div className="text-2xl font-extralight text-[hsl(82,85%,55%)]">✓</div>
            <h3 className="text-sm font-medium text-foreground">Control a Niche</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">Own a specific asset class deeply before expanding horizontally.</p>
          </GreenCard>
          <GreenCard className="space-y-3">
            <div className="text-2xl font-extralight text-[hsl(82,85%,55%)]">✓</div>
            <h3 className="text-sm font-medium text-foreground">Partner with Institutions</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">Institutional partnerships provide credibility, capital, and deal flow.</p>
          </GreenCard>
          <GreenCard className="space-y-3">
            <div className="text-2xl font-extralight text-[hsl(82,85%,55%)]">✓</div>
            <h3 className="text-sm font-medium text-foreground">Get Exchange Liquidity</h3>
            <p className="text-xs font-light text-muted-foreground leading-relaxed">Without secondary market liquidity, tokenized assets remain illiquid.</p>
          </GreenCard>
        </div>
        <SlideNumber n={21} />
      </div>
    ),
  },
  // 24 — Summary
  {
    id: "summary",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full text-center gap-8">
        <SlideAccent />
        <SectionLabel>Summary</SectionLabel>
        <SlideTitle>If TMRW Reaches $5B–$10B of Tokenized Assets,<br />a $1B+ Valuation Is Very Realistic.</SlideTitle>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[hsl(82,85%,55%,0.6)] to-transparent" />
        <div className="max-w-2xl space-y-4">
          <p className="text-base font-light text-muted-foreground leading-relaxed">
            The biggest winners in tokenization will not be asset issuers.
          </p>
          <p className="text-lg font-light text-foreground">
            They will be the <span className="text-[hsl(82,85%,55%)]">protocol layer powering issuance</span>.
          </p>
          <p className="text-sm font-light text-muted-foreground">
            The Stripe for Payments. The Plaid for Banking. The AWS for Cloud.
          </p>
        </div>
        <SlideNumber n={22} />
      </div>
    ),
  },
  // 25 — Closing
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
            RWA's · Web3AI · Infrastructure · Tokenization
          </p>
        </div>
      </div>
    ),
  },
];

// --- Deck viewer ---
export default function PathTo1B() {
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
      <SEOHead title="TMRW: Path to $1B" description="Tomorrow Digital path to $1B through tokenized real-world asset infrastructure." path="/path-to-1b" noindex />
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
