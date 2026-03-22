import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SUPPORTED_LANGUAGES, getUrlLanguage, getBasePath } from "@/hooks/useLanguage";

function getCookieDomains(): string[] {
  const hostname = window.location.hostname;
  const hostParts = hostname.split(".");
  const rootDomain = hostParts.length > 2 ? hostParts.slice(-2).join(".") : hostname;

  return Array.from(
    new Set([hostname, `.${hostname}`, rootDomain, `.${rootDomain}`, `www.${rootDomain}`, `.${`www.${rootDomain}`}`, ""])
  );
}

const LANGUAGE_ENTRIES = [
  ["en", "English"],
  ["ar", "Arabic"],
  ["bn", "Bengali"],
  ["zh-CN", "Chinese (Simplified)"],
  ["da", "Danish"],
  ["nl", "Dutch"],
  ["et", "Estonian"],
  ["fi", "Finnish"],
  ["fr", "French"],
  ["de", "German"],
  ["el", "Greek"],
  ["iw", "Hebrew"],
  ["hi", "Hindi"],
  ["hu", "Hungarian"],
  ["id", "Indonesian"],
  ["it", "Italian"],
  ["ja", "Japanese"],
  ["km", "Khmer"],
  ["ko", "Korean"],
  ["ms", "Malay"],
  ["no", "Norwegian"],
  ["fa", "Persian"],
  ["pl", "Polish"],
  ["pt", "Portuguese"],
  ["pa", "Punjabi"],
  ["ro", "Romanian"],
  ["ru", "Russian"],
  ["sl", "Slovenian"],
  ["es", "Spanish"],
  ["sv", "Swedish"],
  ["th", "Thai"],
  ["tr", "Turkish"],
  ["uk", "Ukrainian"],
  ["ur", "Urdu"],
  ["vi", "Vietnamese"],
] as const;

