
CREATE TABLE public.investor_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  initials text NOT NULL,
  ip_address text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.investor_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on investor_submissions"
  ON public.investor_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public read on investor_submissions"
  ON public.investor_submissions FOR SELECT
  TO anon, authenticated
  USING (true);
