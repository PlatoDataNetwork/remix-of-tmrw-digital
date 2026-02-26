import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, Globe, Cpu, Coins, BarChart3, Users, Layers, Zap, Target, Building2, Leaf, Lock, Shield, Briefcase } from "lucide-react";
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
  "500,000 tonnes of ISO-certified carbon credits secured and verified on-chain.",
  "Portfolio valued at approximately $5M USD with full blockchain transparency.",
  "Option to acquire 2.3M additional tonnes, expanding capacity significantly.",
  "300M+ CUT tokens held in corporate treasury for ecosystem development.",
];

const carbonTech = [
  "Blockchain-based verification system ensuring tamper-proof audit trails.",
  "Retire App enables permanent token burning for certified carbon offsets.",
  "Immutable on-chain records providing full lifecycle transparency and trust.",
  "Smart contract automation streamlining issuance, trading, and retirement.",
];

const carbonMarket = [
  "FMA regulated under Liechtenstein financial authority for EU compliance.",
  "Over 6M kg of carbon offsets permanently retired across global markets.",
  "Active enterprise partnerships driving recurring institutional demand.",
  "Targeting a $50B voluntary carbon market projected by 2030.",
];

const web3Assets = [
  "Proprietary tokenization engine supporting multi-asset classes at scale.",
  "Real-world asset infrastructure with digital twin capabilities built in.",
  "AI-powered data analytics delivering predictive intelligence and insights.",
  "Enterprise publishing and syndication platform for global content distribution.",
];

const web3Tech = [
  "Full-stack blockchain development toolkit with integrated dev tools.",
  "AI and ML model integration bridging on-chain and off-chain data layers.",
  "Modular UI/UX design system purpose-built for decentralized applications.",
  "Cross-chain interoperability with smart contract orchestration protocols.",
];

const web3Market = [
  "Scalable tokenization spanning commodities, carbon credits, and real estate.",
  "Innovation lab driving next-generation DeFi and RWA product development.",
  "Global syndication network with active reach across 160+ countries.",
  "End-to-end platform from asset origination through to secondary trading.",
];

const metrics = [
  { value: "13M+", label: "Organic Visitors", sub: "Across 160+ countries" },
  { value: "70,000+", label: "Enterprises", sub: "Active platform users" },
  { value: "$2.4M", label: "Beta Revenue", sub: "Combined Entities" },
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
  { icon: Globe, title: "Global Scalability", desc: "Unified entity accelerates international expansion, regulatory approvals, and cross-border operations." },
];

const team = [
  { name: "Justin Hartzman", role: "Chairman", bio: "Serial entrepreneur and capital markets veteran. Co-founded CoinSmart, leading it to a public listing and subsequent sale to WonderFi, recently acquired by Robinhood. Board director at WonderFi. Over a decade of experience scaling fintech companies and executing successful go-public strategies across North America." },
  { name: "Paul Thomson", role: "CEO", bio: "Founder of Carbon Distributed Technologies AG. Independent Director at eXeBlock Technology Inc. Former Chief Compliance Officer at Numus Capital Corp. Brings deep expertise in corporate governance, regulatory compliance, capital markets strategy, and blockchain-based environmental asset infrastructure globally." },
  { name: "Bryan Feinberg", role: "COO / CTO", bio: "CEO of Zephyr Technology Ventures and Plato AI. Licensed Investment Banker holding Series 7, 63 and 79 certifications. Led a startup from inception to $130M in revenue and a TASE public listing. Recognized expert in artificial intelligence, blockchain infrastructure, and big data analytics platforms." },
  { name: "Zach Goldenberg", role: "Advisor", bio: "Principal at Liberty Venture Partners. Corporate securities lawyer with extensive experience structuring financing and go-public transactions on Canadian markets including TSXV, CSE and CBOE Canada. Holds JD/HBA from Western Law and Ivey Business School. ICD.D designate and TSXV Advisory Committee member." },
  { name: "Josh Smith", role: "Chief Security Officer", bio: "Over 20 years of advanced deep-stack development specializing in cybersecurity and distributed systems. Full-stack architect delivering cross-chain, smart contract–backed solutions to enterprise and government clients. Proven expertise in securing complex infrastructure across Web3 and traditional environments." },
  { name: "Amjad Khatri", role: "DevOps", bio: "Full-stack developer and DevOps engineer with deep expertise in AI-driven application architecture and modern UI/UX design. Specializes in building scalable cloud infrastructure, CI/CD pipelines, and intelligent automation workflows. Passionate about bridging cutting-edge AI capabilities with seamless user experiences." },
  { name: "Fahad Umar", role: "DevOps", bio: "Full-stack developer and DevOps engineer with advanced expertise in network architecture, system administration, and cloud-native infrastructure. Designs and deploys resilient, high-availability environments across hybrid and multi-cloud platforms. Skilled in end-to-end application delivery from backend APIs to frontend interfaces." },
  { name: "Aditya Walia", role: "Country Manager, India", bio: "International lawyer and strategic advisor with extensive experience at a Big Four consultancy practice. Specializes in government relations, public infrastructure policy, and cross-border regulatory frameworks. Brings deep expertise in navigating complex institutional landscapes to drive large-scale enterprise and sovereign partnerships across India." },
];

