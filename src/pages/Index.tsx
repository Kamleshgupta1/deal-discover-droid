import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Category } from '@/types';
import { getHighPriorityCategories, getRemainingCategories } from '@/data/categories';
import { ComparisonResults } from '@/components/ComparisonResults';
import { Sparkles, Search, TrendingUp, Users, Star } from 'lucide-react';
import appIcon from '@/assets/app-icon.png';
import { APP_CONFIG } from '@/constants';
import { useSearch } from '@/hooks/useSearch';
import { handlePlatformLink } from '@/utils/linkUtils';
import { CategoryGrid } from '@/components/features/CategoryGrid';
import { SearchSection } from '@/components/features/SearchSection';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { WelcomeTour } from '@/components/tour/WelcomeTour';
import { AppDownloadPopup } from '@/components/pwa/AppDownloadPopup';
import { GlobalSearch } from '@/components/GlobalSearch';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { searchResults, isLoading, handleSearch, clearResults } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle category selection from navigation state
    if (location.state?.selectedCategory) {
      const category = location.state.selectedCategory;
      setSelectedCategory(category);
      handleSearch(category, '', '');
      // Clear the state to prevent re-triggering
      window.history.replaceState({}, document.title);
    }
  }, [location.state, handleSearch]);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    // Auto-generate initial results for the category
    handleSearch(category, '', '');
  };

  const onSearch = async (query: string, location: string) => {
    if (!selectedCategory) return;
    await handleSearch(selectedCategory, query, location);
  };

  const handleGlobalSearch = async (query: string, location: string, category?: Category) => {
    if (category) {
      setSelectedCategory(category);
      await handleSearch(category, query, location);
    } else {
      // If no category detected, search across all API-enabled categories
      const apiCategories = getAllCategories().filter(cat => cat.hasRealApi);
      if (apiCategories.length > 0) {
        setSelectedCategory(apiCategories[0]);
        await handleSearch(apiCategories[0], query, location);
      }
    }
  };

  const handleBack = () => {
    setSelectedCategory(null);
    clearResults();
  };

  const stats = [
    { icon: Users, label: 'Happy Users', value: '50K+' },
    { icon: TrendingUp, label: 'Deals Found', value: '1M+' },
    { icon: Star, label: 'User Rating', value: '4.9' },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <WelcomeTour />
      <AppDownloadPopup />
      
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {!selectedCategory ? (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-6 animate-slide-up">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="relative">
                  <img src={appIcon} alt={APP_CONFIG.name} className="w-16 h-16 rounded-2xl shadow-lg" />
                  <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1">
                    <Sparkles className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-left">
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent animate-fade-in">
                    First Look
                  </h1>
                  <p className="text-muted-foreground text-lg">Get your first look at the best deals</p>
                </div>
              </div>

              {/* Global Search Bar */}
              <GlobalSearch onSearch={handleGlobalSearch} placeholder="Search anything - movies, books, news, recipes..." />
            </div>

            {/* Categories Grid - Mobile Optimized */}
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-bold mb-2">Choose a Category</h2>
                <p className="text-muted-foreground">Select what you want to compare</p>
              </div>
              
              {/* Categories in rows of 3 for mobile, responsive for larger screens */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
                {getHighPriorityCategories().map((category, index) => (
                  <Card 
                    key={category.id}
                    className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover-scale bg-primary text-white border-0"
                    onClick={() => handleCategorySelect(category)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-4 text-center space-y-3">
                      <div className="flex items-center justify-center">
                        <div className="p-3 bg-white/20 rounded-2xl">
                          <category.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-sm text-white">{category.name}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* See More Button */}
              {getRemainingCategories().length > 0 && (
                <div className="text-center pt-4">
                  <Button 
                    variant="outline" 
                    className="rounded-full px-6"
                    onClick={() => navigate('/categories')}
                  >
                    See More Categories
                  </Button>
                </div>
              )}
            </div>

            {/* Recommendations Section */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-bold mb-2">Recommendations</h2>
                <p className="text-muted-foreground">Popular deals and trending products</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video bg-gradient-primary relative">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-bold text-lg">TRENDING DEALS</h3>
                      <p className="text-sm opacity-90">Up to 70% off electronics</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video bg-gradient-secondary relative">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-bold text-lg">FLASH SALES</h3>
                      <p className="text-sm opacity-90">Limited time offers</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Features Section */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-2xl bg-gradient-subtle border border-border/50">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Smart Comparison</h3>
                <p className="text-muted-foreground text-sm">Compare features, prices, and reviews across multiple platforms instantly</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-gradient-subtle border border-border/50">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Fast & Reliable</h3>
                <p className="text-muted-foreground text-sm">Get accurate results in seconds with our advanced comparison engine</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-gradient-subtle border border-border/50">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Best Deals</h3>
                <p className="text-muted-foreground text-sm">Find exclusive offers and save money on your favorite services</p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-primary rounded-3xl p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-6">Trusted by Millions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-4xl font-bold mb-2">10M+</div>
                  <div className="text-white/80">Happy Users</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">500+</div>
                  <div className="text-white/80">Platforms</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">25+</div>
                  <div className="text-white/80">Categories</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">99.9%</div>
                  <div className="text-white/80">Uptime</div>
                </div>
              </div>
            </div>
          </div>
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
                category={selectedCategory?.id}
                isRealTimeData={selectedCategory?.hasRealApi}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
