import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowDown, Cpu, Globe, Shield, Zap, Server, Code, Lock, BarChart3, Layers, Network, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

// --- Panel component for each architecture layer ---
function Panel({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

// --- Animated connection line between panels ---
function ConnectionLine({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="flex flex-col items-center py-6">
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-px h-16 origin-top"
        style={{ background: "linear-gradient(180deg, hsl(82 85% 55% / 0.6), hsl(82 85% 55% / 0.1))" }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium border border-[hsl(82,85%,55%,0.3)] text-[hsl(82,85%,55%)] bg-[hsl(82,85%,55%,0.05)] mt-2"
      >
        {label}
      </motion.div>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="w-px h-16 origin-top mt-2"
        style={{ background: "linear-gradient(180deg, hsl(82 85% 55% / 0.1), hsl(82 85% 55% / 0.6))" }}
      />
    </div>
  );
}

// --- Stat pill ---
function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center px-4 py-3 rounded-xl border border-border bg-card/50">
      <span className="text-xl md:text-2xl font-bold text-[hsl(82,85%,55%)]">{value}</span>
      <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1">{label}</span>
    </div>
  );
}

// --- Architecture node used in the animated diagram ---
function ArchNode({
  icon: Icon,
  label,
  delay = 0,
  accent = false,
}: {
  icon: React.ElementType;
  label: string;
  delay?: number;
  accent?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 200 }}
      className={`flex flex-col items-center gap-2 px-4 py-4 rounded-2xl border ${
        accent
          ? "border-[hsl(82,85%,55%,0.4)] bg-[hsl(82,85%,55%,0.06)] shadow-[0_0_30px_-8px_hsl(82,85%,55%,0.15)]"
          : "border-border bg-card/60"
      }`}
    >
      <Icon className={`h-6 w-6 ${accent ? "text-[hsl(82,85%,55%)]" : "text-foreground"}`} />
      <span className="text-xs font-medium text-foreground text-center leading-tight">{label}</span>
    </motion.div>
  );
}

