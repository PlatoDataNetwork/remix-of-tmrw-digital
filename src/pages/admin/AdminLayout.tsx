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
} from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import platoIcon from "@/assets/plato-icon.webp";

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

  if (!isAuthenticated) {
    return <Navigate to="/tmrw-admin/login" replace />;
  }

  const isActive = (path: string) => {
    if (path === "/tmrw-admin") return location.pathname === "/tmrw-admin";
    return location.pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
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

      {/* Nav Links */}
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

      {/* Logout */}
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
          <header className="sticky top-0 z-30 flex items-center h-14 px-4 border-b border-white/10 bg-[hsl(220,20%,4%,0.95)] backdrop-blur-xl">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 text-white/60 hover:text-white mr-3"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <h2 className="text-sm font-medium text-white/80">
              {menuItems.find((m) => isActive(m.path))?.label || "Admin"}
            </h2>
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
