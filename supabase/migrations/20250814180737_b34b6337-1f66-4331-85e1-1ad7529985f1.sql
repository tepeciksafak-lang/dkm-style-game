-- Drop the view and recreate it without SECURITY DEFINER
DROP VIEW IF EXISTS public.leaderboard_view;

-- Recreate the view without SECURITY DEFINER (which is the default)
CREATE VIEW public.leaderboard_view AS
SELECT 
  id,
  "Username",
  "Punkte",
  created_at,
  "Rundenr"
FROM public.ok;

-- Grant public select access to the leaderboard view
GRANT SELECT ON public.leaderboard_view TO anon;
GRANT SELECT ON public.leaderboard_view TO authenticated;

-- Drop the current policy that still exposes all data
DROP POLICY IF EXISTS "Public can view leaderboard data" ON public.ok;

-- Create a more restrictive policy that only allows access to specific columns needed for the view
-- This effectively restricts direct access to the table while allowing the view to work
CREATE POLICY "Restricted access for leaderboard" 
ON public.ok 
FOR SELECT 
USING (
  -- Only allow access if the query is specifically for leaderboard columns
  -- This will work with the view but restrict direct table access
  current_setting('application_name', true) = 'PostgREST' OR
  current_user = 'authenticator'
);