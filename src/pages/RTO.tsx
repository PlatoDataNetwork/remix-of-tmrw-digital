import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const stats = [
  { value: "$200B+", label: "Web3/AI Market by 2030" },
  { value: "13M+", label: "Organic Platform Visitors" },
  { value: "Q1 2026", label: "Targeted TSX Listing" },
];

const pillars = [
  { title: "Carbon Credits", desc: "Blockchain-verified carbon offsetting infrastructure." },
  { title: "Web3 Browser", desc: "Decentralized access gateway with native blockchain support." },
  { title: "AI Tools", desc: "CodeNexus, NexusWave Carbon, and AI-powered solutions." },
  { title: "Token Economy", desc: "CUT and Plato tokens powering the ecosystem." },
];

const challengeItems = [
  "Fragmented Web3 infrastructure across platforms",
  "Lack of transparent carbon credit verification",
  "Limited enterprise adoption of blockchain solutions",
  "Regulatory uncertainty in digital assets",
];

const opportunityItems = [
  "$200B+ Web3/AI market projected by 2030",
  "$50B+ voluntary carbon market by 2030",
  "Blockchain-verified carbon credit infrastructure",
  "Public market access via TSX listing Q1 2026",
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

const browserFeatures = [
  "Native blockchain application support",
  "Decentralized identity (DID) integration",
  "Built-in token wallet functionality",
  "AI-powered search capabilities",
  "Smart contract compatibility",
];
const aiTools = [
  "CodeNexus: AI code generation for Web3",
  "NexusWave Carbon: Climate data intelligence",
  "Plato Media: Web3 sync licensing",
  "Plato RWA: Real-world asset tokenization",
  "SecureStake: Solana staking protocol",
];

const platformMetrics = [
  { value: "13M+", sub: "Organic Visitors", detail: "Across 160+ countries" },
  { value: "70,000+", sub: "Enterprises", detail: "Active platform users" },
  { value: "$1.4M", sub: "Revenue", detail: "Via Plato platform" },
  { value: "35", sub: "Languages", detail: "Global multilingual support" },
];
const assetMetrics = [
  { value: "$5M", sub: "Carbon Credits", detail: "500K tonnes ISO-certified" },
  { value: "$5M", sub: "IP & Infrastructure", detail: "Plato technology assets" },
  { value: "300M+", sub: "CUT Tokens", detail: "Corporate treasury holdings" },
  { value: "Zero Debt", sub: "Financial Health", detail: "Insured and audited status" },
];

const cutTokenFeatures = [
  "Represents certified carbon offsets",
  "Blockchain-verified retirement",
  "300M+ tokens in treasury",
  "Last private sale: $0.10 USD",
  "Enterprise ESG compliance tool",
];
const platoTokenFeatures = [
  "Powers Plato Web3 Browser",
  "SecureStake staking rewards",
  "AI compute network incentives",
  "Solana ecosystem integration",
  "Platform transaction settlements",
];

const roadmap = [
  { phase: "Q4 2025", title: "Transaction Close", desc: "Complete consolidation of CUT and Plato AI, establish unified management structure", tags: ["Legal Structure", "Asset Transfer", "Team Integration"] },
  { phase: "Q1 2026", title: "RTO & TSX Listing", desc: "Execute reverse takeover, list Tomorrow Digital on TSX Venture Exchange", tags: ["RTO Completion", "Public Listing", "TMRW Symbol"] },
  { phase: "Q2-Q4 2026", title: "Platform Expansion", desc: "Scale Web3 browser adoption, expand carbon credit partnerships, launch AI services", tags: ["User Acquisition", "Enterprise Sales", "Product Launch"] },
  { phase: "2027+", title: "Global Scale", desc: "International expansion, strategic partnerships, potential TSX graduation", tags: ["Global Reach", "M&A Opportunities", "Market Leadership"] },
];

const whyAcquisition = [
  { title: "Deep Data Integration", desc: "AI OS requires full-funnel data access, far easier within single entity." },
  { title: "Control of Rails & Token", desc: "Stablecoin and token are core financial infrastructure requiring group-level governance." },
  { title: "Aligned Roadmap & Incentives", desc: "One cap table, unified product roadmap, consistent capital markets story." },
  { title: "IP Ownership", desc: "AI models, risk engines, smart contracts live on Btab balance sheet." },
  { title: "Capital Markets Story", desc: "Public market investors can clearly understand and price a unified, integrated platform." },
];

const team = [
  { name: "Justin Hartzman", role: "Chairman", bio: "Co-founded CoinSmart, led to public listing and sale to WonderFi (recently acquired by Robinhood). Board director at WonderFi. Over a decade scaling fintech companies and executing go-public strategies." },
  { name: "Paul Thomson", role: "CEO", bio: "Founder of Carbon Distributed Technologies. Independent Director at eXeBlock Technology. Former CCO at Numus Capital. Deep expertise in corporate governance, compliance, and capital markets." },
  { name: "Bryan Feinberg", role: "COO / CTO", bio: "CEO of Zephyr Technology Ventures and Plato AI. Licensed Investment Banker (Series 7, 63, 79). Led startup from zero to $130M revenue and TASE public listing. Expert in AI, blockchain, and big data." },
  { name: "Zach Goldenberg", role: "Advisor", bio: "Principal of Liberty Venture Partners. Corporate-securities lawyer with extensive track record in financing and go-public transactions on Canadian markets. ICD.D designation, TSXV Advisory Committee member." },
];

const SectionTitle = ({ children, sub }: { children: React.ReactNode; sub?: string }) => (
  <div className="text-center mb-16">
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{children}</h2>
    {sub && <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{sub}</p>}
  </div>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-2 text-muted-foreground">
        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
        {item}
      </li>
    ))}
  </ul>
);

