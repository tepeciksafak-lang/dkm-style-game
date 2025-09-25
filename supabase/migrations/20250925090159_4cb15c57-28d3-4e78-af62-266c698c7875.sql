-- Fix leaderboard view to show data properly
DROP VIEW IF EXISTS public.leaderboard_view;

-- Create view with security definer to bypass RLS for public display
CREATE OR REPLACE VIEW public.leaderboard_view 
WITH (security_invoker = false) AS
SELECT
  id,
  "Username",
  "Punkte",
  created_at,
  "Rundenr"
FROM public.ok
WHERE "Username" IS NOT NULL AND "Punkte" IS NOT NULL
ORDER BY "Punkte"::int DESC, created_at ASC;

-- Grant access to view for anonymous and authenticated users
GRANT SELECT ON public.leaderboard_view TO anon, authenticated;