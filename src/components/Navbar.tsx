import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import ChatNavbarIcon from "./ChatNavbarIcon";
import LanguageSelector from "./LanguageSelector";
import { useCurrentLanguage, langPath } from "@/hooks/useLanguage";
import platoIcon from "@/assets/plato-icon.png";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Web3AI", href: "/#web3ai" },
  { label: "RWAs", href: "/#rwas" },
  { label: "Intelligence", href: "/intel" },
  { label: "Team", href: "/#team" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentLang = useCurrentLanguage();

  const lp = useCallback((path: string) => langPath(currentLang, path), [currentLang]);

  // Keep GTranslate widget hidden but functional
  useEffect(() => {
    const widget = document.getElementById("gtranslate-widget");
    if (widget) {
      widget.style.position = "fixed";
      widget.style.top = "-9999px";
      widget.style.left = "-9999px";
      widget.style.zIndex = "-1";
    }
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("/#")) {
        e.preventDefault();
        const id = href.slice(2);
        const homePath = currentLang === "en" ? "/" : `/${currentLang}`;
        const isHome =
          location.pathname === "/" ||
          location.pathname === homePath ||
          location.pathname === `${homePath}/`;
        if (isHome) {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        } else {
          navigate(homePath, { state: { scrollTo: id } });
        }
        setMobileOpen(false);
      }
    },
    [location.pathname, navigate, currentLang]
  );

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[hsl(220,20%,4%,0.9)] border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to={lp("/")} className="flex items-center gap-2 shrink-0">
              <div
                className="h-8 w-8 animated-gradient-icon-bright"
                style={{
                  WebkitMaskImage: `url(${platoIcon})`,
                  maskImage: `url(${platoIcon})`,
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  opacity: 1,
                }}
              />
              <span
                className="notranslate text-lg lg:text-xl font-bold tracking-tight text-white"
                translate="no"
              >
                <span className="sm:hidden">The Tomorrow<br />Company</span>
                <span className="hidden sm:inline">The Tomorrow Company</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) =>
                link.href.startsWith("/#") ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={lp(link.href)}
                    className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-3">
              <ChatNavbarIcon />
              <ThemeToggle />
              <LanguageSelector />
              <Link
                to={lp("/investors")}
                className="hidden lg:inline-flex h-9 px-5 items-center justify-center rounded-full bg-gradient-to-r from-[hsl(260,80%,55%)] to-[hsl(220,90%,55%)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Investors
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-1.5 text-white"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay + Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-[70] w-[80vw] max-w-sm bg-[hsl(220,20%,4%)] border-l border-white/10 flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-end px-4 py-3">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 text-white/60 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Nav links */}
              <div className="px-6 space-y-1 flex-1 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.3, ease: "easeOut" }}
                  >
                    {link.href.startsWith("/#") ? (
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="block py-3 text-lg font-light text-white/80 hover:text-white transition-colors border-b border-white/5"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={lp(link.href)}
                        onClick={() => setMobileOpen(false)}
                        className="block py-3 text-lg font-light text-white/80 hover:text-white transition-colors border-b border-white/5"
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}

                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + navLinks.length * 0.06, duration: 0.3, ease: "easeOut" }}
                >
                  <Link
                    to={lp("/investors")}
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex h-10 px-6 items-center justify-center rounded-full bg-gradient-to-r from-[hsl(260,80%,55%)] to-[hsl(220,90%,55%)] text-white text-sm font-medium mt-6"
                  >
                    Investors
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
