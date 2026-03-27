import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { PAGE_BG, NEON } from "./constants";
import { TMRWBranding, BackButton } from "./SharedUI";

export function ContactStep({ onBack }: { onBack: () => void }) {
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
                  className="w-full p-4 text-sm border-b-2 bg-transparent outline-none transition-colors"
                  style={{ borderColor: "hsl(0,0%,15%)", color: "hsl(0,0%,90%)" }} />
              </div>
            ))}
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase block mb-2" style={{ color: "hsl(0,0%,45%)" }}>WHAT DO YOU NEED?</label>
              <textarea placeholder="Tell us about your brand protection needs..." rows={3}
                className="w-full p-4 text-sm border-b-2 bg-transparent outline-none resize-none transition-colors"
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
          <h2 className="text-3xl font-black tracking-tight mb-3" style={{ color: "hsl(0,0%,95%)" }}>MESSAGE SENT ™</h2>
          <p className="text-sm" style={{ color: "hsl(0,0%,50%)" }}>We'll be in touch. Your brand is in good hands.</p>
        </motion.div>
      )}
    </motion.div>
  );
}
