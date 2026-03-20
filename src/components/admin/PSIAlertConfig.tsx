import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Settings, Save, CheckCircle2, Zap, Eye, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

interface Config {
  performance_threshold: number;
  accessibility_threshold: number;
  best_practices_threshold: number;
  seo_threshold: number;
  target_url: string;
  strategy: string;
  is_enabled: boolean;
}

const CATEGORIES = [
  { key: "performance_threshold" as const, label: "Performance", icon: Zap, color: "text-emerald-400" },
  { key: "accessibility_threshold" as const, label: "Accessibility", icon: Eye, color: "text-blue-400" },
  { key: "best_practices_threshold" as const, label: "Best Practices", icon: CheckCircle2, color: "text-purple-400" },
  { key: "seo_threshold" as const, label: "SEO", icon: LayoutDashboard, color: "text-amber-400" },
];

export default function PSIAlertConfig() {
  const [config, setConfig] = useState<Config | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("psi_alert_config")
        .select("*")
        .eq("id", 1)
        .single();
      if (data) setConfig(data as Config);
    }
    load();
  }, []);

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);
    await supabase
      .from("psi_alert_config")
      .update({ ...config, updated_at: new Date().toISOString() })
      .eq("id", 1);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!config) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 animate-pulse">
        <div className="h-4 w-48 bg-white/10 rounded" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-medium text-white flex items-center gap-2">
          <Settings className="h-4 w-4 text-white/40" />
          Scheduled Audit Configuration
        </h3>
        <div className="flex items-center gap-3">
          {/* Enabled toggle */}
          <button
            onClick={() => setConfig({ ...config, is_enabled: !config.is_enabled })}
            className={cn(
              "relative h-6 w-11 rounded-full transition-colors",
              config.is_enabled ? "bg-emerald-500" : "bg-white/10"
            )}
          >
            <span className={cn(
              "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform shadow-sm",
              config.is_enabled ? "translate-x-[22px]" : "translate-x-0.5"
            )} />
          </button>
          <span className={cn("text-xs", config.is_enabled ? "text-emerald-400" : "text-white/30")}>
            {config.is_enabled ? "Active" : "Paused"}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* URL & Strategy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-white/40 mb-1 block">Target URL</label>
            <input
              type="url"
              value={config.target_url}
              onChange={e => setConfig({ ...config, target_url: e.target.value })}
              className="w-full h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/20"
            />
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1 block">Strategy</label>
            <select
              value={config.strategy}
              onChange={e => setConfig({ ...config, strategy: e.target.value })}
              className="w-full h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/20 appearance-none"
            >
              <option value="desktop">Desktop</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>
        </div>

        {/* Threshold sliders */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {CATEGORIES.map(cat => (
            <div key={cat.key} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <cat.icon className={cn("h-3.5 w-3.5", cat.color)} />
                <span className="text-xs text-white/60">{cat.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(config[cat.key] * 100)}
                  onChange={e => setConfig({ ...config, [cat.key]: parseInt(e.target.value) / 100 })}
                  className="flex-1 h-1.5 accent-white/50"
                />
                <span className={cn("text-sm font-bold tabular-nums w-8 text-right", cat.color)}>
                  {Math.round(config[cat.key] * 100)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className={cn(
              "flex items-center gap-2 px-4 h-9 rounded-lg text-sm font-medium transition-colors",
              saved
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-white/10 text-white hover:bg-white/15 active:scale-[0.97]"
            )}
          >
            {saved ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Saved
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {saving ? "Saving…" : "Save Config"}
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-white/20">
          Audits run daily at 6:00 AM UTC. Alerts trigger when any score drops below its threshold.
        </p>
      </div>
    </div>
  );
}
