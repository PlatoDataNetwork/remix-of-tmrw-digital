import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { type TrademarkModule, type TrademarkQuestion, TM_MODULE_META } from "@/data/trademark-questions";
import { PAGE_BG, NEON, MODULE_COLORS } from "./constants";
import { TMRWBranding, BackButton } from "./SharedUI";

export function ReviewStep({ questions, answers, currentModule, onBack }: {
  questions: TrademarkQuestion[]; answers: (number | null)[]; currentModule: TrademarkModule; onBack: () => void;
}) {
  const color = MODULE_COLORS[currentModule];
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
      className="min-h-screen flex flex-col items-center pt-20 px-6 pb-20 relative" style={{ background: PAGE_BG }}>
      <TMRWBranding />
      <BackButton onClick={onBack} label="BACK TO RESULTS" />

      <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="text-2xl md:text-3xl font-black tracking-tight mb-2" style={{ color: "hsl(0,0%,95%)" }}>
        ANSWER REVIEW ™
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-xs tracking-[0.2em] uppercase mb-8" style={{ color }}>
        {TM_MODULE_META[currentModule].label}
      </motion.p>

      <div className="w-full max-w-3xl space-y-3">
        {questions.map((q, i) => {
          const userAnswer = answers[i];
          const correct = userAnswer === q.correctIndex;
          const expanded = expandedIdx === i;

          return (
            <motion.div key={q.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.03 }}
              className="border overflow-hidden" style={{ borderColor: "hsl(0,0%,12%)", background: "hsl(220,25%,5%)" }}>

              <button onClick={() => setExpandedIdx(expanded ? null : i)}
                className="w-full text-left p-4 flex items-start gap-3 transition-colors hover:bg-[hsl(220,25%,7%)]">
                <span className="mt-0.5 shrink-0">
                  {correct
                    ? <CheckCircle2 size={16} style={{ color: NEON }} />
                    : <XCircle size={16} style={{ color: "hsl(0,70%,55%)" }} />}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: "hsl(0,0%,85%)" }}>
                    <span className="font-mono text-[10px] mr-2" style={{ color: "hsl(0,0%,40%)" }}>Q{i + 1}</span>
                    {q.question}
                  </p>
                </div>
                {expanded ? <ChevronUp size={14} style={{ color: "hsl(0,0%,40%)" }} /> : <ChevronDown size={14} style={{ color: "hsl(0,0%,40%)" }} />}
              </button>

              <AnimatePresence>
                {expanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden">
                    <div className="px-4 pb-4 pt-1 space-y-2">
                      {q.options.map((opt, oi) => {
                        const isCorrectOpt = oi === q.correctIndex;
                        const isUserChoice = oi === userAnswer;
                        let optColor = "hsl(0,0%,50%)";
                        let optBg = "transparent";
                        if (isCorrectOpt) { optColor = NEON; optBg = `${NEON}11`; }
                        else if (isUserChoice && !isCorrectOpt) { optColor = "hsl(0,70%,55%)"; optBg = "hsl(0,70%,55%,0.08)"; }

                        return (
                          <div key={oi} className="flex items-start gap-2 p-2 rounded-sm text-xs" style={{ background: optBg }}>
                            <span className="font-mono shrink-0 mt-px" style={{ color: optColor }}>{String.fromCharCode(65 + oi)}</span>
                            <span style={{ color: optColor }}>{opt}</span>
                            {isCorrectOpt && <span className="ml-auto shrink-0 text-[10px] font-bold tracking-wider" style={{ color: NEON }}>✓ CORRECT</span>}
                            {isUserChoice && !isCorrectOpt && <span className="ml-auto shrink-0 text-[10px] font-bold tracking-wider" style={{ color: "hsl(0,70%,55%)" }}>YOUR ANSWER</span>}
                          </div>
                        );
                      })}

                      <div className="mt-3 p-3 rounded-sm" style={{ background: `${color}08`, borderLeft: `3px solid ${color}` }}>
                        <p className="text-[10px] font-bold tracking-[0.15em] uppercase mb-1" style={{ color }}>💡 INSIGHT</p>
                        <p className="text-xs leading-relaxed" style={{ color: "hsl(0,0%,65%)" }}>{q.insight}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        onClick={onBack}
        className="mt-10 px-10 py-4 text-sm font-bold tracking-[0.3em] uppercase transition-all hover:scale-105"
        style={{ background: color, color: PAGE_BG }}>
        BACK TO RESULTS
      </motion.button>
    </motion.div>
  );
}
