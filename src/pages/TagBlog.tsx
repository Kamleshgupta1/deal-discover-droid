import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { SEOHead } from '@/components/seo/SEOHead';
import { Calendar, Clock, ArrowLeft, Tag as TagIcon } from 'lucide-react';
import { format } from 'date-fns';

export const TagBlog = () => {
  const { slug } = useParams<{ slug: string }>();
  const [tag, setTag] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTagAndPosts();
  }, [slug]);

  const fetchTagAndPosts = async () => {
    try {
      const { data: tagData } = await supabase
        .from('tags')
        .select('*')
        .eq('slug', slug)
        .single();

      if (tagData) {
        setTag(tagData);
        
        const { data: postTagsData } = await supabase
          .from('post_tags')
          .select(`
            posts (
              *,
              categories (name, slug),
              post_tags (tags (name, slug))
            )
          `)
          .eq('tag_id', tagData.id);

        const postsData = postTagsData
          ?.map((pt: any) => pt.posts)
          .filter((post: any) => post.published)
          .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        setPosts(postsData || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!tag) return <div className="container py-12">Tag not found</div>;

  return (
    <>
      <SEOHead
        title={`${tag.name} - Tagged Posts`}
        description={`Browse all posts tagged with ${tag.name}`}
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container py-12">
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TagIcon className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {tag.name}
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged with "{tag.name}"
            </p>
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
                    {post.categories && (
                      <Badge variant="secondary" className="mb-3">
                        {post.categories.name}
                      </Badge>
                    )}
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
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No posts with this tag yet</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
