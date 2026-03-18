import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Key, Activity, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalContacts: 0,
    unreadContacts: 0,
    totalApiKeys: 0,
    activeApiKeys: 0,
    totalApiRequests: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const [contacts, unread, apiKeys, activeKeys, logs] = await Promise.all([
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("is_read", false),
        supabase.from("api_keys").select("id", { count: "exact", head: true }),
        supabase.from("api_keys").select("id", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("api_usage_logs").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        totalContacts: contacts.count || 0,
        unreadContacts: unread.count || 0,
        totalApiKeys: apiKeys.count || 0,
        activeApiKeys: activeKeys.count || 0,
        totalApiRequests: logs.count || 0,
      });
    }
    fetchStats();
  }, []);

  const cards = [
    {
      label: "Unread Messages",
      value: stats.unreadContacts,
      total: stats.totalContacts,
      icon: MessageSquare,
      color: "from-blue-500 to-cyan-500",
      link: "/tmrw-admin/contacts",
    },
    {
      label: "Active API Keys",
      value: stats.activeApiKeys,
      total: stats.totalApiKeys,
      icon: Key,
      color: "from-purple-500 to-pink-500",
      link: "/tmrw-admin/api-keys",
    },
    {
      label: "API Requests",
      value: stats.totalApiRequests,
      total: null,
      icon: Activity,
      color: "from-emerald-500 to-teal-500",
      link: "/tmrw-admin/api-keys",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="text-sm text-white/50 mt-1">Overview of your admin panel</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.link}
            className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.06] transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                <card.icon className="h-5 w-5 text-white" />
              </div>
              {card.total !== null && (
                <span className="text-xs text-white/40">of {card.total}</span>
              )}
            </div>
            <p className="text-2xl font-bold text-white">{card.value}</p>
            <p className="text-sm text-white/50 mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-center gap-2 text-white/60 mb-2">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm font-medium">Google Analytics</span>
        </div>
        <p className="text-sm text-white/40">
          Analytics data will appear here once the Google Analytics service account is connected.
        </p>
        <Link
          to="/tmrw-admin/analytics"
          className="inline-flex mt-3 text-sm text-blue-400 hover:text-blue-300"
        >
          Go to Analytics →
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
