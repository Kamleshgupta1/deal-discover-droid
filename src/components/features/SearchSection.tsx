import { Category } from '@/types';
import { SearchHeader } from '../SearchHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface SearchSectionProps {
  category: Category;
  onSearch: (query: string, location: string) => void;
  onBack: () => void;
}

export const SearchSection = ({ category, onSearch, onBack }: SearchSectionProps) => {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button 
        variant="outline" 
        onClick={onBack}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Categories
      </Button>

      {/* Category Header */}
      <div className="text-center animate-slide-up">
        <div className="mb-2 flex justify-center">
          <div className="p-4 bg-primary/10 rounded-2xl">
            <category.icon className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-2">{category.name}</h2>
        <p className="text-muted-foreground">Compare prices and deals across multiple platforms</p>
      </div>

      {/* Search */}
      <SearchHeader 
        onSearch={onSearch}
        placeholder={`Search ${category.name.toLowerCase()}...`}
      />
    </div>
  );
};