import { useState, useEffect } from 'react';

export type SortOption = 'relevance' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'popular';

const sortOptions = [
  { key: 'relevance' as SortOption, name: 'Relevance', description: 'Most relevant first' },
  { key: 'price-low' as SortOption, name: 'Price: Low to High', description: 'Cheapest first' },
  { key: 'price-high' as SortOption, name: 'Price: High to Low', description: 'Most expensive first' },
  { key: 'rating' as SortOption, name: 'Highest Rated', description: 'Best rated first' },
  { key: 'newest' as SortOption, name: 'Newest First', description: 'Latest additions' },
  { key: 'popular' as SortOption, name: 'Most Popular', description: 'Popular choices' },
];

export const useSortPreferences = () => {
  const [currentSort, setCurrentSort] = useState<SortOption>('relevance');

  useEffect(() => {
    const savedSort = localStorage.getItem('sortOption') as SortOption;
    if (savedSort && sortOptions.some(s => s.key === savedSort)) {
      setCurrentSort(savedSort);
    }
  }, []);

  const setSortOption = (option: SortOption) => {
    setCurrentSort(option);
    localStorage.setItem('sortOption', option);
  };

  return {
    currentSort,
    setSortOption,
    sortOptions,
  };
};
