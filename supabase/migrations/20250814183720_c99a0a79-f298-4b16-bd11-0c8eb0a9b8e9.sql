-- Fix security issue: Secure the leaderboard by protecting the underlying table
-- and ensuring the view only exposes non-sensitive data

-- Enable RLS on the ok table if not already enabled
ALTER TABLE public.ok ENABLE ROW LEVEL SECURITY;

-- Drop existing policies on ok table
DROP POLICY IF EXISTS "Allow public insert only" ON public.ok;
DROP POLICY IF EXISTS "Allow insert only" ON public.ok;
DROP POLICY IF EXISTS "System access only for select" ON public.ok;

-- Add restrictive policies for ok table
-- Only allow inserts (for form submissions)
CREATE POLICY "Allow public insert" 
ON public.ok 
FOR INSERT 
WITH CHECK (true);

-- Allow system access for select (for leaderboard view)
CREATE POLICY "System access for select" 
ON public.ok 
FOR SELECT 
USING (current_user IN ('authenticator', 'postgres', 'supabase_admin'));

-- Recreate the leaderboard_view with explicit security
DROP VIEW IF EXISTS public.leaderboard_view;

CREATE VIEW public.leaderboard_view 
WITH (security_invoker = true) AS
SELECT 
    id,
    "Username",  -- Only username, no email addresses exposed
    "Punkte",
    created_at,
    "Rundenr"
FROM public.ok
WHERE "Username" IS NOT NULL AND "Punkte" IS NOT NULL;

-- Grant public access to the view (it only contains safe data)
GRANT SELECT ON public.leaderboard_view TO anon, authenticated;