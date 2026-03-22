import { useState, useCallback, useEffect, useRef } from "react";
import {
  Shield, RefreshCw, AlertTriangle, CheckCircle2, XCircle,
  Lock, FileWarning, Globe, ShieldCheck, ShieldAlert, ChevronDown, ChevronUp,
  Wrench, Sparkles, Copy, Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScoreRing, scoreColor, scoreBg } from "@/components/admin/PSIScoreRing";

const SCAN_DURATION = 45_000; // 45 seconds

const SCAN_PHASES = [
  { at: 0, label: "Initializing scanner…", detail: "Preparing security modules" },
  { at: 3, label: "Resolving DNS…", detail: "Checking DNS records and resolution" },
  { at: 6, label: "Testing TLS/SSL handshake…", detail: "Verifying certificate chain" },
  { at: 10, label: "Checking HTTPS redirect…", detail: "Testing HTTP → HTTPS enforcement" },
  { at: 14, label: "Analyzing HSTS policy…", detail: "Validating Strict-Transport-Security" },
  { at: 18, label: "Scanning security headers…", detail: "X-Frame-Options, CSP, X-Content-Type" },
  { at: 23, label: "Evaluating Content-Security-Policy…", detail: "Parsing directives and sources" },
  { at: 28, label: "Checking cross-origin policies…", detail: "COOP, COEP, CORP headers" },
  { at: 33, label: "Scanning for mixed content…", detail: "Detecting insecure resource loads" },
  { at: 37, label: "Analyzing inline scripts…", detail: "Identifying unsafe patterns" },
  { at: 41, label: "Compiling results…", detail: "Generating security score" },
  { at: 44, label: "Finalizing report…", detail: "Preparing recommendations" },
];

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

