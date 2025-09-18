-- Update existing scores to use the new scoring system
-- Convert old scores (1-7) to new scoring system based on fair multiplication
-- Old scores 1-7 will be converted to new system where each point represents ~28 points

-- First, let's create a backup of current scores in case we need to revert
ALTER TABLE ok ADD COLUMN IF NOT EXISTS old_punkte TEXT;

-- Update old_punkte with current values if not already set
UPDATE ok SET old_punkte = "Punkte" WHERE old_punkte IS NULL;

-- Convert scores to new system
-- For scores 1-7 (old system): multiply by 28 for fair scaling
-- For scores > 7: these are likely already in new system or test data
UPDATE ok 
SET "Punkte" = CASE 
  WHEN CAST("Punkte" AS INTEGER) <= 7 THEN CAST(CAST("Punkte" AS INTEGER) * 28 AS TEXT)
  WHEN CAST("Punkte" AS INTEGER) BETWEEN 8 AND 196 THEN "Punkte" -- Already in new system
  ELSE CAST(CAST("Punkte" AS INTEGER) * 28 AS TEXT) -- Apply conversion anyway for consistency
END
WHERE "Punkte" ~ '^[0-9]+$'; -- Only update numeric values

-- Ensure leaderboard_view sorts by numeric values properly
-- Update the view to cast Punkte as integer for proper sorting
DROP VIEW IF EXISTS leaderboard_view;
CREATE VIEW leaderboard_view AS 
SELECT 
  id,
  "Username",
  "Punkte",
  "Rundenr",
  created_at
FROM ok 
ORDER BY CAST("Punkte" AS INTEGER) DESC, created_at ASC;