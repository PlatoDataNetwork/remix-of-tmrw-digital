import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SUPPORTED_LANGUAGES = [
  "en","ar","bn","zh-CN","da","nl","et","fi","fr","de","el","iw","hi","hu",
  "id","it","ja","km","ko","no","fa","pl","pt","pa","ro","ru","sl","es","sv",
  "th","tr","uk","ur","vi"
];

function clearGoogleTranslateCookies() {
  // Clear googtrans cookie on all possible paths/domains
  const domains = [window.location.hostname, "." + window.location.hostname, ""];
  const paths = ["/", ""];
  for (const domain of domains) {
    for (const path of paths) {
      const domainPart = domain ? `;domain=${domain}` : "";
      const pathPart = path ? `;path=${path}` : "";
      document.cookie = `googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT${domainPart}${pathPart}`;
    }
  }
}

function setGoogleTranslateCookie(lang: string) {
  clearGoogleTranslateCookies();
  if (lang && lang !== "en") {
    const value = `/en/${lang}`;
    document.cookie = `googtrans=${value};path=/`;
    document.cookie = `googtrans=${value};path=/;domain=${window.location.hostname}`;
  }
}

function triggerGTranslateChange(lang: string) {
  // Try to programmatically change the GTranslate select dropdown
  const select = document.querySelector(".gtranslate_wrapper select") as HTMLSelectElement | null;
  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

const LanguageHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const pathParts = location.pathname.split("/").filter(Boolean);
    const firstSegment = pathParts[0]?.toLowerCase();

    // Check if the first path segment is a supported language code
    const matchedLang = SUPPORTED_LANGUAGES.find(
      (l) => l.toLowerCase() === firstSegment
    );

    if (matchedLang) {
      // Set translation cookie and trigger translation
      setGoogleTranslateCookie(matchedLang);

      // Remove the language prefix from the URL and navigate
      const remainingPath = "/" + pathParts.slice(1).join("/");
      navigate(remainingPath || "/", { replace: true });

      // Trigger GTranslate after a short delay to allow DOM update
      setTimeout(() => {
        triggerGTranslateChange(matchedLang);
      }, 500);
    }
  }, [location.pathname, navigate]);

  return null;
};

export { clearGoogleTranslateCookies, setGoogleTranslateCookie };
export default LanguageHandler;
