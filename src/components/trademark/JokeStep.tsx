import { useState } from "react";
import { motion } from "framer-motion";
import { PAGE_BG, NEON } from "./constants";
import { TMRWBranding } from "./SharedUI";
import { getRandomTMJoke } from "@/data/trademark-questions";

export function JokeStep({ onBack }: { onBack: () => void }) {
  const [joke] = useState(() => getRandomTMJoke());
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
