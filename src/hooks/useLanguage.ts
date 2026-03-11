import { useLocation } from "react-router-dom";

export const SUPPORTED_LANGUAGES = [
  "en","ar","bn","zh-CN","da","nl","et","fi","fr","de","el","iw","hi","hu",
  "id","it","ja","km","ko","ms","no","fa","pl","pt","pa","ro","ru","sl","es","sv",
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
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/i);
  if (!match?.[1]) return null;

  let rawValue = match[1].trim();
  try {
    rawValue = decodeURIComponent(rawValue).trim();
  } catch {
    // keep raw value if decode fails
  }
  if (!rawValue) return null;

  // Supports values like /en/bn or /en|bn and always returns the target language (last segment)
  const pipeSegments = rawValue.split("|").filter(Boolean);
  const pipeTail = pipeSegments[pipeSegments.length - 1] || "";
  const slashSegments = pipeTail.split("/").filter(Boolean);
  const lang = (slashSegments[slashSegments.length - 1] || pipeTail || "").trim();

  return lang || null;
}
