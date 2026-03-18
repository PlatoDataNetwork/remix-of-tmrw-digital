import { Moon, Sun, Palette } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Theme = "light" | "dark" | "colorful";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("colorful");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "colorful");
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "colorful") {
      root.classList.add("colorful");
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.add("colorful");
  }, []);

  const cycleTheme = () => {
    setTheme((prev) => {
      if (prev === "dark") return "light";
      if (prev === "light") return "colorful";
      return "dark";
    });
  };

  const icon = theme === "dark" ? Moon : theme === "light" ? Sun : Palette;
  const Icon = icon;

  return (
    <button
      onClick={cycleTheme}
      className="relative p-2 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ rotate: -90, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex items-center justify-center"
        >
          <Icon className={`h-4 w-4 ${theme === "colorful" ? "text-purple-400" : "text-white"}`} />
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
