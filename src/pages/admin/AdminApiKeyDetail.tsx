import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, ShieldOff, Globe, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ApiKeyRow {
  id: string;
  full_name: string;
  email: string;
  api_key: string;
  is_active: boolean;
  country_code: string | null;
  phone: string | null;
  created_at: string;
}

interface UsageLog {
  id: string;
  endpoint: string | null;
  method: string | null;
  ip_address: string | null;
  country_code: string | null;
  status_code: number | null;
  created_at: string;
}

const PAGE_SIZE = 20;

// Country code to flag emoji
function countryFlag(code: string | null): string {
  if (!code || code.length !== 2) return "🌐";
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
}

const AdminApiKeyDetail = () => {
  const { id } = useParams();
  const [apiKey, setApiKey] = useState<ApiKeyRow | null>(null);
  const [logs, setLogs] = useState<UsageLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalLogs, setTotalLogs] = useState(0);

  useEffect(() => {
    async function fetchKey() {
      const { data } = await supabase
        .from("api_keys")
        .select("*")
        .eq("id", id!)
        .single();
      if (data) setApiKey(data as ApiKeyRow);
      setLoading(false);
    }
    if (id) fetchKey();
  }, [id]);

  useEffect(() => {
    async function fetchLogs() {
      const { data, count } = await supabase
        .from("api_usage_logs")
        .select("*", { count: "exact" })
        .eq("api_key_id", id!)
        .order("created_at", { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
      setLogs((data as UsageLog[]) || []);
      setTotalLogs(count || 0);
    }
    if (id) fetchLogs();
  }, [id, page]);

  const toggleActive = async () => {
    if (!apiKey) return;
    const newVal = !apiKey.is_active;
    await supabase.from("api_keys").update({ is_active: newVal }).eq("id", apiKey.id);
    setApiKey({ ...apiKey, is_active: newVal });
  };

  const totalPages = Math.ceil(totalLogs / PAGE_SIZE);

  if (loading) return <div className="text-white/30 py-12 text-center">Loading...</div>;
  if (!apiKey) return <div className="text-white/30 py-12 text-center">API key not found</div>;

  return (
    <div className="space-y-6">
      <Link
        to="/tmrw-admin/api-keys"
        className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to API Keys
      </Link>

      {/* Key Info */}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-xl font-semibold text-white">{apiKey.full_name}</h1>
            <p className="text-sm text-white/50 mt-1">{apiKey.email}</p>
            {apiKey.phone && <p className="text-sm text-white/40">{apiKey.phone}</p>}
            <p className="text-xs text-white/30 font-mono mt-2 break-all">Key: {apiKey.api_key}</p>
            <p className="text-xs text-white/30 mt-1">
              Created: {new Date(apiKey.created_at!).toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium",
                apiKey.is_active
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400"
              )}
            >
              {apiKey.is_active ? (
                <><ShieldCheck className="h-3.5 w-3.5" /> Active</>
              ) : (
                <><ShieldOff className="h-3.5 w-3.5" /> Restricted</>
              )}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleActive}
              className="text-white/50 hover:text-white text-xs"
            >
              {apiKey.is_active ? "Restrict" : "Activate"}
            </Button>
          </div>
        </div>
      </div>

      {/* Usage Logs */}
      <div>
        <h2 className="text-lg font-medium text-white mb-4">
          Usage Logs <span className="text-white/40 text-sm">({totalLogs})</span>
        </h2>
        <div className="rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Time</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Method</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Endpoint</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">IP</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Country</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-white/30">
                      No usage logs yet
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                      <td className="px-4 py-3 text-white/40 text-xs whitespace-nowrap">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(log.created_at).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-1.5 py-0.5 rounded bg-white/5 text-white/60 font-mono text-xs">
                          {log.method || "GET"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/50 font-mono text-xs">{log.endpoint || "—"}</td>
                      <td className="px-4 py-3 text-white/40 font-mono text-xs">{log.ip_address || "—"}</td>
                      <td className="px-4 py-3 text-white/50">
                        <span className="flex items-center gap-1.5">
                          <span className="text-base">{countryFlag(log.country_code)}</span>
                          <span className="text-xs">{log.country_code?.toUpperCase() || "—"}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "px-1.5 py-0.5 rounded text-xs font-mono",
                            log.status_code && log.status_code < 400
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-red-500/10 text-red-400"
                          )}
                        >
                          {log.status_code || "—"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed bg-white/5"
            >
              Previous
            </button>
            <span className="text-xs text-white/40">Page {page + 1} of {totalPages}</span>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed bg-white/5"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminApiKeyDetail;
