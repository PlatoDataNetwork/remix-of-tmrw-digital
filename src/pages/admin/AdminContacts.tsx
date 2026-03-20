import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MailOpen, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  is_read: boolean;
  is_marked: boolean;
  created_at: string;
}

const PAGE_SIZE = 15;

const AdminContacts = () => {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<"all" | "unread" | "marked">("all");

  useEffect(() => {
    fetchContacts();
  }, [page, filter]);

  async function fetchContacts() {
    setLoading(true);
    let query = supabase
      .from("contact_submissions")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (filter === "unread") query = query.eq("is_read", false);
    if (filter === "marked") query = query.eq("is_marked", true);

    const { data, count } = await query;
    setContacts((data as ContactSubmission[]) || []);
    setTotal(count || 0);
    setLoading(false);
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Inquiries</h1>
          <p className="text-sm text-white/50 mt-1">{total} total inquiries</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(["all", "unread", "marked"] as const).map((f) => (
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
                <th className="text-left px-4 py-3 text-white/50 font-medium hidden lg:table-cell">Company</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-white/30">Loading...</td>
                </tr>
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-white/30">No inquiries found</td>
                </tr>
              ) : (
                contacts.map((c) => (
                  <tr key={c.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                    <td className="px-4 py-3">
                      {c.is_read ? (
                        <MailOpen className="h-4 w-4 text-white/30" />
                      ) : (
                        <Mail className="h-4 w-4 text-blue-400" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/tmrw-admin/contacts/${c.id}`}
                        className={cn(
                          "hover:text-blue-400 transition-colors",
                          c.is_read ? "text-white/60" : "text-white font-medium"
                        )}
                      >
                        {c.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-white/50 hidden md:table-cell">{c.email}</td>
                    <td className="px-4 py-3 text-white/40 hidden lg:table-cell">{c.company || "—"}</td>
                    <td className="px-4 py-3 text-white/40 text-xs">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(c.created_at).toLocaleDateString()}
                      </span>
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

export default AdminContacts;