const investorHighlights = [
  { icon: TrendingUp, title: "Institutional-Grade Returns", description: "Access diversified portfolios across real-world assets with risk-adjusted performance benchmarks." },
  { icon: Shield, title: "Regulatory Compliance", description: "Fully compliant investment structures across multiple jurisdictions with transparent reporting." },
  { icon: Globe, title: "Global Market Access", description: "Participate in cross-border opportunities spanning energy, infrastructure, and commodities." },
  { icon: Users, title: "Strategic Partnerships", description: "Co-invest alongside sovereign wealth funds, family offices, and institutional allocators." },
  { icon: BarChart3, title: "Data-Driven Insights", description: "AI-powered analytics and real-time reporting for informed investment decisions." },
  { icon: Briefcase, title: "Tailored Mandates", description: "Custom investment mandates aligned with your risk appetite, sector focus, and ESG criteria." },
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

      {/* Offering */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle label="Offering" title="Current Offering" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{ value: "Pre RTO", label: "Seed Round" }, { value: "$6M CAD", label: "Pre-Money Valuation" }, { value: "$0.15 CAD", label: "Share Price" }, { value: "16.66%", label: "Available to Investors" }].map(o => (
              <div key={o.label} className="text-center bg-card border border-border rounded-2xl p-6">
                <p className="text-2xl font-semibold animated-gradient-text mb-1">{o.value}</p>
                <p className="text-sm font-medium text-foreground">{o.label}</p>
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
            {team.slice(0, 4).map(t => (
              <div key={t.name} className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-base font-medium text-foreground">{t.name}</h3>
                <p className="text-sm animated-gradient-text font-medium mb-3">{t.role}</p>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Operations</p>
            <h2 className="text-2xl md:text-4xl font-light text-foreground mb-4">Operations Team</h2>
            <p className="text-base text-muted-foreground max-w-2xl font-light">Hands-on builders driving infrastructure, security, and global delivery across the stack.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {team.slice(4).map(t => (
              <div key={t.name} className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-base font-medium text-foreground">{t.name}</h3>
                <p className="text-sm animated-gradient-text font-medium mb-3">{t.role}</p>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner With Confidence */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <SectionTitle label="Investors" title="Partner With Confidence" subtitle="We provide institutional and accredited investors with structured access to high-conviction opportunities across global real-world asset markets." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {investorHighlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-card border border-border rounded-2xl p-8 hover:border-foreground/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-foreground/10 transition-colors">
                  <item.icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{item.description}</p>
              </motion.div>
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
