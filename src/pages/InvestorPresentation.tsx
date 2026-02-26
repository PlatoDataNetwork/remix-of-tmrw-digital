import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, Globe, Cpu, Coins, BarChart3, Users, Layers, Zap, Target, Building2, Leaf, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import stockExchangeImg from "@/assets/stock-exchange.png";
import lotusFlowerImg from "@/assets/lotus-flower.jpeg";

const stats = [
  { value: "$200B+", label: "Web3/AI Market by 2030" },
  { value: "13M+", label: "Organic Platform Visitors" },
  { value: "Q2 2026", label: "Targeted TSX Listing" },
];

const pillars = [
  { icon: Building2, title: "Capital Markets", desc: "Public market strategy engineered for institutional access and global cross-listing expansion." },
  { icon: Leaf, title: "RWA Tokenization", desc: "Digitizing real-world assets into liquid, tradable instruments on institutional-grade infrastructure." },
  { icon: Cpu, title: "Web3 / AI Tech Stack", desc: "Decentralized intelligence tools bridging blockchain architecture with autonomous AI systems." },
  { icon: Coins, title: "Token Economy", desc: "Dual-asset programmable value layer powering carbon, compute, and cross-border commerce." },
  { icon: Globe, title: "Global Footprint", desc: "Multi-jurisdictional presence spanning key financial hubs and emerging digital asset markets." },
  { icon: Users, title: "Community Driven", desc: "Decentralized governance and grassroots engagement fueling organic growth and network effects." },
];

const carbonAssets = [
  "500,000 tonnes ISO-certified credits",
  "Valued at ~$5M USD",
  "Option for 2.3M additional tonnes",
  "300M+ CUT tokens in treasury",
];

const carbonTech = [
  "Blockchain verification system",
  "Retire App for token burning",
  "Immutable audit trails",
  "Smart contract automation",
];

const carbonMarket = [
  "FMA regulated (Liechtenstein)",
  "6M+ kg carbon offsets retired",
  "Enterprise partnerships active",
  "$50B market by 2030",
];

const web3Assets = [
  "Proprietary tokenization engine for multi-asset classes",
  "Real-world asset (RWA) infrastructure and digital twins",
  "AI-powered data analytics and predictive intelligence",
  "Enterprise-grade publishing and content syndication platform",
  "Regulatory compliance and KYC/AML automation framework",
];

const web3Tech = [
  "Full-stack blockchain development toolkit and dev tools",
  "AI/ML model integration for on-chain and off-chain data",
  "Modular UI/UX design system for decentralized applications",
  "Cross-chain interoperability and smart contract orchestration",
  "Automated compliance protocols and audit-trail technology",
];

const web3Market = [
  "Scalable tokenization across commodities, carbon, and real estate",
  "Innovation lab driving next-gen DeFi and RWA product R&D",
  "Global syndication network spanning 160+ countries",
  "Data-driven decision engine with real-time analytics dashboards",
  "End-to-end platform from asset origination to secondary trading",
];

const metrics = [
  { value: "13M+", label: "Organic Visitors", sub: "Across 160+ countries" },
  { value: "70,000+", label: "Enterprises", sub: "Active platform users" },
  { value: "$1.4M", label: "Revenue", sub: "Via Plato platform" },
  { value: "35", label: "Languages", sub: "Global multilingual support" },
];

const assetValues = [
  { value: "$5M", label: "Carbon Credits", sub: "500K tonnes ISO-certified" },
  { value: "$5M", label: "IP & Infrastructure", sub: "Plato technology assets" },
  { value: "300M+", label: "CUT Tokens", sub: "Corporate treasury holdings" },
  { value: "Zero Debt", label: "Financial Position", sub: "Insured and audited" },
];

