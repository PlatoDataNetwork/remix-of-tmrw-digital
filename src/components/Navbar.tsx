import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import ChatNavbarIcon from "./ChatNavbarIcon";
import { clearGoogleTranslateCookies } from "./LanguageHandler";
import platoIcon from "@/assets/plato-icon.png";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Web3AI", href: "/#web3ai" },
  { label: "RWAs", href: "/#rwas" },
  { label: "Intelligence", href: "/intel" },
  { label: "Showcase", href: "/showcase" },
  { label: "Team", href: "/#team" },
  { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const gtranslateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slot = gtranslateRef.current;
    const widget = document.getElementById("gtranslate-widget");
    if (slot && widget) {
      widget.style.position = "static";
      widget.style.top = "auto";
      widget.style.left = "auto";
      widget.style.zIndex = "auto";
      slot.appendChild(widget);
    }

    // Add listener to clean cookies before language switch
    const handleLangChange = () => {
      clearGoogleTranslateCookies();
    };
    const select = widget?.querySelector("select");
    if (select) {
      select.addEventListener("mousedown", handleLangChange);
    }

    return () => {
      if (select) {
        select.removeEventListener("mousedown", handleLangChange);
      }
      if (widget && document.body) {
        widget.style.position = "fixed";
        widget.style.top = "-9999px";
        widget.style.left = "-9999px";
        document.body.appendChild(widget);
      }
    };
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.slice(2);
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/", { state: { scrollTo: id } });
      }
      setMobileOpen(false);
    }
  }, [location.pathname, navigate]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[hsl(220,20%,4%,0.9)] border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div
              className="h-8 w-8 animated-gradient-icon-bright"
              style={{
                WebkitMaskImage: `url(${platoIcon})`,
                maskImage: `url(${platoIcon})`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                opacity: 1,
              }}
            />
            <span className="text-lg lg:text-xl font-bold tracking-tight text-white">
              The Tomorrow Company
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
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
                  to={link.href}
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ChatNavbarIcon />
            <ThemeToggle />
            <div ref={gtranslateRef} className="gtranslate-navbar-slot" />
            <Link
              to="/investors"
              className="hidden md:inline-flex h-9 px-5 items-center justify-center rounded-full bg-gradient-to-r from-[hsl(260,80%,55%)] to-[hsl(220,90%,55%)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Investors
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-[hsl(220,20%,4%,0.95)] backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                link.href.startsWith("/#") ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block text-lg font-medium text-white hover:text-white/60 transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-lg font-medium text-white hover:text-white/60 transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <Link
                to="/investors"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 px-6 items-center justify-center rounded-full bg-gradient-to-r from-[hsl(260,80%,55%)] to-[hsl(220,90%,55%)] text-white text-sm font-medium mt-2"
              >
                Investors
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
