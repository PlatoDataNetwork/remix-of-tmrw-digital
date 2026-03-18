import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Mail, Clock } from "lucide-react";
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

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      setNotifications((data as ContactSubmission[]) || []);
      setLoading(false);
    }
    fetch();

    // Subscribe to new submissions
    const channel = supabase
      .channel("admin-notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "contact_submissions" },
        (payload) => {
          setNotifications((prev) => [payload.new as ContactSubmission, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Notifications</h1>
        <p className="text-sm text-white/50 mt-1">Recent contact form submissions</p>
      </div>

      <div className="space-y-2">
        {loading ? (
          <div className="text-white/30 py-8 text-center">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center">
            <Bell className="h-8 w-8 text-white/20 mx-auto mb-3" />
            <p className="text-white/40">No notifications yet</p>
          </div>
        ) : (
          notifications.map((n) => (
            <Link
              key={n.id}
              to={`/tmrw-admin/contacts/${n.id}`}
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
                  n.is_read ? "bg-white/5" : "bg-blue-500/10"
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
              </div>
              {!n.is_read && (
                <div className="h-2 w-2 rounded-full bg-blue-400 shrink-0 mt-2" />
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminNotifications;
