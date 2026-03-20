import { useState, useCallback } from "react";
import {
  Gauge, RefreshCw, ExternalLink, AlertTriangle, CheckCircle2,
  Smartphone, Monitor, Clock, Eye, Zap, LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Strategy = "mobile" | "desktop";
type CategoryKey = "performance" | "accessibility" | "best-practices" | "seo";

interface AuditRef { id: string; weight: number; group?: string }
interface Audit {
  id: string;
  title: string;
  description: string;
  score: number | null;
  displayValue?: string;
  numericValue?: number;
}
interface Category {
  id: string;
  title: string;
  score: number | null;
  auditRefs: AuditRef[];
}
interface PSIResult {
  lighthouseResult: {
    categories: Record<string, Category>;
    audits: Record<string, Audit>;
    configSettings: { formFactor: string };
    fetchTime: string;
    finalDisplayedUrl: string;
  };
}

const SITE_URL = "https://www.tmrw-digital.com";
const PSI_API = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

const categoryLabels: Record<CategoryKey, { label: string; icon: typeof Gauge }> = {
  performance: { label: "Performance", icon: Zap },
  accessibility: { label: "Accessibility", icon: Eye },
  "best-practices": { label: "Best Practices", icon: CheckCircle2 },
  seo: { label: "SEO", icon: LayoutDashboard },
};

function scoreColor(score: number | null): string {
  if (score === null) return "text-white/30";
  if (score >= 0.9) return "text-emerald-400";
  if (score >= 0.5) return "text-amber-400";
  return "text-red-400";
}

function scoreBg(score: number | null): string {
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

function ScoreRing({ score, size = 80 }: { score: number | null; size?: number }) {
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

const AdminPageSpeed = () => {
  const [strategy, setStrategy] = useState<Strategy>("desktop");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PSIResult | null>(null);
  const [url, setUrl] = useState(SITE_URL);
  const [expandedCategory, setExpandedCategory] = useState<CategoryKey | null>(null);

  const runAnalysis = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const params = new URLSearchParams({
        url: url,
        strategy: strategy,
        category: "PERFORMANCE",
      });
      // Run all categories
      ["ACCESSIBILITY", "BEST_PRACTICES", "SEO"].forEach(c => params.append("category", c));

      const res = await fetch(`${PSI_API}?${params}`);
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error?.message || `API returned ${res.status}`);
      }
      const data = await res.json();
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Failed to run analysis");
    } finally {
      setLoading(false);
    }
  }, [url, strategy]);

  const categories = result?.lighthouseResult?.categories;
  const audits = result?.lighthouseResult?.audits;

  const getFailedAudits = (catKey: CategoryKey): Audit[] => {
    if (!categories || !audits) return [];
    const cat = categories[catKey];
    if (!cat) return [];
    return cat.auditRefs
      .map(ref => audits[ref.id])
      .filter(a => a && a.score !== null && a.score < 1)
      .sort((a, b) => (a.score ?? 1) - (b.score ?? 1))
      .slice(0, 15);
  };

  const getMetrics = () => {
    if (!audits) return [];
    const metricIds = [
      "first-contentful-paint",
      "largest-contentful-paint",
      "total-blocking-time",
      "cumulative-layout-shift",
      "speed-index",
      "interactive",
    ];
    return metricIds
      .map(id => audits[id])
      .filter(Boolean);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">PageSpeed Insights</h1>
        <p className="text-sm text-white/50 mt-1">
          Run Google Lighthouse audits on your live site
        </p>
      </div>

      {/* Controls */}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="text-xs text-white/40 mb-1 block">URL to analyze</label>
            <input
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/20 transition-colors"
              placeholder="https://www.tmrw-digital.com"
            />
          </div>
          <div className="flex items-end gap-2">
            {/* Strategy toggle */}
            <div className="flex rounded-lg border border-white/10 overflow-hidden">
              <button
                onClick={() => setStrategy("mobile")}
                className={cn(
                  "flex items-center gap-1.5 px-3 h-10 text-sm transition-colors",
                  strategy === "mobile"
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:text-white/60"
                )}
              >
                <Smartphone className="h-4 w-4" />
                Mobile
              </button>
              <button
                onClick={() => setStrategy("desktop")}
                className={cn(
                  "flex items-center gap-1.5 px-3 h-10 text-sm transition-colors",
                  strategy === "desktop"
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:text-white/60"
                )}
              >
                <Monitor className="h-4 w-4" />
                Desktop
              </button>
            </div>
            <button
              onClick={runAnalysis}
              disabled={loading || !url}
              className={cn(
                "flex items-center gap-2 px-5 h-10 rounded-lg text-sm font-medium transition-colors",
                loading
                  ? "bg-white/5 text-white/30 cursor-wait"
                  : "bg-blue-500 text-white hover:bg-blue-600 active:scale-[0.97]"
              )}
            >
              {loading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Gauge className="h-4 w-4" />
              )}
              {loading ? "Analyzing…" : "Run Audit"}
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex items-center gap-3 text-white/40 text-sm">
            <div className="h-1 flex-1 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full bg-blue-500/50 rounded-full animate-pulse" style={{ width: "60%" }} />
            </div>
            <span>Running Lighthouse audit… This takes 15-30 seconds.</span>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-400/20 bg-red-400/5 p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-red-400 font-medium">Analysis Failed</p>
            <p className="text-xs text-red-400/70 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {result && categories && (
        <>
          {/* Meta info */}
          <div className="flex items-center gap-4 text-xs text-white/30">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(result.lighthouseResult.fetchTime).toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              {strategy === "mobile" ? <Smartphone className="h-3 w-3" /> : <Monitor className="h-3 w-3" />}
              {result.lighthouseResult.configSettings.formFactor}
            </span>
            <a
              href={`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(url)}&form_factor=${strategy}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-400/60 hover:text-blue-400 transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              View on PSI
            </a>
          </div>

          {/* Score Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {(Object.keys(categoryLabels) as CategoryKey[]).map(key => {
              const cat = categories[key];
              if (!cat) return null;
              const info = categoryLabels[key];
              const isExpanded = expandedCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setExpandedCategory(isExpanded ? null : key)}
                  className={cn(
                    "rounded-xl border p-5 text-left transition-all duration-200",
                    isExpanded ? "ring-1 ring-white/20" : "",
                    scoreBg(cat.score),
                    "hover:bg-white/[0.04]"
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <info.icon className={cn("h-4 w-4", scoreColor(cat.score))} />
                      <span className="text-sm font-medium text-white/70">{info.label}</span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <ScoreRing score={cat.score} size={72} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Core Web Vitals / Metrics */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-sm font-medium text-white mb-4">Core Web Vitals & Metrics</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {getMetrics().map(metric => (
                <div
                  key={metric.id}
                  className={cn(
                    "rounded-lg border p-4",
                    scoreBg(metric.score)
                  )}
                >
                  <p className="text-xs text-white/40 mb-1">{metric.title}</p>
                  <p className={cn("text-xl font-bold tabular-nums", scoreColor(metric.score))}>
                    {metric.displayValue || "—"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Expanded Category Audits */}
          {expandedCategory && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-medium text-white mb-4">
                {categoryLabels[expandedCategory].label} — Opportunities & Diagnostics
              </h3>
              <div className="space-y-2">
                {getFailedAudits(expandedCategory).length === 0 ? (
                  <div className="text-sm text-white/30 py-4 text-center">
                    All audits passed! 🎉
                  </div>
                ) : (
                  getFailedAudits(expandedCategory).map(audit => (
                    <div
                      key={audit.id}
                      className="flex items-start gap-3 px-4 py-3 rounded-lg bg-white/[0.02] border border-white/5"
                    >
                      <div className={cn(
                        "h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold",
                        audit.score !== null && audit.score >= 0.5
                          ? "bg-amber-400/10 text-amber-400"
                          : "bg-red-400/10 text-red-400"
                      )}>
                        {audit.score !== null ? Math.round(audit.score * 100) : "?"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm text-white/80 font-medium">{audit.title}</p>
                          {audit.displayValue && (
                            <span className={cn("text-xs font-mono tabular-nums shrink-0", scoreColor(audit.score))}>
                              {audit.displayValue}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* Empty state */}
      {!result && !loading && !error && (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] py-20 text-center">
          <Gauge className="h-12 w-12 text-white/10 mx-auto mb-4" />
          <p className="text-white/40 text-sm">Click "Run Audit" to analyze your site's performance</p>
          <p className="text-white/20 text-xs mt-2">Uses the public Google PageSpeed Insights API</p>
        </div>
      )}
    </div>
  );
};

export default AdminPageSpeed;