const roadmap = [
  { phase: "Q4 2025", title: "Transaction Close", desc: "Complete consolidation of CUT and Plato AI, establish unified management structure", tags: ["Legal Structure", "Asset Transfer", "Team Integration"] },
  { phase: "Q2 2026", title: "RTO & TSX Listing", desc: "Execute reverse takeover, list Tomorrow Digital on TSX Venture Exchange", tags: ["RTO Completion", "Public Listing", "TMRW Symbol"] },
  { phase: "Q3-Q4 2026", title: "Platform Expansion", desc: "Scale Web3 browser adoption, expand carbon credit partnerships, launch AI services", tags: ["User Acquisition", "Enterprise Sales", "Product Launch"] },
  { phase: "2027+", title: "Global Scale", desc: "International expansion, strategic partnerships, potential TSX graduation", tags: ["Global Reach", "M&A Opportunities", "Market Leadership"] },
];

const whyAcquisition = [
  { icon: Layers, title: "Deep Data Integration", desc: "AI OS requires full-funnel data access, far easier within single entity." },
  { icon: Lock, title: "Control of Rails & Token", desc: "Stablecoin and token are core financial infrastructure requiring group-level governance." },
  { icon: Target, title: "Aligned Roadmap & Incentives", desc: "One cap table, unified product roadmap, consistent capital markets story." },
  { icon: Zap, title: "IP Ownership", desc: "AI models, risk engines, smart contracts live on Btab balance sheet." },
  { icon: Building2, title: "Capital Markets Story", desc: "Public market investors can clearly understand and price a unified, integrated platform." },
];

const team = [
  { name: "Justin Hartzman", role: "Chairman", bio: "Co-founded CoinSmart, led to public listing and sale to WonderFi (recently acquired by Robinhood). Board director at WonderFi. Over a decade scaling fintech companies." },
  { name: "Paul Thomson", role: "CEO", bio: "Founder of Carbon Distributed Technologies. Independent Director at eXeBlock Technology. Former CCO at Numus Capital. Deep expertise in corporate governance." },
  { name: "Bryan Feinberg", role: "COO / CTO", bio: "CEO of Zephyr Technology Ventures and Plato AI. Licensed Investment Banker. Led startup from zero to $130M revenue and TASE public listing." },
  { name: "Zach Goldenberg", role: "Advisor", bio: "Principal of Liberty Venture Partners. Corporate-securities lawyer. ICD.D designation, TSXV Advisory Committee member." },
];

