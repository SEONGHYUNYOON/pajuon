-- Add name column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS name TEXT;

-- Comment on column
COMMENT ON COLUMN public.profiles.name IS 'User real name';
