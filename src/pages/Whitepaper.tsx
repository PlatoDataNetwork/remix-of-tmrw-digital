import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, X, ArrowUp, Download, Globe, Home, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import whitepaperHero from "@/assets/whitepaper-hero.png";
import heroBg from "@/assets/hero-bg.png";

const PASSWORD = "W3AI88";

// --- Sidebar structure (flat, no accordion) ---
interface Section {
  id: string;
  title: string;
  number?: string;
  icon?: "home" | "disclaimer";
}

const sections: Section[] = [
  { id: "w3lcome", title: "Home", icon: "home" },
  { id: "welcome-message", title: "W3LCOME", icon: "disclaimer" },
  { id: "executive-summary", title: "Rise of the Machines", number: "01" },
  { id: "w3ai-protocol", title: "W3AI Protocol", number: "02" },
  { id: "tmrw-browser", title: "The W3AI TMRW Browser", number: "03" },
  { id: "w3ai-rwas", title: "W3AI RWAs", number: "04" },
  { id: "w3ai-token-utility", title: "W3AI Token Utility", number: "05" },
  { id: "governance", title: "W3AI Governance", number: "06" },
  { id: "token-utility", title: "W3AI Tokenomics", number: "07" },
  { id: "institutional-rails", title: "Institutional-Grade Rails", number: "08" },
  { id: "community-integrations", title: "Community Integrations", number: "09" },
  { id: "supported-networks", title: "Supported Networks", number: "10" },
  { id: "foundations", title: "Foundations", number: "11" },
  { id: "multi-chain", title: "Multi-Chain Deployments", number: "12" },
  { id: "validator-yield", title: "Validator Yield & Staking", number: "13" },
  { id: "liquidity", title: "Liquidity & Market Making", number: "14" },
  { id: "marketing", title: "Marketing & Distribution", number: "15" },
  { id: "strategic-partners", title: "Network Partners", number: "16" },
  { id: "infrastructure", title: "Infrastructure", number: "17" },
  { id: "security", title: "Security", number: "18" },
  { id: "privacy", title: "Privacy Policy", number: "19" },
  { id: "risks", title: "Risks & Disclosures", number: "20" },
  { id: "appendix", title: "Appendix & References", number: "21" },
  { id: "disclaimer", title: "Disclaimer", number: "22" },
  { id: "deck-link", title: "Project Deck", number: "23" },
];

// Only numbered sections for the chapter grid
const chapterSections = sections.filter(s => s.number);

// --- Desktop Sidebar ---
function DesktopSidebar({ activeId, onNavigate }: { activeId: string; onNavigate: (id: string) => void }) {
  return (
    <aside className="hidden lg:block sticky top-[80px] h-[calc(100vh-80px)] w-64 border-r border-border bg-sidebar-background overflow-y-auto shrink-0 z-10">
      <SidebarNav sections={sections} activeId={activeId} onNavigate={onNavigate} />
    </aside>
  );
}

