import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RichTextEditor } from '@/components/admin/RichTextEditor';

interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

export const PostEditor = () => {
  const { id } = useParams();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category_id: '',
    content: {},
    featured_image: '',
    published: false,
    excerpt: '',
    meta_description: '',
    meta_keywords: '',
    og_title: '',
    og_description: '',
    og_image: '',
    reading_time: 0
  });

  useEffect(() => {
    fetchCategories();
    fetchTags();
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

  const fetchTags = async () => {
    try {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name');

      if (error) throw error;
      setTags(data || []);
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
        .select(`
          *,
          post_tags (tag_id)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setFormData({
        title: data.title,
        slug: data.slug,
        category_id: data.category_id || '',
        content: data.content,
        featured_image: data.featured_image || '',
        published: data.published,
        excerpt: data.excerpt || '',
        meta_description: data.meta_description || '',
        meta_keywords: data.meta_keywords?.join(', ') || '',
        og_title: data.og_title || '',
        og_description: data.og_description || '',
        og_image: data.og_image || '',
        reading_time: data.reading_time || 0
      });
      setSelectedTags(data.post_tags?.map((pt: any) => pt.tag_id) || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createTag = async () => {
    if (!newTag.trim()) return;
    
    const slug = newTag.toLowerCase().replace(/\s+/g, '-');
    try {
      const { data, error } = await supabase
        .from('tags')
        .insert({ name: newTag, slug })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setTags([...tags, data]);
        setSelectedTags([...selectedTags, data.id]);
        setNewTag('');
        toast.success('Tag created successfully');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSave = async (publish: boolean = false) => {
    if (!user) return;

    setLoading(true);
    try {
      const postData = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        category_id: formData.category_id || null,
        featured_image: formData.featured_image || null,
        author_id: user.id,
        published: publish,
        excerpt: formData.excerpt || null,
        meta_description: formData.meta_description || null,
        meta_keywords: formData.meta_keywords ? formData.meta_keywords.split(',').map(k => k.trim()) : null,
        og_title: formData.og_title || null,
        og_description: formData.og_description || null,
        og_image: formData.og_image || null,
        reading_time: formData.reading_time || null
      };

      let postId = id;

      if (id) {
        const { error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', id);

        if (error) throw error;

        // Delete existing tags
        await supabase
          .from('post_tags')
          .delete()
          .eq('post_id', id);
      } else {
        const { data, error } = await supabase
          .from('posts')
          .insert([postData])
          .select()
          .single();

        if (error) throw error;
        postId = data.id;
      }

      // Insert new tags
      if (selectedTags.length > 0 && postId) {
        const postTags = selectedTags.map(tagId => ({
          post_id: postId,
          tag_id: tagId
        }));

        const { error: tagsError } = await supabase
          .from('post_tags')
          .insert(postTags);

        if (tagsError) throw tagsError;
      }

      toast.success(`Post ${id ? 'updated' : 'created'} successfully!`);
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

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="New tag name"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), createTag())}
                />
                <Button type="button" onClick={createTag}>Add Tag</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant={selectedTags.includes(tag.id) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedTags(
                        selectedTags.includes(tag.id)
                          ? selectedTags.filter(t => t !== tag.id)
                          : [...selectedTags, tag.id]
                      );
                    }}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">SEO Settings</h3>
              
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <textarea
                  id="excerpt"
                  className="w-full min-h-[80px] p-2 border rounded-md"
                  placeholder="Brief excerpt of the post"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_description">Meta Description</Label>
                <textarea
                  id="meta_description"
                  className="w-full min-h-[80px] p-2 border rounded-md"
                  placeholder="SEO meta description (recommended 150-160 characters)"
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="meta_keywords">Meta Keywords</Label>
                <Input
                  id="meta_keywords"
                  placeholder="keyword1, keyword2, keyword3"
                  value={formData.meta_keywords}
                  onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="og_title">OG Title (Social Sharing)</Label>
                <Input
                  id="og_title"
                  placeholder="Title for social media sharing"
                  value={formData.og_title}
                  onChange={(e) => setFormData({ ...formData, og_title: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="og_description">OG Description</Label>
                <Input
                  id="og_description"
                  placeholder="Description for social media sharing"
                  value={formData.og_description}
                  onChange={(e) => setFormData({ ...formData, og_description: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="og_image">OG Image URL</Label>
                <Input
                  id="og_image"
                  placeholder="Image URL for social media sharing"
                  value={formData.og_image}
                  onChange={(e) => setFormData({ ...formData, og_image: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="reading_time">Reading Time (minutes)</Label>
                <Input
                  id="reading_time"
                  type="number"
                  placeholder="5"
                  value={formData.reading_time || ''}
                  onChange={(e) => setFormData({ ...formData, reading_time: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <Separator />

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
