const { useState, useEffect } = React;

// --- Inline SVG icon components (replacing lucide-react) ---
const icons = {
  Globe: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
  Search: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  LayoutGrid: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>,
  Shield: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>,
  Bot: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>,
  Zap: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>,
  Layers: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/></svg>,
  Settings: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  Network: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>,
  ArrowLeftRight: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>,
  Brain: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>,
  Wallet: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>,
  Lock: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Coins: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>,
  Code: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  CircleDollarSign: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>,
  Landmark: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>,
};

const cn = (...classes) => classes.filter(Boolean).join(' ');

// --- Data ---
const browserSections = [
  { id: "welcome", icon: "Globe", label: "Browser", title: "Welcome to W3AI.", subtitle: "Your agentic Web3 AI browser built for the next web.\nSecure. Intelligent. Decentralized.", cta: "Launch Browser", gradient: "from-[hsl(270,60%,25%)] via-[hsl(290,50%,30%)] to-[hsl(310,60%,35%)]", accentHsl: "hsl(290,70%,60%)", heroIcon: "Globe" },
  { id: "search", icon: "Search", label: "Search", title: "Search.", subtitle: "Context-aware, privacy-first search\nacross Web2 and Web3.", cta: "Search", gradient: "from-[hsl(170,40%,15%)] via-[hsl(180,50%,20%)] to-[hsl(190,45%,25%)]", accentHsl: "hsl(180,60%,45%)", heroIcon: "Search" },
  { id: "applications", icon: "LayoutGrid", label: "Applications", title: "Applications.", subtitle: "Decentralized apps, DeFi protocols,\nand Web3 tools — all in one place.", cta: "Browse Apps", gradient: "from-[hsl(280,50%,22%)] via-[hsl(300,55%,28%)] to-[hsl(320,50%,32%)]", accentHsl: "hsl(300,65%,58%)", heroIcon: "LayoutGrid" },
  { id: "security", icon: "Shield", label: "Security", title: "Security.", subtitle: "Transaction simulation, smart\ncontract audits and verified proofs.", cta: "Scan", gradient: "from-[hsl(340,50%,30%)] via-[hsl(330,60%,35%)] to-[hsl(320,50%,40%)]", accentHsl: "hsl(340,70%,60%)", heroIcon: "Shield" },
  { id: "ai", icon: "Bot", label: "AI Agent", title: "Marvin AI.", subtitle: "Meet your on-device AI copilot. BYOK\nor Open Gateway — you choose.", cta: "Ask Marvin", gradient: "from-[hsl(140,40%,15%)] via-[hsl(150,50%,20%)] to-[hsl(160,40%,25%)]", accentHsl: "hsl(150,60%,50%)", heroIcon: "Bot" },
  { id: "performance", icon: "Zap", label: "Performance", title: "Performance.", subtitle: "Gecko Engine. Optimized for speed,\nprivacy and security.", cta: "View Tasks", gradient: "from-[hsl(15,60%,20%)] via-[hsl(20,70%,28%)] to-[hsl(25,60%,32%)]", accentHsl: "hsl(25,80%,55%)", heroIcon: "Zap" },
  { id: "layers", icon: "Layers", label: "Layers", title: "Multi-Chain.", subtitle: "Seamless cross-chain execution.\nWormhole NTT bridging.", cta: "Switch Chain", gradient: "from-[hsl(45,50%,18%)] via-[hsl(40,60%,22%)] to-[hsl(35,55%,28%)]", accentHsl: "hsl(45,70%,55%)", heroIcon: "Layers" },
  { id: "settings", icon: "Settings", label: "Settings", title: "Settings.", subtitle: "Full control. Privacy levels,\nAI preferences and chain defaults.", cta: "Configure", gradient: "from-[hsl(0,0%,12%)] via-[hsl(0,0%,16%)] to-[hsl(0,0%,20%)]", accentHsl: "hsl(0,0%,60%)", heroIcon: "Settings" },
];

