import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ['"Tomorrow"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        "chapter-number": "hsl(var(--chapter-number))",
        highlight: "hsl(var(--highlight))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "hero-colorize": {
          "0%": { background: "linear-gradient(135deg, hsla(0,80%,50%,0.35) 0%, hsla(330,70%,55%,0.2) 30%, transparent 60%)" },
          "12%": { background: "linear-gradient(180deg, hsla(330,70%,55%,0.35) 0%, hsla(270,60%,55%,0.2) 35%, transparent 65%)" },
          "25%": { background: "linear-gradient(225deg, hsla(220,75%,55%,0.4) 0%, hsla(270,60%,55%,0.15) 35%, transparent 65%)" },
          "37%": { background: "linear-gradient(270deg, hsla(270,60%,55%,0.35) 0%, hsla(220,75%,55%,0.2) 35%, transparent 65%)" },
          "50%": { background: "linear-gradient(315deg, hsla(0,0%,75%,0.3) 0%, hsla(0,0%,85%,0.15) 30%, transparent 60%)" },
          "62%": { background: "linear-gradient(0deg, hsla(82,70%,45%,0.4) 0%, hsla(120,60%,40%,0.2) 35%, transparent 65%)" },
          "75%": { background: "linear-gradient(45deg, hsla(25,85%,55%,0.4) 0%, hsla(38,80%,50%,0.2) 35%, transparent 65%)" },
          "87%": { background: "linear-gradient(90deg, hsla(0,80%,50%,0.35) 0%, hsla(25,85%,55%,0.15) 30%, transparent 60%)" },
          "100%": { background: "linear-gradient(135deg, hsla(0,80%,50%,0.35) 0%, hsla(330,70%,55%,0.2) 30%, transparent 60%)" },
        },
        "hero-glow": {
          "0%, 100%": { background: "radial-gradient(ellipse at 20% 40%, hsla(0,80%,50%,0.12) 0%, transparent 55%), radial-gradient(ellipse at 80% 60%, hsla(330,70%,55%,0.1) 0%, transparent 50%)" },
          "16%": { background: "radial-gradient(ellipse at 75% 25%, hsla(220,75%,55%,0.15) 0%, transparent 50%), radial-gradient(ellipse at 25% 75%, hsla(270,60%,55%,0.1) 0%, transparent 50%)" },
          "33%": { background: "radial-gradient(ellipse at 50% 60%, hsla(0,0%,80%,0.12) 0%, transparent 50%), radial-gradient(ellipse at 15% 30%, hsla(220,75%,55%,0.08) 0%, transparent 50%)" },
          "50%": { background: "radial-gradient(ellipse at 30% 45%, hsla(82,70%,45%,0.15) 0%, transparent 55%), radial-gradient(ellipse at 70% 35%, hsla(120,60%,40%,0.1) 0%, transparent 50%)" },
          "66%": { background: "radial-gradient(ellipse at 65% 55%, hsla(25,85%,55%,0.15) 0%, transparent 55%), radial-gradient(ellipse at 35% 50%, hsla(38,80%,50%,0.1) 0%, transparent 50%)" },
          "83%": { background: "radial-gradient(ellipse at 40% 30%, hsla(330,70%,55%,0.12) 0%, transparent 55%), radial-gradient(ellipse at 60% 70%, hsla(0,80%,50%,0.1) 0%, transparent 50%)" },
        },
        "hero-shimmer": {
          "0%": { transform: "translateX(-100%) skewX(-15deg)", opacity: "0" },
          "30%": { opacity: "0.5" },
          "50%": { opacity: "0.7" },
          "100%": { transform: "translateX(200%) skewX(-15deg)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "hero-colorize": "hero-colorize 10s ease-in-out infinite",
        "hero-glow": "hero-glow 8s ease-in-out infinite",
        "hero-shimmer": "hero-shimmer 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
