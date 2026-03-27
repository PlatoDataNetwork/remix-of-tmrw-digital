import { motion } from "framer-motion";
import { PAGE_BG, IDENTITIES } from "./constants";
import { TMRWBranding, BackButton } from "./SharedUI";

export function IdentifyStep({ onSelect, onBack }: { onSelect: (identity: string) => void; onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 relative" style={{ background: PAGE_BG }}>
      <TMRWBranding />
      <BackButton onClick={onBack} />
      <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-2xl md:text-4xl font-black tracking-tight mb-2" style={{ color: "hsl(0,0%,95%)" }}>
        IDENTIFY YOURSELF ™
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="text-xs md:text-sm tracking-[0.2em] uppercase mb-12" style={{ color: "hsl(0,0%,50%)" }}>
        Choose wisely — your brand reputation is at stake
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
        {IDENTITIES.map((id, i) => (
          <motion.button key={id.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }} onClick={() => onSelect(id.label)}
            className="text-left p-6 border transition-all duration-300 hover:scale-[1.02] group"
            style={{ borderColor: "hsl(0,0%,15%)", background: "hsl(220,25%,5%)" }}>
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
