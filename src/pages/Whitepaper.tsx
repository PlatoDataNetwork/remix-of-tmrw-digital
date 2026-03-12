import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ArrowUp, ChevronRight, ChevronLeft, ChevronDown, Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import whitepaperHero from "@/assets/whitepaper-hero.png";
import heroBg from "@/assets/hero-bg.png";

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
  { id: "w3lcome", title: "Home", icon: "home" },
  { id: "welcome-message", title: "W3LCOME", number: "01" },
  { id: "disclaimer", title: "Disclaimer", number: "02" },
  { id: "executive-summary", title: "Rise of the Machines", number: "03", children: [
    { id: "network-thesis", title: "Network Thesis" },
    { id: "why-now", title: "Why Now" },
    { id: "go-to-market", title: "Go To Market" },
  ]},
  { id: "w3ai-protocol", title: "W3AI Protocol", number: "04", children: [
    { id: "protocol-architecture", title: "Architecture" },
    { id: "protocol-economic-model", title: "Economic Model" },
  ]},
  { id: "tmrw-browser", title: "W3AI TMRW", number: "05", children: [
    { id: "browser-architecture", title: "Architecture" },
    { id: "differentiation", title: "Differentiation" },
    { id: "llm-layer", title: "LLM Layer" },
    { id: "developers", title: "Developers" },
    { id: "swap-execution", title: "DeFi Swap Execution" },
    { id: "security-intelligence", title: "Security Intelligence" },
  ]},
  { id: "w3ai-rwas", title: "W3AI RWA's", number: "06", children: [
    { id: "rwa-carbon-credits", title: "Carbon Credits" },
    { id: "rwa-collectables", title: "Collectables" },
    { id: "rwa-commodities", title: "Commodities" },
    { id: "rwa-energy", title: "Energy" },
    { id: "rwa-infrastructure", title: "Infrastructure" },
    { id: "rwa-metals", title: "Metals" },
    { id: "rwa-rare-earth", title: "Rare Earth Minerals" },
    { id: "rwa-real-estate", title: "Real Estate" },
    { id: "rwa-sovereign-wealth", title: "Sovereign Wealth" },
    { id: "rwa-stablecoins", title: "Stablecoins" },
    { id: "rwa-tax-credits", title: "Tax Credits" },
    { id: "rwa-utilities", title: "Utilities" },
  ]},
  { id: "w3ai-token-utility", title: "W3AI Token Utility", number: "07", children: [
    { id: "staking-tiers", title: "Staking Tiers" },
    { id: "deflationary-mechanics", title: "Deflationary Mechanics" },
  ]},
  { id: "governance", title: "W3AI Governance", number: "08", children: [
    { id: "foundation-governance", title: "Governance Framework" },
    { id: "foundation-treasury", title: "Treasury Management" },
    { id: "foundation-compliance", title: "Regulatory Compliance" },
  ]},
  { id: "token-utility", title: "W3AI Tokenomics", number: "09", children: [
    { id: "token-pillars", title: "Token Utility Pillars" },
    { id: "tokenomics", title: "Tokenomics Design" },
    { id: "supply-allocations", title: "Supply & Allocations" },
    { id: "sale-rounds", title: "Sale Rounds & Pricing" },
    { id: "byok-gateway", title: "BYOK vs Open Gateway" },
    { id: "swaps-fee", title: "Swaps & Convenience Fee" },
  ]},
  { id: "institutional-rails", title: "Institutional-Grade Rails", number: "10", children: [
    { id: "rails-custody", title: "Custody & Safeguarding" },
    { id: "rails-compliance", title: "Compliance Infrastructure" },
    { id: "rails-tokenization", title: "Tokenization & RWA Access" },
    { id: "rails-reporting", title: "Institutional Reporting" },
  ]},
  { id: "community-integrations", title: "Community Integrations", number: "11", children: [
    { id: "solana-community", title: "Solana" },
    { id: "ethereum-community", title: "Ethereum" },
    { id: "bsc-community", title: "BSC" },
  ]},
  { id: "supported-networks", title: "Supported Networks", number: "12", children: [
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
  { id: "foundations", title: "Foundations", number: "13", children: [
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
  { id: "multi-chain", title: "Multi-Chain Deployments", number: "14", children: [
    { id: "multi-hub-spoke", title: "Hub & Spoke Architecture" },
    { id: "multi-wormhole", title: "Wormhole NTT Bridge" },
    { id: "multi-supply-integrity", title: "Supply Integrity" },
    { id: "multi-chain-governance", title: "Cross-Chain Governance" },
  ]},
  { id: "validator-yield", title: "Validator Yield & Staking", number: "15", children: [
    { id: "eth-validators", title: "Ethereum Validators" },
    { id: "bsc-validators", title: "BSC Validators" },
    { id: "sol-validators", title: "Solana Validators" },
  ]},
  { id: "liquidity", title: "Liquidity & Market Making", number: "16", children: [
    { id: "dex-strategy", title: "DEX Liquidity Strategy" },
    { id: "cex-strategy", title: "CEX Listing Readiness" },
    { id: "partner-mm", title: "Partner Market Making" },
  ]},
  { id: "marketing", title: "Marketing & Distribution", number: "17", children: [
    { id: "community-growth", title: "Community Growth" },
    { id: "kol-strategy", title: "Social & KOL Strategy" },
    { id: "six-month-rollout", title: "Six-Month Rollout" },
  ]},
  { id: "strategic-partners", title: "Network Partners", number: "18", children: [
    { id: "partner-changelly", title: "Changelly" },
    { id: "partner-hacken", title: "Hacken" },
    { id: "partner-dentity", title: "Dentity" },
    { id: "partner-northern-trust", title: "Northern Trust" },
    { id: "partner-surge", title: "Surge" },
    { id: "partner-g20", title: "G-20 Group" },
    { id: "partner-lablab", title: "LabLab" },
  ]},
  { id: "infrastructure", title: "Infrastructure", number: "19", children: [
    { id: "infra-network", title: "Network Architecture" },
    { id: "infra-security", title: "Security & Custody" },
    { id: "infra-monitoring", title: "Monitoring & Operations" },
  ]},
  { id: "security", title: "Cybersecurity", number: "20", children: [
    { id: "security-network", title: "Network Security" },
    { id: "security-blockchain", title: "Blockchain Security" },
    { id: "security-defi", title: "DeFi Security" },
    { id: "security-defai", title: "DeFAI Security" },
    { id: "security-ai", title: "AI Security" },
  ]},
  { id: "auditing", title: "Auditing", number: "21", children: [
    { id: "auditing-smart-contract", title: "Smart Contract Auditing" },
    { id: "auditing-financial", title: "Financial Auditing" },
  ]},
  { id: "privacy", title: "Privacy Policy", number: "22", children: [
    { id: "privacy-data-minimization", title: "Data Minimization" },
    { id: "privacy-on-chain", title: "On-Chain Privacy" },
    { id: "privacy-third-party", title: "Third-Party Data Sharing" },
    { id: "privacy-user-rights", title: "User Rights & Control" },
    { id: "identity-anti-sybil", title: "Identity & Anti-Sybil" },
  ]},
  { id: "risks", title: "Risks & Disclosures", number: "23" },
  { id: "appendix", title: "Appendix & References", number: "24" },
  { id: "deck-link", title: "Project Deck", number: "25" },
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

// --- Sidebar Search ---
function SidebarSearch({ query, setQuery }: { query: string; setQuery: (q: string) => void }) {
  return (
    <div className="px-3 py-2 border-b border-border">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full bg-muted/50 border border-border rounded-md pl-8 pr-8 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 transition-colors"
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground">
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
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
              <div className="ml-7 pl-3 border-l border-border/50 space-y-0.5 mt-0.5 mb-1">
                {s.children!.map(child => {
                  const isChildActive = activeId === child.id;
                  return (
                    <button
                      key={child.id}
                      ref={isChildActive ? activeRef : undefined}
                      onClick={() => onNavigate(child.id)}
                      className={cn(
                        "w-full text-left px-2 py-1.5 rounded text-xs transition-colors",
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
  const [searchQuery, setSearchQuery] = useState("");

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
      <SidebarSearch query={searchQuery} setQuery={setSearchQuery} />
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

// --- Content (page-based: only active section is visible) ---
function WhitepaperContent({ activePage, onNavigate }: { activePage: string; onNavigate: (id: string) => void }) {
  const p = (id: string) => activePage !== id ? "wp-page-hidden" : "";

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 whitepaper-content">

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
      {/* PAGE: Home */}
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
          <p className="text-muted-foreground mb-8">Rise of the Machines — Building the Web3 AI gateway for the agentic browser era.</p>
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
      {/* PAGE 01: W3LCOME */}
      {/* ============================================================ */}
      <div className={p("welcome-message")}>
        <section id="welcome-message">
          <h2 className="text-2xl font-bold text-foreground mb-4">W3LCOME</h2>
          <div className="prose-section">
            <h3 className="text-xl font-semibold text-foreground mb-4">Welcome and Thank you for Joining Us!</h3>
            <p>We are excited to introduce you to W3AI, a pioneering force at the intersection of Web3 and AI. Our vision is to revolutionize the way vertically focused AI applications are conceived, developed and leveraged across both centralized and decentralized networks. creating a more efficient, transparent, and secure digital ecosystem and decentralized transport management system. We are revolutionizing data intelligence by delivering an array of vertically focused Generative AI Applications inside a custom network framework that leverages AI in ways that drive both high ROI and stored value. We embrace innovation and deploy it across our entire ecosystem and corporate culture.</p>
            <p>W3AI is at the forefront of merging artificial intelligence with blockchain, forging a new path for decentralized automation and machine learning. Its architecture is based on a network of autonomous AI agents that execute a variety of tasks, such as data-sharing, dynamic optimization, and decision-making, all within a trustless environment. W3AI's decentralized framework fosters peer-to-peer intelligence sharing, enabling seamless interactions between humans, devices, and AI agents without intermediaries. This ecosystem is designed to enhance scalability, secure decision-making, and remove bottlenecks within Solana's high-performance blockchain ecosystem.</p>
            <p>Our vision goes beyond the conventional as we were created to disrupt the current AI Application and Analytic marketplace. By employing a completely new methodology related to community and developer engagement, we enable deep and authentic connectivity to today's most active innovative technology sectors. At W3AI, we are revolutionizing data intelligence and analysis by delivering an array of vertically focused AI Applications via an immersive UI / UX. Fully Decentralized. Fully Tokenized. Fully Automated. Fully Gamified. As AI continues on its path to disrupt most industries we know of today, we will be a gateway for millions of users to access both our suite of applications but also those from our developer community to showcase and market their apps. We embrace innovation and deploy it across our entire ecosystem and corporate culture. As the AI Application Market continues to expand, we have a unique opportunity in this cycle to deploy our best of class technology and experience to a thriving community of users, enterprises, developers, testers and marketers. Whether you're an investor, a builder, or a visionary looking to be part of the next evolution of technology, we're thrilled to have you with us.</p>
            <p>Let's explore the future—together. 🚀</p>
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
            <p>Third-Party Services. This document may reference third-party platforms, protocols, tools, or service providers. W3AI does not endorse, guarantee, or assume responsibility for the accuracy, reliability, security, or performance of any third-party service. Users interact with third-party services at their own risk.</p>
            <p>No Fiduciary Relationship. Nothing in this document creates a fiduciary, advisory, or professional relationship between W3AI and any reader or participant. Recipients of this document should seek independent legal, financial, and tax advice before making any decisions related to digital asset purchases or participation in any network activity.</p>
            <p>Information Accuracy. While every effort has been made to ensure the accuracy and completeness of the information presented, W3AI does not warrant that the content is free from errors or omissions. Information is provided "as is" and may be updated, modified, or corrected without notice.</p>
            <p>Intellectual Property. All content, trademarks, logos, and intellectual property referenced in this document are the property of their respective owners. Unauthorized reproduction, distribution, or use of this document or any of its contents is strictly prohibited without prior written consent.</p>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 03: Rise of the Machines */}
      {/* ============================================================ */}
      <div className={p("executive-summary")}>
        <div className="relative rounded-2xl overflow-hidden animated-gradient-icon mb-8">
          <img src={whitepaperHero} alt="W3AI Rise of the Machines" className="w-full h-[300px] md:h-[420px] object-cover" />
        </div>

        <section id="executive-summary">
          <h2 className="text-2xl font-bold text-foreground mb-4">Rise of the Machines</h2>
          <div className="prose-section">
            <p>W3AI is building the Web3 AI gateway for the "Rise of the Machines" era—when browsers evolve from passive viewers into agentic, AI-native operating systems. Recent launches from Perplexity (Comet) and OpenAI (ChatGPT Atlas) confirm the browser is becoming the primary AI surface where context is captured and actions are executed.</p>
            <p>W3AI's wedge is Web3-native security + immersive UX. AI browsers create new convenience—and new risk. W3AI's product strategy is to treat AI agent permissions and wallet permissions as one coherent security domain: "assist, verify, then act—only with explicit user control."</p>
            <p>The W3AI / TMRW Browser is a macOS desktop Web3 AI Browser built on Firefox with a sidekick mobile app. Firefox is a free, open-source browser using the Gecko rendering engine, designed to be extensible via add-ons and customization. Building on Firefox creates strategic differentiation in a market where many AI browsers trend toward Chromium-based stacks.</p>
          </div>
        </section>

        <section id="network-thesis">
          <h2 className="text-2xl font-bold text-foreground mb-4">Network Thesis</h2>
          <div className="prose-section">
            <p>A browser becomes a category-defining platform when it has its own decentralized backbone. W3AI is building Network infrastructure through a series of validator nodes on Solana, Ethereum, and BNB Smart Chain (BSC).</p>
          </div>
        </section>

        <section id="why-now">
          <h2 className="text-2xl font-bold text-foreground mb-4">Why Now</h2>
          <div className="prose-section">
            <p>Crypto adoption is measured in hundreds of millions globally. Global crypto owners grew from 659 million (end of 2024) to 741 million in 2025. Active stablecoin addresses increased from 19.6 million to 30 million from Feb 2024 to Feb 2025. This is the user base that needs a safer, simpler "front door" into Web3.</p>
          </div>
        </section>

        <section id="go-to-market">
          <h2 className="text-2xl font-bold text-foreground mb-4">Go To Market</h2>
          <div className="prose-section">
            <p>The project targets a six-month rollout with a measurable pre-listing objective: 25,000 Registry users via whitelisted wallets prior to listing. Post-launch, W3AI targets 3–5% share of the Web3 browser market within 12–18 months, modeled as 3M+ monthly users, benchmarked against Brave's reported 101M MAU.</p>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 04: W3AI Protocol */}
      {/* ============================================================ */}
      <div className={p("w3ai-protocol")}>
        <section id="w3ai-protocol">
          <h2 className="text-2xl font-bold text-foreground mb-4">W3AI Protocol</h2>
          <div className="prose-section">
            <p>The W3AI Protocol is the decentralized infrastructure layer that powers every surface of the W3AI ecosystem—from browser-native AI inference to multi-chain token operations and validator economics. Built across Solana, Ethereum, and BNB Smart Chain, the protocol establishes a unified execution framework where identity, liquidity, governance, and security converge into a single composable stack. Rather than operating as a standalone blockchain, W3AI functions as a cross-chain coordination protocol that leverages existing network security while adding proprietary intelligence, custody, and compliance layers on top.</p>
          </div>
        </section>
        <section id="protocol-architecture">
          <h2 className="text-2xl font-bold text-foreground mb-4">Architecture</h2>
          <div className="prose-section">
            <p>At its core, the W3AI Protocol introduces a novel architecture that binds AI agent permissions to on-chain wallet permissions—treating them as a single security domain. This means every AI-assisted action within the ecosystem, whether a swap recommendation, a governance vote, or a portfolio rebalance, must pass through the same cryptographic verification and user-consent framework that governs asset transfers. The result is a protocol where intelligence and capital move together under explicit user control, eliminating the trust gaps that plague conventional AI-integrated platforms.</p>
          </div>
        </section>
        <section id="protocol-economic-model">
          <h2 className="text-2xl font-bold text-foreground mb-4">Economic Model</h2>
          <div className="prose-section">
            <p>The protocol's economic model is designed for long-term sustainability. Revenue flows from multiple surfaces—Open Gateway AI inference fees, in-browser swap convenience fees, validator yield, and premium feature access—all routed transparently through on-chain treasury mechanisms. With 52.5% of total token supply allocated to the treasury and governed by progressive decentralization, the W3AI Protocol is structured to fund development, incentivize participation, and maintain operational resilience across market cycles.</p>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 05: W3AI TMRW */}
      {/* ============================================================ */}
      <div className={p("tmrw-browser")}>
        <section id="tmrw-browser">
          <h2 className="text-2xl font-bold text-foreground mb-4">W3AI TMRW Browser</h2>
          <div className="prose-section">
            <p>W3AI's product philosophy is that the browser is no longer a "window." It is the execution environment for AI, identity, and money. W3AI's goal is to become the unified gateway that lets users discover → verify → transact → monitor across Web3 with an immersive UI/UX designed for high-frequency multi-chain activity.</p>
          </div>
        </section>
        <section id="browser-architecture">
          <h2 className="text-2xl font-bold text-foreground mb-4">Architecture</h2>
          <div className="prose-section">
            <p>W3AI's macOS desktop browser is built on Firefox, leveraging a mature, open-source codebase that uses the Gecko engine and supports deep customization. In a market increasingly shaped by AI browsers and agentic assistants, platform choice matters because it influences extension models, sandbox boundaries, and security hardening approaches.</p>
          </div>
        </section>
        <section id="differentiation">
          <h2 className="text-2xl font-bold text-foreground mb-4">Differentiation</h2>
          <div className="prose-section">
            <p>W3AI's differentiation must be expressed as workflow superiority and permission superiority—not merely a checklist.</p>
            <p>Brave demonstrates large-scale demand for privacy-first browsing (100M+ MAU). W3AI must meet or exceed these privacy expectations while also solving Web3-specific safety problems (wallet connections, transaction clarity, contract risk, chain selection, and agent safety).</p>
            <p>Safari dominates Apple's ecosystem with privacy as a primary differentiator. W3AI's path: "Safari is privacy-first; W3AI is Web3 AI safety-first."</p>
            <p>Comet and Atlas confirm the new bar: context-aware assistants living inside the browser. W3AI competes by making "agent safety" patterns Web3-native, where "actions" often move assets.</p>
          </div>
        </section>
        <section id="llm-layer">
          <h2 className="text-2xl font-bold text-foreground mb-4">LLM Layer</h2>
          <div className="prose-section">
            <p>Bring Your Own Key (BYOK): Users can connect the LLM provider of their choice using their own API keys. This supports power users and enterprises with preferred vendors, budgets, and compliance requirements.</p>
            <p>W3AI Open Gateway (token-based): Users can alternatively route inference through a W3AI-managed gateway with token-based billing. The Open Gateway is user-controlled by default with spending caps, per-session limits, and explicit on/off controls. A 30% margin is applied over underlying provider costs with transparent reporting.</p>
          </div>
        </section>
        <section id="developers">
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
        <section id="swap-execution">
          <h2 className="text-2xl font-bold text-foreground mb-4">DeFi Swap Execution</h2>
          <div className="prose-section">
            <p>W3AI intends to embed swap functionality directly in the browser and apply a transparent convenience fee that routes into the W3AI treasury. A practical implementation path is the Changelly API, designed for service providers to let users exchange without leaving the host product. Changelly's API supports an "extra fee" functionality allowing the integrator to configure an additional commission layer.</p>
          </div>
        </section>
        <section id="security-intelligence">
          <h2 className="text-2xl font-bold text-foreground mb-4">Security Intelligence</h2>
          <div className="prose-section">
            <p>W3AI will integrate security posture into the act of connecting, signing, and transacting. A practical security integration partner is Hacken, offering smart contract audits, wallet audits, penetration testing, tokenomics audits, proof-of-reserves audits, and post-deployment monitoring. In W3AI, this becomes an "in-browser trust layer": risk flags, verified proofs, and standardized security context before users commit capital.</p>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 06: W3AI RWA's */}
      {/* ============================================================ */}
      <div className={p("w3ai-rwas")}>
        <section id="w3ai-rwas">
          <h2 className="text-2xl font-bold text-foreground mb-4">W3AI RWAs</h2>
          <div className="prose-section">
            <p>The Real World of Asset Tokenization — Tomorrow's Next Big Thing. Bridging traditional assets with modern Web3AI markets through tokenization, data intelligence, and institutional-grade access.</p>
            <p>W3AI's RWA framework spans 12 core sectors, each representing a multi-billion-dollar opportunity to digitize traditionally illiquid assets into transparent, tradeable, and fractionally accessible digital securities on blockchain networks.</p>
          </div>
        </section>
        <section id="rwa-carbon-credits">
          <h2 className="text-2xl font-bold text-foreground mb-4">Carbon Credits</h2>
          <div className="prose-section">
            <p>Carbon markets are critical to the global fight against climate change, yet they have long been plagued by opacity, fragmentation, and limited accessibility. Tokenization transforms verified carbon credits into transparent, tradeable digital assets on blockchain networks. This enables fractional ownership, real-time price discovery, and automated retirement tracking—empowering institutions, corporations, and individuals to participate in climate action with confidence and efficiency.</p>
            <p>Every token is backed by independently verified carbon offset projects with transparent monitoring, reporting, and verification (MRV). Blockchain-based retirement tracking ensures credits are permanently removed from circulation, preventing double-counting. Key verticals include forestry & REDD+ projects, renewable energy credits, blue carbon from coastal ecosystems, direct air capture technology, and diversified carbon credit funds spanning multiple vintages and standards.</p>
          </div>
        </section>
        <section id="rwa-collectables">
          <h2 className="text-2xl font-bold text-foreground mb-4">Collectables</h2>
          <div className="prose-section">
            <p>The global collectables market—spanning fine art, rare wines, classic automobiles, sports memorabilia, and luxury goods—represents trillions in stored value largely inaccessible to everyday investors. Tokenization transforms these illiquid treasures into fractional digital assets, enabling transparent provenance tracking, instant settlement, and democratized access. Blockchain-verified authenticity and smart contract–governed ownership bring institutional rigor to passion-driven markets.</p>
            <p>Immutable blockchain provenance records ensure every collectable's history, ownership chain, and authenticity are permanently verified. Physical assets are stored in insured, climate-controlled vaults with real-time digital verification. Use cases range from fractional ownership of blue-chip artworks from masters like Picasso and Warhol, to tokenized rare timepieces from Patek Philippe and Rolex, curated wine portfolios, classic car investments, and sports memorabilia with verified provenance.</p>
          </div>
        </section>
        <section id="rwa-commodities">
          <h2 className="text-2xl font-bold text-foreground mb-4">Commodities</h2>
          <div className="prose-section">
            <p>Commodity markets form the backbone of the global economy, yet participation has been dominated by futures exchanges and specialized trading desks. Tokenization creates a direct bridge between physical commodity assets and digital investors, enabling fractional ownership of grain silos, coffee plantations, cotton inventories, and timber forests. Smart contracts handle settlement, custody verification, and yield distribution, bringing 21st-century efficiency to centuries-old markets.</p>
            <p>Every token represents verified, audited physical commodity inventories held in certified warehouses and storage facilities. Commodity-backed tokens provide natural inflation protection as physical goods appreciate with rising price levels. The tokenization framework supports agricultural futures, single-origin coffee and cocoa production, managed timber plantations combining carbon sequestration with harvest revenue, cotton inventories, sugar & ethanol facilities, and transferable water rights.</p>
          </div>
        </section>
        <section id="rwa-energy">
          <h2 className="text-2xl font-bold text-foreground mb-4">Energy</h2>
          <div className="prose-section">
            <p>The energy sector represents one of the largest asset classes globally, yet access has historically been limited to institutional investors and sovereign entities. Tokenization transforms energy assets—from solar farms and wind installations to oil reserves and LNG terminals—into fractional, tradeable digital securities. This democratizes participation while providing asset owners with new capital formation tools and enhanced liquidity for traditionally illiquid holdings.</p>
            <p>Smart contracts automate revenue distribution from energy production, providing real-time visibility into yield generation. Geographic barriers are removed, allowing global investors to participate in projects across jurisdictions. Key verticals include utility-scale solar installations with automated revenue sharing, tokenized oil & gas royalty streams, wind energy credits, EV charging network ownership, LNG terminal access, and carbon credit portfolios linked to energy transition projects.</p>
          </div>
        </section>
        <section id="rwa-infrastructure">
          <h2 className="text-2xl font-bold text-foreground mb-4">Infrastructure</h2>
          <div className="prose-section">
            <p>Infrastructure assets generate predictable, inflation-linked cash flows over decades, making them highly attractive to investors seeking stability. However, the scale of these investments has traditionally excluded all but the largest institutions. Tokenization breaks down billion-dollar infrastructure projects into accessible digital units, enabling retail and mid-market investors to participate in toll roads, airports, water systems, and digital infrastructure alongside institutional capital.</p>
            <p>The global infrastructure market is valued at $130T with an estimated $15T investment gap by 2040. Tokenized infrastructure offers long-term portfolio stability with asset lives spanning 25-99 years and enables seamless participation in public-private partnerships. Use cases include toll road revenue streams, airport concessions, hyperscale data center equity, water utility stakes, port & logistics terminals, and 5G & fiber network infrastructure.</p>
          </div>
        </section>
        <section id="rwa-metals">
          <h2 className="text-2xl font-bold text-foreground mb-4">Metals</h2>
          <div className="prose-section">
            <p>Metals have served as stores of value and industrial inputs for millennia. Today, tokenization bridges physical metal assets with digital Web3 markets, enabling fractional ownership of vaulted gold, silver reserves, copper mines, and lithium deposits. Blockchain verification ensures provenance and purity while smart contracts automate custody, settlement, and dividend distribution across the metals value chain.</p>
            <p>The global metals market exceeds $12T with lithium demand growing at 35% annually. Blockchain-tracked chain of custody from mine to vault ensures authenticity and ethical sourcing compliance. Tokenized metals reflect live spot prices with instant settlement. Key offerings include gold-backed tokens representing allocated bars in audited vaults, silver mining royalties, copper supply contracts, lithium deposit rights critical to the EV battery supply chain, platinum group metals, and recycled metals supporting circular economies.</p>
          </div>
        </section>
        <section id="rwa-rare-earth">
          <h2 className="text-2xl font-bold text-foreground mb-4">Rare Earth Minerals</h2>
          <div className="prose-section">
            <p>Rare earth elements and critical minerals underpin modern technology—from smartphones and electric vehicles to missile guidance systems and wind turbines. Yet investment access has been extremely limited due to supply chain opacity and geopolitical concentration. Tokenization opens this strategically vital sector to a broader investor base while creating transparent, auditable supply chains that enhance national security and economic resilience.</p>
            <p>The rare earth market is valued at $9.6B with 28% annual demand growth and 60% supply concentration risk. Blockchain-verified tracking from mine to end-use ensures ethical sourcing and regulatory compliance. Tokenized rare earth positions provide manufacturers and governments with new tools to hedge supply disruption risk. Verticals include neodymium reserves for EV and wind turbine magnets, lithium-ion supply chains, ethically sourced cobalt mining, graphite production for battery anodes, scandium alloys for aerospace, and diversified critical mineral funds.</p>
          </div>
        </section>
        <section id="rwa-real-estate">
          <h2 className="text-2xl font-bold text-foreground mb-4">Real Estate</h2>
          <div className="prose-section">
            <p>Real estate is the world's most valuable asset class at $326T, yet it remains one of the least liquid. Tokenization transforms physical properties—office towers, residential complexes, retail centers, and hospitality assets—into tradeable digital securities. Investors can own fractions of premium properties across global markets, receive automated rental distributions, and trade positions on secondary markets, all while maintaining the fundamental value proposition of real estate ownership.</p>
            <p>Smart contracts handle rental income distribution automatically, reducing administrative overhead and ensuring timely investor payments. Entry barriers drop from six-figure minimums to as low as $100. The framework supports commercial office towers with long-term corporate leases, multi-family residential portfolios, hospitality assets with revenue-based returns, industrial & warehouse logistics, student housing near major universities, and mixed-use urban developments combining retail, residential, and commercial spaces.</p>
          </div>
        </section>
        <section id="rwa-sovereign-wealth">
          <h2 className="text-2xl font-bold text-foreground mb-4">Sovereign Wealth</h2>
          <div className="prose-section">
            <p>Sovereign wealth funds manage over $11.5 trillion in assets globally, representing the long-term savings and strategic reserves of nations. Tokenization offers these institutions unprecedented tools for portfolio diversification, co-investment structuring, and cross-border capital deployment. By digitizing sovereign holdings, governments gain real-time portfolio visibility, enhanced liquidity management, and the ability to democratize national wealth for citizen participation programs.</p>
            <p>With 90+ active SWFs and investment horizons exceeding 50 years, tokenization enables national asset digitization—transforming sovereign holdings in natural resources, infrastructure, and real estate into transparent, auditable digital portfolios. Use cases include sovereign digital bonds with automated coupon payments, national resource fund royalties distributed to citizens, smart contract platforms for multi-sovereign co-investment in mega projects, citizen wealth distribution programs, strategic reserve management with real-time auditing, and development finance instruments for emerging markets.</p>
          </div>
        </section>
        <section id="rwa-stablecoins">
          <h2 className="text-2xl font-bold text-foreground mb-4">Stablecoins</h2>
          <div className="prose-section">
            <p>Stablecoins represent the critical bridge between traditional finance and the on-chain economy. Backed by fiat reserves, government treasuries, or algorithmically managed collateral pools, they provide the price stability essential for tokenized asset settlement, cross-border payments, and yield generation. As the tokenized RWA ecosystem scales, stablecoins serve as the foundational settlement and liquidity layer enabling seamless capital flows across jurisdictions.</p>
            <p>The stablecoin market cap exceeds $170B with over $7T in annual settlement volume reaching 190+ countries with 24/7 availability. Treasury-backed stablecoins pass through underlying yield from government bonds and money market instruments. Key verticals include treasury-backed coins collateralized by U.S. Treasury bills, cross-border settlement rails for international trade, native RWA payment infrastructure for dividend distributions, institutional yield vaults, multi-currency stables (EUR, GBP, emerging markets), and DeFi liquidity pools for tokenized assets.</p>
          </div>
        </section>
        <section id="rwa-tax-credits">
          <h2 className="text-2xl font-bold text-foreground mb-4">Tax Credits</h2>
          <div className="prose-section">
            <p>Tax credits—including renewable energy investment tax credits (ITCs), production tax credits (PTCs), historic rehabilitation credits, and low-income housing tax credits (LIHTCs)—represent billions in annual government incentives. Yet accessing these credits has traditionally required complex syndication structures, long negotiation timelines, and significant minimum commitments. Tokenization transforms tax credits into transparent, tradeable digital assets, enabling fractional ownership, faster settlement, and programmatic compliance verification.</p>
            <p>The annual US tax credit market exceeds $50B with tokenization delivering up to 40% efficiency gains. Smart contracts enforce eligibility requirements, recapture provisions, and holding period rules automatically, while reducing syndication timelines from months to days. Verticals include renewable energy ITCs from solar, wind, and battery storage projects, low-income housing (LIHTC) programs, historic rehabilitation credits, R&D tax credits, opportunity zone investments combining capital gains deferral with community impact, and carbon & clean energy production tax credits.</p>
          </div>
        </section>
        <section id="rwa-utilities">
          <h2 className="text-2xl font-bold text-foreground mb-4">Utilities</h2>
          <div className="prose-section">
            <p>Utility companies provide essential services—electricity, gas, water, and telecommunications—that generate stable, regulated revenue streams. These assets have traditionally been accessible only through public equities or massive infrastructure deals. Tokenization enables fractional ownership of utility-grade assets, from renewable energy installations and water treatment facilities to broadband networks and smart grid infrastructure.</p>
            <p>The global utilities market exceeds $5T with predictable cash flows driven by regulated rate structures. Tokenized utility stakes provide inflation-protected yield with historically low correlation to equity markets. The framework supports municipal energy cooperatives, water treatment and distribution infrastructure, smart grid and distributed energy resources, telecom tower and fiber optic networks, waste-to-energy facilities, and district heating and cooling systems.</p>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 07: W3AI Token Utility */}
      {/* ============================================================ */}
      <div className={p("w3ai-token-utility")}>
        <section id="w3ai-token-utility">
          <h2 className="text-2xl font-bold text-foreground mb-4">W3AI Token Utility</h2>
          <div className="prose-section">
            <p>The W3AI token is the native utility and governance token powering the entire W3AI ecosystem. Token utility extends across every product surface—from browser-native AI access to validator operations and cross-chain governance.</p>
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
      </div>

      {/* ============================================================ */}
      {/* PAGE 08: W3AI Governance */}
      {/* ============================================================ */}
      <div className={p("governance")}>
        <section id="governance">
          <h2 className="text-2xl font-bold text-foreground mb-4">W3AI Governance</h2>
          <div className="prose-section">
            <p>W3AI is designed to evolve from core-team-led to fully community-governed. The governance framework establishes transparent decision-making processes for treasury management, protocol upgrades, and ecosystem development.</p>
          </div>
        </section>
        <section id="foundation-governance">
          <h2 className="text-2xl font-bold text-foreground mb-4">Governance Framework</h2>
          <div className="prose-section">
            <p>W3AI governance is designed to evolve from core-team-led to community-led over time. Token holders participate in decisions covering treasury policy, supported chains, fee parameters, and security thresholds.</p>
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
      {/* PAGE 09: W3AI Tokenomics */}
      {/* ============================================================ */}
      <div className={p("token-utility")}>
        <section id="token-utility">
          <h2 className="text-2xl font-bold text-foreground mb-4">W3AI Tokenomics</h2>
          <div className="prose-section">
            <p>This section covers token assumptions, monetization surfaces, and treasury mechanics.</p>
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
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">Treasury Takeaway:</strong> This is a treasury-heavy allocation (52.5%), which can be a strength if governance, reporting, and custody controls are executed at institutional quality.</p>
            </div>
            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Lockups & Vesting</h4>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Private Pre-Sale 1 (unlocked): Released prior to IDO / TGE; eligible for staking rewards while staked.</li>
              <li>Private Pre-Sale 2 & Seed Round (locked): Released across isochronic events over 6 months, beginning 30 days after IDO.</li>
              <li>IDO / TGE: Without vesting period; staking encouraged for platform access.</li>
              <li>Team & Advisors: Locked; vest over 12 months across 21 isochronic events starting 30 days after IDO.</li>
            </ul>
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
                    <th className="text-right px-4 py-3 font-semibold text-foreground">Tokens</th>
                    <th className="text-right px-4 py-3 font-semibold text-foreground">Share</th>
                    <th className="text-right px-4 py-3 font-semibold text-foreground">Token Price</th>
                    <th className="text-right px-4 py-3 font-semibold text-foreground">Raise</th>
                    <th className="text-right px-4 py-3 font-semibold text-foreground">FDV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["Private Pre-Sale 1", "200,000,000", "10%", "$0.001875", "$375,500", "$3,750,000"],
                    ["Private Pre-Sale 2", "200,000,000", "10%", "$0.003750", "$750,000", "$7,500,000"],
                    ["Seed Round", "200,000,000", "10%", "$0.007500", "$1,000,000", "$15,000,000"],
                    ["IDO / TGE", "200,000,000", "10%", "$0.015000", "$1,000,000", "$30,000,000"],
                  ].map(([r, t, s, p, ra, f]) => (
                    <tr key={r} className="hover:bg-muted/50">
                      <td className="px-4 py-2.5 text-foreground">{r}</td>
                      <td className="px-4 py-2.5 text-right text-muted-foreground">{t}</td>
                      <td className="px-4 py-2.5 text-right text-muted-foreground">{s}</td>
                      <td className="px-4 py-2.5 text-right text-muted-foreground">{p}</td>
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
      {/* PAGE 10: Institutional-Grade Rails */}
      {/* ============================================================ */}
      <div className={p("institutional-rails")}>
        <section id="institutional-rails">
          <h2 className="text-2xl font-bold text-foreground mb-4">Institutional-Grade Rails</h2>
          <div className="prose-section">
            <p>W3AI's mission is consumer-first, but the Web3 browser category will increasingly serve professionals and institutions. Northern Trust has described blockchain/tokenization initiatives utilizing its digital assets platform (Matrix Zenith) and participation in tokenizing ESG reporting credentials.</p>
            <p>W3AI translates this into product positioning: the browser becomes the interface where "tokenized everything" (RWAs, funds, ESG credentials) is discovered, verified, and managed.</p>
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
            <p>The browser serves as a discovery and management interface for tokenized real-world assets—real estate, commodities, carbon credits, infrastructure—bridging traditional finance with on-chain liquidity and fractional ownership.</p>
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
      {/* PAGE 11: Community Integrations */}
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
      {/* PAGE 12: Supported Networks */}
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
          { id: "network-zksync", name: "zkSync", desc: "zkSync Era delivers the highest throughput Ethereum L2 experience with native account abstraction and zero-knowledge proof security. W3AI leverages zkSync for privacy-preserving AI computations and gasless user onboarding flows.", bullets: ["Native account abstraction for seamless gasless transactions.", "ZK-proof verification ensuring computational integrity for AI outputs.", "Hyperchain architecture enabling W3AI-dedicated execution environments.", "Paymaster contracts subsidizing end-user gas for frictionless onboarding."], links: { github: "https://github.com/matter-labs", foundation: "https://zksync.io", x: "https://x.com/zaborny_kksync", visit: "https://zksync.io" }},
          { id: "network-avalanche", name: "Avalanche", desc: "Avalanche's subnet architecture allows W3AI to deploy purpose-built blockchain environments with custom gas tokens, validator sets, and compliance rules — ideal for regulated RWA tokenization and institutional AI applications.", bullets: ["Subnet deployment for dedicated W3AI execution with custom parameters.", "Sub-second finality enabling real-time AI agent decision execution.", "Institutional DeFi ecosystem with native KYC/AML compliance tooling.", "Warp Messaging for seamless cross-subnet AI agent communication."], links: { github: "https://github.com/ava-labs", foundation: "https://www.avax.network", x: "https://x.com/avaborny_kavax", visit: "https://www.avax.network" }},
          { id: "network-arbitrum", name: "Arbitrum", desc: "Arbitrum One is the leading Ethereum L2 by TVL, providing W3AI with access to the deepest Layer 2 DeFi liquidity. Its optimistic rollup architecture delivers 10x cost reduction while inheriting Ethereum's full security model.", bullets: ["Optimistic rollup with 7-day fraud proof window and Ethereum-grade security.", "Arbitrum Orbit chains for dedicated W3AI application rollups.", "Stylus smart contracts enabling Rust/C++ for high-performance AI logic.", "Deepest L2 DeFi liquidity via GMX, Aave, and Uniswap deployments."], links: { github: "https://github.com/OffchainLabs", foundation: "https://arbitrum.foundation", x: "https://x.com/arbitrum", visit: "https://arbitrum.io" }},
          { id: "network-optimism", name: "Optimism", desc: "Optimism powers the Superchain vision — a unified network of interoperable L2 chains. W3AI integrates with Optimism for its governance-forward ecosystem, retroactive public goods funding, and seamless cross-chain messaging via the OP Stack.", bullets: ["OP Stack integration for potential W3AI-dedicated chain deployment.", "Cross-chain message passing via Superchain interoperability layer.", "RetroPGF alignment for funding open-source AI safety research.", "EVM equivalence ensuring zero-friction smart contract portability."], links: { github: "https://github.com/ethereum-optimism", foundation: "https://optimism.io", x: "https://x.com/Optimism", visit: "https://optimism.io" }},
          { id: "network-base", name: "Base", desc: "Base, incubated by Coinbase, bridges the gap between centralized exchange liquidity and on-chain DeFi. W3AI leverages Base for seamless fiat-to-crypto onboarding and access to Coinbase's 110M+ verified user base.", bullets: ["Direct Coinbase integration for institutional-grade fiat on/off ramps.", "OP Stack foundation with Superchain interoperability benefits.", "Lowest-cost EVM execution for high-frequency AI micro-transactions.", "Smart Wallet integration for one-click onboarding without seed phrases."], links: { github: "https://github.com/base-org", foundation: "https://base.org", x: "https://x.com/base", visit: "https://base.org" }},
          { id: "network-fantom", name: "Fantom", desc: "Fantom's Lachesis consensus delivers DAG-based finality in 1-2 seconds with minimal fees. The upcoming Sonic upgrade positions Fantom as one of the fastest EVM chains — ideal for W3AI's latency-sensitive AI agent operations.", bullets: ["DAG-based Lachesis consensus for near-instant transaction finality.", "Sonic upgrade delivering 2,000+ TPS for high-frequency AI workloads.", "Fee monetization model sharing 90% of gas fees with dApp developers.", "Battle-tested DeFi ecosystem with established liquidity protocols."], links: { github: "https://github.com/Fantom-foundation", foundation: "https://fantom.foundation", x: "https://x.com/FantomFDN", visit: "https://fantom.foundation" }},
          { id: "network-cronos", name: "Cronos", desc: "Cronos, powered by Crypto.com, connects W3AI to 80M+ Crypto.com app users and a robust CeFi-DeFi bridge. Its Cosmos SDK foundation and EVM compatibility create a unique hybrid environment for retail-focused AI applications.", bullets: ["Crypto.com ecosystem integration with 80M+ retail users.", "EVM and Cosmos SDK dual compatibility for maximum composability.", "Cronos zkEVM scaling solution for privacy-preserving transactions.", "Native fiat gateway via Crypto.com Pay for seamless onboarding."], links: { github: "https://github.com/crypto-org-chain", foundation: "https://cronos.org", x: "https://x.com/cronaborny_k", visit: "https://cronos.org" }},
          { id: "network-moonbeam", name: "Moonbeam", desc: "Moonbeam is the top Polkadot parachain for EVM-compatible smart contracts, providing W3AI with cross-chain connectivity to the entire Polkadot ecosystem via XCM messaging and access to shared security from the Polkadot relay chain.", bullets: ["Full EVM and Substrate API compatibility for hybrid dApp development.", "XCM messaging for cross-parachain AI agent orchestration.", "Polkadot relay chain shared security model.", "Connected contracts enabling multi-chain logic execution from a single deployment."], links: { github: "https://github.com/moonbeam-foundation", foundation: "https://moonbeam.foundation", x: "https://x.com/MoonbeamNetwork", visit: "https://moonbeam.network" }},
        ].map(n => (
          <section key={n.id} id={n.id}>
            <div className="flex items-center flex-wrap gap-4 mb-4">
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
      {/* PAGE 13: Foundations */}
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
      {/* PAGE 14: Multi-Chain Deployments */}
      {/* ============================================================ */}
      <div className={p("multi-chain")}>
        <section id="multi-chain">
          <h2 className="text-2xl font-bold text-foreground mb-4">Multi-Chain Deployments & Supply Integrity</h2>
          <div className="prose-section">
            <p>W3AI intends native token representations on Solana, Ethereum, and BSC. The multi-chain strategy is designed to maximize ecosystem reach while maintaining absolute supply integrity across all deployed networks. Tokenomics must prevent multi-chain "supply duplication" — a critical risk when tokens exist on multiple blockchains simultaneously.</p>
          </div>
        </section>
        <section id="multi-hub-spoke">
          <h2 className="text-2xl font-bold text-foreground mb-4">Hub & Spoke Architecture</h2>
          <div className="prose-section">
            <p>Solana serves as the Canonical Mint and Hub Chain. All 2,000,000,000 W3AI tokens are minted natively on Solana. Ethereum and BNB Smart Chain operate as spoke chains, receiving wrapped or bridged representations of the canonical supply. This hub-and-spoke model ensures a single source of truth for total supply, eliminates the risk of independent minting on secondary chains, and simplifies auditing and compliance reporting.</p>
            <p>The architecture leverages Solana's high throughput and low transaction costs for primary token operations—staking, governance voting, and reward distribution—while maintaining presence on Ethereum and BSC for DeFi composability and exchange listing requirements.</p>
          </div>
        </section>
        <section id="multi-wormhole">
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
        <section id="multi-supply-integrity">
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
        <section id="multi-chain-governance">
          <h2 className="text-2xl font-bold text-foreground mb-4">Cross-Chain Governance</h2>
          <div className="prose-section">
            <p>Governance participation is chain-agnostic. Token holders on Ethereum and BSC can vote on proposals without bridging back to Solana. Cross-chain message passing aggregates voting power from all chains into a unified governance result on the hub chain.</p>
            <p>This ensures that the multi-chain deployment does not fragment governance participation or create asymmetric voting power between chains. All governance outcomes are executed on Solana and propagated to spoke chains via Wormhole messaging.</p>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 15: Validator Yield & Staking */}
      {/* ============================================================ */}
      <div className={p("validator-yield")}>
        <section id="validator-yield">
          <h2 className="text-2xl font-bold text-foreground mb-4">Validator Yield & Staking Economics</h2>
          <div className="prose-section">
            <p>Validator operations generate protocol-native rewards and must be managed with relentless operational discipline.</p>
          </div>
        </section>
        <section id="eth-validators">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ethereum Validators</h2>
          <div className="prose-section">
            <p>A validator must deposit 32 ETH and run execution, consensus, and validator clients, with potential slashing of some or all staked ETH for dishonest behavior.</p>
          </div>
        </section>
        <section id="bsc-validators">
          <h2 className="text-2xl font-bold text-foreground mb-4">BSC Validators</h2>
          <div className="prose-section">
            <p>Becoming a validator requires minimum self-delegation of 2000 BNB. Validators earn rewards from transaction fees with slashing and jailing rules for downtime, double-signing, and low self-delegation.</p>
          </div>
        </section>
        <section id="sol-validators">
          <h2 className="text-2xl font-bold text-foreground mb-4">Solana Validators</h2>
          <div className="prose-section">
            <p>Validators "form the backbone" of the Solana network with protocol-based rewards from inflation plus staking-related rewards and fee earnings.</p>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 16: Liquidity & Market Making */}
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
      {/* PAGE 17: Marketing & Distribution */}
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
            <p>W3AI's KOL engine is structured as "proof, not hype":</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Security KOLs who discuss wallet safety, transaction clarity, and AI-agent threat models.</li>
              <li>Chain-native creators with content mapping to each chain's daily reality.</li>
              <li>Builder KOLs in hackathon ecosystems.</li>
            </ul>
            <p>Success metrics are tied to product behaviors: Registry sign-ups, wallet connections, first swap, daily active retention.</p>
          </div>
        </section>
        <section id="six-month-rollout">
          <h2 className="text-2xl font-bold text-foreground mb-4">Six-Month Rollout with Partners</h2>
          <div className="prose-section">
            <p>Pre-sale marketing → TGE → listings/liquidity expansion, with partner-led distribution:</p>
            <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
              <li>Changelly: Instant exchange and on/off-ramp flows (2.7M community members).</li>
              <li>Hacken: "Verified-by-security" co-marketing with audits and monitoring.</li>
              <li>Dentity: Trusted onboarding and privacy-preserving credentials.</li>
              <li>Northern Trust: Institutional tokenization narrative alignment.</li>
              <li>Surge: Discovery and execution gateway for tokenized launches.</li>
              <li>G-20 Group: Professional liquidity and treasury management expertise.</li>
            </ul>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 18: Network Partners */}
      {/* ============================================================ */}
      <div className={p("strategic-partners")}>
        <section id="strategic-partners">
          <h2 className="text-2xl font-bold text-foreground mb-4">Network Partners</h2>
          <div className="prose-section">
            <p>W3AI's partner ecosystem is designed to cover every critical surface of the product—from security and identity to liquidity and institutional credibility. Each partnership is structured around product integration, not brand association.</p>
          </div>
        </section>
        {[
          { id: "partner-changelly", name: "Changelly", url: "https://changelly.com", p1: "Changelly provides instant exchange and on/off-ramp infrastructure with a 2.7M-member community. Within W3AI, Changelly's Exchange API powers in-browser swap execution with transparent convenience fees. The API's \"extra fee\" functionality enables W3AI to configure an additional commission layer that routes to the project treasury.", p2: "Changelly supports 500+ crypto assets across multiple blockchains, providing W3AI users with broad cross-chain swap coverage without leaving the browser environment." },
          { id: "partner-hacken", name: "Hacken", url: "https://hacken.io", p1: "Hacken delivers the security backbone for W3AI through smart contract audits, wallet audits, penetration testing, tokenomics audits, proof-of-reserves audits, and post-deployment monitoring. In W3AI, this translates to an \"in-browser trust layer\" providing risk flags, verified proofs, and standardized security context before users commit capital.", p2: "The \"Verified-by-security\" co-marketing strategy positions W3AI as the browser that takes security seriously—not as an afterthought, but as a core product feature." },
          { id: "partner-dentity", name: "Dentity", url: "https://dentity.com", p1: "Dentity provides the privacy-forward credential layer that strengthens W3AI's Registry and whitelisted-wallet objective. Dentity emphasizes trust, identity verification, and digital credentials while preserving user privacy.", p2: "W3AI leverages Dentity for pre-sale and beta access controls (credentialed wallet allowlists), reduced bot/sybil influence in governance, and higher-trust partner campaigns with per-vertical onboarding." },
          { id: "partner-northern-trust", name: "Northern Trust", url: "https://www.northerntrust.com", p1: "Northern Trust brings institutional credibility and tokenization expertise through its digital assets platform (Matrix Zenith) and participation in tokenizing ESG reporting credentials. W3AI translates this into product positioning: the browser becomes the interface where \"tokenized everything\"—RWAs, funds, ESG credentials—is discovered, verified, and managed.", p2: "This partnership signals to institutional participants that W3AI is building for the convergence of traditional finance and decentralized infrastructure." },
          { id: "partner-surge", name: "Surge", url: "https://surge.lablab.ai", p1: "Surge operates as W3AI's discovery and execution gateway for tokenized launches. Within the W3AI ecosystem, Surge provides infrastructure for token distribution events, community-driven launches, and curated project discovery.", p2: "The integration enables W3AI browser users to participate in vetted token launches directly from their browsing environment with built-in security checks and credential verification." },
          { id: "partner-g20", name: "G-20 Group", url: "https://g20.group", p1: "G-20 Group provides professional liquidity solutions and treasury management across exchange-traded and on-chain venues. Within W3AI, this maps to a multi-venue liquidity framework, risk-managed treasury yield, and market-depth stability programs tied to milestones.", p2: "G-20 Group's expertise ensures that W3AI's market making operations meet institutional standards for reliability, transparency, and cross-venue coherence." },
          { id: "partner-lablab", name: "LabLab", url: "https://lablab.ai", p1: "LabLab.ai is a global AI innovation community with over 251,000 members, 23,000+ teams, and 5,200+ prototypes built through free-to-attend AI hackathons. LabLab connects builders, developers, and entrepreneurs with state-of-the-art AI tools and mentorship to accelerate product development from concept to launch.", p2: "Within the W3AI ecosystem, LabLab serves as a talent and innovation pipeline—sourcing AI-native builders who can extend browser functionality, develop W3AI extensions, and contribute to the protocol's open-source components. LabLab's hackathon infrastructure provides W3AI with a repeatable engine for community-driven development and rapid prototyping of new features." },
        ].map(partner => (
          <section key={partner.id} id={partner.id}>
            <div className="flex items-center flex-wrap gap-4 mb-4">
              <h2 className="text-2xl font-bold text-foreground">{partner.name}</h2>
              <a href={partner.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(75,80%,55%)] text-black text-sm font-medium hover:bg-[hsl(75,80%,45%)] transition-colors">Visit ↗</a>
            </div>
            <div className="prose-section">
              <p>{partner.p1}</p>
              <p>{partner.p2}</p>
            </div>
          </section>
        ))}
      </div>

      {/* ============================================================ */}
      {/* PAGE 19: Infrastructure */}
      {/* ============================================================ */}
      <div className={p("infrastructure")}>
        <section id="infrastructure">
          <h2 className="text-2xl font-bold text-foreground mb-4">Infrastructure</h2>
          <div className="prose-section">
            <p>W3AI's infrastructure layer underpins every product surface—from browser AI inference to multi-chain validator operations. The architecture is designed for resilience, scalability, and operational transparency.</p>
          </div>
        </section>
        <section id="infra-network">
          <h2 className="text-2xl font-bold text-foreground mb-4">Network Architecture</h2>
          <div className="prose-section">
            <p>W3AI's network infrastructure spans three blockchain ecosystems—Solana, Ethereum, and BNB Smart Chain—with Solana as the canonical mint and hub chain. The architecture uses Wormhole Native Token Transfers (NTT) for hub-and-spoke supply management with burn-and-mint models and governance-configurable per-chain rate limits.</p>
            <p>Backend services are distributed across geo-redundant infrastructure with edge computing for latency-sensitive operations such as AI inference routing and real-time transaction simulation.</p>
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
      {/* PAGE 20: Cybersecurity */}
      {/* ============================================================ */}
      <div className={p("security")}>
        <section id="security">
          <h2 className="text-2xl font-bold text-foreground mb-4">Cybersecurity</h2>
          <div className="prose-section">
            <p>Security is the non-negotiable foundation of every W3AI product surface. In an era where AI agents execute financial transactions, interact with smart contracts, and manage digital identities on behalf of users, the attack surface has expanded beyond traditional cybersecurity models. W3AI treats security not as a feature layer but as an architectural primitive—embedded at every level from browser runtime to on-chain execution.</p>
          </div>
        </section>
        <section id="security-network">
          <h2 className="text-2xl font-bold text-foreground mb-4">Network Security</h2>
          <div className="prose-section">
            <p>W3AI's network security model spans three blockchain ecosystems—Solana, Ethereum, and BNB Smart Chain—each with distinct consensus mechanisms, validator economics, and threat profiles. The protocol implements defense-in-depth across all layers:</p>
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
              <li>Formal verification: Critical contract paths—token minting, governance execution, and bridge operations—are formally verified where applicable.</li>
              <li>Bug bounty programs: Continuous community-driven vulnerability discovery with tiered rewards based on severity classification.</li>
              <li>Upgrade governance: All contract upgrades require multi-sig approval with time-lock periods, ensuring no single actor can modify live contracts unilaterally.</li>
              <li>Supply integrity enforcement: Automated cross-chain reconciliation checks verify that the total W3AI supply across all deployed chains equals the canonical 2,000,000,000 at every block.</li>
            </ul>
          </div>
        </section>
        <section id="security-defi">
          <h2 className="text-2xl font-bold text-foreground mb-4">DeFi Security</h2>
          <div className="prose-section">
            <p>Decentralized finance introduces unique security challenges—flash loan attacks, oracle manipulation, liquidity pool exploits, and MEV extraction. W3AI addresses these through purpose-built safeguards integrated into the browser and protocol layers:</p>
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
      {/* PAGE 21: Auditing */}
      {/* ============================================================ */}
      <div className={p("auditing")}>
        <section id="auditing">
          <h2 className="text-2xl font-bold text-foreground mb-4">Auditing</h2>
          <div className="prose-section">
            <p>W3AI maintains a rigorous auditing framework that spans both technical infrastructure and financial operations. Auditing is not a one-time event but a continuous process embedded into the protocol's operational lifecycle—ensuring accountability, transparency, and regulatory compliance across all jurisdictions where W3AI operates.</p>
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
              <li>Formal verification: Critical contract paths—including token minting, bridge operations, and governance execution—undergo formal mathematical verification where applicable.</li>
              <li>Tokenomics audit: Independent validation of supply mechanics, vesting schedules, burn mechanisms, and treasury allocation logic to ensure alignment with published parameters.</li>
              <li>Post-deployment monitoring: Continuous on-chain surveillance for anomalous contract behavior, unauthorized access patterns, and supply integrity deviations.</li>
              <li>Re-audit cycles: All major contract upgrades trigger mandatory re-audit before deployment. Audit reports are published publicly for community verification.</li>
            </ul>
          </div>
        </section>
        <section id="auditing-financial">
          <h2 className="text-2xl font-bold text-foreground mb-4">Financial Auditing</h2>
          <div className="prose-section">
            <p>W3AI maintains dual-jurisdiction financial auditing standards to satisfy regulatory requirements in both Canada and Liechtenstein—the two primary regulatory environments under which the project operates.</p>
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
      {/* PAGE 22: Privacy Policy */}
      {/* ============================================================ */}
      <div className={p("privacy")}>
        <section id="privacy">
          <h2 className="text-2xl font-bold text-foreground mb-4">Privacy Policy</h2>
          <div className="prose-section">
            <p>Privacy is a foundational principle of Web3 architecture. W3AI is committed to building privacy-preserving systems that protect user data, on-chain identity, and transactional confidentiality while maintaining compliance with applicable regulatory frameworks. The privacy framework is designed specifically for the Web3 environment, where traditional data collection models are replaced by cryptographic verification, zero-knowledge proofs, and user-sovereign data ownership.</p>
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
            <p>W3AI's Registry and whitelisted-wallet objective is strengthened by integrating a privacy-forward credential layer through Dentity, emphasizing trust, identity verification, and digital credentials. W3AI leverages this to support:</p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Pre-sale / beta access controls (credentialed wallet allowlists).</li>
              <li>Reduced bot/sybil influence in governance.</li>
              <li>Higher-trust partner campaigns and per-vertical onboarding.</li>
            </ul>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 23: Risks & Disclosures */}
      {/* ============================================================ */}
      <div className={p("risks")}>
        <section id="risks">
          <h2 className="text-2xl font-bold text-foreground mb-4">Risks, Security & Disclosures</h2>
          <div className="prose-section">
            <p>AI browsers and agentic workflows introduce genuine new risks. W3AI must assume that any browser-integrated assistant operating over untrusted web content is a target, and must treat "agent permissions" with the same rigor as "wallet permissions."</p>
            <p>W3AI implements boundaries including: no autonomous signing, always-on transaction simulation and explainability, explicit whitelists for dApp connections, isolated profiles for high-risk browsing and airdrop hunting.</p>
            <p className="italic text-muted-foreground">Exchange listing targets are aspirational. Kraken, Coinbase, Gate, and MEXC all describe formal processes and criteria, and none guarantee approval.</p>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* PAGE 24: Appendix & References */}
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
      // Sub-section: wait for page render then scroll
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
      <Navbar />
      <ReadingProgress />

      <div className="flex min-h-[calc(100vh-80px)] pt-16 lg:pt-20">
        <DesktopSidebar activeId={activeId} onNavigate={navigateTo} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} />
        {sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="sticky top-[80px] h-10 w-10 flex items-center justify-center shrink-0 z-10 text-muted-foreground hover:text-foreground transition-colors"
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
        .prose-section strong { color: hsl(var(--foreground)); }

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
          strong { color: #ffffff !important; }

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
          th, td { color: #e0e0e0 !important; border-color: #333 !important; }

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
