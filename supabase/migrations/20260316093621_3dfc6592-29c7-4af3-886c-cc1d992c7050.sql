DROP POLICY "Allow public insert on api_keys" ON public.api_keys;

CREATE POLICY "Allow public insert on api_keys"
  ON public.api_keys
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    full_name IS NOT NULL AND 
    email IS NOT NULL AND 
    length(full_name) <= 200 AND 
    length(email) <= 255
  );