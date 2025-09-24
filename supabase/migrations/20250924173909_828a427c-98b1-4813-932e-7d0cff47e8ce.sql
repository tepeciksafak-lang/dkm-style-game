-- Fix security definer view by recreating without SECURITY DEFINER
DROP VIEW IF EXISTS public.leaderboard_view;

CREATE VIEW public.leaderboard_view AS
SELECT 
  id,
  created_at,
  "Punkte",
  "Rundenr",
  "Username",
  first_name,
  last_name,
  gender
FROM public.ok
WHERE "Status" = 'submitted'
ORDER BY CAST("Punkte" AS INTEGER) DESC;