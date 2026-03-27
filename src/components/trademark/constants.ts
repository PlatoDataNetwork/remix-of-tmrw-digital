import { type TrademarkModule, TM_MODULE_META, TM_QUESTION_BANK } from "@/data/trademark-questions";
import { Shield, Target, Crown, BookOpen, Scale } from "lucide-react";

export const PAGE_BG = "hsl(220, 20%, 4%)";
export const NEON = "hsl(82, 85%, 55%)";

export const MODULE_COLORS: Record<TrademarkModule, string> = {
  beginner: "hsl(82, 85%, 55%)",
  intermediate: "hsl(35, 90%, 55%)",
  expert: "hsl(0, 70%, 60%)",
};

export interface ProfileResult {
  title: string;
  icon: typeof Shield;
  description: string;
  color: string;
}

export const PROFILES: Record<TrademarkModule, ProfileResult[]> = {
  beginner: [
    { title: "TRADEMARK ROOKIE", icon: BookOpen, description: "You're just getting started on your brand protection journey. Every trademark titan started here — review and return stronger.", color: "hsl(0, 70%, 55%)" },
    { title: "BRAND AWARE", icon: Target, description: "You know some basics but gaps remain. A bit more study and you'll be ready to graduate to Module 2.", color: "hsl(35, 90%, 55%)" },
    { title: "TRADEMARK STUDENT", icon: Shield, description: "Solid understanding of the fundamentals. You've earned your place — Module 2 is now unlocked.", color: "hsl(82, 85%, 55%)" },
  ],
  intermediate: [
    { title: "IP APPRENTICE", icon: BookOpen, description: "You know the landscape but the strategic nuances need work. Review and try again.", color: "hsl(0, 70%, 55%)" },
    { title: "IP STRATEGIST", icon: Scale, description: "Strong knowledge of brand warfare and enforcement. Just a few more concepts to master.", color: "hsl(35, 90%, 55%)" },
    { title: "TRADEMARK EXPERT", icon: Shield, description: "Impressive depth. You understand enforcement, strategy, and industry dynamics. Module 3 awaits.", color: "hsl(35, 90%, 55%)" },
  ],
  expert: [
    { title: "TRADEMARK SPECIALIST", icon: Target, description: "You're thinking at a high level but the elite doctrine needs more exploration. The mastery level demands perfection.", color: "hsl(0, 70%, 55%)" },
    { title: "TRADEMARK ARCHITECT", icon: Shield, description: "You understand advanced global IP. Nearly at titan level — sharpen the final edges.", color: "hsl(0, 70%, 60%)" },
    { title: "TRADEMARK TITAN", icon: Crown, description: "You've conquered all three modules. You understand trademarks from fundamentals to frontier. You are among the elite.", color: "hsl(0, 70%, 60%)" },
  ],
};

export function getProfile(score: number, total: number, mod: TrademarkModule): ProfileResult {
  const pct = score / total;
  const profiles = PROFILES[mod];
  if (pct < 0.5) return profiles[0];
  if (pct < 0.7) return profiles[1];
  return profiles[2];
}

export const IDENTITIES = [
  { label: "BRAND OWNER", desc: "I need to protect my brand and IP — yesterday" },
  { label: "STARTUP FOUNDER", desc: "Building something — need to know my rights before someone steals them" },
  { label: "ATTORNEY / IP PRO", desc: "Let's see how sharp I really am (spoiler: very)" },
  { label: "JUST CURIOUS", desc: "I want to learn about trademarks — and maybe laugh a little" },
];

export type Step = "landing" | "identify" | "modules" | "assessment" | "joke" | "analyzing" | "results" | "review" | "contact";
