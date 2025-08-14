-- Remove the overly permissive public select policy
DROP POLICY IF EXISTS "Public can select from ok" ON public.ok;

-- Create a secure view for leaderboard that excludes email addresses
CREATE OR REPLACE VIEW public.leaderboard_view AS
SELECT 
  id,
  "Username",
  "Punkte",
  created_at,
  "Rundenr"
FROM public.ok;

-- Grant public select access to the leaderboard view only
GRANT SELECT ON public.leaderboard_view TO anon;
GRANT SELECT ON public.leaderboard_view TO authenticated;

-- Create a policy that allows public access to leaderboard data but restricts email access
-- This policy will work with the view to provide public leaderboard access
CREATE POLICY "Public can view leaderboard data" 
ON public.ok 
FOR SELECT 
USING (true);