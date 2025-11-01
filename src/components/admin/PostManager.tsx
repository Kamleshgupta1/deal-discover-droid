import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
}

export const PostManager = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, slug, published, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Post deleted successfully!');
      fetchPosts();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ published: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast.success(`Post ${!currentStatus ? 'published' : 'unpublished'} successfully!`);
      fetchPosts();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Posts</h2>
        <Button onClick={() => navigate('/admin/posts/new')}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Post
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">No posts yet</p>
          <Button onClick={() => navigate('/admin/posts/new')}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Your First Post
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Created: {new Date(post.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Status: {post.published ? '✅ Published' : '📝 Draft'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => togglePublish(post.id, post.published)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate(`/admin/posts/edit/${post.id}`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
