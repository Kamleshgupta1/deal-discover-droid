import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock } from 'lucide-react';

interface TrendingPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  reading_time: number;
  view_count: number;
  categories: { name: string; slug: string };
}

export const TrendingPosts = () => {
  const [posts, setPosts] = useState<TrendingPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingPosts();
  }, []);

  const fetchTrendingPosts = async () => {
    try {
      const { data: trendingData, error: trendingError } = await supabase.rpc(
        'get_trending_posts',
        { days_back: 7, limit_count: 5 }
      );

      if (trendingError) throw trendingError;

      if (trendingData && trendingData.length > 0) {
        const postIds = trendingData.map((t: any) => t.post_id);
        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select(`
            id,
            title,
            slug,
            excerpt,
            featured_image,
            reading_time,
            categories (name, slug)
          `)
          .in('id', postIds)
          .eq('published', true);

        if (postsError) throw postsError;

        const postsWithViews = postsData?.map((post) => {
          const viewData = trendingData.find((t: any) => t.post_id === post.id);
          return {
            ...post,
            view_count: Number(viewData?.view_count || 0),
          };
        });

        setPosts(postsWithViews || []);
      }
    } catch (error) {
      console.error('Error fetching trending posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || posts.length === 0) return null;

  return (
    <div className="mb-12 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Trending Now</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <Link key={post.id} to={`/blog/${post.slug}`}>
            <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative">
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-primary/90 backdrop-blur-sm">
                  #{index + 1} Trending
                </Badge>
              </div>
              {post.featured_image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                {post.categories && (
                  <Badge variant="secondary" className="mb-3">
                    {post.categories.name}
                  </Badge>
                )}
                <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  {post.reading_time && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.reading_time} min
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {post.view_count} views
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