const toolbarSections = [
  { icon: "Network", label: "Protocol", title: "Protocol Layer.", subtitle: "Decentralized infrastructure layer\npowering secure verifiable transactions.", gradient: "from-[hsl(200,50%,18%)] via-[hsl(210,55%,24%)] to-[hsl(220,50%,30%)]", accentHsl: "hsl(210,65%,55%)" },
  { icon: "ArrowLeftRight", label: "Swap", title: "Swap.", subtitle: "Instant cross-chain token swaps\nwith best-rate aggregation.", gradient: "from-[hsl(260,45%,20%)] via-[hsl(270,50%,26%)] to-[hsl(280,45%,32%)]", accentHsl: "hsl(270,60%,58%)" },
  { icon: "Brain", label: "Intelligence", title: "Intelligence.", subtitle: "AI-powered market analysis\nand predictive portfolio insights.", gradient: "from-[hsl(190,45%,15%)] via-[hsl(200,50%,20%)] to-[hsl(210,45%,26%)]", accentHsl: "hsl(200,60%,50%)" },
  { icon: "Wallet", label: "Wallet", title: "Wallet.", subtitle: "Multi-chain wallet management\nwith hardware security support.", gradient: "from-[hsl(30,50%,18%)] via-[hsl(35,55%,24%)] to-[hsl(40,50%,30%)]", accentHsl: "hsl(35,65%,55%)" },
  { icon: "Lock", label: "Identity", title: "Identity.", subtitle: "Self-sovereign identity verification\nand decentralized credentials.", gradient: "from-[hsl(350,40%,18%)] via-[hsl(355,50%,24%)] to-[hsl(0,45%,30%)]", accentHsl: "hsl(355,55%,55%)" },
  { icon: "Coins", label: "Staking", title: "Staking.", subtitle: "Liquid staking and yield optimization\nacross multiple validators.", gradient: "from-[hsl(120,35%,14%)] via-[hsl(130,40%,19%)] to-[hsl(140,35%,24%)]", accentHsl: "hsl(130,50%,45%)" },
  { icon: "Code", label: "Code", title: "Code.", subtitle: "Integrated smart contract IDE\nwith AI-assisted debugging.", gradient: "from-[hsl(60,30%,14%)] via-[hsl(65,35%,18%)] to-[hsl(70,30%,22%)]", accentHsl: "hsl(65,50%,50%)" },
  { icon: "CircleDollarSign", label: "DeFi", title: "DeFi.", subtitle: "Lending, borrowing, and liquidity\nprotocols in one dashboard.", gradient: "from-[hsl(80,40%,14%)] via-[hsl(82,50%,18%)] to-[hsl(85,45%,24%)]", accentHsl: "hsl(82,60%,50%)" },
  { icon: "Landmark", label: "RWA", title: "Real World Assets.", subtitle: "Tokenized real-world assets\nwith institutional-grade compliance.", gradient: "from-[hsl(160,40%,14%)] via-[hsl(165,50%,19%)] to-[hsl(170,45%,25%)]", accentHsl: "hsl(165,55%,45%)" },
];

const APPLE_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'%3E%3Cpath d='M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z'/%3E%3C/svg%3E";

