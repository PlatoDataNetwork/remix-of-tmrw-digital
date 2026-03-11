import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, ChevronRight, ChevronDown, Menu, X, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import whitepaperHero from "@/assets/whitepaper-hero.png";

const PASSWORD = "W3AI88";

// --- Sidebar structure ---
interface Section {
  id: string;
  title: string;
  children?: { id: string; title: string }[];
}

const sections: Section[] = [
  { id: "executive-summary", title: "Rise of the Machines" },
  { id: "tmrw-browser", title: "The W3AI TMRW Browser", children: [
    { id: "browser-architecture", title: "Browser Architecture & Firefox" },
    { id: "differentiation", title: "Differentiation vs Competitors" },
    { id: "llm-layer", title: "User-selectable LLM Layer" },
    { id: "swap-execution", title: "Built-in Swap Execution" },
    { id: "security-intelligence", title: "Security Intelligence" },
  ]},
  { id: "identity-anti-sybil", title: "Identity & Anti-Sybil" },
  { id: "institutional-rails", title: "Institutional-Grade Rails" },
  { id: "community-integrations", title: "Community Integrations", children: [
    { id: "solana-community", title: "Solana" },
    { id: "ethereum-community", title: "Ethereum" },
    { id: "bsc-community", title: "BSC" },
  ]},
  { id: "token-utility", title: "Token Utility & Monetization", children: [
    { id: "token-pillars", title: "Token Utility Pillars" },
    { id: "tokenomics", title: "Tokenomics Design" },
    { id: "supply-allocations", title: "Supply & Allocations" },
    { id: "sale-rounds", title: "Sale Rounds & Pricing" },
    { id: "byok-gateway", title: "BYOK vs Open Gateway" },
    { id: "swaps-fee", title: "Swaps & Convenience Fee" },
  ]},
  { id: "multi-chain", title: "Multi-Chain Deployments" },
  { id: "validator-yield", title: "Validator Yield & Staking", children: [
    { id: "eth-validators", title: "Ethereum Validators" },
    { id: "bsc-validators", title: "BSC Validators" },
    { id: "sol-validators", title: "Solana Validators" },
  ]},
  { id: "liquidity", title: "Liquidity & Market Making", children: [
    { id: "dex-strategy", title: "DEX Liquidity Strategy" },
    { id: "cex-strategy", title: "CEX Listing Readiness" },
    { id: "partner-mm", title: "Partner Market Making" },
  ]},
  { id: "marketing", title: "Marketing & Distribution", children: [
    { id: "community-growth", title: "Community Growth Objectives" },
    { id: "kol-strategy", title: "Social & KOL Strategy" },
    { id: "six-month-rollout", title: "Six-Month Rollout" },
  ]},
  { id: "risks", title: "Risks & Disclosures" },
  { id: "appendix", title: "Appendix & References" },
  { id: "disclaimer", title: "Disclaimer" },
];

// --- Password Gate ---
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === PASSWORD) {
      sessionStorage.setItem("wp_unlocked", "1");
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-4 p-8 rounded-xl border border-border bg-card shadow-2xl space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Protected Document</h2>
          <p className="text-sm text-muted-foreground text-center">Enter the password to access the W3AI Light Paper.</p>
        </div>
        <Input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={e => { setPw(e.target.value); setError(false); }}
          className={cn(error && "border-destructive ring-destructive")}
          autoFocus
        />
        {error && <p className="text-sm text-destructive text-center">Incorrect password. Try again.</p>}
        <Button type="submit" className="w-full">Unlock</Button>
      </form>
    </div>
  );
}

