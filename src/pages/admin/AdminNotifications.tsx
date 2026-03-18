import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Mail, Clock, MessageSquare, Key } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

type NotificationType = "all" | "unread" | "read";
const PAGE_SIZE = 15;

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<NotificationType>("all");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, [page, filter]);

  async function fetchNotifications() {
    setLoading(true);
    let query = supabase
      .from("contact_submissions")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (filter === "unread") query = query.eq("is_read", false);
    if (filter === "read") query = query.eq("is_read", true);

    const { data, count } = await query;
    setNotifications((data as ContactSubmission[]) || []);
    setTotal(count || 0);
    setLoading(false);
  }

  useEffect(() => {
    const channel = supabase
      .channel("admin-notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "contact_submissions" },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [page, filter]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  function getModuleInfo(n: ContactSubmission) {
    // All contact submissions link to the contacts module
    return {
      label: "Contact Submission",
      icon: MessageSquare,
      path: `/tmrw-admin/contacts/${n.id}`,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    };
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Notifications</h1>
        <p className="text-sm text-white/50 mt-1">{total} total notifications</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(["all", "unread", "read"] as const).map((f) => (
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

      {/* Notifications List */}
      <div className="space-y-2">
        {loading ? (
          <div className="text-white/30 py-8 text-center">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <Bell className="h-8 w-8 text-white/15 mx-auto mb-3" />
            <p className="text-white/40 text-sm">
              {filter === "unread" ? "No unread notifications" : filter === "read" ? "No read notifications" : "No notifications yet"}
            </p>
            <p className="text-white/25 text-xs mt-1">Notifications will appear here when new contact submissions arrive</p>
          </div>
        ) : (
          notifications.map((n) => {
            const module = getModuleInfo(n);
            return (
              <Link
                key={n.id}
                to={module.path}
                className={cn(
                  "flex items-start gap-3 p-4 rounded-xl border transition-colors",
                  n.is_read
                    ? "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
                    : "border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10"
                )}
              >
                <div
                  className={cn(
                    "h-9 w-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                    n.is_read ? "bg-white/5" : module.bgColor
                  )}
                >
                  <Mail className={cn("h-4 w-4", n.is_read ? "text-white/30" : "text-blue-400")} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={cn("text-sm", n.is_read ? "text-white/60" : "text-white font-medium")}>
                      {n.name}
                    </p>
                    <span className="text-xs text-white/30 shrink-0 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(n.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-white/40 mt-0.5">{n.email}</p>
                  <p className="text-sm text-white/40 mt-1 line-clamp-2">{n.message}</p>
                  {/* Module badge */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <module.icon className={cn("h-3 w-3", module.color)} />
                    <span className={cn("text-[10px] font-medium uppercase tracking-wider", module.color)}>
                      {module.label}
                    </span>
                  </div>
                </div>
                {!n.is_read && (
                  <div className="h-2 w-2 rounded-full bg-blue-400 shrink-0 mt-2" />
                )}
              </Link>
            );
          })
        )}
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

export default AdminNotifications;
