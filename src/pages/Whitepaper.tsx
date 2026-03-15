/* whitepaper v3 — restructured */
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ArrowUp, ChevronRight, ChevronLeft, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import whitepaperHero from "@/assets/whitepaper-hero.webp";
import heroBg from "@/assets/hero-bg.webp";
import platoIcon from "@/assets/plato-icon.webp";
import { useChatContext } from "@/components/ChatContext";

const PASSWORD = "W3AI88";

// --- Section structure with children (accordion sub-items) ---
interface SubSection {
  id: string;
  title: string;
}

interface Section {
  id: string;
  title: string;
  number?: string;
  icon?: "home";
  children?: SubSection[];
}

const sections: Section[] = [
  { id: "w3lcome", title: "Directory", icon: "home" },
  { id: "abstract", title: "Abstract", number: "01" },
  { id: "disclaimer", title: "Disclaimer", number: "02" },
  { id: "the-problem", title: "The Problem", number: "03" },
  { id: "the-solution", title: "The Solution", number: "04", children: [
    { id: "solution-platform", title: "Platform Capabilities" },
    { id: "solution-differentiation", title: "Differentiation" },
    { id: "solution-security", title: "Security Intelligence" },
  ]},
  { id: "what-exists-today", title: "What Exists Today", number: "05", children: [
    { id: "today-browser", title: "TMRW Browser" },
    { id: "today-protocol", title: "W3AI Protocol" },
    { id: "today-go-to-market", title: "Go To Market" },
  ]},
  { id: "platform-capabilities", title: "Platform Capabilities", number: "06", children: [
    { id: "cap-llm-layer", title: "LLM Layer" },
    { id: "cap-swap-execution", title: "DeFi Swap Execution" },
    { id: "cap-developers", title: "Developers" },
  ]},
  { id: "ai-processing", title: "AI Processing & MCP", number: "6B", children: [
    { id: "ai-models-overview", title: "Model Providers" },
    { id: "ai-mcp-architecture", title: "MCP Server Architecture" },
    { id: "ai-live-analysis", title: "Live Webpage Analysis" },
    { id: "ai-orchestration", title: "Orchestration Layer" },
  ]},
  { id: "cross-chain-architecture", title: "Cross-Chain Architecture", number: "07", children: [
    { id: "xchain-hub-spoke", title: "Hub & Spoke Model" },
    { id: "xchain-wormhole", title: "Wormhole NTT Bridge" },
    { id: "xchain-supply-integrity", title: "Supply Integrity" },
    { id: "xchain-governance", title: "Cross-Chain Governance" },
  ]},
  { id: "w3ai-protocol", title: "W3AI Protocol", number: "08", children: [
    { id: "protocol-architecture", title: "Architecture" },
    { id: "protocol-economic-model", title: "Economic Model" },
  ]},
  { id: "privacy-browser", title: "W3AI Privacy Browser", number: "08B", children: [
    { id: "browser-firefox-framework", title: "Firefox & Gecko Engine" },
    { id: "browser-privacy-architecture", title: "Privacy Architecture" },
    { id: "browser-plugin-environment", title: "Plugin Environment" },
    { id: "browser-app-development", title: "App Development SDK" },
    { id: "browser-network-architecture", title: "Network Architecture" },
  ]},
  { id: "tokenized-assets", title: "Tokenized Asset Opportunity", number: "09" },
  { id: "institutional-rails", title: "Institutional-Grade Rails", number: "10", children: [
    { id: "rails-custody", title: "Custody & Safeguarding" },
    { id: "rails-compliance", title: "Compliance Infrastructure" },
    { id: "rails-tokenization", title: "Tokenization & RWA Access" },
    { id: "rails-reporting", title: "Institutional Reporting" },
  ]},
  { id: "supported-networks", title: "Supported Networks", number: "11", children: [
    { id: "network-solana", title: "Solana" },
    { id: "network-ethereum", title: "Ethereum" },
    { id: "network-bsc", title: "BNB Smart Chain" },
    { id: "network-polygon", title: "Polygon" },
    { id: "network-zksync", title: "zkSync" },
    { id: "network-avalanche", title: "Avalanche" },
    { id: "network-arbitrum", title: "Arbitrum" },
    { id: "network-optimism", title: "Optimism" },
    { id: "network-base", title: "Base" },
    { id: "network-fantom", title: "Fantom" },
    { id: "network-cronos", title: "Cronos" },
    { id: "network-moonbeam", title: "Moonbeam" },
  ]},
  { id: "foundations", title: "Foundations", number: "12", children: [
    { id: "fi-ethereum", title: "Ethereum" },
    { id: "fi-solana", title: "Solana" },
    { id: "fi-bitcoin", title: "Bitcoin" },
    { id: "fi-arbitrum", title: "Arbitrum" },
    { id: "fi-polygon", title: "Polygon" },
    { id: "fi-cosmos", title: "Cosmos" },
    { id: "fi-cardano", title: "Cardano" },
    { id: "fi-ton", title: "TON" },
    { id: "fi-tezos", title: "Tezos" },
    { id: "fi-icp", title: "Internet Computer" },
    { id: "fi-web3-foundation", title: "Web3 Foundation" },
  ]},
  { id: "community-integrations", title: "Community Integrations", number: "13", children: [
    { id: "solana-community", title: "Solana" },
    { id: "ethereum-community", title: "Ethereum" },
    { id: "bsc-community", title: "BSC" },
  ]},
  { id: "infrastructure", title: "Infrastructure", number: "14", children: [
    { id: "infra-network", title: "Network Architecture" },
    { id: "infra-security", title: "Security & Custody" },
    { id: "infra-monitoring", title: "Monitoring & Operations" },
  ]},
  { id: "security", title: "Cybersecurity", number: "15", children: [
    { id: "security-network", title: "Network Security" },
    { id: "security-blockchain", title: "Blockchain Security" },
    { id: "security-defi", title: "DeFi Security" },
    { id: "security-defai", title: "DeFAI Security" },
    { id: "security-ai", title: "AI Security" },
  ]},
  { id: "auditing", title: "Auditing", number: "16", children: [
    { id: "auditing-smart-contract", title: "Smart Contract Auditing" },
    { id: "auditing-financial", title: "Financial Auditing" },
  ]},
  { id: "market-opportunity", title: "Market Opportunity", number: "17" },
  { id: "token-utility", title: "W3AI Tokenomics", number: "18", children: [
    { id: "token-pillars", title: "Token Utility Pillars" },
    { id: "tokenomics", title: "Tokenomics Design" },
    { id: "supply-allocations", title: "Supply & Allocations" },
    { id: "sale-rounds", title: "Sale Rounds & Pricing" },
    { id: "staking-tiers", title: "Staking Tiers" },
    { id: "deflationary-mechanics", title: "Deflationary Mechanics" },
    { id: "byok-gateway", title: "BYOK vs Open Gateway" },
    { id: "swaps-fee", title: "Swaps & Convenience Fee" },
  ]},
  { id: "governance", title: "W3AI Governance", number: "19", children: [
    { id: "foundation-governance", title: "Governance Framework" },
    { id: "foundation-treasury", title: "Treasury Management" },
    { id: "foundation-compliance", title: "Regulatory Compliance" },
  ]},
  { id: "validator-yield", title: "Validator Yield & Staking", number: "20", children: [
    { id: "eth-validators", title: "Ethereum Validators" },
    { id: "bsc-validators", title: "BSC Validators" },
    { id: "sol-validators", title: "Solana Validators" },
  ]},
  { id: "liquidity", title: "Liquidity & Market Making", number: "21", children: [
    { id: "dex-strategy", title: "DEX Liquidity Strategy" },
    { id: "cex-strategy", title: "CEX Listing Readiness" },
    { id: "partner-mm", title: "Partner Market Making" },
  ]},
  { id: "marketing", title: "Marketing & Distribution", number: "22", children: [
    { id: "community-growth", title: "Community Growth" },
    { id: "kol-strategy", title: "Social & KOL Strategy" },
    { id: "six-month-rollout", title: "Six-Month Rollout" },
  ]},
  { id: "strategic-partners", title: "Network Partners", number: "23", children: [
    { id: "partner-0x", title: "0x" },
    { id: "partner-changelly", title: "Changelly" },
    { id: "partner-cls", title: "CLS" },
    { id: "partner-dentity", title: "Dentity" },
    { id: "partner-g20", title: "G-20 Group" },
    { id: "partner-hacken", title: "Hacken" },
    { id: "partner-lablab", title: "LabLab" },
    { id: "partner-northern-trust", title: "Northern Trust" },
    { id: "partner-surge", title: "Surge" },
  ]},
  { id: "use-cases", title: "Use Cases", number: "24" },
  { id: "privacy", title: "Privacy Policy", number: "25", children: [
    { id: "privacy-data-minimization", title: "Data Minimization" },
    { id: "privacy-on-chain", title: "On-Chain Privacy" },
    { id: "privacy-third-party", title: "Third-Party Data Sharing" },
    { id: "privacy-user-rights", title: "User Rights & Control" },
    { id: "identity-anti-sybil", title: "Identity & Anti-Sybil" },
  ]},
  { id: "risks", title: "Risks & Disclosures", number: "26" },
  { id: "appendix", title: "Appendix & References", number: "27" },
  { id: "deck-link", title: "Project Deck", number: "28" },
];

const topLevelIds = sections.map(s => s.id);
const chapterSections = sections.filter(s => s.number);

function getParentId(id: string): string {
  for (const s of sections) {
    if (s.id === id) return s.id;
    if (s.children?.some(c => c.id === id)) return s.id;
  }
  return sections[0].id;
}

