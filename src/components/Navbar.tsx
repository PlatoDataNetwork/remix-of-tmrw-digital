import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import logoIcon from "@/assets/logo-icon.jpeg";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Web3 AI", href: "#web3ai" },
  
  { label: "RWAs", href: "#rwas" },
  { label: "News", href: "#news" },
  
  { label: "Contact", href: "#contact" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <a href="/" className="flex items-center gap-2">
            <img src={logoIcon} alt="Tomorrow logo" className="h-8 w-8 rounded-full object-cover" />
            <span className="text-lg lg:text-xl font-bold tracking-tight animated-gradient-text">
              The Tomorrow Company
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#investors"
              className="hidden md:inline-flex h-9 px-5 items-center justify-center rounded-full bg-white text-[hsl(220,20%,4%)] text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Investors
            </a>
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
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-lg font-medium text-white hover:text-white/60 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#investors"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 px-6 items-center justify-center rounded-full bg-white text-[hsl(220,20%,4%)] text-sm font-medium mt-2"
              >
                Investors
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
