import { useState, useEffect, useCallback } from "react";
import {
  BarChart3, Users, Eye, Clock, Globe, Monitor,
  TrendingUp, TrendingDown, RefreshCw,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
} from "recharts";
import { cn } from "@/lib/utils";

type AnalyticsTab = "overview" | "audience" | "pages" | "realtime" | "geography" | "devices";

const tabs: { key: AnalyticsTab; label: string; icon: typeof BarChart3 }[] = [
  { key: "overview", label: "Overview", icon: BarChart3 },
  { key: "realtime", label: "Realtime", icon: Clock },
  { key: "audience", label: "Audience", icon: Users },
  { key: "pages", label: "Pages", icon: Eye },
  { key: "geography", label: "Geography", icon: Globe },
  { key: "devices", label: "Devices", icon: Monitor },
];

const COLORS = ["#8b5cf6", "#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#6366f1"];

interface GARow {
  dimensionValues: { value: string }[];
  metricValues: { value: string }[];
}

interface GAResponse {
  rows?: GARow[];
  error?: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

async function fetchGA(body: Record<string, unknown>): Promise<GAResponse> {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/google-analytics`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  // Normalize error: GA API returns error as object {code, message, status}
  if (data.error && typeof data.error === "object") {
    return { ...data, error: data.error.message || JSON.stringify(data.error) };
  }
  return data;
}

function formatNumber(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toLocaleString();
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}m ${s}s`;
}

// Stat Card
function StatCard({ label, value, icon: Icon, color, trend }: {
  label: string; value: string; icon: typeof TrendingUp; color: string; trend?: number;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        {trend !== undefined && (
          <span className={cn("flex items-center gap-0.5 text-xs font-medium", trend >= 0 ? "text-emerald-400" : "text-red-400")}>
            {trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(trend).toFixed(1)}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-white/40 mt-1">{label}</p>
    </div>
  );
}

const AdminAnalytics = () => {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>("overview");
  const [dateRange, setDateRange] = useState("30daysAgo");
  const [loading, setLoading] = useState(false);
  const [overviewData, setOverviewData] = useState<Record<string, unknown>[]>([]);
  const [totals, setTotals] = useState({ users: 0, sessions: 0, pageviews: 0, bounceRate: 0, avgDuration: 0 });
  const [realtimeData, setRealtimeData] = useState<Record<string, unknown>[]>([]);
  const [realtimeUsers, setRealtimeUsers] = useState(0);
  const [pageData, setPageData] = useState<Record<string, unknown>[]>([]);
  const [geoData, setGeoData] = useState<Record<string, unknown>[]>([]);
  const [deviceData, setDeviceData] = useState<Record<string, unknown>[]>([]);
  const [audienceData, setAudienceData] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchOverview = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchGA({
        startDate: dateRange,
        endDate: "today",
        dimensions: [{ name: "date" }],
        metrics: [
          { name: "activeUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
          { name: "bounceRate" },
          { name: "averageSessionDuration" },
        ],
      });
      if (res.error) { setError(res.error); return; }
      const rows = (res.rows || []).map((r) => ({
        date: r.dimensionValues[0].value.replace(/(\d{4})(\d{2})(\d{2})/, "$2/$3"),
        users: parseInt(r.metricValues[0].value),
        sessions: parseInt(r.metricValues[1].value),
        pageviews: parseInt(r.metricValues[2].value),
        bounceRate: parseFloat(r.metricValues[3].value),
        avgDuration: parseFloat(r.metricValues[4].value),
      }));
      setOverviewData(rows);
      const t = rows.reduce((acc, r) => ({
        users: acc.users + (r.users as number),
        sessions: acc.sessions + (r.sessions as number),
        pageviews: acc.pageviews + (r.pageviews as number),
        bounceRate: acc.bounceRate + (r.bounceRate as number),
        avgDuration: acc.avgDuration + (r.avgDuration as number),
      }), { users: 0, sessions: 0, pageviews: 0, bounceRate: 0, avgDuration: 0 });
      if (rows.length > 0) {
        t.bounceRate = t.bounceRate / rows.length;
        t.avgDuration = t.avgDuration / rows.length;
      }
      setTotals(t);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  const fetchRealtime = useCallback(async () => {
    try {
      const res = await fetchGA({
        report: "realtime",
        dimensions: [{ name: "country" }],
        metrics: [{ name: "activeUsers" }],
      });
      if (res.error) return;
      const rows = (res.rows || []).map((r) => ({
        country: r.dimensionValues[0].value,
        users: parseInt(r.metricValues[0].value),
      }));
      setRealtimeData(rows);
      setRealtimeUsers(rows.reduce((sum, r) => sum + (r.users as number), 0));
    } catch { /* silent */ }
  }, []);

  const fetchPages = useCallback(async () => {
    try {
      const res = await fetchGA({
        startDate: dateRange,
        endDate: "today",
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
      });
      if (res.error) return;
      setPageData(
        (res.rows || [])
          .map((r) => ({
            page: r.dimensionValues[0].value,
            views: parseInt(r.metricValues[0].value),
            users: parseInt(r.metricValues[1].value),
          }))
          .sort((a, b) => (b.views as number) - (a.views as number))
          .slice(0, 20)
      );
    } catch { /* silent */ }
  }, [dateRange]);

  const fetchGeo = useCallback(async () => {
    try {
      const res = await fetchGA({
        startDate: dateRange,
        endDate: "today",
        dimensions: [{ name: "country" }],
        metrics: [{ name: "activeUsers" }, { name: "sessions" }],
      });
      if (res.error) return;
      setGeoData(
        (res.rows || [])
          .map((r) => ({
            country: r.dimensionValues[0].value,
            users: parseInt(r.metricValues[0].value),
            sessions: parseInt(r.metricValues[1].value),
          }))
          .sort((a, b) => (b.users as number) - (a.users as number))
          .slice(0, 20)
      );
    } catch { /* silent */ }
  }, [dateRange]);

  const fetchDevices = useCallback(async () => {
    try {
      const res = await fetchGA({
        startDate: dateRange,
        endDate: "today",
        dimensions: [{ name: "deviceCategory" }],
        metrics: [{ name: "activeUsers" }],
      });
      if (res.error) return;
      setDeviceData(
        (res.rows || []).map((r) => ({
          device: r.dimensionValues[0].value,
          users: parseInt(r.metricValues[0].value),
        }))
      );
    } catch { /* silent */ }
  }, [dateRange]);

  const fetchAudience = useCallback(async () => {
    try {
      const res = await fetchGA({
        startDate: dateRange,
        endDate: "today",
        dimensions: [{ name: "newVsReturning" }],
        metrics: [{ name: "activeUsers" }, { name: "sessions" }],
      });
      if (res.error) return;
      setAudienceData(
        (res.rows || []).map((r) => ({
          type: r.dimensionValues[0].value,
          users: parseInt(r.metricValues[0].value),
          sessions: parseInt(r.metricValues[1].value),
        }))
      );
    } catch { /* silent */ }
  }, [dateRange]);

  useEffect(() => {
    if (activeTab === "overview") fetchOverview();
    if (activeTab === "realtime") { fetchRealtime(); const i = setInterval(fetchRealtime, 15000); return () => clearInterval(i); }
    if (activeTab === "pages") fetchPages();
    if (activeTab === "geography") fetchGeo();
    if (activeTab === "devices") fetchDevices();
    if (activeTab === "audience") fetchAudience();
  }, [activeTab, fetchOverview, fetchRealtime, fetchPages, fetchGeo, fetchDevices, fetchAudience]);

  const tooltipStyle = {
    contentStyle: { background: "hsl(220,20%,8%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 },
    labelStyle: { color: "rgba(255,255,255,0.6)" },
    itemStyle: { color: "rgba(255,255,255,0.8)" },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Analytics</h1>
          <p className="text-sm text-white/50 mt-1">Google Analytics data</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-white/5 border border-white/10 text-white text-xs rounded-lg px-3 py-2 focus:outline-none"
          >
            <option value="7daysAgo">Last 7 days</option>
            <option value="30daysAgo">Last 30 days</option>
            <option value="90daysAgo">Last 90 days</option>
            <option value="365daysAgo">Last year</option>
          </select>
          <button
            onClick={() => {
              if (activeTab === "overview") fetchOverview();
              if (activeTab === "realtime") fetchRealtime();
              if (activeTab === "pages") fetchPages();
              if (activeTab === "geography") fetchGeo();
              if (activeTab === "devices") fetchDevices();
              if (activeTab === "audience") fetchAudience();
            }}
            className="p-2 text-white/50 hover:text-white transition-colors"
          >
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
              activeTab === tab.key
                ? "bg-white/10 text-white"
                : "text-white/40 hover:text-white/60 hover:bg-white/5"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard label="Users" value={formatNumber(totals.users)} icon={Users} color="from-blue-500 to-cyan-500" />
            <StatCard label="Sessions" value={formatNumber(totals.sessions)} icon={TrendingUp} color="from-purple-500 to-pink-500" />
            <StatCard label="Page Views" value={formatNumber(totals.pageviews)} icon={Eye} color="from-emerald-500 to-teal-500" />
            <StatCard label="Bounce Rate" value={`${(totals.bounceRate * 100).toFixed(1)}%`} icon={TrendingDown} color="from-orange-500 to-amber-500" />
            <StatCard label="Avg Duration" value={formatDuration(totals.avgDuration)} icon={Clock} color="from-rose-500 to-pink-500" />
          </div>

          {/* Users & Sessions Chart */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-sm font-medium text-white/60 mb-4">Users & Sessions Over Time</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={overviewData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
                  <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
                  <Tooltip {...tooltipStyle} />
                  <Area type="monotone" dataKey="users" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={2} />
                  <Area type="monotone" dataKey="sessions" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSessions)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pageviews Chart */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-sm font-medium text-white/60 mb-4">Page Views Over Time</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={overviewData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
                  <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="pageviews" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* REALTIME */}
      {activeTab === "realtime" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl font-bold text-green-400">{realtimeUsers}</span>
            </div>
            <p className="text-sm text-white/50">Active users right now</p>
            <p className="text-xs text-white/30 mt-1">Auto-refreshes every 15s</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-sm font-medium text-white/60 mb-4">Active Users by Country</h3>
            <div className="space-y-2">
              {realtimeData.length === 0 ? (
                <p className="text-sm text-white/30 text-center py-4">No active users</p>
              ) : (
                (realtimeData as { country: string; users: number }[]).map((r, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-white/70">{r.country}</span>
                    <span className="text-sm text-white font-medium">{r.users}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* AUDIENCE */}
      {activeTab === "audience" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-medium text-white/60 mb-4">New vs Returning</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={audienceData}
                      dataKey="users"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {audienceData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip {...tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-medium text-white/60 mb-4">Sessions by Type</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={audienceData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis type="number" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
                    <YAxis dataKey="type" type="category" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} width={80} />
                    <Tooltip {...tooltipStyle} />
                    <Bar dataKey="sessions" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAGES */}
      {activeTab === "pages" && (
        <div className="rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="text-left px-4 py-3 text-white/50 font-medium">#</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Page</th>
                  <th className="text-right px-4 py-3 text-white/50 font-medium">Views</th>
                  <th className="text-right px-4 py-3 text-white/50 font-medium">Users</th>
                </tr>
              </thead>
              <tbody>
                {(pageData as { page: string; views: number; users: number }[]).map((p, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.03]">
                    <td className="px-4 py-3 text-white/30 text-xs">{i + 1}</td>
                    <td className="px-4 py-3 text-white/70 font-mono text-xs">{p.page}</td>
                    <td className="px-4 py-3 text-right text-white font-medium">{formatNumber(p.views)}</td>
                    <td className="px-4 py-3 text-right text-white/60">{formatNumber(p.users)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* GEOGRAPHY */}
      {activeTab === "geography" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-sm font-medium text-white/60 mb-4">Top Countries by Users</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={(geoData as { country: string; users: number }[]).slice(0, 10)} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
                  <YAxis dataKey="country" type="category" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} width={100} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="users" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03]">
                    <th className="text-left px-4 py-3 text-white/50 font-medium">Country</th>
                    <th className="text-right px-4 py-3 text-white/50 font-medium">Users</th>
                    <th className="text-right px-4 py-3 text-white/50 font-medium">Sessions</th>
                  </tr>
                </thead>
                <tbody>
                  {(geoData as { country: string; users: number; sessions: number }[]).map((g, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.03]">
                      <td className="px-4 py-3 text-white/70">{g.country}</td>
                      <td className="px-4 py-3 text-right text-white font-medium">{formatNumber(g.users)}</td>
                      <td className="px-4 py-3 text-right text-white/60">{formatNumber(g.sessions)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* DEVICES */}
      {activeTab === "devices" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-sm font-medium text-white/60 mb-4">Device Categories</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    dataKey="users"
                    nameKey="device"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {deviceData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip {...tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-sm font-medium text-white/60 mb-4">Users by Device</h3>
            <div className="space-y-3 mt-6">
              {(deviceData as { device: string; users: number }[]).map((d, i) => {
                const total = (deviceData as { users: number }[]).reduce((s, x) => s + x.users, 0);
                const pct = total > 0 ? (d.users / total) * 100 : 0;
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-white/70 capitalize">{d.device}</span>
                      <span className="text-white font-medium">{formatNumber(d.users)} ({pct.toFixed(1)}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: COLORS[i % COLORS.length] }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-4">
          <RefreshCw className="h-5 w-5 text-white/30 animate-spin mx-auto" />
        </div>
      )}
    </div>
  );
};

export default AdminAnalytics;
