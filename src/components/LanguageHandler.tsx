import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SUPPORTED_LANGUAGES, getUrlLanguage, getBasePath } from "@/hooks/useLanguage";

function clearGoogleTranslateCookies() {
  const hostname = window.location.hostname;
  const expiry = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  // Clear every possible domain/path combination to remove ALL googtrans cookies
  const domains = [hostname, "." + hostname, ""];
  const paths = ["/", ""];
  for (const domain of domains) {
    for (const path of paths) {
      const d = domain ? `;domain=${domain}` : "";
      const p = path ? `;path=${path}` : "";
      document.cookie = `googtrans=;${expiry}${d}${p}`;
    }
  }
  // Also try without any path/domain at all
  document.cookie = `googtrans=;${expiry}`;
}

function setGoogleTranslateCookie(lang: string) {
  // Always nuke ALL existing cookies first to prevent duplicates
  clearGoogleTranslateCookies();
  if (lang && lang !== "en") {
    const value = `/en/${lang}`;
    // Only set ONE cookie on the current path
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

const LanguageHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isProgrammatic = useRef(false);
  const pathnameRef = useRef(location.pathname);
  pathnameRef.current = location.pathname;

  const urlLang = getUrlLanguage(location.pathname);

  // Force GTranslate to re-translate by toggling the select value
  const forceTranslate = (lang: string, retries = 20) => {
    const targetLang = normalizeLanguageValue(lang).toLowerCase();

    const tryForce = (attempt: number) => {
      const select = document.querySelector(".gtranslate_wrapper select") as HTMLSelectElement | null;
      if (!select) {
        if (attempt < retries) setTimeout(() => tryForce(attempt + 1), 300);
        return;
      }

      const options = Array.from(select.options);
      const matchOption = options.find(
        (o) => normalizeLanguageValue(o.value).toLowerCase() === targetLang
      );
      if (!matchOption) return;

      isProgrammatic.current = true;

      if (targetLang === "en") {
        // Reset to English
        const enOption = options.find(o => normalizeLanguageValue(o.value).toLowerCase() === "en");
        if (enOption && select.value !== enOption.value) {
          select.value = enOption.value;
          select.dispatchEvent(new Event("change", { bubbles: true }));
        }
      } else {
        // First reset to English, then switch to target language
        // This forces GTranslate to re-translate even if the value looks the same
        const enOption = options.find(o => normalizeLanguageValue(o.value).toLowerCase() === "en");
        if (enOption) {
          select.value = enOption.value;
          select.dispatchEvent(new Event("change", { bubbles: true }));
        }
        // Then switch to target after a brief delay
        setTimeout(() => {
          select.value = matchOption.value;
          select.dispatchEvent(new Event("change", { bubbles: true }));
          setTimeout(() => { isProgrammatic.current = false; }, 800);
        }, 100);
        return; // Don't reset isProgrammatic yet
      }

      setTimeout(() => { isProgrammatic.current = false; }, 800);
    };
    tryForce(0);
  };

  // Sync: URL → cookie → GTranslate widget on every route change
  useEffect(() => {
    if (urlLang && urlLang !== "en") {
      setGoogleTranslateCookie(urlLang);
      forceTranslate(urlLang);
    } else {
      clearGoogleTranslateCookies();
      forceTranslate("en");
    }
  }, [urlLang, location.pathname]);

  // Listen: GTranslate dropdown change → update URL
  useEffect(() => {
    let currentSelect: HTMLSelectElement | null = null;

    const handleChange = (e: Event) => {
      if (isProgrammatic.current) return;
      const select = e.target as HTMLSelectElement;
      const selectedLang = normalizeLanguageValue(select.value).toLowerCase();
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
