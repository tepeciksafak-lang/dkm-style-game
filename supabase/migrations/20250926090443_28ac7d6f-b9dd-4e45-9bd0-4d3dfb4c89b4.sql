-- Fix RLS policy for public inserts
-- Drop the problematic policy
DROP POLICY IF EXISTS "Allow public insert" ON public.ok;

-- Create a new policy that allows all public inserts
CREATE POLICY "Allow all inserts" ON public.ok
FOR INSERT 
TO public
WITH CHECK (true);