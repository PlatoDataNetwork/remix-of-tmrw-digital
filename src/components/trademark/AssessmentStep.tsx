import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Laugh } from "lucide-react";
import { type TrademarkModule, type TrademarkQuestion, TM_MODULE_META } from "@/data/trademark-questions";
import { PAGE_BG, NEON, MODULE_COLORS } from "./constants";
import { TMRWBranding, BackButton } from "./SharedUI";

export function AssessmentStep({ questions, questionIndex, answers, onAnswer, onBack, currentModule, onJoke }: {
  questions: TrademarkQuestion[]; questionIndex: number; answers: (number | null)[];
  onAnswer: (idx: number) => void; onBack: () => void; currentModule: TrademarkModule; onJoke: () => void;
}) {
  const q = questions[questionIndex];
  const total = questions.length;
  const progress = ((questionIndex + 1) / total) * 100;
  const color = MODULE_COLORS[currentModule];
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);

  useEffect(() => {
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setFailedAttempts(0);
  }, [questionIndex]);

  const handleOptionClick = (idx: number) => {
    if (showFeedback && isCorrect) return;
    setSelectedOption(idx);
    const correct = idx === q.correctIndex;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setTimeout(() => onAnswer(idx), 1200);
    } else {
      setFailedAttempts(prev => prev + 1);
    }
  };

  const revealCorrect = failedAttempts >= 2;

  const getOptionStyle = (i: number) => {
    if (!showFeedback || selectedOption === null) {
      return { borderColor: "hsl(0,0%,15%)", background: "hsl(220,25%,5%)" };
    }
    if (i === q.correctIndex && showFeedback && revealCorrect) {
      return { borderColor: "hsl(142, 71%, 45%)", background: "hsl(142, 71%, 45%, 0.12)" };
    }
    if (i === selectedOption && !isCorrect) {
      return { borderColor: "hsl(0, 70%, 55%)", background: "hsl(0, 70%, 55%, 0.12)" };
    }
    return { borderColor: "hsl(0,0%,15%)", background: "hsl(220,25%,5%)" };
  };

  const getOptionTextColor = (i: number) => {
    if (!showFeedback) return "hsl(0,0%,80%)";
    if (i === q.correctIndex && revealCorrect) return "hsl(142, 71%, 45%)";
    if (i === selectedOption && !isCorrect) return "hsl(0, 70%, 55%)";
    return "hsl(0,0%,40%)";
  };

  return (
    <motion.div key={`q-${questionIndex}`} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 relative" style={{ background: PAGE_BG }}>
      <TMRWBranding />
      <BackButton onClick={onBack} />

      <div className="absolute top-0 left-0 w-full h-1 z-20">
        <motion.div className="h-full" style={{ background: color }} initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
      </div>

      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <span className="text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-sm font-bold" style={{ background: `${color}22`, color }}>
          {TM_MODULE_META[currentModule].label}
        </span>
        <span className="text-xs tracking-[0.3em] font-mono" style={{ color: "hsl(0,0%,40%)" }}>
          {String(questionIndex + 1).padStart(2, "0")} / {total}
        </span>
      </div>

      <div className="w-full max-w-2xl">
        <motion.h3 key={`qt-${questionIndex}`} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="text-xl md:text-3xl font-bold tracking-tight mb-10 leading-snug" style={{ color: "hsl(0,0%,95%)" }}>
          {q.question}
        </motion.h3>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            const style = getOptionStyle(i);
            return (
              <motion.button key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }} onClick={() => handleOptionClick(i)}
                disabled={showFeedback && isCorrect}
                className="w-full text-left p-5 border transition-all duration-200 hover:scale-[1.01] flex items-start gap-4"
                style={style}>
                <span className="text-[10px] font-mono tracking-wider mt-0.5 shrink-0 flex items-center gap-1" style={{ color: getOptionTextColor(i) }}>
                  {showFeedback && i === q.correctIndex && revealCorrect && <CheckCircle2 size={12} />}
                  {showFeedback && i === selectedOption && !isCorrect && i !== q.correctIndex && <XCircle size={12} />}
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm md:text-base transition-colors duration-200" style={{ color: getOptionTextColor(i) }}>
                  {opt}
                </span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {showFeedback && !isCorrect && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mt-6 p-5 border rounded-sm" style={{ borderColor: "hsl(0, 70%, 55%, 0.3)", background: "hsl(0, 70%, 55%, 0.06)" }}>
              <p className="text-xs font-bold tracking-[0.15em] uppercase mb-2" style={{ color: "hsl(0, 70%, 55%)" }}>
                ✗ INCORRECT — TRY AGAIN
              </p>
              <p className="text-sm" style={{ color: "hsl(0,0%,60%)" }}>
                That's not right. Read the options carefully and select another answer.
              </p>
            </motion.div>
          )}
          {showFeedback && isCorrect && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mt-6 p-5 border rounded-sm" style={{ borderColor: "hsl(142, 71%, 45%, 0.3)", background: "hsl(142, 71%, 45%, 0.06)" }}>
              <p className="text-xs font-bold tracking-[0.15em] uppercase mb-2" style={{ color: "hsl(142, 71%, 45%)" }}>
                ✓ CORRECT
              </p>
              <p className="text-sm" style={{ color: "hsl(0,0%,70%)" }}>
                ™ <strong>INSIGHT:</strong> {q.insight}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="mt-8 flex justify-center">
          <button onClick={onJoke}
            className="flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase border rounded-full transition-all hover:scale-105"
            style={{ borderColor: "hsl(82, 85%, 55%, 0.4)", color: "hsl(82, 85%, 55%)", background: "hsl(82, 85%, 55%, 0.06)" }}>
            <Laugh size={14} /> TELL ME A JOKE
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
