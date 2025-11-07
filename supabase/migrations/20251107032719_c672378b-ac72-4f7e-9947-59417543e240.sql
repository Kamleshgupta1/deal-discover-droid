-- Add tags table
CREATE TABLE public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Add post_tags junction table for many-to-many relationship
CREATE TABLE public.post_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(post_id, tag_id)
);

-- Add SEO fields to posts table
ALTER TABLE public.posts 
ADD COLUMN meta_description TEXT,
ADD COLUMN meta_keywords TEXT[],
ADD COLUMN og_title TEXT,
ADD COLUMN og_description TEXT,
ADD COLUMN og_image TEXT,
ADD COLUMN reading_time INTEGER,
ADD COLUMN excerpt TEXT;

-- Enable RLS on tags
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

-- Enable RLS on post_tags
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;

-- RLS policies for tags
CREATE POLICY "Anyone can view tags"
ON public.tags FOR SELECT
USING (true);

CREATE POLICY "Only admins can manage tags"
ON public.tags FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for post_tags
CREATE POLICY "Anyone can view post tags"
ON public.post_tags FOR SELECT
USING (true);

CREATE POLICY "Only admins can manage post tags"
ON public.post_tags FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for better performance
CREATE INDEX idx_post_tags_post_id ON public.post_tags(post_id);
CREATE INDEX idx_post_tags_tag_id ON public.post_tags(tag_id);
CREATE INDEX idx_posts_slug ON public.posts(slug);
CREATE INDEX idx_tags_slug ON public.tags(slug);
CREATE INDEX idx_categories_slug ON public.categories(slug);