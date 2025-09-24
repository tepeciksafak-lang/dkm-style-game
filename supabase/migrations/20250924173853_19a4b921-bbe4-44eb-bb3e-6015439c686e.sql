-- Add new columns to ok table
ALTER TABLE public.ok 
ADD COLUMN first_name TEXT,
ADD COLUMN last_name TEXT,
ADD COLUMN gender TEXT;

-- Create index on gender column for better performance
CREATE INDEX idx_ok_gender ON public.ok(gender);

-- Update leaderboard_view to include new columns
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