function normalizeLanguageName(value: string): string {
  return (value || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
}

const LANGUAGE_NAME_TO_CODE = new Map(
  LANGUAGE_ENTRIES.map(([code, name]) => [normalizeLanguageName(name), code.toLowerCase()])
);

function clearGoogleTranslateCookies() {
  const expiry = "expires=Thu, 01 Jan 1970 00:00:00 GMT";

  for (const domain of getCookieDomains()) {
    const domainPart = domain ? `;domain=${domain}` : "";
    document.cookie = `googtrans=;${expiry};path=/${domainPart}`;
    document.cookie = `googtrans=;${expiry}${domainPart}`;
  }

  document.cookie = `googtrans=;${expiry}`;
  document.cookie = `googtrans=;${expiry};path=/`;
}

function setGoogleTranslateCookie(lang: string) {
  const requested = (lang || "").trim().toLowerCase();
  const normalized =
    SUPPORTED_LANGUAGES.find((value) => value.toLowerCase() === requested) || "en";

  clearGoogleTranslateCookies();

  // Set a single host-only cookie to avoid conflicting multi-domain values.
  document.cookie = `googtrans=/en/${normalized};path=/`;
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

function resolveLanguageCode(rawValue: string, optionText?: string): string {
  const parsedValue = normalizeLanguageValue(rawValue).toLowerCase();
  const fromValue = SUPPORTED_LANGUAGES.find((lang) => lang.toLowerCase() === parsedValue);
  if (fromValue) return fromValue;

  const fromName = LANGUAGE_NAME_TO_CODE.get(normalizeLanguageName(optionText || rawValue));
  return fromName || "en";
}

function setWidgetLanguage(lang: string) {
  const select = document.querySelector(".gtranslate_wrapper select") as HTMLSelectElement | null;
  if (!select) return;

  const normalizedTarget = (lang || "en").toLowerCase();
  const targetOption = Array.from(select.options).find((opt) => {
    const byValue = resolveLanguageCode(opt.value);
    if (byValue.toLowerCase() === normalizedTarget) return true;

    const optionText = (opt.textContent || opt.label || "").trim();
    const byText = resolveLanguageCode("", optionText);
    return byText.toLowerCase() === normalizedTarget;
  });

  if (!targetOption) return;

  const isAlreadySelected =
    select.value === targetOption.value ||
    select.selectedIndex === Array.from(select.options).indexOf(targetOption);

  if (!isAlreadySelected) {
    select.value = targetOption.value;
    select.selectedIndex = Array.from(select.options).indexOf(targetOption);
    select.dispatchEvent(new Event("input", { bubbles: true }));
    select.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

function callDoGTranslate(targetLang: string, isActive: () => boolean, retries = 25) {
  const normalizedTarget = (targetLang || "en").toLowerCase();

  const tryCall = (attempt: number) => {
    if (!isActive()) return;

    const doGT = (window as any).doGTranslate;
    if (typeof doGT === "function") {
      if (normalizedTarget === "en") {
        doGT("auto|en");
        window.setTimeout(() => {
          if (!isActive()) return;
          const latestDoGT = (window as any).doGTranslate;
          if (typeof latestDoGT === "function") latestDoGT("en|en");
        }, 120);
      } else {
        doGT(`en|${normalizedTarget}`);
      }
      return;
    }

    if (attempt < retries) {
      window.setTimeout(() => tryCall(attempt + 1), 250);
    }
  };

  tryCall(0);
}

const LanguageHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isProgrammatic = useRef(false);
  const syncRunIdRef = useRef(0);
  const pathnameRef = useRef(location.pathname);
  pathnameRef.current = location.pathname;

  const urlLang = getUrlLanguage(location.pathname);
  const desiredLang = urlLang || "en";

  // Sync URL language into cookie + GTranslate runtime for every route change.
  useEffect(() => {
    const runId = ++syncRunIdRef.current;
    const isActiveRun = () => syncRunIdRef.current === runId;

    isProgrammatic.current = true;

    setGoogleTranslateCookie(desiredLang);
    callDoGTranslate(desiredLang, isActiveRun);

    let attempts = 0;
    const maxAttempts = desiredLang.toLowerCase() === "en" ? 20 : 40;
    const widgetInterval = window.setInterval(() => {
      if (!isActiveRun()) {
        window.clearInterval(widgetInterval);
        return;
      }

      setWidgetLanguage(desiredLang);
      attempts += 1;
      if (attempts >= maxAttempts) window.clearInterval(widgetInterval);
    }, 250);

    const releaseProgrammaticTimer = window.setTimeout(() => {
      if (!isActiveRun()) return;
      isProgrammatic.current = false;
    }, 5000);

    return () => {
      if (syncRunIdRef.current === runId) syncRunIdRef.current += 1;
      window.clearInterval(widgetInterval);
      window.clearTimeout(releaseProgrammaticTimer);
    };
  }, [desiredLang, location.pathname]);

  // Sync hidden GTranslate select changes back to URL.
  useEffect(() => {
    let currentSelect: HTMLSelectElement | null = null;

    const handleChange = () => {
      if (isProgrammatic.current) return;
      if (!currentSelect) return;

      const selectedOptionText =
        currentSelect.options[currentSelect.selectedIndex]?.textContent ||
        currentSelect.options[currentSelect.selectedIndex]?.label ||
        "";
      const normalized = resolveLanguageCode(currentSelect.value, selectedOptionText);

      const basePath = getBasePath(pathnameRef.current);
      const nextPath =
        normalized.toLowerCase() === "en"
          ? basePath || "/"
          : `/${normalized}${basePath === "/" ? "" : basePath}`;

      setGoogleTranslateCookie(normalized);
      navigate(nextPath, { replace: true });
    };

    const attach = () => {
      const select = document.querySelector(".gtranslate_wrapper select") as HTMLSelectElement | null;
      if (select && select !== currentSelect) {
        if (currentSelect) currentSelect.removeEventListener("change", handleChange);
        currentSelect = select;
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
