import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Copy, Check, Shield, Scale, Sparkles, Target, Crown, BookOpen } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import platoIcon from "@/assets/plato-icon.webp";
import { type Difficulty, type Question, pickQuestions, DIFFICULTY_META, QUESTION_BANK } from "@/data/trademark-questions";

/* ------------------------------------------------------------------ */
/*  PROFILES                                                           */
/* ------------------------------------------------------------------ */

interface ProfileResult {
  title: string;
  icon: typeof Shield;
  description: string;
  color: string;
}

const PROFILES: ProfileResult[] = [
  {
    title: "TRADEMARK ROOKIE",
    icon: BookOpen,
    description: "You're just getting started on your brand protection journey. The good news? Every trademark titan started here. Time to level up.",
    color: "hsl(0, 70%, 55%)",
  },
  {
    title: "BRAND AWARE",
    icon: Target,
    description: "You know the basics, but there are gaps a competitor could exploit. Your brand deserves sharper armor.",
    color: "hsl(35, 90%, 55%)",
  },
  {
    title: "IP STRATEGIST",
    icon: Scale,
    description: "Solid understanding of trademark fundamentals. You're thinking about brand protection the right way — now it's time to execute.",
    color: "hsl(200, 80%, 55%)",
  },
  {
    title: "TRADEMARK TITAN",
    icon: Crown,
    description: "You're operating at elite level. You understand the nuances that separate protected brands from vulnerable ones. Relani would be impressed.",
    color: "hsl(82, 85%, 55%)",
  },
];

function getProfile(score: number, total: number): ProfileResult {
  const pct = score / total;
  if (pct <= 0.3) return PROFILES[0];
  if (pct <= 0.5) return PROFILES[1];
  if (pct <= 0.7) return PROFILES[2];
  return PROFILES[3];
}

type Step = "landing" | "identify" | "difficulty" | "assessment" | "analyzing" | "results" | "contact";

/* ------------------------------------------------------------------ */
/*  BRANDING                                                           */
/* ------------------------------------------------------------------ */

