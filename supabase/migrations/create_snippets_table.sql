-- Create snippets table
CREATE TABLE IF NOT EXISTS public.snippets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    code TEXT NOT NULL,
    language TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    favorite BOOLEAN DEFAULT FALSE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_snippets_user_id ON public.snippets(user_id);
CREATE INDEX IF NOT EXISTS idx_snippets_created_at ON public.snippets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_snippets_language ON public.snippets(language);
CREATE INDEX IF NOT EXISTS idx_snippets_favorite ON public.snippets(favorite);
CREATE INDEX IF NOT EXISTS idx_snippets_tags ON public.snippets USING GIN(tags);

-- Enable Row Level Security
ALTER TABLE public.snippets ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own snippets
CREATE POLICY "Users can view own snippets" ON public.snippets
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own snippets
CREATE POLICY "Users can insert own snippets" ON public.snippets
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own snippets
CREATE POLICY "Users can update own snippets" ON public.snippets
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own snippets
CREATE POLICY "Users can delete own snippets" ON public.snippets
    FOR DELETE USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT ALL ON public.snippets TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;
