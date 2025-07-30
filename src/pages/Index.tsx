import { useState } from 'react';
import { Category } from '@/types';
import { categories } from '@/data/categories';
import { ComparisonResults } from '@/components/ComparisonResults';
import { Sparkles } from 'lucide-react';
import appIcon from '@/assets/app-icon.png';
import { APP_CONFIG } from '@/constants';
import { useSearch } from '@/hooks/useSearch';
import { handlePlatformLink } from '@/utils/linkUtils';
import { CategoryGrid } from '@/components/features/CategoryGrid';
import { SearchSection } from '@/components/features/SearchSection';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { searchResults, isLoading, handleSearch, clearResults } = useSearch();

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    // Auto-generate initial results for the category
    handleSearch(category, '', '');
  };

  const onSearch = async (query: string, location: string) => {
    if (!selectedCategory) return;
    await handleSearch(selectedCategory, query, location);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    clearResults();
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={appIcon} alt={APP_CONFIG.name} className="w-12 h-12 rounded-xl" />
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              {APP_CONFIG.name}
            </h1>
            <Sparkles className="h-8 w-8 text-primary animate-glow" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {APP_CONFIG.description}
          </p>
        </div>

        {/* Main Content */}
        {!selectedCategory ? (
          <CategoryGrid 
            categories={categories}
            onCategorySelect={handleCategorySelect}
          />
        ) : (
          <div className="space-y-6">
            <SearchSection
              category={selectedCategory}
              onSearch={onSearch}
              onBack={handleBack}
            />

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <LoadingSpinner 
                  size="md" 
                  text="Finding best deals..." 
                  className="justify-center px-4 py-2 bg-primary/10 rounded-full inline-flex"
                />
              </div>
            )}

            {/* Results */}
            {!isLoading && (
              <ComparisonResults 
                results={searchResults}
                onPlatformClick={handlePlatformLink}
              />
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for smart shoppers • Compare • Save • Enjoy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
