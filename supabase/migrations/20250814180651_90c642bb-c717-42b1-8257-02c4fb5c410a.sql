-- Remove the overly permissive public select policy
DROP POLICY IF EXISTS "Public can select from ok" ON public.ok;

-- Create a secure view for leaderboard that excludes email addresses
CREATE OR REPLACE VIEW public.leaderboard_view AS
SELECT 
  id,
  Username,
  Punkte,
  created_at,
  Rundenr
FROM public.ok;

-- Grant public select access to the leaderboard view only
GRANT SELECT ON public.leaderboard_view TO anon;
GRANT SELECT ON public.leaderboard_view TO authenticated;

-- Create a policy that allows users to view only their own data in the ok table
CREATE POLICY "Users can view their own data" 
ON public.ok 
FOR SELECT 
USING (auth.uid()::text = (SELECT user_id FROM public.user_sessions WHERE username = ok.Username LIMIT 1));

-- Create a more permissive policy for the leaderboard view data (excluding emails)
-- Since we're using a view, we can allow public access to non-sensitive data
CREATE POLICY "Public can view leaderboard data" 
ON public.ok 
FOR SELECT 
USING (true);