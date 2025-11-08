import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { SEOHead } from '@/components/seo/SEOHead';
import { Calendar, Clock, FileText } from 'lucide-react';
import { format } from 'date-fns';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  reading_time: number;
  created_at: string;
  categories: { name: string; slug: string };
}

interface Author {
  id: string;
  full_name: string;
  posts: Post[];
}

export const AuthorProfile = () => {
  const { authorId } = useParams<{ authorId: string }>();
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthor();
  }, [authorId]);

  const fetchAuthor = async () => {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('id', authorId)
        .single();

      if (profileError) throw profileError;

      const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select(`
          id,
          title,
          slug,
          excerpt,
          featured_image,
          reading_time,
          created_at,
          categories (name, slug)
        `)
        .eq('author_id', authorId)
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      setAuthor({ ...profile, posts: posts || [] });
    } catch (error) {
      console.error('Error fetching author:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!author) return <div className="container py-12">Author not found</div>;

  return (
    <>
      <SEOHead
        title={`${author.full_name} - Author Profile`}
        description={`Read all articles by ${author.full_name}`}
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container py-12">
          <Card className="p-8 mb-12 animate-fade-in">
            <div className="flex items-center gap-6 mb-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-3xl">
                  {author.full_name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  {author.full_name}
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {author.posts.length} Articles
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div>
            <h2 className="text-2xl font-bold mb-6">Articles by {author.full_name}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {author.posts.map((post) => (
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
                      <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-primary transition-colors">
                        {post.title}
                      </h3>
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

            {author.posts.length === 0 && (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground text-lg">
                  No published articles yet
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
