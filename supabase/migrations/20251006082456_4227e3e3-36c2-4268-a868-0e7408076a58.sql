-- Aktualisiere alte Einträge: Setze Gesamtscore für Runde 1 auf Punkte (wenn NULL)
UPDATE ok
SET "Gesamtscore" = "Punkte"
WHERE "Rundenr" = '1' AND "Gesamtscore" IS NULL;

-- Berechne Gesamtscore für Runde 2 (wenn NULL)
UPDATE ok AS r2
SET "Gesamtscore" = CAST((
  SELECT CAST("Punkte" AS INTEGER)
  FROM ok AS r1
  WHERE r1."Mailadresse" = r2."Mailadresse"
  AND r1."Rundenr" = '1'
  LIMIT 1
) + CAST(r2."Punkte" AS INTEGER) AS TEXT)
WHERE r2."Rundenr" = '2' AND r2."Gesamtscore" IS NULL;

-- Berechne Gesamtscore für Runde 3 (wenn NULL)
UPDATE ok AS r3
SET "Gesamtscore" = CAST((
  SELECT SUM(CAST("Punkte" AS INTEGER))
  FROM ok
  WHERE "Mailadresse" = r3."Mailadresse"
  AND "Rundenr" IN ('1', '2')
) + CAST(r3."Punkte" AS INTEGER) AS TEXT)
WHERE r3."Rundenr" = '3' AND r3."Gesamtscore" IS NULL;