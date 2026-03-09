import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SUPPORTED_LANGUAGES, getUrlLanguage, getBasePath, getGoogTransLang } from "@/hooks/useLanguage";

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

const LanguageHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isProgrammatic = useRef(false);
  const pathnameRef = useRef(location.pathname);
  pathnameRef.current = location.pathname;

  const urlLang = getUrlLanguage(location.pathname);

  // Sync: URL → cookie → GTranslate widget
  useEffect(() => {
    if (urlLang && urlLang !== "en") {
      // URL has language prefix - set cookie and trigger translation
      setGoogleTranslateCookie(urlLang);
      const select = document.querySelector(".gtranslate_wrapper select") as HTMLSelectElement | null;
      if (select && select.value.toLowerCase() !== urlLang.toLowerCase()) {
        isProgrammatic.current = true;
        select.value = urlLang;
        select.dispatchEvent(new Event("change", { bubbles: true }));
        setTimeout(() => { isProgrammatic.current = false; }, 500);
      }
    } else if (location.pathname === "/" || location.pathname === "") {
      // Root path - clear cookies, force English
      clearGoogleTranslateCookies();
      const select = document.querySelector(".gtranslate_wrapper select") as HTMLSelectElement | null;
      if (select && select.value !== "en") {
        isProgrammatic.current = true;
        select.value = "en";
        select.dispatchEvent(new Event("change", { bubbles: true }));
        setTimeout(() => { isProgrammatic.current = false; }, 500);
      }
    } else {
      // Non-root, no prefix - check cookie for redirect
      const cookieLang = getGoogTransLang();
      if (cookieLang && cookieLang !== "en") {
        const normalized = SUPPORTED_LANGUAGES.find(l => l.toLowerCase() === cookieLang.toLowerCase());
        if (normalized) {
          navigate(`/${normalized}${location.pathname}`, { replace: true });
          return;
        }
      }
      // No cookie or English
      clearGoogleTranslateCookies();
      const select = document.querySelector(".gtranslate_wrapper select") as HTMLSelectElement | null;
      if (select && select.value !== "en") {
        isProgrammatic.current = true;
        select.value = "en";
        select.dispatchEvent(new Event("change", { bubbles: true }));
        setTimeout(() => { isProgrammatic.current = false; }, 500);
      }
    }
  }, [urlLang, location.pathname, navigate]);

  // Listen: GTranslate dropdown change → update URL
  useEffect(() => {
    let currentSelect: HTMLSelectElement | null = null;

    const handleChange = (e: Event) => {
      if (isProgrammatic.current) return;
      const select = e.target as HTMLSelectElement;
      const newLang = select.value;

      const basePath = getBasePath(pathnameRef.current);

      if (newLang === "en") {
        clearGoogleTranslateCookies();
        navigate(basePath || "/", { replace: true });
      } else {
        const normalized = SUPPORTED_LANGUAGES.find(l => l.toLowerCase() === newLang.toLowerCase()) || newLang;
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
