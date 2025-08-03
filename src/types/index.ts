import { LucideIcon } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  priority?: number;
  hasRealApi?: boolean;
  platforms: Platform[];
  keywords?: string[];
  description?: string;
}

export interface Platform {
  name: string;
  url: string;
  color: string;
  features: string[];
}

export interface SearchQuery {
  category: string;
  location?: string;
  query?: string;
  filters?: Record<string, any>;
}

export interface ComparisonResult {
  id: string;
  name: string;
  image: string;
  platforms: PlatformResult[];
  recommendation: {
    bestPrice: PlatformResult;
    fastestDelivery: PlatformResult;
    bestRated: PlatformResult;
  };
}

export interface PlatformResult {
  platform: Platform;
  price: number;
  availability: boolean;
  estimatedDelivery: string;
  specialOffers: string[];
  rating: number;
  reviews: number;
}