import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";
import { type TrademarkModule } from "@/data/trademark-questions";
import { PAGE_BG, MODULE_COLORS } from "./constants";
import { TMRWBranding } from "./SharedUI";

export function AnalyzingStep({ currentModule }: { currentModule: TrademarkModule }) {
  const [phase, setPhase] = useState(0);
  const color = MODULE_COLORS[currentModule];
  const phases = [
    "SCANNING YOUR TRADEMARK DNA...",
    "CROSS-REFERENCING IP DATABASES...",
    "EVALUATING BRAND ACUMEN...",
    "GENERATING YOUR PROFILE...",
  ];

  useEffect(() => {
    const timers = phases.map((_, i) => setTimeout(() => setPhase(i), i * 1200));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative" style={{ background: PAGE_BG }}>
      <TMRWBranding />
      <div className="relative mb-10">
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.08, 0.3] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute rounded-full" style={{ background: color, width: 120, height: 120, top: -30, left: -30 }} />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="relative z-10">
          <Shield size={60} style={{ color }} />
        </motion.div>
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={phase} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          className="text-xs md:text-sm tracking-[0.3em] font-mono" style={{ color }}>
          {phases[phase]}
        </motion.p>
      </AnimatePresence>
      <div className="flex gap-2 mt-8">
        {phases.map((_, i) => (
          <motion.div key={i} className="w-2 h-2 rounded-full" animate={{ background: i <= phase ? color : "hsl(0,0%,20%)" }} />
        ))}
      </div>
    </motion.div>
  );
}
