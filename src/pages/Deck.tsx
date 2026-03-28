import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Globe, Shield, Zap, Bot, Wallet, BarChart3, Lock, Search, Layers, Settings, Network, ArrowLeftRight, Brain, LayoutGrid, Coins, Code, CircleDollarSign, Landmark, Users, Key, Gift, CheckSquare, Swords, Heart, Truck, TrendingUp, Cloud, Leaf, Monitor, Link2, FileCode, ShieldCheck, Target, Mail, Phone, ArrowRight, Cpu, Database, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import whitepaperHero from "@/assets/whitepaper-hero.webp";
import heroBackground from "@/assets/hero-bg.webp";
import logoIcon from "@/assets/plato-icon.webp";
import platoIcon from "@/assets/plato-icon.webp";
import infrastructureSlideBg from "@/assets/infrastructure-slide-bg.png";

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
        W3AI <span className="text-muted-foreground/30">|</span> TMRW
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
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:bottom-6 z-20 pointer-events-none">
      <span className="text-[10px] font-light tracking-[0.2em] text-[hsl(82,85%,55%,0.5)]">
        {String(n).padStart(2, "0")}
      </span>
    </div>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-tight text-[hsl(82,85%,55%)]">{value}</div>
      <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">{label}</div>
    </div>
  );
}

function SlideTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-foreground">{children}</h2>;
}

