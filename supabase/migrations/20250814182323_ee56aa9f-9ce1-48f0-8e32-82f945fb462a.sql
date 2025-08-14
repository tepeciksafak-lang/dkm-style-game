-- Add RLS policies for the Name table to resolve the linter warning
-- Allow public insert for new entries
CREATE POLICY "Allow public insert" 
ON public."Name" 
FOR INSERT 
WITH CHECK (true);

-- Restrict SELECT access to system users only (same as ok table for consistency)
CREATE POLICY "System access only for select" 
ON public."Name" 
FOR SELECT 
USING (current_user IN ('authenticator', 'postgres', 'supabase_admin'));

-- Remove duplicate insert policy from ok table
DROP POLICY IF EXISTS "Public can insert into ok" ON public.ok;