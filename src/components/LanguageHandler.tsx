import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SUPPORTED_LANGUAGES, getUrlLanguage, getBasePath } from "@/hooks/useLanguage";

function getCookieDomains(): string[] {
  const hostname = window.location.hostname;
  const hostParts = hostname.split(".");
  const rootDomain = hostParts.length > 2 ? hostParts.slice(-2).join(".") : hostname;

  return Array.from(new Set([
    hostname,
    `.${hostname}`,
    rootDomain,
    `.${rootDomain}`,
    `www.${rootDomain}`,
    `.www.${rootDomain}`,
    "",
  ]));
}

/**
 * Aggressively remove ALL googtrans cookies across every domain/path variant.
 */
function clearGoogleTranslateCookies() {
  const expiry = "expires=Thu, 01 Jan 1970 00:00:00 GMT";

  for (const domain of getCookieDomains()) {
    const d = domain ? `;domain=${domain}` : "";
    document.cookie = `googtrans=;${expiry};path=/${d}`;
    document.cookie = `googtrans=;${expiry}${d}`;
  }

  document.cookie = `googtrans=;${expiry}`;
  document.cookie = `googtrans=;${expiry};path=/`;
}

/**
 * Set googtrans cookie for a target language.
 * Always writes exactly one normalized value after clearing stale variants.
 */
function setGoogleTranslateCookie(lang: string) {
  const requested = (lang || "").trim().toLowerCase();
  const normalized =
    SUPPORTED_LANGUAGES.find((value) => value.toLowerCase() === requested) || "en";

  clearGoogleTranslateCookies();

  const cookieValue = `googtrans=/en/${normalized};path=/`;
  for (const domain of getCookieDomains()) {
    const d = domain ? `;domain=${domain}` : "";
    document.cookie = `${cookieValue}${d}`;
  }

  // Host-only fallback
  document.cookie = cookieValue;
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

/**
 * Calls GTranslate's native doGTranslate function, retrying until available.
 * Retries are cancelable via isActive to avoid stale route sync races.
 */
function callDoGTranslate(langPair: string, isActive: () => boolean, retries = 30) {
  const tryCall = (attempt: number) => {
    if (!isActive()) return;

    const doGT = (window as any).doGTranslate;
    if (typeof doGT === "function") {
      doGT(langPair);
    } else if (attempt < retries) {
      window.setTimeout(() => tryCall(attempt + 1), 300);
    }
  };

  tryCall(0);
}

/**
 * Reset the hidden GTranslate <select> widget to English.
 */
function resetWidgetToEnglish() {
  const select = document.querySelector(".gtranslate_wrapper select") as HTMLSelectElement | null;
  if (!select) return;

  const enOption = Array.from(select.options).find(
    (opt) => normalizeLanguageValue(opt.value).toLowerCase() === "en"
  );

  if (enOption && select.value !== enOption.value) {
    select.value = enOption.value;
    select.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

const LanguageHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isProgrammatic = useRef(false);
  const syncRunIdRef = useRef(0);
  const pathnameRef = useRef(location.pathname);
  pathnameRef.current = location.pathname;

  const urlLang = getUrlLanguage(location.pathname);

  // Sync: URL → cookie → GTranslate widget on every route change
  useEffect(() => {
    const runId = ++syncRunIdRef.current;
    const isActiveRun = () => syncRunIdRef.current === runId;

    isProgrammatic.current = true;

    let releaseProgrammaticMs = 1500;
    let cleanupRootSync: (() => void) | undefined;

    if (urlLang && urlLang !== "en") {
      // ─── Non-English route ───
      setGoogleTranslateCookie(urlLang);
      callDoGTranslate(`en|${urlLang.toLowerCase()}`, isActiveRun);
    } else {
      // ─── English / root route ───
      // Force a clean English state (cookie + widget + native call)
      const enforceEnglishSync = () => {
        if (!isActiveRun()) return;
        setGoogleTranslateCookie("en");
        resetWidgetToEnglish();
      };

      setGoogleTranslateCookie("en");
      callDoGTranslate("en|en", isActiveRun);
      enforceEnglishSync();

      // Watchdog: keep enforcing English while GTranslate initializes
      let attempts = 0;
      const maxAttempts = 16;
      const intervalId = window.setInterval(() => {
        if (!isActiveRun()) {
          window.clearInterval(intervalId);
          return;
        }

        enforceEnglishSync();
        attempts += 1;
        if (attempts >= maxAttempts) window.clearInterval(intervalId);
      }, 350);

      const onLoad = () => {
        if (!isActiveRun()) return;
        enforceEnglishSync();
        callDoGTranslate("en|en", isActiveRun, 2);
      };
      window.addEventListener("load", onLoad);

      releaseProgrammaticMs = 5600;
      cleanupRootSync = () => {
        window.clearInterval(intervalId);
        window.removeEventListener("load", onLoad);
      };
    }

    const timer = window.setTimeout(() => {
      if (!isActiveRun()) return;
      isProgrammatic.current = false;
    }, releaseProgrammaticMs);

    return () => {
      if (syncRunIdRef.current === runId) syncRunIdRef.current += 1;
      window.clearTimeout(timer);
      cleanupRootSync?.();
    };
  }, [urlLang, location.pathname]);

  // Listen: GTranslate's hidden dropdown change → update URL
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
