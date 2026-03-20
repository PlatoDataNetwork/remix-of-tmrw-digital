import { useState, useCallback } from "react";
import {
  Shield, RefreshCw, AlertTriangle, CheckCircle2, XCircle,
  Lock, FileWarning, Globe, ShieldCheck, ShieldAlert, ChevronDown, ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScoreRing, scoreColor, scoreBg } from "@/components/admin/PSIScoreRing";

const SITE_URL = "https://www.tmrw-digital.com";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

type CategoryKey = "transport" | "headers" | "content";

interface HeaderCheck {
  id: string;
  name: string;
  category: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  passed: boolean;
  value: string | null;
  recommendation: string;
}

interface CategoryScore {
  score: number;
  total: number;
  passed: number;
}

interface AuditResult {
  url: string;
  fetchedAt: string;
  overallScore: number;
  totalChecks: number;
  passed: number;
  failed: number;
  categories: Record<CategoryKey, CategoryScore>;
  checks: HeaderCheck[];
}

const categoryMeta: Record<CategoryKey, { label: string; icon: typeof Shield; description: string }> = {
  transport: { label: "Transport Security", icon: Lock, description: "HTTPS & HSTS configuration" },
  headers: { label: "Security Headers", icon: ShieldCheck, description: "HTTP response headers" },
  content: { label: "Content Security", icon: FileWarning, description: "Mixed content & inline scripts" },
};

const severityColors: Record<string, string> = {
  critical: "text-red-400 bg-red-400/10",
  high: "text-orange-400 bg-orange-400/10",
  medium: "text-amber-400 bg-amber-400/10",
  low: "text-blue-400 bg-blue-400/10",
  info: "text-white/40 bg-white/5",
};

const AdminSecurityAudit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [url, setUrl] = useState(SITE_URL);
  const [expandedCategory, setExpandedCategory] = useState<CategoryKey | null>(null);
  const [showAllHeaders, setShowAllHeaders] = useState(false);

  const runAudit = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/site-security-audit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || `API returned ${res.status}`);
      }
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Failed to run audit");
    } finally {
      setLoading(false);
    }
  }, [url]);

  const getCategoryChecks = (cat: CategoryKey): HeaderCheck[] => {
    if (!result) return [];
    return result.checks.filter(c => c.category === cat || (cat === "content" && c.category === "cookies"));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Security Audit</h1>
        <p className="text-sm text-white/50 mt-1">
          Analyze security headers, transport security &amp; content policies
        </p>
      </div>

      {/* Controls */}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="text-xs text-white/40 mb-1 block">URL to audit</label>
            <input
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/20 transition-colors"
              placeholder="https://www.tmrw-digital.com"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={runAudit}
              disabled={loading || !url}
              className={cn(
                "flex items-center gap-2 px-5 h-10 rounded-lg text-sm font-medium transition-colors",
                loading
                  ? "bg-white/5 text-white/30 cursor-wait"
                  : "bg-blue-500 text-white hover:bg-blue-600 active:scale-[0.97]"
              )}
            >
              {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
              {loading ? "Scanning…" : "Run Audit"}
            </button>
          </div>
        </div>
        {loading && (
          <div className="flex items-center gap-3 text-white/40 text-sm">
            <div className="h-1 flex-1 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full bg-blue-500/50 rounded-full animate-pulse" style={{ width: "45%" }} />
            </div>
            <span>Analyzing security posture…</span>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-400/20 bg-red-400/5 p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-red-400 font-medium">Audit Failed</p>
            <p className="text-xs text-red-400/70 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <>
          {/* Overall Score + Meta */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex flex-col items-center">
                <ScoreRing score={result.overallScore} size={100} />
                <p className="text-xs text-white/40 mt-2">Overall Score</p>
              </div>
              <div className="flex-1 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white tabular-nums">{result.totalChecks}</p>
                  <p className="text-xs text-white/40">Total Checks</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-400 tabular-nums">{result.passed}</p>
                  <p className="text-xs text-white/40">Passed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-400 tabular-nums">{result.failed}</p>
                  <p className="text-xs text-white/40">Failed</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5 text-xs text-white/30">
              <span className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {result.url}
              </span>
              <span>{new Date(result.fetchedAt).toLocaleString()}</span>
            </div>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(Object.keys(categoryMeta) as CategoryKey[]).map(key => {
              const cat = result.categories[key];
              if (!cat) return null;
              const meta = categoryMeta[key];
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
                  <div className="flex items-center gap-2 mb-3">
                    <meta.icon className={cn("h-4 w-4", scoreColor(cat.score))} />
                    <span className="text-sm font-medium text-white/70">{meta.label}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <ScoreRing score={cat.score} size={64} />
                    <div className="text-right">
                      <p className="text-xs text-white/40">{cat.passed}/{cat.total} passed</p>
                      <p className="text-[11px] text-white/20 mt-1">{meta.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Expanded Category Details */}
          {expandedCategory && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-medium text-white mb-4">
                {categoryMeta[expandedCategory].label} — Detailed Results
              </h3>
              <div className="space-y-2">
                {getCategoryChecks(expandedCategory).map(check => (
                  <div
                    key={check.id}
                    className="flex items-start gap-3 px-4 py-3 rounded-lg bg-white/[0.02] border border-white/5"
                  >
                    <div className="mt-0.5 shrink-0">
                      {check.passed ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm text-white/80 font-medium">{check.name}</p>
                        <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium uppercase tracking-wider", severityColors[check.severity])}>
                          {check.severity}
                        </span>
                      </div>
                      <p className="text-xs text-white/40 mt-1">{check.description}</p>
                      <div className="mt-2 flex flex-col gap-1">
                        <div className="flex items-start gap-2">
                          <span className="text-[11px] text-white/25 shrink-0 w-12">Value:</span>
                          <span className="text-xs text-white/50 font-mono break-all">{check.value}</span>
                        </div>
                        {!check.passed && (
                          <div className="flex items-start gap-2">
                            <span className="text-[11px] text-amber-400/60 shrink-0 w-12">Fix:</span>
                            <span className="text-xs text-amber-400/80">{check.recommendation}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Checks Summary */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <button
              onClick={() => setShowAllHeaders(!showAllHeaders)}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-sm font-medium text-white flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-white/40" />
                All Security Checks ({result.checks.length})
              </h3>
              {showAllHeaders ? <ChevronUp className="h-4 w-4 text-white/30" /> : <ChevronDown className="h-4 w-4 text-white/30" />}
            </button>

            {showAllHeaders && (
              <div className="mt-4 space-y-1.5">
                {result.checks
                  .sort((a, b) => {
                    if (a.passed === b.passed) return 0;
                    return a.passed ? 1 : -1;
                  })
                  .map(check => (
                    <div
                      key={check.id}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.01] border border-white/5"
                    >
                      {check.passed ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 text-red-400 shrink-0" />
                      )}
                      <span className="text-xs text-white/60 flex-1">{check.name}</span>
                      <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium uppercase tracking-wider", severityColors[check.severity])}>
                        {check.severity}
                      </span>
                      <span className="text-[11px] text-white/30 font-mono max-w-40 truncate">
                        {check.value}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Empty state */}
      {!result && !loading && !error && (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] py-20 text-center">
          <Shield className="h-12 w-12 text-white/10 mx-auto mb-4" />
          <p className="text-white/40 text-sm">Click "Run Audit" to scan your site's security posture</p>
          <p className="text-white/20 text-xs mt-2">Checks security headers, transport security & content policies</p>
        </div>
      )}
    </div>
  );
};

export default AdminSecurityAudit;
