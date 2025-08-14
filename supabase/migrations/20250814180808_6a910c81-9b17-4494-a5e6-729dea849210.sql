-- Drop the problematic policy
DROP POLICY IF EXISTS "Restricted access for leaderboard" ON public.ok;

-- Disable RLS on the view (views don't need RLS, they inherit from their source tables)
-- Create a simple policy that blocks all direct access to the ok table
CREATE POLICY "Block direct table access" 
ON public.ok 
FOR ALL
USING (false)
WITH CHECK (false);

-- Allow only INSERT for new submissions (keep the existing insert policy working)
DROP POLICY IF EXISTS "Block direct table access" ON public.ok;

-- Create policies that allow INSERT but restrict SELECT to system users only
CREATE POLICY "Allow public insert only" 
ON public.ok 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "System access only for select" 
ON public.ok 
FOR SELECT 
USING (current_user IN ('authenticator', 'postgres', 'supabase_admin'));