function TMRWBranding() {
  return (
    <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 z-30">
      <div
        className="h-5 w-5 shrink-0"
        style={{
          background: "hsl(82, 85%, 55%)",
          WebkitMaskImage: `url(${platoIcon})`,
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskImage: `url(${platoIcon})`,
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "center",
        }}
      />
      <span className="text-[10px] font-light tracking-[0.2em] uppercase" style={{ color: "hsl(0,0%,50%)" }}>
        TMRW <span style={{ color: "hsl(0,0%,30%)" }}>|</span> W3AI
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

const PAGE_BG = "hsl(220, 20%, 4%)";
const NEON = "hsl(82, 85%, 55%)";

/* ------------------------------------------------------------------ */
/*  STEP COMPONENTS                                                    */
/* ------------------------------------------------------------------ */

function LandingStep({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-start justify-center px-8 md:px-16 lg:px-24 relative"
      style={{ background: PAGE_BG }}
    >
      <TMRWBranding />
      <div className="absolute top-0 left-0 z-10 pointer-events-none">
        <div className="w-px h-16" style={{ backgroundImage: `linear-gradient(to bottom, ${NEON}99, transparent)` }} />
        <div className="absolute top-0 left-0 w-16 h-px" style={{ backgroundImage: `linear-gradient(to right, ${NEON}99, transparent)` }} />
      </div>

      <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter" style={{ color: NEON }}>
          THE<br />TRADEMARK<br />CHANNEL
          <sup className="text-lg md:text-2xl align-super ml-1" style={{ color: `${NEON}99` }}>™</sup>
        </h1>
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="mt-6 text-sm md:text-base tracking-[0.3em] uppercase font-light" style={{ color: "hsl(0,0%,50%)" }}>
        Trademark Intelligence Assessment
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
        onClick={onEnter}
        className="mt-12 px-10 py-4 text-sm font-bold tracking-[0.4em] uppercase border-2 transition-all duration-300 hover:scale-105"
        style={{ color: PAGE_BG, background: NEON, borderColor: NEON }}
      >
        ENTER
      </motion.button>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-8 md:left-16 text-[10px] tracking-[0.2em] uppercase" style={{ color: "hsl(0,0%,40%)" }}>
        Powered by The Trademark Channel &amp; TMRW Digital
      </motion.p>
    </motion.div>
  );
}

const IDENTITIES = [
  { label: "BRAND OWNER", desc: "I need to protect my brand and IP" },
  { label: "STARTUP FOUNDER", desc: "Building something — need to know my rights" },
  { label: "ATTORNEY / IP PRO", desc: "Let's see how sharp I really am" },
  { label: "JUST CURIOUS", desc: "I want to learn about trademarks" },
];

function IdentifyStep({ onSelect, onBack }: { onSelect: (identity: string) => void; onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 relative" style={{ background: PAGE_BG }}>
      <TMRWBranding />
      <BackButton onClick={onBack} />

      <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-2xl md:text-4xl font-black tracking-tight mb-2" style={{ color: "hsl(0,0%,95%)" }}>
        IDENTIFY YOURSELF
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="text-xs md:text-sm tracking-[0.2em] uppercase mb-12" style={{ color: "hsl(0,0%,50%)" }}>
        A 3-minute trademark intelligence assessment
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
        {IDENTITIES.map((id, i) => (
          <motion.button key={id.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }} onClick={() => onSelect(id.label)}
            className="text-left p-6 border transition-all duration-300 hover:scale-[1.02] group"
            style={{ borderColor: "hsl(0,0%,15%)", background: "hsl(220,20%,6%)" }}>
            <span className="text-sm font-bold tracking-[0.15em] block mb-1 transition-colors duration-300 group-hover:text-[hsl(82,85%,55%)]" style={{ color: "hsl(0,0%,90%)" }}>
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
/*  DIFFICULTY SELECTOR                                                */
/* ------------------------------------------------------------------ */

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  beginner: "hsl(82, 85%, 55%)",
  intermediate: "hsl(35, 90%, 55%)",
  expert: "hsl(0, 70%, 60%)",
};

function DifficultyStep({ onSelect, onBack }: { onSelect: (d: Difficulty) => void; onBack: () => void }) {
  const difficulties: Difficulty[] = ["beginner", "intermediate", "expert"];

  return (
    <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 relative" style={{ background: PAGE_BG }}>
      <TMRWBranding />
      <BackButton onClick={onBack} />

      <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-2xl md:text-4xl font-black tracking-tight mb-2" style={{ color: "hsl(0,0%,95%)" }}>
        CHOOSE YOUR LEVEL
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="text-xs md:text-sm tracking-[0.2em] uppercase mb-12" style={{ color: "hsl(0,0%,50%)" }}>
        How deep does your trademark knowledge go?
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
        {difficulties.map((d, i) => {
          const meta = DIFFICULTY_META[d];
          const color = DIFFICULTY_COLORS[d];
          const available = QUESTION_BANK[d].length;
          return (
            <motion.button
              key={d}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.12 }}
              onClick={() => onSelect(d)}
              className="text-left p-6 border transition-all duration-300 hover:scale-[1.03] group relative overflow-hidden"
              style={{ borderColor: "hsl(0,0%,15%)", background: "hsl(220,20%,6%)" }}
            >
              {/* Color accent top bar */}
              <div className="absolute top-0 left-0 w-full h-1 transition-all duration-300 opacity-40 group-hover:opacity-100" style={{ background: color }} />

              <span className="text-2xl block mb-3">{meta.icon}</span>
              <span className="text-sm font-bold tracking-[0.15em] block mb-1 transition-colors duration-300" style={{ color }}>
                {meta.label}
              </span>
              <span className="text-xs block mb-3" style={{ color: "hsl(0,0%,50%)" }}>{meta.desc}</span>
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

/* ------------------------------------------------------------------ */
/*  ASSESSMENT                                                         */
/* ------------------------------------------------------------------ */

function AssessmentStep({
  questions,
  questionIndex,
  answers,
  onAnswer,
  onBack,
  difficulty,
}: {
  questions: Question[];
  questionIndex: number;
  answers: (number | null)[];
  onAnswer: (optionIndex: number) => void;
  onBack: () => void;
  difficulty: Difficulty;
}) {
  const q = questions[questionIndex];
  const total = questions.length;
  const progress = ((questionIndex + 1) / total) * 100;
  const diffColor = DIFFICULTY_COLORS[difficulty];

  return (
    <motion.div
      key={`q-${questionIndex}`}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 relative"
      style={{ background: PAGE_BG }}
    >
      <TMRWBranding />
      <BackButton onClick={onBack} />

      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 z-20">
        <motion.div className="h-full" style={{ background: diffColor }} initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
      </div>

      {/* Counter + difficulty badge */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <span className="text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-sm font-bold" style={{ background: `${diffColor}22`, color: diffColor }}>
          {DIFFICULTY_META[difficulty].label}
        </span>
        <span className="text-xs tracking-[0.3em] font-mono" style={{ color: "hsl(0,0%,40%)" }}>
          {String(questionIndex + 1).padStart(2, "0")} / {total}
        </span>
      </div>

      <div className="w-full max-w-2xl">
        <motion.h3 key={`q-text-${questionIndex}`} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="text-xl md:text-3xl font-bold tracking-tight mb-10 leading-snug" style={{ color: "hsl(0,0%,95%)" }}>
          {q.question}
        </motion.h3>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            const selected = answers[questionIndex] === i;
            return (
              <motion.button key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }} onClick={() => onAnswer(i)}
                className="w-full text-left p-5 border transition-all duration-200 hover:scale-[1.01] group flex items-start gap-4"
                style={{
                  borderColor: selected ? diffColor : "hsl(0,0%,15%)",
                  background: selected ? `${diffColor}14` : "hsl(220,20%,6%)",
                }}>
                <span className="text-[10px] font-mono tracking-wider mt-0.5 shrink-0" style={{ color: selected ? diffColor : "hsl(0,0%,40%)" }}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm md:text-base transition-colors duration-200" style={{ color: selected ? diffColor : "hsl(0,0%,80%)" }}>
                  {opt}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  ANALYZING                                                          */
/* ------------------------------------------------------------------ */

function AnalyzingStep({ difficulty }: { difficulty: Difficulty }) {
  const [phase, setPhase] = useState(0);
  const diffColor = DIFFICULTY_COLORS[difficulty];
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
          className="absolute rounded-full" style={{ background: diffColor, width: 120, height: 120, top: -30, left: -30 }} />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="relative z-10">
          <Shield size={60} style={{ color: diffColor }} />
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.p key={phase} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          className="text-xs md:text-sm tracking-[0.3em] font-mono" style={{ color: diffColor }}>
          {phases[phase]}
        </motion.p>
      </AnimatePresence>

      <div className="flex gap-2 mt-8">
        {phases.map((_, i) => (
          <motion.div key={i} className="w-2 h-2 rounded-full" animate={{ background: i <= phase ? diffColor : "hsl(0,0%,20%)" }} />
        ))}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  RESULTS                                                            */
/* ------------------------------------------------------------------ */

function ResultsStep({
  score,
  questions,
  answers,
  difficulty,
  onContact,
  onRetake,
}: {
  score: number;
  questions: Question[];
  answers: (number | null)[];
  difficulty: Difficulty;
  onContact: () => void;
  onRetake: () => void;
}) {
  const total = questions.length;
  const profile = getProfile(score, total);
  const ProfileIcon = profile.icon;
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const pct = Math.round((score / total) * 100);
  const diffColor = DIFFICULTY_COLORS[difficulty];

  const shareText = `I scored ${pct}% on The Trademark Channel's ${DIFFICULTY_META[difficulty].label} IP Assessment — I'm a "${profile.title}." Think you can beat me?`;
  const shareUrl = "https://tmrw-digital.com/trademark-channel";

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [shareText]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-start pt-16 md:pt-24 px-6 pb-20 relative" style={{ background: PAGE_BG }}>
      <TMRWBranding />

      {/* Difficulty badge */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
        <span className="text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-sm font-bold" style={{ background: `${diffColor}22`, color: diffColor }}>
          {DIFFICULTY_META[difficulty].label} LEVEL
        </span>
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "hsl(0,0%,50%)" }}>
        YOUR RESULTS ARE READY
      </motion.p>

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

      {/* Breakdown toggle */}
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        onClick={() => setShowDetails(!showDetails)}
        className="text-xs tracking-[0.2em] uppercase mb-6 transition-colors" style={{ color: NEON }}>
        {showDetails ? "HIDE BREAKDOWN" : "VIEW BREAKDOWN"}
      </motion.button>

      <AnimatePresence>
        {showDetails && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="w-full max-w-2xl overflow-hidden mb-8">
            <div className="space-y-3">
              {questions.map((q, i) => {
                const correct = answers[i] === q.correctIndex;
                return (
                  <div key={q.id} className="p-4 border" style={{ borderColor: "hsl(0,0%,12%)", background: "hsl(220,20%,6%)" }}>
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-mono mt-1 shrink-0" style={{ color: correct ? NEON : "hsl(0,70%,55%)" }}>
                        {correct ? "✓" : "✗"}
                      </span>
                      <div>
                        <p className="text-sm mb-1" style={{ color: "hsl(0,0%,85%)" }}>{q.question}</p>
                        <p className="text-xs" style={{ color: "hsl(0,0%,45%)" }}>
                          {correct ? "Correct" : `Your answer: ${q.options[answers[i] ?? 0]}`}
                          {!correct && <span style={{ color: NEON }}> → {q.options[q.correctIndex]}</span>}
                        </p>
                        <p className="text-xs mt-1 italic" style={{ color: "hsl(0,0%,38%)" }}>{q.insight}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
        <button onClick={onContact}
          className="px-10 py-4 text-sm font-bold tracking-[0.3em] uppercase transition-all hover:scale-105"
          style={{ background: NEON, color: PAGE_BG }}>
          PROTECT YOUR BRAND
        </button>
        <button onClick={onRetake}
          className="px-10 py-4 text-sm font-bold tracking-[0.3em] uppercase border transition-all hover:scale-105"
          style={{ borderColor: "hsl(0,0%,20%)", color: "hsl(0,0%,60%)" }}>
          RETAKE
        </button>
      </div>
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
            READY TO<br /><span style={{ color: NEON }}>PROTECT?</span>
          </h2>
          <p className="text-xs tracking-[0.2em] uppercase mb-10" style={{ color: "hsl(0,0%,50%)" }}>
            Your brand matters. We're here to tell you why.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
            {[
              { label: "YOUR NAME", type: "text", placeholder: "Full name" },
              { label: "EMAIL", type: "email", placeholder: "your@email.com" },
              { label: "YOUR BRAND / COMPANY", type: "text", placeholder: "Company name" },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-[10px] tracking-[0.2em] uppercase block mb-2" style={{ color: "hsl(0,0%,45%)" }}>{field.label}</label>
                <input type={field.type} placeholder={field.placeholder} required
                  className="w-full p-4 text-sm border-b-2 bg-transparent outline-none transition-colors focus:border-[hsl(82,85%,55%)]"
                  style={{ borderColor: "hsl(0,0%,15%)", color: "hsl(0,0%,90%)" }} />
              </div>
            ))}
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase block mb-2" style={{ color: "hsl(0,0%,45%)" }}>WHAT DO YOU NEED?</label>
              <textarea placeholder="Tell us about your brand protection needs..." rows={3}
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
          <h2 className="text-3xl font-black tracking-tight mb-3" style={{ color: "hsl(0,0%,95%)" }}>MESSAGE SENT</h2>
          <p className="text-sm" style={{ color: "hsl(0,0%,50%)" }}>We'll be in touch. Your brand is in good hands.</p>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */

const TrademarkChannel = () => {
  const [step, setStep] = useState<Step>("landing");
  const [identity, setIdentity] = useState<string>("");
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [score, setScore] = useState(0);

  const startAssessment = useCallback((d: Difficulty) => {
    const picked = pickQuestions(d, DIFFICULTY_META[d].questions);
    setDifficulty(d);
    setQuestions(picked);
    setAnswers(Array(picked.length).fill(null));
    setQuestionIndex(0);
    setScore(0);
    setStep("assessment");
  }, []);

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      const newAnswers = [...answers];
      newAnswers[questionIndex] = optionIndex;
      setAnswers(newAnswers);

      setTimeout(() => {
        if (questionIndex < questions.length - 1) {
          setQuestionIndex((prev) => prev + 1);
        } else {
          const finalScore = newAnswers.reduce(
            (acc, a, i) => acc + (a === questions[i].correctIndex ? 1 : 0), 0
          );
          setScore(finalScore);
          setStep("analyzing");
          setTimeout(() => setStep("results"), 5000);
        }
      }, 400);
    },
    [answers, questionIndex, questions]
  );

  const handleRetake = useCallback(() => {
    setStep("difficulty");
  }, []);

  const handleAssessmentBack = useCallback(() => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
    } else {
      setStep("difficulty");
    }
  }, [questionIndex]);

  return (
    <>
      <SEOHead
        title="The Trademark Channel — IP Intelligence Assessment"
        description="Test your trademark knowledge with The Trademark Channel's intelligence assessment. Choose beginner, intermediate, or expert difficulty. Discover your Trademark IQ."
        path="/trademark-channel"
      />
      <div className="overflow-hidden" style={{ background: PAGE_BG }}>
        <AnimatePresence mode="wait">
          {step === "landing" && <LandingStep key="landing" onEnter={() => setStep("identify")} />}
          {step === "identify" && (
            <IdentifyStep key="identify"
              onSelect={(id) => { setIdentity(id); setStep("difficulty"); }}
              onBack={() => setStep("landing")} />
          )}
          {step === "difficulty" && (
            <DifficultyStep key="difficulty"
              onSelect={startAssessment}
              onBack={() => setStep("identify")} />
          )}
          {step === "assessment" && questions.length > 0 && (
            <AssessmentStep key={`assessment-${questionIndex}`}
              questions={questions} questionIndex={questionIndex} answers={answers}
              onAnswer={handleAnswer} onBack={handleAssessmentBack} difficulty={difficulty} />
          )}
          {step === "analyzing" && <AnalyzingStep key="analyzing" difficulty={difficulty} />}
          {step === "results" && (
            <ResultsStep key="results" score={score} questions={questions} answers={answers}
              difficulty={difficulty} onContact={() => setStep("contact")} onRetake={handleRetake} />
          )}
          {step === "contact" && <ContactStep key="contact" onBack={() => setStep("results")} />}
        </AnimatePresence>
      </div>
    </>
  );
};

export default TrademarkChannel;
