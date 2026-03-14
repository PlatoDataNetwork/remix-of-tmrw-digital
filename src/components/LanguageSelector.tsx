import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Globe } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { SUPPORTED_LANGUAGES, getBasePath, getUrlLanguage } from "@/hooks/useLanguage";
import { setGoogleTranslateCookie } from "./LanguageHandler";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ar", label: "Arabic" },
  { code: "bn", label: "Bengali" },
  { code: "zh-CN", label: "Chinese" },
  { code: "da", label: "Danish" },
  { code: "nl", label: "Dutch" },
  { code: "et", label: "Estonian" },
  { code: "fi", label: "Finnish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "el", label: "Greek" },
  { code: "iw", label: "Hebrew" },
  { code: "hi", label: "Hindi" },
  { code: "hu", label: "Hungarian" },
  { code: "id", label: "Indonesian" },
  { code: "it", label: "Italian" },
  { code: "ja", label: "Japanese" },
  { code: "km", label: "Khmer" },
  { code: "ko", label: "Korean" },
  { code: "ms", label: "Malay" },
  { code: "no", label: "Norwegian" },
  { code: "fa", label: "Persian" },
  { code: "pl", label: "Polish" },
  { code: "pt", label: "Portuguese" },
  { code: "pa", label: "Punjabi" },
  { code: "ro", label: "Romanian" },
  { code: "ru", label: "Russian" },
  { code: "sl", label: "Slovenian" },
  { code: "es", label: "Spanish" },
  { code: "sv", label: "Swedish" },
  { code: "th", label: "Thai" },
  { code: "tr", label: "Turkish" },
  { code: "uk", label: "Ukrainian" },
  { code: "ur", label: "Urdu" },
  { code: "vi", label: "Vietnamese" },
];

const LanguageSelector = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const urlLang = getUrlLanguage(location.pathname);
  const currentLang = urlLang || "en";

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (code: string) => {
    setOpen(false);

    const normalized =
      SUPPORTED_LANGUAGES.find((lang) => lang.toLowerCase() === code.toLowerCase()) || "en";

    const basePath = getBasePath(location.pathname);
    const targetPath =
      normalized.toLowerCase() === "en"
        ? basePath || "/"
        : `/${normalized}${basePath === "/" ? "" : basePath}`;

    setGoogleTranslateCookie(normalized);
    window.location.replace(`${targetPath}${location.search}${location.hash}`);
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
            className="absolute right-0 top-full mt-2 w-52 max-h-72 overflow-y-auto rounded-xl border border-white/10 bg-[hsl(220,20%,8%)] backdrop-blur-xl shadow-2xl z-[100] notranslate"
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
