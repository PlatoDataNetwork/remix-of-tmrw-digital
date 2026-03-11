import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCurrentLanguage } from "@/hooks/useLanguage";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
  { code: "bn", label: "বাংলা" },
  { code: "zh-CN", label: "中文" },
  { code: "da", label: "Dansk" },
  { code: "nl", label: "Nederlands" },
  { code: "et", label: "Eesti" },
  { code: "fi", label: "Suomi" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "el", label: "Ελληνικά" },
  { code: "iw", label: "עברית" },
  { code: "hi", label: "हिन्दी" },
  { code: "hu", label: "Magyar" },
  { code: "id", label: "Indonesia" },
  { code: "it", label: "Italiano" },
  { code: "ja", label: "日本語" },
  { code: "km", label: "ខ្មែរ" },
  { code: "ko", label: "한국어" },
  { code: "ms", label: "Bahasa Melayu" },
  { code: "no", label: "Norsk" },
  { code: "fa", label: "فارسی" },
  { code: "pl", label: "Polski" },
  { code: "pt", label: "Português" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "ro", label: "Română" },
  { code: "ru", label: "Русский" },
  { code: "sl", label: "Slovenščina" },
  { code: "es", label: "Español" },
  { code: "sv", label: "Svenska" },
  { code: "th", label: "ไทย" },
  { code: "tr", label: "Türkçe" },
  { code: "uk", label: "Українська" },
  { code: "ur", label: "اردو" },
  { code: "vi", label: "Tiếng Việt" },
];

const LanguageSelector = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const currentLang = useCurrentLanguage();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (code: string) => {
    setOpen(false);
    // Trigger GTranslate's hidden select
    const select = document.querySelector(".gtranslate_wrapper select") as HTMLSelectElement | null;
    if (!select) return;
    const options = Array.from(select.options);
    const match = options.find(
      (o) => o.value.toLowerCase().includes(code.toLowerCase())
    );
    if (match) {
      select.value = match.value;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="h-9 w-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4 text-white" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-52 max-h-72 overflow-y-auto rounded-xl border border-white/10 bg-[hsl(220,20%,8%)] backdrop-blur-xl shadow-2xl z-[100]"
          >
            <div className="py-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    currentLang.toLowerCase() === lang.code.toLowerCase()
                      ? "bg-white/15 text-white font-medium"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {lang.label}
                  {currentLang.toLowerCase() === lang.code.toLowerCase() && (
                    <span className="ml-2 text-xs opacity-60">✓</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
