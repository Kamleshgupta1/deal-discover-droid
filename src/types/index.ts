import { LucideIcon } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  description: string;
  platforms: Platform[];
}

export interface Platform {
  id: string;
  name: string;
  logo: string;
  rating: number;
  deliveryTime?: string;
  minOrder?: number;
  deliveryFee?: number;
  discounts?: string[];
  deepLink: string;
  appLink?: string;
  webLink: string;
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