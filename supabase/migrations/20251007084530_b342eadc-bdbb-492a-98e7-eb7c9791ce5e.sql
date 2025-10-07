-- Entferne die bestehenden einschränkenden SELECT-Policies
DROP POLICY IF EXISTS "Allow authorized emails select" ON ok;
DROP POLICY IF EXISTS "System access for select" ON ok;

-- Erstelle eine neue offene SELECT-Policy für alle
CREATE POLICY "Allow all to read"
ON ok
FOR SELECT
USING (true);

-- Optional: Korrigiere die falschen Gesamtscore-Werte
UPDATE ok SET "Gesamtscore" = '180' WHERE id = 10150;
UPDATE ok SET "Gesamtscore" = '230' WHERE id = 10151;