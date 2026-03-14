import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SUPPORTED_LANGUAGES, getUrlLanguage, getBasePath } from "@/hooks/useLanguage";

function clearGoogleTranslateCookies() {
  const hostname = window.location.hostname;
  const expiry = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  const domains = [hostname, "." + hostname, ".www." + hostname, ""];
  const paths = ["/", ""];
  for (const domain of domains) {
    for (const path of paths) {
      const d = domain ? `;domain=${domain}` : "";
      const p = path ? `;path=${path}` : "";
      document.cookie = `googtrans=;${expiry}${d}${p}`;
    }
  }
  document.cookie = `googtrans=;${expiry}`;
}

function setGoogleTranslateCookie(lang: string) {
  clearGoogleTranslateCookies();
  if (lang && lang !== "en") {
    const value = `/en/${lang}`;
    document.cookie = `googtrans=${value};path=/`;
  }
}

function normalizeLanguageValue(value: string): string {
  const raw = (value || "").trim();
  if (!raw) return "";
  if (raw.includes("|")) {
    const parts = raw.split("|").filter(Boolean);
    return (parts[parts.length - 1] || "").trim();
  }
  if (raw.includes("/")) {
    const parts = raw.split("/").filter(Boolean);
    return (parts[parts.length - 1] || "").trim();
  }
  return raw;
}

function callDoGTranslate(langPair: string, retries = 30) {
  const tryCall = (attempt: number) => {
    const doGT = (window as any).doGTranslate;
    if (typeof doGT === "function") {
      doGT(langPair);
    } else if (attempt < retries) {
      setTimeout(() => tryCall(attempt + 1), 300);
    }
  };
  tryCall(0);
}

const LanguageHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isProgrammatic = useRef(false);
  const pathnameRef = useRef(location.pathname);
  pathnameRef.current = location.pathname;

  const urlLang = getUrlLanguage(location.pathname);

  // Sync: URL → cookie → GTranslate widget on every route change
  useEffect(() => {
    isProgrammatic.current = true;

    if (urlLang && urlLang !== "en") {
      setGoogleTranslateCookie(urlLang);
      callDoGTranslate(`en|${urlLang.toLowerCase()}`);
    } else {
      // Root domain or English — nuke ALL cookies and reset GTranslate
      clearGoogleTranslateCookies();
      callDoGTranslate("en|en");
    }

    // Give GTranslate time to process before allowing user-initiated changes
    const timer = setTimeout(() => { isProgrammatic.current = false; }, 1500);
    return () => clearTimeout(timer);
  }, [urlLang, location.pathname]);

  // Listen: GTranslate's hidden dropdown change → update URL
  // This catches when someone interacts with the native GTranslate widget directly
  useEffect(() => {
    let currentSelect: HTMLSelectElement | null = null;

    const handleChange = () => {
      if (isProgrammatic.current) return;
      if (!currentSelect) return;

      const selectedLang = normalizeLanguageValue(currentSelect.value).toLowerCase();
      if (!selectedLang) return;

      const basePath = getBasePath(pathnameRef.current);

      if (selectedLang === "en") {
        clearGoogleTranslateCookies();
        navigate(basePath || "/", { replace: true });
      } else {
        const normalized =
          SUPPORTED_LANGUAGES.find((l) => l.toLowerCase() === selectedLang) || selectedLang;
        setGoogleTranslateCookie(normalized);
        navigate(`/${normalized}${basePath === "/" ? "" : basePath}`, { replace: true });
      }
    };

    const attach = () => {
      const el = document.querySelector(".gtranslate_wrapper select") as HTMLSelectElement | null;
      if (el && el !== currentSelect) {
        if (currentSelect) currentSelect.removeEventListener("change", handleChange);
        currentSelect = el;
        currentSelect.addEventListener("change", handleChange);
      }
    };

    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      if (currentSelect) currentSelect.removeEventListener("change", handleChange);
    };
  }, [navigate]);

  return null;
};

export { clearGoogleTranslateCookies, setGoogleTranslateCookie };
export default LanguageHandler;