const SectionTitle = ({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) => (
  <div className="mb-12">
    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">{label}</p>
    <h2 className="text-2xl md:text-4xl font-light text-foreground mb-4">{title}</h2>
    {subtitle && <p className="text-base text-muted-foreground max-w-2xl font-light">{subtitle}</p>}
  </div>
);

const InvestorPresentation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const access = sessionStorage.getItem("investor_access");
    if (!access) {
      navigate("/investors", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "colorful");
    root.classList.add("colorful");
    return () => {
      root.classList.remove("dark", "colorful");
      root.classList.add("colorful");
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20">

      {/* Hero */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[hsl(var(--primary)/0.03)] blur-[150px]" />
        </div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold animated-gradient-text mb-2">
              Tomorrow Digital RTO
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-4 font-light">
              Consolidating Carbon Distributed Technologies and Plato AI into a
              <br />diversified Web3 / AI Infrastructure and Digital Asset Company.
            </p>
          </motion.div>
          <div className="animated-gradient-cool-bg rounded-2xl overflow-hidden max-w-3xl mx-auto mb-12">
            <img src={lotusFlowerImg} alt="Colorful lotus flower" className="w-full h-auto object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                <p className="text-2xl md:text-3xl font-semibold animated-gradient-text">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capital Market Strategy */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Strategy</p>
          <h2 className="text-2xl md:text-4xl font-light text-foreground mb-4">Capital Market Strategy</h2>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto font-light">We are in the process of listing on the Canadian public market via a Reverse Takeover in Q2 / 2026.</p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto font-light mb-10">Our plan is to cross list one year after listing.</p>
          <div className="animated-gradient-capital-bg rounded-2xl overflow-hidden max-w-3xl mx-auto">
            <img src={stockExchangeImg} alt="Stock exchange trading floor" className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* Challenge & Opportunity */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle label="Overview" title="The Challenge & Opportunity" subtitle="The convergence of Web3 infrastructure, AI innovation, and sustainable carbon solutions." />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-lg font-medium text-foreground mb-4">The Challenge</h3>
              <ul className="space-y-3 text-sm text-muted-foreground font-light">
                {["Fragmented Web3 infrastructure across platforms", "Lack of transparent carbon credit verification", "Limited enterprise adoption of blockchain solutions", "Regulatory uncertainty in digital assets"].map(t => (
                  <li key={t} className="flex items-start gap-2"><span className="text-muted-foreground/50 mt-0.5">•</span>{t}</li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-lg font-medium text-foreground mb-4">The Opportunity</h3>
              <ul className="space-y-3 text-sm text-muted-foreground font-light">
                {["$200B+ Web3/AI market projected by 2030", "$50B+ voluntary carbon market by 2030", "Blockchain-verified carbon credit infrastructure", "Public market access via TSX listing Q1 2026"].map(t => (
                  <li key={t} className="flex items-start gap-2"><span className="animated-gradient-text">•</span>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-16 lg:py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle label="Diversified yet Interconnected Revenue Streams" title="Six Integrated Pillars" subtitle="Powering TMRW's Web3 AI Ecosystem." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pillars.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-foreground/20 transition-all">
                <p.icon className="h-6 w-6 text-foreground mb-4" />
                <h3 className="text-base font-medium text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground font-light">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Carbon Credits */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle label="Carbon Distributed Technologies AG" title="Carbon Credits Infrastructure" subtitle="Transparent, blockchain-verified carbon offsetting solutions powering enterprise ESG compliance." />
          <div className="grid md:grid-cols-3 gap-6">
            {[{ title: "Asset Base", items: carbonAssets }, { title: "Technology", items: carbonTech }, { title: "Market Position", items: carbonMarket }].map(col => (
              <div key={col.title} className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-base font-medium text-foreground mb-4">{col.title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground font-light">
                  {col.items.map(item => <li key={item} className="flex items-start gap-2"><span className="text-muted-foreground/50 mt-0.5">•</span>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Web3 AI Platform */}
      <section className="py-16 lg:py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle label="Plato Technologies Inc." title="Web3 AI Infrastructure" subtitle="Proprietary blockchain development stack powering tokenization, data analytics, AI, compliance, and global syndication." />
          <div className="grid md:grid-cols-3 gap-6">
            {[{ title: "Asset Base", items: web3Assets }, { title: "Technology", items: web3Tech }, { title: "Market Position", items: web3Market }].map(col => (
              <div key={col.title} className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-base font-medium text-foreground mb-4">{col.title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground font-light">
                  {col.items.map(item => <li key={item} className="flex items-start gap-2"><span className="animated-gradient-text">•</span>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Traction */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle label="Traction" title="Market Traction & Metrics" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map(m => (
              <div key={m.label} className="bg-card border border-border rounded-2xl p-6 text-center">
                <p className="text-2xl font-semibold animated-gradient-text mb-1">{m.value}</p>
                <p className="text-sm font-medium text-foreground">{m.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{m.sub}</p>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {assetValues.map(a => (
              <div key={a.label} className="bg-card border border-border rounded-2xl p-6 text-center">
                <p className="text-2xl font-semibold text-foreground mb-1">{a.value}</p>
                <p className="text-sm font-medium text-foreground">{a.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{a.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Token Architecture */}
      <section className="py-16 lg:py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle label="Tokens" title="Token Architecture" subtitle="Dual-token ecosystem: CUT (carbon credits) + Plato (Web3 AI utility)" />
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-lg font-medium text-foreground mb-1">CUT Token</h3>
              <p className="text-sm text-muted-foreground mb-4 font-light">Carbon offset utility token</p>
              <ul className="space-y-2 text-sm text-muted-foreground font-light">
                {["Represents certified carbon offsets", "Blockchain-verified retirement", "300M+ tokens in treasury", "Last private sale: $0.10 USD", "Enterprise ESG compliance tool"].map(t => (
                  <li key={t} className="flex items-start gap-2"><span className="text-muted-foreground/50 mt-0.5">•</span>{t}</li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-lg font-medium text-foreground mb-1">Plato Token</h3>
              <p className="text-sm text-muted-foreground mb-4 font-light">Web3 AI network utility</p>
              <ul className="space-y-2 text-sm text-muted-foreground font-light">
                {["Powers Plato Web3 Browser", "SecureStake staking rewards", "AI compute network incentives", "Solana ecosystem integration", "Platform transaction settlements"].map(t => (
                  <li key={t} className="flex items-start gap-2"><span className="animated-gradient-text">•</span>{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[{ label: "Carbon", desc: "Transaction fees & enterprise solutions" }, { label: "Platform", desc: "Licensing & white-label development" }, { label: "Tokens", desc: "Distribution & staking services" }].map(r => (
              <div key={r.label} className="text-center">
                <p className="text-sm font-medium text-foreground">{r.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offering */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle label="Offering" title="Current Offering" />
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[{ value: "$6M CAD", label: "Pre-Money Valuation" }, { value: "$0.15 CAD", label: "Share Price" }, { value: "16.66%", label: "Available to Investors" }].map(o => (
              <div key={o.label} className="text-center bg-card border border-border rounded-2xl p-6">
                <p className="text-xl md:text-2xl font-semibold animated-gradient-text">{o.value}</p>
                <p className="text-xs text-muted-foreground mt-2">{o.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 lg:py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle label="Roadmap" title="Roadmap to TSX Listing" subtitle="Strategic path from consolidation to public market debut Q1 2026." />
          <div className="space-y-6">
            {roadmap.map((r, i) => (
              <motion.div key={r.phase} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 flex flex-col sm:flex-row gap-4">
                <div className="sm:w-32 shrink-0">
                  <p className="text-sm font-semibold animated-gradient-text">{r.phase}</p>
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground mb-1">{r.title}</h3>
                  <p className="text-sm text-muted-foreground font-light mb-3">{r.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {r.tags.map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Acquisition */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle label="Strategy" title="Why Acquisition, Not Partnership" subtitle="Five compelling reasons for full integration vs. strategic partnership" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyAcquisition.map((w, i) => (
              <motion.div key={w.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-foreground/20 transition-all">
                <w.icon className="h-5 w-5 text-foreground mb-3" />
                <h3 className="text-base font-medium text-foreground mb-2">{w.title}</h3>
                <p className="text-sm text-muted-foreground font-light">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle label="Leadership" title="Leadership Team" subtitle="Experienced executives with proven track record in fintech, AI, and public markets" />
          <div className="grid sm:grid-cols-2 gap-6">
            {team.map(t => (
              <div key={t.name} className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-base font-medium text-foreground">{t.name}</h3>
                <p className="text-sm animated-gradient-text font-medium mb-3">{t.role}</p>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-light text-foreground mb-4">
            Join the Web3 AI <span className="font-semibold animated-gradient-text">Revolution</span>
          </h2>
          <p className="text-base text-muted-foreground mb-10 font-light">
            Be part of building the infrastructure for tomorrow's decentralized, intelligent internet.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { step: "1", title: "Pre-Money Valuation: $6M CAD", sub: "Up to 16.66% available to investors" },
              { step: "2", title: "Share Price: $0.15 CAD", sub: "40M shares authorized, founders 9-month lockup" },
              { step: "3", title: "TSX Listing Q1 2026", sub: "Symbol: TMRW on TSX Venture Exchange" },
              { step: "4", title: "Plato Allocation Available", sub: "Strategic token allocation for investors" },
            ].map(c => (
              <div key={c.step} className="bg-card border border-border rounded-2xl p-5 text-left">
                <span className="text-xs font-semibold animated-gradient-text">{c.step}</span>
                <h3 className="text-sm font-medium text-foreground mt-2 mb-1">{c.title}</h3>
                <p className="text-xs text-muted-foreground font-light">{c.sub}</p>
              </div>
            ))}
          </div>
          <a
            href="/#contact"
            className="inline-flex h-12 px-8 items-center justify-center rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} The Tomorrow Company. Confidential — For Accredited Investors Only.</p>
      </div>
      </div>
    </div>
  );
};

export default InvestorPresentation;
