import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  PlusCircle, 
  FileText, 
  FolderOpen, 
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CategoryManager } from '@/components/admin/CategoryManager';
import { PostManager } from '@/components/admin/PostManager';

export const Dashboard = () => {
  const { user, loading, isAdmin, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');

  if (loading) {
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
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your content</p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                View Site
              </Button>
            </Link>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Posts</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success/10 rounded-lg">
                <FolderOpen className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-warning/10 rounded-lg">
                <BarChart3 className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-destructive/10 rounded-lg">
                <FileText className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Content Management Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <PostManager />
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
