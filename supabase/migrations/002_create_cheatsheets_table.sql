-- Create cheatsheets table
CREATE TABLE IF NOT EXISTS public.cheatsheets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    icon TEXT,
    favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create cheatsheet_items table for individual cheat sheet items
CREATE TABLE IF NOT EXISTS public.cheatsheet_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cheatsheet_id UUID NOT NULL REFERENCES public.cheatsheets(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    code TEXT NOT NULL,
    category TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cheatsheets_user_id ON public.cheatsheets(user_id);
CREATE INDEX IF NOT EXISTS idx_cheatsheets_created_at ON public.cheatsheets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cheatsheets_category ON public.cheatsheets(category);
CREATE INDEX IF NOT EXISTS idx_cheatsheets_favorite ON public.cheatsheets(favorite);
CREATE INDEX IF NOT EXISTS idx_cheatsheet_items_cheatsheet_id ON public.cheatsheet_items(cheatsheet_id);
CREATE INDEX IF NOT EXISTS idx_cheatsheet_items_category ON public.cheatsheet_items(category);
CREATE INDEX IF NOT EXISTS idx_cheatsheet_items_order_index ON public.cheatsheet_items(order_index);

-- Enable Row Level Security
ALTER TABLE public.cheatsheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cheatsheet_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for cheatsheets
-- Users can only see their own cheatsheets
CREATE POLICY "Users can view own cheatsheets" ON public.cheatsheets
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own cheatsheets
CREATE POLICY "Users can insert own cheatsheets" ON public.cheatsheets
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own cheatsheets
CREATE POLICY "Users can update own cheatsheets" ON public.cheatsheets
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own cheatsheets
CREATE POLICY "Users can delete own cheatsheets" ON public.cheatsheets
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for cheatsheet_items
-- Users can only see items from their own cheatsheets
CREATE POLICY "Users can view own cheatsheet items" ON public.cheatsheet_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.cheatsheets 
            WHERE id = cheatsheet_id AND user_id = auth.uid()
        )
    );

-- Users can insert items to their own cheatsheets
CREATE POLICY "Users can insert own cheatsheet items" ON public.cheatsheet_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.cheatsheets 
            WHERE id = cheatsheet_id AND user_id = auth.uid()
        )
    );

-- Users can update items in their own cheatsheets
CREATE POLICY "Users can update own cheatsheet items" ON public.cheatsheet_items
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.cheatsheets 
            WHERE id = cheatsheet_id AND user_id = auth.uid()
        )
    );

-- Users can delete items from their own cheatsheets
CREATE POLICY "Users can delete own cheatsheet items" ON public.cheatsheet_items
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.cheatsheets 
            WHERE id = cheatsheet_id AND user_id = auth.uid()
        )
    );

-- Grant necessary permissions
GRANT ALL ON public.cheatsheets TO authenticated;
GRANT ALL ON public.cheatsheet_items TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_cheatsheets_updated_at 
    BEFORE UPDATE ON public.cheatsheets 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
