import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { History, AlertTriangle, TrendingDown, TrendingUp, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { scoreColor } from "./PSIScoreRing";

interface AuditRecord {
  id: string;
  url: string;
  strategy: string;
  performance_score: number | null;
  accessibility_score: number | null;
  best_practices_score: number | null;
  seo_score: number | null;
  is_scheduled: boolean;
  alerts: any;
  created_at: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Performance: "#34d399",
  Accessibility: "#60a5fa",
  "Best Practices": "#a78bfa",
  SEO: "#fbbf24",
};

export default function PSIHistoryChart() {
  const [history, setHistory] = useState<AuditRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      const { data } = await supabase
        .from("psi_audit_history")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(90);
      setHistory((data as AuditRecord[]) || []);
      setLoading(false);
    }
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 animate-pulse">
        <div className="h-4 w-40 bg-white/10 rounded mb-4" />
        <div className="h-48 bg-white/5 rounded" />
      </div>
    );
  }

  const chartData = history.map(h => ({
    date: new Date(h.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    Performance: h.performance_score !== null ? Math.round(h.performance_score * 100) : null,
    Accessibility: h.accessibility_score !== null ? Math.round(h.accessibility_score * 100) : null,
    "Best Practices": h.best_practices_score !== null ? Math.round(h.best_practices_score * 100) : null,
    SEO: h.seo_score !== null ? Math.round(h.seo_score * 100) : null,
  }));

  // Get recent alerts
  const recentAlerts = history
    .filter(h => h.alerts && (h.alerts as any[]).length > 0)
    .slice(-10)
    .reverse();

  // Trend: compare last 2 entries
  const last = history[history.length - 1];
  const prev = history.length > 1 ? history[history.length - 2] : null;
  const perfTrend = last && prev && last.performance_score !== null && prev.performance_score !== null
    ? last.performance_score - prev.performance_score
    : null;

  return (
    <div className="space-y-4">
      {/* Score Trend Chart */}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-white flex items-center gap-2">
            <History className="h-4 w-4 text-white/40" />
            Score History
          </h3>
          {perfTrend !== null && (
            <div className={cn(
              "flex items-center gap-1 text-xs font-medium",
              perfTrend >= 0 ? "text-emerald-400" : "text-red-400"
            )}>
              {perfTrend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {perfTrend >= 0 ? "+" : ""}{Math.round(perfTrend * 100)} perf
            </div>
          )}
        </div>

        {chartData.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-white/30 text-sm">
            No audit history yet. Run your first audit or wait for the daily scheduled run.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }} />
              <Tooltip
                contentStyle={{
                  background: "hsl(220,20%,10%)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelStyle={{ color: "rgba(255,255,255,0.6)" }}
              />
              {Object.entries(CATEGORY_COLORS).map(([key, color]) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={color}
                  strokeWidth={2}
                  dot={{ r: 3, fill: color }}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Recent Alerts */}
      {recentAlerts.length > 0 && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-5">
          <h3 className="text-sm font-medium text-amber-400 flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4" />
            Recent Threshold Alerts
          </h3>
          <div className="space-y-2">
            {recentAlerts.map(entry => (
              <div key={entry.id} className="flex items-start gap-3 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/5">
                <Clock className="h-3.5 w-3.5 text-white/30 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/40">
                    {new Date(entry.created_at).toLocaleString()}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {(entry.alerts as any[]).map((alert: any, i: number) => (
                      <span
                        key={i}
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          alert.score < 0.5
                            ? "bg-red-400/10 text-red-400"
                            : "bg-amber-400/10 text-amber-400"
                        )}
                      >
                        {alert.category}: {Math.round(alert.score * 100)} (min: {Math.round(alert.threshold * 100)})
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
