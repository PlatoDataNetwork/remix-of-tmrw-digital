import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Copy, Check, BookOpen } from "lucide-react";
import { type TrademarkModule, type TrademarkQuestion, TM_MODULE_META } from "@/data/trademark-questions";
import { PAGE_BG, NEON, MODULE_COLORS, getProfile } from "./constants";
import { TMRWBranding } from "./SharedUI";

export function ResultsStep({ score, questions, answers, currentModule, onReview, onRetake, onNextModule, onContact, passed }: {
  score: number; questions: TrademarkQuestion[]; answers: (number | null)[];
  currentModule: TrademarkModule; onReview: () => void; onRetake: () => void;
  onNextModule: (() => void) | null; onContact: () => void; passed: boolean;
}) {
  const total = questions.length;
  const profile = getProfile(score, total, currentModule);
  const ProfileIcon = profile.icon;
  const [copied, setCopied] = useState(false);
  const pct = Math.round((score / total) * 100);
  const color = MODULE_COLORS[currentModule];

  const shareText = `I scored ${pct}% on The Trademark Channel — ${TM_MODULE_META[currentModule].label}. I'm a "${profile.title}." Think you can beat me? ™`;
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

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
        <span className="text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-sm font-bold" style={{ background: `${color}22`, color }}>
          {TM_MODULE_META[currentModule].label}
        </span>
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "hsl(0,0%,50%)" }}>
        YOUR RESULTS ARE READY
      </motion.p>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="mb-6 px-4 py-2 rounded-sm text-xs font-bold tracking-[0.2em] uppercase"
        style={{ background: passed ? `${NEON}22` : "hsl(0,70%,55%,0.15)", color: passed ? NEON : "hsl(0,70%,55%)" }}>
        {passed ? "✓ MODULE PASSED — GRADUATED" : "✗ 70% REQUIRED TO GRADUATE"}
      </motion.div>

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

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="text-center max-w-md">
        <div className="flex items-center justify-center gap-3 mb-3">
          <ProfileIcon size={24} style={{ color: profile.color }} />
          <h2 className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: profile.color }}>{profile.title}</h2>
        </div>
        <p className="text-sm leading-relaxed mb-8" style={{ color: "hsl(0,0%,65%)" }}>{profile.description}</p>
      </motion.div>

      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        onClick={onReview}
        className="px-6 py-3 text-xs tracking-[0.2em] uppercase mb-6 border transition-all hover:scale-105 flex items-center gap-2"
        style={{ borderColor: color, color }}>
        <BookOpen size={14} /> REVIEW ANSWERS & LEARN
      </motion.button>

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
          PROTECT YOUR BRAND
        </button>
      </div>
    </motion.div>
  );
}
