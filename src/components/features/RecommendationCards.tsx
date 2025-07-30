import { PlatformResult } from '@/types';
import { Crown, Clock, Star } from 'lucide-react';

interface RecommendationCardsProps {
  bestPrice: PlatformResult;
  fastestDelivery: PlatformResult;
  bestRated: PlatformResult;
}

export const RecommendationCards = ({ bestPrice, fastestDelivery, bestRated }: RecommendationCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
      <div className="bg-success/10 border border-success/20 rounded-lg p-3 text-center">
        <Crown className="h-4 w-4 text-success mx-auto mb-1" />
        <div className="text-xs font-medium text-success">Best Price</div>
        <div className="text-sm font-bold">{bestPrice.platform.name}</div>
        <div className="text-xs">₹{bestPrice.price}</div>
      </div>
      
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-center">
        <Clock className="h-4 w-4 text-accent mx-auto mb-1" />
        <div className="text-xs font-medium text-accent">Fastest</div>
        <div className="text-sm font-bold">{fastestDelivery.platform.name}</div>
        <div className="text-xs">{fastestDelivery.estimatedDelivery}</div>
      </div>
      
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 text-center">
        <Star className="h-4 w-4 text-warning mx-auto mb-1" />
        <div className="text-xs font-medium text-warning">Top Rated</div>
        <div className="text-sm font-bold">{bestRated.platform.name}</div>
        <div className="text-xs">{bestRated.rating} ⭐</div>
      </div>
    </div>
  );
};