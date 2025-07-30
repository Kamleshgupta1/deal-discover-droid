import { useState } from 'react';
import { Category, ComparisonResult } from '@/types';
import { categories } from '@/data/categories';
import { CategoryCard } from '@/components/CategoryCard';
import { SearchHeader } from '@/components/SearchHeader';
import { ComparisonResults } from '@/components/ComparisonResults';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';
import appIcon from '@/assets/app-icon.png';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchResults, setSearchResults] = useState<ComparisonResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    // Generate mock results for demo
    generateMockResults(category);
  };

  const handleSearch = async (query: string, location: string) => {
    if (!selectedCategory) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      generateMockResults(selectedCategory, query);
      setIsLoading(false);
    }, 1000);
  };

  const generateMockResults = (category: Category, searchQuery?: string) => {
    // Mock data generation for demo
    const mockResults: ComparisonResult[] = [
      {
        id: '1',
        name: searchQuery || `Popular ${category.name} Option`,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop',
        platforms: category.platforms.map(platform => ({
          platform,
          price: Math.floor(Math.random() * 500) + 100,
          availability: Math.random() > 0.2,
          estimatedDelivery: platform.deliveryTime || '30-45 min',
          specialOffers: platform.discounts.slice(0, 1),
          rating: platform.rating,
          reviews: Math.floor(Math.random() * 1000) + 100
        })),
        recommendation: {
          bestPrice: {} as any,
          fastestDelivery: {} as any,
          bestRated: {} as any
        }
      }
    ];
    
    // Set recommendations
    mockResults.forEach(result => {
      result.recommendation.bestPrice = result.platforms.reduce((min, current) => 
        current.price < min.price ? current : min
      );
      result.recommendation.fastestDelivery = result.platforms[0];
      result.recommendation.bestRated = result.platforms.reduce((max, current) => 
        current.rating > max.rating ? current : max
      );
    });
    
    setSearchResults(mockResults);
  };

  const handlePlatformClick = (url: string, isApp?: boolean) => {
    if (isApp) {
      // Try to open app first, fallback to web
      window.location.href = url;
      setTimeout(() => {
        window.open(url.replace(/^.*:\/\//, 'https://'), '_blank');
      }, 500);
    } else {
      window.open(url, '_blank');
    }
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setSearchResults([]);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={appIcon} alt="CompareAll" className="w-12 h-12 rounded-xl" />
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              CompareAll
            </h1>
            <Sparkles className="h-8 w-8 text-primary animate-glow" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compare prices, delivery times, and offers across all major platforms in one place
          </p>
        </div>

        {/* Category Selection */}
        {!selectedCategory ? (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Choose a Category</h2>
              <p className="text-muted-foreground">Select what you want to compare</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onSelect={handleCategorySelect}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Search and Results */
          <div className="space-y-6">
            {/* Back Button */}
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Button>

            {/* Category Header */}
            <div className="text-center animate-slide-up">
              <div className="text-5xl mb-2">{selectedCategory.icon}</div>
              <h2 className="text-3xl font-bold mb-2">{selectedCategory.name}</h2>
              <p className="text-muted-foreground">{selectedCategory.description}</p>
            </div>

            {/* Search */}
            <SearchHeader 
              onSearch={handleSearch}
              placeholder={`Search ${selectedCategory.name.toLowerCase()}...`}
            />

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-primary font-medium">Finding best deals...</span>
                </div>
              </div>
            )}

            {/* Results */}
            {!isLoading && (
              <ComparisonResults 
                results={searchResults}
                onPlatformClick={handlePlatformClick}
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
