import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, [user]);

  const loadFavorites = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (itemType: string, itemData: any) => {
    if (!user) {
      toast.error('Please login to save favorites');
      return false;
    }

    try {
      const { error } = await supabase
        .from('favorites')
        .insert({
          user_id: user.id,
          item_type: itemType,
          item_data: itemData
        });

      if (error) throw error;
      
      toast.success('Added to favorites');
      loadFavorites();
      return true;
    } catch (error) {
      console.error('Error adding favorite:', error);
      toast.error('Failed to add favorite');
      return false;
    }
  };

  const removeFavorite = async (id: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Removed from favorites');
      loadFavorites();
      return true;
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Failed to remove favorite');
      return false;
    }
  };

  const isFavorite = (itemType: string, itemId: string) => {
    return favorites.some(
      fav => fav.item_type === itemType && fav.item_data?.id === itemId
    );
  };

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
    refresh: loadFavorites
  };
};