-- Remove the overly permissive policy
DROP POLICY IF EXISTS "Allow public select for leaderboard" ON public.ok;

-- Create restricted policy for authorized emails only
CREATE POLICY "Allow authorized emails select" ON public.ok
    FOR SELECT USING ("Mailadresse" IN ('safak.t@gmx.de', 'info@salevium.de'));