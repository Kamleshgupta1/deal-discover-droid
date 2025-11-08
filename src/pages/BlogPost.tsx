import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, Clock, Tag, User, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SocialShare } from '@/components/blog/SocialShare';
import { SEOHead } from '@/components/seo/SEOHead';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { Comments } from '@/components/blog/Comments';
import { format } from 'date-fns';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: any;
  excerpt: string;
  featured_image: string;
  reading_time: number;
  published: boolean;
  created_at: string;
  category_id: string;
  meta_description: string;
  meta_keywords: string[];
  og_title: string;
  og_description: string;
  og_image: string;
  categories: { name: string; slug: string };
  profiles: { full_name: string };
  post_tags: { tags: { name: string; slug: string } }[];
}

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (post) {
      trackPostView();
    }
  }, [post]);

  const trackPostView = async () => {
    try {
      await supabase.from('post_views').insert({
        post_id: post!.id,
      });
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          categories (name, slug),
          profiles (full_name),
          post_tags (tags (name, slug))
        `)
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = (content: any) => {
    if (!content) return null;
    
    if (typeof content === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }

    // Render TipTap JSON content
    const renderNode = (node: any): any => {
      if (node.type === 'text') {
        let text = node.text;
        if (node.marks) {
          node.marks.forEach((mark: any) => {
            if (mark.type === 'bold') text = <strong key={Math.random()}>{text}</strong>;
            if (mark.type === 'italic') text = <em key={Math.random()}>{text}</em>;
          });
        }
        return text;
      }

      const children = node.content?.map((child: any, i: number) => (
        <span key={i}>{renderNode(child)}</span>
      ));

      switch (node.type) {
        case 'heading':
          const HeadingTag = `h${node.attrs?.level || 2}` as keyof JSX.IntrinsicElements;
          return <HeadingTag className="font-bold my-4">{children}</HeadingTag>;
        case 'paragraph':
          return <p className="my-4 leading-relaxed">{children}</p>;
        case 'bulletList':
          return <ul className="list-disc ml-6 my-4">{children}</ul>;
        case 'orderedList':
          return <ol className="list-decimal ml-6 my-4">{children}</ol>;
        case 'listItem':
          return <li className="my-2">{children}</li>;
        case 'blockquote':
          return <blockquote className="border-l-4 border-primary pl-4 italic my-4">{children}</blockquote>;
        case 'image':
          return <img src={node.attrs?.src} alt="" className="max-w-full h-auto rounded-lg my-4" />;
        case 'table':
          return <table className="w-full border-collapse my-4">{children}</table>;
        case 'tableRow':
          return <tr>{children}</tr>;
        case 'tableHeader':
          return <th className="border border-border p-2 bg-muted font-semibold">{children}</th>;
        case 'tableCell':
          return <td className="border border-border p-2">{children}</td>;
        default:
          return children;
      }
    };

    return content.content?.map((node: any, i: number) => (
      <div key={i}>{renderNode(node)}</div>
    ));
  };

  if (loading) return <LoadingSpinner />;
  if (!post) return <div className="container py-12">Post not found</div>;

  return (
    <>
      <SEOHead
        title={post.og_title || post.title}
        description={post.og_description || post.meta_description || post.excerpt}
        keywords={post.meta_keywords}
        ogImage={post.og_image || post.featured_image}
        type="article"
      />
      
      <article className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container max-w-4xl py-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <Card className="overflow-hidden">
            {post.featured_image && (
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={post.featured_image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories && (
                  <Link to={`/category/${post.categories.slug}`}>
                    <Badge variant="secondary">{post.categories.name}</Badge>
                  </Link>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {post.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                {post.profiles && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {post.profiles.full_name}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(post.created_at), 'MMM dd, yyyy')}
                </div>
                {post.reading_time && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {post.reading_time} min read
                  </div>
                )}
              </div>

              <Separator className="my-6" />

              <div className="prose prose-lg max-w-none">
                {renderContent(post.content)}
              </div>

              <Separator className="my-8" />

              {post.post_tags && post.post_tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  {post.post_tags.map((pt: any) => (
                    <Link key={pt.tags.slug} to={`/tag/${pt.tags.slug}`}>
                      <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                        {pt.tags.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}

              <SocialShare 
                url={window.location.href}
                title={post.title}
                description={post.excerpt}
              />
            </div>
          </Card>

          <RelatedPosts 
            currentPostId={post.id}
            categoryId={post.category_id}
          />

          <Comments postId={post.id} />
        </div>
      </article>
    </>
  );
};
