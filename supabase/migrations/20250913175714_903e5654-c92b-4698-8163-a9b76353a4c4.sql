-- Add unique constraint to prevent duplicate entries for same email + round
ALTER TABLE public.ok 
ADD CONSTRAINT unique_email_round UNIQUE (Mailadresse, Rundenr);

-- Add index for better performance on email + round queries
CREATE INDEX IF NOT EXISTS idx_ok_email_round ON public.ok (Mailadresse, Rundenr);