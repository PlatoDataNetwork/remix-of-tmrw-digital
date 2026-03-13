import { motion } from "framer-motion";
import { Shield, Lock, Eye, Server, FileCheck, AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const pillars = [
  {
    icon: Shield,
    title: "Zero-Trust Architecture",
    description: "Every request is verified, every connection authenticated. Our infrastructure assumes no implicit trust — enforcing strict identity validation across every layer of the TMRW ecosystem.",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All data in transit and at rest is protected with military-grade encryption protocols. From tokenized assets to user credentials, nothing travels unprotected.",
  },
  {
    icon: Eye,
    title: "24/7 Threat Monitoring",
    description: "AI-powered surveillance systems scan for anomalies, intrusions, and vulnerabilities around the clock — detecting and neutralising threats before they materialise.",
  },
  {
    icon: Server,
    title: "Decentralized Resilience",
    description: "Our distributed compute mesh eliminates single points of failure. The TMRW network is designed to withstand attacks, outages, and adversarial conditions without service interruption.",
  },
  {
    icon: FileCheck,
    title: "Regulatory Compliance",
    description: "Built to meet and exceed international compliance frameworks including GDPR, SOC 2, and emerging digital asset regulations across multiple jurisdictions.",
  },
  {
    icon: AlertTriangle,
    title: "Smart Contract Auditing",
    description: "Every smart contract deployed within the TMRW ecosystem undergoes rigorous third-party auditing and formal verification before going live.",
  },
];

const commitments = [
  "Multi-signature governance for all treasury and protocol operations",
  "Bug bounty programme rewarding responsible disclosure",
  "Regular penetration testing by independent security firms",
  "On-chain transparency for all token movements and protocol upgrades",
  "Real-time incident response with sub-15-minute escalation SLA",
  "Immutable audit trails across all ecosystem transactions",
];

const Security = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Security — Safeguarding the TMRW Ecosystem | The Tomorrow Company"
        description="Our commitment to building and safeguarding the TMRW ecosystem through zero-trust architecture, 24/7 threat monitoring, smart contract auditing, and regulatory compliance."
        path="/security"
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/60 backdrop-blur mb-8">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                Ecosystem Security
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Safeguarding the{" "}
              <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
                TMRW Ecosystem
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Security isn't a feature — it's the foundation. Every layer of the TMRW network is engineered to protect assets, data, and participants from evolving threats in the Web3 landscape.
            </p>
          </motion.div>

          {/* Animated shield visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-40 h-40 md:w-52 md:h-52 mx-auto mt-14"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 25 + i * 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border"
                style={{
                  inset: `${i * 18}px`,
                  borderColor: `hsl(var(--primary) / ${0.2 - i * 0.05})`,
                }}
              />
            ))}
            {[
              { color: "hsl(var(--primary))", dur: 12, inset: 0, pos: "top" as const },
              { color: "hsl(200 90% 55%)", dur: 16, inset: 18, pos: "right" as const },
              { color: "hsl(275 80% 60%)", dur: 20, inset: 36, pos: "bottom" as const },
            ].map((dot, i) => (
              <motion.div
                key={`dot-${i}`}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: dot.dur, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
                style={{ inset: `${dot.inset}px` }}
              >
                <div
                  className="absolute w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: dot.color,
                    boxShadow: `0 0 12px ${dot.color}`,
                    ...(dot.pos === "top" ? { top: -4, left: "50%", transform: "translateX(-50%)" } :
                       dot.pos === "right" ? { right: -4, top: "50%", transform: "translateY(-50%)" } :
                       { bottom: -4, left: "50%", transform: "translateX(-50%)" }),
                  }}
                />
              </motion.div>
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="h-10 w-10 text-primary" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">Security Pillars</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Defence in Depth
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              A multi-layered security posture that protects participants, assets, and infrastructure across the entire TMRW network.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur hover:border-primary/30 transition-colors group"
              >
                <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <pillar.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">Our Pledge</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Security Commitments
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Concrete, measurable actions that underpin our promise to every participant in the TMRW ecosystem.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {commitments.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card/30"
              >
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              Building Trust Through Transparency
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Security is a continuous journey. We publish regular reports, welcome community audits, and hold ourselves to the highest standards so you can participate with confidence.
            </p>
            <a
              href="mailto:bf@tmrw-digital.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              <Shield className="h-4 w-4" />
              Contact Security Team
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Security;
