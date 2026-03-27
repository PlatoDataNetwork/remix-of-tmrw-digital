import { motion } from "framer-motion";
import { PAGE_BG, NEON } from "./constants";
import { TMRWBranding } from "./SharedUI";

export function LandingStep({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-start justify-center px-8 md:px-16 lg:px-24 relative" style={{ background: PAGE_BG }}>
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
        className="mt-6 text-sm md:text-base tracking-[0.3em] uppercase font-light italic" style={{ color: "hsl(0,0%,50%)" }}>
        "Protect Your Brand Before Someone Else Does"
      </motion.p>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
        className="mt-2 text-xs tracking-[0.15em] uppercase" style={{ color: "hsl(0,0%,35%)" }}>
        3 Modules · 60 Questions · Jokes Included · Your Brand Depends on It
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
        className="flex flex-wrap gap-4 mt-12">
        <button onClick={onEnter}
          className="px-10 py-4 text-sm font-bold tracking-[0.4em] uppercase border-2 transition-all duration-300 hover:scale-105"
          style={{ color: PAGE_BG, background: NEON, borderColor: NEON, boxShadow: `0 0 24px ${NEON}33` }}>
          ENTER
        </button>
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-8 md:left-16 text-xs tracking-[0.15em] uppercase text-white">
        Powered by The Tomorrow Company &amp; TMRW Digital
      </motion.p>
    </motion.div>
  );
}