// --- Mobile Drawer Sidebar ---
function MobileDrawerSidebar({ activeId, onNavigate, open, onClose }: { activeId: string; onNavigate: (id: string) => void; open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-[90] w-[75vw] max-w-xs bg-sidebar-background border-r border-border overflow-y-auto lg:hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-sm font-semibold text-foreground">Contents</span>
              <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <SidebarNav sections={sections} activeId={activeId} onNavigate={(id) => { onNavigate(id); onClose(); }} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// --- Shared Sidebar Nav Content (flat, matching reference) ---
function SidebarNav({ sections, activeId, onNavigate }: { sections: Section[]; activeId: string; onNavigate: (id: string) => void }) {
  return (
    <nav className="p-3 space-y-0.5">
      {sections.map(s => {
        const isActive = activeId === s.id;
        return (
          <button
            key={s.id}
            onClick={() => {
              if (s.id === "deck-link") { window.location.href = "/deck"; return; }
              onNavigate(s.id);
            }}
            className={cn(
              "w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors",
              isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}
          >
            {s.icon === "home" && <Home className="h-4 w-4 shrink-0 text-primary/70" />}
            {s.icon === "disclaimer" && <Shield className="h-4 w-4 shrink-0 text-primary/70" />}
            {s.number && (
              <span className="text-[10px] font-bold w-5 shrink-0 text-[hsl(82,85%,55%)]">{s.number}</span>
            )}
            {!s.icon && !s.number && <span className="w-5 shrink-0" />}
            <span className="text-left truncate">{s.title}</span>
          </button>
        );
      })}
    </nav>
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
    <div className="max-w-4xl mx-auto px-6 py-12 whitepaper-content">
      {/* W3AI Whitepaper Section */}
      <section id="w3lcome" data-section>
        <div className="relative rounded-2xl overflow-hidden h-[300px] md:h-[420px] bg-[hsl(220,20%,4%)]">
          {/* Background Image */}
          <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-contain object-center scale-110" />
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 pointer-events-none animated-gradient-hero-overlay" />
          {/* Dark Overlays */}
          <div className="absolute inset-0 bg-[hsl(220,20%,4%,0.25)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,20%,4%,0.3)] via-transparent to-[hsl(220,20%,4%)]" />
          {/* Content - positioned lower */}
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

        {/* Title + subtitle below hero */}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-2">W3AI Whitepaper</h1>
        <p className="text-muted-foreground mb-8">Rise of the Machines — Building the Web3 AI gateway for the agentic browser era.</p>

        {/* Chapter Index Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {chapterSections.map(s => (
            <button
              key={s.id}
              onClick={() => {
                const el = document.getElementById(s.id);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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

      {/* W3LCOME heading */}
      <h2 className="text-2xl font-bold text-foreground mb-4">W3LCOME</h2>

      {/* Welcome Message */}
      <section id="welcome-message" data-section>
        <div className="prose-section">
          <h3 className="text-xl font-semibold text-foreground mb-4">Welcome and Thank you for Joining Us!</h3>
          <p>We are excited to introduce you to W3AI, a pioneering force at the intersection of Web3 and AI. Our vision is to revolutionize the way vertically focused AI applications are conceived, developed and leveraged across both centralized and decentralized networks. creating a more efficient, transparent, and secure digital ecosystem and decentralized transport management system. We are revolutionizing data intelligence by delivering an array of vertically focused Generative AI Applications inside a custom network framework that leverages AI in ways that drive both high ROI and stored value. We embrace innovation and deploy it across our entire ecosystem and corporate culture.</p>
          <p>W3AI is at the forefront of merging artificial intelligence with blockchain, forging a new path for decentralized automation and machine learning. Its architecture is based on a network of autonomous AI agents that execute a variety of tasks, such as data-sharing, dynamic optimization, and decision-making, all within a trustless environment. W3AI's decentralized framework fosters peer-to-peer intelligence sharing, enabling seamless interactions between humans, devices, and AI agents without intermediaries. This ecosystem is designed to enhance scalability, secure decision-making, and remove bottlenecks within Solana's high-performance blockchain ecosystem.</p>
          <p>Our vision goes beyond the conventional as we were created to disrupt the current AI Application and Analytic marketplace. By employing a completely new methodology related to community and developer engagement, we enable deep and authentic connectivity to today's most active innovative technology sectors. At W3AI, we are revolutionizing data intelligence and analysis by delivering an array of vertically focused AI Applications via an immersive UI / UX. Fully Decentralized. Fully Tokenized. Fully Automated. Fully Gamified. As AI continues on its path to disrupt most industries we know of today, we will be a gateway for millions of users to access both our suite of applications but also those from our developer community to showcase and market their apps. We embrace innovation and deploy it across our entire ecosystem and corporate culture. As the AI Application Market continues to expand, we have a unique opportunity in this cycle to deploy our best of class technology and experience to a thriving community of users, enterprises, developers, testers and marketers. Whether you're an investor, a builder, or a visionary looking to be part of the next evolution of technology, we're thrilled to have you with us.</p>
          <p>Let's explore the future—together. 🚀</p>
        </div>
      </section>

      {/* Hero Robot Image */}
      <div className="relative rounded-2xl overflow-hidden animated-gradient-icon mt-8">
        <img src={whitepaperHero} alt="W3AI Rise of the Machines" className="w-full h-[300px] md:h-[420px] object-cover" />
      </div>

      {/* Executive Summary */}
      <section id="executive-summary" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Rise of the Machines</h2>
        <div className="prose-section">
          <p>W3AI is building the Web3 AI gateway for the "Rise of the Machines" era—when browsers evolve from passive viewers into agentic, AI-native operating systems. Recent launches from Perplexity (Comet) and OpenAI (ChatGPT Atlas) confirm the browser is becoming the primary AI surface where context is captured and actions are executed.</p>
          <p>W3AI's wedge is Web3-native security + immersive UX. AI browsers create new convenience—and new risk. W3AI's product strategy is to treat AI agent permissions and wallet permissions as one coherent security domain: "assist, verify, then act—only with explicit user control."</p>
          <p>The W3AI / TMRW Browser is a macOS desktop Web3 AI Browser built on Firefox with a sidekick mobile app. Firefox is a free, open-source browser using the Gecko rendering engine, designed to be extensible via add-ons and customization. Building on Firefox creates strategic differentiation in a market where many AI browsers trend toward Chromium-based stacks.</p>
        </div>
      </section>

      <section id="network-thesis" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Network Thesis</h2>
        <div className="prose-section">
          <p>A browser becomes a category-defining platform when it has its own decentralized backbone. W3AI is building Network infrastructure through a series of validator nodes on Solana, Ethereum, and BNB Smart Chain (BSC).</p>
        </div>
      </section>

      <section id="why-now" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Why Now</h2>
        <div className="prose-section">
          <p>Crypto adoption is measured in hundreds of millions globally. Global crypto owners grew from 659 million (end of 2024) to 741 million in 2025. Active stablecoin addresses increased from 19.6 million to 30 million from Feb 2024 to Feb 2025. This is the user base that needs a safer, simpler "front door" into Web3.</p>
        </div>
      </section>

      <section id="go-to-market" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Go To Market</h2>
        <div className="prose-section">
          <p>The project targets a six-month rollout with a measurable pre-listing objective: 25,000 Registry users via whitelisted wallets prior to listing. Post-launch, W3AI targets 3–5% share of the Web3 browser market within 12–18 months, modeled as 3M+ monthly users, benchmarked against Brave's reported 101M MAU.</p>
        </div>
      </section>

      {/* W3AI Protocol */}
      <section id="w3ai-protocol" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">W3AI Protocol</h2>
        <div className="prose-section">
          <p>The W3AI Protocol is the decentralized infrastructure layer that powers every surface of the W3AI ecosystem—from browser-native AI inference to multi-chain token operations and validator economics. Built across Solana, Ethereum, and BNB Smart Chain, the protocol establishes a unified execution framework where identity, liquidity, governance, and security converge into a single composable stack. Rather than operating as a standalone blockchain, W3AI functions as a cross-chain coordination protocol that leverages existing network security while adding proprietary intelligence, custody, and compliance layers on top.</p>
        </div>
      </section>

      <section id="protocol-architecture" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Architecture</h2>
        <div className="prose-section">
          <p>At its core, the W3AI Protocol introduces a novel architecture that binds AI agent permissions to on-chain wallet permissions—treating them as a single security domain. This means every AI-assisted action within the ecosystem, whether a swap recommendation, a governance vote, or a portfolio rebalance, must pass through the same cryptographic verification and user-consent framework that governs asset transfers. The result is a protocol where intelligence and capital move together under explicit user control, eliminating the trust gaps that plague conventional AI-integrated platforms.</p>
        </div>
      </section>

      <section id="protocol-economic-model" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Economic Model</h2>
        <div className="prose-section">
          <p>The protocol's economic model is designed for long-term sustainability. Revenue flows from multiple surfaces—Open Gateway AI inference fees, in-browser swap convenience fees, validator yield, and premium feature access—all routed transparently through on-chain treasury mechanisms. With 52.5% of total token supply allocated to the treasury and governed by progressive decentralization, the W3AI Protocol is structured to fund development, incentivize participation, and maintain operational resilience across market cycles.</p>
        </div>
      </section>

      {/* W3AI Browser */}
      <section id="tmrw-browser" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">W3AI Browser</h2>
        <div className="prose-section">
          <p>W3AI's product philosophy is that the browser is no longer a "window." It is the execution environment for AI, identity, and money. W3AI's goal is to become the unified gateway that lets users discover → verify → transact → monitor across Web3 with an immersive UI/UX designed for high-frequency multi-chain activity.</p>
        </div>
      </section>

      <section id="browser-architecture" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Architecture</h2>
        <div className="prose-section">
          <p>W3AI's macOS desktop browser is built on Firefox, leveraging a mature, open-source codebase that uses the Gecko engine and supports deep customization. In a market increasingly shaped by AI browsers and agentic assistants, platform choice matters because it influences extension models, sandbox boundaries, and security hardening approaches.</p>
        </div>
      </section>

      <section id="differentiation" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Differentiation</h2>
        <div className="prose-section">
          <p>W3AI's differentiation must be expressed as workflow superiority and permission superiority—not merely a checklist.</p>
          <p>Brave demonstrates large-scale demand for privacy-first browsing (100M+ MAU). W3AI must meet or exceed these privacy expectations while also solving Web3-specific safety problems (wallet connections, transaction clarity, contract risk, chain selection, and agent safety).</p>
          <p>Safari dominates Apple's ecosystem with privacy as a primary differentiator. W3AI's path: "Safari is privacy-first; W3AI is Web3 AI safety-first."</p>
          <p>Comet and Atlas confirm the new bar: context-aware assistants living inside the browser. W3AI competes by making "agent safety" patterns Web3-native, where "actions" often move assets.</p>
        </div>
      </section>

      <section id="llm-layer" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">LLM Layer</h2>
        <div className="prose-section">
          <p>Bring Your Own Key (BYOK): Users can connect the LLM provider of their choice using their own API keys. This supports power users and enterprises with preferred vendors, budgets, and compliance requirements.</p>
          <p>W3AI Open Gateway (token-based): Users can alternatively route inference through a W3AI-managed gateway with token-based billing. The Open Gateway is user-controlled by default with spending caps, per-session limits, and explicit on/off controls. A 30% margin is applied over underlying provider costs with transparent reporting.</p>
        </div>
      </section>

      <section id="developers" data-section>
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

      <section id="swap-execution" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">DeFi Swap Execution</h2>
        <div className="prose-section">
          <p>W3AI intends to embed swap functionality directly in the browser and apply a transparent convenience fee that routes into the W3AI treasury. A practical implementation path is the Changelly API, designed for service providers to let users exchange without leaving the host product. Changelly's API supports an "extra fee" functionality allowing the integrator to configure an additional commission layer.</p>
        </div>
      </section>

      <section id="security-intelligence" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Security Intelligence</h2>
        <div className="prose-section">
          <p>W3AI will integrate security posture into the act of connecting, signing, and transacting. A practical security integration partner is Hacken, offering smart contract audits, wallet audits, penetration testing, tokenomics audits, proof-of-reserves audits, and post-deployment monitoring. In W3AI, this becomes an "in-browser trust layer": risk flags, verified proofs, and standardized security context before users commit capital.</p>
        </div>
      </section>

      {/* W3AI RWAs */}
      <section id="w3ai-rwas" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">W3AI RWAs</h2>
        <div className="prose-section">
          <p>The Real World of Asset Tokenization — Tomorrow's Next Big Thing. Bridging traditional assets with modern Web3AI markets through tokenization, data intelligence, and institutional-grade access.</p>
          <p>W3AI's RWA framework spans 12 core sectors, each representing a multi-billion-dollar opportunity to digitize traditionally illiquid assets into transparent, tradeable, and fractionally accessible digital securities on blockchain networks.</p>
        </div>
      </section>

      <section id="rwa-carbon-credits" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Carbon Credits</h2>
        <div className="prose-section">
          <p>Carbon markets are critical to the global fight against climate change, yet they have long been plagued by opacity, fragmentation, and limited accessibility. Tokenization transforms verified carbon credits into transparent, tradeable digital assets on blockchain networks. This enables fractional ownership, real-time price discovery, and automated retirement tracking—empowering institutions, corporations, and individuals to participate in climate action with confidence and efficiency.</p>
          <p>Every token is backed by independently verified carbon offset projects with transparent monitoring, reporting, and verification (MRV). Blockchain-based retirement tracking ensures credits are permanently removed from circulation, preventing double-counting. Key verticals include forestry & REDD+ projects, renewable energy credits, blue carbon from coastal ecosystems, direct air capture technology, and diversified carbon credit funds spanning multiple vintages and standards.</p>
        </div>
      </section>

      <section id="rwa-collectables" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Collectables</h2>
        <div className="prose-section">
          <p>The global collectables market—spanning fine art, rare wines, classic automobiles, sports memorabilia, and luxury goods—represents trillions in stored value largely inaccessible to everyday investors. Tokenization transforms these illiquid treasures into fractional digital assets, enabling transparent provenance tracking, instant settlement, and democratized access. Blockchain-verified authenticity and smart contract–governed ownership bring institutional rigor to passion-driven markets.</p>
          <p>Immutable blockchain provenance records ensure every collectable's history, ownership chain, and authenticity are permanently verified. Physical assets are stored in insured, climate-controlled vaults with real-time digital verification. Use cases range from fractional ownership of blue-chip artworks from masters like Picasso and Warhol, to tokenized rare timepieces from Patek Philippe and Rolex, curated wine portfolios, classic car investments, and sports memorabilia with verified provenance.</p>
        </div>
      </section>

      <section id="rwa-commodities" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Commodities</h2>
        <div className="prose-section">
          <p>Commodity markets form the backbone of the global economy, yet participation has been dominated by futures exchanges and specialized trading desks. Tokenization creates a direct bridge between physical commodity assets and digital investors, enabling fractional ownership of grain silos, coffee plantations, cotton inventories, and timber forests. Smart contracts handle settlement, custody verification, and yield distribution, bringing 21st-century efficiency to centuries-old markets.</p>
          <p>Every token represents verified, audited physical commodity inventories held in certified warehouses and storage facilities. Commodity-backed tokens provide natural inflation protection as physical goods appreciate with rising price levels. The tokenization framework supports agricultural futures, single-origin coffee and cocoa production, managed timber plantations combining carbon sequestration with harvest revenue, cotton inventories, sugar & ethanol facilities, and transferable water rights.</p>
        </div>
      </section>

      <section id="rwa-energy" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Energy</h2>
        <div className="prose-section">
          <p>The energy sector represents one of the largest asset classes globally, yet access has historically been limited to institutional investors and sovereign entities. Tokenization transforms energy assets—from solar farms and wind installations to oil reserves and LNG terminals—into fractional, tradeable digital securities. This democratizes participation while providing asset owners with new capital formation tools and enhanced liquidity for traditionally illiquid holdings.</p>
          <p>Smart contracts automate revenue distribution from energy production, providing real-time visibility into yield generation. Geographic barriers are removed, allowing global investors to participate in projects across jurisdictions. Key verticals include utility-scale solar installations with automated revenue sharing, tokenized oil & gas royalty streams, wind energy credits, EV charging network ownership, LNG terminal access, and carbon credit portfolios linked to energy transition projects.</p>
        </div>
      </section>

      <section id="rwa-infrastructure" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Infrastructure</h2>
        <div className="prose-section">
          <p>Infrastructure assets generate predictable, inflation-linked cash flows over decades, making them highly attractive to investors seeking stability. However, the scale of these investments has traditionally excluded all but the largest institutions. Tokenization breaks down billion-dollar infrastructure projects into accessible digital units, enabling retail and mid-market investors to participate in toll roads, airports, water systems, and digital infrastructure alongside institutional capital.</p>
          <p>The global infrastructure market is valued at $130T with an estimated $15T investment gap by 2040. Tokenized infrastructure offers long-term portfolio stability with asset lives spanning 25-99 years and enables seamless participation in public-private partnerships. Use cases include toll road revenue streams, airport concessions, hyperscale data center equity, water utility stakes, port & logistics terminals, and 5G & fiber network infrastructure.</p>
        </div>
      </section>

      <section id="rwa-metals" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Metals</h2>
        <div className="prose-section">
          <p>Metals have served as stores of value and industrial inputs for millennia. Today, tokenization bridges physical metal assets with digital Web3 markets, enabling fractional ownership of vaulted gold, silver reserves, copper mines, and lithium deposits. Blockchain verification ensures provenance and purity while smart contracts automate custody, settlement, and dividend distribution across the metals value chain.</p>
          <p>The global metals market exceeds $12T with lithium demand growing at 35% annually. Blockchain-tracked chain of custody from mine to vault ensures authenticity and ethical sourcing compliance. Tokenized metals reflect live spot prices with instant settlement. Key offerings include gold-backed tokens representing allocated bars in audited vaults, silver mining royalties, copper supply contracts, lithium deposit rights critical to the EV battery supply chain, platinum group metals, and recycled metals supporting circular economies.</p>
        </div>
      </section>

      <section id="rwa-rare-earth" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Rare Earth Minerals</h2>
        <div className="prose-section">
          <p>Rare earth elements and critical minerals underpin modern technology—from smartphones and electric vehicles to missile guidance systems and wind turbines. Yet investment access has been extremely limited due to supply chain opacity and geopolitical concentration. Tokenization opens this strategically vital sector to a broader investor base while creating transparent, auditable supply chains that enhance national security and economic resilience.</p>
          <p>The rare earth market is valued at $9.6B with 28% annual demand growth and 60% supply concentration risk. Blockchain-verified tracking from mine to end-use ensures ethical sourcing and regulatory compliance. Tokenized rare earth positions provide manufacturers and governments with new tools to hedge supply disruption risk. Verticals include neodymium reserves for EV and wind turbine magnets, lithium-ion supply chains, ethically sourced cobalt mining, graphite production for battery anodes, scandium alloys for aerospace, and diversified critical mineral funds.</p>
        </div>
      </section>

      <section id="rwa-real-estate" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Real Estate</h2>
        <div className="prose-section">
          <p>Real estate is the world's most valuable asset class at $326T, yet it remains one of the least liquid. Tokenization transforms physical properties—office towers, residential complexes, retail centers, and hospitality assets—into tradeable digital securities. Investors can own fractions of premium properties across global markets, receive automated rental distributions, and trade positions on secondary markets, all while maintaining the fundamental value proposition of real estate ownership.</p>
          <p>Smart contracts handle rental income distribution automatically, reducing administrative overhead and ensuring timely investor payments. Entry barriers drop from six-figure minimums to as low as $100. The framework supports commercial office towers with long-term corporate leases, multi-family residential portfolios, hospitality assets with revenue-based returns, industrial & warehouse logistics, student housing near major universities, and mixed-use urban developments combining retail, residential, and commercial spaces.</p>
        </div>
      </section>

      <section id="rwa-sovereign-wealth" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Sovereign Wealth</h2>
        <div className="prose-section">
          <p>Sovereign wealth funds manage over $11.5 trillion in assets globally, representing the long-term savings and strategic reserves of nations. Tokenization offers these institutions unprecedented tools for portfolio diversification, co-investment structuring, and cross-border capital deployment. By digitizing sovereign holdings, governments gain real-time portfolio visibility, enhanced liquidity management, and the ability to democratize national wealth for citizen participation programs.</p>
          <p>With 90+ active SWFs and investment horizons exceeding 50 years, tokenization enables national asset digitization—transforming sovereign holdings in natural resources, infrastructure, and real estate into transparent, auditable digital portfolios. Use cases include sovereign digital bonds with automated coupon payments, national resource fund royalties distributed to citizens, smart contract platforms for multi-sovereign co-investment in mega projects, citizen wealth distribution programs, strategic reserve management with real-time auditing, and development finance instruments for emerging markets.</p>
        </div>
      </section>

      <section id="rwa-stablecoins" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Stablecoins</h2>
        <div className="prose-section">
          <p>Stablecoins represent the critical bridge between traditional finance and the on-chain economy. Backed by fiat reserves, government treasuries, or algorithmically managed collateral pools, they provide the price stability essential for tokenized asset settlement, cross-border payments, and yield generation. As the tokenized RWA ecosystem scales, stablecoins serve as the foundational settlement and liquidity layer enabling seamless capital flows across jurisdictions.</p>
          <p>The stablecoin market cap exceeds $170B with over $7T in annual settlement volume reaching 190+ countries with 24/7 availability. Treasury-backed stablecoins pass through underlying yield from government bonds and money market instruments. Key verticals include treasury-backed coins collateralized by U.S. Treasury bills, cross-border settlement rails for international trade, native RWA payment infrastructure for dividend distributions, institutional yield vaults, multi-currency stables (EUR, GBP, emerging markets), and DeFi liquidity pools for tokenized assets.</p>
        </div>
      </section>

      <section id="rwa-tax-credits" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Tax Credits</h2>
        <div className="prose-section">
          <p>Tax credits—including renewable energy investment tax credits (ITCs), production tax credits (PTCs), historic rehabilitation credits, and low-income housing tax credits (LIHTCs)—represent billions in annual government incentives. Yet accessing these credits has traditionally required complex syndication structures, long negotiation timelines, and significant minimum commitments. Tokenization transforms tax credits into transparent, tradeable digital assets, enabling fractional ownership, faster settlement, and programmatic compliance verification.</p>
          <p>The annual US tax credit market exceeds $50B with tokenization delivering up to 40% efficiency gains. Smart contracts enforce eligibility requirements, recapture provisions, and holding period rules automatically, while reducing syndication timelines from months to days. Verticals include renewable energy ITCs from solar, wind, and battery storage projects, low-income housing (LIHTC) programs, historic rehabilitation credits, R&D tax credits, opportunity zone investments combining capital gains deferral with community impact, and carbon & clean energy production tax credits.</p>
        </div>
      </section>

      <section id="rwa-utilities" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Utilities</h2>
        <div className="prose-section">
          <p>Utility infrastructure represents one of the most stable and essential asset classes globally, generating predictable cash flows from electricity, water, gas, and telecommunications services. However, direct investment in utility assets has historically been limited to governments, sovereign funds, and large institutional players. Tokenization democratizes access to these inflation-protected, yield-generating assets by converting ownership stakes into digital tokens that can be fractionalized, traded, and managed with unprecedented transparency.</p>
          <p>The global utility market cap exceeds $5T with average asset lifespans of 30+ years. IoT-connected utility infrastructure feeds real-time usage and revenue data directly to token holders via smart contracts. Key verticals include power generation from solar, wind, and hydroelectric facilities, water treatment and desalination systems, fiber optic and 5G telecommunications networks, electric grid transmission and distribution assets, district heating & cooling systems, and waste management & recycling facilities generating revenue from tipping fees and recovered materials.</p>
        </div>
      </section>

      {/* W3AI Token Utility */}
      <section id="w3ai-token-utility" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-6">W3AI Token Utility</h2>
        <div className="prose-section">
          <p>The W3AI token is engineered as a multi-functional utility asset that powers every layer of the W3AI ecosystem — from browser-native AI features and decentralized inference to governance, staking, and cross-border settlements. Token utility is designed to create sustained, organic demand through real usage rather than speculation.</p>
        </div>
      </section>

      <section id="token-utility-overview" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Token Utility Overview</h2>
        <div className="prose-section">
          <p>W3AI tokens serve as the primary medium of exchange, access credential, and governance instrument across the entire network. Every interaction within the W3AI Browser, Open Gateway, and RWA infrastructure is designed to route value through the token — creating a closed-loop economy where usage drives demand.</p>
          <p>The token architecture supports dual revenue streams for participants: transaction-based fees from network activity and yield-based returns from staking and validation. This dual-income model ensures that both active users and passive holders benefit from ecosystem growth.</p>
        </div>
      </section>

      <section id="token-utility-demand" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Demand Drivers</h2>
        <div className="prose-section">
          <p>W3AI token demand is anchored by four core consumption vectors:</p>
          <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">Browser-Native Access:</strong> Premium AI features within the W3AI Browser — including advanced agent workflows, priority inference, and personalized AI models — require W3AI tokens. Users stake or spend tokens to unlock tiered feature sets.</li>
            <li><strong className="text-foreground">Open Gateway AI Spend:</strong> Developers and enterprises route AI inference calls through the W3AI Open Gateway using token-based credits. Every API call, model query, and data retrieval consumes tokens, creating persistent demand proportional to network usage.</li>
            <li><strong className="text-foreground">Network Incentives:</strong> Validators, node operators, and application service providers earn W3AI tokens for securing the network and processing transactions across Solana, Ethereum, and BSC chains.</li>
            <li><strong className="text-foreground">RWA Transaction Fees:</strong> Tokenization, trading, and settlement of real-world assets on the W3AI platform incur fees denominated in W3AI tokens, linking asset market activity directly to token demand.</li>
          </ul>
        </div>
      </section>

      <section id="token-utility-access" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Access & Staking Tiers</h2>
        <div className="prose-section">
          <p>The W3AI ecosystem implements a tiered staking model that rewards long-term commitment with escalating benefits:</p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Tier</th>
                  <th className="text-right px-4 py-3 font-semibold text-foreground">Stake Requirement</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Benefits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["Explorer", "1,000 W3AI", "Basic browser AI features, standard inference speeds"],
                  ["Builder", "10,000 W3AI", "Priority inference, advanced agent workflows, API access"],
                  ["Architect", "50,000 W3AI", "Premium AI models, custom agent deployment, governance voting"],
                  ["Sovereign", "250,000 W3AI", "Full platform access, revenue sharing, proposal creation rights"],
                ].map(([tier, stake, benefits]) => (
                  <tr key={tier} className="hover:bg-muted/50">
                    <td className="px-4 py-2.5 font-medium text-foreground">{tier}</td>
                    <td className="px-4 py-2.5 text-right text-muted-foreground">{stake}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{benefits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4">Staking also unlocks loyalty-based reward multipliers — holders who maintain their stake position for 90+ days receive enhanced yield bonuses and priority access to new feature releases and RWA offerings.</p>
        </div>
      </section>

      <section id="token-utility-governance" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Governance Rights</h2>
        <div className="prose-section">
          <p>W3AI token holders participate directly in protocol governance through on-chain voting mechanisms:</p>
          <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">Treasury Allocation:</strong> Vote on how foundation reserves are deployed — including ecosystem grants, liquidity provisions, and strategic partnerships.</li>
            <li><strong className="text-foreground">Fee Parameters:</strong> Influence transaction fee structures across the browser, Open Gateway, and RWA marketplace.</li>
            <li><strong className="text-foreground">Chain Expansion:</strong> Decide which new blockchain networks are added to the W3AI multi-chain deployment.</li>
            <li><strong className="text-foreground">Security Thresholds:</strong> Set and adjust security parameters for wallet permissions, agent authorization levels, and anti-sybil measures.</li>
          </ul>
          <p>Governance weight scales with staking tier — Architect and Sovereign tier holders have proposal creation rights, while all stakers can vote on active proposals.</p>
        </div>
      </section>

      <section id="token-utility-burn" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Burn & Deflationary Mechanics</h2>
        <div className="prose-section">
          <p>The W3AI token incorporates built-in deflationary pressure through multiple burn mechanisms:</p>
          <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">Transaction Fee Burns:</strong> A percentage of all transaction fees across the network are permanently burned, reducing circulating supply with every interaction.</li>
            <li><strong className="text-foreground">Gateway Revenue Burns:</strong> A portion of Open Gateway AI inference revenue is allocated to quarterly token buybacks and burns.</li>
            <li><strong className="text-foreground">RWA Settlement Burns:</strong> Real-world asset settlement fees include a burn component, tying deflationary pressure to real economic activity.</li>
          </ul>
          <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground"><strong className="text-foreground">Deflationary Impact:</strong> As network usage grows, the burn rate accelerates — creating a positive feedback loop where increased adoption leads to reduced supply, supporting long-term value appreciation for token holders.</p>
          </div>
        </div>
      </section>

      {/* W3AI Governance */}
      <section id="governance" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">W3AI Governance</h2>
        <div className="prose-section">
          <p>The W3AI Foundation provides the governance, treasury management, and regulatory framework required to operate a decentralized protocol at institutional quality. The foundation structure ensures long-term sustainability, transparent decision-making, and compliance across jurisdictions.</p>
        </div>
      </section>

      <section id="foundation-governance" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Governance Framework</h2>
        <div className="prose-section">
          <p>W3AI governance is designed to evolve from core-team-led to community-led over time. Token holders participate in decisions covering treasury policy, supported chains, fee parameters, and security thresholds.</p>
          <p>Governance proposals follow a structured lifecycle: discussion → formal proposal → voting → execution. Voting power is proportional to staked W3AI tokens, with safeguards against governance attacks including time-locks, quorum requirements, and multi-sig execution.</p>
        </div>
      </section>

      <section id="foundation-treasury" data-section>
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

      <section id="foundation-compliance" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Regulatory Compliance</h2>
        <div className="prose-section">
          <p>W3AI is designed to be capital-ready from day one. The regulatory framework includes jurisdiction-specific legal opinions, token classification analysis, and ongoing monitoring of regulatory developments across key markets.</p>
          <p>The foundation maintains relationships with legal counsel in major jurisdictions and implements compliance controls including KYC/AML for applicable token sale rounds, sanctions screening, and geographic restrictions where required by law.</p>
        </div>
      </section>

      {/* W3AI Tokenomics */}
      <section id="token-utility" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">W3AI Tokenomics</h2>
        <div className="prose-section">
          <p>This section covers token assumptions, monetization surfaces, and treasury mechanics.</p>
        </div>
      </section>

      <section id="token-pillars" data-section>
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

      <section id="tokenomics" data-section>
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

      <section id="supply-allocations" data-section>
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

      <section id="sale-rounds" data-section>
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

      <section id="byok-gateway" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">BYOK vs Open Gateway</h2>
        <div className="prose-section">
          <p>BYOK (Bring Your Own Key): User provides their own API key for their chosen LLM.</p>
          <p>Open Gateway: Token-billed usage with user-controlled caps, designed 30% margin.</p>
        </div>
      </section>

      <section id="swaps-fee" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Swaps & Convenience Fee</h2>
        <div className="prose-section">
          <p>W3AI's plan includes in-browser swaps with a transparent convenience fee that accrues to treasury. If implemented using the Changelly Exchange API, Changelly's API extra fee shall not exceed 2% per transaction for API Partner referrals.</p>
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

      <section id="rails-custody" data-section>
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

      <section id="rails-compliance" data-section>
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

      <section id="rails-tokenization" data-section>
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

      <section id="rails-reporting" data-section>
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

      {/* Community Integrations */}
      <section id="community-integrations" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Community Integrations Across Solana, Ethereum, and BSC</h2>
        <div className="prose-section">
          <p>W3AI's marketing strategy is authentic community integration. Each chain represents different user psychographics, product norms, and vertical strengths.</p>
        </div>
      </section>

      <section id="solana-community" data-section>
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

      <section id="ethereum-community" data-section>
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

      <section id="bsc-community" data-section>
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
      <section id="supported-networks" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Supported Networks</h2>
        <div className="prose-section">
          <p>W3AI is built as a multi-chain protocol with native presence across three foundational blockchain ecosystems. Each network was selected for its unique strengths in performance, composability, and community reach — together providing comprehensive coverage of the Web3 landscape.</p>
        </div>
      </section>

      <section id="network-solana" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Solana</h2>
        <div className="prose-section">
          <p>Solana serves as W3AI's canonical mint chain and primary hub. With sub-second finality, transaction costs under $0.01, and throughput exceeding 4,000 TPS, Solana provides the performance foundation for W3AI's high-frequency operations including token staking, governance voting, AI gateway billing, and reward distribution.</p>
          <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
            <li>Canonical mint of all 2,000,000,000 W3AI tokens.</li>
            <li>Primary chain for staking, governance, and treasury operations.</li>
            <li>Hub chain for Wormhole NTT cross-chain transfers.</li>
            <li>Ecosystem of 48,000+ developers and $600M+ in venture funding.</li>
          </ul>
        </div>
      </section>

      <section id="network-ethereum" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Ethereum</h2>
        <div className="prose-section">
          <p>Ethereum provides W3AI with access to the largest DeFi ecosystem and the deepest institutional liquidity pools. As a spoke chain, Ethereum enables composability with leading protocols including Uniswap, Aave, and MakerDAO, while providing the credibility and listing infrastructure required for institutional adoption.</p>
          <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
            <li>Spoke chain receiving bridged W3AI tokens via Wormhole NTT.</li>
            <li>Uniswap-style AMM pools for decentralized liquidity.</li>
            <li>Validator node operations with 32 ETH staking requirement.</li>
            <li>ETH Global hackathon ecosystem with 95+ events and 14,000+ projects.</li>
          </ul>
        </div>
      </section>

      <section id="network-bsc" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">BNB Smart Chain</h2>
        <div className="prose-section">
          <p>BNB Smart Chain (BSC) extends W3AI's reach into the highest-volume retail trading ecosystem. With 1.2M daily active users on BSC and 2.7M on opBNB, the chain provides access to a massive user base optimized for high-frequency swaps, token discovery, and community-driven activity.</p>
          <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
            <li>Spoke chain with PancakeSwap Smart Router integration.</li>
            <li>Retail-first onboarding with optimized swap and bridging flows.</li>
            <li>Validator operations with 2,000 BNB minimum self-delegation.</li>
            <li>Gateway vertical for memecoin communities with safety overlay.</li>
          </ul>
        </div>
      </section>

      {/* Foundations */}
      <section id="foundations" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Foundations</h2>
        <div className="prose-section">
          <p>W3AI is built on and integrated with the leading blockchain protocols that power the decentralized web. These foundations provide the secure, scalable infrastructure that enables W3AI's multi-chain AI browser capabilities.</p>
        </div>
      </section>

      <section id="fi-ethereum" data-section>
        <div className="flex items-center flex-wrap gap-4 mb-4">
          <h2 className="text-2xl font-bold text-foreground">Ethereum</h2>
          <div className="flex flex-wrap gap-2">
            <a href="https://github.com/ethereum" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">GitHub</a>
            <a href="https://ethereum.foundation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">Foundation</a>
            <a href="https://x.com/ethereum" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">X</a>
            <a href="https://ethereum.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(75,80%,55%)] text-black text-sm font-medium hover:bg-[hsl(75,80%,45%)] transition-colors">Visit ↗</a>
          </div>
        </div>
        <div className="prose-section">
          <p>The world's leading smart contract platform and the foundation of decentralized finance. Ethereum provides the robust security and vibrant developer ecosystem that powers W3AI's core DeFi integrations and institutional-grade infrastructure.</p>
        </div>
      </section>

      <section id="fi-solana" data-section>
        <div className="flex items-center flex-wrap gap-4 mb-4">
          <h2 className="text-2xl font-bold text-foreground">Solana</h2>
          <div className="flex flex-wrap gap-2">
            <a href="https://github.com/solana-labs" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">GitHub</a>
            <a href="https://solana.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">Foundation</a>
            <a href="https://x.com/solana" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">X</a>
            <a href="https://solana.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(75,80%,55%)] text-black text-sm font-medium hover:bg-[hsl(75,80%,45%)] transition-colors">Visit ↗</a>
          </div>
        </div>
        <div className="prose-section">
          <p>A high-performance blockchain delivering fast, secure, and scalable crypto apps. Solana's sub-second finality and low transaction costs enable real-time AI agent execution and high-frequency DeFi operations within W3AI.</p>
        </div>
      </section>

      <section id="fi-bitcoin" data-section>
        <div className="flex items-center flex-wrap gap-4 mb-4">
          <h2 className="text-2xl font-bold text-foreground">Bitcoin</h2>
          <div className="flex flex-wrap gap-2">
            <a href="https://github.com/bitcoin" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">GitHub</a>
            <a href="https://bitcoin.org/en/bitcoin-core/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">Foundation</a>
            <a href="https://x.com/bitcoin" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">X</a>
            <a href="https://bitcoin.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(75,80%,55%)] text-black text-sm font-medium hover:bg-[hsl(75,80%,45%)] transition-colors">Visit ↗</a>
          </div>
        </div>
        <div className="prose-section">
          <p>The original and most secure blockchain network. W3AI integrates Bitcoin for institutional-grade store-of-value capabilities and emerging layer-2 solutions that bridge Bitcoin liquidity into DeFi protocols.</p>
        </div>
      </section>

      <section id="fi-arbitrum" data-section>
        <div className="flex items-center flex-wrap gap-4 mb-4">
          <h2 className="text-2xl font-bold text-foreground">Arbitrum</h2>
          <div className="flex flex-wrap gap-2">
            <a href="https://github.com/OffchainLabs" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">GitHub</a>
            <a href="https://arbitrum.foundation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">Foundation</a>
            <a href="https://x.com/arbitrum" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">X</a>
            <a href="https://arbitrum.io" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(75,80%,55%)] text-black text-sm font-medium hover:bg-[hsl(75,80%,45%)] transition-colors">Visit ↗</a>
          </div>
        </div>
        <div className="prose-section">
          <p>A leading Ethereum Layer 2 scaling solution offering ultra-low costs and high throughput. Arbitrum powers W3AI's cost-efficient AI computations and complex smart contract interactions at a fraction of mainnet costs.</p>
        </div>
      </section>

      <section id="fi-polygon" data-section>
        <div className="flex items-center flex-wrap gap-4 mb-4">
          <h2 className="text-2xl font-bold text-foreground">Polygon</h2>
          <div className="flex flex-wrap gap-2">
            <a href="https://github.com/0xPolygon" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">GitHub</a>
            <a href="https://polygon.technology" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">Foundation</a>
            <a href="https://x.com/0xPolygon" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">X</a>
            <a href="https://polygon.technology" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(75,80%,55%)] text-black text-sm font-medium hover:bg-[hsl(75,80%,45%)] transition-colors">Visit ↗</a>
          </div>
        </div>
        <div className="prose-section">
          <p>A multi-chain ecosystem connecting Ethereum-compatible blockchains. Polygon's zkEVM and PoS chains provide W3AI users with enterprise scalability, regulatory-grade compliance options, and seamless Web2-Web3 bridges.</p>
        </div>
      </section>

      <section id="fi-cosmos" data-section>
        <div className="flex items-center flex-wrap gap-4 mb-4">
          <h2 className="text-2xl font-bold text-foreground">Cosmos</h2>
          <div className="flex flex-wrap gap-2">
            <a href="https://github.com/cosmos" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">GitHub</a>
            <a href="https://interchain.io" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">Foundation</a>
            <a href="https://x.com/cosmos" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">X</a>
            <a href="https://cosmos.network" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(75,80%,55%)] text-black text-sm font-medium hover:bg-[hsl(75,80%,45%)] transition-colors">Visit ↗</a>
          </div>
        </div>
        <div className="prose-section">
          <p>The internet of blockchains enabling interoperability between sovereign chains. Cosmos IBC integration allows W3AI to route AI agents and assets across independent blockchain ecosystems with minimal friction.</p>
        </div>
      </section>

      <section id="fi-cardano" data-section>
        <div className="flex items-center flex-wrap gap-4 mb-4">
          <h2 className="text-2xl font-bold text-foreground">Cardano</h2>
          <div className="flex flex-wrap gap-2">
            <a href="https://github.com/cardano-foundation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">GitHub</a>
            <a href="https://cardanofoundation.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">Foundation</a>
            <a href="https://x.com/cardano" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">X</a>
            <a href="https://cardano.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(75,80%,55%)] text-black text-sm font-medium hover:bg-[hsl(75,80%,45%)] transition-colors">Visit ↗</a>
          </div>
        </div>
        <div className="prose-section">
          <p>A research-driven blockchain built on peer-reviewed academic foundations. Cardano brings institutional-grade security and formal verification capabilities that strengthen W3AI's high-assurance DeFi integrations.</p>
        </div>
      </section>

      <section id="fi-ton" data-section>
        <div className="flex items-center flex-wrap gap-4 mb-4">
          <h2 className="text-2xl font-bold text-foreground">TON</h2>
          <div className="flex flex-wrap gap-2">
            <a href="https://github.com/ton-blockchain" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">GitHub</a>
            <a href="https://ton.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">Foundation</a>
            <a href="https://x.com/ton_blockchain" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">X</a>
            <a href="https://ton.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(75,80%,55%)] text-black text-sm font-medium hover:bg-[hsl(75,80%,45%)] transition-colors">Visit ↗</a>
          </div>
        </div>
        <div className="prose-section">
          <p>The Open Network designed for Web3 mass adoption with Telegram integration. TON provides W3AI with seamless access to 800M+ Telegram users and ultra-fast transaction processing for consumer-scale AI applications.</p>
        </div>
      </section>

      <section id="fi-tezos" data-section>
        <div className="flex items-center flex-wrap gap-4 mb-4">
          <h2 className="text-2xl font-bold text-foreground">Tezos</h2>
          <div className="flex flex-wrap gap-2">
            <a href="https://github.com/tezos" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">GitHub</a>
            <a href="https://tezos.foundation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">Foundation</a>
            <a href="https://x.com/taboratezos" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">X</a>
            <a href="https://tezos.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(75,80%,55%)] text-black text-sm font-medium hover:bg-[hsl(75,80%,45%)] transition-colors">Visit ↗</a>
          </div>
        </div>
        <div className="prose-section">
          <p>A self-amending blockchain with on-chain governance and formal verification. Tezos integration brings institutional-grade smart contract security and proven tokenization standards to W3AI's asset management layer.</p>
        </div>
      </section>

      <section id="fi-icp" data-section>
        <div className="flex items-center flex-wrap gap-4 mb-4">
          <h2 className="text-2xl font-bold text-foreground">Internet Computer</h2>
          <div className="flex flex-wrap gap-2">
            <a href="https://github.com/dfinity" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">GitHub</a>
            <a href="https://dfinity.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">Foundation</a>
            <a href="https://x.com/dfinity" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">X</a>
            <a href="https://internetcomputer.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(75,80%,55%)] text-black text-sm font-medium hover:bg-[hsl(75,80%,45%)] transition-colors">Visit ↗</a>
          </div>
        </div>
        <div className="prose-section">
          <p>A blockchain-based cloud computing platform that hosts smart contracts, data, and entire web applications on-chain. Internet Computer's canister architecture enables W3AI to deploy fully decentralized frontend and backend logic with web-speed performance and infinite scalability.</p>
        </div>
      </section>

      <section id="fi-web3-foundation" data-section>
        <div className="flex items-center flex-wrap gap-4 mb-4">
          <h2 className="text-2xl font-bold text-foreground">Web3 Foundation</h2>
          <div className="flex flex-wrap gap-2">
            <a href="https://github.com/nicored" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">GitHub</a>
            <a href="https://web3.foundation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">Foundation</a>
            <a href="https://x.com/Web3foundation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">X</a>
            <a href="https://web3.foundation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(75,80%,55%)] text-black text-sm font-medium hover:bg-[hsl(75,80%,45%)] transition-colors">Visit ↗</a>
          </div>
        </div>
        <div className="prose-section">
          <p>The organization behind Polkadot and Kusama, pioneering multi-chain interoperability. Web3 Foundation research and Substrate technology inform W3AI's cross-chain architecture and parachain connectivity roadmap.</p>
        </div>
      </section>

      {/* Multi-chain */}
      <section id="multi-chain" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Multi-Chain Deployments & Supply Integrity</h2>
        <div className="prose-section">
          <p>W3AI intends native token representations on Solana, Ethereum, and BSC. The multi-chain strategy is designed to maximize ecosystem reach while maintaining absolute supply integrity across all deployed networks. Tokenomics must prevent multi-chain "supply duplication" — a critical risk when tokens exist on multiple blockchains simultaneously.</p>
        </div>
      </section>

      <section id="multi-hub-spoke" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Hub & Spoke Architecture</h2>
        <div className="prose-section">
          <p>Solana serves as the Canonical Mint and Hub Chain. All 2,000,000,000 W3AI tokens are minted natively on Solana. Ethereum and BNB Smart Chain operate as spoke chains, receiving wrapped or bridged representations of the canonical supply. This hub-and-spoke model ensures a single source of truth for total supply, eliminates the risk of independent minting on secondary chains, and simplifies auditing and compliance reporting.</p>
          <p>The architecture leverages Solana's high throughput and low transaction costs for primary token operations—staking, governance voting, and reward distribution—while maintaining presence on Ethereum and BSC for DeFi composability and exchange listing requirements.</p>
        </div>
      </section>

      <section id="multi-wormhole" data-section>
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

      <section id="multi-supply-integrity" data-section>
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

      <section id="multi-chain-governance" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Cross-Chain Governance</h2>
        <div className="prose-section">
          <p>Governance participation is chain-agnostic. Token holders on Ethereum and BSC can vote on proposals without bridging back to Solana. Cross-chain message passing aggregates voting power from all chains into a unified governance result on the hub chain.</p>
          <p>This ensures that the multi-chain deployment does not fragment governance participation or create asymmetric voting power between chains. All governance outcomes are executed on Solana and propagated to spoke chains via Wormhole messaging.</p>
        </div>
      </section>

      {/* Validator Yield */}
      <section id="validator-yield" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Validator Yield & Staking Economics</h2>
        <div className="prose-section">
          <p>Validator operations generate protocol-native rewards and must be managed with relentless operational discipline.</p>
        </div>
      </section>

      <section id="eth-validators" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Ethereum Validators</h2>
        <div className="prose-section">
          <p>A validator must deposit 32 ETH and run execution, consensus, and validator clients, with potential slashing of some or all staked ETH for dishonest behavior.</p>
        </div>
      </section>

      <section id="bsc-validators" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">BSC Validators</h2>
        <div className="prose-section">
          <p>Becoming a validator requires minimum self-delegation of 2000 BNB. Validators earn rewards from transaction fees with slashing and jailing rules for downtime, double-signing, and low self-delegation.</p>
        </div>
      </section>

      <section id="sol-validators" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Solana Validators</h2>
        <div className="prose-section">
          <p>Validators "form the backbone" of the Solana network with protocol-based rewards from inflation plus staking-related rewards and fee earnings.</p>
        </div>
      </section>

      {/* Liquidity */}
      <section id="liquidity" data-section>
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

      <section id="dex-strategy" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">DEX Liquidity Strategy</h2>
        <div className="prose-section">
          <p>On Ethereum, W3AI deploys Uniswap-style AMM pools. On BSC, PancakeSwap's Smart Router (V2) links AMM/stableswap liquidity and market makers to improve pricing. The strategy combines protocol-owned liquidity (POL) and professional quoting for early volatility regimes.</p>
        </div>
      </section>

      <section id="cex-strategy" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">CEX Listing Readiness</h2>
        <div className="prose-section">
          <p>Centralized exchanges evaluate projects on security posture, liquidity potential, and market quality. W3AI's market making strategy is tightly coupled with "listing readiness" artifacts: audited contracts, transparent tokenomics, liquidity plans, and operational reliability.</p>
        </div>
      </section>

      <section id="partner-mm" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Partner-Enabled Market Making</h2>
        <div className="prose-section">
          <p>G-20 Group provides liquidity solutions and treasury management across exchange-traded and on-chain venues. Within W3AI, this maps to a professional multi-venue liquidity framework, risk-managed treasury yield, and market-depth stability programs tied to milestones.</p>
        </div>
      </section>

      {/* Marketing */}
      <section id="marketing" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Marketing & Distribution Roadmap</h2>
        <div className="prose-section">
          <p>W3AI's marketing strategy is built around authenticity: each chain is a community with its own verticals, founders, memetics, and risk tolerance. The objective is to embed W3AI into actual user workflows.</p>
        </div>
      </section>

      <section id="community-growth" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Community Growth Objectives</h2>
        <div className="prose-section">
          <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
            <li>Pre-listing: 25,000 Registry users via whitelisted wallets.</li>
            <li>12–18 month: 3–5% of Web3 browser market (3M+ monthly users).</li>
          </ul>
        </div>
      </section>

      <section id="kol-strategy" data-section>
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

      <section id="six-month-rollout" data-section>
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

      {/* Network Partners */}
      <section id="strategic-partners" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Network Partners</h2>
        <div className="prose-section">
          <p>W3AI's partner ecosystem is designed to cover every critical surface of the product—from security and identity to liquidity and institutional credibility. Each partnership is structured around product integration, not brand association.</p>
        </div>
      </section>

      <section id="partner-changelly" data-section>
        <div className="flex items-center flex-wrap gap-4 mb-4">
          <h2 className="text-2xl font-bold text-foreground">Changelly</h2>
          <a href="https://changelly.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(75,80%,55%)] text-black text-sm font-medium hover:bg-[hsl(75,80%,45%)] transition-colors">Visit ↗</a>
        </div>
        <div className="prose-section">
          <p>Changelly provides instant exchange and on/off-ramp infrastructure with a 2.7M-member community. Within W3AI, Changelly's Exchange API powers in-browser swap execution with transparent convenience fees. The API's "extra fee" functionality enables W3AI to configure an additional commission layer that routes to the project treasury.</p>
          <p>Changelly supports 500+ crypto assets across multiple blockchains, providing W3AI users with broad cross-chain swap coverage without leaving the browser environment.</p>
        </div>
      </section>

      <section id="partner-hacken" data-section>
        <div className="flex items-center flex-wrap gap-4 mb-4">
          <h2 className="text-2xl font-bold text-foreground">Hacken</h2>
          <a href="https://hacken.io" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(75,80%,55%)] text-black text-sm font-medium hover:bg-[hsl(75,80%,45%)] transition-colors">Visit ↗</a>
        </div>
        <div className="prose-section">
          <p>Hacken delivers the security backbone for W3AI through smart contract audits, wallet audits, penetration testing, tokenomics audits, proof-of-reserves audits, and post-deployment monitoring. In W3AI, this translates to an "in-browser trust layer" providing risk flags, verified proofs, and standardized security context before users commit capital.</p>
          <p>The "Verified-by-security" co-marketing strategy positions W3AI as the browser that takes security seriously—not as an afterthought, but as a core product feature.</p>
        </div>
      </section>

      <section id="partner-dentity" data-section>
        <div className="flex items-center flex-wrap gap-4 mb-4">
          <h2 className="text-2xl font-bold text-foreground">Dentity</h2>
          <a href="https://dentity.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(75,80%,55%)] text-black text-sm font-medium hover:bg-[hsl(75,80%,45%)] transition-colors">Visit ↗</a>
        </div>
        <div className="prose-section">
          <p>Dentity provides the privacy-forward credential layer that strengthens W3AI's Registry and whitelisted-wallet objective. Dentity emphasizes trust, identity verification, and digital credentials while preserving user privacy.</p>
          <p>W3AI leverages Dentity for pre-sale and beta access controls (credentialed wallet allowlists), reduced bot/sybil influence in governance, and higher-trust partner campaigns with per-vertical onboarding.</p>
        </div>
      </section>

      <section id="partner-northern-trust" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
          Northern Trust
          <a href="https://www.northerntrust.com" target="_blank" rel="noopener noreferrer" className="partner-globe-link"><Globe className="h-5 w-5" /></a>
        </h2>
        <div className="prose-section">
          <p>Northern Trust brings institutional credibility and tokenization expertise through its digital assets platform (Matrix Zenith) and participation in tokenizing ESG reporting credentials. W3AI translates this into product positioning: the browser becomes the interface where "tokenized everything"—RWAs, funds, ESG credentials—is discovered, verified, and managed.</p>
          <p>This partnership signals to institutional participants that W3AI is building for the convergence of traditional finance and decentralized infrastructure.</p>
        </div>
      </section>

      <section id="partner-surge" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
          Surge
          <a href="https://surge.lablab.ai" target="_blank" rel="noopener noreferrer" className="partner-globe-link"><Globe className="h-5 w-5" /></a>
        </h2>
        <div className="prose-section">
          <p>Surge operates as W3AI's discovery and execution gateway for tokenized launches. Within the W3AI ecosystem, Surge provides infrastructure for token distribution events, community-driven launches, and curated project discovery.</p>
          <p>The integration enables W3AI browser users to participate in vetted token launches directly from their browsing environment with built-in security checks and credential verification.</p>
        </div>
      </section>

      <section id="partner-g20" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
          G-20 Group
          <a href="https://g20.group" target="_blank" rel="noopener noreferrer" className="partner-globe-link"><Globe className="h-5 w-5" /></a>
        </h2>
        <div className="prose-section">
          <p>G-20 Group provides professional liquidity solutions and treasury management across exchange-traded and on-chain venues. Within W3AI, this maps to a multi-venue liquidity framework, risk-managed treasury yield, and market-depth stability programs tied to milestones.</p>
          <p>G-20 Group's expertise ensures that W3AI's market making operations meet institutional standards for reliability, transparency, and cross-venue coherence.</p>
        </div>
      </section>

      <section id="partner-lablab" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
          LabLab
          <a href="https://lablab.ai" target="_blank" rel="noopener noreferrer" className="partner-globe-link"><Globe className="h-5 w-5" /></a>
        </h2>
        <div className="prose-section">
          <p>LabLab.ai is a global AI innovation community with over 251,000 members, 23,000+ teams, and 5,200+ prototypes built through free-to-attend AI hackathons. LabLab connects builders, developers, and entrepreneurs with state-of-the-art AI tools and mentorship to accelerate product development from concept to launch.</p>
          <p>Within the W3AI ecosystem, LabLab serves as a talent and innovation pipeline—sourcing AI-native builders who can extend browser functionality, develop W3AI extensions, and contribute to the protocol's open-source components. LabLab's hackathon infrastructure provides W3AI with a repeatable engine for community-driven development and rapid prototyping of new features.</p>
        </div>
      </section>

      <section id="infrastructure" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Infrastructure</h2>
        <div className="prose-section">
          <p>W3AI's infrastructure layer underpins every product surface—from browser AI inference to multi-chain validator operations. The architecture is designed for resilience, scalability, and operational transparency.</p>
        </div>
      </section>

      <section id="infra-network" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Network Architecture</h2>
        <div className="prose-section">
          <p>W3AI's network infrastructure spans three blockchain ecosystems—Solana, Ethereum, and BNB Smart Chain—with Solana as the canonical mint and hub chain. The architecture uses Wormhole Native Token Transfers (NTT) for hub-and-spoke supply management with burn-and-mint models and governance-configurable per-chain rate limits.</p>
          <p>Backend services are distributed across geo-redundant infrastructure with edge computing for latency-sensitive operations such as AI inference routing and real-time transaction simulation.</p>
        </div>
      </section>

      <section id="infra-security" data-section>
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

      <section id="infra-monitoring" data-section>
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

      {/* Security */}
      <section id="security" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Security</h2>
        <div className="prose-section">
          <p>Security is the non-negotiable foundation of every W3AI product surface. In an era where AI agents execute financial transactions, interact with smart contracts, and manage digital identities on behalf of users, the attack surface has expanded beyond traditional cybersecurity models. W3AI treats security not as a feature layer but as an architectural primitive—embedded at every level from browser runtime to on-chain execution.</p>
        </div>
      </section>

      <section id="security-network" data-section>
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

      <section id="security-blockchain" data-section>
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

      <section id="security-defi" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">DeFi Security</h2>
        <div className="prose-section">
          <p>Decentralized finance introduces unique security challenges—flash loan attacks, oracle manipulation, liquidity pool exploits, and MEV extraction. W3AI addresses these through purpose-built safeguards integrated into the browser and protocol layers:</p>
          <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
            <li>Transaction simulation: Every swap, stake, or liquidity provision is simulated before signing. Users see exactly what they will receive, what fees apply, and whether the transaction path contains anomalies.</li>
            <li>MEV protection: W3AI integrates private transaction relays and MEV-aware routing to shield users from sandwich attacks and front-running on Ethereum and BSC.</li>
            <li>Oracle integrity: Price feeds are sourced from multiple decentralized oracles with outlier detection. Stale or manipulated price data triggers automatic circuit breakers.</li>
            <li>Liquidity risk monitoring: Real-time pool depth analysis, impermanent loss estimation, and concentration risk alerts are surfaced directly in the browser interface.</li>
            <li>Protocol allow-listing: Only audited and verified DeFi protocols are accessible through W3AI's native swap and yield interfaces. Unverified contracts require explicit user override with risk acknowledgment.</li>
          </ul>
        </div>
      </section>

      <section id="security-defai" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">DeFAI Security</h2>
        <div className="prose-section">
          <p>DeFAI—the convergence of decentralized finance and artificial intelligence—represents the next frontier of both opportunity and risk. When AI agents autonomously execute financial strategies, the security model must evolve beyond human-in-the-loop to agent-in-the-loop with cryptographic constraints:</p>
          <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
            <li>Agent permission boundaries: AI agents operate within explicit permission envelopes—maximum transaction size, approved protocols, and whitelisted token pairs. No autonomous signing is permitted outside these boundaries.</li>
            <li>Deterministic execution: AI-recommended strategies are compiled into verifiable execution plans. Users approve the plan, not individual transactions, enabling batch execution with full auditability.</li>
            <li>Adversarial robustness: AI models are tested against prompt injection, data poisoning, and adversarial input attacks. The browser sandboxes all AI inference to prevent cross-context data leakage.</li>
            <li>Explainability enforcement: Every AI-driven financial recommendation includes a human-readable rationale, data sources, confidence scores, and risk disclaimers. Black-box execution is architecturally prohibited.</li>
            <li>Kill switch governance: DAO-governed emergency stop mechanisms can pause all AI agent activity network-wide within seconds if systemic risk is detected.</li>
          </ul>
        </div>
      </section>

      <section id="security-ai" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">AI Security</h2>
        <div className="prose-section">
          <p>AI systems within W3AI—from the browser's built-in LLM layer to the Open Gateway inference API—are secured against the full spectrum of AI-specific threats. The security model treats AI as untrusted infrastructure that must be constrained, monitored, and verified at every interaction:</p>
          <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
            <li>Model isolation: Each AI inference request runs in an isolated execution environment. No persistent state is shared between sessions, preventing cross-user data contamination.</li>
            <li>Input sanitization: All user inputs and web content processed by AI models are sanitized against prompt injection, jailbreaking, and instruction override attacks.</li>
            <li>Output verification: AI-generated outputs—especially those triggering financial actions—are validated against rule-based checks before execution. Hallucinated contract addresses, token symbols, or transaction parameters are caught and rejected.</li>
            <li>Data sovereignty: AI inference can run locally on-device for privacy-sensitive operations. No user data is sent to external AI providers without explicit consent and encryption in transit.</li>
            <li>Model provenance: All AI models used within the W3AI ecosystem are version-tracked, hash-verified, and auditable. Model updates require governance approval to prevent supply chain attacks on the inference layer.</li>
            <li>Rate limiting and abuse prevention: API-level rate limits, anomaly detection, and behavioral analysis prevent automated abuse of AI endpoints for phishing content generation, social engineering, or market manipulation.</li>
          </ul>
        </div>
      </section>

      {/* Privacy Policy */}
      <section id="privacy" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Privacy Policy</h2>
        <div className="prose-section">
          <p>Privacy is a foundational principle of Web3 architecture. W3AI is committed to building privacy-preserving systems that protect user data, on-chain identity, and transactional confidentiality while maintaining compliance with applicable regulatory frameworks. The privacy framework is designed specifically for the Web3 environment, where traditional data collection models are replaced by cryptographic verification, zero-knowledge proofs, and user-sovereign data ownership.</p>
        </div>
      </section>

      <section id="privacy-data-minimization" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Data Minimization</h2>
        <div className="prose-section">
          <p>W3AI adheres to a strict data minimization principle. The browser collects only the minimum information necessary to deliver core functionality. No browsing history, wallet balances, or transaction data is stored on centralized servers. All user activity remains local unless explicitly shared by the user.</p>
        </div>
      </section>

      <section id="privacy-on-chain" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">On-Chain Privacy</h2>
        <div className="prose-section">
          <p>Wallet interactions, token swaps, and governance participation are conducted through privacy-preserving mechanisms. W3AI supports selective disclosure protocols, enabling users to prove eligibility (e.g., KYC status, token holdings) without revealing underlying personal data.</p>
        </div>
      </section>

      <section id="privacy-third-party" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Data Sharing</h2>
        <div className="prose-section">
          <p>W3AI does not sell, rent, or share user data with third parties for advertising or profiling purposes. Where integrations require data exchange (e.g., fiat on-ramps, KYC providers), users are informed and must provide explicit consent. All third-party processors are contractually bound to equivalent privacy standards.</p>
        </div>
      </section>

      <section id="privacy-user-rights" data-section>
        <h2 className="text-2xl font-bold text-foreground mb-4">User Rights & Control</h2>
        <div className="prose-section">
          <p>Users retain full control over their data at all times. This includes the right to export, delete, or restrict processing of any personally identifiable information. W3AI's architecture ensures that account deletion results in complete and irreversible data removal from all systems.</p>
        </div>
      </section>

      {/* Identity */}
      <section id="identity-anti-sybil" data-section>
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


      <div className="h-24" />
    </div>
  );
}

// --- Main Page ---
export default function Whitepaper() {
  const [unlocked, setUnlocked] = useState(true);
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

      <div className="flex min-h-[calc(100vh-80px)] pt-16 lg:pt-20">
        <DesktopSidebar activeId={activeId} onNavigate={navigateTo} />
        <MobileDrawerSidebar activeId={activeId} onNavigate={navigateTo} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0">
          <WhitepaperContent onSectionVisible={setActiveId} />
        </main>
      </div>

      {/* Fixed mobile nav trigger - vertical tab on left edge */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[70] lg:hidden">
        <motion.button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center justify-center w-7 h-14 rounded-r-lg bg-primary/90 text-primary-foreground shadow-lg backdrop-blur-sm"
          whileTap={{ scale: 0.9 }}
          aria-label="Open table of contents"
        >
          <ChevronRight className="h-4 w-4" />
        </motion.button>
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

        @media print {
          /* Hide non-content elements */
          nav, aside, footer, .lg\\:hidden, .fixed, button[class*="scroll"],
          [class*="sticky"], [class*="backdrop-blur"], [class*="PasswordGate"] {
            display: none !important;
          }

          /* Reset layout for single continuous page */
          body, html {
            background: white !important;
            color: black !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .min-h-screen { min-height: auto !important; }
          .flex { display: block !important; }
          .pt-16, .lg\\:pt-20, .pt-20 { padding-top: 0 !important; }
          .blur-md { filter: none !important; }
          .pointer-events-none { pointer-events: auto !important; }

          /* Content styling for print */
          main { width: 100% !important; }
          .max-w-4xl { max-width: 100% !important; padding: 0 1cm !important; }
          section { break-inside: avoid; page-break-inside: avoid; }
          h1, h2, h3 { color: black !important; break-after: avoid; }
          p, li { color: #333 !important; }
          strong { color: black !important; }

          /* Hide download button in print */
          button:has(.lucide-download), [class*="Download"] { display: none !important; }

          /* Image styling */
          .animated-gradient-icon { border: none !important; }
          img { max-height: 300px !important; }

          /* Remove decorative elements */
          .animated-gradient-icon::before,
          .animated-gradient-icon::after { display: none !important; }

          @page {
            margin: 1.5cm;
            size: A4;
          }
        }
      `}</style>
    </div>
  );
}
