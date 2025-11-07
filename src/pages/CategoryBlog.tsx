import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { SEOHead } from '@/components/seo/SEOHead';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

export const CategoryBlog = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryAndPosts();
  }, [slug]);

  const fetchCategoryAndPosts = async () => {
    try {
      const { data: catData } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single();

      if (catData) {
        setCategory(catData);
        
        const { data: postsData } = await supabase
          .from('posts')
          .select(`
            *,
            categories (name, slug),
            post_tags (tags (name, slug))
          `)
          .eq('category_id', catData.id)
          .eq('published', true)
          .order('created_at', { ascending: false });

        setPosts(postsData || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!category) return <div className="container py-12">Category not found</div>;

  return (
    <>
      <SEOHead
        title={`${category.name} - Blog Category`}
        description={category.description || `Browse all articles in ${category.name}`}
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container py-12">
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {category.description}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`}>
                <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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
                    <h2 className="text-xl font-bold mb-3 line-clamp-2 hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(post.created_at), 'MMM dd, yyyy')}
                      </div>
                      {post.reading_time && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.reading_time} min
                        </div>
                      )}
                    </div>
                    {post.post_tags && post.post_tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-4">
                        {post.post_tags.slice(0, 3).map((pt: any) => (
                          <Badge key={pt.tags.slug} variant="outline" className="text-xs">
                            {pt.tags.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No posts in this category yet</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