function BrowserPrototype() {
  const [activeSection, setActiveSection] = useState(0);
  const [activeToolbar, setActiveToolbar] = useState(null);

  const section = browserSections[activeSection];
  const isToolbarActive = activeToolbar !== null;
  const displayGradient = isToolbarActive ? toolbarSections[activeToolbar].gradient : section.gradient;
  const displayAccent = isToolbarActive ? toolbarSections[activeToolbar].accentHsl : section.accentHsl;
  const displayTitle = isToolbarActive ? toolbarSections[activeToolbar].title : null;
  const displaySubtitle = isToolbarActive ? toolbarSections[activeToolbar].subtitle : null;
  const heroIconName = isToolbarActive ? toolbarSections[activeToolbar].icon : section.heroIcon;
  const HeroIcon = icons[heroIconName];

  const handleSidebarClick = (i) => { setActiveSection(i); setActiveToolbar(null); };
  const handleToolbarClick = (i) => { setActiveToolbar(i === activeToolbar ? null : i); };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen relative px-2 sm:px-4">
      <div className="relative w-full max-w-5xl" style={{ height: '80vh', maxHeight: '900px' }}>
        <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_8px_60px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)]">
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
                const TIcon = icons[t.icon];
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

          <div className="relative z-10 flex" style={{ minHeight: 420, height: 'calc(100% - 40px)' }}>
            {/* Sidebar */}
            <div className="flex flex-col items-center py-4 px-2 gap-1 bg-black/20 backdrop-blur-md border-r border-white/5 w-14 shrink-0 rounded-bl-[2.5rem] z-20 relative">
              {browserSections.map((s, i) => {
                const Icon = icons[s.icon];
                const isActive = i === activeSection && !isToolbarActive;
                return (
                  <div key={s.id} className="relative group">
                    <button onClick={() => handleSidebarClick(i)} className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300", isActive ? "bg-white/15 shadow-lg" : "hover:bg-white/[0.08]")} style={isActive ? { boxShadow: `0 0 20px ${section.accentHsl.replace(")", ",0.3)")}` } : {}}>
                      <Icon className={cn("w-4 h-4 transition-all duration-300", isActive ? "text-white" : "text-white/40 group-hover:text-white/70")} />
                    </button>
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-black/80 text-[9px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">{s.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-8 pb-16 relative -ml-8 md:-ml-16">
              {/* Glass hexagon icon */}
              <div className="mb-6 relative transition-all duration-500">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 -z-10 blur-3xl rounded-full transition-all duration-700" style={{ background: displayAccent, opacity: 0.35 }} />
                <svg viewBox="0 0 200 200" className="w-20 h-20 md:w-24 md:h-24 transition-all duration-500" style={{ filter: `drop-shadow(0 8px 30px ${displayAccent.replace(")", ",0.4)")}) drop-shadow(0 2px 8px rgba(0,0,0,0.5))` }}>
                  <defs>
                    <linearGradient id="glass-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={displayAccent.replace(")", ",0.7)")} />
                      <stop offset="50%" stopColor={displayAccent.replace(")", ",0.4)")} />
                      <stop offset="100%" stopColor={displayAccent.replace(")", ",0.65)")} />
                    </linearGradient>
                    <linearGradient id="glass-border" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                      <stop offset="50%" stopColor={displayAccent.replace(")", ",0.3)")} />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
                    </linearGradient>
                    <radialGradient id="glass-shine" cx="50%" cy="25%" r="50%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </radialGradient>
                  </defs>
                  <path d="M100 8 C108 8, 115 12, 170 45 C180 51, 184 58, 184 72 L184 128 C184 142, 180 149, 170 155 L108 192 C102 196, 98 196, 92 192 L30 155 C20 149, 16 142, 16 128 L16 72 C16 58, 20 51, 30 45 Z" fill="url(#glass-border)" />
                  <path d="M100 16 C106 16, 112 19, 164 50 C172 55, 176 60, 176 72 L176 128 C176 140, 172 145, 164 150 L106 184 C102 187, 98 187, 94 184 L36 150 C28 145, 24 140, 24 128 L24 72 C24 60, 28 55, 36 50 Z" fill="url(#glass-bg)" />
                  <ellipse cx="100" cy="60" rx="55" ry="35" fill="url(#glass-shine)" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <HeroIcon className="w-8 h-8 md:w-10 md:h-10 text-white transition-all duration-500" strokeWidth={1.5} style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.4))" }} />
                </div>
              </div>

              {/* Hero copy */}
              {!isToolbarActive ? (
                <>
                  {activeSection === 0 ? (
                    <>
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
                        <div className="h-3.5 w-3.5 md:h-4 md:w-4 animated-gradient-icon-bright" style={{
                          WebkitMaskImage: `url("${APPLE_SVG}")`, WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center",
                          maskImage: `url("${APPLE_SVG}")`, maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center",
                        }} />
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-xl md:text-3xl font-light text-white tracking-tight text-center transition-all duration-500">
                        {section.title}
                      </p>
                      <p className="text-xl md:text-3xl font-light text-white/45 tracking-tight mt-2 text-center max-w-lg transition-all duration-500 whitespace-pre-line leading-snug">
                        {section.subtitle}
                      </p>
                    </>
                  )}
                </>
              ) : (
                <>
                  <p className="text-xl md:text-3xl font-light text-white tracking-tight text-center transition-all duration-500">
                    {displayTitle}
                  </p>
                  <p className="text-xl md:text-3xl font-light text-white/45 tracking-tight mt-2 text-center max-w-2xl transition-all duration-500 whitespace-pre-line leading-snug">
                    {displaySubtitle}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Glowing branded circle */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center" style={{
            background: `linear-gradient(160deg, ${displayAccent.replace(")", ",0.12)")}, ${displayAccent.replace(")", ",0.06)")})`,
            border: `1.5px solid rgba(255,255,255,0.5)`,
            boxShadow: `0 0 15px rgba(255,255,255,0.25), 0 0 40px rgba(255,255,255,0.1), 0 0 60px ${displayAccent.replace(")", ",0.2)")}`,
            backdropFilter: "blur(12px)", transition: "all 0.5s ease",
          }}>
            <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 animated-gradient-icon-bright" style={{
              WebkitMaskImage: 'url("plato-icon.webp")',
              WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center",
              maskImage: 'url("plato-icon.webp")',
              maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center",
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(BrowserPrototype)
);
