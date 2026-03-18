
-- Contact form submissions table
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  is_marked boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on contact_submissions"
  ON public.contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (name IS NOT NULL AND email IS NOT NULL AND message IS NOT NULL);

CREATE POLICY "Allow public read on contact_submissions"
  ON public.contact_submissions FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public update on contact_submissions"
  ON public.contact_submissions FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- API usage logs table
CREATE TABLE public.api_usage_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_id uuid REFERENCES public.api_keys(id) ON DELETE CASCADE,
  endpoint text,
  method text DEFAULT 'GET',
  ip_address text,
  country_code text,
  status_code integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.api_usage_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on api_usage_logs"
  ON public.api_usage_logs FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public insert on api_usage_logs"
  ON public.api_usage_logs FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public update on api_keys"
  ON public.api_keys FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
