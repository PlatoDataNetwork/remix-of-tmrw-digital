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

function setWidgetLanguage(lang: string) {
  const select = document.querySelector(".gtranslate_wrapper select") as HTMLSelectElement | null;
  if (!select) return;

  const normalizedTarget = (lang || "en").toLowerCase();
  const targetOption = Array.from(select.options).find(
    (opt) => normalizeLanguageValue(opt.value).toLowerCase() === normalizedTarget
  );

  if (targetOption && select.value !== targetOption.value) {
    select.value = targetOption.value;
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
    const maxAttempts = desiredLang.toLowerCase() === "en" ? 14 : 10;
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
    }, 1800);

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

      const selectedLang = normalizeLanguageValue(currentSelect.value).toLowerCase();
      const normalized =
        SUPPORTED_LANGUAGES.find((lang) => lang.toLowerCase() === selectedLang) || "en";

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
