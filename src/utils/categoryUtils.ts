import { Category, Platform, ComparisonResult, PlatformResult } from '@/types';

export const generateMockPrice = (min: number = 100, max: number = 500): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const generateMockRating = (base: number = 4.0): number => {
  return Number((base + Math.random() * 0.5).toFixed(1));
};

export const generateMockReviews = (): number => {
  return Math.floor(Math.random() * 1000) + 100;
};

export const createPlatformResult = (platform: Platform, searchQuery?: string): PlatformResult => ({
  platform,
  price: generateMockPrice(),
  availability: Math.random() > 0.2,
  estimatedDelivery: platform.deliveryTime || '30-45 min',
  specialOffers: platform.discounts?.slice(0, 1) || [],
  rating: generateMockRating(platform.rating),
  reviews: generateMockReviews(),
});

export const generateMockResults = (category: Category, searchQuery?: string): ComparisonResult[] => {
  const mockResults: ComparisonResult[] = [
    {
      id: '1',
      name: searchQuery || `Popular ${category.name} Option`,
      image: getRandomImage(category.id),
      platforms: category.platforms.map(platform => createPlatformResult(platform, searchQuery)),
      recommendation: {
        bestPrice: {} as any,
        fastestDelivery: {} as any,
        bestRated: {} as any,
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

  return mockResults;
};

const getRandomImage = (categoryId: string): string => {
  const imageMap: Record<string, string> = {
    food: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop',
    grocery: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop',
    travel: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&h=200&fit=crop',
    hotels: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&h=200&fit=crop',
    tickets: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&h=200&fit=crop',
    fuel: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=200&h=200&fit=crop',
    cards: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop',
    clothes: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop',
    electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop',
    default: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop',
  };
  
  return imageMap[categoryId] || imageMap.default;
};