const SuperCloud = () => {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="AI Super Cloud — Architecture Journey"
        description="Explore the distributed AI compute layer purpose-built for Web3. A panel-by-panel journey through the AI Super Cloud architecture."
        path="/super-cloud"
      />
      <Navbar />

      {/* Progress bar */}
      <div className="fixed top-[64px] lg:top-[80px] left-0 right-0 z-50 h-0.5 bg-transparent">
        <motion.div
          className="h-full"
          style={{
            width: progressWidth,
            background: "linear-gradient(90deg, hsl(82 85% 55%), hsl(160 80% 45%))",
          }}
        />
      </div>

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[hsl(82,85%,55%,0.04)] blur-[160px]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/services/ai-analytics"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to AI Super Cloud
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs uppercase tracking-[0.3em] text-[hsl(82,85%,55%)] mb-4"
          >
            Architecture Deep Dive
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl md:text-6xl font-light text-foreground mb-6 leading-tight"
          >
            AI Super Cloud
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed mb-12"
          >
            A decentralized AI compute mesh with plans to grow 500+ nodes worldwide. Scroll to explore each layer of the architecture — from the hardware foundation to the application frontier.
          </motion.p>

          {/* Architecture preview — animated rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-16"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border"
                style={{
                  inset: `${i * 20}px`,
                  borderColor: `hsl(82 85% 55% / ${0.15 - i * 0.03})`,
                }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-1">
                <Cpu className="h-8 w-8 text-[hsl(82,85%,55%)]" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[hsl(82,85%,55%,0.7)]">5 Layers</span>
              </div>
            </div>
            {/* Orbiting dots */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={`dot-${i}`}
                animate={{ rotate: 360 }}
                transition={{ duration: 12 + i * 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
                style={{ inset: `${i * 12}px` }}
              >
                <div
                  className="absolute w-2 h-2 rounded-full bg-[hsl(82,85%,55%)]"
                  style={{ top: 0, left: "50%", transform: "translateX(-50%)", boxShadow: "0 0 8px hsl(82 85% 55% / 0.4)" }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col items-center gap-2 text-muted-foreground/50"
          >
            <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== JOURNEY PANELS ===== */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-32">

        {/* PANEL 1 — Hardware Foundation */}
        <Panel index={0}>
          <div className="rounded-3xl border border-border bg-card/40 backdrop-blur-sm p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-[hsl(82,85%,55%,0.1)] border border-[hsl(82,85%,55%,0.2)] flex items-center justify-center">
                <Server className="h-5 w-5 text-[hsl(82,85%,55%)]" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(82,85%,55%)]">Layer 01</p>
                <h2 className="text-xl md:text-2xl font-light text-foreground">Hardware Foundation</h2>
              </div>
            </div>
            <p className="text-muted-foreground font-light leading-relaxed mb-8">
              The foundation of the AI Super Cloud is a globally distributed mesh of GPU and TPU clusters. Data centers, edge nodes, and partner infrastructure pools are connected through a permissionless orchestration layer — eliminating single points of failure and vendor lock-in.
            </p>
            {/* Animated node diagram */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <ArchNode icon={Server} label="GPU Clusters" delay={0} accent />
              <ArchNode icon={Cpu} label="TPU Farms" delay={0.1} />
              <ArchNode icon={Globe} label="Edge Nodes" delay={0.2} />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 max-w-[66%] mx-auto">
              <ArchNode icon={Network} label="Partner Pools" delay={0.3} />
              <ArchNode icon={Layers} label="Hybrid Infra" delay={0.4} />
            </div>
          </div>
        </Panel>

        <ConnectionLine label="Orchestration" />

        {/* PANEL 2 — Compute Orchestration */}
        <Panel index={1}>
          <div className="rounded-3xl border border-border bg-card/40 backdrop-blur-sm p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-[hsl(82,85%,55%,0.1)] border border-[hsl(82,85%,55%,0.2)] flex items-center justify-center">
                <Layers className="h-5 w-5 text-[hsl(82,85%,55%)]" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(82,85%,55%)]">Layer 02</p>
                <h2 className="text-xl md:text-2xl font-light text-foreground">Compute Orchestration</h2>
              </div>
            </div>
            <p className="text-muted-foreground font-light leading-relaxed mb-8">
              Smart contracts govern resource allocation, load balancing, and pricing transparency. Workloads are dynamically routed to optimal nodes based on latency, cost, and hardware capabilities — achieving sub-50ms inference at 60% less cost than centralized providers.
            </p>
            <div className="relative rounded-2xl border border-border bg-background/50 p-6">
              {/* Flow visualization */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                {["Request", "Route", "Allocate", "Execute", "Return"].map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12, duration: 0.4 }}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border ${
                        i === 3
                          ? "border-[hsl(82,85%,55%,0.4)] bg-[hsl(82,85%,55%,0.08)] text-[hsl(82,85%,55%)]"
                          : "border-border bg-card text-foreground"
                      }`}
                    >
                      {step}
                    </motion.div>
                    {i < 4 && <ChevronRight className="h-3 w-3 text-muted-foreground/40 shrink-0 hidden sm:block" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Panel>

        <ConnectionLine label="AI Runtime" />

        {/* PANEL 3 — AI Model Layer */}
        <Panel index={2}>
          <div className="rounded-3xl border border-border bg-card/40 backdrop-blur-sm p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-[hsl(82,85%,55%,0.1)] border border-[hsl(82,85%,55%,0.2)] flex items-center justify-center">
                <Cpu className="h-5 w-5 text-[hsl(82,85%,55%)]" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(82,85%,55%)]">Layer 03</p>
                <h2 className="text-xl md:text-2xl font-light text-foreground">AI Model Runtime</h2>
              </div>
            </div>
            <p className="text-muted-foreground font-light leading-relaxed mb-8">
              Deploy, serve, and fine-tune any model — LLMs, vision, custom pipelines. The runtime handles token-metered billing, BYOK key management, and automatic scaling. Every inference job produces a cryptographic attestation on-chain for verifiable compute.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: Code, label: "LLM Hosting" },
                { icon: Zap, label: "Fine-Tuning" },
                { icon: BarChart3, label: "Metered Billing" },
                { icon: Lock, label: "Verifiable Compute" },
              ].map((item, i) => (
                <ArchNode key={item.label} icon={item.icon} label={item.label} delay={i * 0.1} accent={i === 3} />
              ))}
            </div>
          </div>
        </Panel>

        <ConnectionLine label="Security" />

        {/* PANEL 4 — Compliance & Security */}
        <Panel index={3}>
          <div className="rounded-3xl border border-border bg-card/40 backdrop-blur-sm p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-[hsl(82,85%,55%,0.1)] border border-[hsl(82,85%,55%,0.2)] flex items-center justify-center">
                <Shield className="h-5 w-5 text-[hsl(82,85%,55%)]" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(82,85%,55%)]">Layer 04</p>
                <h2 className="text-xl md:text-2xl font-light text-foreground">Compliance & Security</h2>
              </div>
            </div>
            <p className="text-muted-foreground font-light leading-relaxed mb-8">
              The On-Chain Compliance Engine automates AML/KYC screening, transaction scoring, and regulatory reporting — delivering a 60% cost reduction over legacy compliance stacks. All data flows are encrypted end-to-end with zero-knowledge proofs available for sensitive workloads.
            </p>
            <div className="grid grid-cols-3 gap-3">
              <ArchNode icon={Shield} label="AML/KYC Engine" delay={0} accent />
              <ArchNode icon={Lock} label="E2E Encryption" delay={0.1} />
              <ArchNode icon={BarChart3} label="Audit Trail" delay={0.2} />
            </div>
          </div>
        </Panel>

        <ConnectionLine label="Integration" />

        {/* PANEL 5 — Application Layer */}
        <Panel index={4}>
          <div className="rounded-3xl border border-border bg-card/40 backdrop-blur-sm p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-[hsl(82,85%,55%,0.1)] border border-[hsl(82,85%,55%,0.2)] flex items-center justify-center">
                <Code className="h-5 w-5 text-[hsl(82,85%,55%)]" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(82,85%,55%)]">Layer 05</p>
                <h2 className="text-xl md:text-2xl font-light text-foreground">Application Frontier</h2>
              </div>
            </div>
            <p className="text-muted-foreground font-light leading-relaxed mb-8">
              Plug-and-play SDKs, REST APIs, and smart contract hooks connect any dApp, browser extension, or DeFi protocol to the Super Cloud. Builder grants and hackathon sponsorships provide subsidized compute to early-stage Web3 AI projects.
            </p>

            {/* SDK/API cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "REST APIs", desc: "Standard endpoints for inference, model management, and billing queries." },
                { title: "Smart Contract Hooks", desc: "On-chain triggers for automated compute jobs, payments, and attestations." },
                { title: "Web3 AI Grants", desc: "Subsidized compute credits and sandbox environments for builders." },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-xl border border-border bg-background/50 p-5 hover:border-[hsl(82,85%,55%,0.3)] hover:shadow-[0_0_20px_-6px_hsl(82,85%,55%,0.1)] transition-all duration-300"
                >
                  <h4 className="text-sm font-medium text-foreground mb-2">{card.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Panel>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-24"
        >
          <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">Ready to Build?</h2>
          <p className="text-muted-foreground font-light mb-8 max-w-lg mx-auto">
            Connect with our team to explore how the AI Super Cloud can power your next Web3 project.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/#contact"
              className="inline-flex items-center px-8 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </Link>
            <Link
              to="/services/ai-analytics"
              className="inline-flex items-center px-8 py-3 border border-border rounded-full text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              Service Overview
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default SuperCloud;
