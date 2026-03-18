import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, ShieldOff, Clock, Search, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

// Map dialer codes to country names
const dialerToCountry: Record<string, string> = {
  "+1": "US / Canada",
  "+44": "United Kingdom",
  "+91": "India",
  "+61": "Australia",
  "+49": "Germany",
  "+33": "France",
  "+81": "Japan",
  "+86": "China",
  "+82": "South Korea",
  "+971": "UAE",
  "+966": "Saudi Arabia",
  "+65": "Singapore",
  "+41": "Switzerland",
  "+31": "Netherlands",
  "+46": "Sweden",
  "+47": "Norway",
  "+55": "Brazil",
  "+52": "Mexico",
  "+234": "Nigeria",
  "+27": "South Africa",
  "+254": "Kenya",
  "+62": "Indonesia",
  "+60": "Malaysia",
  "+63": "Philippines",
  "+66": "Thailand",
  "+84": "Vietnam",
  "+48": "Poland",
  "+39": "Italy",
  "+34": "Spain",
  "+351": "Portugal",
  "+7": "Russia",
  "+90": "Turkey",
  "+20": "Egypt",
  "+972": "Israel",
  "+92": "Pakistan",
  "+880": "Bangladesh",
  "+54": "Argentina",
  "+56": "Chile",
  "+57": "Colombia",
};

const PAGE_SIZE = 15;

const AdminApiKeys = () => {
  const [keys, setKeys] = useState<ApiKeyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "restricted">("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [nameSearch, setNameSearch] = useState("");
  const [emailSearch, setEmailSearch] = useState("");
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);

  // Fetch distinct country codes for dropdown
  useEffect(() => {
    async function fetchCountries() {
      const { data } = await supabase
        .from("api_keys")
        .select("country_code");
      if (data) {
        const codes = [...new Set(data.map((d) => d.country_code).filter(Boolean))] as string[];
        codes.sort((a, b) => {
          const nameA = dialerToCountry[a] || a;
          const nameB = dialerToCountry[b] || b;
          return nameA.localeCompare(nameB);
        });
        setAvailableCountries(codes);
      }
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    fetchKeys();
  }, [page, statusFilter, countryFilter, nameSearch, emailSearch]);

  async function fetchKeys() {
    setLoading(true);
    let query = supabase
      .from("api_keys")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (statusFilter === "active") query = query.eq("is_active", true);
    if (statusFilter === "restricted") query = query.eq("is_active", false);
    if (countryFilter !== "all") query = query.eq("country_code", countryFilter);
    if (nameSearch.trim()) query = query.ilike("full_name", `%${nameSearch.trim()}%`);
    if (emailSearch.trim()) query = query.ilike("email", `%${emailSearch.trim()}%`);

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

  const clearFilters = () => {
    setStatusFilter("all");
    setCountryFilter("all");
    setNameSearch("");
    setEmailSearch("");
    setPage(0);
  };

  const hasActiveFilters =
    statusFilter !== "all" || countryFilter !== "all" || nameSearch.trim() !== "" || emailSearch.trim() !== "";

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">API Keys</h1>
          <p className="text-sm text-white/50 mt-1">{total} total keys</p>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-3 w-3" />
            Clear filters
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="space-y-3">
        {/* Status filter */}
        <div className="flex gap-2">
          {(["all", "active", "restricted"] as const).map((f) => (
            <button
              key={f}
              onClick={() => { setStatusFilter(f); setPage(0); }}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize",
                statusFilter === f
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white/60 hover:bg-white/5"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search & Country filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Name search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
            <Input
              placeholder="Search by name..."
              value={nameSearch}
              onChange={(e) => { setNameSearch(e.target.value); setPage(0); }}
              className="pl-9 h-9 bg-white/[0.03] border-white/10 text-white text-xs placeholder:text-white/30 focus-visible:ring-white/20"
            />
          </div>

          {/* Email search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
            <Input
              placeholder="Search by email..."
              value={emailSearch}
              onChange={(e) => { setEmailSearch(e.target.value); setPage(0); }}
              className="pl-9 h-9 bg-white/[0.03] border-white/10 text-white text-xs placeholder:text-white/30 focus-visible:ring-white/20"
            />
          </div>

          {/* Country dropdown */}
          <Select value={countryFilter} onValueChange={(v) => { setCountryFilter(v); setPage(0); }}>
            <SelectTrigger className="h-9 bg-white/[0.03] border-white/10 text-white text-xs [&>span]:text-white/70">
              <SelectValue placeholder="All countries" />
            </SelectTrigger>
            <SelectContent className="bg-[hsl(220,20%,8%)] border-white/10">
              <SelectItem value="all" className="text-white/70 text-xs focus:bg-white/10 focus:text-white">
                All countries
              </SelectItem>
              {availableCountries.map((code) => (
                <SelectItem
                  key={code}
                  value={code}
                  className="text-white/70 text-xs focus:bg-white/10 focus:text-white"
                >
                  {dialerToCountry[code] || code} ({code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
                <th className="text-left px-4 py-3 text-white/50 font-medium hidden lg:table-cell">Country</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium hidden lg:table-cell">API Key</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Date</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-white/30">Loading...</td>
                </tr>
              ) : keys.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-white/30">No API keys found</td>
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
                    <td className="px-4 py-3 text-white/40 text-xs hidden lg:table-cell">
                      {k.country_code ? (dialerToCountry[k.country_code] || k.country_code) : "—"}
                    </td>
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
