import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Copy, Check, Shield, Sparkles, BookOpen, Target, Crown, Lock, CheckCircle2, XCircle, ChevronDown, ChevronUp, Zap, Laugh } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import platoIcon from "@/assets/plato-icon.webp";
import { type RWAModule, type RWAQuestion, pickRWAQuestions, MODULE_META, RWA_QUESTION_BANK, getRandomRWAJoke } from "@/data/rwa-questions";

/* ------------------------------------------------------------------ */
/*  BRANDING CONSTANTS                                                 */
/* ------------------------------------------------------------------ */
const PAGE_BG = "hsl(220, 20%, 4%)";
const NEON = "hsl(82, 85%, 55%)";

const MODULE_COLORS: Record<RWAModule, string> = {
  student: "hsl(82, 85%, 55%)",
  expert: "hsl(35, 90%, 55%)",
  titan: "hsl(280, 70%, 60%)",
};

interface ProfileResult {
  title: string;
  icon: typeof Shield;
  description: string;
  color: string;
}

const PROFILES: Record<RWAModule, ProfileResult[]> = {
  student: [
    { title: "RWA NOVICE", icon: BookOpen, description: "You're just beginning your journey into the world of real-world asset tokenization. The foundations are critical — review and return stronger.", color: "hsl(0, 70%, 55%)" },
    { title: "RWA LEARNER", icon: Target, description: "You have a basic grasp of RWA concepts but gaps remain. With a bit more study, you'll be ready to graduate.", color: "hsl(35, 90%, 55%)" },
    { title: "RWA STUDENT", icon: Shield, description: "Solid understanding of RWA foundations. You've earned your place — are you ready to go deeper?", color: "hsl(82, 85%, 55%)" },
  ],
  expert: [
    { title: "RWA PRACTITIONER", icon: BookOpen, description: "You know the landscape but the deeper technical and regulatory nuances need work. Review the expert material and try again.", color: "hsl(0, 70%, 55%)" },
    { title: "RWA ANALYST", icon: Target, description: "Strong knowledge of markets and compliance. Just a few more concepts to master before reaching expert status.", color: "hsl(35, 90%, 55%)" },
    { title: "RWA EXPERT", icon: Shield, description: "Impressive depth of knowledge. You understand the architecture, regulation, and market dynamics. The final challenge awaits.", color: "hsl(35, 90%, 55%)" },
  ],
  titan: [
    { title: "RWA STRATEGIST", icon: Target, description: "You're thinking at a high level but the elite concepts need more exploration. The titan level demands mastery of every edge case.", color: "hsl(0, 70%, 55%)" },
    { title: "RWA ARCHITECT", icon: Shield, description: "You understand the advanced infrastructure and strategy. Nearly at titan level — sharpen the final edges.", color: "hsl(280, 70%, 60%)" },
    { title: "RWA TITAN", icon: Crown, description: "You've conquered all three modules. You understand tokenization from foundations to frontier. You are among the elite.", color: "hsl(280, 70%, 60%)" },
  ],
};

function getProfile(score: number, total: number, mod: RWAModule): ProfileResult {
  const pct = score / total;
  const profiles = PROFILES[mod];
  if (pct < 0.5) return profiles[0];
  if (pct < 0.7) return profiles[1];
  return profiles[2];
}

type Step = "landing" | "identify" | "modules" | "assessment" | "joke" | "analyzing" | "results" | "review" | "contact";

/* ------------------------------------------------------------------ */
/*  SHARED UI                                                          */
/* ------------------------------------------------------------------ */

function TMRWBranding() {
  return (
    <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 z-30">
      <div className="h-5 w-5 shrink-0" style={{
        background: NEON,
        WebkitMaskImage: `url(${platoIcon})`, WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center",
        maskImage: `url(${platoIcon})`, maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center",
      }} />
      <span className="text-[10px] font-light tracking-[0.2em] uppercase" style={{ color: "hsl(0,0%,50%)" }}>
        TMRW <span style={{ color: "hsl(0,0%,30%)" }}>|</span> RWA CHANNEL
      </span>
    </div>
  );
}

