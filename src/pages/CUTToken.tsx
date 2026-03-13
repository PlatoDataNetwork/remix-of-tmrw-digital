import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, Shield, Zap, ArrowLeft, ExternalLink, Recycle, Globe, BarChart3 } from "lucide-react";
import { useRef, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const stats = [
  { value: "500K+", label: "Tonnes of Carbon Offsets Tokenized" },
  { value: "1 CUT", label: "= 1 Tonne CO₂ Destroyed" },
  { value: "Ethereum", label: "Mainnet & Arbitrum L2" },
  { value: "Liechtenstein", label: "Regulated Utility Token" },
];

const pillars = [
  {
    icon: Recycle,
    number: "01",
    title: "Destroy CO₂",
    description:
      "CUT can only be created from projects where CO₂ has already been destroyed. Your participation has a direct and tangible climate impact.",
  },
  {
    icon: Shield,
    number: "02",
    title: "Immutable Trust",
    description:
      "Smart contracts scientifically track and verify every CUT — providing an immutable audit trail from creation to the green project it came from.",
  },
  {
    icon: Zap,
    number: "03",
    title: "Support Renewables",
    description:
      "Blending digital and physical to allow you to support real-world renewable energy and carbon capture technologies with real value.",
  },
];

const CUTToken = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Generate stable particle positions
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        dur: 12 + Math.random() * 20,
        delay: Math.random() * -20,
        drift: 10 + Math.random() * 30,
      })),
    []
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="CUT Token — Carbon Utility Token"
        description="Purchase and retire certified carbon offsets with the Carbon Utility Token (CUT). Trusted, transparent, and immutable climate action on the blockchain."
        path="/cut-token"
      />
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* Parallax background layers */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(160,40%,8%)] via-background to-background" />

          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, hsl(160 60% 40%) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }} />

          {/* Floating carbon particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: `radial-gradient(circle, hsl(160 60% 50% / 0.6), hsl(160 60% 40% / 0))`,
              }}
              animate={{
                y: [-p.drift, p.drift, -p.drift],
                x: [-p.drift * 0.4, p.drift * 0.4, -p.drift * 0.4],
                opacity: [0.2, 0.7, 0.2],
              }}
              transition={{
                duration: p.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}

          {/* Large atmospheric glow orbs */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/[0.04] rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-400/[0.05] rounded-full blur-[80px]" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
              <span className="inline-block text-xs uppercase tracking-[0.25em] text-emerald-400 mb-4 font-medium">
                Carbon Utility Token
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                Purchase & Retire{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  Certified Carbon Offsets
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mb-8">
                Trusted and transparent climate impact. CUT gives you tangible power over your carbon footprint — pushing the transition into renewables and a cleaner planet.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://app.cut.eco/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-400 transition-colors"
                >
                  Retire CUT <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="https://cut.eco/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
                >
                  Visit cut.eco <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* Animated carbon molecule visual */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Outer ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-emerald-500/20"
                />
                {/* Mid ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 rounded-full border border-teal-400/25"
                />
                {/* Inner ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-16 rounded-full border border-emerald-300/30"
                />

                {/* Orbiting dots */}
                {[
                  { color: "bg-emerald-400", dur: 12, inset: 0, size: "w-3 h-3" },
                  { color: "bg-teal-300", dur: 18, inset: 32, size: "w-2.5 h-2.5" },
                  { color: "bg-green-400", dur: 8, inset: 64, size: "w-2 h-2" },
                  { color: "bg-emerald-500", dur: 22, inset: 16, size: "w-2 h-2" },
                ].map((dot, i) => (
                  <motion.div
                    key={i}
                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: dot.dur, repeat: Infinity, ease: "linear" }}
                    className="absolute"
                    style={{ inset: `${dot.inset}px` }}
                  >
                    <div
                      className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${dot.size} ${dot.color} rounded-full`}
                      style={{ boxShadow: "0 0 12px currentColor" }}
                    />
                  </motion.div>
                ))}

                {/* Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Leaf className="h-10 w-10 text-emerald-400 mb-2" />
                  <span className="text-2xl font-bold text-foreground">CUT</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
                    Carbon Utility Token
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How CUT is Different */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-emerald-400 mb-3 block">
              How Our Offsets Are Different
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Immutable Climate Action
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Many projects creating offsets are difficult to quantify or monitor. CUT's pool consists of certified removal and destruction of carbon by landfill gas and biomass projects.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.number}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative p-8 rounded-2xl border border-border bg-card hover:border-emerald-500/40 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <pillar.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground tracking-wider">
                    {pillar.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 bg-muted/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-emerald-400 mb-3 block">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              From Source to Retirement
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Globe, title: "Source", desc: "Carbon offsets sourced from independent power producers running landfill gas and biomass projects." },
              { icon: Shield, title: "Certify", desc: "Each offset is certified and verified through smart contracts with an immutable audit trail." },
              { icon: BarChart3, title: "Tokenize", desc: "Offsets are tokenized as CUT on Ethereum — 1 CUT equals 1 tonne of CO₂ destroyed." },
              { icon: Leaf, title: "Retire", desc: "Hold CUT or retire it from circulation forever, creating permanent and measurable climate impact." },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative"
              >
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-emerald-500/40 to-transparent z-0" />
                )}
                <div className="relative p-6 rounded-xl border border-border bg-card text-center">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-6 w-6 text-emerald-400" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                    Step {i + 1}
                  </span>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulation & Partners */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
              <span className="text-xs uppercase tracking-[0.25em] text-emerald-400 mb-3 block">
                Regulatory Framework
              </span>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                Regulated Utility Token
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Carbon Utility Token has received a legal opinion determining that it is a utility token under the Blockchain Act from the Financial Market Authority (FMA) — the governing financial regulatory body in Liechtenstein.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Launched on the Ethereum Mainnet, CUT calculates and offsets its own network activity to ensure a carbon-neutral footprint.
              </p>
              <a
                href="https://www.businesswire.com/news/home/20240912432484/en/Northern-Trust-Launches-Digital-Solution-for-Institutional-Voluntary-Carbon-Credits-with-First-Official-Live-Transactions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-medium"
              >
                Northern Trust Press Release <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}>
              <span className="text-xs uppercase tracking-[0.25em] text-emerald-400 mb-3 block">
                Ecosystem
              </span>
              <h2 className="text-3xl font-bold tracking-tight mb-6">Partners</h2>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { name: "Crypto Climate Accord", url: "https://cryptoclimate.org/", desc: "Private sector-led initiative for the crypto industry to achieve net-zero emissions." },
                  { name: "Meridian DLT", url: "https://meridiandlt.com/", desc: "Distributed ledger technology partner providing infrastructure solutions." },
                  { name: "Arbitrum", url: "https://arbitrum.io/", desc: "Layer 2 scaling solution enabling efficient and low-cost carbon offset transactions." },
                ].map((partner) => (
                  <a
                    key={partner.name}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-xl border border-border hover:border-emerald-500/40 transition-colors group"
                  >
                    <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                      <Globe className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground group-hover:text-emerald-400 transition-colors">
                        {partner.name} <ExternalLink className="inline h-3 w-3 ml-1" />
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{partner.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <Leaf className="h-12 w-12 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              A Tool to Help You Change the World
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Simply put, it's measurable climate action. Take tangible power over your carbon footprint today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://app.cut.eco/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-400 transition-colors"
              >
                Retire CUT Now <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://cdn.prod.website-files.com/5ed796379a8bd966f088efb3/6481c35798ae2153038e6ac3_CUT%20white%20paper%20-%20v2-2.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
              >
                Read White Paper <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CUTToken;
