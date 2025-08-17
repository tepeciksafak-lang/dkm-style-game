-- Allow public read access to the ok table for leaderboard functionality
CREATE POLICY "Allow public select for leaderboard" 
ON public.ok 
FOR SELECT 
USING (true);

-- Allow public read access to the leaderboard_view
CREATE POLICY "Allow public select leaderboard_view" 
ON public.leaderboard_view 
FOR SELECT 
USING (true);