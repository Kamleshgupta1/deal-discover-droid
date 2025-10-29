import { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Category } from '@/types';
import { getAllCategories } from '@/data/categories';

interface GlobalSearchProps {
  onSearch: (query: string, location: string, category?: Category) => void;
  placeholder?: string;
}

export const GlobalSearch = ({ onSearch, placeholder = "Search anything..." }: GlobalSearchProps) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleSearch = () => {
    if (!query.trim()) return;
    
    // Auto-detect category based on query if none selected
    let categoryToUse = selectedCategory;
    if (!categoryToUse) {
      const categories = getAllCategories();
      // Enhanced keyword matching for category detection
      const queryLower = query.toLowerCase();
      
      // First try exact keyword match
      categoryToUse = categories.find(cat => 
        cat.keywords?.some(keyword => {
          const keywordLower = keyword.toLowerCase();
          return queryLower.includes(keywordLower) || keywordLower.includes(queryLower);
        })
      );
      
      // Then try category name match
      if (!categoryToUse) {
        categoryToUse = categories.find(cat => 
          queryLower.includes(cat.name.toLowerCase()) || 
          cat.name.toLowerCase().includes(queryLower)
        );
      }
      
      // If still not found, check for partial matches in description
      if (!categoryToUse) {
        categoryToUse = categories.find(cat => 
          cat.description?.toLowerCase().includes(queryLower)
        );
      }
    }
    
    onSearch(query, location, categoryToUse || undefined);
  };

  return (
    <Card className="card-gradient p-4 mb-6 animate-slide-up">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-base"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        
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
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button onClick={handleSearch} className="px-6" disabled={!query.trim()}>
            Search
          </Button>
        </div>
        
        {/* Category chips for quick selection - showing popular categories */}
        <div className="flex flex-wrap gap-2">
          <div className="text-xs text-muted-foreground w-full mb-1">Quick categories:</div>
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
    </Card>
  );
};