// --- Sidebar Ask Marvin ---
function SidebarAskMarvin() {
  const { setOpen } = useChatContext();
  return (
    <div className="px-3 py-2 border-b border-border">
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-2 bg-gradient-to-r from-[hsl(82,85%,55%,0.1)] to-[hsl(82,85%,45%,0.1)] hover:from-[hsl(82,85%,55%,0.2)] hover:to-[hsl(82,85%,45%,0.2)] border border-[hsl(82,85%,55%,0.3)] rounded-md px-3 py-1.5 text-xs font-medium text-[hsl(82,85%,55%)] hover:text-[hsl(82,85%,65%)] transition-all group"
      >
        <div
          className="h-4 w-4 shrink-0 bg-[hsl(82,85%,55%)]"
          style={{
            WebkitMaskImage: `url(${platoIcon})`,
            maskImage: `url(${platoIcon})`,
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
        <span>Ask Marvin</span>
        <ChevronRight className="h-3 w-3 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
      </button>
    </div>
  );
}

// --- Sidebar Nav with Accordion ---
function SidebarNav({ activeId, onNavigate }: { activeId: string; onNavigate: (id: string) => void }) {
  const activePage = getParentId(activeId);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set([activePage]));
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpenSections(prev => {
      const next = new Set(prev);
      next.add(activePage);
      return next;
    });
  }, [activePage]);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeId]);

  const toggleAccordion = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <nav className="p-3 space-y-0.5 flex-1 overflow-y-auto">
      {sections.map(s => {
        const isActive = activePage === s.id;
        const isOpen = openSections.has(s.id);
        const hasChildren = !!(s.children && s.children.length > 0);

        return (
          <div key={s.id}>
            <button
              ref={isActive && !hasChildren ? activeRef : undefined}
              onClick={() => {
                if (s.id === "deck-link") { window.location.href = "/deck"; return; }
                onNavigate(s.id);
              }}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium border-l-2 border-[hsl(82,85%,55%)]"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              {s.icon === "home" && <img src="/favicon.png" alt="logo" className="w-4 h-4 shrink-0 object-contain" />}
              {s.number && (
                <span className={cn("text-[10px] font-bold w-5 shrink-0 transition-colors", isActive ? "text-[hsl(82,85%,65%)]" : "text-[hsl(82,85%,55%)]")}>{s.number}</span>
              )}
              {!s.icon && !s.number && <span className="w-5 shrink-0" />}
              <span className="text-left truncate flex-1">{s.title}</span>
              {hasChildren && (
                <span onClick={(e) => toggleAccordion(s.id, e)} className="p-0.5 rounded hover:bg-muted/50">
                  <ChevronDown className={cn("h-3 w-3 shrink-0 transition-transform duration-200", isOpen && "rotate-180")} />
                </span>
              )}
            </button>
            {hasChildren && isOpen && (
              <div className="ml-7 pl-3 space-y-0.5 mt-0.5 mb-1">
                {s.children!.map(child => {
                  const isChildActive = activeId === child.id;
                  return (
                    <button
                      key={child.id}
                      ref={isChildActive ? activeRef : undefined}
                      onClick={() => onNavigate(child.id)}
                      className={cn(
                        "w-full text-left px-2 py-1.5 rounded text-sm transition-colors",
                        isChildActive
                          ? "text-[hsl(82,85%,55%)] font-medium bg-sidebar-accent/50"
                          : "text-sidebar-foreground/50 hover:text-sidebar-foreground/80"
                      )}
                    >
                      {child.title}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

// --- Desktop Sidebar ---
function DesktopSidebar({ activeId, onNavigate, collapsed, onToggle }: { activeId: string; onNavigate: (id: string) => void; collapsed: boolean; onToggle: () => void }) {
  return (
    <aside className={cn(
      "flex flex-col sticky top-[80px] h-[calc(100vh-80px)] border-r border-border bg-sidebar-background overflow-y-auto shrink-0 z-10 transition-all duration-300",
      collapsed ? "w-0 overflow-hidden border-r-0" : "w-64"
    )}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <span className="text-sm font-semibold text-foreground whitespace-nowrap">W3AI Whitepaper</span>
        <div className="flex items-center gap-1">
          <button onClick={onToggle} className="p-1 text-muted-foreground hover:text-foreground transition-colors" aria-label="Collapse sidebar">
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
      <SidebarAskMarvin />
      <SidebarNav activeId={activeId} onNavigate={onNavigate} />
    </aside>
  );
}

// --- Prev / Next Navigation (between top-level sections) ---
function PrevNextNav({ activePage, onNavigate }: { activePage: string; onNavigate: (id: string) => void }) {
  const idx = topLevelIds.indexOf(activePage);
  const prev = idx > 0 ? sections[idx - 1] : null;
  const next = idx < sections.length - 1 ? sections[idx + 1] : null;

  return (
    <div className="flex items-stretch gap-4 mt-16 mb-8 border-t border-border pt-8">
      {prev ? (
        <button
          onClick={() => {
            if (prev.id === "deck-link") { window.location.href = "/deck"; return; }
            onNavigate(prev.id);
          }}
          className="flex-1 flex items-center gap-3 px-5 py-4 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary/30 hover:shadow-[0_0_15px_-3px_hsl(82,85%,55%,0.15)] transition-all duration-200 text-left group"
        >
          <ChevronLeft className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:-translate-x-0.5 transition-all shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-0.5">Previous</span>
            <span className="text-sm text-foreground truncate group-hover:text-primary transition-colors">{prev.number ? `${prev.number}. ` : ""}{prev.title}</span>
          </div>
        </button>
      ) : <div className="flex-1" />}
      {next && next.id !== "deck-link" ? (
        <button
          onClick={() => onNavigate(next.id)}
          className="flex-1 flex items-center justify-end gap-3 px-5 py-4 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary/30 hover:shadow-[0_0_15px_-3px_hsl(82,85%,55%,0.15)] transition-all duration-200 text-right group"
        >
          <div className="flex flex-col min-w-0 items-end">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-0.5">Next</span>
            <span className="text-sm text-foreground truncate group-hover:text-primary transition-colors">{next.number ? `${next.number}. ` : ""}{next.title}</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
        </button>
      ) : <div className="flex-1" />}
    </div>
  );
}

// --- Reading Progress Bar ---
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="fixed top-[64px] lg:top-[80px] left-0 right-0 z-50 h-0.5 bg-transparent">
      <div className="h-full bg-gradient-to-r from-[hsl(82,85%,55%)] to-[hsl(160,80%,45%)] transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
    </div>
  );
}

// --- Live Staking Dashboard Component ---
function StakingDashboard() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(iv);
  }, []);

  const jitter = (base: number, range: number) => +(base + (Math.sin(tick * 1.7 + base) * range)).toFixed(2);
  const jitterInt = (base: number, range: number) => Math.round(base + Math.sin(tick * 2.1 + base) * range);

  const chains = useMemo(() => [
    {
      name: "Ethereum",
      color: "hsl(220,80%,60%)",
      bgClass: "from-[hsl(220,80%,60%,0.1)] to-[hsl(220,80%,60%,0.05)]",
      borderClass: "border-[hsl(220,80%,60%,0.3)]",
      validators: 8,
      staked: `${jitter(256, 12)} ETH`,
      stakedUsd: `$${jitterInt(640000, 30000).toLocaleString()}`,
      apy: `${jitter(4.1, 0.3)}%`,
      uptime: `${jitter(99.97, 0.02)}%`,
      rewards24h: `${jitter(0.028, 0.004)} ETH`,
      rewards30d: `${jitter(0.84, 0.05)} ETH`,
      mev: `${jitter(0.012, 0.005)} ETH`,
      slashing: "0 events",
      status: "Active",
    },
    {
      name: "BNB Smart Chain",
      color: "hsl(45,95%,55%)",
      bgClass: "from-[hsl(45,95%,55%,0.1)] to-[hsl(45,95%,55%,0.05)]",
      borderClass: "border-[hsl(45,95%,55%,0.3)]",
      validators: 1,
      staked: `${jitterInt(2450, 80).toLocaleString()} BNB`,
      stakedUsd: `$${jitterInt(1470000, 50000).toLocaleString()}`,
      apy: `${jitter(3.8, 0.5)}%`,
      uptime: `${jitter(99.95, 0.03)}%`,
      rewards24h: `${jitter(0.25, 0.06)} BNB`,
      rewards30d: `${jitter(7.6, 0.8)} BNB`,
      mev: "N/A",
      slashing: "0 events",
      status: "Active Set #38",
    },
    {
      name: "Solana",
      color: "hsl(280,75%,60%)",
      bgClass: "from-[hsl(280,75%,60%,0.1)] to-[hsl(280,75%,60%,0.05)]",
      borderClass: "border-[hsl(280,75%,60%,0.3)]",
      validators: 2,
      staked: `${jitterInt(185000, 8000).toLocaleString()} SOL`,
      stakedUsd: `$${jitterInt(3145000, 140000).toLocaleString()}`,
      apy: `${jitter(7.2, 0.4)}%`,
      uptime: `${jitter(99.99, 0.005)}%`,
      rewards24h: `${jitter(36.5, 4)} SOL`,
      rewards30d: `${jitterInt(1095, 60).toLocaleString()} SOL`,
      mev: `${jitter(8.4, 2.1)} SOL (Jito)`,
      slashing: "0 events",
      status: "Active · SFDP",
    },
  ], [tick]);

  const totalUsd = useMemo(() => {
    return `$${(jitterInt(640000, 30000) + jitterInt(1470000, 50000) + jitterInt(3145000, 140000)).toLocaleString()}`;
  }, [tick]);

  const blendedApy = jitter(5.4, 0.25);

  return (
    <div className="space-y-4">
      {/* Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Staked (USD)", value: totalUsd },
          { label: "Blended APY", value: `${blendedApy}%` },
          { label: "Active Validators", value: "11" },
          { label: "Slashing Events", value: "0" },
        ].map(item => (
          <div key={item.label} className="rounded-lg border border-border bg-card p-3 text-center">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{item.label}</div>
            <div className="text-lg font-bold text-foreground">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Per-chain cards */}
      {chains.map(chain => (
        <div key={chain.name} className={`rounded-xl border ${chain.borderClass} bg-gradient-to-br ${chain.bgClass} p-4 sm:p-5`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chain.color }} />
              <h4 className="text-base font-bold text-foreground">{chain.name}</h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/40 text-muted-foreground">{chain.validators} node{chain.validators > 1 ? "s" : ""}</span>
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-full border border-[hsl(82,85%,55%,0.3)] text-[hsl(82,85%,55%)]">{chain.status}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            {[
              { l: "Staked", v: chain.staked, sub: chain.stakedUsd },
              { l: "APY", v: chain.apy },
              { l: "Uptime", v: chain.uptime },
              { l: "Rewards (24h)", v: chain.rewards24h },
              { l: "Rewards (30d)", v: chain.rewards30d },
              { l: "MEV / Tips", v: chain.mev },
              { l: "Slashing", v: chain.slashing },
            ].map(metric => (
              <div key={metric.l}>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">{metric.l}</div>
                <div className="font-semibold text-foreground">{metric.v}</div>
                {metric.sub && <div className="text-[10px] text-muted-foreground">{metric.sub}</div>}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Yield allocation bar */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="text-xs font-semibold text-foreground mb-2">Yield Allocation</div>
        <div className="flex h-4 rounded-full overflow-hidden">
          <div className="bg-[hsl(82,85%,55%)]" style={{ width: "60%" }} title="Auto-Compound 60%" />
          <div className="bg-[hsl(220,80%,60%)]" style={{ width: "25%" }} title="Treasury Reserve 25%" />
          <div className="bg-[hsl(280,75%,60%)]" style={{ width: "10%" }} title="Community Rewards 10%" />
          <div className="bg-muted" style={{ width: "5%" }} title="Operations 5%" />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[hsl(82,85%,55%)]" />Auto-Compound 60%</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[hsl(220,80%,60%)]" />Treasury 25%</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[hsl(280,75%,60%)]" />Community 10%</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-muted" />Ops 5%</span>
        </div>
      </div>
    </div>
  );
}

// --- Content (page-based: only active section is visible) ---
function WhitepaperContent({ activePage, onNavigate }: { activePage: string; onNavigate: (id: string) => void }) {
  const p = (id: string) => activePage !== id ? "wp-page-hidden" : "space-y-10";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 whitepaper-content">

      {/* === Print-only Table of Contents === */}
      <div className="hidden print:block print:break-after-page">
        <h1 className="text-3xl font-bold mb-2 text-foreground">W3AI Whitepaper</h1>
        <p className="text-muted-foreground mb-8">Table of Contents</p>
        <div className="space-y-1">
          {sections.filter(s => s.number).map(s => (
            <div key={s.id}>
              <a href={`#${s.id}`} className="flex items-baseline gap-3 py-1 text-foreground hover:underline">
                <span className="font-mono text-xs text-[hsl(82,85%,55%)] w-6">{s.number}</span>
                <span className="text-sm">{s.title}</span>
              </a>
              {s.children && (
                <div className="ml-9 space-y-0.5">
                  {s.children.map(c => (
                    <a key={c.id} href={`#${c.id}`} className="block text-xs text-muted-foreground hover:underline py-0.5">{c.title}</a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* PAGE: Directory */}
      {/* ============================================================ */}
      <div className={p("w3lcome")}>
        <section id="w3lcome">
          <div className="relative rounded-2xl overflow-hidden h-[300px] md:h-[420px] bg-[hsl(220,20%,4%)]">
            <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-contain object-center scale-110" />
            <div className="absolute inset-0 pointer-events-none animated-gradient-hero-overlay" />
            <div className="absolute inset-0 bg-[hsl(220,20%,4%,0.25)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,20%,4%,0.3)] via-transparent to-[hsl(220,20%,4%)]" />
            <div className="relative z-10 flex flex-col items-center justify-start h-full pt-24 md:pt-32 text-center px-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extralight leading-[1.1] tracking-tight text-white mb-2">
                Secure Network Protocol<br />For The Next Web.
              </h2>
              <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-white/50 mb-2">
                RWA's · Web3AI · Cyber · Data · Compliance
              </p>
              <p className="text-lg md:text-xl lg:text-2xl uppercase tracking-[0.25em] text-white/70 mt-1">
                WHITEPAPER
              </p>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-2">W3AI Whitepaper</h1>
          <p className="text-muted-foreground mb-8">Secure Network Protocol — The Web3 AI gateway for the agentic browser era.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
            {chapterSections.map(s => (
              <button
                key={s.id}
                onClick={() => {
                  if (s.id === "deck-link") { window.location.href = "/deck"; return; }
                  onNavigate(s.id);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary/30 hover:shadow-[0_0_15px_-3px_hsl(82,85%,55%,0.15)] active:scale-[0.98] transition-all duration-200 text-left group"
              >
                <span className="text-xs font-bold text-[hsl(82,85%,55%)] w-6 shrink-0 group-hover:scale-110 transition-transform duration-200">{s.number}</span>
                <span className="text-sm text-foreground flex-1 group-hover:text-primary transition-colors duration-200">{s.title}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 01: Abstract */}
      {/* ============================================================ */}
      <div className={p("abstract")}>
        <div className="relative rounded-2xl overflow-hidden animated-gradient-icon mb-8">
          <img src={whitepaperHero} alt="W3AI Rise of the Machines" className="w-full h-[300px] md:h-[420px] object-cover" />
        </div>
        <section id="abstract">
          <h2 className="text-2xl font-bold text-foreground mb-4">Abstract</h2>
          <div className="prose-section">
            <p>W3AI is building the Web3 AI gateway for the agentic browser era. The TMRW Browser is a macOS desktop application built on Firefox that unifies AI-powered browsing, cross-chain wallet management, and tokenized real-world asset access into a single, secure interface.</p>
            <p>The platform treats AI agent permissions and wallet permissions as one coherent security domain — "assist, verify, then act — only with explicit user control." This architectural decision differentiates W3AI from both traditional browsers and emerging AI browser competitors.</p>
            <p>The W3AI ecosystem spans three layers: a core browser platform with integrated wallet and AI capabilities (live today), a cross-chain protocol layer connecting Solana, Ethereum, and BNB Smart Chain, and a tokenized asset framework enabling fractional access to real-world assets across multiple sectors.</p>
            <p>This whitepaper describes the problem W3AI solves, the solution architecture, what exists today, platform capabilities, tokenomics, and the roadmap for ecosystem expansion.</p>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 02: Disclaimer */}
      {/* ============================================================ */}
      <div className={p("disclaimer")}>
        <section id="disclaimer">
          <h2 className="text-2xl font-bold text-foreground mb-4">Disclaimer</h2>
          <div className="prose-section">
            <p>This document is provided for informational purposes only and does not constitute financial, legal, tax, investment, or other professional advice. Nothing contained herein is intended as, or shall be construed as, an offer to sell, or the solicitation of an offer to buy, any token, security, or other asset in any jurisdiction where such offer or solicitation would be unlawful.</p>
            <p>No Guarantees. Digital assets, including tokens referenced in this document, are inherently risky, speculative, and volatile. Purchasers may lose all or a substantial portion of their funds. Past performance is not indicative of future results, and no representation or warranty is made regarding future value, utility, or performance of any token or network feature described herein.</p>
            <p>Forward-Looking Statements. This document contains forward-looking statements that reflect the current intentions, expectations, and projections of the W3AI team. These statements are not guarantees of future performance and are subject to known and unknown risks, uncertainties, and other factors that may cause actual results to differ materially from those expressed or implied.</p>
            <p>Regulatory Compliance. The regulatory landscape for digital assets and blockchain technology is evolving rapidly and varies by jurisdiction. It is the sole responsibility of each prospective participant to determine whether the acquisition, holding, or use of any token described herein is permissible under applicable laws and regulations in their jurisdiction.</p>
            <p>Exchange Listings. Any references to centralized exchange (CEX) or decentralized exchange (DEX) listings are subject to independent review, approval, and listing criteria established by the respective exchanges. W3AI makes no guarantee that any listing will occur or be maintained.</p>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 03: The Problem */}
      {/* ============================================================ */}
      <div className={p("the-problem")}>
        <section id="the-problem">
          <h2 className="text-2xl font-bold text-foreground mb-4">The Problem</h2>
          <div className="prose-section">
            <p>Web3 infrastructure is fragmented. Users must navigate between separate wallets, bridges, exchanges, and analytics platforms to perform even basic cross-chain operations. Each additional tool introduces friction, security risk, and cognitive overhead.</p>
            <p>Emerging AI browsers like Perplexity's Comet and OpenAI's ChatGPT Atlas confirm that the browser is becoming the primary AI surface where context is captured and actions are executed. But these products are built for Web2 — they lack native wallet integration, cross-chain awareness, and the security primitives required for financial transactions.</p>
            <p>Meanwhile, existing Web3 browsers focus on privacy (Brave) or basic dApp access without providing the intelligent, unified experience that modern users expect. The result is a gap: no single product combines AI-powered browsing, secure wallet management, and tokenized asset access in a coherent, user-friendly interface.</p>
            <p>This fragmentation creates three critical problems:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li><strong>Security risk:</strong> Users expose private keys and sign transactions across multiple uncoordinated surfaces, increasing attack vectors.</li>
              <li><strong>Poor user experience:</strong> Cross-chain operations require switching between 3–5 separate tools, leading to errors and abandonment.</li>
              <li><strong>Limited access:</strong> Tokenized real-world assets remain inaccessible to most investors due to fragmented discovery and complex onboarding.</li>
            </ul>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 04: The Solution */}
      {/* ============================================================ */}
      <div className={p("the-solution")}>
        <section id="the-solution">
          <h2 className="text-2xl font-bold text-foreground mb-4">The Solution: The TMRW Browser Platform</h2>
          <div className="prose-section">
            <p>The TMRW Browser is the core product — a macOS desktop Web3 AI browser built on Firefox with a sidekick mobile app. Firefox's open-source Gecko engine provides deep customization, strategic differentiation from Chromium-based competitors, and a proven extension model.</p>
            <p>The browser integrates several capabilities into a single interface:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Secure wallet functionality with multi-chain support.</li>
              <li>Cross-chain asset management via hub-and-spoke architecture.</li>
              <li>Token swaps and DeFi access with transparent fee structures.</li>
              <li>AI-assisted transactions with "explain before execute" safety patterns.</li>
              <li>Access to tokenized real-world assets through an integrated marketplace.</li>
            </ul>
            <p>The browser is not a collection of separate products — it is a unified execution environment where AI, identity, and money converge under explicit user control.</p>
          </div>

          {/* Platform Architecture Diagram */}
          <div className="my-8 flex justify-center">
            <div className="w-full max-w-2xl">
              <svg viewBox="0 0 600 340" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Layer 3 - Outer */}
                <rect x="30" y="20" width="540" height="300" rx="16" className="fill-accent/30 stroke-border" strokeWidth="1.5" />
                <text x="300" y="48" textAnchor="middle" className="fill-muted-foreground" fontSize="11" letterSpacing="0.15em">ECOSYSTEM</text>

                {/* Layer 2 - Middle */}
                <rect x="70" y="62" width="460" height="220" rx="12" className="fill-accent/50 stroke-border" strokeWidth="1.5" />
                <text x="300" y="88" textAnchor="middle" className="fill-muted-foreground" fontSize="11" letterSpacing="0.15em">PROTOCOL LAYER</text>

                {/* Layer 1 - Inner / Core */}
                <rect x="120" y="102" width="360" height="148" rx="10" className="fill-card stroke-border" strokeWidth="2" />
                <text x="300" y="130" textAnchor="middle" className="fill-foreground font-bold" fontSize="14">TMRW Browser</text>
                <text x="300" y="150" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Core Product · Live Today</text>

                {/* Feature pills inside core */}
                {[
                  { label: "Wallet", x: 165 },
                  { label: "AI Assistant", x: 255 },
                  { label: "Swaps", x: 355 },
                  { label: "RWA Access", x: 435 },
                ].map((f, i) => (
                  <g key={i}>
                    <rect x={f.x - 38} y={170} width={76} height={24} rx="12" className="fill-accent stroke-border" strokeWidth="1" />
                    <text x={f.x} y={186} textAnchor="middle" className="fill-foreground" fontSize="9">{f.label}</text>
                  </g>
                ))}

                {/* Protocol layer labels */}
                {[
                  { label: "Identity", x: 130 },
                  { label: "Governance", x: 240 },
                  { label: "Cross-Chain", x: 360 },
                  { label: "Security", x: 470 },
                ].map((f, i) => (
                  <text key={i} x={f.x} y={268} textAnchor="middle" className="fill-muted-foreground" fontSize="9">{f.label}</text>
                ))}

                {/* Ecosystem layer labels */}
                {[
                  { label: "Tokenized Assets", x: 150 },
                  { label: "Validators", x: 300 },
                  { label: "Developer Plugins", x: 450 },
                ].map((f, i) => (
                  <text key={i} x={f.x} y={306} textAnchor="middle" className="fill-muted-foreground" fontSize="9">{f.label}</text>
                ))}

                {/* Caption */}
                <text x="300" y="335" textAnchor="middle" className="fill-muted-foreground" fontSize="9" fontStyle="italic">Three-layer architecture: Browser → Protocol → Ecosystem</text>
              </svg>
            </div>
          </div>
        </section>

        <section id="solution-platform">
          <h2 className="text-2xl font-bold text-foreground mb-4">Platform Capabilities</h2>
          <div className="prose-section">
            <p>W3AI's product philosophy is that the browser is no longer a "window." It is the execution environment for AI, identity, and money. The platform enables users to discover → verify → transact → monitor across Web3 with an immersive UI/UX designed for high-frequency multi-chain activity.</p>
          </div>
        </section>

        <section id="solution-differentiation">
          <h2 className="text-2xl font-bold text-foreground mb-4">Differentiation</h2>
          <div className="prose-section">
            <p>W3AI's differentiation is expressed through workflow superiority and permission superiority:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li><strong>vs. Brave:</strong> Brave demonstrates large-scale demand for privacy-first browsing (100M+ MAU). W3AI meets these privacy expectations while solving Web3-specific safety problems — wallet connections, transaction clarity, contract risk, chain selection, and agent safety.</li>
              <li><strong>vs. Safari:</strong> Safari dominates Apple's ecosystem with privacy as a primary differentiator. W3AI's path: "Safari is privacy-first; W3AI is Web3 AI safety-first."</li>
              <li><strong>vs. Comet & Atlas:</strong> These products confirm the new bar — context-aware assistants living inside the browser. W3AI competes by making "agent safety" patterns Web3-native, where "actions" often move assets.</li>
            </ul>
          </div>
        </section>

        <section id="solution-security">
          <h2 className="text-2xl font-bold text-foreground mb-4">Security Intelligence</h2>
          <div className="prose-section">
            <p>W3AI integrates security posture into the act of connecting, signing, and transacting. A practical security integration partner is Hacken, offering smart contract audits, wallet audits, penetration testing, tokenomics audits, proof-of-reserves audits, and post-deployment monitoring. In W3AI, this becomes an "in-browser trust layer": risk flags, verified proofs, and standardized security context before users commit capital.</p>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 05: What Exists Today */}
      {/* ============================================================ */}
      <div className={p("what-exists-today")}>
        <section id="what-exists-today">
          <h2 className="text-2xl font-bold text-foreground mb-4">What Exists Today</h2>
          <div className="prose-section">
            <p>W3AI has moved beyond concept stage. The following core components are built and operational:</p>
          </div>
        </section>

        <section id="today-browser">
          <h2 className="text-2xl font-bold text-foreground mb-4">W3AI Privacy Browser</h2>
          <div className="prose-section">
            <p>The W3AI Privacy Browser is a macOS desktop application built on the Firefox/Gecko engine, delivering the core Web3 AI browsing experience with integrated wallet connectivity, AI-assisted transaction explanation, and a unified interface for multi-chain activity. For full technical architecture, Firefox framework details, and plugin development documentation, see <a href="#privacy-browser" className="text-[hsl(82,85%,55%)] hover:underline">Chapter 08B: W3AI Privacy Browser</a>.</p>
          </div>
        </section>

        <section id="today-protocol">
          <h2 className="text-2xl font-bold text-foreground mb-4">W3AI Protocol</h2>
          <div className="prose-section">
            <p>The W3AI Protocol provides the decentralized infrastructure layer — identity, liquidity, governance, and security converging into a composable stack across Solana, Ethereum, and BNB Smart Chain. The protocol binds AI agent permissions to on-chain wallet permissions as a single security domain.</p>
          </div>
        </section>

        <section id="today-go-to-market">
          <h2 className="text-2xl font-bold text-foreground mb-4">Go To Market</h2>
          <div className="prose-section">
            <p>The project targets a six-month rollout with a measurable pre-listing objective: 25,000 Registry users via whitelisted wallets prior to listing. Post-launch, W3AI targets 3–5% share of the Web3 browser market within 12–18 months, modeled as 3M+ monthly users, benchmarked against Brave's reported 101M MAU.</p>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 06: Platform Capabilities */}
      {/* ============================================================ */}
      <div className={p("platform-capabilities")}>
        <section id="platform-capabilities">
          <h2 className="text-2xl font-bold text-foreground mb-4">Platform Capabilities</h2>
          <div className="prose-section">
            <p>The TMRW Browser extends its core browsing experience through AI tools, developer integrations, and DeFi functionality — all embedded within the browser rather than offered as separate products.</p>
          </div>
        </section>

        <section id="cap-llm-layer">
          <h2 className="text-2xl font-bold text-foreground mb-4">LLM Layer</h2>
          <div className="prose-section">
            <p>Bring Your Own Key (BYOK): Users can connect the LLM provider of their choice using their own API keys. This supports power users and enterprises with preferred vendors, budgets, and compliance requirements.</p>
            <p>W3AI Open Gateway (token-based): Users can alternatively route inference through a W3AI-managed gateway with token-based billing. The Open Gateway is user-controlled by default with spending caps, per-session limits, and explicit on/off controls. A 30% margin is applied over underlying provider costs with transparent reporting.</p>
          </div>
        </section>

        <section id="cap-swap-execution">
          <h2 className="text-2xl font-bold text-foreground mb-4">DeFi Swap Execution</h2>
          <div className="prose-section">
            <p>W3AI embeds swap functionality directly in the browser and applies a transparent convenience fee that routes into the W3AI treasury. A practical implementation path is the Changelly API, designed for service providers to let users exchange without leaving the host product. Changelly's API supports an "extra fee" functionality allowing the integrator to configure an additional commission layer.</p>
          </div>
        </section>

        <section id="cap-developers">
          <h2 className="text-2xl font-bold text-foreground mb-4">Developers</h2>
          <div className="prose-section">
            <p>W3AI is designed to be developer-friendly from the ground up. The browser exposes APIs and extension points that enable third-party developers to build plugins, integrate dApps, and extend browser functionality within a secure, sandboxed environment.</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Extension SDK: A developer toolkit for building W3AI-native extensions with access to wallet state, transaction context, and AI assistant hooks.</li>
              <li>Open-source components: Core browser modules published under permissive licenses to encourage community contributions and security audits.</li>
              <li>Developer documentation: Comprehensive API references, integration guides, and example projects for rapid onboarding.</li>
              <li>Hackathon ecosystem: Active participation in ETH Global, Solana hackathons, and BNB Chain builder programs to cultivate developer adoption.</li>
            </ul>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 6B: AI Processing & MCP */}
      {/* ============================================================ */}
      <div className={p("ai-processing")}>
        <section id="ai-processing">
          <h2 className="text-2xl font-bold text-foreground mb-4">AI Processing & Model Context Protocol</h2>
          <div className="prose-section">
            <p>W3AI operates a multi-model AI processing layer that orchestrates inference across the industry's leading foundation model providers — OpenAI, Anthropic, and Google Gemini. Rather than locking users into a single provider, the platform dynamically routes requests to the optimal model based on task complexity, latency requirements, and cost efficiency.</p>
            <p>At the core of this architecture sits the Model Context Protocol (MCP) — an open standard for connecting AI models to external data sources, tools, and live web content. MCP servers act as the bridge between foundation models and the real-world context they need to deliver accurate, actionable intelligence within the browser environment.</p>
          </div>
        </section>

        <section id="ai-models-overview">
          <h2 className="text-2xl font-bold text-foreground mb-4">Model Providers</h2>
          <div className="prose-section">
            <p>W3AI integrates three tier-one AI providers, each selected for distinct strengths that map to specific browser-native use cases:</p>
          </div>

          {/* Model Provider Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            {[
              {
                name: "OpenAI",
                models: "GPT-5 · GPT-5 Mini · GPT-5 Nano",
                strengths: ["Complex reasoning & nuanced analysis", "Long-context multimodal processing", "Code generation & smart contract review", "High-accuracy transaction explanation"],
                useCase: "Deep analysis, contract auditing, complex financial modeling",
              },
              {
                name: "Anthropic",
                models: "Claude 4 Opus · Claude 4 Sonnet",
                strengths: ["Constitutional AI safety alignment", "Precise instruction following", "Extended context windows (200K+)", "Nuanced compliance & legal analysis"],
                useCase: "Compliance review, risk assessment, regulatory documentation",
              },
              {
                name: "Google Gemini",
                models: "Gemini 2.5 Pro · Gemini 2.5 Flash",
                strengths: ["Native multimodal (text + image + video)", "Real-time web grounding & search", "Cost-efficient high-volume inference", "Live webpage understanding"],
                useCase: "Live page analysis, visual asset verification, real-time market intelligence",
              },
            ].map((provider) => (
              <div key={provider.name} className="rounded-xl border border-border bg-card p-5 space-y-3">
                <h3 className="text-lg font-bold text-foreground">{provider.name}</h3>
                <p className="text-xs font-mono text-[hsl(82,85%,55%)]">{provider.models}</p>
                <ul className="space-y-1">
                  {provider.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[hsl(82,85%,55%)] shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Primary Use:</span> {provider.useCase}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="prose-section">
            <p>The W3AI gateway intelligently routes each request to the optimal model. Compliance-heavy queries route to Anthropic's safety-aligned models. Visual verification and live page analysis leverage Gemini's multimodal capabilities. Complex reasoning and contract analysis default to OpenAI's frontier models. Users with BYOK (Bring Your Own Key) can override routing to use their preferred provider.</p>
          </div>
        </section>

        <section id="ai-mcp-architecture">
          <h2 className="text-2xl font-bold text-foreground mb-4">MCP Server Architecture</h2>
          <div className="prose-section">
            <p>The Model Context Protocol (MCP) is an open standard originally developed by Anthropic that defines how AI models connect to external tools, data sources, and services. W3AI deploys MCP servers as the connective tissue between foundation models and the browser's execution environment.</p>
            <p>Each MCP server exposes a set of tools and resources that AI models can invoke during inference. This creates a composable architecture where new capabilities — blockchain explorers, price feeds, compliance databases, live webpage parsers — can be added as modular MCP endpoints without modifying the core AI pipeline.</p>
          </div>

          {/* MCP Architecture SVG Diagram */}
          <div className="my-8 flex justify-center">
            <div className="w-full max-w-3xl">
              <svg viewBox="0 0 720 520" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Title */}
                <text x="360" y="24" textAnchor="middle" className="fill-foreground font-bold" fontSize="14" letterSpacing="0.08em">MCP SERVER ARCHITECTURE</text>
                <line x1="240" y1="32" x2="480" y2="32" className="stroke-[hsl(82,85%,55%)]" strokeWidth="2" opacity="0.5" />

                {/* TMRW Browser - Top */}
                <rect x="220" y="48" width="280" height="56" rx="12" className="fill-card stroke-border" strokeWidth="2" />
                <text x="360" y="72" textAnchor="middle" className="fill-foreground font-bold" fontSize="13">TMRW Browser</text>
                <text x="360" y="90" textAnchor="middle" className="fill-muted-foreground" fontSize="9">User Interface · Wallet · AI Sidebar</text>

                {/* Arrow down to MCP Gateway */}
                <line x1="360" y1="104" x2="360" y2="134" className="stroke-[hsl(82,85%,55%)]" strokeWidth="2" />
                <polygon points="360,140 354,130 366,130" className="fill-[hsl(82,85%,55%)]" />
                <text x="390" y="124" className="fill-muted-foreground" fontSize="8">JSON-RPC</text>

                {/* MCP Gateway / Router */}
                <rect x="180" y="142" width="360" height="52" rx="10" className="fill-accent stroke-[hsl(82,85%,55%)]" strokeWidth="1.5" />
                <text x="360" y="165" textAnchor="middle" className="fill-foreground font-bold" fontSize="12">W3AI MCP Gateway</text>
                <text x="360" y="182" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Routing · Auth · Rate Limiting · Context Assembly</text>

                {/* Three arrows down to model providers */}
                <line x1="240" y1="194" x2="140" y2="238" className="stroke-muted-foreground" strokeWidth="1.5" strokeDasharray="6,3" />
                <line x1="360" y1="194" x2="360" y2="238" className="stroke-muted-foreground" strokeWidth="1.5" strokeDasharray="6,3" />
                <line x1="480" y1="194" x2="580" y2="238" className="stroke-muted-foreground" strokeWidth="1.5" strokeDasharray="6,3" />

                {/* Model Provider boxes */}
                {/* OpenAI */}
                <rect x="60" y="240" width="160" height="48" rx="8" className="fill-card stroke-border" strokeWidth="1.5" />
                <text x="140" y="260" textAnchor="middle" className="fill-foreground font-bold" fontSize="11">OpenAI</text>
                <text x="140" y="276" textAnchor="middle" className="fill-muted-foreground" fontSize="8">GPT-5 · Reasoning</text>

                {/* Anthropic */}
                <rect x="280" y="240" width="160" height="48" rx="8" className="fill-card stroke-border" strokeWidth="1.5" />
                <text x="360" y="260" textAnchor="middle" className="fill-foreground font-bold" fontSize="11">Anthropic</text>
                <text x="360" y="276" textAnchor="middle" className="fill-muted-foreground" fontSize="8">Claude · Safety</text>

                {/* Gemini */}
                <rect x="500" y="240" width="160" height="48" rx="8" className="fill-card stroke-border" strokeWidth="1.5" />
                <text x="580" y="260" textAnchor="middle" className="fill-foreground font-bold" fontSize="11">Google Gemini</text>
                <text x="580" y="276" textAnchor="middle" className="fill-muted-foreground" fontSize="8">Multimodal · Grounding</text>

                {/* Bidirectional arrows from models down to MCP Servers layer */}
                <line x1="140" y1="288" x2="140" y2="326" className="stroke-[hsl(82,85%,55%)]" strokeWidth="1.5" strokeDasharray="4,3" />
                <line x1="360" y1="288" x2="360" y2="326" className="stroke-[hsl(82,85%,55%)]" strokeWidth="1.5" strokeDasharray="4,3" />
                <line x1="580" y1="288" x2="580" y2="326" className="stroke-[hsl(82,85%,55%)]" strokeWidth="1.5" strokeDasharray="4,3" />

                {/* "Tool Calls" label */}
                <text x="360" y="316" textAnchor="middle" className="fill-[hsl(82,85%,55%)]" fontSize="8" fontWeight="bold">TOOL CALLS</text>

                {/* MCP Servers Layer - wide bar */}
                <rect x="40" y="328" width="640" height="44" rx="8" className="fill-accent/60 stroke-border" strokeWidth="1.5" />
                <text x="360" y="348" textAnchor="middle" className="fill-foreground font-bold" fontSize="11">MCP Server Layer</text>
                <text x="360" y="362" textAnchor="middle" className="fill-muted-foreground" fontSize="8">Standardized Tool Interface · JSON-RPC · Streamable HTTP</text>

                {/* Individual MCP server boxes at bottom */}
                {[
                  { label: "Blockchain\nExplorer", x: 90 },
                  { label: "Price\nFeeds", x: 210 },
                  { label: "Live Page\nParser", x: 330 },
                  { label: "Compliance\nDB", x: 450 },
                  { label: "Wallet\nContext", x: 570 },
                ].map((srv, i) => (
                  <g key={i}>
                    <line x1={srv.x + 30} y1="372" x2={srv.x + 30} y2="400" className="stroke-muted-foreground" strokeWidth="1" strokeDasharray="3,2" />
                    <rect x={srv.x - 10} y="402" width="80" height="52" rx="6" className="fill-card stroke-border" strokeWidth="1" />
                    {srv.label.split("\n").map((line, li) => (
                      <text key={li} x={srv.x + 30} y={420 + li * 14} textAnchor="middle" className="fill-muted-foreground" fontSize="9">{line}</text>
                    ))}
                  </g>
                ))}

                {/* Data sources at very bottom */}
                <text x="360" y="478" textAnchor="middle" className="fill-muted-foreground" fontSize="8" letterSpacing="0.15em">EXTERNAL DATA SOURCES</text>
                {[
                  { label: "Solscan", x: 90 },
                  { label: "CoinGecko", x: 210 },
                  { label: "Web DOM", x: 330 },
                  { label: "Chainalysis", x: 450 },
                  { label: "On-Chain", x: 570 },
                ].map((ds, i) => (
                  <g key={i}>
                    <line x1={ds.x + 30} y1="454" x2={ds.x + 30} y2="470" className="stroke-muted-foreground" strokeWidth="1" opacity="0.4" />
                    <text x={ds.x + 30} y={498} textAnchor="middle" className="fill-muted-foreground" fontSize="8" opacity="0.7">{ds.label}</text>
                  </g>
                ))}

                {/* Caption */}
                <text x="360" y="516" textAnchor="middle" className="fill-muted-foreground" fontSize="9" fontStyle="italic">MCP servers provide standardized tool access — models call tools, servers execute against live data</text>
              </svg>
            </div>
          </div>

          <div className="prose-section">
            <p>Key architectural principles of the MCP implementation:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li><strong>Standardized Protocol:</strong> All MCP servers communicate via JSON-RPC over Streamable HTTP, ensuring interoperability regardless of the underlying data source.</li>
              <li><strong>Tool Discovery:</strong> Models dynamically discover available tools at runtime. When a new MCP server is deployed (e.g., a new DEX aggregator), all connected models can immediately leverage it without retraining.</li>
              <li><strong>Context Windows:</strong> MCP servers can inject contextual resources — token metadata, contract ABIs, wallet history — directly into the model's context window, enabling informed decision-making without explicit user prompting.</li>
              <li><strong>Security Boundary:</strong> MCP servers operate within the W3AI security domain. Tool calls that involve wallet operations require explicit user consent before execution, maintaining the "assist → verify → act" pattern.</li>
            </ul>
          </div>
        </section>

        <section id="ai-live-analysis">
          <h2 className="text-2xl font-bold text-foreground mb-4">Live Webpage Analysis</h2>
          <div className="prose-section">
            <p>One of W3AI's most powerful capabilities is real-time analysis of live webpages within the browser. When a user visits a DeFi protocol, NFT marketplace, or token launch page, the AI can parse the page's DOM, extract structured data, and cross-reference it against on-chain state — all in real time.</p>
            <p>This is powered by a dedicated Live Page Parser MCP server that:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Extracts smart contract addresses, token symbols, and transaction parameters from page content.</li>
              <li>Cross-references extracted addresses against known scam databases, audit records, and sanctions lists.</li>
              <li>Verifies that displayed APY, TVL, and price data matches on-chain reality — flagging discrepancies as potential fraud indicators.</li>
              <li>Analyzes dApp permissions requests before the user signs, explaining exactly what each permission grants in plain language.</li>
              <li>Monitors page mutations in real-time, alerting users if contract addresses or transaction parameters change after initial page load (a common phishing vector).</li>
            </ul>
            <p>This capability transforms the browser from a passive rendering engine into an active security partner — the AI sees what the user sees, understands what the page is asking, and intervenes before harmful actions are executed.</p>
          </div>
        </section>

        <section id="ai-orchestration">
          <h2 className="text-2xl font-bold text-foreground mb-4">Orchestration Layer</h2>
          <div className="prose-section">
            <p>The W3AI orchestration layer manages the end-to-end lifecycle of AI requests within the browser. It determines which model to invoke, which MCP tools to make available, and how to assemble context from multiple sources into a coherent response.</p>
          </div>

          {/* Orchestration Flow Table */}
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-[hsl(82,85%,55%,0.3)]">
                  <th className="text-left py-3 px-4 text-foreground font-bold">Stage</th>
                  <th className="text-left py-3 px-4 text-foreground font-bold">Action</th>
                  <th className="text-left py-3 px-4 text-foreground font-bold">Components</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  ["1. Intake", "User query or browser event triggers AI pipeline", "Browser UI · Event System"],
                  ["2. Classification", "Query classified by type: analysis, transaction, compliance, general", "Router · Classifier Model"],
                  ["3. Model Selection", "Optimal model selected based on task type, cost, latency", "Gateway · Routing Rules"],
                  ["4. Context Assembly", "Relevant MCP tools and resources attached to model context", "MCP Registry · Tool Discovery"],
                  ["5. Inference", "Model processes query with tool access, may invoke multiple MCP calls", "Foundation Model · MCP Servers"],
                  ["6. Verification", "Response validated against on-chain data, flagged if inconsistent", "Verification Engine · Chain RPCs"],
                  ["7. Presentation", "Result rendered in browser with actionable UI (approve/reject/modify)", "AI Sidebar · Transaction Preview"],
                ].map(([stage, action, components], i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-[hsl(82,85%,55%)] whitespace-nowrap">{stage}</td>
                    <td className="py-3 px-4">{action}</td>
                    <td className="py-3 px-4 font-mono text-xs">{components}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="prose-section">
            <p>The orchestration layer enforces strict latency budgets: simple queries (token price, wallet balance) must resolve within 500ms using cached MCP resources. Complex queries (contract analysis, compliance review) are allowed up to 8 seconds with streaming partial results to maintain perceived responsiveness.</p>
            <p>All AI interactions are logged with full provenance — which model was used, which MCP tools were invoked, what context was provided, and what the model recommended. This audit trail is critical for compliance-sensitive institutional users and enables continuous improvement of routing decisions.</p>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 07: Cross-Chain Architecture */}
      {/* ============================================================ */}
      <div className={p("cross-chain-architecture")}>
        <section id="cross-chain-architecture">
          <h2 className="text-2xl font-bold text-foreground mb-4">Cross-Chain Architecture</h2>
          <div className="prose-section">
            <p>W3AI operates across Solana, Ethereum, and BNB Smart Chain using a hub-and-spoke model designed to maximize ecosystem reach while maintaining absolute supply integrity. This section describes the architecture in full — all cross-chain mechanics throughout this whitepaper reference this design.</p>
          </div>

          {/* Hub-and-Spoke Architecture Diagram */}
          <div className="my-8 flex justify-center">
            <div className="w-full max-w-2xl">
              <svg viewBox="0 0 600 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Spoke connection lines */}
                <line x1="300" y1="160" x2="120" y2="300" className="stroke-muted-foreground" strokeWidth="2" strokeDasharray="8,4" opacity="0.5" />
                <line x1="300" y1="160" x2="480" y2="300" className="stroke-muted-foreground" strokeWidth="2" strokeDasharray="8,4" opacity="0.5" />

                {/* Wormhole NTT labels on lines */}
                <text x="185" y="218" className="fill-muted-foreground" fontSize="10" fontFamily="monospace" transform="rotate(-35, 185, 218)">Wormhole NTT</text>
                <text x="380" y="218" className="fill-muted-foreground" fontSize="10" fontFamily="monospace" transform="rotate(35, 380, 218)">Wormhole NTT</text>

                {/* Arrows on lines */}
                <polygon points="195,245 185,240 190,250" className="fill-muted-foreground" opacity="0.7" />
                <polygon points="215,232 210,240 220,238" className="fill-muted-foreground" opacity="0.7" />
                <polygon points="405,245 415,240 410,250" className="fill-muted-foreground" opacity="0.7" />
                <polygon points="385,232 390,240 380,238" className="fill-muted-foreground" opacity="0.7" />

                {/* Hub - Solana */}
                <circle cx="300" cy="130" r="60" className="fill-accent stroke-border" strokeWidth="2" />
                <text x="300" y="120" textAnchor="middle" className="fill-foreground font-bold" fontSize="16">Solana</text>
                <text x="300" y="138" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Canonical Mint</text>
                <text x="300" y="152" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Hub Chain</text>

                {/* Hub label */}
                <text x="300" y="56" textAnchor="middle" className="fill-foreground font-bold" fontSize="13" letterSpacing="0.1em">HUB</text>
                <line x1="270" y1="62" x2="330" y2="62" className="stroke-muted-foreground" strokeWidth="1" opacity="0.4" />

                {/* Spoke - Ethereum */}
                <circle cx="120" cy="310" r="50" className="fill-card stroke-border" strokeWidth="2" />
                <text x="120" y="305" textAnchor="middle" className="fill-foreground font-bold" fontSize="14">Ethereum</text>
                <text x="120" y="322" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Spoke Chain</text>

                {/* Spoke - BSC */}
                <circle cx="480" cy="310" r="50" className="fill-card stroke-border" strokeWidth="2" />
                <text x="480" y="305" textAnchor="middle" className="fill-foreground font-bold" fontSize="14">BNB Chain</text>
                <text x="480" y="322" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Spoke Chain</text>

                {/* Spoke labels */}
                <text x="120" y="375" textAnchor="middle" className="fill-muted-foreground" fontSize="9">DeFi · Listings</text>
                <text x="480" y="375" textAnchor="middle" className="fill-muted-foreground" fontSize="9">DeFi · Listings</text>

                {/* Legend */}
                <text x="300" y="395" textAnchor="middle" className="fill-muted-foreground" fontSize="9" fontStyle="italic">Burn-and-mint model · Total supply invariance across all chains</text>
              </svg>
            </div>
          </div>
        </section>

        <section id="xchain-hub-spoke">
          <h2 className="text-2xl font-bold text-foreground mb-4">Hub & Spoke Model</h2>
          <div className="prose-section">
            <p>Solana serves as the Canonical Mint and Hub Chain. All 2,000,000,000 W3AI tokens are minted natively on Solana. Ethereum and BNB Smart Chain operate as spoke chains, receiving wrapped or bridged representations of the canonical supply. This hub-and-spoke model ensures a single source of truth for total supply, eliminates the risk of independent minting on secondary chains, and simplifies auditing and compliance reporting.</p>
            <p>The architecture leverages Solana's high throughput and low transaction costs for primary token operations — staking, governance voting, and reward distribution — while maintaining presence on Ethereum and BSC for DeFi composability and exchange listing requirements.</p>
          </div>
        </section>

        <section id="xchain-wormhole">
          <h2 className="text-2xl font-bold text-foreground mb-4">Wormhole NTT Bridge</h2>
          <div className="prose-section">
            <p>Cross-chain transfers are powered by Wormhole Native Token Transfers (NTT), a protocol-level bridging framework that supports burn-and-mint models with governance-configurable per-chain rate limits. Unlike traditional lock-and-mint bridges, NTT burns tokens on the source chain and mints equivalent tokens on the destination chain, preserving total supply invariance at every step.</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Burn-and-mint model eliminates locked-token attack vectors common in bridge exploits.</li>
              <li>Per-chain rate limits prevent catastrophic supply drainage in the event of a bridge compromise.</li>
              <li>Governance-controlled parameters allow the DAO to adjust transfer limits, pause bridges, and whitelist new chains without contract redeployment.</li>
            </ul>
          </div>
        </section>

        <section id="xchain-supply-integrity">
          <h2 className="text-2xl font-bold text-foreground mb-4">Supply Integrity</h2>
          <div className="prose-section">
            <p>Supply integrity is enforced through a combination of on-chain invariants and off-chain monitoring. The total supply across all chains must equal the canonical 2,000,000,000 W3AI at all times. Any deviation triggers automated alerts and can invoke emergency governance procedures.</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Real-time cross-chain supply dashboards with public verification endpoints.</li>
              <li>Automated reconciliation checks running every block on each deployed chain.</li>
              <li>Third-party audit integration for periodic supply attestation reports.</li>
              <li>Emergency pause functionality governed by multi-sig with time-lock safeguards.</li>
            </ul>
          </div>
        </section>

        <section id="xchain-governance">
          <h2 className="text-2xl font-bold text-foreground mb-4">Cross-Chain Governance</h2>
          <div className="prose-section">
            <p>Governance participation is chain-agnostic. Token holders on Ethereum and BSC can vote on proposals without bridging back to Solana. Cross-chain message passing aggregates voting power from all chains into a unified governance result on the hub chain.</p>
            <p>This ensures that the multi-chain deployment does not fragment governance participation or create asymmetric voting power between chains. All governance outcomes are executed on Solana and propagated to spoke chains via Wormhole messaging.</p>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 08: W3AI Protocol */}
      {/* ============================================================ */}
      <div className={p("w3ai-protocol")}>
        <section id="w3ai-protocol">
          <h2 className="text-2xl font-bold text-foreground mb-4">W3AI Protocol</h2>
          <div className="prose-section">
            <p>The W3AI Protocol is the decentralized infrastructure layer that powers every surface of the W3AI ecosystem — from browser-native AI inference to multi-chain token operations and validator economics. Built across Solana, Ethereum, and BNB Smart Chain, the protocol establishes a unified execution framework where identity, liquidity, governance, and security converge into a single composable stack.</p>
          </div>
        </section>

        {/* Protocol Permission Model Diagram */}
        <div className="my-8 flex justify-center">
          <div className="w-full max-w-2xl">
            <svg viewBox="0 0 600 300" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              {/* User at top */}
              <circle cx="300" cy="45" r="28" className="fill-card stroke-border" strokeWidth="2" />
              <text x="300" y="42" textAnchor="middle" className="fill-foreground font-bold" fontSize="11">User</text>
              <text x="300" y="55" textAnchor="middle" className="fill-muted-foreground" fontSize="8">Explicit Control</text>

              {/* Line down to unified domain */}
              <line x1="300" y1="73" x2="300" y2="105" className="stroke-muted-foreground" strokeWidth="1.5" strokeDasharray="4,3" />
              <polygon points="300,108 295,100 305,100" className="fill-muted-foreground" />

              {/* Unified Security Domain box */}
              <rect x="130" y="110" width="340" height="60" rx="10" className="fill-accent stroke-border" strokeWidth="2" />
              <text x="300" y="136" textAnchor="middle" className="fill-foreground font-bold" fontSize="12">Unified Security Domain</text>
              <text x="300" y="155" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Cryptographic verification · User-consent framework</text>

              {/* Lines down to two domains */}
              <line x1="220" y1="170" x2="180" y2="205" className="stroke-muted-foreground" strokeWidth="1.5" strokeDasharray="4,3" />
              <line x1="380" y1="170" x2="420" y2="205" className="stroke-muted-foreground" strokeWidth="1.5" strokeDasharray="4,3" />

              {/* AI Permissions */}
              <rect x="90" y="208" width="180" height="55" rx="8" className="fill-card stroke-border" strokeWidth="1.5" />
              <text x="180" y="232" textAnchor="middle" className="fill-foreground font-bold" fontSize="11">AI Permissions</text>
              <text x="180" y="250" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Inference · Recommendations</text>

              {/* Wallet Permissions */}
              <rect x="330" y="208" width="180" height="55" rx="8" className="fill-card stroke-border" strokeWidth="1.5" />
              <text x="420" y="232" textAnchor="middle" className="fill-foreground font-bold" fontSize="11">Wallet Permissions</text>
              <text x="420" y="250" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Signing · Transfers · Staking</text>

              {/* Bidirectional arrow between the two */}
              <line x1="270" y1="235" x2="330" y2="235" className="stroke-muted-foreground" strokeWidth="1" strokeDasharray="3,2" />
              <text x="300" y="228" textAnchor="middle" className="fill-muted-foreground" fontSize="7">Bound</text>

              {/* Caption */}
              <text x="300" y="292" textAnchor="middle" className="fill-muted-foreground" fontSize="9" fontStyle="italic">Assist → Verify → Act — only with explicit user control</text>
            </svg>
          </div>
        </div>
        <section id="protocol-architecture">
          <h2 className="text-2xl font-bold text-foreground mb-4">Architecture</h2>
          <div className="prose-section">
            <p>At its core, the W3AI Protocol binds AI agent permissions to on-chain wallet permissions — treating them as a single security domain. Every AI-assisted action within the ecosystem, whether a swap recommendation, a governance vote, or a portfolio rebalance, must pass through the same cryptographic verification and user-consent framework that governs asset transfers. The result is a protocol where intelligence and capital move together under explicit user control.</p>
          </div>
        </section>
        <section id="protocol-economic-model">
          <h2 className="text-2xl font-bold text-foreground mb-4">Economic Model</h2>
          <div className="prose-section">
            <p>The protocol's economic model is designed for long-term sustainability. Revenue flows from multiple surfaces — Open Gateway AI inference fees, in-browser swap convenience fees, validator yield, and premium feature access — all routed transparently through on-chain treasury mechanisms. With 52.5% of total token supply allocated to the treasury and governed by progressive decentralization, the W3AI Protocol is structured to fund development, incentivize participation, and maintain operational resilience across market cycles.</p>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 09: Tokenized Asset Opportunity */}
      {/* ============================================================ */}
      <div className={p("tokenized-assets")}>
        <section id="tokenized-assets">
          <h2 className="text-2xl font-bold text-foreground mb-4">Tokenized Asset Opportunity</h2>
          <div className="prose-section">
            <p>Tokenization enables real-world assets to be fractionalized and traded digitally on blockchain networks. By converting traditionally illiquid holdings into transparent, auditable digital securities, tokenization increases accessibility, transparency, and liquidity across asset classes that have historically been reserved for institutional investors.</p>
            <p>W3AI's RWA framework provides browser-native discovery, verification, and management of tokenized assets across the following sectors:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li><strong>Commodities</strong> — agricultural futures, coffee, cotton, timber, and managed resource inventories.</li>
              <li><strong>Infrastructure</strong> — toll roads, airports, data centers, water systems, and digital infrastructure.</li>
              <li><strong>Real Estate</strong> — commercial, residential, hospitality, and mixed-use properties with automated rental distribution.</li>
              <li><strong>Energy</strong> — solar farms, wind installations, oil & gas royalties, EV charging networks, and LNG terminals.</li>
              <li><strong>Metals</strong> — gold, silver, copper, lithium, and platinum group metals with blockchain-verified provenance.</li>
              <li><strong>Carbon Credits</strong> — verified offset projects with on-chain retirement tracking and MRV compliance.</li>
              <li><strong>Rare Earth Minerals</strong> — neodymium, cobalt, graphite, and critical minerals for technology supply chains.</li>
              <li><strong>Sovereign Wealth</strong> — national asset digitization, citizen participation programs, and co-investment instruments.</li>
              <li><strong>Stablecoins</strong> — treasury-backed settlement rails, cross-border payments, and institutional yield vaults.</li>
              <li><strong>Tax Credits</strong> — renewable energy ITCs, LIHTCs, R&D credits, and opportunity zone investments.</li>
              <li><strong>Collectables</strong> — fine art, rare timepieces, classic automobiles, and sports memorabilia with verified provenance.</li>
              <li><strong>Utilities</strong> — municipal energy, water treatment, telecom infrastructure, and smart grid assets.</li>
            </ul>
            <p>The key opportunity is enabling global investors to access institutional-quality assets at fractions of traditional minimums — with smart contracts automating settlement, custody verification, and yield distribution. Detailed sector analysis is available at <a href="/rwas" className="text-[hsl(82,85%,55%)] hover:underline">tmrw-digital.com/rwas</a>.</p>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 10: Institutional-Grade Rails */}
      {/* ============================================================ */}
      <div className={p("institutional-rails")}>
        <section id="institutional-rails">
          <h2 className="text-2xl font-bold text-foreground mb-4">Institutional-Grade Rails</h2>
          <div className="prose-section">
            <p>W3AI's mission is consumer-first, but the Web3 browser category will increasingly serve professionals and institutions. Northern Trust has described blockchain/tokenization initiatives utilizing its digital assets platform (Matrix Zenith) and participation in tokenizing ESG reporting credentials.</p>
            <p>W3AI translates this into product positioning: the browser becomes the interface where tokenized assets, funds, and ESG credentials are discovered, verified, and managed.</p>
          </div>
        </section>
        <section id="rails-custody">
          <h2 className="text-2xl font-bold text-foreground mb-4">Custody & Asset Safeguarding</h2>
          <div className="prose-section">
            <p>Institutional participation requires bank-grade custody solutions. W3AI integrates MPC (Multi-Party Computation) and HSM (Hardware Security Module) custody infrastructure to provide institutional-grade key management without sacrificing user sovereignty.</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Multi-signature authorization workflows for treasury and fund management.</li>
              <li>Insurance-backed custody partnerships for high-value asset classes.</li>
              <li>SOC 2 Type II compliant infrastructure and audit-ready reporting.</li>
            </ul>
          </div>
        </section>
        <section id="rails-compliance">
          <h2 className="text-2xl font-bold text-foreground mb-4">Compliance Infrastructure</h2>
          <div className="prose-section">
            <p>W3AI embeds compliance tooling directly into the browser experience, enabling institutions to interact with DeFi protocols, tokenized assets, and cross-chain bridges within a regulated framework.</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Automated AML/KYC verification through credentialed wallet attestations.</li>
              <li>Travel Rule compliance for cross-border digital asset transfers.</li>
              <li>Real-time sanctions screening integrated at the transaction layer.</li>
            </ul>
          </div>
        </section>
        <section id="rails-tokenization">
          <h2 className="text-2xl font-bold text-foreground mb-4">Tokenization & RWA Access</h2>
          <div className="prose-section">
            <p>The browser serves as a discovery and management interface for tokenized real-world assets — bridging traditional finance with on-chain liquidity and fractional ownership.</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Integrated RWA marketplace with verified asset originator profiles.</li>
              <li>Secondary market access with transparent pricing and settlement.</li>
              <li>ESG credential tokenization for sustainability reporting and verification.</li>
            </ul>
          </div>
        </section>
        <section id="rails-reporting">
          <h2 className="text-2xl font-bold text-foreground mb-4">Institutional Reporting</h2>
          <div className="prose-section">
            <p>W3AI provides institutional-grade reporting capabilities that satisfy fiduciary and regulatory requirements for digital asset portfolios.</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Portfolio-level analytics with on-chain and off-chain data aggregation.</li>
              <li>Tax lot tracking and cost basis reporting across multi-chain positions.</li>
              <li>Customizable audit trails and compliance export formats.</li>
            </ul>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 11: Supported Networks */}
      {/* ============================================================ */}
      <div className={p("supported-networks")}>
        <section id="supported-networks">
          <h2 className="text-2xl font-bold text-foreground mb-4">Supported Networks</h2>
          <div className="prose-section">
            <p>W3AI is built as a multi-chain protocol with native presence across foundational blockchain ecosystems. Each network was selected for its unique strengths in performance, composability, and community reach — together providing comprehensive coverage of the Web3 landscape.</p>
          </div>
        </section>
        {[
          { id: "network-solana", name: "Solana", desc: "Solana serves as the hub chain and canonical mint for the W3AI token. Its sub-second finality and low transaction costs make it the optimal execution environment for high-frequency AI agent operations, real-time swap execution, and staking mechanics.", bullets: ["Hub chain with canonical token mint and primary staking contracts.", "AI inference routing optimized for Solana's parallel transaction processing.", "Native integration with Jupiter aggregator for optimal swap routing.", "Validator operations contributing to network security and protocol revenue."], links: { github: "https://github.com/solana-labs", foundation: "https://solana.org", x: "https://x.com/solana", visit: "https://solana.com" }},
          { id: "network-ethereum", name: "Ethereum", desc: "Ethereum provides W3AI with access to the deepest DeFi liquidity, the largest developer ecosystem, and the strongest institutional credibility in Web3. As a spoke chain, Ethereum hosts bridged W3AI tokens for DeFi composability and exchange listings.", bullets: ["Spoke chain with Wormhole NTT bridged tokens.", "Uniswap-style AMM pools for deep liquidity access.", "Smart contract audit standards aligned with Ethereum's security-first culture.", "Layer 2 expansion roadmap for cost-efficient operations."], links: { github: "https://github.com/ethereum", foundation: "https://ethereum.foundation", x: "https://x.com/ethereum", visit: "https://ethereum.org" }},
          { id: "network-bsc", name: "BNB Smart Chain", desc: "BNB Smart Chain extends W3AI's reach into the highest-volume retail trading ecosystem. With 1.2M daily active users on BSC and 2.7M on opBNB, the chain provides access to a massive user base optimized for high-frequency swaps and community-driven activity.", bullets: ["Spoke chain with PancakeSwap Smart Router integration.", "Retail-first onboarding with optimized swap and bridging flows.", "Validator operations with 2,000 BNB minimum self-delegation.", "Gateway vertical for memecoin communities with safety overlay."], links: { github: "https://github.com/bnb-chain", foundation: "https://www.bnbchain.org", x: "https://x.com/BNBCHAIN", visit: "https://www.bnbchain.org" }},
          { id: "network-polygon", name: "Polygon", desc: "Polygon provides W3AI with enterprise-grade Ethereum scaling through its zkEVM and PoS sidechains. Its low-cost, high-throughput infrastructure enables mass-market AI agent deployment while maintaining full EVM compatibility and access to Ethereum's security guarantees.", bullets: ["zkEVM rollup for trustless Ethereum-equivalent execution at fraction of cost.", "PoS sidechain for high-speed, low-latency AI agent interactions.", "Enterprise partnerships enabling institutional RWA tokenization pathways.", "Supernets architecture for dedicated W3AI application-specific chains."], links: { github: "https://github.com/0xPolygon", foundation: "https://polygon.technology", x: "https://x.com/0xPolygon", visit: "https://polygon.technology" }},
          { id: "network-zksync", name: "zkSync", desc: "zkSync Era delivers the highest throughput Ethereum L2 experience with native account abstraction and zero-knowledge proof security. W3AI leverages zkSync for privacy-preserving AI computations and gasless user onboarding flows.", bullets: ["Native account abstraction for seamless gasless transactions.", "ZK-proof verification ensuring computational integrity for AI outputs.", "Hyperchain architecture enabling W3AI-dedicated execution environments.", "Paymaster contracts subsidizing end-user gas for frictionless onboarding."], links: { github: "https://github.com/matter-labs", foundation: "https://zksync.io", x: "https://x.com/zksync", visit: "https://zksync.io" }},
          { id: "network-avalanche", name: "Avalanche", desc: "Avalanche's subnet architecture allows W3AI to deploy purpose-built blockchain environments with custom gas tokens, validator sets, and compliance rules — ideal for regulated RWA tokenization and institutional AI applications.", bullets: ["Subnet deployment for dedicated W3AI execution with custom parameters.", "Sub-second finality enabling real-time AI agent decision execution.", "Institutional DeFi ecosystem with native KYC/AML compliance tooling.", "Warp Messaging for seamless cross-subnet AI agent communication."], links: { github: "https://github.com/ava-labs", foundation: "https://www.avax.network", x: "https://x.com/avax", visit: "https://www.avax.network" }},
          { id: "network-arbitrum", name: "Arbitrum", desc: "Arbitrum One is the leading Ethereum L2 by TVL, providing W3AI with access to the deepest Layer 2 DeFi liquidity. Its optimistic rollup architecture delivers 10x cost reduction while inheriting Ethereum's full security model.", bullets: ["Optimistic rollup with 7-day fraud proof window and Ethereum-grade security.", "Arbitrum Orbit chains for dedicated W3AI application rollups.", "Stylus smart contracts enabling Rust/C++ for high-performance AI logic.", "Deepest L2 DeFi liquidity via GMX, Aave, and Uniswap deployments."], links: { github: "https://github.com/OffchainLabs", foundation: "https://arbitrum.foundation", x: "https://x.com/arbitrum", visit: "https://arbitrum.io" }},
          { id: "network-optimism", name: "Optimism", desc: "Optimism powers the Superchain vision — a unified network of interoperable L2 chains. W3AI integrates with Optimism for its governance-forward ecosystem, retroactive public goods funding, and seamless cross-chain messaging via the OP Stack.", bullets: ["OP Stack integration for potential W3AI-dedicated chain deployment.", "Cross-chain message passing via Superchain interoperability layer.", "RetroPGF alignment for funding open-source AI safety research.", "EVM equivalence ensuring zero-friction smart contract portability."], links: { github: "https://github.com/ethereum-optimism", foundation: "https://optimism.io", x: "https://x.com/Optimism", visit: "https://optimism.io" }},
          { id: "network-base", name: "Base", desc: "Base, incubated by Coinbase, bridges the gap between centralized exchange liquidity and on-chain DeFi. W3AI leverages Base for seamless fiat-to-crypto onboarding and access to Coinbase's 110M+ verified user base.", bullets: ["Direct Coinbase integration for institutional-grade fiat on/off ramps.", "OP Stack foundation with Superchain interoperability benefits.", "Lowest-cost EVM execution for high-frequency AI micro-transactions.", "Smart Wallet integration for one-click onboarding without seed phrases."], links: { github: "https://github.com/base-org", foundation: "https://base.org", x: "https://x.com/base", visit: "https://base.org" }},
          { id: "network-fantom", name: "Fantom", desc: "Fantom's Lachesis consensus delivers DAG-based finality in 1-2 seconds with minimal fees. The upcoming Sonic upgrade positions Fantom as one of the fastest EVM chains — ideal for W3AI's latency-sensitive AI agent operations.", bullets: ["DAG-based Lachesis consensus for near-instant transaction finality.", "Sonic upgrade delivering 2,000+ TPS for high-frequency AI workloads.", "Fee monetization model sharing 90% of gas fees with dApp developers.", "Battle-tested DeFi ecosystem with established liquidity protocols."], links: { github: "https://github.com/Fantom-foundation", foundation: "https://fantom.foundation", x: "https://x.com/FantomFDN", visit: "https://fantom.foundation" }},
          { id: "network-cronos", name: "Cronos", desc: "Cronos, powered by Crypto.com, connects W3AI to 80M+ Crypto.com app users and a robust CeFi-DeFi bridge. Its Cosmos SDK foundation and EVM compatibility create a unique hybrid environment for retail-focused AI applications.", bullets: ["Crypto.com ecosystem integration with 80M+ retail users.", "EVM and Cosmos SDK dual compatibility for maximum composability.", "Cronos zkEVM scaling solution for privacy-preserving transactions.", "Native fiat gateway via Crypto.com Pay for seamless onboarding."], links: { github: "https://github.com/crypto-org-chain", foundation: "https://cronos.org", x: "https://x.com/cronos_chain", visit: "https://cronos.org" }},
          { id: "network-moonbeam", name: "Moonbeam", desc: "Moonbeam is the top Polkadot parachain for EVM-compatible smart contracts, providing W3AI with cross-chain connectivity to the entire Polkadot ecosystem via XCM messaging and access to shared security from the Polkadot relay chain.", bullets: ["Full EVM and Substrate API compatibility for hybrid dApp development.", "XCM messaging for cross-parachain AI agent orchestration.", "Polkadot relay chain shared security model.", "Connected contracts enabling multi-chain logic execution from a single deployment."], links: { github: "https://github.com/moonbeam-foundation", foundation: "https://moonbeam.foundation", x: "https://x.com/MoonbeamNetwork", visit: "https://moonbeam.network" }},
        ].map(n => (
          <section key={n.id} id={n.id} className="py-6">
            <div className="flex items-center flex-wrap gap-4 mb-6">
              <h2 className="text-2xl font-bold text-foreground">{n.name}</h2>
              <div className="flex flex-wrap gap-2">
                <a href={n.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">GitHub</a>
                <a href={n.links.foundation} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">Foundation</a>
                <a href={n.links.x} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">X</a>
                <a href={n.links.visit} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(75,80%,55%)] text-black text-sm font-medium hover:bg-[hsl(75,80%,45%)] transition-colors">Visit ↗</a>
              </div>
            </div>
            <div className="prose-section">
              <p>{n.desc}</p>
              <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
                {n.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          </section>
        ))}
      </div>

      {/* ============================================================ */}
      {/* PAGE 12: Foundations */}
      {/* ============================================================ */}
      <div className={p("foundations")}>
        <section id="foundations">
          <h2 className="text-2xl font-bold text-foreground mb-4">Foundations</h2>
          <div className="prose-section">
            <p>W3AI is built on and integrated with the leading blockchain protocols that power the decentralized web. These foundations provide the secure, scalable infrastructure that enables W3AI's multi-chain AI browser capabilities.</p>
          </div>
        </section>
        {[
          { id: "fi-ethereum", name: "Ethereum", desc: "The world's leading smart contract platform and the foundation of decentralized finance. Ethereum provides the robust security and vibrant developer ecosystem that powers W3AI's core DeFi integrations and institutional-grade infrastructure.", links: { github: "https://github.com/ethereum", foundation: "https://ethereum.foundation", x: "https://x.com/ethereum", visit: "https://ethereum.org" }},
          { id: "fi-solana", name: "Solana", desc: "A high-performance blockchain delivering fast, secure, and scalable crypto apps. Solana's sub-second finality and low transaction costs enable real-time AI agent execution and high-frequency DeFi operations within W3AI.", links: { github: "https://github.com/solana-labs", foundation: "https://solana.org", x: "https://x.com/solana", visit: "https://solana.com" }},
          { id: "fi-bitcoin", name: "Bitcoin", desc: "The original and most secure blockchain network. W3AI integrates Bitcoin for institutional-grade store-of-value capabilities and emerging layer-2 solutions that bridge Bitcoin liquidity into DeFi protocols.", links: { github: "https://github.com/bitcoin", foundation: "https://bitcoin.org/en/bitcoin-core/", x: "https://x.com/bitcoin", visit: "https://bitcoin.org" }},
          { id: "fi-arbitrum", name: "Arbitrum", desc: "A leading Ethereum Layer 2 scaling solution offering ultra-low costs and high throughput. Arbitrum powers W3AI's cost-efficient AI computations and complex smart contract interactions at a fraction of mainnet costs.", links: { github: "https://github.com/OffchainLabs", foundation: "https://arbitrum.foundation", x: "https://x.com/arbitrum", visit: "https://arbitrum.io" }},
          { id: "fi-polygon", name: "Polygon", desc: "A multi-chain ecosystem connecting Ethereum-compatible blockchains. Polygon's zkEVM and PoS chains provide W3AI users with enterprise scalability, regulatory-grade compliance options, and seamless Web2-Web3 bridges.", links: { github: "https://github.com/0xPolygon", foundation: "https://polygon.technology", x: "https://x.com/0xPolygon", visit: "https://polygon.technology" }},
          { id: "fi-cosmos", name: "Cosmos", desc: "The internet of blockchains enabling interoperability between sovereign chains. Cosmos IBC integration allows W3AI to route AI agents and assets across independent blockchain ecosystems with minimal friction.", links: { github: "https://github.com/cosmos", foundation: "https://interchain.io", x: "https://x.com/cosmos", visit: "https://cosmos.network" }},
          { id: "fi-cardano", name: "Cardano", desc: "A research-driven blockchain built on peer-reviewed academic foundations. Cardano brings institutional-grade security and formal verification capabilities that strengthen W3AI's high-assurance DeFi integrations.", links: { github: "https://github.com/cardano-foundation", foundation: "https://cardanofoundation.org", x: "https://x.com/cardano", visit: "https://cardano.org" }},
          { id: "fi-ton", name: "TON", desc: "The Open Network designed for Web3 mass adoption with Telegram integration. TON provides W3AI with seamless access to 800M+ Telegram users and ultra-fast transaction processing for consumer-scale AI applications.", links: { github: "https://github.com/ton-blockchain", foundation: "https://ton.org", x: "https://x.com/ton_blockchain", visit: "https://ton.org" }},
          { id: "fi-tezos", name: "Tezos", desc: "A self-amending blockchain with on-chain governance and formal verification. Tezos integration brings institutional-grade smart contract security and proven tokenization standards to W3AI's asset management layer.", links: { github: "https://github.com/tezos", foundation: "https://tezos.foundation", x: "https://x.com/taboratezos", visit: "https://tezos.com" }},
          { id: "fi-icp", name: "Internet Computer", desc: "A blockchain-based cloud computing platform that hosts smart contracts, data, and entire web applications on-chain. Internet Computer's canister architecture enables W3AI to deploy fully decentralized frontend and backend logic with web-speed performance and infinite scalability.", links: { github: "https://github.com/dfinity", foundation: "https://dfinity.org", x: "https://x.com/dfinity", visit: "https://internetcomputer.org" }},
          { id: "fi-web3-foundation", name: "Web3 Foundation", desc: "The organization behind Polkadot and Kusama, pioneering multi-chain interoperability. Web3 Foundation research and Substrate technology inform W3AI's cross-chain architecture and parachain connectivity roadmap.", links: { github: "https://github.com/nicored", foundation: "https://web3.foundation", x: "https://x.com/Web3foundation", visit: "https://web3.foundation" }},
        ].map(f => (
          <section key={f.id} id={f.id}>
            <div className="flex items-center flex-wrap gap-4 mb-4">
              <h2 className="text-2xl font-bold text-foreground">{f.name}</h2>
              <div className="flex flex-wrap gap-2">
                <a href={f.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">GitHub</a>
                <a href={f.links.foundation} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">Foundation</a>
                <a href={f.links.x} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">X</a>
                <a href={f.links.visit} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(75,80%,55%)] text-black text-sm font-medium hover:bg-[hsl(75,80%,45%)] transition-colors">Visit ↗</a>
              </div>
            </div>
            <div className="prose-section"><p>{f.desc}</p></div>
          </section>
        ))}
      </div>

      {/* ============================================================ */}
      {/* PAGE 13: Community Integrations */}
      {/* ============================================================ */}
      <div className={p("community-integrations")}>
        <section id="community-integrations">
          <h2 className="text-2xl font-bold text-foreground mb-4">Community Integrations Across Solana, Ethereum, and BSC</h2>
          <div className="prose-section">
            <p>W3AI's marketing strategy is authentic community integration. Each chain represents different user psychographics, product norms, and vertical strengths.</p>
          </div>
        </section>
        <section id="solana-community">
          <h2 className="text-2xl font-bold text-foreground mb-4">Solana Community Integrations</h2>
          <div className="prose-section">
            <p>Solana positions itself as a high-performance network enabling fast, secure, affordable transactions. W3AI's Solana strategy focuses on:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>DeFi-first execution: A Solana "Trading Space" merging research, route selection, swap simulation, and post-trade monitoring.</li>
              <li>NFTs and communities as identity: Token-gated browsing modes and "community rooms" built around NFT membership.</li>
              <li>Builder-native distribution: Hackathon sponsorships with 48,000+ developers and $600M+ in venture funding.</li>
            </ul>
          </div>
        </section>
        <section id="ethereum-community">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ethereum Community Integrations</h2>
          <div className="prose-section">
            <p>Ethereum's core superpower is composable dApps. W3AI's Ethereum integrations emphasize:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Transaction clarity and contract literacy at the moment of signing.</li>
              <li>"Explain this transaction" assistance plus standardized warnings.</li>
              <li>Ecosystem-native developer relationships through ETH Global (95+ hackathons, 14,000+ projects).</li>
            </ul>
          </div>
        </section>
        <section id="bsc-community">
          <h2 className="text-2xl font-bold text-foreground mb-4">BSC Community Integrations</h2>
          <div className="prose-section">
            <p>BNB Chain emphasizes scale and mass adoption with daily active user figures (1.2M DAU on BSC, 2.7M on opBNB). W3AI's BSC strategy:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Retail-first simplicity: Optimized onboarding, reduced errors in swaps, bridging, and token discovery.</li>
              <li>DEX-native behaviors: An "execution cockpit" optimized for high-volume habits.</li>
              <li>Memecoins as community onboarding: Treated as a gateway vertical with safety overlay (risk banners, scam detection).</li>
            </ul>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 14: Infrastructure */}
      {/* ============================================================ */}
      <div className={p("infrastructure")}>
        <section id="infrastructure">
          <h2 className="text-2xl font-bold text-foreground mb-4">Infrastructure</h2>
          <div className="prose-section">
            <p>W3AI's infrastructure layer underpins every product surface — from browser AI inference to multi-chain validator operations. The architecture is designed for resilience, scalability, and operational transparency.</p>
          </div>

          {/* Infrastructure Stack Diagram */}
          <div className="my-8 flex justify-center">
            <div className="w-full max-w-2xl">
              <svg viewBox="0 0 600 320" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Stack layers - bottom to top */}
                {[
                  { label: "Blockchain Networks", sub: "Solana · Ethereum · BNB Chain", y: 250, fill: "fill-accent/30" },
                  { label: "Validator & Node Infrastructure", sub: "HSMs · Geo-Distributed · Automated Failover", y: 195, fill: "fill-accent/50" },
                  { label: "Protocol Services", sub: "Bridge · Governance · Treasury · Staking", y: 140, fill: "fill-accent/70" },
                  { label: "Edge Computing & AI Inference", sub: "Low-Latency Routing · Transaction Simulation", y: 85, fill: "fill-card" },
                  { label: "TMRW Browser", sub: "User Interface · Wallet · AI Assistant", y: 30, fill: "fill-card" },
                ].map((layer, i) => (
                  <g key={i}>
                    <rect x="80" y={layer.y} width="440" height="48" rx="6" className={`${layer.fill} stroke-border`} strokeWidth="1.5" />
                    <text x="300" y={layer.y + 22} textAnchor="middle" className="fill-foreground font-bold" fontSize="11">{layer.label}</text>
                    <text x="300" y={layer.y + 37} textAnchor="middle" className="fill-muted-foreground" fontSize="8.5">{layer.sub}</text>
                  </g>
                ))}

                {/* Side label */}
                <text x="45" y="160" textAnchor="middle" className="fill-muted-foreground" fontSize="9" transform="rotate(-90, 45, 160)">MONITORING</text>
                <line x1="60" y1="40" x2="60" y2="290" className="stroke-border" strokeWidth="1" strokeDasharray="4,3" />

                {/* Right side label */}
                <text x="555" y="160" textAnchor="middle" className="fill-muted-foreground" fontSize="9" transform="rotate(90, 555, 160)">SECURITY</text>
                <line x1="540" y1="40" x2="540" y2="290" className="stroke-border" strokeWidth="1" strokeDasharray="4,3" />

                {/* Caption */}
                <text x="300" y="312" textAnchor="middle" className="fill-muted-foreground" fontSize="9" fontStyle="italic">Full-stack infrastructure with monitoring and security at every layer</text>
              </svg>
            </div>
          </div>
        </section>
        <section id="infra-network">
          <h2 className="text-2xl font-bold text-foreground mb-4">Network Architecture</h2>
          <div className="prose-section">
            <p>W3AI's network infrastructure spans three blockchain ecosystems with Solana as the canonical mint and hub chain. Transactions occur through the cross-chain architecture described in Chapter 07. Backend services are distributed across geo-redundant infrastructure with edge computing for latency-sensitive operations such as AI inference routing and real-time transaction simulation.</p>
          </div>
        </section>
        <section id="infra-security">
          <h2 className="text-2xl font-bold text-foreground mb-4">Security & Custody</h2>
          <div className="prose-section">
            <p>Security is implemented at every layer: smart contract audits (Hacken), wallet-level security intelligence, browser sandboxing, and infrastructure-level protections. Key security measures include:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Smart contract security: Third-party audits, formal verification where applicable, and bug bounty programs.</li>
              <li>Operational security: Hardware security modules (HSMs), multi-party computation (MPC) for key management.</li>
              <li>Browser security: Isolated profiles, agent permission boundaries, transaction simulation before signing.</li>
              <li>Incident response: Documented playbooks, 24/7 monitoring, and rapid response protocols.</li>
            </ul>
          </div>
        </section>
        <section id="infra-monitoring">
          <h2 className="text-2xl font-bold text-foreground mb-4">Monitoring & Operations</h2>
          <div className="prose-section">
            <p>Validator and infrastructure operations require relentless operational discipline. W3AI implements comprehensive monitoring across all network participants:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Validator health: Uptime monitoring, attestation performance, and slashing risk alerts.</li>
              <li>Network metrics: Cross-chain bridge volumes, liquidity pool depths, and fee generation tracking.</li>
              <li>Treasury dashboards: Real-time visibility into treasury composition, runway, and yield performance.</li>
              <li>User-facing status: Public status pages for browser services, AI gateway availability, and network health.</li>
            </ul>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 15: Cybersecurity */}
      {/* ============================================================ */}
      <div className={p("security")}>
        <section id="security">
          <h2 className="text-2xl font-bold text-foreground mb-4">Cybersecurity</h2>
          <div className="prose-section">
            <p>Security is the non-negotiable foundation of every W3AI product surface. In an era where AI agents execute financial transactions, interact with smart contracts, and manage digital identities on behalf of users, the attack surface has expanded beyond traditional cybersecurity models. W3AI treats security not as a feature layer but as an architectural primitive — embedded at every level from browser runtime to on-chain execution.</p>
          </div>
        </section>
        <section id="security-network">
          <h2 className="text-2xl font-bold text-foreground mb-4">Network Security</h2>
          <div className="prose-section">
            <p>W3AI's network security model spans three blockchain ecosystems — each with distinct consensus mechanisms, validator economics, and threat profiles. The protocol implements defense-in-depth across all layers:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Validator hardening: Hardware security modules (HSMs), geo-distributed infrastructure, and automated failover to prevent single points of failure.</li>
              <li>Node isolation: Dedicated validator nodes with restricted network access, DDoS mitigation, and encrypted peer-to-peer communication channels.</li>
              <li>Consensus monitoring: Real-time attestation tracking, slashing risk alerts, and automated response protocols for consensus anomalies.</li>
              <li>Bridge security: Wormhole NTT burn-and-mint model eliminates locked-token attack vectors. Per-chain rate limits contain blast radius in the event of bridge compromise.</li>
            </ul>
          </div>
        </section>
        <section id="security-blockchain">
          <h2 className="text-2xl font-bold text-foreground mb-4">Blockchain Security</h2>
          <div className="prose-section">
            <p>Smart contract security is enforced through a multi-layered audit and verification pipeline. Every contract deployed within the W3AI ecosystem undergoes rigorous pre-deployment and post-deployment security processes:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Third-party audits: Hacken conducts comprehensive smart contract audits covering logic vulnerabilities, reentrancy attacks, integer overflows, and access control flaws.</li>
              <li>Formal verification: Critical contract paths — token minting, governance execution, and bridge operations — are formally verified where applicable.</li>
              <li>Bug bounty programs: Continuous community-driven vulnerability discovery with tiered rewards based on severity classification.</li>
              <li>Upgrade governance: All contract upgrades require multi-sig approval with time-lock periods, ensuring no single actor can modify live contracts unilaterally.</li>
              <li>Supply integrity enforcement: Automated cross-chain reconciliation checks verify that the total W3AI supply across all deployed chains equals the canonical 2,000,000,000 at every block.</li>
            </ul>
          </div>
        </section>
        <section id="security-defi">
          <h2 className="text-2xl font-bold text-foreground mb-4">DeFi Security</h2>
          <div className="prose-section">
            <p>Decentralized finance introduces unique security challenges — flash loan attacks, oracle manipulation, liquidity pool exploits, and MEV extraction. W3AI addresses these through purpose-built safeguards integrated into the browser and protocol layers:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Transaction simulation: Every swap, stake, or liquidity provision is simulated before signing. Users see exactly what they will receive, what fees apply, and whether the transaction path contains anomalies.</li>
              <li>MEV protection: W3AI integrates private transaction relays and MEV-aware routing to shield users from sandwich attacks and front-running on Ethereum and BSC.</li>
              <li>Oracle integrity: Price feeds are sourced from multiple decentralized oracles with outlier detection. Stale or manipulated price data triggers automatic circuit breakers.</li>
              <li>Liquidity risk monitoring: Real-time pool depth analysis, impermanent loss estimation, and concentration risk alerts are surfaced directly in the browser interface.</li>
            </ul>
          </div>
        </section>
        <section id="security-defai">
          <h2 className="text-2xl font-bold text-foreground mb-4">DeFAI Security</h2>
          <div className="prose-section">
            <p>DeFAI (Decentralized Finance + AI) represents the emerging convergence where AI agents autonomously interact with DeFi protocols. This creates a novel attack surface that traditional security models are not designed to address:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Agent permission boundaries: AI agents operate within strictly defined permission scopes. No agent can initiate transactions, sign messages, or modify wallet state without explicit user authorization.</li>
              <li>Prompt injection defense: All AI agent inputs are sanitized and validated against injection patterns designed to bypass permission boundaries or manipulate agent behavior.</li>
              <li>Action verification: Every AI-recommended action is translated into a human-readable summary with risk assessment before user confirmation. "Explain before execute" is enforced at the protocol level.</li>
              <li>Audit trails: Complete logs of all AI agent actions, recommendations, and user approvals are maintained for forensic analysis and compliance reporting.</li>
            </ul>
          </div>
        </section>
        <section id="security-ai">
          <h2 className="text-2xl font-bold text-foreground mb-4">AI Security</h2>
          <div className="prose-section">
            <p>As AI becomes deeply integrated into financial infrastructure, protecting the AI layer itself becomes critical. W3AI implements comprehensive AI security measures across the inference pipeline:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Model integrity: AI inference is routed through verified, versioned model endpoints. Users can audit which model version processed their request.</li>
              <li>Data privacy: User queries, wallet data, and transaction context are processed with strict data isolation. No user data is used for model training or shared across sessions.</li>
              <li>Adversarial robustness: AI models are tested against adversarial inputs designed to produce harmful, misleading, or manipulative outputs in financial contexts.</li>
              <li>Hallucination mitigation: Financial data, token prices, and protocol parameters are sourced from verified on-chain data. AI outputs are cross-referenced against ground truth before presentation to users.</li>
            </ul>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 16: Auditing */}
      {/* ============================================================ */}
      <div className={p("auditing")}>
        <section id="auditing">
          <h2 className="text-2xl font-bold text-foreground mb-4">Auditing</h2>
          <div className="prose-section">
            <p>W3AI maintains a rigorous auditing framework that spans both technical infrastructure and financial operations. Auditing is not a one-time event but a continuous process embedded into the protocol's operational lifecycle — ensuring accountability, transparency, and regulatory compliance across all jurisdictions where W3AI operates.</p>
          </div>
        </section>
        <section id="auditing-smart-contract">
          <h2 className="text-2xl font-bold text-foreground mb-4">3rd Party Smart Contract Auditing</h2>
          <div className="prose-section">
            <p>All W3AI smart contracts undergo comprehensive third-party security audits conducted by <a href="https://hacken.io" target="_blank" rel="noopener noreferrer" className="text-[hsl(82,85%,55%)] hover:underline">Hacken.io</a>, a leading blockchain security firm with a proven track record across 1,500+ projects and $200B+ in secured digital assets.</p>
            <p>The audit process covers the complete smart contract lifecycle:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Pre-deployment code review: Line-by-line analysis of all smart contract code for logic errors, reentrancy vulnerabilities, integer overflow/underflow, and access control weaknesses.</li>
              <li>Automated vulnerability scanning: Industry-standard tools (Slither, Mythril, Echidna) complement manual review to ensure comprehensive coverage.</li>
              <li>Formal verification: Critical contract paths — including token minting, bridge operations, and governance execution — undergo formal mathematical verification where applicable.</li>
              <li>Tokenomics audit: Independent validation of supply mechanics, vesting schedules, burn mechanisms, and treasury allocation logic to ensure alignment with published parameters.</li>
              <li>Post-deployment monitoring: Continuous on-chain surveillance for anomalous contract behavior, unauthorized access patterns, and supply integrity deviations.</li>
              <li>Re-audit cycles: All major contract upgrades trigger mandatory re-audit before deployment. Audit reports are published publicly for community verification.</li>
            </ul>
          </div>
        </section>
        <section id="auditing-financial">
          <h2 className="text-2xl font-bold text-foreground mb-4">Financial Auditing</h2>
          <div className="prose-section">
            <p>W3AI maintains dual-jurisdiction financial auditing standards to satisfy regulatory requirements in both Canada and Liechtenstein — the two primary regulatory environments under which the project operates.</p>
            <h4 className="text-lg font-semibold text-foreground mt-6 mb-3">🇨🇦 Canada</h4>
            <p>Financial auditing in Canada follows Canadian Auditing Standards (CAS), which are aligned with International Standards on Auditing (ISA). W3AI's Canadian financial compliance framework includes:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Annual financial statement audits conducted by a CPA-licensed audit firm in accordance with CAS and International Financial Reporting Standards (IFRS).</li>
              <li>FINTRAC compliance: Registration and ongoing reporting obligations under Canada's Proceeds of Crime (Money Laundering) and Terrorist Financing Act (PCMLTFA), including suspicious transaction reporting (STR) and large cash transaction reporting.</li>
              <li>Securities compliance: Adherence to applicable Canadian Securities Administrators (CSA) guidance on crypto-asset trading platforms and token classifications.</li>
              <li>Tax reporting: Compliance with Canada Revenue Agency (CRA) requirements for digital asset transactions, including capital gains reporting and GST/HST treatment.</li>
            </ul>
            <h4 className="text-lg font-semibold text-foreground mt-6 mb-3">🇱🇮 Liechtenstein</h4>
            <p>Liechtenstein provides one of the most comprehensive regulatory frameworks for blockchain and token economies through the Token and Trusted Technology Service Provider Act (TVTG), commonly known as the "Blockchain Act." W3AI's Liechtenstein compliance framework includes:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>TVTG registration: Compliance with the Blockchain Act's requirements for token generation, storage, and transfer services, overseen by the Financial Market Authority (FMA).</li>
              <li>Annual financial audits conducted in accordance with Liechtenstein audit standards and International Financial Reporting Standards (IFRS) by an FMA-approved audit firm.</li>
              <li>AML/KYC compliance: Adherence to Liechtenstein's Due Diligence Act (SPG) and EU Anti-Money Laundering Directives, including ongoing transaction monitoring and customer due diligence.</li>
              <li>MiCA readiness: Proactive alignment with the EU's Markets in Crypto-Assets Regulation (MiCA), ensuring seamless compliance as pan-European requirements take effect.</li>
              <li>Token classification documentation: Formal legal opinions on token classification under the TVTG's "container model," which treats tokens as digital containers that can represent various rights and assets.</li>
            </ul>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 17: Market Opportunity */}
      {/* ============================================================ */}
      <div className={p("market-opportunity")}>
        <section id="market-opportunity">
          <h2 className="text-2xl font-bold text-foreground mb-4">Market Opportunity</h2>
          <div className="prose-section">
            <p><strong>Web3 Adoption.</strong> Crypto adoption is measured in hundreds of millions globally. Global crypto owners grew from 659 million (end of 2024) to 741 million in 2025. Active stablecoin addresses increased from 19.6 million to 30 million from Feb 2024 to Feb 2025. This is the user base that needs a safer, simpler "front door" into Web3 — and the TMRW Browser is positioned to serve that need.</p>
            <p><strong>Tokenization.</strong> Real-world asset tokenization is projected to become a multi-trillion-dollar market within the next decade. The infrastructure gap — estimated at $15T by 2040 — creates immediate demand for platforms that can bridge physical assets with digital rails. W3AI's browser-native RWA marketplace provides the discovery, verification, and management layer that institutional and retail investors require.</p>
            <p><strong>AI + Finance Convergence.</strong> The convergence of AI and financial services is creating new categories of products that did not exist 18 months ago. AI browsers (Perplexity Comet, OpenAI Atlas) validate the browser as the primary AI surface. W3AI's differentiation — treating AI agent permissions and wallet permissions as a single security domain — positions it uniquely at the intersection of these two megatrends.</p>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 18: W3AI Tokenomics (merged: Token Utility + Tokenomics) */}
      {/* ============================================================ */}
      <div className={p("token-utility")}>
        <section id="token-utility">
          <h2 className="text-2xl font-bold text-foreground mb-4">W3AI Tokenomics</h2>
          <div className="prose-section">
            <p>The W3AI token is the native utility and governance token powering the entire W3AI ecosystem. This section covers token utility, supply mechanics, and economic design.</p>
          </div>

          {/* Token Flow Diagram */}
          <div className="my-8 flex justify-center">
            <div className="w-full max-w-2xl">
              <svg viewBox="0 0 600 310" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Revenue sources at top */}
                {[
                  { label: "AI Gateway", sub: "Inference Fees", x: 100 },
                  { label: "Swaps", sub: "Convenience Fee", x: 250 },
                  { label: "Premium", sub: "Browser Features", x: 400 },
                  { label: "Validators", sub: "Network Yield", x: 530 },
                ].map((src, i) => (
                  <g key={i}>
                    <rect x={src.x - 55} y={15} width={110} height={42} rx="6" className="fill-card stroke-border" strokeWidth="1.5" />
                    <text x={src.x} y={33} textAnchor="middle" className="fill-foreground font-bold" fontSize="10">{src.label}</text>
                    <text x={src.x} y={47} textAnchor="middle" className="fill-muted-foreground" fontSize="8">{src.sub}</text>
                  </g>
                ))}

                {/* Arrows down to treasury */}
                {[100, 250, 400, 530].map((x, i) => (
                  <g key={i}>
                    <line x1={x} y1={57} x2={300} y2={110} className="stroke-muted-foreground" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
                  </g>
                ))}

                {/* Treasury - central */}
                <rect x="195" y={110} width="210" height={55} rx="10" className="fill-accent stroke-border" strokeWidth="2" />
                <text x="300" y={134} textAnchor="middle" className="fill-foreground font-bold" fontSize="13">W3AI Treasury</text>
                <text x="300" y={152} textAnchor="middle" className="fill-muted-foreground" fontSize="9">On-Chain · DAO-Governed · 52.5%</text>

                {/* Arrows down from treasury */}
                {[140, 300, 460].map((x, i) => (
                  <g key={i}>
                    <line x1={300} y1={165} x2={x} y2={205} className="stroke-muted-foreground" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
                    <polygon points={`${x},208 ${x-4},200 ${x+4},200`} className="fill-muted-foreground" opacity="0.6" />
                  </g>
                ))}

                {/* Outflows */}
                {[
                  { label: "Development", sub: "Protocol · Browser", x: 140 },
                  { label: "Rewards", sub: "Staking · Incentives", x: 300 },
                  { label: "Burns", sub: "Deflationary Pressure", x: 460 },
                ].map((out, i) => (
                  <g key={i}>
                    <rect x={out.x - 60} y={210} width={120} height={42} rx="6" className="fill-card stroke-border" strokeWidth="1.5" />
                    <text x={out.x} y={228} textAnchor="middle" className="fill-foreground font-bold" fontSize="10">{out.label}</text>
                    <text x={out.x} y={242} textAnchor="middle" className="fill-muted-foreground" fontSize="8">{out.sub}</text>
                  </g>
                ))}

                {/* Caption */}
                <text x="300" y={290} textAnchor="middle" className="fill-muted-foreground" fontSize="9" fontStyle="italic">Revenue flows transparently through on-chain treasury mechanisms</text>
              </svg>
            </div>
          </div>
        </section>
        <section id="token-pillars">
          <h2 className="text-2xl font-bold text-foreground mb-4">Token Utility Pillars</h2>
          <div className="prose-section">
            <p>W3AI token utility is designed around four demand drivers:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Browser-native access: Premium browser features and AI workflows.</li>
              <li>Open Gateway AI spend: Token-based credits fund inference and routing.</li>
              <li>Network incentives: Validators and application service operators are rewarded.</li>
              <li>Governance: Treasury policy, supported chains, fee parameters, and security thresholds.</li>
            </ul>
          </div>
        </section>
        <section id="tokenomics">
          <h2 className="text-2xl font-bold text-foreground mb-4">Tokenomics Design</h2>
          <div className="prose-section">
            <p>W3AI is a monetized execution environment (the browser) backed by a decentralized service layer. Tokenomics satisfies three investor-grade requirements:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Sustained Demand Drivers: Token needed for recurring consumption or privileged access.</li>
              <li>Credible Supply Integrity: Prevent "double supply" and bridge-driven inflation across chains.</li>
              <li>Transparent Revenue Routing: Token flows (fees, margins, rewards, burns) are explicit and auditable.</li>
            </ul>
          </div>
        </section>
        <section id="supply-allocations">
          <h2 className="text-2xl font-bold text-foreground mb-4">Supply, Allocations & Lockups</h2>
          <div className="prose-section">
            <p>Total Supply: Initial minting: 2,000,000,000 W3AI tokens (2B).</p>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Allocation</th>
                    <th className="text-right px-4 py-3 font-semibold text-foreground">Tokens</th>
                    <th className="text-right px-4 py-3 font-semibold text-foreground">Share</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Lock Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["Private Round", "200,000,000", "10%", "No"],
                    ["Private Pre-Sale", "200,000,000", "10%", "Yes"],
                    ["Seed Round", "200,000,000", "10%", "Yes"],
                    ["IDO / TGE", "200,000,000", "10%", "No"],
                    ["Team & Advisors", "200,000,000", "10%", "Yes"],
                    ["Rewards / Incentives", "50,000,000", "2.5%", "No"],
                    ["Treasury / Foundation", "1,150,000,000", "52.5%", "Yes"],
                  ].map(([a, t, s, l]) => (
                    <tr key={a} className="hover:bg-muted/50">
                      <td className="px-4 py-2.5 text-foreground">{a}</td>
                      <td className="px-4 py-2.5 text-right text-muted-foreground">{t}</td>
                      <td className="px-4 py-2.5 text-right text-muted-foreground">{s}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{l}</td>
                    </tr>
                  ))}
                  <tr className="bg-muted/70 font-semibold">
                    <td className="px-4 py-2.5 text-foreground">Total</td>
                    <td className="px-4 py-2.5 text-right text-foreground">2,000,000,000</td>
                    <td className="px-4 py-2.5 text-right text-foreground">100%</td>
                    <td className="px-4 py-2.5">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">Vesting & Lockup Summary:</strong> Team & Advisor tokens are subject to a 12-month cliff followed by 24-month linear vesting. Treasury tokens are governed by DAO proposal and release schedule. Pre-Sale and Seed Round tokens include 6-month cliff with 18-month vesting.</p>
            </div>
          </div>
        </section>
        <section id="sale-rounds">
          <h2 className="text-2xl font-bold text-foreground mb-4">Sale Rounds & Pricing</h2>
          <div className="prose-section">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Round</th>
                    <th className="text-right px-4 py-3 font-semibold text-foreground">Price</th>
                    <th className="text-right px-4 py-3 font-semibold text-foreground">Reserved Allocation</th>
                    <th className="text-right px-4 py-3 font-semibold text-foreground">FDV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["Private Round", "$0.003", "200,000,000", "$6,000,000"],
                    ["Private Pre-Sale", "$0.005", "200,000,000", "$10,000,000"],
                    ["Seed Round", "$0.008", "200,000,000", "$16,000,000"],
                    ["IDO / TGE", "$0.01", "200,000,000", "$20,000,000"],
                  ].map(([r, pr, ra, f]) => (
                    <tr key={r} className="hover:bg-muted/50">
                      <td className="px-4 py-2.5 text-foreground">{r}</td>
                      <td className="px-4 py-2.5 text-right text-muted-foreground">{pr}</td>
                      <td className="px-4 py-2.5 text-right text-muted-foreground">{ra}</td>
                      <td className="px-4 py-2.5 text-right text-muted-foreground">{f}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-muted-foreground italic">Disclosure: Round token amounts represent reserved allocations. Actual sold amount may be lower depending on round caps and demand.</p>
          </div>
        </section>
        <section id="staking-tiers">
          <h2 className="text-2xl font-bold text-foreground mb-4">Staking Tiers</h2>
          <div className="prose-section">
            <p>W3AI implements a tiered staking model that aligns token lockup with ecosystem access. Higher staking tiers unlock premium features, enhanced AI capabilities, and increased governance weight.</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Explorer Tier: Basic browser access and standard AI assistant functionality.</li>
              <li>Builder Tier: Enhanced AI capabilities, priority inference routing, and developer tools access.</li>
              <li>Validator Tier: Full governance rights, maximum AI allocation, and validator delegation eligibility.</li>
            </ul>
          </div>
        </section>
        <section id="deflationary-mechanics">
          <h2 className="text-2xl font-bold text-foreground mb-4">Deflationary Mechanics</h2>
          <div className="prose-section">
            <p>W3AI implements systematic supply reduction through multiple burn mechanisms tied to protocol revenue:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Open Gateway burn: A percentage of AI inference fees collected through the Open Gateway is used to buy back and burn W3AI tokens.</li>
              <li>Swap fee burn: A portion of in-browser swap convenience fees is allocated to token burns.</li>
              <li>Premium feature burn: Revenue from premium browser features contributes to deflationary pressure.</li>
            </ul>
          </div>
        </section>
        <section id="byok-gateway">
          <h2 className="text-2xl font-bold text-foreground mb-4">BYOK vs Open Gateway</h2>
          <div className="prose-section">
            <p>BYOK (Bring Your Own Key): User provides their own API key for their chosen LLM.</p>
            <p>Open Gateway: Token-billed usage with user-controlled caps, designed 30% margin.</p>
          </div>
        </section>
        <section id="swaps-fee">
          <h2 className="text-2xl font-bold text-foreground mb-4">Swaps & Convenience Fee</h2>
          <div className="prose-section">
            <p>W3AI's plan includes in-browser swaps with a transparent convenience fee that accrues to treasury. If implemented using the Changelly Exchange API, Changelly's API extra fee shall not exceed 2% per transaction for API Partner referrals.</p>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 19: W3AI Governance */}
      {/* ============================================================ */}
      <div className={p("governance")}>
        <section id="governance">
          <h2 className="text-2xl font-bold text-foreground mb-4">W3AI Governance</h2>
          <div className="prose-section">
            <p>W3AI is designed to evolve from core-team-led to fully community-governed. The governance framework establishes transparent decision-making processes for treasury management, protocol upgrades, and ecosystem development.</p>
          </div>

          {/* Governance Lifecycle Diagram */}
          <div className="my-8 flex justify-center">
            <div className="w-full max-w-2xl">
              <svg viewBox="0 0 600 160" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Steps */}
                {[
                  { label: "Discussion", sub: "Community", x: 75 },
                  { label: "Proposal", sub: "Formal Submit", x: 225 },
                  { label: "Voting", sub: "Token-Weighted", x: 375 },
                  { label: "Execution", sub: "On-Chain", x: 525 },
                ].map((step, i) => (
                  <g key={i}>
                    <rect x={step.x - 60} y={30} width={120} height={55} rx="8" className="fill-card stroke-border" strokeWidth="1.5" />
                    <text x={step.x} y={54} textAnchor="middle" className="fill-foreground font-bold" fontSize="12">{step.label}</text>
                    <text x={step.x} y={72} textAnchor="middle" className="fill-muted-foreground" fontSize="9">{step.sub}</text>
                    {/* Step number */}
                    <circle cx={step.x - 48} cy={36} r="8" className="fill-accent stroke-border" strokeWidth="1" />
                    <text x={step.x - 48} y={40} textAnchor="middle" className="fill-foreground" fontSize="8" fontWeight="bold">{i + 1}</text>
                  </g>
                ))}

                {/* Arrows between steps */}
                {[150, 300, 450].map((x, i) => (
                  <g key={i}>
                    <line x1={x - 10} y1={57} x2={x + 10} y2={57} className="stroke-muted-foreground" strokeWidth="1.5" />
                    <polygon points={`${x + 14},57 ${x + 6},53 ${x + 6},61`} className="fill-muted-foreground" />
                  </g>
                ))}

                {/* Safeguards bar below */}
                <rect x="75" y={105} width="450" height={28} rx="5" className="fill-accent/30 stroke-border" strokeWidth="1" />
                <text x="300" y={123} textAnchor="middle" className="fill-muted-foreground" fontSize="9">Safeguards: Time-Locks · Quorum Requirements · Multi-Sig Execution · Cross-Chain Aggregation</text>

                {/* Caption */}
                <text x="300" y={155} textAnchor="middle" className="fill-muted-foreground" fontSize="9" fontStyle="italic">Progressive decentralization: core-team-led → fully community-governed</text>
              </svg>
            </div>
          </div>
        </section>
        <section id="foundation-governance">
          <h2 className="text-2xl font-bold text-foreground mb-4">Governance Framework</h2>
          <div className="prose-section">
            <p>Token holders participate in decisions covering treasury policy, supported chains, fee parameters, and security thresholds.</p>
            <p>Governance proposals follow a structured lifecycle: discussion → formal proposal → voting → execution. Voting power is proportional to staked W3AI tokens, with safeguards against governance attacks including time-locks, quorum requirements, and multi-sig execution.</p>
          </div>
        </section>
        <section id="foundation-treasury">
          <h2 className="text-2xl font-bold text-foreground mb-4">Treasury Management</h2>
          <div className="prose-section">
            <p>With a treasury-heavy allocation (52.5% of total supply), institutional-quality custody, reporting, and governance controls are essential. The W3AI treasury operates under explicit mandates:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Custody: Multi-signature wallets with time-locked transactions and independent custodian oversight.</li>
              <li>Reporting: Quarterly transparency reports covering treasury balances, disbursements, and yield generation.</li>
              <li>Diversification: Treasury assets held across stablecoins, protocol-native tokens, and yield-bearing positions.</li>
              <li>Runway management: Minimum 18-month operational runway maintained at all times.</li>
            </ul>
          </div>
        </section>
        <section id="foundation-compliance">
          <h2 className="text-2xl font-bold text-foreground mb-4">Regulatory Compliance</h2>
          <div className="prose-section">
            <p>W3AI is designed to be capital-ready from day one. The regulatory framework includes jurisdiction-specific legal opinions, token classification analysis, and ongoing monitoring of regulatory developments across key markets.</p>
            <p>The foundation maintains relationships with legal counsel in major jurisdictions and implements compliance controls including KYC/AML for applicable token sale rounds, sanctions screening, and geographic restrictions where required by law.</p>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 20: Validator Yield & Staking */}
      {/* ============================================================ */}
      <div className={p("validator-yield")}>
        <section id="validator-yield">
          <h2 className="text-2xl font-bold text-foreground mb-4">Validator Yield & Staking Economics</h2>
          <div className="prose-section">
            <p>Validator operations generate protocol-native rewards and must be managed with relentless operational discipline. W3AI operates validator infrastructure across Ethereum, BNB Smart Chain, and Solana — three networks with fundamentally different consensus mechanisms, reward structures, and risk profiles.</p>
            <p>The multi-chain staking strategy serves two critical objectives: (1) generating sustainable treasury yield that funds protocol development, and (2) deepening W3AI's integration with core network infrastructure, giving the protocol direct participation in block production and governance across each chain.</p>
            <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">Staking Strategy Principles</h4>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li><strong className="text-foreground">Diversified Yield:</strong> Spread validator operations across chains to minimize single-network risk and capture differentiated reward profiles.</li>
              <li><strong className="text-foreground">Operational Excellence:</strong> Maintain 99.9%+ uptime across all validator nodes with redundant infrastructure and automated failover.</li>
              <li><strong className="text-foreground">Compounding Returns:</strong> Auto-restake rewards to maximize compounding yield across all validator positions.</li>
              <li><strong className="text-foreground">Slashing Protection:</strong> Multi-layer safeguards including remote signing, key management, and anti-slashing middleware.</li>
              <li><strong className="text-foreground">Community Delegation:</strong> W3AI token holders can delegate to W3AI-operated validators, earning proportional rewards while strengthening network security.</li>
            </ul>
          </div>

          {/* Cross-Chain Staking Architecture Diagram */}
          <div className="my-8 flex justify-center">
            <div className="w-full max-w-3xl">
              <svg viewBox="0 0 720 420" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Title */}
                <text x="360" y="24" textAnchor="middle" className="fill-foreground font-bold" fontSize="14">Cross-Chain Validator Architecture</text>

                {/* Central Hub */}
                <rect x="220" y="40" width="280" height="75" rx="12" className="fill-card stroke-[hsl(82,85%,55%)]" strokeWidth="2" />
                <text x="360" y="65" textAnchor="middle" className="fill-foreground font-bold" fontSize="14">W3AI Treasury</text>
                <text x="360" y="82" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Multi-Sig · Yield Aggregation</text>
                <text x="360" y="96" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Auto-Compound · DAO-Governed</text>

                {/* Three Chain Boxes */}
                {[
                  { x: 60, label: "Ethereum", sub: "PoS Beacon Chain", color: "hsl(220,80%,60%)", stake: "32 ETH / node", apy: "3.5–4.5% APY" },
                  { x: 280, label: "BNB Smart Chain", sub: "PoSA Consensus", color: "hsl(45,95%,55%)", stake: "2,000 BNB min", apy: "2.5–5.0% APY" },
                  { x: 500, label: "Solana", sub: "PoH + Tower BFT", color: "hsl(280,75%,60%)", stake: "No minimum", apy: "6.5–8.0% APY" },
                ].map((chain, i) => (
                  <g key={i}>
                    {/* Connection line from hub */}
                    <line x1="360" y1="115" x2={chain.x + 90} y2="160" className="stroke-muted-foreground/40" strokeWidth="1.5" strokeDasharray="4,3" />
                    <polygon points={`${chain.x + 90},160 ${chain.x + 85},152 ${chain.x + 95},152`} className="fill-muted-foreground/40" />

                    {/* Chain card */}
                    <rect x={chain.x} y="165" width="180" height="95" rx="8" className="fill-card stroke-border" strokeWidth="1.5" />
                    <rect x={chain.x} y="165" width="180" height="28" rx="8" fill={chain.color} fillOpacity="0.15" />
                    <rect x={chain.x} y="185" width="180" height="8" fill="transparent" />
                    <text x={chain.x + 90} y="183" textAnchor="middle" className="fill-foreground font-bold" fontSize="11">{chain.label}</text>
                    <text x={chain.x + 90} y="210" textAnchor="middle" className="fill-muted-foreground" fontSize="9">{chain.sub}</text>
                    <text x={chain.x + 90} y="228" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">{chain.stake}</text>
                    <text x={chain.x + 90} y="248" textAnchor="middle" fontSize="10" fill={chain.color} fontWeight="bold">{chain.apy}</text>
                  </g>
                ))}

                {/* Reward Flow section */}
                {[
                  { x: 60, items: ["Block Rewards", "MEV Tips", "Priority Fees"] },
                  { x: 280, items: ["Tx Fee Share", "Delegation Comm.", "Cross-Chain Relay"] },
                  { x: 500, items: ["Inflation Rewards", "Vote Credits", "Jito MEV Tips"] },
                ].map((col, ci) => (
                  <g key={ci}>
                    <line x1={col.x + 90} y1="260" x2={col.x + 90} y2="280" className="stroke-muted-foreground/30" strokeWidth="1" />
                    <rect x={col.x + 10} y="282" width="160" height="65" rx="6" className="fill-accent/20 stroke-border" strokeWidth="1" />
                    <text x={col.x + 90} y="298" textAnchor="middle" className="fill-muted-foreground" fontSize="8" fontWeight="bold">REWARD SOURCES</text>
                    {col.items.map((item, ii) => (
                      <text key={ii} x={col.x + 90} y={313 + ii * 12} textAnchor="middle" className="fill-muted-foreground" fontSize="8">• {item}</text>
                    ))}
                  </g>
                ))}

                {/* Bottom aggregation bar */}
                <rect x="60" y="365" width="600" height="35" rx="6" className="fill-card stroke-[hsl(82,85%,55%)]" strokeWidth="1.5" />
                <text x="360" y="380" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Yield Routing</text>
                <text x="360" y="393" textAnchor="middle" className="fill-muted-foreground" fontSize="8">60% Auto-Compound · 25% Treasury Reserve · 10% Community Rewards · 5% Operations</text>

                {/* Arrows up to aggregation */}
                {[150, 370, 590].map((x, i) => (
                  <g key={i}>
                    <line x1={x} y1="347" x2={x} y2="365" className="stroke-muted-foreground/30" strokeWidth="1" strokeDasharray="3,2" />
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </section>

        <section id="eth-validators">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ethereum Validators</h2>
          <div className="prose-section">
            <p>Ethereum's Proof-of-Stake consensus requires each validator to deposit exactly 32 ETH and run three software clients: execution (Geth/Nethermind), consensus (Prysm/Lighthouse), and validator client. This tri-client architecture ensures network resilience through client diversity.</p>
            <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">Validator Economics</h4>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li><strong className="text-foreground">Base Yield:</strong> 3.5–4.5% APY from attestation duties, block proposals, and sync committee participation. Yield inversely correlates with total network stake.</li>
              <li><strong className="text-foreground">MEV Revenue:</strong> Additional 0.5–1.5% yield through MEV-Boost relay integration (Flashbots, bloXroute), capturing priority fee auctions and arbitrage opportunities.</li>
              <li><strong className="text-foreground">Withdrawal Mechanics:</strong> Post-Shanghai, partial withdrawals (excess over 32 ETH) auto-sweep every ~5 days. Full exits require the validator exit queue.</li>
              <li><strong className="text-foreground">Slashing Risk:</strong> Double-voting or surround-voting results in immediate slashing (minimum 1/32 of staked ETH) plus correlation penalties. W3AI mitigates this with dedicated signing infrastructure and client diversity.</li>
            </ul>
            <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">W3AI Ethereum Validator Setup</h4>
            <p>W3AI targets operation of 5–10 Ethereum validators (160–320 ETH committed), distributed across multiple cloud regions with bare-metal failover nodes. Remote signing via Web3Signer ensures private keys never reside on validator machines, and anti-slashing databases are replicated across geographies.</p>
          </div>
        </section>

        <section id="bsc-validators">
          <h2 className="text-2xl font-bold text-foreground mb-4">BSC Validators</h2>
          <div className="prose-section">
            <p>BNB Smart Chain operates on Proof-of-Staked-Authority (PoSA), a hybrid consensus combining delegated proof-of-stake with proof-of-authority. The active validator set is limited to 45 validators, selected daily based on total delegation — making validator slot competition intense.</p>
            <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">Validator Economics</h4>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li><strong className="text-foreground">Self-Delegation:</strong> Minimum 2,000 BNB self-delegation required. Higher self-delegation improves ranking for active set selection.</li>
              <li><strong className="text-foreground">Block Rewards:</strong> Validators earn transaction fees from blocks they produce. BSC's 3-second block time means high transaction throughput translates directly to fee revenue.</li>
              <li><strong className="text-foreground">Commission Structure:</strong> Validators set a commission rate (typically 5–15%) on delegator rewards. Competitive commission rates attract more delegation, improving active set ranking.</li>
              <li><strong className="text-foreground">Slashing & Jailing:</strong> Downtime triggers jailing (temporary removal from active set). Double-signing results in 10,000 BNB slashing and permanent jailing. Low self-delegation below 2,000 BNB triggers auto-jailing.</li>
              <li><strong className="text-foreground">Cross-Chain Revenue:</strong> BSC validators also participate in cross-chain relay operations between BSC and BNB Beacon Chain, earning relay fees.</li>
            </ul>
            <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">W3AI BSC Validator Strategy</h4>
            <p>W3AI aims to secure an active validator slot through competitive self-delegation and community delegation campaigns. The BSC validator doubles as infrastructure for W3AI's DeFi operations on PancakeSwap, enabling deeper protocol integration with BSC's DeFi ecosystem.</p>
          </div>
        </section>

        <section id="sol-validators">
          <h2 className="text-2xl font-bold text-foreground mb-4">Solana Validators</h2>
          <div className="prose-section">
            <p>Solana validators form the backbone of the network, participating in both consensus (Tower BFT) and data availability (Turbine block propagation). Unlike Ethereum and BSC, Solana has no minimum stake requirement — but hardware requirements are substantial, demanding high-performance servers with NVMe storage and high-bandwidth connectivity.</p>
            <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">Validator Economics</h4>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li><strong className="text-foreground">Inflation Rewards:</strong> Solana's current inflation rate (~5.5%, decreasing 15% annually toward 1.5% terminal rate) distributes rewards to validators proportional to their stake weight and vote credit performance.</li>
              <li><strong className="text-foreground">Vote Credits:</strong> Validators earn vote credits by correctly voting on blocks. Higher credit scores attract more delegated stake, creating a positive feedback loop for well-operated validators.</li>
              <li><strong className="text-foreground">Transaction Fees:</strong> 50% of transaction fees are burned, 50% go to the block producer. During high-activity periods, priority fees can significantly boost validator revenue.</li>
              <li><strong className="text-foreground">Jito MEV Tips:</strong> Through Jito Labs' MEV infrastructure, validators earn additional tips from searchers submitting transaction bundles. This can add 1–3% additional APY depending on network activity.</li>
              <li><strong className="text-foreground">Commission:</strong> Validators typically charge 5–10% commission on staking rewards. W3AI targets a competitive 5% commission to maximize delegation attraction.</li>
            </ul>
            <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">W3AI Solana Validator Infrastructure</h4>
            <p>W3AI operates Solana validators on bare-metal servers with 256GB+ RAM, 24-core CPUs, and 10Gbps network connectivity. The validator participates in the Solana Foundation Delegation Program (SFDP) and Jito stake pool to bootstrap initial stake weight. As W3AI's hub chain, Solana validator performance is mission-critical and monitored with sub-second alerting.</p>
          </div>
        </section>

        {/* Live Simulated Staking Dashboard */}
        <section className="mt-10">
          <h3 className="text-xl font-semibold text-foreground mb-2">Live Staking Simulator</h3>
          <p className="text-sm text-muted-foreground mb-6">Simulated real-time validator metrics across Ethereum, BSC, and Solana. Values update every 3 seconds to model live network conditions.</p>
          <StakingDashboard />
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 21: Liquidity & Market Making */}
      {/* ============================================================ */}
      <div className={p("liquidity")}>
        <section id="liquidity">
          <h2 className="text-2xl font-bold text-foreground mb-4">Liquidity & Market Making</h2>
          <div className="prose-section">
            <p>Market making is a core product feature. DEX liquidity allocation is locked for no less than 12 months. LPs may receive additional token rewards pro rata and a 50% share of market-making rewards in USDC/USDT.</p>
            <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">Principles & Goals</h4>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Healthy Price Discovery: Minimize discontinuities between venues.</li>
              <li>Reliable Liquidity: Competitive spreads and depth at core size bands.</li>
              <li>Cross-Venue Coherence: Align conditions across DEX pools and CEX order books.</li>
            </ul>
          </div>
        </section>
        <section id="dex-strategy">
          <h2 className="text-2xl font-bold text-foreground mb-4">DEX Liquidity Strategy</h2>
          <div className="prose-section">
            <p>On Ethereum, W3AI deploys Uniswap-style AMM pools. On BSC, PancakeSwap's Smart Router (V2) links AMM/stableswap liquidity and market makers to improve pricing. The strategy combines protocol-owned liquidity (POL) and professional quoting for early volatility regimes.</p>
          </div>
        </section>
        <section id="cex-strategy">
          <h2 className="text-2xl font-bold text-foreground mb-4">CEX Listing Readiness</h2>
          <div className="prose-section">
            <p>Centralized exchanges evaluate projects on security posture, liquidity potential, and market quality. W3AI's market making strategy is tightly coupled with "listing readiness" artifacts: audited contracts, transparent tokenomics, liquidity plans, and operational reliability.</p>
          </div>
        </section>
        <section id="partner-mm">
          <h2 className="text-2xl font-bold text-foreground mb-4">Partner-Enabled Market Making</h2>
          <div className="prose-section">
            <p>G-20 Group provides liquidity solutions and treasury management across exchange-traded and on-chain venues. Within W3AI, this maps to a professional multi-venue liquidity framework, risk-managed treasury yield, and market-depth stability programs tied to milestones.</p>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 22: Marketing & Distribution */}
      {/* ============================================================ */}
      <div className={p("marketing")}>
        <section id="marketing">
          <h2 className="text-2xl font-bold text-foreground mb-4">Marketing & Distribution Roadmap</h2>
          <div className="prose-section">
            <p>W3AI's marketing strategy is built around authenticity: each chain is a community with its own verticals, founders, memetics, and risk tolerance. The objective is to embed W3AI into actual user workflows.</p>
          </div>
        </section>
        <section id="community-growth">
          <h2 className="text-2xl font-bold text-foreground mb-4">Community Growth Objectives</h2>
          <div className="prose-section">
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Pre-listing: 25,000 Registry users via whitelisted wallets.</li>
              <li>12–18 month: 3–5% of Web3 browser market (3M+ monthly users).</li>
            </ul>
          </div>
        </section>
        <section id="kol-strategy">
          <h2 className="text-2xl font-bold text-foreground mb-4">Social & KOL Strategy</h2>
          <div className="prose-section">
            <p>W3AI partners with key opinion leaders (KOLs) across crypto verticals — DeFi, NFTs, AI, and institutional Web3 — to drive awareness and community growth through authentic content and product demonstrations.</p>
          </div>
        </section>
        <section id="six-month-rollout">
          <h2 className="text-2xl font-bold text-foreground mb-4">Six-Month Rollout</h2>
          <div className="prose-section">
            <p>The six-month rollout plan is structured around three phases:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Phase 1 (Months 1–2): Registry launch, whitelisted wallet onboarding, and community seeding across Solana, Ethereum, and BSC ecosystems.</li>
              <li>Phase 2 (Months 3–4): Browser beta release, KOL partnerships, hackathon sponsorships, and initial DEX liquidity deployment.</li>
              <li>Phase 3 (Months 5–6): Public launch, CEX listing applications, and scaling community to 25,000+ Registry users.</li>
            </ul>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 23: Network Partners */}
      {/* ============================================================ */}
      <div className={p("strategic-partners")}>
        <section id="strategic-partners">
          <h2 className="text-2xl font-bold text-foreground mb-4">Network Partners</h2>
          <div className="prose-section">
            <p>W3AI's ecosystem is strengthened by strategic partnerships across infrastructure, security, liquidity, and identity verification. Each partner provides specialized capabilities that integrate directly into the W3AI platform.</p>
          </div>
        </section>
        {[
          { id: "partner-0x", name: "0x", desc: "0x provides the foundational DEX aggregation and swap routing infrastructure that powers W3AI's in-browser trading experience. The 0x API enables access to deep liquidity across multiple DEX protocols with optimized gas efficiency.", visit: "https://0x.org" },
          { id: "partner-changelly", name: "Changelly", desc: "Changelly's exchange API enables W3AI to offer seamless in-browser token swaps with support for 500+ digital assets. The API's 'extra fee' functionality provides the transparent convenience fee mechanism that routes revenue to the W3AI treasury.", visit: "https://changelly.com" },
          { id: "partner-cls", name: "CLS", desc: "CLS is the trusted leader in global FX settlement, processing over $6.5 trillion in daily transactions. CLS brings institutional-grade settlement infrastructure and risk management capabilities that position W3AI for cross-border RWA tokenization and institutional adoption.", visit: "https://cls-group.com" },
          { id: "partner-dentity", name: "Dentity", desc: "Dentity provides privacy-forward digital identity and credential verification. W3AI leverages Dentity for Registry whitelisting, anti-sybil protections, and credentialed wallet attestations that enable compliant access to tokenized assets.", visit: "https://dentity.com" },
          { id: "partner-g20", name: "G-20 Group", desc: "G-20 Group delivers professional liquidity solutions and treasury management across exchange-traded and on-chain venues. Within W3AI, G-20 provides multi-venue market making, risk-managed treasury yield optimization, and market-depth stability programs.", visit: "https://g20.group" },
          { id: "partner-hacken", name: "Hacken", desc: "Hacken is a leading blockchain security firm providing smart contract audits, penetration testing, tokenomics audits, proof-of-reserves verification, and post-deployment monitoring. Hacken's security framework forms the foundation of W3AI's 'in-browser trust layer.'", visit: "https://hacken.io" },
          { id: "partner-lablab", name: "LabLab", desc: "LabLab connects W3AI with a global community of AI developers through hackathons and builder programs. This partnership drives developer adoption, plugin ecosystem growth, and community-driven innovation within the W3AI browser platform.", visit: "https://lablab.ai" },
          { id: "partner-northern-trust", name: "Northern Trust", desc: "Northern Trust manages $1.7T+ in assets and has pioneered blockchain tokenization through its Matrix Zenith digital assets platform. The partnership positions W3AI at the intersection of institutional asset management and on-chain infrastructure.", visit: "https://northerntrust.com" },
          { id: "partner-surge", name: "Surge", desc: "Surge provides Web3 marketing, community building, and growth infrastructure. Within W3AI, Surge supports community-first distribution strategy, KOL partnerships, and chain-native marketing campaigns across Solana, Ethereum, and BSC ecosystems.", visit: "https://surge.xyz" },
        ].map(partner => (
          <section key={partner.id} id={partner.id}>
            <div className="flex items-center flex-wrap gap-4 mb-4">
              <h2 className="text-2xl font-bold text-foreground">{partner.name}</h2>
              <a href={partner.visit} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(75,80%,55%)] text-black text-sm font-medium hover:bg-[hsl(75,80%,45%)] transition-colors">Visit ↗</a>
            </div>
            <div className="prose-section"><p>{partner.desc}</p></div>
          </section>
        ))}
      </div>

      {/* ============================================================ */}
      {/* PAGE 24: Use Cases */}
      {/* ============================================================ */}
      <div className={p("use-cases")}>
        <section id="use-cases">
          <h2 className="text-2xl font-bold text-foreground mb-4">Use Cases</h2>
          <div className="prose-section">
            <p>The following walkthroughs illustrate how the TMRW Browser platform works in practice.</p>
          </div>

          <div className="mt-8 p-6 rounded-xl border border-border bg-card">
            <h3 className="text-xl font-semibold text-foreground mb-4">Example: Cross-Chain Transaction</h3>
            <div className="prose-section">
              <p>A user wants to move W3AI tokens from Solana to Ethereum to provide liquidity on Uniswap.</p>
              <ol className="list-decimal ml-6 space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Open the browser.</strong> The user launches the TMRW Browser and connects their Solana wallet. The dashboard shows their W3AI balance across all chains.</li>
                <li><strong className="text-foreground">Initiate bridge.</strong> The user selects "Bridge to Ethereum" from the asset management panel. The AI assistant explains the Wormhole NTT burn-and-mint process and estimates gas costs on both chains.</li>
                <li><strong className="text-foreground">Review and confirm.</strong> A transaction simulation shows the exact amount that will arrive on Ethereum after fees. The user reviews the "explain before execute" summary and approves the transaction.</li>
                <li><strong className="text-foreground">Execute.</strong> Tokens are burned on Solana and minted on Ethereum. The user receives a confirmation with transaction hashes on both chains and an updated cross-chain balance view.</li>
              </ol>
            </div>
          </div>

          <div className="mt-6 p-6 rounded-xl border border-border bg-card">
            <h3 className="text-xl font-semibold text-foreground mb-4">Example: Tokenized Asset Purchase</h3>
            <div className="prose-section">
              <p>A retail investor wants to gain exposure to commercial real estate through tokenized assets.</p>
              <ol className="list-decimal ml-6 space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Browse the RWA marketplace.</strong> The user opens the tokenized assets section in the browser. The AI assistant filters available assets by sector, yield profile, and minimum investment.</li>
                <li><strong className="text-foreground">Review asset data.</strong> The user selects a tokenized commercial office building. The browser displays verified originator information, rental yield history, occupancy rates, and third-party valuation data — all sourced from on-chain attestations.</li>
                <li><strong className="text-foreground">Complete purchase.</strong> The user specifies their investment amount (as low as $100). The AI assistant confirms eligibility, explains any holding period requirements, and presents a transaction summary. The user signs with their connected wallet.</li>
                <li><strong className="text-foreground">Monitor position.</strong> The purchased tokens appear in the user's portfolio with real-time yield tracking, automated rental distributions, and secondary market pricing.</li>
              </ol>
            </div>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 25: Privacy Policy */}
      {/* ============================================================ */}
      <div className={p("privacy")}>
        <section id="privacy">
          <h2 className="text-2xl font-bold text-foreground mb-4">Privacy Policy</h2>
          <div className="prose-section">
            <p>Privacy is a foundational principle of Web3 architecture. W3AI is committed to building privacy-preserving systems that protect user data, on-chain identity, and transactional confidentiality while maintaining compliance with applicable regulatory frameworks.</p>
          </div>
        </section>
        <section id="privacy-data-minimization">
          <h2 className="text-2xl font-bold text-foreground mb-4">Data Minimization</h2>
          <div className="prose-section">
            <p>W3AI adheres to a strict data minimization principle. The browser collects only the minimum information necessary to deliver core functionality. No browsing history, wallet balances, or transaction data is stored on centralized servers. All user activity remains local unless explicitly shared by the user.</p>
          </div>
        </section>
        <section id="privacy-on-chain">
          <h2 className="text-2xl font-bold text-foreground mb-4">On-Chain Privacy</h2>
          <div className="prose-section">
            <p>Wallet interactions, token swaps, and governance participation are conducted through privacy-preserving mechanisms. W3AI supports selective disclosure protocols, enabling users to prove eligibility (e.g., KYC status, token holdings) without revealing underlying personal data.</p>
          </div>
        </section>
        <section id="privacy-third-party">
          <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Data Sharing</h2>
          <div className="prose-section">
            <p>W3AI does not sell, rent, or share user data with third parties for advertising or profiling purposes. Where integrations require data exchange (e.g., fiat on-ramps, KYC providers), users are informed and must provide explicit consent. All third-party processors are contractually bound to equivalent privacy standards.</p>
          </div>
        </section>
        <section id="privacy-user-rights">
          <h2 className="text-2xl font-bold text-foreground mb-4">User Rights & Control</h2>
          <div className="prose-section">
            <p>Users retain full control over their data at all times. This includes the right to export, delete, or restrict processing of any personally identifiable information. W3AI's architecture ensures that account deletion results in complete and irreversible data removal from all systems.</p>
          </div>
        </section>
        <section id="identity-anti-sybil">
          <h2 className="text-2xl font-bold text-foreground mb-4">Identity & Anti-Sybil Primitives</h2>
          <div className="prose-section">
            <p>W3AI's Registry and whitelisted-wallet objective is strengthened by integrating a privacy-forward credential layer through Dentity. W3AI leverages this to support:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Pre-sale / beta access controls (credentialed wallet allowlists).</li>
              <li>Reduced bot/sybil influence in governance.</li>
              <li>Higher-trust partner campaigns and per-vertical onboarding.</li>
            </ul>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 26: Risks & Disclosures */}
      {/* ============================================================ */}
      <div className={p("risks")}>
        <section id="risks">
          <h2 className="text-2xl font-bold text-foreground mb-4">Risks, Security & Disclosures</h2>
          <div className="prose-section">
            <p>AI browsers and agentic workflows introduce genuine new risks. W3AI assumes that any browser-integrated assistant operating over untrusted web content is a target, and treats "agent permissions" with the same rigor as "wallet permissions."</p>
            <p>W3AI implements boundaries including: no autonomous signing, always-on transaction simulation and explainability, explicit whitelists for dApp connections, isolated profiles for high-risk browsing and airdrop hunting.</p>
            <p className="italic text-muted-foreground">Exchange listing targets are aspirational. Kraken, Coinbase, Gate, and MEXC all describe formal processes and criteria, and none guarantee approval.</p>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 27: Appendix & References */}
      {/* ============================================================ */}
      <div className={p("appendix")}>
        <section id="appendix">
          <h2 className="text-2xl font-bold text-foreground mb-4">Appendix & References</h2>
          <div className="prose-section text-sm text-muted-foreground space-y-1">
            {[
              "[1] kraken.com/get-listed",
              "[2] techcrunch.com – Perplexity launches Comet",
              "[3] techradar.com – Perplexity Comet browser security",
              "[4] developer.mozilla.org – Mozilla Firefox",
              "[5] solana.com – Validators",
              "[6] Global Cryptocurrency Ownership Reaches 741 Million in 2025",
              "[7] cointelegraph.com – Stablecoin users growth 2025",
              "[8] brave.com – 100M MAU",
              "[9] brave.com – Shields",
              "[10] apple.com – Safari Privacy",
              "[11] OpenAI – OWL Architecture / Atlas",
              "[12] OpenAI – ChatGPT Atlas Release Notes",
              "[13] changelly.com – API Documentation",
              "[14] ft.com – DeFi Security",
              "[15] hacken.io – Services",
              "[16] hacken.io – Proof of Reserves",
              "[17] dentity.com",
              "[18] dentity.com – Business",
              "[19] northerntrust.com – Tokenization Initiatives",
              "[20] surge.xyz",
              "[21] solana.com – Learn, Ecosystem, DeFi, NFTs, Hackathon",
              "[22] ethereum.org – dApps",
              "[23] ethglobal.com",
              "[24] bnbchain.org – Ecosystem Reports",
              "[25] uniswap.org – Protocol",
              "[26] docs.pancakeswap.finance – Smart Router & Market Maker",
              "[27] coinbase.com – Listings",
              "[28] g20.group",
            ].map((ref, i) => <p key={i}>{ref}</p>)}
          </div>
        </section>
      </div>

      {/* Prev / Next Navigation */}
      <PrevNextNav activePage={activePage} onNavigate={onNavigate} />

      <div className="h-12" />
    </div>
  );
}