function SlideSubtitle({ children }: { children: React.ReactNode }) {
  return <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed max-w-2xl mx-auto">{children}</p>;
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

// --- Browser Prototype Slide ---
const browserSections = [
  {
    id: "welcome",
    icon: Globe,
    label: "Browser",
    title: "Welcome to W3AI.",
    subtitle: "Your agentic Web3 AI browser built for the next web.\nSecure. Intelligent. Decentralized.",
    cta: "Launch Browser",
    gradient: "from-[hsl(270,60%,25%)] via-[hsl(290,50%,30%)] to-[hsl(310,60%,35%)]",
    accentHsl: "hsl(290,70%,60%)",
    heroIcon: Globe,
  },
  {
    id: "search",
    icon: Search,
    label: "Search",
    title: "Search.",
    subtitle: "Context-aware, privacy-first search\nacross Web2 and Web3.",
    cta: "Search",
    gradient: "from-[hsl(170,40%,15%)] via-[hsl(180,50%,20%)] to-[hsl(190,45%,25%)]",
    accentHsl: "hsl(180,60%,45%)",
    heroIcon: Search,
  },
  {
    id: "applications",
    icon: LayoutGrid,
    label: "Applications",
    title: "Applications.",
    subtitle: "Decentralized apps, DeFi protocols,\nand Web3 tools — all in one place.",
    cta: "Browse Apps",
    gradient: "from-[hsl(280,50%,22%)] via-[hsl(300,55%,28%)] to-[hsl(320,50%,32%)]",
    accentHsl: "hsl(300,65%,58%)",
    heroIcon: LayoutGrid,
  },
  {
    id: "security",
    icon: Shield,
    label: "Security",
    title: "Security.",
    subtitle: "Transaction simulation, smart\ncontract audits and verified proofs.",
    cta: "Scan",
    gradient: "from-[hsl(340,50%,30%)] via-[hsl(330,60%,35%)] to-[hsl(320,50%,40%)]",
    accentHsl: "hsl(340,70%,60%)",
    heroIcon: Shield,
  },
  {
    id: "ai",
    icon: Bot,
    label: "AI Agent",
    title: "Marvin AI.",
    subtitle: "Meet your on-device AI copilot. BYOK\nor Open Gateway — you choose.",
    cta: "Ask Marvin",
    gradient: "from-[hsl(140,40%,15%)] via-[hsl(150,50%,20%)] to-[hsl(160,40%,25%)]",
    accentHsl: "hsl(150,60%,50%)",
    heroIcon: Bot,
  },
  {
    id: "performance",
    icon: Zap,
    label: "Performance",
    title: "Performance.",
    subtitle: "Gecko Engine. Optimized for speed,\nprivacy and security.",
    cta: "View Tasks",
    gradient: "from-[hsl(15,60%,20%)] via-[hsl(20,70%,28%)] to-[hsl(25,60%,32%)]",
    accentHsl: "hsl(25,80%,55%)",
    heroIcon: Zap,
  },
  {
    id: "layers",
    icon: Layers,
    label: "Layers",
    title: "Multi-Chain.",
    subtitle: "Seamless cross-chain execution.\nWormhole NTT bridging.",
    cta: "Switch Chain",
    gradient: "from-[hsl(45,50%,18%)] via-[hsl(40,60%,22%)] to-[hsl(35,55%,28%)]",
    accentHsl: "hsl(45,70%,55%)",
    heroIcon: Layers,
  },
  {
    id: "settings",
    icon: Settings,
    label: "Settings",
    title: "Settings.",
    subtitle: "Full control. Privacy levels,\nAI preferences and chain defaults.",
    cta: "Configure",
    gradient: "from-[hsl(0,0%,12%)] via-[hsl(0,0%,16%)] to-[hsl(0,0%,20%)]",
    accentHsl: "hsl(0,0%,60%)",
    heroIcon: Settings,
  },
];

const toolbarSections = [
  { icon: Network, label: "Protocol", title: "Protocol Layer.", subtitle: "Decentralized infrastructure layer\npowering secure verifiable transactions.", gradient: "from-[hsl(200,50%,18%)] via-[hsl(210,55%,24%)] to-[hsl(220,50%,30%)]", accentHsl: "hsl(210,65%,55%)" },
  { icon: ArrowLeftRight, label: "Swap", title: "Swap.", subtitle: "Instant cross-chain token swaps\nwith best-rate aggregation.", gradient: "from-[hsl(260,45%,20%)] via-[hsl(270,50%,26%)] to-[hsl(280,45%,32%)]", accentHsl: "hsl(270,60%,58%)" },
  { icon: Brain, label: "Intelligence", title: "Intelligence.", subtitle: "AI-powered market analysis\nand predictive portfolio insights.", gradient: "from-[hsl(190,45%,15%)] via-[hsl(200,50%,20%)] to-[hsl(210,45%,26%)]", accentHsl: "hsl(200,60%,50%)" },
  { icon: Wallet, label: "Wallet", title: "Wallet.", subtitle: "Multi-chain wallet management\nwith hardware security support.", gradient: "from-[hsl(30,50%,18%)] via-[hsl(35,55%,24%)] to-[hsl(40,50%,30%)]", accentHsl: "hsl(35,65%,55%)" },
  { icon: Lock, label: "Identity", title: "Identity.", subtitle: "Self-sovereign identity verification\nand decentralized credentials.", gradient: "from-[hsl(350,40%,18%)] via-[hsl(355,50%,24%)] to-[hsl(0,45%,30%)]", accentHsl: "hsl(355,55%,55%)" },
  { icon: Coins, label: "Staking", title: "Staking.", subtitle: "Liquid staking and yield optimization\nacross multiple validators.", gradient: "from-[hsl(120,35%,14%)] via-[hsl(130,40%,19%)] to-[hsl(140,35%,24%)]", accentHsl: "hsl(130,50%,45%)" },
  { icon: Code, label: "Code", title: "Code.", subtitle: "Integrated smart contract IDE\nwith AI-assisted debugging.", gradient: "from-[hsl(60,30%,14%)] via-[hsl(65,35%,18%)] to-[hsl(70,30%,22%)]", accentHsl: "hsl(65,50%,50%)" },
  { icon: CircleDollarSign, label: "DeFi", title: "DeFi.", subtitle: "Lending, borrowing, and liquidity\nprotocols in one dashboard.", gradient: "from-[hsl(80,40%,14%)] via-[hsl(82,50%,18%)] to-[hsl(85,45%,24%)]", accentHsl: "hsl(82,60%,50%)" },
  { icon: Landmark, label: "RWA", title: "Real World Assets.", subtitle: "Tokenized real-world assets\nwith institutional-grade compliance.", gradient: "from-[hsl(160,40%,14%)] via-[hsl(165,50%,19%)] to-[hsl(170,45%,25%)]", accentHsl: "hsl(165,55%,45%)" },
];

const heroMessages = [
  { line1: "Accelerating Growth", line2: "Through Space & Time." },
  { line1: "Secure Network Protocol", line2: "For the Next Web." },
];

function BrowserPrototypeSlide() {
  const [activeSection, setActiveSection] = useState(0);
  const [activeToolbar, setActiveToolbar] = useState<number | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const section = browserSections[activeSection];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const isToolbarActive = activeToolbar !== null;
  const displayGradient = isToolbarActive ? toolbarSections[activeToolbar!].gradient : section.gradient;
  const displayAccent = isToolbarActive ? toolbarSections[activeToolbar!].accentHsl : section.accentHsl;
  const displayTitle = isToolbarActive ? toolbarSections[activeToolbar!].title : null;
  const displaySubtitle = isToolbarActive ? toolbarSections[activeToolbar!].subtitle : null;
  const HeroIcon = isToolbarActive ? toolbarSections[activeToolbar!].icon : section.heroIcon;

  const handleSidebarClick = (i: number) => { setActiveSection(i); setActiveToolbar(null); };
  const handleToolbarClick = (i: number) => { setActiveToolbar(i === activeToolbar ? null : i); };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full relative px-2 sm:px-4">
      <div className="relative w-full max-w-4xl">
        <div className="relative w-full rounded-[2.5rem] overflow-hidden shadow-[0_8px_60px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)]" style={{ minHeight: 460 }}>
          <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-700 ease-in-out ${displayGradient}`} />
          <div className="absolute inset-0 pointer-events-none transition-all duration-700" style={{ background: `radial-gradient(ellipse 60% 50% at 55% 40%, ${displayAccent.replace(")", ",0.18)")}, transparent)` }} />

          {/* Title bar */}
          <div className="relative z-10 flex items-center h-10 px-6 bg-black/30 backdrop-blur-md border-b border-white/5 rounded-t-[2.5rem]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[hsl(0,70%,55%)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[hsl(40,80%,55%)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[hsl(130,60%,45%)]" />
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-1 ml-auto">
              {toolbarSections.map((t, i) => {
                const TIcon = t.icon;
                const isActive = activeToolbar === i;
                return (
                  <div key={t.label} className="relative group">
                    <button onClick={() => handleToolbarClick(i)} className={cn("w-6 h-6 rounded-md flex items-center justify-center transition-colors", isActive ? "bg-white/20" : "hover:bg-white/10")}>
                      <TIcon className={cn("w-3.5 h-3.5 transition-colors", isActive ? "text-white" : "text-white/40 group-hover:text-white")} />
                    </button>
                    <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/80 text-[9px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">{t.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 flex" style={{ minHeight: 420 }}>
            {/* Sidebar */}
            <div className="flex flex-col items-center py-4 px-2 gap-1 bg-black/20 backdrop-blur-md border-r border-white/5 w-14 shrink-0 rounded-bl-[2.5rem] z-20 relative">
              {browserSections.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === activeSection && !isToolbarActive;
                return (
                  <div key={s.id} className="relative group">
                    <button onClick={() => handleSidebarClick(i)} className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300", isActive ? "bg-white/15 shadow-lg" : "hover:bg-white/8")} style={isActive ? { boxShadow: `0 0 20px ${section.accentHsl.replace(")", ",0.3)")}` } : {}}>
                      <Icon className={cn("w-4 h-4 transition-all duration-300", isActive ? "text-white" : "text-white/40 group-hover:text-white/70")} />
                    </button>
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-black/80 text-[9px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">{s.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-8 pb-16 relative -ml-8 md:-ml-16">
              {/* Glass icon — centered */}
              <div className="mb-6 relative transition-all duration-500">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 -z-10 blur-3xl rounded-full transition-all duration-700" style={{ background: displayAccent, opacity: 0.35 }} />
                <svg viewBox="0 0 200 200" className="w-20 h-20 md:w-24 md:h-24 transition-all duration-500" style={{ filter: `drop-shadow(0 8px 30px ${displayAccent.replace(")", ",0.4)")}) drop-shadow(0 2px 8px rgba(0,0,0,0.5))` }}>
                  <defs>
                    <linearGradient id="glass-bg-active" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={displayAccent.replace(")", ",0.7)")} />
                      <stop offset="50%" stopColor={displayAccent.replace(")", ",0.4)")} />
                      <stop offset="100%" stopColor={displayAccent.replace(")", ",0.65)")} />
                    </linearGradient>
                    <linearGradient id="glass-border-active" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                      <stop offset="50%" stopColor={displayAccent.replace(")", ",0.3)")} />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
                    </linearGradient>
                    <radialGradient id="glass-shine-active" cx="50%" cy="25%" r="50%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </radialGradient>
                  </defs>
                  <path d="M100 8 C108 8, 115 12, 170 45 C180 51, 184 58, 184 72 L184 128 C184 142, 180 149, 170 155 L108 192 C102 196, 98 196, 92 192 L30 155 C20 149, 16 142, 16 128 L16 72 C16 58, 20 51, 30 45 Z" fill="url(#glass-border-active)" />
                  <path d="M100 16 C106 16, 112 19, 164 50 C172 55, 176 60, 176 72 L176 128 C176 140, 172 145, 164 150 L106 184 C102 187, 98 187, 94 184 L36 150 C28 145, 24 140, 24 128 L24 72 C24 60, 28 55, 36 50 Z" fill="url(#glass-bg-active)" />
                  <ellipse cx="100" cy="60" rx="55" ry="35" fill="url(#glass-shine-active)" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <HeroIcon className="w-8 h-8 md:w-10 md:h-10 text-white transition-all duration-500" strokeWidth={1.5} style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.4))" }} />
                </div>
              </div>

              {/* Hero copy — all content rendered in DOM for translation, shown/hidden via CSS */}
              {/* Welcome section (activeSection === 0, no toolbar) */}
              <div className={cn("flex flex-col items-center", activeSection === 0 && !isToolbarActive ? "" : "hidden")}>
                <p className="text-xl md:text-3xl font-light text-white tracking-tight text-center">
                  Secure Network Protocol for the Next Web.
                </p>
                <p className="text-xl md:text-3xl font-light text-white tracking-tight mt-1 text-center">
                  Agentic Web3 AI Browser
                </p>
                <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/40 mt-3 text-center">
                  RWA's · Web3AI · Cyber · Data · Compliance
                </p>
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40">MADE EXCLUSIVELY FOR MAC</span>
                  <svg viewBox="0 0 384 512" className="h-3.5 w-3.5 md:h-4 md:w-4 animated-gradient-icon-bright" style={{
                    WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'%3E%3Cpath d='M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z'/%3E%3C/svg%3E")`,
                    maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'%3E%3Cpath d='M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z'/%3E%3C/svg%3E")`,
                    WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center",
                  }} />
                </div>
              </div>

              {/* Sidebar sections (activeSection > 0, no toolbar) */}
              {browserSections.map((s, i) => i > 0 && (
                <div key={s.id} className={cn("flex flex-col items-center", i === activeSection && !isToolbarActive ? "" : "hidden")}>
                  <p className="text-xl md:text-3xl font-light text-white tracking-tight text-center transition-all duration-500">
                    {s.title}
                  </p>
                  <p className="text-xl md:text-3xl font-light text-white/45 tracking-tight mt-2 text-center max-w-lg transition-all duration-500 whitespace-pre-line leading-snug">
                    {s.subtitle}
                  </p>
                </div>
              ))}

              {/* Toolbar sections */}
              {toolbarSections.map((t, i) => (
                <div key={t.label} className={cn("flex flex-col items-center", activeToolbar === i ? "" : "hidden")}>
                  <p className="text-xl md:text-3xl font-light text-white tracking-tight text-center transition-all duration-500">
                    {t.title}
                  </p>
                  <p className="text-xl md:text-3xl font-light text-white/45 tracking-tight mt-2 text-center max-w-2xl transition-all duration-500 whitespace-pre-line leading-snug line-clamp-2">
                    {t.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Glowing branded circle — right side, below toolbar */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center" style={{
            background: `linear-gradient(160deg, ${displayAccent.replace(")", ",0.12)")}, ${displayAccent.replace(")", ",0.06)")})`,
            border: `1.5px solid rgba(255,255,255,0.5)`,
            boxShadow: `0 0 15px rgba(255,255,255,0.25), 0 0 40px rgba(255,255,255,0.1), 0 0 60px ${displayAccent.replace(")", ",0.2)")}`,
            backdropFilter: "blur(12px)", transition: "all 0.5s ease",
          }}>
            <div className="h-10 w-10 md:h-12 md:w-12 shrink-0 animated-gradient-icon-bright" style={{
              WebkitMaskImage: `url(${platoIcon})`, WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center",
              maskImage: `url(${platoIcon})`, maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center",
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

const slides: Slide[] = [
  // 1 — Title
  {
    id: "title",
    render: () => (
      <div className="relative flex flex-col items-center justify-end pb-8 sm:pb-12 min-h-[350px] sm:min-h-[450px] h-full text-center gap-6">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img src={heroBackground} alt="" className="absolute inset-0 w-full h-full object-cover object-top" />
          <div className="absolute inset-0 pointer-events-none animated-gradient-hero-overlay" />
          <div className="absolute inset-0 bg-[hsl(220,20%,4%,0.25)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent via-40% to-background" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/90 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white leading-[1.1]">W3AI</h1>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white leading-[1.1]">
              Secure Network Protocol
              <br />
              For The Next Web.
            </h1>
          </div>
          <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-white/50">
            RWA's · Web3AI · Cyber · Data · Compliance
          </p>
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

        <div className="text-center"><SlideTitle>Important Disclaimer</SlideTitle></div>
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
      </div>
    ),
  },
  // --- NEW SLIDES FROM W3AI LIQUID GLASS ---
  // LG2 — AI Revolution
  {
    id: "ai-revolution",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">
        <div className="text-center space-y-4">
          <SlideTitle>The AI Revolution is Here</SlideTitle>
          <SlideSubtitle>Today's AI landscape is dominated by tech monopolies, creating opaque data silos, limiting innovation, and concentrating power.</SlideSubtitle>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <GreenCard className="p-6 space-y-4">
            <span className="inline-block text-[10px] uppercase tracking-widest text-red-400 border border-red-400/30 rounded-full px-3 py-0.5">Current Paradigm</span>
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-lg font-medium text-foreground">Data Silos</h3>
            </div>
            <BulletList items={[
              { bold: "", text: "Centralized control by tech giants" },
              { bold: "", text: "Fragmented, inaccessible data" },
              { bold: "", text: "Innovation bottlenecks" },
            ]} />
          </GreenCard>
          <GreenCard className="p-6 space-y-4">
            <span className="inline-block text-[10px] uppercase tracking-widest text-[hsl(82,85%,55%)] border border-[hsl(82,85%,55%,0.3)] rounded-full px-3 py-0.5">The W3AI Vision</span>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-[hsl(82,85%,55%)]" />
              <h3 className="text-lg font-medium text-foreground">Decentralized Knowledge</h3>
            </div>
            <div className="space-y-3">
              {["Open access for all developers", "Transparent, on-chain validation", "Community-driven innovation"].map(t => (
                <div key={t} className="flex gap-3 items-start">
                  <ArrowRight className="w-4 h-4 text-[hsl(82,85%,55%)] mt-0.5 shrink-0" />
                  <p className="text-sm font-light text-muted-foreground">{t}</p>
                </div>
              ))}
            </div>
          </GreenCard>
        </div>
      </div>
    ),
  },
  // LG3 — Decentralized AI Ecosystem
  {
    id: "decentralized-ecosystem",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-6 max-w-3xl mx-auto relative">
        <div className="text-center space-y-4">
          <SlideTitle>A Decentralized AI Ecosystem</SlideTitle>
          <SlideSubtitle>W3AI was founded on the principle that intelligence should be open, decentralized, and self-evolving. We are pioneering a trustless, transparent, and scalable AI ecosystem built on Web3 infrastructure.</SlideSubtitle>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[
            { icon: Lock, title: "Open", desc: "For developers, users, and enterprises to build and access." },
            { icon: Shield, title: "Trustless", desc: "Eliminating bias and ensuring integrity through on-chain validation." },
            { icon: Users, title: "Accessible", desc: "Democratizing AI and removing centralized bottlenecks." },
            { icon: Zap, title: "Autonomous", desc: "Self-evolving AI agents that learn, adapt, and optimize without intervention." },
            { icon: Globe, title: "Scalable", desc: "Global infrastructure designed to handle millions of concurrent AI operations." },
          ].map(c => (
            <GreenCard key={c.title} className="p-4 space-y-2">
              <c.icon className="w-5 h-5 text-[hsl(82,85%,55%)]" />
              <h3 className="text-sm font-medium text-[hsl(82,85%,55%)]">{c.title}</h3>
              <p className="text-[11px] font-light text-muted-foreground leading-relaxed">{c.desc}</p>
            </GreenCard>
          ))}
        </div>
        <p className="text-sm font-light text-muted-foreground text-center italic">Curating, refining, and distributing intelligence across decentralized networks — <span className="font-medium text-foreground">without institutional gatekeeping.</span></p>
      </div>
    ),
  },
  // LG4 — Built on Solana
  {
    id: "built-on-solana",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-6 max-w-3xl mx-auto relative">
        <div className="text-center space-y-3">
          <SlideTitle>Built on Solana</SlideTitle>
          <SlideSubtitle>Solana's unique architecture provides the high-performance infrastructure necessary for AI-driven applications demanding real-time interactions.</SlideSubtitle>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Zap, value: "65K+ TPS", label: "Lightning Fast" },
            { icon: CircleDollarSign, value: "<$0.001", label: "Ultra Low Cost" },
            { icon: Activity, value: "400ms", label: "Real-time" },
            { icon: Cpu, value: "Native", label: "AI Ready" },
          ].map(s => (
            <GreenCard key={s.label} className="p-5 text-center space-y-2">
              <s.icon className="w-5 h-5 text-[hsl(82,85%,55%)] mx-auto" />
              <p className="text-xl font-extralight text-foreground">{s.value}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
            </GreenCard>
          ))}
        </div>
        <GreenCard className="p-5 space-y-3">
          <div className="flex items-center gap-3">
            <ArrowLeftRight className="w-5 h-5 text-[hsl(82,85%,55%)]" />
            <h3 className="text-sm font-medium text-foreground">Cross-Chain Architecture</h3>
          </div>
          <p className="text-xs font-light text-muted-foreground">W3AI extends beyond Solana with full cross-chain interoperability — supporting all EVM and BSC-based dApps for seamless multi-chain AI deployment.</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Link2, title: "EVM Compatible", desc: "Ethereum, Polygon, Arbitrum, Optimism & more" },
              { icon: Globe, title: "BSC Integration", desc: "Full BNB Smart Chain dApp support" },
              { icon: ArrowLeftRight, title: "Seamless Bridging", desc: "Cross-chain asset & data transfers" },
            ].map(c => (
              <GreenCard key={c.title} className="p-3 text-center space-y-1">
                <c.icon className="w-4 h-4 text-[hsl(82,85%,55%)] mx-auto" />
                <p className="text-xs font-medium text-foreground">{c.title}</p>
                <p className="text-[10px] font-light text-muted-foreground">{c.desc}</p>
              </GreenCard>
            ))}
          </div>
        </GreenCard>
      </div>
    ),
  },
  // LG5 — Anatomy of Intelligence Network
  {
    id: "anatomy-network",
    render: () => (
      <div className="flex flex-col justify-center items-center h-full gap-8 max-w-3xl mx-auto relative">
        <div className="text-center space-y-3 w-full">
          <SlideTitle>The Anatomy of W3AI's Intelligence Network</SlideTitle>
          <SlideSubtitle>A multi-faceted ecosystem designed to develop, deploy, and commercialize vertically integrated AI applications through autonomous agents.</SlideSubtitle>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { icon: Bot, title: "Autonomous AI Agents", desc: "Self-learning agents for data-sharing, optimization, and decision-making. Features an open-source library of 13k+ vertical AI apps." },
            { icon: CheckSquare, title: "AI-Powered Governance", desc: "Utilizing machine learning models to optimize decision-making for a truly data-driven DAO." },
            { icon: Coins, title: "Tokenized AI Economy", desc: "A peer-to-peer economy where AI models and intelligence are monetized via the W3AI token." },
            { icon: Network, title: "Decentralized Knowledge Graph", desc: "On-chain AI indexing and validation to ensure intelligence is auditable, transparent, and fair." },
          ].map(c => (
            <GreenCard key={c.title} className="p-6 space-y-3">
              <c.icon className="w-5 h-5 text-[hsl(82,85%,55%)]" />
              <h3 className="text-base font-medium text-foreground">{c.title}</h3>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">{c.desc}</p>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },
  // LG6 — Zeus IDE
  {
    id: "zeus-ide",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-6 max-w-3xl mx-auto relative">
        <div className="text-center space-y-3">
          <SlideTitle>The Zeus IDE</SlideTitle>
          <SlideSubtitle>The AI-Orchestrated Engine for dApp Development on Solana. Use natural language, code, and visual tools to generate, test, and deploy smart contracts with unprecedented speed.</SlideSubtitle>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { icon: Code, title: "AI-Orchestrated Code Generation", desc: "Translates high-level instructions into Solana-compatible smart contract code using Anchor framework." },
            { icon: FileCode, title: "Integrated dApp Deployment", desc: "One-click deployment to the Solana network, with lifecycle automation managed by the DAO." },
            { icon: Shield, title: "AI-Driven Security & Auditing", desc: "Automatically simulates attack scenarios and leverages W3AI's knowledge graph to identify vulnerabilities." },
            { icon: Layers, title: "Deep Solana Integration", desc: "Natively supports key Solana protocols including Anchor, Serum, Metaplex (NFTs), and Realms (DAO)." },
          ].map(c => (
            <GreenCard key={c.title} className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <c.icon className="w-5 h-5 text-[hsl(82,85%,55%)]" />
                <h3 className="text-sm font-medium text-foreground">{c.title}</h3>
              </div>
              <p className="text-xs font-light text-muted-foreground leading-relaxed">{c.desc}</p>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },
  // LG7 — W3AI Token
  {
    id: "w3ai-token",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-6 max-w-3xl mx-auto relative">
        <div className="text-center space-y-3">
          <SlideTitle>The W3AI Token</SlideTitle>
          <SlideSubtitle>Fueling the Intelligence Economy — the core utility and governance token powering W3AI's ecosystem.</SlideSubtitle>
        </div>
        <div className="flex justify-center">
          <GreenCard className="px-8 py-3 inline-flex gap-8">
            {[
              { label: "Symbol", value: "W3AI" },
              { label: "Network", value: "Solana" },
              { label: "Supply", value: "2B" },
            ].map(t => (
              <div key={t.label} className="text-center">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{t.label}</p>
                <p className="text-lg font-extralight text-[hsl(82,85%,55%)]">{t.value}</p>
              </div>
            ))}
          </GreenCard>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Key, title: "Access", items: ["Payment for AI workloads", "Premium data subscriptions", "Unlocks 13k+ AI Agents"] },
            { icon: Gift, title: "Incentivize", items: ["Developer & data rewards", "Community incentives", "Model refinement rewards"] },
            { icon: Layers, title: "Stake", items: ["Infrastructure rewards", "Long-term engagement", "Network security"] },
            { icon: CheckSquare, title: "Govern", items: ["Vote on protocol upgrades", "AI model integration decisions", "Treasury allocations via DAO"] },
          ].map(c => (
            <GreenCard key={c.title} className="p-5 space-y-3">
              <c.icon className="w-5 h-5 text-[hsl(82,85%,55%)]" />
              <h3 className="text-sm font-medium text-foreground">{c.title}</h3>
              <div className="space-y-1.5">
                {c.items.map(item => (
                  <div key={item} className="flex gap-2 items-start">
                    <div className="w-1 h-1 rounded-full bg-[hsl(82,85%,55%)] mt-1.5 shrink-0" />
                    <p className="text-[11px] font-light text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },
  // LG8 — Tokenomics & Capital Strategy
  {
    id: "capital-strategy",
    render: () => (
      <div className="flex flex-col justify-center items-center h-full gap-6 max-w-3xl mx-auto relative">
        <div className="text-center w-full space-y-2">
          <SlideTitle>Tokenomics</SlideTitle>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GreenCard className="p-6 space-y-4">
            <h3 className="text-sm font-medium text-[hsl(82,85%,55%)]">Token Allocation</h3>
            <div className="space-y-3">
              {[
                { label: "Treasury", pct: "55%", color: "bg-blue-500", width: "55%" },
                { label: "Team & Advisors", pct: "10%", color: "bg-blue-400", width: "10%" },
                { label: "IDO / TGE", pct: "10%", color: "bg-blue-600", width: "10%" },
                { label: "SEED Round", pct: "10%", color: "bg-cyan-400", width: "10%" },
                { label: "Community Grants", pct: "7.5%", color: "bg-purple-400", width: "7.5%" },
                { label: "Rewards / Incentives", pct: "7.5%", color: "bg-amber-400", width: "7.5%" },
              ].map(a => (
                <div key={a.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground font-light">{a.label}</span>
                    <span className="text-muted-foreground font-light">{a.pct}</span>
                  </div>
                  <div className="w-full h-1 bg-border/30 rounded-full overflow-hidden">
                    <div className={`h-full ${a.color} rounded-full`} style={{ width: a.width }} />
                  </div>
                </div>
              ))}
            </div>
            <GreenCard className="p-3 space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Deflationary Measure</p>
              <p className="text-xs font-light text-foreground">20% of tokens used for platform services will be burned with an active for profit treasury.</p>
            </GreenCard>
          </GreenCard>
          <GreenCard className="p-6 space-y-4 flex flex-col">
            <h3 className="text-sm font-medium text-[hsl(82,85%,55%)]">Fundraising Rounds</h3>
            <div className="space-y-3 flex-1">
              {[
                { label: "Foundations", fdv: "$1M FDV", color: "bg-green-400", width: "3%" },
                { label: "Private Pre-Sale", fdv: "$3.7M FDV", color: "bg-purple-400", width: "12%" },
                { label: "Private Pre-Sale", fdv: "$7.5M FDV", color: "bg-purple-500", width: "25%" },
                { label: "SEED Round", fdv: "$15M FDV", color: "bg-cyan-400", width: "50%" },
                { label: "IDO / TGE", fdv: "$30M FDV", color: "bg-blue-500", width: "100%" },
                { label: "Market Makers", fdv: "$30M FDV", color: "bg-amber-400", width: "100%" },
              ].map((a, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground font-light">{a.label}</span>
                    <span className="text-muted-foreground font-light">{a.fdv}</span>
                  </div>
                  <div className="w-full h-1 bg-border/30 rounded-full overflow-hidden">
                    <div className={`h-full ${a.color} rounded-full`} style={{ width: a.width }} />
                  </div>
                </div>
              ))}
            </div>
            <GreenCard className="p-3 space-y-1 mt-auto">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Capital Target</p>
              <p className="text-xs font-light text-foreground">Strategic rounds designed to fund development, liquidity, and go-to-market execution.</p>
            </GreenCard>
          </GreenCard>
        </div>
      </div>
    ),
  },
  // LG9 — Proven Traction
  {
    id: "proven-traction",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-6 max-w-3xl mx-auto relative">
        <div className="text-center space-y-3">
          <SlideTitle>Proven Traction and Revenue</SlideTitle>
          <SlideSubtitle>After three years of extensive development and beta testing, our platform has demonstrated significant organic growth and commercial viability.</SlideSubtitle>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: Users, value: "13M+", label: "Organic Visitors", desc: "Highlighting massive user interest generated since the beta launch in April 2022." },
            { icon: Landmark, value: "70,000+", label: "Enterprises Represented", desc: "Demonstrating broad adoption across the business landscape." },
            { icon: CircleDollarSign, value: "$1.3M+", label: "Beta Revenue", desc: "Proving the model's ability to generate income before the full commercial launch." },
          ].map(s => (
            <GreenCard key={s.label} className="p-6 text-center space-y-3">
              <s.icon className="w-5 h-5 text-[hsl(82,85%,55%)] mx-auto" />
              <p className="text-3xl font-extralight text-[hsl(82,85%,55%)]">{s.value}</p>
              <p className="text-sm font-medium text-foreground">{s.label}</p>
              <p className="text-[11px] font-light text-muted-foreground leading-relaxed">{s.desc}</p>
            </GreenCard>
          ))}
        </div>
        <GreenCard className="p-5 text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <span className="text-2xl font-extralight text-foreground">2,000+</span>
          </div>
          <p className="text-xs font-light text-muted-foreground">Syndication network of publisher sites where we distribute vertical content and intelligence</p>
        </GreenCard>
      </div>
    ),
  },
  // LG10 — David vs Goliath
  {
    id: "david-vs-goliath",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-6 max-w-3xl mx-auto relative">
        <div className="text-center space-y-2">
          <Swords className="w-6 h-6 text-[hsl(82,85%,55%)] mx-auto" />
          <SlideTitle>The David vs. Goliath Advantage</SlideTitle>
          <SlideSubtitle>In the race to build decentralized AI Super Intelligence, Community Matters.</SlideSubtitle>
        </div>
        <GreenCard className="p-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(82,85%,55%,0.2)]">
                <th className="py-2.5 px-3 text-left text-xs text-muted-foreground font-light">Feature</th>
                <th className="py-2.5 px-3 text-left text-xs text-[hsl(82,85%,55%)] font-medium">W3AI (Solana)</th>
                <th className="py-2.5 px-3 text-left text-xs text-muted-foreground font-light">ASI Alliance (Ethereum)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Blockchain", "High Speed. Low Cost.", "Fair Speed. High Cost."],
                ["Intelligence", "Open / Transparent.", "Open / Opaque."],
                ["AI Agents", "Low Cost. High Value.", "Higher Cost. Lower Value."],
                ["Execution", "Decentralized AI Gateway.", "AI Model Training Focus."],
                ["Model", "Open Repositories. Marketplace.", "Open Repositories. Marketplace."],
              ].map(([f, w, a]) => (
                <tr key={f} className="border-b border-border/30">
                  <td className="py-2.5 px-3 font-medium text-foreground text-xs">{f}</td>
                  <td className="py-2.5 px-3 text-[hsl(82,85%,55%)] text-xs font-light">{w}</td>
                  <td className="py-2.5 px-3 text-muted-foreground text-xs font-light">{a}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GreenCard>
        <div className="text-center">
          <SlideTitle>Authentic Connectivity Cross Chain.</SlideTitle>
        </div>
      </div>
    ),
  },
  // LG11 — Universal Intelligence Layer
  {
    id: "universal-intelligence",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-6 max-w-3xl mx-auto relative">
        <div className="text-center space-y-3">
          <SlideTitle>A Universal Intelligence Layer</SlideTitle>
          <SlideSubtitle>
            W3AI delivers curated, real-time intelligence across 45 market verticals in 45 languages, empowering data-driven decisions with 13K+ AI Agents.
          </SlideSubtitle>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {[
            { icon: Brain, label: "AI", color: "text-purple-400" },
            { icon: LayoutGrid, label: "Blockchain", color: "text-blue-400" },
            { icon: CircleDollarSign, label: "DeFi / DeFAI", color: "text-emerald-400" },
            { icon: Landmark, label: "Fintech", color: "text-amber-400" },
            { icon: Monitor, label: "Gaming", color: "text-pink-400" },
            { icon: Cpu, label: "Quantum", color: "text-cyan-400" },
            { icon: Shield, label: "Cybersecurity", color: "text-red-400" },
            { icon: Heart, label: "Healthcare", color: "text-rose-400" },
            { icon: Truck, label: "Supply Chain", color: "text-orange-400" },
            { icon: TrendingUp, label: "Venture Capital", color: "text-indigo-400" },
            { icon: Leaf, label: "ESG Analytics", color: "text-green-400" },
            { icon: Cloud, label: "SaaS", color: "text-sky-400" },
          ].map(v => (
            <GreenCard key={v.label} className="p-4 text-center space-y-2">
              <v.icon className={`w-5 h-5 ${v.color} mx-auto`} />
              <p className="text-[10px] font-medium text-foreground">{v.label}</p>
            </GreenCard>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: "45", label: "Market Verticals" },
            { value: "45", label: "Languages" },
            { value: "13K+", label: "AI Agents" },
          ].map(s => (
            <GreenCard key={s.label} className="p-4 text-center space-y-1">
              <p className="text-2xl font-extralight text-[hsl(82,85%,55%)]">{s.value}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },
  // LG12 — W3AI Opportunity
  {
    id: "w3ai-opportunity",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-6 max-w-3xl mx-auto relative">
        <div className="text-center space-y-3">
          <SlideTitle>The W3AI Opportunity</SlideTitle>
          <SlideSubtitle>
            We are at the intersection of the two most transformative technology trends: AI and Web3. W3AI is uniquely positioned to lead the decentralized intelligence revolution.
          </SlideSubtitle>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: Cpu, title: "Pioneering Technology", desc: "A cutting-edge AI intelligence network built on the high-performance Solana blockchain." },
            { icon: Users, title: "Proven Adoption", desc: "Strong market validation with 13M+ users and $1.3M+ in beta revenue." },
            { icon: Coins, title: "Robust Token Utility", desc: "The W3AI token is integral to a growing, decentralized knowledge economy with deflationary mechanics." },
          ].map(c => (
            <GreenCard key={c.title} className="p-6 space-y-3">
              <c.icon className="w-5 h-5 text-[hsl(82,85%,55%)]" />
              <h3 className="text-base font-medium text-foreground">{c.title}</h3>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">{c.desc}</p>
            </GreenCard>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { icon: Globe, title: "Massive TAM", desc: "Spanning 45 verticals, providing a universal intelligence layer for the Web3 economy." },
            { icon: CheckSquare, title: "Transparent Governance", desc: "Community-driven DAO with on-chain treasury management ensures long-term, sustainable growth." },
          ].map(c => (
            <GreenCard key={c.title} className="p-6 space-y-3">
              <c.icon className="w-5 h-5 text-[hsl(82,85%,55%)]" />
              <h3 className="text-base font-medium text-foreground">{c.title}</h3>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">{c.desc}</p>
            </GreenCard>
          ))}
        </div>
      </div>
    ),
  },
  // LG13 — Web3 + W3AI Statement
  {
    id: "web3-w3ai-statement",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full gap-8 max-w-3xl mx-auto text-center relative">
        <div className="space-y-6">
          <p className="text-2xl md:text-3xl font-light text-muted-foreground">Web3 decentralizes ownership.</p>
          <p className="text-2xl md:text-3xl font-light text-muted-foreground">W3AI decentralizes <span className="text-[hsl(82,85%,55%)]">intelligence</span>.</p>
          <SlideSubtitle>Together, we create an unstoppable force driving the future of AI-powered data intelligence.</SlideSubtitle>
        </div>
        <GreenCard className="p-6 max-w-xl text-center">
          <p className="text-sm font-light text-muted-foreground leading-relaxed">
            We are not just building AI; we are building the foundation for an entirely new <span className="text-[hsl(82,85%,55%)] font-medium">intelligence economy</span>. One where AI is not hoarded by a handful of corporations but is distributed, scalable, and accessible to all.
          </p>
        </GreenCard>
      </div>
    ),
  },
  // LG14 — CTA / Contact
  {
    id: "future-cta",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full gap-6 max-w-3xl mx-auto text-center relative">
        <div className="space-y-4">
          <SlideTitle>The Future of AI is Here</SlideTitle>
          <SlideSubtitle>The future is decentralized, autonomous, and community-driven. Join us in creating an AI-powered economy where intelligence is free, trustless, and open to all.</SlideSubtitle>
        </div>
        <div className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[hsl(82,85%,55%,0.3)] bg-[hsl(82,85%,55%,0.05)] text-foreground text-sm font-medium">
          Let's explore the future — together <ArrowRight className="w-4 h-4" />
        </div>
        <GreenCard className="p-6 space-y-3 max-w-sm">
          <h3 className="text-sm font-medium text-[hsl(82,85%,55%)]">Contact Information</h3>
          <p className="text-sm text-foreground">Bryan Feinberg / CTO W3AI</p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" /> bf@tmrw-digital.com
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Phone className="w-4 h-4" /> +1 551 574-2169
          </div>
          <div className="w-full h-px bg-border/30 mt-3" />
          <p className="text-[10px] text-muted-foreground">W3AI / TMRW — All Rights Reserved © 2026</p>
        </GreenCard>
      </div>
    ),
  },
  // 3 — Democratizing Intelligence
  {
    id: "democratizing-intelligence",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto text-center gap-2">
        <SlideTitle>Democratizing Intelligence.</SlideTitle>
        <SlideTitle>Breaking Down the Barriers of Knowledge.</SlideTitle>
      </div>
    ),
  },
  // 4 — Rise of the Machines
  {
    id: "rise",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">

        <div className="text-center">
          <SlideTitle>Rise of the Machines</SlideTitle>
          <h2 className="text-2xl md:text-3xl font-extralight text-foreground/90 mt-4">Democratizing Intelligence.</h2>
          <h2 className="text-2xl md:text-3xl font-extralight text-foreground/90 mt-1">Breaking Down the Barriers of Knowledge.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 pt-4">
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
        <div className="text-center">
          <SlideTitle>Rise of The Machines</SlideTitle>
        </div>
        <div className="relative rounded-2xl overflow-hidden">
          <img src={whitepaperHero} alt="W3AI Vision" className="w-full h-[260px] md:h-[340px] object-cover" />
          <div className="absolute inset-0 border-2 border-[hsl(82,85%,55%,0.15)] rounded-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(82,85%,55%,0.4)] via-[hsl(82,85%,55%,0.2)] to-transparent" />
        </div>
        <div className="flex justify-center gap-8 mt-2">
          <StatBlock value="740M" label="Global Crypto Owners" />
          <StatBlock value="30M" label="Active Stablecoin Addresses" />
        </div>
      </div>
    ),
  },
  // 5 — W3AI Browser Prototype
  {
    id: "browser-prototype",
    render: () => <BrowserPrototypeSlide />,
  },
  // 6 — AI Layer
  {
    id: "ai-layer",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">

        <div className="text-center"><SlideTitle>User-Selectable AI Layer</SlideTitle></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
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

        <div className="text-center"><SlideTitle>Security Intelligence</SlideTitle></div>
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

        <div className="text-center"><SlideTitle>Identity & Institutional Rails</SlideTitle></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
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

        <div className="text-center"><SlideTitle>Multi-Chain Community</SlideTitle></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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

        <div className="text-center"><SlideTitle>Multi-Chain & Validators</SlideTitle></div>
        <SlideSubtitle>
          Solana as canonical mint hub. Ethereum and BSC as spoke chains via Wormhole NTT.
        </SlideSubtitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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

        <div className="text-center"><SlideTitle>Liquidity & Market Making</SlideTitle></div>
        <BulletList items={[
          { bold: "DEX liquidity locked", text: "for no less than 12 months" },
          { bold: "LPs receive", text: "additional token rewards + 50% of MM rewards in USDC/USDT" },
          { bold: "Uniswap AMM pools", text: "on Ethereum; PancakeSwap Smart Router on BSC" },
          { bold: "CEX readiness —", text: "audited contracts, transparent tokenomics, operational reliability" },
          { bold: "G20 Group —", text: "professional multi-venue liquidity framework" },
        ]} />
        <div className="w-full h-px bg-gradient-to-r from-[hsl(82,85%,55%,0.2)] via-[hsl(82,85%,55%,0.1)] to-transparent mt-2" />
      </div>
    ),
  },
  // 15 — Marketing
  {
    id: "marketing",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full gap-4 max-w-3xl mx-auto relative text-center">

        <SlideTitle>Marketing & Distribution</SlideTitle>
        <div className="space-y-8">
          <h2 className="text-2xl sm:text-3xl font-extralight uppercase tracking-[0.15em] text-[hsl(82,85%,55%)]">OBJECTIVES</h2>
          <div className="w-16 h-px bg-[hsl(82,85%,55%,0.3)] mx-auto" />
          <div className="flex justify-center gap-12">
            <StatBlock value="25K" label="Pre-listing Registry Users" />
            <StatBlock value="3M+" label="Monthly Users (12-18 mo)" />
          </div>
          <div className="w-16 h-px bg-[hsl(82,85%,55%,0.15)] mx-auto" />
          <div className="flex justify-center gap-12">
            <StatBlock value="500K+" label="Impressions Per Day" />
            <StatBlock value="200K+" label="Engagements Per Day" />
            <StatBlock value="$50M+" label="Trading Volume" />
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

        <div className="text-center"><SlideTitle>W3AI Protocol</SlideTitle></div>
        <SlideSubtitle>
          A cross-chain coordination protocol binding AI agent permissions to on-chain wallet permissions 
          as a single security domain.
        </SlideSubtitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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
      <div className="flex flex-col items-center justify-center h-full gap-8 max-w-3xl mx-auto relative text-center">

        <SlideTitle>W3AI Tokenized Assets</SlideTitle>
        <SlideSubtitle>
          Tokenizing real-world assets across 12 Asset Classes.<br />
          Bridging traditional finance with on-chain liquidity & distribution.
        </SlideSubtitle>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {[
            "Carbon Credits", "Collectables", "Commodities", "Energy",
            "Infrastructure", "Metals", "Rare Earth", "Real Estate",
            "Sovereign Wealth", "Stablecoins", "Tax Credits", "Utilities",
          ].map(v => (
            <div key={v} className="px-6 py-6 rounded-lg border-2 border-[hsl(82,85%,55%,0.4)] bg-card text-center relative overflow-hidden hover:border-[hsl(82,85%,55%,0.7)] transition-colors">
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[hsl(82,85%,55%,0.4)] to-transparent" />
              <p className="text-sm font-medium text-foreground">{v}</p>
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

        <div className="text-center"><SlideTitle>W3AI Governance</SlideTitle></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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
      <div className="flex flex-col items-center justify-center h-full gap-8 max-w-3xl mx-auto relative text-center">

        <SlideTitle>Institutional-Grade Rails</SlideTitle>
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
      <div className="flex flex-col items-center justify-center h-full gap-8 max-w-3xl mx-auto relative text-center">

        <SlideTitle>Supported Networks</SlideTitle>
        <SlideSubtitle>Multi-chain presence across 12+ foundational blockchain ecosystems.</SlideSubtitle>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {[
            "Solana", "Ethereum", "BNB Smart Chain", "Polygon",
            "zkSync", "Avalanche", "Arbitrum", "Optimism",
            "Base", "Fantom", "Cronos", "Moonbeam",
          ].map(n => (
            <div key={n} className="px-6 py-6 rounded-lg border-2 border-[hsl(82,85%,55%,0.4)] bg-card text-center relative overflow-hidden hover:border-[hsl(82,85%,55%,0.7)] transition-colors">
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[hsl(82,85%,55%,0.4)] to-transparent" />
              <p className="text-sm font-medium text-foreground">{n}</p>
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
      <div className="flex flex-col items-center justify-center h-full gap-8 max-w-3xl mx-auto relative text-center">

        <SlideTitle>Network Partners</SlideTitle>
        <SlideSubtitle>
          Community driven partnerships covering security, identity, liquidity,
          <br />
          institutional credibility and sustainability.
        </SlideSubtitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: "0x", role: "DEX aggregation & routing" },
            { name: "Changelly", role: "Instant exchange & on-ramp" },
            { name: "CLS", role: "Market Making. Exchange Gateway." },
            { name: "Dentity", role: "Identity & anti-sybil" },
            { name: "G20 Group", role: "Liquidity & treasury" },
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

        <div className="text-center"><SlideTitle>Infrastructure</SlideTitle></div>
        <img src={infrastructureSlideBg} alt="Infrastructure visualization" className="w-full rounded-2xl object-cover max-h-[340px]" />
        <BulletList items={[
          { bold: "Network architecture —", text: "Hub-and-spoke across Solana, Ethereum, BSC with Wormhole NTT for supply management." },
          { bold: "Edge computing —", text: "Geo-redundant infrastructure for latency-sensitive AI inference routing." },
          { bold: "Security layers —", text: "HSMs, MPC key management, browser sandboxing, and isolated agent profiles." },
          { bold: "Monitoring —", text: "Validator health, bridge volumes, treasury dashboards, and public status pages." },
        ]} />
      </div>
    ),
  },
  // 23 — Cybersecurity
  {
    id: "cybersecurity",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto relative">

        <div className="text-center"><SlideTitle>Cybersecurity</SlideTitle></div>
        <SlideSubtitle>
          Security as an architectural primitive — embedded at every level from browser runtime to on-chain execution.
        </SlideSubtitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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

        <div className="text-center"><SlideTitle>Auditing & Compliance</SlideTitle></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
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

        <div className="text-center"><SlideTitle>Privacy & Risk Management</SlideTitle></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
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
        <div className="text-center"><SlideTitle>Token Utility</SlideTitle></div>
        <SlideSubtitle>Four demand drivers powering the W3AI token economy.</SlideSubtitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
        <div className="text-center space-y-2">
          <SlideTitle>Tokenomics & Supply</SlideTitle>
          <p className="text-sm text-muted-foreground">
            <span className="text-2xl font-extralight text-[hsl(82,85%,55%)]">2B</span>
            <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground ml-2">Total Supply</span>
          </p>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-[hsl(82,85%,55%,0.2)] via-[hsl(82,85%,55%,0.08)] to-transparent" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
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
  // GitHub
  {
    id: "github",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-5xl mx-auto relative px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left — GitHub Logo */}
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg" className="w-44 h-44 sm:w-52 sm:h-52 text-foreground fill-current">
              <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
            </svg>
          </div>
          {/* Right — QR Code */}
          <div className="flex flex-col items-center gap-6">
            <GreenCard className="p-6 inline-flex flex-col items-center gap-4">
              <SectionLabel>Scan to Visit</SectionLabel>
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https%3A%2F%2Fgithub.com%2FPlatoDataNetwork&bgcolor=0a0a0a&color=b8e636&format=svg"
                alt="QR code to GitHub"
                className="w-44 h-44 sm:w-52 sm:h-52 rounded-lg"
              />
              <p className="text-xs font-light text-muted-foreground tracking-wide">github.com/PlatoDataNetwork</p>
            </GreenCard>
          </div>
        </div>
        <div className="text-center">
          <SlideTitle>Open Source</SlideTitle>
          <p className="text-sm font-light text-muted-foreground mt-2">Explore our repositories, contribute, and build with W3AI.</p>
        </div>
      </div>
    ),
  },
  // Translational Indexing & Delivery
  {
    id: "translational-indexing",
    render: () => (
      <div className="flex flex-col justify-center h-full gap-8 max-w-3xl mx-auto text-center px-4">
        <SlideTitle>Translational Indexing &amp; Delivery</SlideTitle>
        <SlideSubtitle>
          Real-time multilingual content processing, indexing, and delivery across 45+ languages — powered by AI translation pipelines.
        </SlideSubtitle>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <GreenCard>
            <Globe className="w-6 h-6 text-[hsl(82,85%,55%)] mx-auto" />
            <h3 className="text-sm font-medium text-foreground">45+ Languages</h3>
            <p className="text-xs font-light text-muted-foreground">Automated translation and localization at scale.</p>
          </GreenCard>
          <GreenCard>
            <Database className="w-6 h-6 text-[hsl(82,85%,55%)] mx-auto" />
            <h3 className="text-sm font-medium text-foreground">Semantic Indexing</h3>
            <p className="text-xs font-light text-muted-foreground">AI-driven content classification and cross-lingual search.</p>
          </GreenCard>
          <GreenCard>
            <Zap className="w-6 h-6 text-[hsl(82,85%,55%)] mx-auto" />
            <h3 className="text-sm font-medium text-foreground">Edge Delivery</h3>
            <p className="text-xs font-light text-muted-foreground">Low-latency content distribution via global CDN nodes.</p>
          </GreenCard>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
          <StatBlock value="45+" label="Languages" />
          <StatBlock value="<50ms" label="Latency" />
          <StatBlock value="99.9%" label="Uptime" />
          <StatBlock value="100M+" label="Pages Indexed" />
        </div>
      </div>
    ),
  },
  // Closing
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
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [hasNavigated, setHasNavigated] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const total = slides.length;

  const next = useCallback(() => { setHasNavigated(true); setDirection('right'); setCurrent(c => Math.min(c + 1, total - 1)); }, [total]);
  const prev = useCallback(() => { setHasNavigated(true); setDirection('left'); setCurrent(c => Math.max(c - 1, 0)); }, []);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    thumbRefs.current[current]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [current]);

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
      "relative w-full bg-background border-x border-t border-border rounded-t-2xl overflow-hidden transition-all duration-300",
      fullscreen ? "fixed inset-0 z-[80] rounded-none border-none flex flex-col" : "min-h-[400px] sm:min-h-[500px] flex flex-col"
    )}>
      {/* Slide branding */}
      <SlideBranding />
      {/* Slide content */}
       <div key={current} className={cn(
         "p-6 sm:p-8 md:p-16 flex flex-col",
         fullscreen ? "flex-1" : "flex-1",
         hasNavigated ? (direction === 'right' ? "animate-slide-in-right" : "animate-slide-in-left") : ""
       )}>
         {slides[current].render()}
       </div>

      {/* Bottom controls */}
      <div className="flex items-center justify-between px-6 py-4">
        <button onClick={prev} disabled={current === 0}
          className="h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-[hsl(82,85%,55%)] hover:border-[hsl(82,85%,55%,0.3)] disabled:opacity-30 transition-all">
          <ChevronLeft className="h-4 w-4" />
        </button>
        {!fullscreen && (
          <span className="text-xs font-light text-muted-foreground tracking-wider ml-8">
            {current + 1} / {total}
          </span>
        )}
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

    </div>
  );

  // Thumbnail strip — scaled mini slide previews
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
              ? "border-[hsl(82,85%,55%)] shadow-[0_0_12px_hsl(82,85%,55%,0.3)] ring-1 ring-[hsl(82,85%,55%)]"
              : "border-border opacity-60 hover:opacity-100 hover:border-[hsl(82,85%,55%,0.3)]"
          )}
        >
          {/* Scaled slide preview */}
          <div className="absolute inset-0 origin-top-left pointer-events-none" style={{ width: 1280, height: 720, transform: `scale(${160 / 1280})` }}>
            <div className="w-full h-full bg-background p-6 sm:p-8 md:p-16 flex flex-col">
              {s.render()}
            </div>
          </div>
          {/* Slide name + number overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-1.5 pb-1 pt-3">
            <span className={cn(
              "text-[7px] font-medium uppercase tracking-wider leading-tight block truncate",
              i === current ? "text-[hsl(82,85%,55%)]" : "text-white/60"
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
      <SEOHead title="W3AI Deck" description="W3AI investor deck — Web3 AI infrastructure, token ecosystem, and real-world asset tokenization platform." path="/deck" />
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
