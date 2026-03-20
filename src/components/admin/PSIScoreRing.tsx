import { cn } from "@/lib/utils";

export function scoreColor(score: number | null): string {
  if (score === null) return "text-white/30";
  if (score >= 0.9) return "text-emerald-400";
  if (score >= 0.5) return "text-amber-400";
  return "text-red-400";
}

export function scoreBg(score: number | null): string {
  if (score === null) return "border-white/10";
  if (score >= 0.9) return "border-emerald-400/30 bg-emerald-400/5";
  if (score >= 0.5) return "border-amber-400/30 bg-amber-400/5";
  return "border-red-400/30 bg-red-400/5";
}

function ringColor(score: number | null): string {
  if (score === null) return "stroke-white/20";
  if (score >= 0.9) return "stroke-emerald-400";
  if (score >= 0.5) return "stroke-amber-400";
  return "stroke-red-400";
}

export function ScoreRing({ score, size = 80 }: { score: number | null; size?: number }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const pct = score !== null ? score : 0;
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor"
        strokeWidth={4} className="text-white/5" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        strokeWidth={4} strokeLinecap="round" strokeDasharray={c}
        strokeDashoffset={c * (1 - pct)}
        className={cn("transition-all duration-700", ringColor(score))} />
      <text x={size / 2} y={size / 2} textAnchor="middle" dy="0.35em"
        className={cn("fill-current text-lg font-bold transform rotate-90 origin-center", scoreColor(score))}
        style={{ fontSize: size * 0.28 }}>
        {score !== null ? Math.round(score * 100) : "?"}
      </text>
    </svg>
  );
}
