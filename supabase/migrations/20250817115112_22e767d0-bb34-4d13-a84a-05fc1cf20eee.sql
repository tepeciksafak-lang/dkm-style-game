-- Allow public read access to the ok table for leaderboard functionality
CREATE POLICY "Allow public select for leaderboard" 
ON public.ok 
FOR SELECT 
USING (true);