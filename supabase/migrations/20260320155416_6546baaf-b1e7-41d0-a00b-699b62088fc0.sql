
-- PSI audit history table
CREATE TABLE public.psi_audit_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  strategy text NOT NULL DEFAULT 'desktop',
  performance_score numeric,
  accessibility_score numeric,
  best_practices_score numeric,
  seo_score numeric,
  fcp_ms numeric,
  lcp_ms numeric,
  tbt_ms numeric,
  cls numeric,
  speed_index_ms numeric,
  tti_ms numeric,
  is_scheduled boolean NOT NULL DEFAULT false,
  alerts jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- PSI alert thresholds config (single row)
CREATE TABLE public.psi_alert_config (
  id integer PRIMARY KEY DEFAULT 1,
  performance_threshold numeric NOT NULL DEFAULT 0.9,
  accessibility_threshold numeric NOT NULL DEFAULT 0.9,
  best_practices_threshold numeric NOT NULL DEFAULT 0.9,
  seo_threshold numeric NOT NULL DEFAULT 0.9,
  target_url text NOT NULL DEFAULT 'https://www.tmrw-digital.com',
  strategy text NOT NULL DEFAULT 'desktop',
  is_enabled boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert default config
INSERT INTO public.psi_alert_config (id) VALUES (1);

-- RLS
ALTER TABLE public.psi_audit_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.psi_alert_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read psi_audit_history" ON public.psi_audit_history FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public insert psi_audit_history" ON public.psi_audit_history FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow public read psi_alert_config" ON public.psi_alert_config FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public update psi_alert_config" ON public.psi_alert_config FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
