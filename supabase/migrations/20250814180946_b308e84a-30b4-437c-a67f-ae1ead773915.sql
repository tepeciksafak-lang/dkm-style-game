-- Drop the existing view and recreate it with explicit SECURITY INVOKER
DROP VIEW IF EXISTS public.leaderboard_view;

-- Create the view with explicit SECURITY INVOKER to ensure it uses the querying user's permissions
CREATE VIEW public.leaderboard_view 
WITH (security_invoker = true) AS
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