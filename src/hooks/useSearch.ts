import { useState } from 'react';
import { Category, ComparisonResult } from '@/types';
import { generateMockResults } from '@/utils/categoryUtils';

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState<ComparisonResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (category: Category, query: string, location: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const results = generateMockResults(category, query);
      setSearchResults(results);
      setIsLoading(false);
    }, 1000);
  };

  const clearResults = () => {
    setSearchResults([]);
  };

  return {
    searchResults,
    isLoading,
    handleSearch,
    clearResults,
  };
};