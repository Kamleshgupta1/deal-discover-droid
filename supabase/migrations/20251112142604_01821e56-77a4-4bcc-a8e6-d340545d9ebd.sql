-- Create favorites table for saving items
CREATE TABLE IF NOT EXISTS public.favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_type text NOT NULL, -- 'category', 'search', 'result'
  item_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Users can view their own favorites
CREATE POLICY "Users can view own favorites"
  ON public.favorites
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own favorites
CREATE POLICY "Users can insert own favorites"
  ON public.favorites
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own favorites
CREATE POLICY "Users can delete own favorites"
  ON public.favorites
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create search history table
CREATE TABLE IF NOT EXISTS public.search_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  search_query text NOT NULL,
  category_id text,
  location text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;

-- Users can view their own search history
CREATE POLICY "Users can view own search history"
  ON public.search_history
  FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Users can insert search history
CREATE POLICY "Users can insert search history"
  ON public.search_history
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Users can delete their own search history
CREATE POLICY "Users can delete own search history"
  ON public.search_history
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create user analytics table
CREATE TABLE IF NOT EXISTS public.user_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  event_data jsonb,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;

-- Users can view their own analytics
CREATE POLICY "Users can view own analytics"
  ON public.user_analytics
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert analytics
CREATE POLICY "Users can insert analytics"
  ON public.user_analytics
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_search_history_user_id ON public.search_history(user_id);
CREATE INDEX IF NOT EXISTS idx_user_analytics_user_id ON public.user_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_search_history_created_at ON public.search_history(created_at DESC);