import { ComparisonResult } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { EmptyState } from './common/EmptyState';
import { RecommendationCards } from './features/RecommendationCards';
import { PlatformComparison } from './features/PlatformComparison';
import { ANIMATION_DELAYS } from '@/constants';

interface ComparisonResultsProps {
  results: ComparisonResult[];
  onPlatformClick: (url: string, isApp?: boolean) => void;
}

export const ComparisonResults = ({ results, onPlatformClick }: ComparisonResultsProps) => {
  if (results.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="Start Your Search"
        description="Select a category above to begin comparing options"
      />
    );
  }

  return (
    <div className="space-y-6">
      {results.map((result, idx) => (
        <Card 
          key={result.id} 
          className="card-feature animate-slide-up" 
          style={{ animationDelay: `${idx * ANIMATION_DELAYS.result}ms` }}
        >
          <CardHeader className="pb-4">
            <div className="flex items-start gap-4">
              <img 
                src={result.image} 
                alt={result.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <CardTitle className="text-xl mb-1">{result.name}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>4.2</span>
                  </div>
                  <span>•</span>
                  <span>Available on {result.platforms.length} platforms</span>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <RecommendationCards
              bestPrice={result.recommendation.bestPrice}
              fastestDelivery={result.recommendation.fastestDelivery}
              bestRated={result.recommendation.bestRated}
            />
            
            <PlatformComparison
              platforms={result.platforms}
              onPlatformClick={onPlatformClick}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};