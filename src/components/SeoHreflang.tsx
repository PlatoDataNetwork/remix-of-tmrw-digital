import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { SUPPORTED_LANGUAGES, getBasePath, getUrlLanguage } from "@/hooks/useLanguage";

const SITE_URL = "https://www.tmrw-digital.com";

const hreflangCode = (code: string): string => {
  const map: Record<string, string> = {
    "zh-CN": "zh-Hans",
    "iw": "he",
    "no": "nb",
  };
  return map[code] || code;
};

/**
 * Injects canonical + hreflang link tags for every supported language.
 * Drop this component into any page layout for full i18n SEO coverage.
 */
const SeoHreflang = () => {
  const location = useLocation();
  const urlLang = getUrlLanguage(location.pathname);
  const currentLang = urlLang || "en";
  const basePath = getBasePath(location.pathname);

  const canonicalUrl =
    currentLang === "en"
      ? `${SITE_URL}${basePath}`
      : `${SITE_URL}/${currentLang}${basePath === "/" ? "" : basePath}`;

  const allLangs = ["en", ...SUPPORTED_LANGUAGES.filter((l) => l !== "en")];

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
      <html lang={currentLang} />
      {allLangs.map((lang) => {
        const href =
          lang === "en"
            ? `${SITE_URL}${basePath}`
            : `${SITE_URL}/${lang}${basePath === "/" ? "" : basePath}`;
        return (
          <link
            key={lang}
            rel="alternate"
            hrefLang={hreflangCode(lang)}
            href={href}
          />
        );
      })}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${SITE_URL}${basePath}`}
      />
    </Helmet>
  );
};

export default SeoHreflang;
