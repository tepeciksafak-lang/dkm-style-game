-- Add Gesamtscore column to ok table
ALTER TABLE ok ADD COLUMN IF NOT EXISTS "Gesamtscore" text;

-- Drop and recreate leaderboard_view to include Gesamtscore
DROP VIEW IF EXISTS leaderboard_view;

CREATE VIEW leaderboard_view AS
SELECT 
  id,
  created_at,
  "Username",
  "Mailadresse",
  "Rundenr",
  "Punkte",
  "Gesamtscore",
  COALESCE("Gesamtscore", "Punkte") as display_score
FROM ok
WHERE "Status" = 'success'
ORDER BY 
  CAST(COALESCE("Gesamtscore", "Punkte") AS INTEGER) DESC,
  created_at ASC;