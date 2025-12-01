import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Send, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  parent_id: string | null;
  profiles: { full_name: string };
}

interface CommentsProps {
  postId: string;
}

export const Comments = ({ postId }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          created_at,
          user_id,
          parent_id,
          profiles!comments_user_id_fkey (full_name)
        `)
        .eq('post_id', postId)
        .is('parent_id', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data as any || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to comment',
        variant: 'destructive',
      });
      return;
    }

    if (!newComment.trim()) return;

    // Validate comment length
    const MAX_COMMENT_LENGTH = 2000;
    if (newComment.length > MAX_COMMENT_LENGTH) {
      toast({
        title: 'Comment too long',
        description: `Please limit to ${MAX_COMMENT_LENGTH} characters`,
        variant: 'destructive',
      });
      return;
    }

    // Sanitize comment by removing HTML tags
    const sanitizedComment = newComment.trim().replace(/<[^>]*>/g, '');

    setLoading(true);
    try {
      const { error } = await supabase.from('comments').insert({
        post_id: postId,
        user_id: user.id,
        content: sanitizedComment,
      });

      if (error) throw error;

      toast({
        title: 'Comment posted!',
        description: 'Your comment has been published',
      });

      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Error posting comment:', error);
      toast({
        title: 'Error',
        description: 'Failed to post comment',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      const { error } = await supabase.from('comments').delete().eq('id', commentId);
      if (error) throw error;
      toast({ title: 'Comment deleted' });
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete comment',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="mt-12 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
      </div>

      {user && (
        <Card className="p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <Button type="submit" disabled={loading || !newComment.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Post Comment
            </Button>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="p-6 animate-fade-in">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarFallback>
                  {comment.profiles.full_name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold">{comment.profiles.full_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(comment.created_at), 'MMM dd, yyyy at HH:mm')}
                    </p>
                  </div>
                  {user && user.id === comment.user_id && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(comment.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="text-foreground leading-relaxed">{comment.content}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {!user && comments.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            No comments yet. Be the first to share your thoughts!
          </p>
        </Card>
      )}
    </div>
  );
};
