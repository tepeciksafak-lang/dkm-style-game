-- Fix security vulnerability: Remove public access to email addresses in ok table

-- 1. Drop the overly permissive public select policy
DROP POLICY IF EXISTS "Public can select from ok" ON public.ok;

-- 2. Create a restrictive policy that only allows authenticated users to see their own data
CREATE POLICY "Users can only see their own data" ON public.ok
    FOR SELECT
    USING (auth.uid()::text = Mailadresse OR auth.role() = 'service_role');

-- 3. Create a secure leaderboard view that exposes only non-sensitive data
CREATE OR REPLACE VIEW public.leaderboard_view AS
SELECT 
    id,
    Username,
    Punkte,
    created_at,
    Rundenr,
    ROW_NUMBER() OVER (ORDER BY Punkte::int DESC, created_at ASC) as rank
FROM public.ok
WHERE Username IS NOT NULL AND Punkte IS NOT NULL;

-- 4. Grant public access to the leaderboard view (no sensitive data exposed)
GRANT SELECT ON public.leaderboard_view TO anon, authenticated;

-- 5. Set security invoker to false to allow public read access to the view
ALTER VIEW public.leaderboard_view SET (security_invoker = false);