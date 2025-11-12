import { useState, useEffect } from 'react';
import { Search, MapPin, Filter, Clock, TrendingUp, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Category } from '@/types';
import { getAllCategories } from '@/data/categories';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EnhancedSearchProps {
  onSearch: (query: string, location: string, category?: Category) => void;
  placeholder?: string;
}

export const EnhancedSearch = ({ onSearch, placeholder = "Search anything..." }: EnhancedSearchProps) => {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [recentSearches, setRecentSearches] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      loadRecentSearches();
    }
  }, [user]);

  useEffect(() => {
    if (query.length > 2) {
      generateSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const loadRecentSearches = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('search_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);
    
    setRecentSearches(data || []);
  };

  const generateSuggestions = () => {
    const categories = getAllCategories();
    const queryLower = query.toLowerCase();
    
    const matchingSuggestions = categories
      .filter(cat => 
        cat.name.toLowerCase().includes(queryLower) ||
        cat.keywords?.some(k => k.toLowerCase().includes(queryLower))
      )
      .map(cat => cat.name)
      .slice(0, 5);
    
    setSuggestions(matchingSuggestions);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    
    let categoryToUse = selectedCategory;
    if (!categoryToUse) {
      const categories = getAllCategories();
      const queryLower = query.toLowerCase();
      
      categoryToUse = categories.find(cat => 
        cat.keywords?.some(keyword => {
          const keywordLower = keyword.toLowerCase();
          return queryLower.includes(keywordLower) || keywordLower.includes(queryLower);
        })
      );
    }
    
    onSearch(query, location, categoryToUse || undefined);
    setSuggestions([]);
  };

  const handleRecentSearchClick = (search: any) => {
    setQuery(search.search_query);
    if (search.location) setLocation(search.location);
    if (search.category_id) {
      const category = getAllCategories().find(c => c.id === search.category_id);
      if (category) setSelectedCategory(category);
    }
  };

  const clearRecentSearches = async () => {
    if (!user) return;
    
    await supabase
      .from('search_history')
      .delete()
      .eq('user_id', user.id);
    
    setRecentSearches([]);
  };

  return (
    <Card className="card-gradient p-4 mb-6 animate-slide-up">
      <div className="space-y-4">
        {/* Main Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-base"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          
          {/* Auto-suggestions */}
          {suggestions.length > 0 && (
            <Card className="absolute top-full mt-2 w-full z-50 p-2">
              <ScrollArea className="max-h-48">
                {suggestions.map((suggestion, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 hover:bg-accent rounded-md cursor-pointer"
                    onClick={() => {
                      setQuery(suggestion);
                      setSuggestions([]);
                    }}
                  >
                    <p className="text-sm">{suggestion}</p>
                  </div>
                ))}
              </ScrollArea>
            </Card>
          )}
        </div>
        
        {/* Location and Filters */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Location (optional)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button onClick={handleSearch} className="px-6" disabled={!query.trim()}>
            Search
          </Button>
        </div>

        {/* Selected Category */}
        {selectedCategory && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              <selectedCategory.icon className="h-3 w-3 mr-1" />
              {selectedCategory.name}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => setSelectedCategory(null)}
              />
            </Badge>
          </div>
        )}
        
        {/* Category chips */}
        {showFilters && (
          <div className="space-y-3">
            <div className="text-xs text-muted-foreground">Filter by category:</div>
            <div className="flex flex-wrap gap-2">
              {getAllCategories().filter(cat => 
                ['shopping', 'travel', 'entertainment', 'food-delivery', 'statistics', 'vehicles'].includes(cat.id)
              ).map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory?.id === category.id ? "default" : "outline"}
                  size="sm"
                  className="h-8 px-3 text-xs"
                  onClick={() => setSelectedCategory(selectedCategory?.id === category.id ? null : category)}
                >
                  <category.icon className="h-3 w-3 mr-1" />
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Recent Searches */}
        {user && recentSearches.length > 0 && (
          <div className="border-t pt-3 mt-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Recent Searches</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 text-xs"
                onClick={clearRecentSearches}
              >
                Clear
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search) => (
                <Badge
                  key={search.id}
                  variant="outline"
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => handleRecentSearchClick(search)}
                >
                  {search.search_query}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};