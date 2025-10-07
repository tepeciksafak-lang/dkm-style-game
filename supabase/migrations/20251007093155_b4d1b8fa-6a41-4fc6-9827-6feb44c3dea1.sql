-- Drop der bestehenden View
DROP VIEW IF EXISTS leaderboard_view;

-- Neue View ohne Status-Filter erstellen
CREATE OR REPLACE VIEW leaderboard_view AS
SELECT 
  id,
  created_at,
  "Username",
  "Mailadresse",
  "Rundenr",
  "Punkte",
  "Gesamtscore",
  COALESCE("Gesamtscore", "Punkte") AS display_score
FROM ok
ORDER BY (COALESCE("Gesamtscore", "Punkte")::integer) DESC, created_at;