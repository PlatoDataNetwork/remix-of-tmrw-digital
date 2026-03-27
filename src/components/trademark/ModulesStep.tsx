import { motion, AnimatePresence } from "framer-motion";
import { Check, CheckCircle2 } from "lucide-react";
import { type TrademarkModule, TM_MODULE_META, TM_QUESTION_BANK } from "@/data/trademark-questions";
import { PAGE_BG, MODULE_COLORS } from "./constants";
import { TMRWBranding, BackButton } from "./SharedUI";

export function ModulesStep({ onSelect, onBack, completedModules }: {
  onSelect: (m: TrademarkModule) => void;
  onBack: () => void;
  completedModules: Record<TrademarkModule, { passed: boolean; score: number; total: number } | null>;
}) {
  const modules: TrademarkModule[] = ["beginner", "intermediate", "expert"];

  return (
    <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 relative" style={{ background: PAGE_BG }}>
      <TMRWBranding />
      <BackButton onClick={onBack} />

      <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-2xl md:text-4xl font-black tracking-tight mb-2" style={{ color: "hsl(0,0%,95%)" }}>
        SELECT YOUR MODULE ™
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="text-xs md:text-sm tracking-[0.2em] uppercase mb-4" style={{ color: "hsl(0,0%,50%)" }}>
        Score 70%+ to graduate — jokes won't save you (but they'll soften the blow)
      </motion.p>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="flex items-center gap-2 mb-12">
        {modules.map((m, i) => {
          const completed = completedModules[m]?.passed;
          const color = MODULE_COLORS[m];
          return (
            <div key={m} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full flex items-center justify-center"
                style={{ background: completed ? color : "hsl(0,0%,15%)", border: `2px solid ${color}` }}>
                {completed && <Check size={8} style={{ color: PAGE_BG }} />}
              </div>
              {i < modules.length - 1 && <div className="w-8 h-px" style={{ background: completedModules[modules[i]]?.passed ? color : "hsl(0,0%,15%)" }} />}
            </div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
        {modules.map((m, i) => {
          const meta = TM_MODULE_META[m];
          const color = MODULE_COLORS[m];
          const result = completedModules[m];
          const available = TM_QUESTION_BANK[m].length;

          return (
            <motion.button key={m} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.12 }}
              onClick={() => onSelect(m)}
              className="text-left p-6 border transition-all duration-300 group relative overflow-hidden"
              style={{ borderColor: "hsl(0,0%,15%)", background: "hsl(220,25%,5%)" }}>
              <div className="absolute top-0 left-0 w-full h-1 transition-all duration-300 opacity-40 group-hover:opacity-100" style={{ background: color }} />

              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{meta.icon}</span>
                {result?.passed && <CheckCircle2 size={14} style={{ color }} />}
              </div>

              <span className="text-xs font-bold tracking-[0.15em] block mb-1 transition-colors duration-300" style={{ color }}>
                {meta.label}
              </span>
              <span className="text-xs block mb-3" style={{ color: "hsl(0,0%,50%)" }}>{meta.desc}</span>

              {result && (
                <span className="text-[10px] tracking-[0.15em] uppercase block mb-2" style={{ color: result.passed ? color : "hsl(0, 70%, 55%)" }}>
                  {result.passed ? "✓ PASSED" : "✗ NOT PASSED"} — {Math.round((result.score / result.total) * 100)}%
                </span>
              )}

              <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "hsl(0,0%,35%)" }}>
                {meta.questions} QUESTIONS · {available} IN POOL
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
