import { Category } from '@/types';
import { CategorySearchForm } from './CategorySearchForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface SearchSectionProps {
  category: Category;
  onSearch: (searchData: Record<string, string>) => void;
  onBack: () => void;
}

export const SearchSection = ({ category, onSearch, onBack }: SearchSectionProps) => {
  return (
    <div className="space-y-8">
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
        <div className="mb-6 flex justify-center">
          <div className="p-6 bg-gradient-primary rounded-3xl shadow-soft">
            <category.icon className="h-16 w-16 text-white" />
          </div>
        </div>
        <h2 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
          {category.name}
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {category.description || `Compare prices and deals across multiple ${category.name.toLowerCase()} platforms`}
        </p>
        <div className="mt-4 flex justify-center">
          <div className="px-4 py-2 bg-muted rounded-full text-sm text-muted-foreground">
            {category.platforms.length} platforms available
          </div>
        </div>
      </div>

      {/* Custom Search Form */}
      <CategorySearchForm 
        category={category}
        onSearch={onSearch}
      />
    </div>
  );
};