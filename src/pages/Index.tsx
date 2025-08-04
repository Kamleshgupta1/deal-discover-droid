import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Category } from '@/types';
import { getHighPriorityCategories, getRemainingCategories, getAllCategories } from '@/data/categories';
import { ComparisonResults } from '@/components/ComparisonResults';
import { Sparkles, Search, TrendingUp, Users, Star } from 'lucide-react';
import appIcon from '@/assets/app-icon.png';
import { APP_CONFIG } from '@/constants';
import { useSearch } from '@/hooks/useSearch';
import { handlePlatformLink } from '@/utils/linkUtils';
import { SearchSection } from '@/components/features/SearchSection';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { WelcomeTour } from '@/components/tour/WelcomeTour';
import { AppDownloadPopup } from '@/components/pwa/AppDownloadPopup';
import { HomeHero } from '@/components/features/HomeHero';
import { CategoryShowcase } from '@/components/features/CategoryShowcase';
import { HomeFeatures } from '@/components/features/HomeFeatures';
import { HomeStats } from '@/components/features/HomeStats';

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

  const onSearch = async (searchData: Record<string, string>) => {
    if (!selectedCategory) return;
    // Extract query and location from searchData for backwards compatibility
    const query = searchData.query || searchData.position || searchData.medicine || searchData.destination || '';
    const location = searchData.location || '';
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
          <div className="space-y-12">
            {/* Hero Section */}
            <HomeHero onGlobalSearch={handleGlobalSearch} />

            {/* Categories Showcase */}
            <CategoryShowcase 
              categories={getHighPriorityCategories()}
              onCategorySelect={handleCategorySelect}
              onSeeMore={() => navigate('/categories')}
              hasMoreCategories={getRemainingCategories().length > 0}
            />

            {/* Features Section */}
            <HomeFeatures />

            {/* Stats Section */}
            <HomeStats />
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
