import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Users, TrendingUp, Clock, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

interface InvestorSubmission {
  id: string;
  full_name: string;
  email: string;
  initials: string;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

const PAGE_SIZE = 15;

const AdminInvestors = () => {
  const [submissions, setSubmissions] = useState<InvestorSubmission[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Stats
  const [totalAll, setTotalAll] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [weekCount, setWeekCount] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [page, search]);

  async function fetchStats() {
    const { count: allCount } = await supabase
      .from("investor_submissions")
      .select("id", { count: "exact", head: true });
    setTotalAll(allCount || 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { count: tCount } = await supabase
      .from("investor_submissions")
      .select("id", { count: "exact", head: true })
      .gte("created_at", today.toISOString());
    setTodayCount(tCount || 0);

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const { count: wCount } = await supabase
      .from("investor_submissions")
      .select("id", { count: "exact", head: true })
      .gte("created_at", weekAgo.toISOString());
    setWeekCount(wCount || 0);
  }

  async function fetchSubmissions() {
    setLoading(true);
    let query = supabase
      .from("investor_submissions")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (search.trim()) {
      query = query.or(`full_name.ilike.%${search.trim()}%,email.ilike.%${search.trim()}%`);
    }

    const { data, count } = await query;
    setSubmissions((data as InvestorSubmission[]) || []);
    setTotal(count || 0);
    setLoading(false);
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const stats = [
    { label: "Total Signups", value: totalAll, icon: Users, color: "text-blue-400" },
    { label: "This Week", value: weekCount, icon: TrendingUp, color: "text-green-400" },
    { label: "Today", value: todayCount, icon: Clock, color: "text-purple-400" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center">
                <s.icon className={cn("h-4 w-4", s.color)} />
              </div>
              <span className="text-xs text-white/40 uppercase tracking-wider">{s.label}</span>
            </div>
            <p className="text-2xl font-semibold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30"
          />
        </div>
        <span className="text-xs text-white/30">{total} result{total !== 1 ? "s" : ""}</span>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="text-left px-4 py-3 text-xs text-white/40 font-medium">Name</th>
                <th className="text-left px-4 py-3 text-xs text-white/40 font-medium">Email</th>
                <th className="text-left px-4 py-3 text-xs text-white/40 font-medium">Initials</th>
                <th className="text-left px-4 py-3 text-xs text-white/40 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="text-center py-12 text-white/30">Loading...</td></tr>
              ) : submissions.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-12 text-white/30">No investor signups yet</td></tr>
              ) : (
                submissions.map((s) => (
                  <tr key={s.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 text-white/80 font-medium">{s.full_name}</td>
                    <td className="px-4 py-3 text-white/60">{s.email}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-purple-500/10 text-purple-400 text-xs font-bold">
                        {s.initials}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/40 text-xs">
                      {new Date(s.created_at).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" })}
                      <span className="ml-1 text-white/20">
                        {new Date(s.created_at).toLocaleTimeString("en-CA", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
            <span className="text-xs text-white/30">
              Page {page + 1} of {totalPages}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                disabled={page >= totalPages - 1}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInvestors;