// --- Sidebar Nav ---
function Sidebar({ activeId, onNavigate, open, onClose }: { activeId: string; onNavigate: (id: string) => void; open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={onClose} />}
      <aside className={cn(
        "fixed top-[64px] lg:top-[64px] left-0 z-40 h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] w-72 border-r border-border bg-sidebar-background overflow-y-auto transition-transform duration-300 lg:translate-x-0 lg:sticky lg:z-0 shrink-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="sticky top-0 bg-sidebar-background border-b border-border p-4 flex items-center justify-end">
          <button onClick={onClose} className="lg:hidden text-sidebar-foreground"><X className="h-5 w-5" /></button>
        </div>
        <nav className="p-3 space-y-0.5">
          {sections.map(s => {
            const isActive = activeId === s.id || s.children?.some(c => c.id === activeId);
            const isOpen = expanded[s.id] ?? isActive;
            return (
              <div key={s.id}>
                <button
                  onClick={() => { if (s.children) toggle(s.id); else { onNavigate(s.id); onClose(); } }}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  {s.children ? (isOpen ? <ChevronDown className="h-3.5 w-3.5 shrink-0" /> : <ChevronRight className="h-3.5 w-3.5 shrink-0" />) : <span className="w-3.5" />}
                  <span className="text-left">{s.title}</span>
                </button>
                {s.children && isOpen && (
                  <div className="ml-6 mt-0.5 space-y-0.5 border-l border-border pl-3">
                    {s.children.map(c => (
                      <button
                        key={c.id}
                        onClick={() => { onNavigate(c.id); onClose(); }}
                        className={cn(
                          "w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors",
                          activeId === c.id ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                        )}
                      >
                        {c.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

// --- Content ---
function WhitepaperContent({ onSectionVisible }: { onSectionVisible: (id: string) => void }) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) onSectionVisible(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    document.querySelectorAll("[data-section]").forEach(el => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [onSectionVisible]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
      {/* Hero Robot Image */}
      <div className="flex justify-center">
        <img src={heroBg} alt="W3AI Robot" className="w-full max-w-md h-auto object-contain" />
      </div>

      {/* Executive Summary */}
      <section id="executive-summary" data-section>
        <h1 className="text-3xl font-bold text-foreground mb-6">Rise of the Machines</h1>
        <div className="prose-section">
          <p>W3AI is building the Web3 AI gateway for the "Rise of the Machines" era—when browsers evolve from passive viewers into agentic, AI-native operating systems. Recent launches from Perplexity (Comet) and OpenAI (ChatGPT Atlas) confirm the browser is becoming the primary AI surface where context is captured and actions are executed.</p>
          <p>W3AI's wedge is Web3-native security + immersive UX. AI browsers create new convenience—and new risk. W3AI's product strategy is to treat AI agent permissions and wallet permissions as one coherent security domain: "assist, verify, then act—only with explicit user control."</p>
          <p>The W3AI / TMRW Browser is a macOS desktop Web3 AI Browser built on Firefox with a sidekick mobile app. Firefox is a free, open-source browser using the Gecko rendering engine, designed to be extensible via add-ons and customization. Building on Firefox creates strategic differentiation in a market where many AI browsers trend toward Chromium-based stacks.</p>
          <p><strong>Network thesis:</strong> A browser becomes a category-defining platform when it has its own decentralized backbone. W3AI is building Network infrastructure through a series of validator nodes on Solana, Ethereum, and BNB Smart Chain (BSC).</p>
          <p><strong>Why now:</strong> Crypto adoption is measured in hundreds of millions globally. Global crypto owners grew from 659 million (end of 2024) to 741 million in 2025. Active stablecoin addresses increased from 19.6 million to 30 million from Feb 2024 to Feb 2025. This is the user base that needs a safer, simpler "front door" into Web3.</p>
          <p><strong>Go-to-market focus:</strong> The project targets a six-month rollout with a measurable pre-listing objective: 25,000 Registry users via whitelisted wallets prior to listing. Post-launch, W3AI targets 3–5% share of the Web3 browser market within 12–18 months, modeled as 3M+ monthly users, benchmarked against Brave's reported 101M MAU.</p>
        </div>
      </section>

      {/* TMRW Browser */}
      <section id="tmrw-browser" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">The W3AI TMRW Browser</h2>
        <p className="prose-section">W3AI's product philosophy is that the browser is no longer a "window." It is the execution environment for AI, identity, and money. W3AI's goal is to become the unified gateway that lets users discover → verify → transact → monitor across Web3 with an immersive UI/UX designed for high-frequency multi-chain activity.</p>
      </section>

      <section id="browser-architecture" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">Browser Architecture & Why Firefox Matters</h3>
        <div className="prose-section">
          <p>W3AI's macOS desktop browser is built on Firefox, leveraging a mature, open-source codebase that uses the Gecko engine and supports deep customization. In a market increasingly shaped by AI browsers and agentic assistants, platform choice matters because it influences extension models, sandbox boundaries, and security hardening approaches.</p>
        </div>
      </section>

      <section id="differentiation" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">Differentiation vs Brave, Safari, Comet, and OpenAI Atlas</h3>
        <div className="prose-section">
          <p>W3AI's differentiation must be expressed as workflow superiority and permission superiority—not merely a checklist.</p>
          <p><strong>Brave</strong> demonstrates large-scale demand for privacy-first browsing (100M+ MAU). W3AI must meet or exceed these privacy expectations while also solving Web3-specific safety problems (wallet connections, transaction clarity, contract risk, chain selection, and agent safety).</p>
          <p><strong>Safari</strong> dominates Apple's ecosystem with privacy as a primary differentiator. W3AI's path: "Safari is privacy-first; W3AI is Web3 AI safety-first."</p>
          <p><strong>Comet and Atlas</strong> confirm the new bar: context-aware assistants living inside the browser. W3AI competes by making "agent safety" patterns Web3-native, where "actions" often move assets.</p>
        </div>
      </section>

      <section id="llm-layer" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">User-selectable LLM Layer (BYOK + Open Gateway)</h3>
        <div className="prose-section">
          <p><strong>Bring Your Own Key (BYOK):</strong> Users can connect the LLM provider of their choice using their own API keys. This supports power users and enterprises with preferred vendors, budgets, and compliance requirements.</p>
          <p><strong>W3AI Open Gateway (token-based):</strong> Users can alternatively route inference through a W3AI-managed gateway with token-based billing. The Open Gateway is user-controlled by default with spending caps, per-session limits, and explicit on/off controls. A 30% margin is applied over underlying provider costs with transparent reporting.</p>
        </div>
      </section>

      <section id="swap-execution" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">Built-in Swap Execution</h3>
        <div className="prose-section">
          <p>W3AI intends to embed swap functionality directly in the browser and apply a transparent convenience fee that routes into the W3AI treasury. A practical implementation path is the Changelly API, designed for service providers to let users exchange without leaving the host product. Changelly's API supports an "extra fee" functionality allowing the integrator to configure an additional commission layer.</p>
        </div>
      </section>

      <section id="security-intelligence" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">Security Intelligence</h3>
        <div className="prose-section">
          <p>W3AI will integrate security posture into the act of connecting, signing, and transacting. A practical security integration partner is Hacken, offering smart contract audits, wallet audits, penetration testing, tokenomics audits, proof-of-reserves audits, and post-deployment monitoring. In W3AI, this becomes an "in-browser trust layer": risk flags, verified proofs, and standardized security context before users commit capital.</p>
        </div>
      </section>

      {/* Identity */}
      <section id="identity-anti-sybil" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Identity & Anti-Sybil Primitives</h2>
        <div className="prose-section">
          <p>W3AI's Registry and whitelisted-wallet objective is strengthened by integrating a privacy-forward credential layer through Dentity, emphasizing trust, identity verification, and digital credentials. W3AI leverages this to support:</p>
          <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
            <li>Pre-sale / beta access controls (credentialed wallet allowlists)</li>
            <li>Reduced bot/sybil influence in governance</li>
            <li>Higher-trust partner campaigns and per-vertical onboarding</li>
          </ul>
        </div>
      </section>

      {/* Institutional */}
      <section id="institutional-rails" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Institutional-Grade Rails</h2>
        <div className="prose-section">
          <p>W3AI's mission is consumer-first, but the Web3 browser category will increasingly serve professionals and institutions. Northern Trust has described blockchain/tokenization initiatives utilizing its digital assets platform (Matrix Zenith) and participation in tokenizing ESG reporting credentials.</p>
          <p>W3AI translates this into product positioning: the browser becomes the interface where "tokenized everything" (RWAs, funds, ESG credentials) is discovered, verified, and managed.</p>
        </div>
      </section>

      {/* Community Integrations */}
      <section id="community-integrations" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Community Integrations Across Solana, Ethereum, and BSC</h2>
        <p className="prose-section">W3AI's marketing strategy is authentic community integration. Each chain represents different user psychographics, product norms, and vertical strengths.</p>
      </section>

      <section id="solana-community" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">Solana Community Integrations</h3>
        <div className="prose-section">
          <p>Solana positions itself as a high-performance network enabling fast, secure, affordable transactions. W3AI's Solana strategy focuses on:</p>
          <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
            <li><strong>DeFi-first execution:</strong> A Solana "Trading Space" merging research, route selection, swap simulation, and post-trade monitoring</li>
            <li><strong>NFTs and communities as identity:</strong> Token-gated browsing modes and "community rooms" built around NFT membership</li>
            <li><strong>Builder-native distribution:</strong> Hackathon sponsorships with 48,000+ developers and $600M+ in venture funding</li>
          </ul>
        </div>
      </section>

      <section id="ethereum-community" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">Ethereum Community Integrations</h3>
        <div className="prose-section">
          <p>Ethereum's core superpower is composable dApps. W3AI's Ethereum integrations emphasize:</p>
          <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
            <li>Transaction clarity and contract literacy at the moment of signing</li>
            <li>"Explain this transaction" assistance plus standardized warnings</li>
            <li>Ecosystem-native developer relationships through ETH Global (95+ hackathons, 14,000+ projects)</li>
          </ul>
        </div>
      </section>

      <section id="bsc-community" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">BSC Community Integrations</h3>
        <div className="prose-section">
          <p>BNB Chain emphasizes scale and mass adoption with daily active user figures (1.2M DAU on BSC, 2.7M on opBNB). W3AI's BSC strategy:</p>
          <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
            <li><strong>Retail-first simplicity:</strong> Optimized onboarding, reduced errors in swaps, bridging, and token discovery</li>
            <li><strong>DEX-native behaviors:</strong> An "execution cockpit" optimized for high-volume habits</li>
            <li><strong>Memecoins as community onboarding:</strong> Treated as a gateway vertical with safety overlay (risk banners, scam detection)</li>
          </ul>
        </div>
      </section>

      {/* Token Utility */}
      <section id="token-utility" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Token Utility, Monetization & Treasury</h2>
        <p className="prose-section">This section covers token assumptions, monetization surfaces, and treasury mechanics.</p>
      </section>

      <section id="token-pillars" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">Token Utility Pillars</h3>
        <div className="prose-section">
          <p>W3AI token utility is designed around four demand drivers:</p>
          <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
            <li><strong>Browser-native access:</strong> Premium browser features and AI workflows</li>
            <li><strong>Open Gateway AI spend:</strong> Token-based credits fund inference and routing</li>
            <li><strong>Network incentives:</strong> Validators and application service operators are rewarded</li>
            <li><strong>Governance:</strong> Treasury policy, supported chains, fee parameters, and security thresholds</li>
          </ul>
        </div>
      </section>

      <section id="tokenomics" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">Tokenomics Design</h3>
        <div className="prose-section">
          <p>W3AI is a monetized execution environment (the browser) backed by a decentralized service layer. Tokenomics satisfies three investor-grade requirements:</p>
          <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
            <li><strong>Sustained Demand Drivers:</strong> Token needed for recurring consumption or privileged access</li>
            <li><strong>Credible Supply Integrity:</strong> Prevent "double supply" and bridge-driven inflation across chains</li>
            <li><strong>Transparent Revenue Routing:</strong> Token flows (fees, margins, rewards, burns) are explicit and auditable</li>
          </ul>
        </div>
      </section>

      <section id="supply-allocations" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">Supply, Allocations & Lockups</h3>
        <div className="prose-section">
          <p><strong>Total Supply:</strong> Initial minting: 2,000,000,000 W3AI tokens (2B).</p>
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
            <li><strong>Private Pre-Sale 1 (unlocked):</strong> Released prior to IDO / TGE; eligible for staking rewards while staked</li>
            <li><strong>Private Pre-Sale 2 & Seed Round (locked):</strong> Released across isochronic events over 6 months, beginning 30 days after IDO</li>
            <li><strong>IDO / TGE:</strong> Without vesting period; staking encouraged for platform access</li>
            <li><strong>Team & Advisors:</strong> Locked; vest over 12 months across 21 isochronic events starting 30 days after IDO</li>
          </ul>
        </div>
      </section>

      <section id="sale-rounds" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">Sale Rounds & Pricing</h3>
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

      <section id="byok-gateway" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">BYOK vs Open Gateway</h3>
        <div className="prose-section">
          <p><strong>BYOK (Bring Your Own Key):</strong> User provides their own API key for their chosen LLM.</p>
          <p><strong>Open Gateway:</strong> Token-billed usage with user-controlled caps, designed 30% margin.</p>
        </div>
      </section>

      <section id="swaps-fee" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">Swaps & Convenience Fee</h3>
        <div className="prose-section">
          <p>W3AI's plan includes in-browser swaps with a transparent convenience fee that accrues to treasury. If implemented using the Changelly Exchange API, Changelly's API extra fee shall not exceed 2% per transaction for API Partner referrals.</p>
        </div>
      </section>

      {/* Multi-chain */}
      <section id="multi-chain" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Multi-Chain Deployments & Supply Integrity</h2>
        <div className="prose-section">
          <p>W3AI intends native token representations on Solana, Ethereum, and BSC. Tokenomics must prevent multi-chain "supply duplication."</p>
          <p><strong>Solana as Canonical Mint + Hub Chain</strong>, with Ethereum and BSC as spoke chains. A mature approach uses Wormhole Native Token Transfers (NTT), supporting hub-and-spoke supply management, burn-and-mint models, plus governance-configurable per-chain rate limits.</p>
        </div>
      </section>

      {/* Validator Yield */}
      <section id="validator-yield" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Validator Yield & Staking Economics</h2>
        <p className="prose-section">Validator operations generate protocol-native rewards and must be managed with relentless operational discipline.</p>
      </section>

      <section id="eth-validators" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">Ethereum Validators</h3>
        <p className="prose-section">A validator must deposit 32 ETH and run execution, consensus, and validator clients, with potential slashing of some or all staked ETH for dishonest behavior.</p>
      </section>

      <section id="bsc-validators" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">BSC Validators</h3>
        <p className="prose-section">Becoming a validator requires minimum self-delegation of 2000 BNB. Validators earn rewards from transaction fees with slashing and jailing rules for downtime, double-signing, and low self-delegation.</p>
      </section>

      <section id="sol-validators" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">Solana Validators</h3>
        <p className="prose-section">Validators "form the backbone" of the Solana network with protocol-based rewards from inflation plus staking-related rewards and fee earnings.</p>
      </section>

      {/* Liquidity */}
      <section id="liquidity" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Liquidity & Market Making</h2>
        <div className="prose-section">
          <p>Market making is a core product feature. DEX liquidity allocation is locked for no less than 12 months. LPs may receive additional token rewards pro rata and a 50% share of market-making rewards in USDC/USDT.</p>
          <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">Principles & Goals</h4>
          <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
            <li><strong>Healthy Price Discovery:</strong> Minimize discontinuities between venues</li>
            <li><strong>Reliable Liquidity:</strong> Competitive spreads and depth at core size bands</li>
            <li><strong>Cross-Venue Coherence:</strong> Align conditions across DEX pools and CEX order books</li>
          </ul>
        </div>
      </section>

      <section id="dex-strategy" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">DEX Liquidity Strategy</h3>
        <div className="prose-section">
          <p>On Ethereum, W3AI deploys Uniswap-style AMM pools. On BSC, PancakeSwap's Smart Router (V2) links AMM/stableswap liquidity and market makers to improve pricing. The strategy combines protocol-owned liquidity (POL) and professional quoting for early volatility regimes.</p>
        </div>
      </section>

      <section id="cex-strategy" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">CEX Listing Readiness</h3>
        <div className="prose-section">
          <p>Centralized exchanges evaluate projects on security posture, liquidity potential, and market quality. W3AI's market making strategy is tightly coupled with "listing readiness" artifacts: audited contracts, transparent tokenomics, liquidity plans, and operational reliability.</p>
        </div>
      </section>

      <section id="partner-mm" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">Partner-Enabled Market Making</h3>
        <div className="prose-section">
          <p>G-20 Group provides liquidity solutions and treasury management across exchange-traded and on-chain venues. Within W3AI, this maps to a professional multi-venue liquidity framework, risk-managed treasury yield, and market-depth stability programs tied to milestones.</p>
        </div>
      </section>

      {/* Marketing */}
      <section id="marketing" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Marketing & Distribution Roadmap</h2>
        <p className="prose-section">W3AI's marketing strategy is built around authenticity: each chain is a community with its own verticals, founders, memetics, and risk tolerance. The objective is to embed W3AI into actual user workflows.</p>
      </section>

      <section id="community-growth" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">Community Growth Objectives</h3>
        <div className="prose-section">
          <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
            <li><strong>Pre-listing:</strong> 25,000 Registry users via whitelisted wallets</li>
            <li><strong>12–18 month:</strong> 3–5% of Web3 browser market (3M+ monthly users)</li>
          </ul>
        </div>
      </section>

      <section id="kol-strategy" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">Social & KOL Strategy</h3>
        <div className="prose-section">
          <p>W3AI's KOL engine is structured as "proof, not hype":</p>
          <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
            <li>Security KOLs who discuss wallet safety, transaction clarity, and AI-agent threat models</li>
            <li>Chain-native creators with content mapping to each chain's daily reality</li>
            <li>Builder KOLs in hackathon ecosystems</li>
          </ul>
          <p>Success metrics are tied to product behaviors: Registry sign-ups, wallet connections, first swap, daily active retention.</p>
        </div>
      </section>

      <section id="six-month-rollout" data-section>
        <h3 className="text-xl font-semibold text-foreground mb-3">Six-Month Rollout with Partners</h3>
        <div className="prose-section">
          <p>Pre-sale marketing → TGE → listings/liquidity expansion, with partner-led distribution:</p>
          <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
            <li><strong>Changelly:</strong> Instant exchange and on/off-ramp flows (2.7M community members)</li>
            <li><strong>Hacken:</strong> "Verified-by-security" co-marketing with audits and monitoring</li>
            <li><strong>Dentity:</strong> Trusted onboarding and privacy-preserving credentials</li>
            <li><strong>Northern Trust:</strong> Institutional tokenization narrative alignment</li>
            <li><strong>Surge:</strong> Discovery and execution gateway for tokenized launches</li>
            <li><strong>G-20 Group:</strong> Professional liquidity and treasury management expertise</li>
          </ul>
        </div>
      </section>

      {/* Risks */}
      <section id="risks" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Risks, Security & Disclosures</h2>
        <div className="prose-section">
          <p>AI browsers and agentic workflows introduce genuine new risks. W3AI must assume that any browser-integrated assistant operating over untrusted web content is a target, and must treat "agent permissions" with the same rigor as "wallet permissions."</p>
          <p>W3AI implements boundaries including: no autonomous signing, always-on transaction simulation and explainability, explicit whitelists for dApp connections, isolated profiles for high-risk browsing and airdrop hunting.</p>
          <p className="italic text-muted-foreground">Exchange listing targets are aspirational. Kraken, Coinbase, Gate, and MEXC all describe formal processes and criteria, and none guarantee approval.</p>
        </div>
      </section>

      {/* Appendix */}
      <section id="appendix" data-section>
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

      {/* Disclaimer */}
      <section id="disclaimer" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Disclaimer</h2>
        <div className="prose-section">
          <p>This document is provided for informational purposes only and does not constitute financial, legal, tax, investment, or other professional advice. Nothing contained herein is intended as, or shall be construed as, an offer to sell, or the solicitation of an offer to buy, any token, security, or other asset in any jurisdiction where such offer or solicitation would be unlawful.</p>
          <p><strong>No Guarantees.</strong> Digital assets, including tokens referenced in this document, are inherently risky, speculative, and volatile. Purchasers may lose all or a substantial portion of their funds. Past performance is not indicative of future results, and no representation or warranty is made regarding future value, utility, or performance of any token or network feature described herein.</p>
          <p><strong>Forward-Looking Statements.</strong> This document contains forward-looking statements that reflect the current intentions, expectations, and projections of the W3AI team. These statements are not guarantees of future performance and are subject to known and unknown risks, uncertainties, and other factors that may cause actual results to differ materially from those expressed or implied.</p>
          <p><strong>Regulatory Compliance.</strong> The regulatory landscape for digital assets and blockchain technology is evolving rapidly and varies by jurisdiction. It is the sole responsibility of each prospective participant to determine whether the acquisition, holding, or use of any token described herein is permissible under applicable laws and regulations in their jurisdiction.</p>
          <p><strong>Exchange Listings.</strong> Any references to centralized exchange (CEX) or decentralized exchange (DEX) listings are subject to independent review, approval, and listing criteria established by the respective exchanges. W3AI makes no guarantee that any listing will occur or be maintained.</p>
          <p><strong>Third-Party Services.</strong> This document may reference third-party platforms, protocols, tools, or service providers. W3AI does not endorse, guarantee, or assume responsibility for the accuracy, reliability, security, or performance of any third-party service. Users interact with third-party services at their own risk.</p>
          <p><strong>No Fiduciary Relationship.</strong> Nothing in this document creates a fiduciary, advisory, or professional relationship between W3AI and any reader or participant. Recipients of this document should seek independent legal, financial, and tax advice before making any decisions related to digital asset purchases or participation in any network activity.</p>
          <p><strong>Information Accuracy.</strong> While every effort has been made to ensure the accuracy and completeness of the information presented, W3AI does not warrant that the content is free from errors or omissions. Information is provided "as is" and may be updated, modified, or corrected without notice.</p>
          <p><strong>Intellectual Property.</strong> All content, trademarks, logos, and intellectual property referenced in this document are the property of their respective owners. Unauthorized reproduction, distribution, or use of this document or any of its contents is strictly prohibited without prior written consent.</p>
        </div>
      </section>

      <div className="h-24" />
    </div>
  );
}

// --- Main Page ---
export default function Whitepaper() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("wp_unlocked") === "1");
  const [activeId, setActiveId] = useState("executive-summary");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      {!unlocked && <PasswordGate onUnlock={() => setUnlocked(true)} />}

      <div className={cn("flex min-h-[calc(100vh-80px)] pt-16 lg:pt-20", !unlocked && "blur-md pointer-events-none select-none")}>
        <Sidebar activeId={activeId} onNavigate={navigateTo} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0">
          {/* Top bar - mobile only */}
          <div className="sticky top-16 lg:top-20 z-20 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3 lg:hidden">
            <button onClick={() => setSidebarOpen(true)} className="text-foreground">
              <Menu className="h-5 w-5" />
            </button>
          </div>
          <WhitepaperContent onSectionVisible={setActiveId} />
        </main>
      </div>

      <Footer />

      {/* Scroll to top */}
      {showScrollTop && unlocked && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-30 h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}

      <style>{`
        .prose-section p { color: hsl(var(--muted-foreground)); line-height: 1.75; margin-bottom: 1rem; }
        .prose-section strong { color: hsl(var(--foreground)); }
      `}</style>
    </div>
  );
}
