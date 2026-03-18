import { useState } from "react";
import { BarChart3, Users, Eye, Clock, Globe, Monitor, Smartphone, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type AnalyticsTab = "overview" | "audience" | "pages" | "realtime" | "geography" | "devices";

const tabs: { key: AnalyticsTab; label: string; icon: typeof BarChart3 }[] = [
  { key: "overview", label: "Overview", icon: BarChart3 },
  { key: "realtime", label: "Realtime", icon: Clock },
  { key: "audience", label: "Audience", icon: Users },
  { key: "pages", label: "Pages", icon: Eye },
  { key: "geography", label: "Geography", icon: Globe },
  { key: "devices", label: "Devices", icon: Monitor },
];

const AdminAnalytics = () => {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>("overview");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Analytics</h1>
        <p className="text-sm text-white/50 mt-1">Google Analytics data for your website</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
              activeTab === tab.key
                ? "bg-white/10 text-white"
                : "text-white/40 hover:text-white/60 hover:bg-white/5"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Placeholder */}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 min-h-[400px] flex flex-col items-center justify-center">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
          {activeTab === "overview" && <BarChart3 className="h-8 w-8 text-blue-400" />}
          {activeTab === "realtime" && <Clock className="h-8 w-8 text-green-400" />}
          {activeTab === "audience" && <Users className="h-8 w-8 text-purple-400" />}
          {activeTab === "pages" && <Eye className="h-8 w-8 text-cyan-400" />}
          {activeTab === "geography" && <Globe className="h-8 w-8 text-orange-400" />}
          {activeTab === "devices" && <Monitor className="h-8 w-8 text-pink-400" />}
        </div>
        <h3 className="text-lg font-medium text-white mb-2 capitalize">{activeTab}</h3>
        <p className="text-sm text-white/40 text-center max-w-sm">
          Connect your Google Analytics service account to view {activeTab} data. 
          Charts and interactive graphs will appear here.
        </p>
        <div className="flex items-center gap-1 mt-4 text-xs text-blue-400">
          <ArrowUpRight className="h-3 w-3" />
          <span>Requires GA4 service account credentials</span>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
