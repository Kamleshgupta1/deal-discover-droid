import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RichTextEditor } from '@/components/admin/RichTextEditor';

interface Category {
  id: string;
  name: string;
}

export const PostEditor = () => {
  const { id } = useParams();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category_id: '',
    content: {},
    featured_image: '',
    published: false
  });

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const fetchPost = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setFormData({
        title: data.title,
        slug: data.slug,
        category_id: data.category_id || '',
        content: data.content,
        featured_image: data.featured_image || '',
        published: data.published
      });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (publish: boolean = false) => {
    if (!user) return;

    setLoading(true);
    try {
      const postData = {
        ...formData,
        published: publish,
        author_id: user.id
      };

      if (id) {
        const { error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', id);

        if (error) throw error;
        toast.success('Post updated successfully!');
      } else {
        const { error } = await supabase
          .from('posts')
          .insert([postData]);

        if (error) throw error;
        toast.success('Post created successfully!');
      }

      navigate('/admin/dashboard');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleSave(false)} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={() => handleSave(true)} disabled={loading}>
              <Eye className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
      </header>

      {/* Editor */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Card className="p-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => {
                  const title = e.target.value;
                  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                  setFormData({ ...formData, title, slug });
                }}
                placeholder="Enter post title"
                className="text-2xl font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="post-slug"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="featured_image">Featured Image URL</Label>
              <Input
                id="featured_image"
                value={formData.featured_image}
                onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <Label>Content</Label>
              <RichTextEditor
                content={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
