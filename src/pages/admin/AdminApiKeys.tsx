import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Key, ShieldCheck, ShieldOff, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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

const PAGE_SIZE = 15;

const AdminApiKeys = () => {
  const [keys, setKeys] = useState<ApiKeyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<"all" | "active" | "restricted">("all");

  useEffect(() => {
    fetchKeys();
  }, [page, filter]);

  async function fetchKeys() {
    setLoading(true);
    let query = supabase
      .from("api_keys")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (filter === "active") query = query.eq("is_active", true);
    if (filter === "restricted") query = query.eq("is_active", false);

    const { data, count } = await query;
    setKeys((data as ApiKeyRow[]) || []);
    setTotal(count || 0);
    setLoading(false);
  }

  const toggleActive = async (id: string, currentActive: boolean) => {
    await supabase.from("api_keys").update({ is_active: !currentActive }).eq("id", id);
    setKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, is_active: !currentActive } : k))
    );
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">API Keys</h1>
        <p className="text-sm text-white/50 mt-1">{total} total keys</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(["all", "active", "restricted"] as const).map((f) => (
          <button
            key={f}
            onClick={() => { setFilter(f); setPage(0); }}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize",
              filter === f
                ? "bg-white/10 text-white"
                : "text-white/40 hover:text-white/60 hover:bg-white/5"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-white/50 font-medium">Status</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Name</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium hidden md:table-cell">Email</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium hidden lg:table-cell">API Key</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Date</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-white/30">Loading...</td>
                </tr>
              ) : keys.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-white/30">No API keys found</td>
                </tr>
              ) : (
                keys.map((k) => (
                  <tr key={k.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                    <td className="px-4 py-3">
                      {k.is_active ? (
                        <ShieldCheck className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <ShieldOff className="h-4 w-4 text-red-400" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/tmrw-admin/api-keys/${k.id}`}
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        {k.full_name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-white/50 hidden md:table-cell">{k.email}</td>
                    <td className="px-4 py-3 text-white/30 font-mono text-xs hidden lg:table-cell">
                      {k.api_key.slice(0, 12)}...
                    </td>
                    <td className="px-4 py-3 text-white/40 text-xs">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(k.created_at!).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleActive(k.id, k.is_active!)}
                        className={cn(
                          "px-2.5 py-1 rounded text-xs font-medium transition-colors",
                          k.is_active
                            ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                            : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                        )}
                      >
                        {k.is_active ? "Restrict" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed bg-white/5"
          >
            Previous
          </button>
          <span className="text-xs text-white/40">
            Page {page + 1} of {totalPages}
          </span>
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
  );
};

export default AdminApiKeys;
