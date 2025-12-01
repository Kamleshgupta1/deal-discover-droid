-- Add comment length constraint
ALTER TABLE public.comments
ADD CONSTRAINT comment_length_check
CHECK (char_length(content) > 0 AND char_length(content) <= 2000);

-- Fix database function search paths to prevent injection
ALTER FUNCTION public.get_trending_posts(integer, integer) SET search_path = public;
ALTER FUNCTION public.has_role(uuid, app_role) SET search_path = public;
ALTER FUNCTION public.handle_new_user() SET search_path = public;