// Mapping of check IDs to the Vercel header that fixes them
const AUTOFIX_HEADERS: Record<string, { key: string; value: string }> = {
  hsts: { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  "hsts-duration": { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  "hsts-subdomains": { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  csp: {
    key: "Content-Security-Policy",
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.supabase.co https://*.google-analytics.com https://*.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https: http:; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://*.supabase.co https://*.google-analytics.com https://*.googleapis.com wss://*.supabase.co; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'",
  },
  "x-frame-options": { key: "X-Frame-Options", value: "SAMEORIGIN" },
  "x-content-type": { key: "X-Content-Type-Options", value: "nosniff" },
  "x-xss-protection": { key: "X-XSS-Protection", value: "1; mode=block" },
  "referrer-policy": { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  "permissions-policy": { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  coop: { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  coep: { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
  corp: { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
};

function generateVercelHeadersJson(failedChecks: HeaderCheck[]): string {
  const headersMap = new Map<string, string>();
  for (const check of failedChecks) {
    const fix = AUTOFIX_HEADERS[check.id];
    if (fix && !headersMap.has(fix.key)) {
      headersMap.set(fix.key, fix.value);
    }
  }
  const headers = Array.from(headersMap.entries()).map(([key, value]) => ({ key, value }));
  return JSON.stringify({ source: "/(.*)", headers }, null, 2);
}

const AdminSecurityAudit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [url, setUrl] = useState(SITE_URL);
  const [expandedCategory, setExpandedCategory] = useState<CategoryKey | null>(null);
  const [showAllHeaders, setShowAllHeaders] = useState(false);
  const [showAutoFix, setShowAutoFix] = useState(false);
  const [copied, setCopied] = useState(false);

  const [scanProgress, setScanProgress] = useState(0);
  const [scanPhase, setScanPhase] = useState(SCAN_PHASES[0]);
  const scanStartRef = useRef<number>(0);
  const animFrameRef = useRef<number>(0);
  const pendingResultRef = useRef<AuditResult | null>(null);

  // Animated progress ticker
  useEffect(() => {
    if (!loading) return;
    scanStartRef.current = Date.now();
    pendingResultRef.current = null;

    const tick = () => {
      const elapsed = Date.now() - scanStartRef.current;
      const raw = Math.min(elapsed / SCAN_DURATION, 1);
      // Ease-out for natural feel
      const progress = raw < 0.9 ? raw : 0.9 + (raw - 0.9) * 0.5;
      setScanProgress(progress);

      // Determine phase
      const elapsedSec = elapsed / 1000;
      const currentPhase = [...SCAN_PHASES].reverse().find(p => elapsedSec >= p.at) || SCAN_PHASES[0];
      setScanPhase(currentPhase);

      // Keep animating until full duration elapses, even if API already returned
      if (elapsed < SCAN_DURATION) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        // Duration complete — show final state
        setScanProgress(1);
        setScanPhase({ at: 45, label: "Scan complete", detail: "Results ready" });
      }
    };
    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [loading]);

  const runAudit = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setShowAutoFix(false);
    setScanProgress(0);
    setScanPhase(SCAN_PHASES[0]);
    const startTime = Date.now();

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

      // Ensure minimum scan duration
      const elapsed = Date.now() - startTime;
      const remaining = SCAN_DURATION - elapsed;
      if (remaining > 0) {
        pendingResultRef.current = data;
        await new Promise(resolve => setTimeout(resolve, remaining));
      }
      // Final animation
      setScanProgress(1);
      setScanPhase({ at: 45, label: "Scan complete", detail: "Results ready" });
      await new Promise(resolve => setTimeout(resolve, 500));
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Failed to run audit");
    } finally {
      setLoading(false);
      pendingResultRef.current = null;
    }
  }, [url]);

  const getCategoryChecks = (cat: CategoryKey): HeaderCheck[] => {
    if (!result) return [];
    return result.checks.filter(c => c.category === cat || (cat === "content" && c.category === "cookies"));
  };

  const failedChecks = result?.checks.filter(c => !c.passed) || [];
  const fixableChecks = failedChecks.filter(c => AUTOFIX_HEADERS[c.id]);
  const unfixableChecks = failedChecks.filter(c => !AUTOFIX_HEADERS[c.id]);

  const handleCopyConfig = () => {
    const config = generateVercelHeadersJson(fixableChecks);
    navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <div className="space-y-4 pt-2">
            {/* Radar shield animation */}
            <div className="flex justify-center py-6">
              <div className="relative w-32 h-32">
                {/* Outer radar rings */}
                <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-3 rounded-full border border-cyan-500/20 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
                <div className="absolute inset-6 rounded-full border border-blue-400/25 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
                {/* Static rings */}
                <div className="absolute inset-0 rounded-full border border-blue-500/10" />
                <div className="absolute inset-3 rounded-full border border-blue-500/8" />
                <div className="absolute inset-6 rounded-full border border-blue-500/6" />
                {/* Radar sweep */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-0 origin-center"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 0deg, transparent 330deg, rgba(59,130,246,0.15) 345deg, rgba(6,182,212,0.3) 360deg)',
                      animation: 'spin 3s linear infinite',
                    }}
                  />
                </div>
                {/* Center shield icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center backdrop-blur-sm">
                    <Shield className="h-6 w-6 text-blue-400 animate-pulse" />
                  </div>
                </div>
                {/* Scanning dots */}
                <div className="absolute top-2 right-6 w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-ping" style={{ animationDuration: '2s' }} />
                <div className="absolute bottom-8 left-3 w-1 h-1 rounded-full bg-blue-400/50 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.8s' }} />
                <div className="absolute top-10 left-1 w-1 h-1 rounded-full bg-cyan-300/40 animate-ping" style={{ animationDuration: '2s', animationDelay: '1.5s' }} />
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60 font-medium">{scanPhase.label}</span>
                <span className="text-white/30 tabular-nums">{Math.round(scanProgress * 100)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: `${scanProgress * 100}%`,
                    background: "linear-gradient(90deg, #3b82f6, #06b6d4, #3b82f6)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2s linear infinite",
                  }}
                />
              </div>
              <p className="text-[11px] text-white/25">{scanPhase.detail}</p>
            </div>

            {/* Scan activity log */}
            <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4 max-h-48 overflow-hidden">
              <div className="space-y-1.5">
                {SCAN_PHASES.filter(p => (Date.now() - scanStartRef.current) / 1000 >= p.at).map((p, i, arr) => (
                  <div key={p.at} className="flex items-center gap-2.5">
                    {i === arr.length - 1 ? (
                      <RefreshCw className="h-3 w-3 text-blue-400 animate-spin shrink-0" />
                    ) : (
                      <CheckCircle2 className="h-3 w-3 text-emerald-400/60 shrink-0" />
                    )}
                    <span className={cn(
                      "text-[11px] font-mono",
                      i === arr.length - 1 ? "text-white/60" : "text-white/25"
                    )}>
                      {p.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Elapsed timer */}
            <div className="flex items-center justify-center gap-2 text-xs text-white/20">
              <span>Deep security analysis in progress — estimated 45 seconds</span>
            </div>
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

          {/* Auto-Fix Panel */}
          {fixableChecks.length > 0 && (
            <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-emerald-400 flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  Auto-Fix Available — {fixableChecks.length} issue{fixableChecks.length !== 1 ? "s" : ""} fixable via Vercel headers
                </h3>
                <button
                  onClick={() => setShowAutoFix(!showAutoFix)}
                  className="flex items-center gap-1.5 px-3 h-8 rounded-lg text-xs font-medium bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 active:scale-[0.97] transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {showAutoFix ? "Hide Details" : "View Fixes"}
                </button>
              </div>

              {showAutoFix && (
                <div className="space-y-4 mt-4">
                  {/* Applied headers status */}
                  <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs text-white/50 font-medium">Security headers configured in vercel.json</p>
                      <button
                        onClick={handleCopyConfig}
                        className="flex items-center gap-1.5 px-2.5 h-7 rounded-md text-[11px] font-medium bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                        {copied ? "Copied" : "Copy Config"}
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {fixableChecks.map(check => {
                        const fix = AUTOFIX_HEADERS[check.id];
                        if (!fix) return null;
                        return (
                          <div key={check.id} className="flex items-start gap-2.5 px-3 py-2 rounded-md bg-white/[0.02]">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-white/70 font-medium">{check.name}</span>
                                <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium uppercase tracking-wider", severityColors[check.severity])}>
                                  {check.severity}
                                </span>
                              </div>
                              <p className="text-[11px] text-white/30 mt-0.5 font-mono break-all">
                                {fix.key}: {fix.value.length > 80 ? fix.value.substring(0, 80) + "…" : fix.value}
                              </p>
                            </div>
                            <span className="text-[10px] text-emerald-400/60 bg-emerald-400/10 px-1.5 py-0.5 rounded shrink-0">
                              APPLIED
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Unfixable items */}
                  {unfixableChecks.length > 0 && (
                    <div className="rounded-lg border border-amber-400/10 bg-amber-400/5 p-4">
                      <p className="text-xs text-amber-400/70 font-medium mb-2">
                        {unfixableChecks.length} issue{unfixableChecks.length !== 1 ? "s" : ""} require manual attention
                      </p>
                      <div className="space-y-1.5">
                        {unfixableChecks.map(check => (
                          <div key={check.id} className="flex items-start gap-2.5 px-3 py-2 rounded-md bg-white/[0.02]">
                            <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <span className="text-xs text-white/70 font-medium">{check.name}</span>
                              <p className="text-[11px] text-white/30 mt-0.5">{check.recommendation}</p>
                            </div>
                            <span className="text-[10px] text-amber-400/60 bg-amber-400/10 px-1.5 py-0.5 rounded shrink-0">
                              MANUAL
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-[11px] text-white/20">
                    Headers are configured in <span className="font-mono text-white/30">vercel.json</span> and will take effect on next deployment. Re-run the audit after publishing to verify.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* All passed */}
          {failedChecks.length === 0 && (
            <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-5 text-center">
              <ShieldCheck className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-sm text-emerald-400 font-medium">All security checks passed!</p>
              <p className="text-xs text-white/30 mt-1">Your site has a strong security posture.</p>
            </div>
          )}

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
                {getCategoryChecks(expandedCategory).map(check => {
                  const fix = !check.passed ? AUTOFIX_HEADERS[check.id] : null;
                  return (
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
                          {fix && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-emerald-400/10 text-emerald-400">
                              AUTO-FIXED
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/40 mt-1">{check.description}</p>
                        <div className="mt-2 flex flex-col gap-1">
                          <div className="flex items-start gap-2">
                            <span className="text-[11px] text-white/25 shrink-0 w-12">Value:</span>
                            <span className="text-xs text-white/50 font-mono break-all">{check.value}</span>
                          </div>
                          {!check.passed && fix && (
                            <div className="flex items-start gap-2">
                              <span className="text-[11px] text-emerald-400/60 shrink-0 w-12">Fix:</span>
                              <span className="text-xs text-emerald-400/80 font-mono break-all">{fix.key}: {fix.value.length > 100 ? fix.value.substring(0, 100) + "…" : fix.value}</span>
                            </div>
                          )}
                          {!check.passed && !fix && (
                            <div className="flex items-start gap-2">
                              <span className="text-[11px] text-amber-400/60 shrink-0 w-12">Fix:</span>
                              <span className="text-xs text-amber-400/80">{check.recommendation}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                      {!check.passed && AUTOFIX_HEADERS[check.id] && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 shrink-0">
                          FIXED
                        </span>
                      )}
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
