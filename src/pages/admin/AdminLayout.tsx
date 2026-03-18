import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  LayoutDashboard,
  BarChart3,
  MessageSquare,
  Key,
  Bell,
  LogOut,
  Menu,
  X,
  Mail,
  Clock,
  Inbox,
  Users,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import platoIcon from "@/assets/plato-icon.webp";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/tmrw-admin" },
  { label: "Analytics", icon: BarChart3, path: "/tmrw-admin/analytics" },
  { label: "Contact Submissions", icon: MessageSquare, path: "/tmrw-admin/contacts" },
  { label: "API Keys", icon: Key, path: "/tmrw-admin/api-keys" },
  { label: "Notifications", icon: Bell, path: "/tmrw-admin/notifications" },
];

const AdminLayout = () => {
  const { isAuthenticated, logout } = useAdminAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [recentNotifications, setRecentNotifications] = useState<ContactSubmission[]>([]);
  const [loadingNotifs, setLoadingNotifs] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchUnread() {
      const { count } = await supabase
        .from("contact_submissions")
        .select("id", { count: "exact", head: true })
        .eq("is_read", false);
      setUnreadCount(count || 0);
    }
    fetchUnread();

    const channel = supabase
      .channel("admin-unread-count")
      .on("postgres_changes", { event: "*", schema: "public", table: "contact_submissions" }, () => {
        fetchUnread();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // Close popover on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPopoverOpen(false);
      }
    }
    if (popoverOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [popoverOpen]);

  const handleBellClick = async () => {
    setPopoverOpen((prev) => !prev);
    if (!popoverOpen) {
      setLoadingNotifs(true);
      const { data } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      setRecentNotifications((data as ContactSubmission[]) || []);
      setLoadingNotifs(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/tmrw-admin/login" replace />;
  }

  const isActive = (path: string) => {
    if (path === "/tmrw-admin") return location.pathname === "/tmrw-admin";
    return location.pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-white/10">
        <Link to="/tmrw-admin" className="flex items-center gap-2">
          <div
            className="h-7 w-7 animated-gradient-icon-bright"
            style={{
              WebkitMaskImage: `url(${platoIcon})`,
              maskImage: `url(${platoIcon})`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />
          <span className="text-sm font-bold text-white tracking-tight">TMRW Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
              isActive(item.path)
                ? "bg-white/10 text-white font-medium"
                : "text-white/50 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-white/10">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>TMRW Admin</title>
      </Helmet>

      <div className="min-h-screen flex bg-[hsl(220,20%,4%)]">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-white/10 bg-[hsl(220,20%,6%)] fixed inset-y-0 left-0 z-40">
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed inset-y-0 left-0 z-[60] w-60 bg-[hsl(220,20%,6%)] border-r border-white/10 lg:hidden"
              >
                <SidebarContent />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
          {/* Top Header */}
          <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 border-b border-white/10 bg-[hsl(220,20%,4%,0.95)] backdrop-blur-xl">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1.5 text-white/60 hover:text-white mr-3"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <h2 className="text-sm font-medium text-white/80">
                {menuItems.find((m) => isActive(m.path))?.label || "Admin"}
              </h2>
            </div>

            {/* Bell with popover */}
            <div className="relative" ref={popoverRef}>
              <button
                onClick={handleBellClick}
                className="relative p-2 text-white/50 hover:text-white transition-colors"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {popoverOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-80 rounded-xl border border-white/10 bg-[hsl(220,20%,8%)] shadow-2xl overflow-hidden z-50"
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                      <span className="text-sm font-medium text-white">Notifications</span>
                      <Link
                        to="/tmrw-admin/notifications"
                        onClick={() => setPopoverOpen(false)}
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        View all
                      </Link>
                    </div>

                    {loadingNotifs ? (
                      <div className="py-8 text-center text-white/30 text-sm">Loading...</div>
                    ) : recentNotifications.length === 0 ? (
                      <div className="py-10 text-center">
                        <Inbox className="h-8 w-8 text-white/15 mx-auto mb-2" />
                        <p className="text-sm text-white/40">All caught up!</p>
                        <p className="text-xs text-white/25 mt-1">No notifications to show</p>
                      </div>
                    ) : (
                      <div className="max-h-80 overflow-y-auto">
                        {recentNotifications.map((n) => (
                          <Link
                            key={n.id}
                            to={`/tmrw-admin/contacts/${n.id}`}
                            onClick={() => setPopoverOpen(false)}
                            className={cn(
                              "flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0",
                              !n.is_read && "bg-blue-500/5"
                            )}
                          >
                            <div className={cn(
                              "h-7 w-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                              n.is_read ? "bg-white/5" : "bg-blue-500/10"
                            )}>
                              <Mail className={cn("h-3.5 w-3.5", n.is_read ? "text-white/30" : "text-blue-400")} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <p className={cn("text-xs truncate", n.is_read ? "text-white/50" : "text-white font-medium")}>
                                  {n.name}
                                </p>
                                <span className="text-[10px] text-white/25 shrink-0 flex items-center gap-0.5">
                                  <Clock className="h-2.5 w-2.5" />
                                  {new Date(n.created_at).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-[11px] text-white/30 mt-0.5 line-clamp-1">{n.message}</p>
                            </div>
                            {!n.is_read && (
                              <div className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0 mt-2" />
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
