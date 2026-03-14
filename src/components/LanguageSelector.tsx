import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Globe } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { SUPPORTED_LANGUAGES, getBasePath, getUrlLanguage } from "@/hooks/useLanguage";
import { setGoogleTranslateCookie } from "./LanguageHandler";
...
  const handleSelect = (code: string) => {
    setOpen(false);

    const basePath = getBasePath(location.pathname);

    if (code.toLowerCase() === "en") {
      setGoogleTranslateCookie("en");
      navigate(basePath || "/", { replace: true });
    } else {
      // Switch to target language: set cookie, navigate, then GTranslate will sync via LanguageHandler
      const normalized =
        SUPPORTED_LANGUAGES.find((l) => l.toLowerCase() === code.toLowerCase()) || code;
      setGoogleTranslateCookie(normalized);
      navigate(`/${normalized}${basePath === "/" ? "" : basePath}`, { replace: true });
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
