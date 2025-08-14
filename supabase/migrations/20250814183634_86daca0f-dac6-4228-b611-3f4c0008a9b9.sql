-- Fix security issue: Add RLS policies to leaderboard_view to prevent unauthorized access
-- This view should only be accessible for legitimate leaderboard display purposes

-- Enable RLS on the leaderboard_view
ALTER VIEW public.leaderboard_view SET (security_invoker = true);

-- Create RLS policies for the leaderboard_view
-- Allow public read access only for leaderboard display (no email data is exposed in this view)
CREATE POLICY "Public can view leaderboard for display" 
ON public.leaderboard_view 
FOR SELECT 
USING (true);

-- Ensure the underlying ok table has proper RLS policies
-- The ok table should not be directly accessible to public users
DROP POLICY IF EXISTS "Allow public insert only" ON public.ok;

-- Add more restrictive policy for ok table - only allow inserts
CREATE POLICY "Allow insert only" 
ON public.ok 
FOR INSERT 
WITH CHECK (true);

-- Ensure leaderboard_view only exposes non-sensitive data
-- Re-create the view to be explicit about what data is exposed
DROP VIEW IF EXISTS public.leaderboard_view;

CREATE VIEW public.leaderboard_view 
WITH (security_invoker = true) AS
SELECT 
    id,
    "Username",  -- Only username, no email addresses
    "Punkte",
    created_at,
    "Rundenr"
FROM public.ok
WHERE "Username" IS NOT NULL AND "Punkte" IS NOT NULL;

-- Grant select permission to the view for public access
GRANT SELECT ON public.leaderboard_view TO anon, authenticated;