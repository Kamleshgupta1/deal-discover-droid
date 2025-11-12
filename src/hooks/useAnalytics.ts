import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useAnalytics = () => {
  const { user } = useAuth();

  const trackEvent = async (eventType: string, eventData?: any) => {
    try {
      const { error } = await supabase
        .from('user_analytics')
        .insert({
          user_id: user?.id || null,
          event_type: eventType,
          event_data: eventData || {}
        });

      if (error) throw error;
    } catch (error) {
      console.error('Analytics tracking error:', error);
      // Don't show error to user - analytics should be silent
    }
  };

  const trackSearch = (query: string, category?: string, location?: string) => {
    trackEvent('search', { query, category, location });
    
    // Also save to search history
    if (user) {
      supabase
        .from('search_history')
        .insert({
          user_id: user.id,
          search_query: query,
          category_id: category,
          location: location
        })
        .then(({ error }) => {
          if (error) console.error('Error saving search history:', error);
        });
    }
  };

  const trackView = (itemType: string, itemId: string) => {
    trackEvent('view', { itemType, itemId });
  };

  const trackClick = (itemType: string, itemId: string, destination?: string) => {
    trackEvent('click', { itemType, itemId, destination });
  };

  return {
    trackEvent,
    trackSearch,
    trackView,
    trackClick
  };
};