// --- Main Page ---
export default function Whitepaper() {
  const [activeId, setActiveId] = useState("w3lcome");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const activePage = useMemo(() => getParentId(activeId), [activeId]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = useCallback((id: string) => {
    const newParent = getParentId(id);
    const isTopLevel = newParent === id;
    setActiveId(id);

    if (isTopLevel) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title="Whitepaper" description="The Tomorrow Company whitepaper covering W3AI token ecosystem, RWA tokenization infrastructure, and the future of decentralized digital assets." path="/whitepaper" />
      <Navbar />
      <ReadingProgress />

      <div className="flex min-h-[calc(100vh-80px)] pt-16 lg:pt-20">
        <DesktopSidebar activeId={activeId} onNavigate={navigateTo} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} />
        {sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="fixed top-[72px] left-3 lg:sticky lg:top-[80px] lg:left-auto h-9 w-9 flex items-center justify-center shrink-0 z-20 text-muted-foreground hover:text-foreground transition-colors bg-card/80 backdrop-blur-sm rounded-md border border-border lg:bg-transparent lg:backdrop-blur-none lg:border-0 lg:rounded-none lg:h-10 lg:w-10"
            aria-label="Expand sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <main className="flex-1 min-w-0">
          <WhitepaperContent activePage={activePage} onNavigate={navigateTo} />
        </main>
      </div>

      <Footer />

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 right-6 z-30 h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}

      <style>{`
        .prose-section p { color: hsl(var(--muted-foreground)); line-height: 1.75; margin-bottom: 1rem; }
        .prose-section strong { color: hsl(82 85% 55%); }

        /* Neon green section headers */
        .whitepaper-content section > h2 {
          position: relative;
          padding-bottom: 0.5rem;
        }
        .whitepaper-content section > h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, hsl(82 85% 55%), hsl(82 85% 55% / 0));
          border-radius: 1px;
        }

        /* Neon green list bullets */
        .prose-section ul { list-style: none; }
        .prose-section ul li {
          position: relative;
          padding-left: 1.25rem;
        }
        .prose-section ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.65em;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: hsl(82 85% 55%);
          box-shadow: 0 0 6px hsl(82 85% 55% / 0.4);
        }

        /* Neon green ordered list numbers */
        .prose-section ol li::marker {
          color: hsl(82 85% 55%);
          font-weight: 600;
        }

        /* Neon green table accents */
        .whitepaper-content table {
          border-color: hsl(82 85% 55% / 0.15);
        }
        .whitepaper-content thead {
          border-bottom: 2px solid hsl(82 85% 55% / 0.25);
        }
        .whitepaper-content th {
          color: hsl(82 85% 55%) !important;
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        /* Neon green callout card left border */
        .whitepaper-content .rounded-xl.border {
          border-left: 2px solid hsl(82 85% 55% / 0.4);
          box-shadow: inset 3px 0 12px -4px hsl(82 85% 55% / 0.06);
        }

        /* Neon green info boxes */
        .whitepaper-content .bg-muted\\/50.border {
          border-left: 2px solid hsl(82 85% 55% / 0.3);
        }

        /* Diagram neon green accents */
        .whitepaper-content svg rect[rx="10"],
        .whitepaper-content svg rect[rx="16"],
        .whitepaper-content svg rect[rx="12"] {
          filter: drop-shadow(0 0 1px hsl(82 85% 55% / 0.08));
        }

        /* Neon green glow on diagram hub nodes */
        .whitepaper-content svg circle[r="60"] {
          filter: drop-shadow(0 0 12px hsl(82 85% 55% / 0.15));
        }

        /* Diagram caption styling */
        .whitepaper-content svg text[font-style="italic"] {
          fill: hsl(82 85% 55% / 0.5);
        }

        /* Subtle neon divider between sections */
        .whitepaper-content > .space-y-10 > section + section {
          border-top: 1px solid hsl(82 85% 55% / 0.06);
          padding-top: 2.5rem;
        }

        /* Neon green link hover glow */
        .prose-section a {
          text-decoration: none;
          transition: text-shadow 0.2s ease;
        }
        .prose-section a:hover {
          text-shadow: 0 0 8px hsl(82 85% 55% / 0.3);
        }

        /* Sidebar neon scrollbar */
        aside::-webkit-scrollbar-thumb {
          background: hsl(82 85% 55% / 0.2) !important;
          border-radius: 3px;
        }
        aside::-webkit-scrollbar-thumb:hover {
          background: hsl(82 85% 55% / 0.4) !important;
        }

        /* Chapter index cards neon hover glow */
        .whitepaper-content button.group:hover {
          box-shadow: 0 0 20px -6px hsl(82 85% 55% / 0.12);
        }

        /* Reading progress bar glow */
        .fixed .bg-gradient-to-r {
          box-shadow: 0 1px 8px -1px hsl(82 85% 55% / 0.3);
        }

        /* ===== Light theme: swap neon green → black ===== */
        :root:not(.dark):not(.colorful) .prose-section strong { color: hsl(220 20% 10%) !important; }
        :root:not(.dark):not(.colorful) .whitepaper-content section > h2::after {
          background: linear-gradient(90deg, hsl(220 20% 10%), hsl(220 20% 10% / 0)) !important;
        }
        :root:not(.dark):not(.colorful) .prose-section ul li::before {
          background: hsl(220 20% 10%) !important;
          box-shadow: none !important;
        }
        :root:not(.dark):not(.colorful) .prose-section ol li::marker { color: hsl(220 20% 10%) !important; }
        :root:not(.dark):not(.colorful) .whitepaper-content table { border-color: hsl(220 13% 91%) !important; }
        :root:not(.dark):not(.colorful) .whitepaper-content thead { border-bottom-color: hsl(220 20% 10% / 0.2) !important; }
        :root:not(.dark):not(.colorful) .whitepaper-content th { color: hsl(220 20% 10%) !important; }
        :root:not(.dark):not(.colorful) .whitepaper-content .rounded-xl.border {
          border-left-color: hsl(220 20% 10% / 0.3) !important;
          box-shadow: inset 3px 0 12px -4px hsl(220 20% 10% / 0.04) !important;
        }
        :root:not(.dark):not(.colorful) .whitepaper-content .bg-muted\\/50.border {
          border-left-color: hsl(220 20% 10% / 0.2) !important;
        }
        :root:not(.dark):not(.colorful) .whitepaper-content svg rect[rx="10"],
        :root:not(.dark):not(.colorful) .whitepaper-content svg rect[rx="16"],
        :root:not(.dark):not(.colorful) .whitepaper-content svg rect[rx="12"] { filter: none !important; }
        :root:not(.dark):not(.colorful) .whitepaper-content svg circle[r="60"] { filter: none !important; }
        :root:not(.dark):not(.colorful) .whitepaper-content svg text[font-style="italic"] { fill: hsl(220 10% 40%) !important; }
        :root:not(.dark):not(.colorful) .whitepaper-content > .space-y-10 > section + section {
          border-top-color: hsl(220 13% 91%) !important;
        }
        :root:not(.dark):not(.colorful) .prose-section a { color: hsl(220 20% 10%) !important; }
        :root:not(.dark):not(.colorful) .prose-section a:hover { text-shadow: none !important; }
        :root:not(.dark):not(.colorful) aside::-webkit-scrollbar-thumb { background: hsl(220 20% 10% / 0.15) !important; }
        :root:not(.dark):not(.colorful) aside::-webkit-scrollbar-thumb:hover { background: hsl(220 20% 10% / 0.3) !important; }
        :root:not(.dark):not(.colorful) .whitepaper-content button.group:hover { box-shadow: 0 0 20px -6px hsl(220 20% 10% / 0.08) !important; }
        :root:not(.dark):not(.colorful) .fixed .bg-gradient-to-r {
          box-shadow: 0 1px 8px -1px hsl(220 20% 10% / 0.15) !important;
        }

        /* Light theme: override inline hsl(82) Tailwind classes */
        :root:not(.dark):not(.colorful) [class*="text-[hsl(82"] { color: hsl(220 20% 10%) !important; }
        :root:not(.dark):not(.colorful) [class*="bg-[hsl(82"] { background-color: hsl(220 20% 10%) !important; }
        :root:not(.dark):not(.colorful) [class*="border-[hsl(82"] { border-color: hsl(220 20% 10% / 0.2) !important; }
        :root:not(.dark):not(.colorful) [class*="from-[hsl(82"] { --tw-gradient-from: hsl(220 20% 10% / 0.06) !important; }
        :root:not(.dark):not(.colorful) [class*="to-[hsl(82"] { --tw-gradient-to: hsl(220 20% 10% / 0.06) !important; }
        :root:not(.dark):not(.colorful) [class*="hover:from-[hsl(82"]:hover { --tw-gradient-from: hsl(220 20% 10% / 0.1) !important; }
        :root:not(.dark):not(.colorful) [class*="hover:to-[hsl(82"]:hover { --tw-gradient-to: hsl(220 20% 10% / 0.1) !important; }
        :root:not(.dark):not(.colorful) [class*="hover:text-[hsl(82"]:hover { color: hsl(220 20% 10%) !important; }
        :root:not(.dark):not(.colorful) [class*="shadow-[0_0_15px"] { --tw-shadow: 0 0 15px -3px hsl(220 20% 10% / 0.08) !important; }

        /* Light theme: progress bar */
        :root:not(.dark):not(.colorful) .fixed .bg-gradient-to-r.from-\\[hsl\\(82 {
          background: linear-gradient(to right, hsl(220 20% 10%), hsl(220 14% 30%)) !important;
        }

        /* Hide non-active pages */
        .wp-page-hidden { display: none; }

        @media print {
          /* Show all pages in print */
          .wp-page-hidden { display: block !important; }

          /* Hide non-content elements */
          nav, aside, footer, .fixed, button[class*="scroll"],
          [class*="sticky"], [class*="backdrop-blur"] {
            display: none !important;
          }

          /* Dark theme for PDF */
          body, html {
            background: #0a0a0f !important;
            color: #e0e0e0 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .min-h-screen { min-height: auto !important; background: #0a0a0f !important; }
          .flex { display: block !important; }
          .pt-16, .lg\\:pt-20, .pt-20 { padding-top: 0 !important; }

          /* Content styling for print */
          main { width: 100% !important; }
          .max-w-4xl { max-width: 100% !important; padding: 0 1cm !important; }

          /* Page breaks between sections */
          [data-page], .wp-page-hidden { break-before: page; }
          section { break-inside: avoid; page-break-inside: avoid; }

          h1, h2, h3 { color: #ffffff !important; break-after: avoid; }
          p, li { color: #c0c0c0 !important; }
          strong { color: #a3e635 !important; }

          /* Hide prev/next in print */
          .flex.items-stretch.gap-4 { display: none !important; }

          /* Image styling */
          .animated-gradient-icon { border: none !important; }
          img { max-height: 300px !important; }

          .animated-gradient-icon::before,
          .animated-gradient-icon::after { display: none !important; }

          /* Table styling */
          table { border-color: #333 !important; }
          thead { background: #1a1a2e !important; }
          th { color: #a3e635 !important; }
          td { color: #e0e0e0 !important; border-color: #333 !important; }

          /* Links */
          a { color: #a3e635 !important; }

          @page {
            margin: 2cm 1.5cm;
            size: A4;

            @bottom-center {
              content: "W3AI Whitepaper — Page " counter(page);
              font-size: 9pt;
              color: #888;
            }

            @top-center {
              content: "W3AI Whitepaper";
              font-size: 9pt;
              color: #666;
            }
          }
        }
      `}</style>
    </div>
  );
}