const RTO = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
          >
            Tomorrow Digital RTO
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-xl md:text-2xl font-medium text-foreground/90 mb-4 max-w-4xl mx-auto"
          >
            Consolidating Carbon Distributed Technologies and Plato AI into a diversified Web3 / AI Infrastructure and Digital Asset Company.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12"
          >
            Facilitating listing on the Canadian public market via a Reverse Takeover (RTO) on TSX Venture Exchange.
          </motion.p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
            {stats.map((s, i) => (
              <motion.div key={s.label} custom={i} variants={fadeIn} initial="hidden" animate="visible" className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground max-w-3xl mx-auto"
          >
            The Tomorrow Company positions itself at the forefront of Web3 AI infrastructure—transforming from pioneering platforms into a unified backbone for blockchain-enabled carbon credits and decentralized intelligence solutions.
          </motion.p>
        </div>
      </section>

      {/* Challenge & Opportunity */}
      <section className="py-20 px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <SectionTitle sub="The convergence of Web3 infrastructure, AI innovation, and sustainable carbon solutions.">
            The Challenge & Opportunity
          </SectionTitle>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="rounded-2xl border border-border p-8 bg-card">
              <h3 className="text-xl font-bold text-foreground mb-4">The Challenge</h3>
              <BulletList items={challengeItems} />
            </div>
            <div className="rounded-2xl border border-primary/30 p-8 bg-card">
              <h3 className="text-xl font-bold text-foreground mb-4">The Opportunity</h3>
              <BulletList items={opportunityItems} />
            </div>
          </div>
        </div>
      </section>

      {/* The Tomorrow Company */}
      <section className="py-20 px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <SectionTitle sub="Tomorrow Digital Inc. (DBA: The Tomorrow Company) — A diversified Web3 / AI Infrastructure and Digital Asset Company.">
            The Tomorrow Company
          </SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-border p-8 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-2">Carbon Infrastructure</h3>
              <p className="text-muted-foreground text-sm">Blockchain-based carbon offsetting with 500,000 tonnes of ISO-certified credits and CUT utility token</p>
            </div>
            <div className="rounded-2xl border border-border p-8 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-2">Web3 AI Platform</h3>
              <p className="text-muted-foreground text-sm">Plato AI Browser, CodeNexus AI development tools, and decentralized data intelligence across 160+ countries</p>
            </div>
            <div className="rounded-2xl border border-border p-8 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-2">Public Market Access</h3>
              <p className="text-muted-foreground text-sm">RTO transaction targeting TSX Venture Exchange listing Q1 2026 with experienced management team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Structure */}
      <section className="py-20 px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <SectionTitle sub="Consolidating Carbon Distributed Technologies and Plato AI to create a Diversified Web3 Infrastructure and Digital Asset Holding Company.">
            The Structure
          </SectionTitle>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="rounded-2xl border border-border p-8 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-4">Carbon Distributed Technologies</h3>
              <BulletList items={[
                "500,000 tonnes ISO-certified carbon credits",
                "300M+ CUT tokens in treasury",
                "FMA regulated under Blockchain Act",
                "6M+ kg carbon offsets retired on-chain",
              ]} />
            </div>
            <div className="rounded-2xl border border-border p-8 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-4">Plato AI</h3>
              <BulletList items={[
                "Plato Web3 Browser and AI compute network",
                "13M+ organic visitors across 160+ countries",
                "CodeNexus, NexusWave Carbon, Plato Media",
                "$1.4M revenue with 70K+ enterprises",
              ]} />
            </div>
          </div>
        </div>
      </section>

      {/* Core Business Pillars */}
      <section className="py-20 px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <SectionTitle sub="Four integrated pillars powering the Web3 AI ecosystem.">
            Core Business Pillars
          </SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-2xl border border-border p-6 bg-card text-center">
                <h3 className="text-lg font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillar 1: Carbon */}
      <section className="py-20 px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <SectionTitle sub="CUT Carbon Distributed Technologies provides transparent, blockchain-verified carbon offsetting solutions.">
            Pillar 1: Carbon Credits Infrastructure
          </SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-border p-8 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-4">Asset Base</h3>
              <BulletList items={carbonAssets} />
            </div>
            <div className="rounded-2xl border border-border p-8 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-4">Technology</h3>
              <BulletList items={carbonTech} />
            </div>
            <div className="rounded-2xl border border-border p-8 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-4">Market Position</h3>
              <BulletList items={carbonMarket} />
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 2: Web3 AI */}
      <section className="py-20 px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <SectionTitle>Pillar 2: Web3 AI Platform</SectionTitle>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="rounded-2xl border border-border p-8 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-2">Plato Web3 Browser</h3>
              <p className="text-sm text-muted-foreground mb-4">Next-generation decentralized access portal</p>
              <BulletList items={browserFeatures} />
            </div>
            <div className="rounded-2xl border border-border p-8 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-2">AI Development Tools</h3>
              <p className="text-sm text-muted-foreground mb-4">Comprehensive Web3 AI toolkit</p>
              <BulletList items={aiTools} />
            </div>
          </div>
        </div>
      </section>

      {/* Market Traction */}
      <section className="py-20 px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <SectionTitle>Market Traction & Metrics</SectionTitle>
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-foreground mb-6">Platform Performance</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {platformMetrics.map((m) => (
                <div key={m.sub} className="rounded-2xl border border-border p-6 bg-card text-center">
                  <p className="text-2xl font-bold text-primary">{m.value}</p>
                  <p className="text-sm font-semibold text-foreground mt-1">{m.sub}</p>
                  <p className="text-xs text-muted-foreground mt-1">{m.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Asset Value</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {assetMetrics.map((m) => (
                <div key={m.sub} className="rounded-2xl border border-border p-6 bg-card text-center">
                  <p className="text-2xl font-bold text-primary">{m.value}</p>
                  <p className="text-sm font-semibold text-foreground mt-1">{m.sub}</p>
                  <p className="text-xs text-muted-foreground mt-1">{m.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Token Architecture */}
      <section className="py-20 px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <SectionTitle sub="Dual-token ecosystem: CUT (carbon credits) + Plato (Web3 AI utility)">
            Token Architecture
          </SectionTitle>
          <div className="grid md:grid-cols-2 gap-10 mb-12">
            <div className="rounded-2xl border border-border p-8 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-2">CUT Token</h3>
              <p className="text-sm text-muted-foreground mb-4">Carbon offset utility token</p>
              <BulletList items={cutTokenFeatures} />
            </div>
            <div className="rounded-2xl border border-border p-8 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-2">Plato Token</h3>
              <p className="text-sm text-muted-foreground mb-4">Web3 AI network utility</p>
              <BulletList items={platoTokenFeatures} />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Carbon", desc: "Transaction fees & enterprise solutions" },
              { title: "Platform", desc: "Licensing & white-label development" },
              { title: "Tokens", desc: "Distribution & staking services" },
            ].map((r) => (
              <div key={r.title} className="rounded-2xl border border-border p-6 bg-card text-center">
                <h4 className="text-sm font-bold text-primary mb-1">{r.title}</h4>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-20 px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <SectionTitle sub="Multiple revenue streams across carbon credits, Web3 infrastructure, and AI services">
            Business Model & Growth Strategy
          </SectionTitle>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { num: "1", title: "Carbon Solutions", desc: "Enterprise carbon offsetting, CUT token sales, blockchain verification" },
              { num: "2", title: "Platform Services", desc: "Web3 browser, AI tools, developer licensing, white-label solutions" },
              { num: "3", title: "Network Economy", desc: "Token distribution, staking rewards, transaction fees" },
            ].map((item) => (
              <div key={item.num} className="rounded-2xl border border-border p-8 bg-card">
                <span className="text-3xl font-bold text-primary/30">{item.num}</span>
                <h3 className="text-lg font-bold text-foreground mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: "Pre-Money Valuation", value: "$6M CAD" },
              { label: "Share Price", value: "$0.15 CAD" },
              { label: "Available to Investors", value: "16.66%" },
            ].map((o) => (
              <div key={o.label} className="rounded-2xl border border-primary/30 p-6 bg-card text-center">
                <p className="text-2xl font-bold text-primary">{o.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{o.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <SectionTitle sub="Strategic path from consolidation to public market debut Q1 2026.">
            Roadmap to TSX Listing
          </SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmap.map((r) => (
              <div key={r.phase} className="rounded-2xl border border-border p-6 bg-card">
                <span className="text-sm font-bold text-primary">{r.phase}</span>
                <h3 className="text-lg font-bold text-foreground mt-2 mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{r.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {r.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-full border border-border text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Acquisition */}
      <section className="py-20 px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <SectionTitle sub="Five compelling reasons for full integration vs. strategic partnership">
            Why Acquisition, Not Partnership
          </SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyAcquisition.map((w) => (
              <div key={w.title} className="rounded-2xl border border-border p-6 bg-card">
                <h3 className="text-lg font-bold text-foreground mb-2">{w.title}</h3>
                <p className="text-sm text-muted-foreground">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="py-20 px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <SectionTitle sub="Tomorrow Digital: Diversified Web3/AI infrastructure with multiple value drivers">
            Investment Highlights
          </SectionTitle>
          <div className="grid md:grid-cols-2 gap-10 mb-12">
            <div className="rounded-2xl border border-border p-8 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-4">Carbon Distributed Technologies</h3>
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-muted-foreground text-sm">ISO Carbon Credits</span><span className="text-sm font-semibold text-foreground">$5M</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground text-sm">CUT Token Treasury</span><span className="text-sm font-semibold text-foreground">300M+</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground text-sm">Blockchain Infrastructure</span><span className="text-sm font-semibold text-foreground">FMA Regulated</span></div>
              </div>
            </div>
            <div className="rounded-2xl border border-border p-8 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-4">Plato AI</h3>
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-muted-foreground text-sm">Technology IP</span><span className="text-sm font-semibold text-foreground">$5M</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground text-sm">User Base</span><span className="text-sm font-semibold text-foreground">13M+</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground text-sm">Revenue Run Rate</span><span className="text-sm font-semibold text-foreground">$1.4M</span></div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Public Market Access", desc: "TSX listing provides liquidity and institutional credibility" },
              { title: "Growth Markets", desc: "$200B+ Web3/AI and $50B+ carbon markets by 2030" },
              { title: "Proven Technology", desc: "Live platforms with real users and revenue generation" },
            ].map((h) => (
              <div key={h.title} className="rounded-2xl border border-border p-6 bg-card text-center">
                <h3 className="text-lg font-bold text-foreground mb-2">{h.title}</h3>
                <p className="text-sm text-muted-foreground">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <SectionTitle sub="Experienced executives with proven track record in fintech, AI, and public markets">
            Leadership Team
          </SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((t) => (
              <div key={t.name} className="rounded-2xl border border-border p-6 bg-card">
                <h3 className="text-lg font-bold text-foreground">{t.name}</h3>
                <p className="text-sm font-semibold text-primary mb-3">{t.role}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle sub="Be part of building the infrastructure for tomorrow's decentralized, intelligent internet">
            Join the Web3 AI Revolution
          </SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "1", title: "Pre-Money Valuation: $6M CAD", desc: "Up to 16.66% available to investors" },
              { num: "2", title: "Share Price: $0.15 CAD", desc: "40M shares authorized, founders 9-month lockup" },
              { num: "3", title: "TSX Listing Q1 2026", desc: "Symbol: TMRW on TSX Venture Exchange" },
              { num: "4", title: "Plato Allocation Available", desc: "Strategic token allocation for investors" },
            ].map((c) => (
              <div key={c.num} className="rounded-2xl border border-primary/30 p-6 bg-card">
                <span className="text-2xl font-bold text-primary/30">{c.num}</span>
                <h4 className="text-sm font-bold text-foreground mt-2 mb-1">{c.title}</h4>
                <p className="text-xs text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RTO;
