import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Heart, History, BarChart3, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Badge } from '@/components/ui/badge';

export const UserProfile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [searchHistory, setSearchHistory] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [fullName, setFullName] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadUserData();
  }, [user, navigate]);

  const loadUserData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Load profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profileData) {
        setProfile(profileData);
        setFullName(profileData.full_name || '');
      }

      // Load favorites
      const { data: favData } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);
      
      setFavorites(favData || []);

      // Load search history
      const { data: historyData } = await supabase
        .from('search_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);
      
      setSearchHistory(historyData || []);

      // Load analytics summary
      const { data: analyticsData } = await supabase
        .from('user_analytics')
        .select('event_type, created_at')
        .eq('user_id', user.id);
      
      if (analyticsData) {
        const summary = {
          totalEvents: analyticsData.length,
          searches: analyticsData.filter(a => a.event_type === 'search').length,
          views: analyticsData.filter(a => a.event_type === 'view').length,
          clicks: analyticsData.filter(a => a.event_type === 'click').length,
        };
        setAnalytics(summary);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName })
        .eq('id', user.id);

      if (error) throw error;
      
      toast.success('Profile updated successfully');
      setProfile({ ...profile, full_name: fullName });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFavorite = async (id: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setFavorites(favorites.filter(f => f.id !== id));
      toast.success('Removed from favorites');
    } catch (error) {
      console.error('Error deleting favorite:', error);
      toast.error('Failed to remove favorite');
    }
  };

  const handleClearHistory = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('search_history')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      
      setSearchHistory([]);
      toast.success('Search history cleared');
    } catch (error) {
      console.error('Error clearing history:', error);
      toast.error('Failed to clear history');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading profile..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`} />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{profile?.full_name || 'User Profile'}</h1>
                <p className="text-muted-foreground">{user?.email}</p>
                <div className="flex gap-2 mt-3">
                  <Badge variant="secondary">
                    <Heart className="h-3 w-3 mr-1" />
                    {favorites.length} Favorites
                  </Badge>
                  <Badge variant="secondary">
                    <History className="h-3 w-3 mr-1" />
                    {searchHistory.length} Searches
                  </Badge>
                </div>
              </div>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <Heart className="h-4 w-4 mr-2" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user?.email || ''} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <Button onClick={handleUpdateProfile} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>Saved Favorites</CardTitle>
                <CardDescription>Items you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                {favorites.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No favorites yet</p>
                ) : (
                  <div className="space-y-3">
                    {favorites.map((fav) => (
                      <div key={fav.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{fav.item_type}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(fav.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteFavorite(fav.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Search History</CardTitle>
                    <CardDescription>Your recent searches</CardDescription>
                  </div>
                  {searchHistory.length > 0 && (
                    <Button variant="outline" size="sm" onClick={handleClearHistory}>
                      Clear History
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {searchHistory.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No search history</p>
                ) : (
                  <div className="space-y-3">
                    {searchHistory.map((item) => (
                      <div key={item.id} className="p-4 border rounded-lg">
                        <p className="font-medium">{item.search_query}</p>
                        {item.location && (
                          <p className="text-sm text-muted-foreground">Location: {item.location}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(item.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
                <CardDescription>Your activity overview</CardDescription>
              </CardHeader>
              <CardContent>
                {analytics ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 border rounded-lg text-center">
                      <p className="text-3xl font-bold text-primary">{analytics.totalEvents}</p>
                      <p className="text-sm text-muted-foreground">Total Events</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <p className="text-3xl font-bold text-primary">{analytics.searches}</p>
                      <p className="text-sm text-muted-foreground">Searches</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <p className="text-3xl font-bold text-primary">{analytics.views}</p>
                      <p className="text-sm text-muted-foreground">Views</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <p className="text-3xl font-bold text-primary">{analytics.clicks}</p>
                      <p className="text-sm text-muted-foreground">Clicks</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No analytics data available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};