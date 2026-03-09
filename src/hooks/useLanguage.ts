import { useLocation } from "react-router-dom";

export const SUPPORTED_LANGUAGES = [
  "en","ar","bn","zh-CN","da","nl","et","fi","fr","de","el","iw","hi","hu",
  "id","it","ja","km","ko","no","fa","pl","pt","pa","ro","ru","sl","es","sv",
  "th","tr","uk","ur","vi"
];

export function getUrlLanguage(pathname: string): string | undefined {
  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0];
  return SUPPORTED_LANGUAGES.find(l => l.toLowerCase() === first?.toLowerCase());
}

export function getBasePath(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0];
  const hasLang = SUPPORTED_LANGUAGES.find(l => l.toLowerCase() === first?.toLowerCase());
  if (hasLang) {
    const rest = parts.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}

export function langPath(lang: string, path: string): string {
  if (!lang || lang === "en") return path;
  if (path === "/") return `/${lang}`;
  return `/${lang}${path}`;
}

export function useCurrentLanguage(): string {
  const location = useLocation();
  const lang = getUrlLanguage(location.pathname);
  return lang || "en";
}

export function getGoogTransLang(): string | null {
  const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
  return match ? match[1] : null;
}