function BackButton({ onClick, label = "BACK" }: { onClick: () => void; label?: string }) {
  return (
    <button onClick={onClick} className="absolute top-6 left-6 flex items-center gap-2 text-xs tracking-[0.2em] uppercase transition-opacity hover:opacity-100 z-30" style={{ color: "hsl(0,0%,50%)" }}>
      <ArrowLeft size={14} /> {label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  LANDING                                                            */
/* ------------------------------------------------------------------ */

function LandingStep({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-start justify-center px-8 md:px-16 lg:px-24 relative" style={{ background: PAGE_BG }}>
      <TMRWBranding />
      {/* Corner accent */}
      <div className="absolute top-0 left-0 z-10 pointer-events-none">
        <div className="w-px h-16" style={{ backgroundImage: `linear-gradient(to bottom, ${NEON}99, transparent)` }} />
        <div className="absolute top-0 left-0 w-16 h-px" style={{ backgroundImage: `linear-gradient(to right, ${NEON}99, transparent)` }} />
      </div>

      <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter whitespace-nowrap" style={{ color: NEON, textShadow: `0 0 40px ${NEON}33` }}>
          THE RWA CHANNEL
        </h1>
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="mt-4 text-sm md:text-base tracking-[0.3em] uppercase font-light italic" style={{ color: "hsl(0,0%,50%)" }}>
        "Real-World Asset Intelligence Assessment"
      </motion.p>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
        className="mt-2 text-xs tracking-[0.15em] uppercase" style={{ color: "hsl(0,0%,35%)" }}>
        3 Modules · 60 Questions · Jokes Included · No Refunds on Brain Cells
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
        className="flex flex-wrap gap-4 mt-12">
        <button onClick={onEnter}
          className="px-10 py-4 text-sm font-bold tracking-[0.4em] uppercase border-2 transition-all duration-300 hover:scale-105"
          style={{ color: PAGE_BG, background: NEON, borderColor: NEON, boxShadow: `0 0 24px ${NEON}33` }}>
          ENTER THE CHANNEL
        </button>
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-8 md:left-16 text-xs tracking-[0.15em] uppercase text-white">
        Powered by The Tomorrow Company &amp; TMRW Digital
      </motion.p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  IDENTIFY                                                           */
/* ------------------------------------------------------------------ */

const IDENTITIES = [
  { label: "FOUNDER / BUILDER", desc: "Building tokenization infrastructure or launching an RWA platform" },
  { label: "INVESTOR / VC", desc: "Looking at RWA tokenization as the next frontier of capital markets" },
  { label: "FINANCE PROFESSIONAL", desc: "Traditional finance exploring how Web3 transforms asset management" },
  { label: "CURIOUS EARTHLING", desc: "Just here to learn — and for the jokes, honestly" },
];

function IdentifyStep({ onSelect, onBack }: { onSelect: (id: string) => void; onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 relative" style={{ background: PAGE_BG }}>
      <TMRWBranding />
      <BackButton onClick={onBack} />
      <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-2xl md:text-4xl font-black tracking-tight mb-2" style={{ color: "hsl(0,0%,95%)" }}>
        WHO ARE YOU? 🏛️
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="text-xs md:text-sm tracking-[0.2em] uppercase mb-12" style={{ color: "hsl(0,0%,50%)" }}>
        Choose wisely — or don't, we're not judging
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
        {IDENTITIES.map((id, i) => (
          <motion.button key={id.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }} onClick={() => onSelect(id.label)}
            className="text-left p-6 border transition-all duration-300 hover:scale-[1.02] group"
            style={{ borderColor: "hsl(0,0%,15%)", background: "hsl(220,25%,5%)" }}>
            <span className="text-sm font-bold tracking-[0.15em] block mb-1 transition-colors duration-300" style={{ color: "hsl(0,0%,90%)" }}>
              {id.label}
            </span>
            <span className="text-xs" style={{ color: "hsl(0,0%,45%)" }}>{id.desc}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MODULE SELECTOR — ALL UNLOCKED                                     */
/* ------------------------------------------------------------------ */

function ModulesStep({ onSelect, onBack, completedModules }: {
  onSelect: (m: RWAModule) => void;
  onBack: () => void;
  completedModules: Record<RWAModule, { passed: boolean; score: number; total: number } | null>;
}) {
  const modules: RWAModule[] = ["student", "expert", "titan"];

  const isUnlocked = (_m: RWAModule): boolean => true;

  return (
    <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 relative" style={{ background: PAGE_BG }}>
      <TMRWBranding />
      <BackButton onClick={onBack} />

      <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-2xl md:text-4xl font-black tracking-tight mb-2" style={{ color: "hsl(0,0%,95%)" }}>
        SELECT YOUR MODULE 📘
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="text-xs md:text-sm tracking-[0.2em] uppercase mb-4" style={{ color: "hsl(0,0%,50%)" }}>
        Score 70%+ to graduate — jokes won't save you (but they'll soften the blow)
      </motion.p>

      {/* Progress dots */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="flex items-center gap-2 mb-12">
        {modules.map((m, i) => {
          const completed = completedModules[m]?.passed;
          const color = MODULE_COLORS[m];
          return (
            <div key={m} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full flex items-center justify-center"
                style={{ background: completed ? color : "hsl(0,0%,15%)", border: `2px solid ${isUnlocked(m) ? color : "hsl(0,0%,20%)"}` }}>
                {completed && <Check size={8} style={{ color: PAGE_BG }} />}
              </div>
              {i < modules.length - 1 && <div className="w-8 h-px" style={{ background: completedModules[modules[i]]?.passed ? color : "hsl(0,0%,15%)" }} />}
            </div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
        {modules.map((m, i) => {
          const meta = MODULE_META[m];
          const color = MODULE_COLORS[m];
          const unlocked = isUnlocked(m);
          const result = completedModules[m];
          const available = RWA_QUESTION_BANK[m].length;

          return (
            <motion.button key={m} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.12 }}
              onClick={() => unlocked && onSelect(m)}
              disabled={!unlocked}
              className="text-left p-6 border transition-all duration-300 group relative overflow-hidden"
              style={{
                borderColor: unlocked ? "hsl(0,0%,15%)" : "hsl(0,0%,10%)",
                background: "hsl(220,25%,5%)",
                opacity: unlocked ? 1 : 0.5,
                cursor: unlocked ? "pointer" : "not-allowed",
              }}>
              <div className="absolute top-0 left-0 w-full h-1 transition-all duration-300 opacity-40 group-hover:opacity-100" style={{ background: unlocked ? color : "hsl(0,0%,20%)" }} />

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
                {meta.questions} QUESTIONS
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  ASSESSMENT — WITH IMMEDIATE FEEDBACK                               */
/* ------------------------------------------------------------------ */

function AssessmentStep({ questions, questionIndex, answers, onAnswer, onBack, currentModule, onJoke }: {
  questions: RWAQuestion[]; questionIndex: number; answers: (number | null)[];
  onAnswer: (idx: number) => void; onBack: () => void; currentModule: RWAModule; onJoke: () => void;
}) {
  const q = questions[questionIndex];
  const total = questions.length;
  const progress = ((questionIndex + 1) / total) * 100;
  const color = MODULE_COLORS[currentModule];
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
  }, [questionIndex]);

  const handleOptionClick = (idx: number) => {
    if (showFeedback && isCorrect) return; // Already answered correctly
    setSelectedOption(idx);
    const correct = idx === q.correctIndex;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      // Move to next after a brief delay
      setTimeout(() => onAnswer(idx), 1200);
    }
  };

  const getOptionStyle = (i: number) => {
    if (!showFeedback || selectedOption === null) {
      return {
        borderColor: "hsl(0,0%,15%)",
        background: "hsl(220,25%,5%)",
      };
    }
    if (i === q.correctIndex && showFeedback) {
      return {
        borderColor: "hsl(142, 71%, 45%)",
        background: "hsl(142, 71%, 45%, 0.12)",
      };
    }
    if (i === selectedOption && !isCorrect) {
      return {
        borderColor: "hsl(0, 70%, 55%)",
        background: "hsl(0, 70%, 55%, 0.12)",
      };
    }
    return {
      borderColor: "hsl(0,0%,15%)",
      background: "hsl(220,25%,5%)",
    };
  };

  const getOptionTextColor = (i: number) => {
    if (!showFeedback) return "hsl(0,0%,80%)";
    if (i === q.correctIndex) return "hsl(142, 71%, 45%)";
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
          {MODULE_META[currentModule].label}
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
                  {showFeedback && i === q.correctIndex && <CheckCircle2 size={12} />}
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

        {/* Wrong answer feedback */}
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
                🏛️ <strong>RWA INSIGHT:</strong> {q.insight}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tell Me a Joke button */}
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

/* ------------------------------------------------------------------ */
/*  JOKE INTERLUDE                                                     */
/* ------------------------------------------------------------------ */

function JokeStep({ onBack }: { onBack: () => void }) {
  const [joke] = useState(() => getRandomRWAJoke());
  const [showPunchline, setShowPunchline] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 relative" style={{ background: PAGE_BG }}>
      <TMRWBranding />

      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-6xl mb-8">
        😄
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="text-xl md:text-2xl font-bold text-center max-w-lg leading-relaxed mb-8"
        style={{ color: "hsl(0,0%,90%)" }}>
        {joke.setup}
      </motion.p>

      {!showPunchline ? (
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          onClick={() => setShowPunchline(true)}
          className="px-8 py-3 text-sm font-bold tracking-[0.3em] uppercase border-2 transition-all hover:scale-105 rounded-full"
          style={{ borderColor: "hsl(40, 95%, 55%)", color: "hsl(40, 95%, 55%)" }}>
          😂 REVEAL PUNCHLINE
        </motion.button>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center">
          <p className="text-lg md:text-xl font-bold mb-8 max-w-lg" style={{ color: "hsl(40, 95%, 55%)" }}>
            {joke.punchline}
          </p>
          <button onClick={onBack}
            className="px-8 py-3 text-sm font-bold tracking-[0.3em] uppercase transition-all hover:scale-105"
            style={{ background: NEON, color: PAGE_BG }}>
            BACK TO ASSESSMENT →
          </button>
        </motion.div>
      )}

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: 1 }}
        className="absolute bottom-8 text-[10px] tracking-[0.15em] uppercase" style={{ color: "hsl(0,0%,40%)" }}>
        Your assessment progress is saved — we wouldn't joke about that
      </motion.p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  ANALYZING                                                          */
/* ------------------------------------------------------------------ */

function AnalyzingStep({ currentModule }: { currentModule: RWAModule }) {
  const [phase, setPhase] = useState(0);
  const color = MODULE_COLORS[currentModule];
  const phases = [
    "ANALYZING YOUR RWA KNOWLEDGE...",
    "CROSS-REFERENCING MARKET DATA...",
    "EVALUATING TOKENIZATION ACUMEN...",
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
          <Zap size={60} style={{ color }} />
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

/* ------------------------------------------------------------------ */
/*  RESULTS                                                            */
/* ------------------------------------------------------------------ */

function ResultsStep({ score, questions, answers, currentModule, onReview, onRetake, onNextModule, onContact, passed }: {
  score: number; questions: RWAQuestion[]; answers: (number | null)[];
  currentModule: RWAModule; onReview: () => void; onRetake: () => void;
  onNextModule: (() => void) | null; onContact: () => void; passed: boolean;
}) {
  const total = questions.length;
  const profile = getProfile(score, total, currentModule);
  const ProfileIcon = profile.icon;
  const [copied, setCopied] = useState(false);
  const pct = Math.round((score / total) * 100);
  const color = MODULE_COLORS[currentModule];

  const shareText = `I scored ${pct}% on The RWA Channel — ${MODULE_META[currentModule].label}. I'm a "${profile.title}." Think you can beat me? 🏛️`;
  const shareUrl = "https://tmrw-digital.com/rwa-channel";

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [shareText]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-start pt-16 md:pt-24 px-6 pb-20 relative" style={{ background: PAGE_BG }}>
      <TMRWBranding />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
        <span className="text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-sm font-bold" style={{ background: `${color}22`, color }}>
          {MODULE_META[currentModule].label}
        </span>
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "hsl(0,0%,50%)" }}>
        ASSESSMENT COMPLETE
      </motion.p>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="mb-6 px-4 py-2 rounded-sm text-xs font-bold tracking-[0.2em] uppercase"
        style={{ background: passed ? `${NEON}22` : "hsl(0,70%,55%,0.15)", color: passed ? NEON : "hsl(0,70%,55%)" }}>
        {passed ? "✓ MODULE PASSED — GRADUATED" : "✗ 70% REQUIRED TO GRADUATE"}
      </motion.div>

      {/* Score ring */}
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }} className="relative w-40 h-40 mb-6">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(0,0%,12%)" strokeWidth="4" />
          <motion.circle cx="50" cy="50" r="42" fill="none" stroke={profile.color} strokeWidth="4" strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 42}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - pct / 100) }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black" style={{ color: profile.color }}>{pct}%</span>
          <span className="text-[10px] tracking-[0.2em]" style={{ color: "hsl(0,0%,50%)" }}>{score}/{total}</span>
        </div>
      </motion.div>

      {/* Profile */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="text-center max-w-md">
        <div className="flex items-center justify-center gap-3 mb-3">
          <ProfileIcon size={24} style={{ color: profile.color }} />
          <h2 className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: profile.color }}>{profile.title}</h2>
        </div>
        <p className="text-sm leading-relaxed mb-8" style={{ color: "hsl(0,0%,65%)" }}>{profile.description}</p>
      </motion.div>

      {/* Review */}
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        onClick={onReview}
        className="px-6 py-3 text-xs tracking-[0.2em] uppercase mb-6 border transition-all hover:scale-105 flex items-center gap-2"
        style={{ borderColor: color, color }}>
        <BookOpen size={14} /> REVIEW ANSWERS & LEARN
      </motion.button>

      {/* Share */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="flex flex-wrap items-center justify-center gap-3 mb-10">
        <span className="text-[10px] tracking-[0.2em] uppercase mr-2" style={{ color: "hsl(0,0%,40%)" }}>SHARE</span>
        {[
          { label: "X", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}` },
          { label: "LINKEDIN", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
          { label: "WHATSAPP", href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}` },
        ].map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
            className="px-4 py-2 text-[10px] tracking-[0.15em] uppercase border transition-all hover:scale-105"
            style={{ borderColor: "hsl(0,0%,20%)", color: "hsl(0,0%,70%)" }}>
            {s.label}
          </a>
        ))}
        <button onClick={handleCopy}
          className="px-4 py-2 text-[10px] tracking-[0.15em] uppercase border transition-all hover:scale-105 flex items-center gap-1"
          style={{ borderColor: "hsl(0,0%,20%)", color: "hsl(0,0%,70%)" }}>
          {copied ? <Check size={10} /> : <Copy size={10} />} {copied ? "COPIED" : "COPY"}
        </button>
      </motion.div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4">
        {passed && onNextModule && (
          <button onClick={onNextModule}
            className="px-10 py-4 text-sm font-bold tracking-[0.3em] uppercase transition-all hover:scale-105"
            style={{ background: color, color: PAGE_BG }}>
            NEXT MODULE →
          </button>
        )}
        <button onClick={onRetake}
          className="px-10 py-4 text-sm font-bold tracking-[0.3em] uppercase border transition-all hover:scale-105"
          style={{ borderColor: "hsl(0,0%,20%)", color: "hsl(0,0%,60%)" }}>
          RETAKE
        </button>
        <button onClick={onContact}
          className="px-10 py-4 text-sm font-bold tracking-[0.3em] uppercase transition-all hover:scale-105"
          style={{ background: NEON, color: PAGE_BG }}>
          CONTACT US
        </button>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  ANSWER REVIEW                                                      */
/* ------------------------------------------------------------------ */

function ReviewStep({ questions, answers, currentModule, onBack }: {
  questions: RWAQuestion[]; answers: (number | null)[]; currentModule: RWAModule; onBack: () => void;
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
        ANSWER REVIEW 📘
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-xs tracking-[0.2em] uppercase mb-8" style={{ color }}>
        {MODULE_META[currentModule].label}
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
                        const isCorrect = oi === q.correctIndex;
                        const isUserChoice = oi === userAnswer;
                        let optColor = "hsl(0,0%,50%)";
                        let optBg = "transparent";
                        if (isCorrect) { optColor = NEON; optBg = `${NEON}11`; }
                        else if (isUserChoice && !isCorrect) { optColor = "hsl(0,70%,55%)"; optBg = "hsl(0,70%,55%,0.08)"; }

                        return (
                          <div key={oi} className="flex items-start gap-2 p-2 rounded-sm text-xs" style={{ background: optBg }}>
                            <span className="font-mono shrink-0 mt-px" style={{ color: optColor }}>{String.fromCharCode(65 + oi)}</span>
                            <span style={{ color: optColor }}>{opt}</span>
                            {isCorrect && <span className="ml-auto shrink-0 text-[10px] font-bold tracking-wider" style={{ color: NEON }}>✓ CORRECT</span>}
                            {isUserChoice && !isCorrect && <span className="ml-auto shrink-0 text-[10px] font-bold tracking-wider" style={{ color: "hsl(0,70%,55%)" }}>YOUR ANSWER</span>}
                          </div>
                        );
                      })}

                      <div className="mt-3 p-3 rounded-sm" style={{ background: `${color}08`, borderLeft: `3px solid ${color}` }}>
                        <p className="text-[10px] font-bold tracking-[0.15em] uppercase mb-1" style={{ color }}>🏛️ RWA INSIGHT</p>
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

/* ------------------------------------------------------------------ */
/*  CONTACT                                                            */
/* ------------------------------------------------------------------ */

function ContactStep({ onBack }: { onBack: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 relative" style={{ background: PAGE_BG }}>
      <TMRWBranding />
      <BackButton onClick={onBack} label="BACK TO RESULTS" />

      {!submitted ? (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-md">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-2" style={{ color: "hsl(0,0%,95%)" }}>
            READY TO<br /><span style={{ color: NEON }}>TOKENIZE?</span>
          </h2>
          <p className="text-xs tracking-[0.2em] uppercase mb-10" style={{ color: "hsl(0,0%,50%)" }}>
            Let's discuss how RWA tokenization can work for you.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
            {[
              { label: "YOUR NAME", type: "text", placeholder: "Full name" },
              { label: "EMAIL", type: "email", placeholder: "your@email.com" },
              { label: "COMPANY / PROJECT", type: "text", placeholder: "Company name" },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-[10px] tracking-[0.2em] uppercase block mb-2" style={{ color: "hsl(0,0%,45%)" }}>{field.label}</label>
                <input type={field.type} placeholder={field.placeholder} required
                  className="w-full p-4 text-sm border-b-2 bg-transparent outline-none transition-colors focus:border-[hsl(82,85%,55%)]"
                  style={{ borderColor: "hsl(0,0%,15%)", color: "hsl(0,0%,90%)" }} />
              </div>
            ))}
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase block mb-2" style={{ color: "hsl(0,0%,45%)" }}>YOUR INTEREST</label>
              <textarea placeholder="Tell us about your RWA tokenization goals..." rows={3}
                className="w-full p-4 text-sm border-b-2 bg-transparent outline-none resize-none transition-colors focus:border-[hsl(82,85%,55%)]"
                style={{ borderColor: "hsl(0,0%,15%)", color: "hsl(0,0%,90%)" }} />
            </div>
            <button type="submit" className="w-full py-4 text-sm font-bold tracking-[0.3em] uppercase transition-all hover:scale-[1.02]"
              style={{ background: NEON, color: PAGE_BG }}>
              SEND MESSAGE
            </button>
          </form>
        </motion.div>
      ) : (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <Sparkles size={48} style={{ color: NEON }} className="mx-auto mb-6" />
          <h2 className="text-3xl font-black tracking-tight mb-3" style={{ color: "hsl(0,0%,95%)" }}>MESSAGE SENT 🏛️</h2>
          <p className="text-sm" style={{ color: "hsl(0,0%,50%)" }}>We'll be in touch about your RWA strategy.</p>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */

const RWAChannel = () => {
  const [step, setStep] = useState<Step>("landing");
  const [identity, setIdentity] = useState("");
  const [currentModule, setCurrentModule] = useState<RWAModule>("student");
  const [questions, setQuestions] = useState<RWAQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [score, setScore] = useState(0);
  const [completedModules, setCompletedModules] = useState<Record<RWAModule, { passed: boolean; score: number; total: number } | null>>({
    student: null, expert: null, titan: null,
  });

  const startModule = useCallback((m: RWAModule) => {
    const picked = pickRWAQuestions(m, MODULE_META[m].questions);
    setCurrentModule(m);
    setQuestions(picked);
    setAnswers(Array(picked.length).fill(null));
    setQuestionIndex(0);
    setScore(0);
    setStep("assessment");
  }, []);

  const handleAnswer = useCallback((optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (questionIndex < questions.length - 1) {
        setQuestionIndex((prev) => prev + 1);
      } else {
        const finalScore = newAnswers.reduce((acc, a, i) => acc + (a === questions[i].correctIndex ? 1 : 0), 0);
        setScore(finalScore);
        const pct = finalScore / questions.length;
        const passed = pct >= 0.7;
        setCompletedModules((prev) => ({ ...prev, [currentModule]: { passed, score: finalScore, total: questions.length } }));
        setStep("analyzing");
        setTimeout(() => setStep("results"), 5000);
      }
    }, 400);
  }, [answers, questionIndex, questions, currentModule]);

  const handleAssessmentBack = useCallback(() => {
    if (questionIndex > 0) setQuestionIndex((prev) => prev - 1);
    else setStep("modules");
  }, [questionIndex]);

  const passed = score / (questions.length || 1) >= 0.7;
  const nextModuleMap: Record<RWAModule, RWAModule | null> = { student: "expert", expert: "titan", titan: null };
  const nextModule = nextModuleMap[currentModule];

  return (
    <>
      <SEOHead
        title="The RWA Channel — Real-World Asset Intelligence Assessment"
        description="Test your knowledge of real-world asset tokenization across 3 progressive modules. From RWA Student to RWA Titan — prove your expertise with The Tomorrow Company."
        path="/rwa-channel"
      />
      <Navbar />
      <div className="overflow-hidden pt-16 lg:pt-20" style={{ background: PAGE_BG }}>
        <AnimatePresence mode="wait">
          {step === "landing" && <LandingStep key="landing" onEnter={() => setStep("identify")} />}
          {step === "identify" && (
            <IdentifyStep key="identify" onSelect={(id) => { setIdentity(id); setStep("modules"); }} onBack={() => setStep("landing")} />
          )}
          {step === "modules" && (
            <ModulesStep key="modules" onSelect={startModule} onBack={() => setStep("identify")} completedModules={completedModules} />
          )}
          {step === "assessment" && questions.length > 0 && (
            <AssessmentStep key={`assess-${questionIndex}`} questions={questions} questionIndex={questionIndex}
              answers={answers} onAnswer={handleAnswer} onBack={handleAssessmentBack} currentModule={currentModule}
              onJoke={() => setStep("joke")} />
          )}
          {step === "joke" && <JokeStep key="joke" onBack={() => setStep("assessment")} />}
          {step === "analyzing" && <AnalyzingStep key="analyzing" currentModule={currentModule} />}
          {step === "results" && (
            <ResultsStep key="results" score={score} questions={questions} answers={answers}
              currentModule={currentModule} passed={passed}
              onReview={() => setStep("review")}
              onRetake={() => startModule(currentModule)}
              onNextModule={passed && nextModule ? () => startModule(nextModule) : null}
              onContact={() => setStep("contact")} />
          )}
          {step === "review" && (
            <ReviewStep key="review" questions={questions} answers={answers}
              currentModule={currentModule} onBack={() => setStep("results")} />
          )}
          {step === "contact" && <ContactStep key="contact" onBack={() => setStep("results")} />}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
};

export default RWAChannel;
