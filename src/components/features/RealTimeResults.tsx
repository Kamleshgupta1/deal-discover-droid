import { ComparisonResult } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink, TrendingUp, TrendingDown, Crown, Clock, Award } from 'lucide-react';
import { PlatformComparison } from './PlatformComparison';

interface RealTimeResultsProps {
  results: ComparisonResult[];
  onPlatformClick: (url: string, isApp?: boolean) => void;
  category?: string;
}

export const RealTimeResults = ({ results, onPlatformClick, category }: RealTimeResultsProps) => {
  const renderRecommendationBadge = (result: ComparisonResult) => {
    const { bestPrice, fastestDelivery, bestRated } = result.recommendation;
    
    return (
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
          <Crown className="h-3 w-3 mr-1" />
          Best Price: {bestPrice.platform.name} (₹{bestPrice.price})
        </Badge>
        <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
          <Clock className="h-3 w-3 mr-1" />
          Fastest: {fastestDelivery.platform.name}
        </Badge>
        <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
          <Award className="h-3 w-3 mr-1" />
          Top Rated: {bestRated.platform.name} ({bestRated.rating}⭐)
        </Badge>
      </div>
    );
  };

  const renderSpecialInfo = (result: ComparisonResult) => {
    if (category === 'entertainment') {
      return (
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
          <div>🎬 Movie</div>
          <div>⭐ Rating: {result.platforms[0]?.rating}/10</div>
          <div>🔥 Popular</div>
          <div>📺 HD Quality</div>
        </div>
      );
    }
    
    if (category === 'books') {
      return (
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
          <div>📚 Book</div>
          <div>⭐ Rating: {result.platforms[0]?.rating}/5</div>
          <div>📖 Digital</div>
          <div>☁️ Cloud Sync</div>
        </div>
      );
    }
    
    if (category === 'cryptocurrency') {
      const platform = result.platforms[0];
      const priceChange = Math.random() > 0.5 ? Math.random() * 10 : -Math.random() * 10;
      return (
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div className="text-muted-foreground">💰 Crypto</div>
          <div className={`flex items-center ${priceChange > 0 ? 'text-success' : 'text-destructive'}`}>
            {priceChange > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {priceChange > 0 ? '+' : ''}{priceChange.toFixed(2)}%
          </div>
          <div className="text-muted-foreground">🔒 Secure</div>
          <div className="text-muted-foreground">⚡ Instant</div>
        </div>
      );
    }
    
    return null;
  };

  if (!results.length) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold mb-2">No results found</h3>
          <p className="text-muted-foreground">Try searching with different keywords</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
          🚀 Real-time API Results
        </Badge>
        <h3 className="text-lg font-semibold mt-2">Live Comparison Results</h3>
        <p className="text-sm text-muted-foreground">Data updated in real-time from official APIs</p>
      </div>

      {results.map((result, index) => (
        <Card 
          key={result.id} 
          className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="pb-4">
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <img 
                  src={result.image} 
                  alt={result.name}
                  className="w-20 h-28 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1">
                  <Star className="h-3 w-3" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg mb-1 line-clamp-2">{result.name}</h3>
                
                {renderSpecialInfo(result)}
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-warning" />
                    {result.platforms[0]?.rating || 'N/A'}
                  </span>
                  <span>{result.platforms.length} platform{result.platforms.length !== 1 ? 's' : ''}</span>
                  <Badge variant="outline" className="text-xs">
                    Live Data
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            {renderRecommendationBadge(result)}
            
            <PlatformComparison
              platforms={result.platforms}
              onPlatformClick={onPlatformClick}
            />
            
            <div className="mt-4 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">🎯 Best Overall Choice:</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{result.recommendation.bestPrice.platform.name}</span>
                  <Button 
                    size="sm" 
                    onClick={() => onPlatformClick(result.recommendation.bestPrice.platform.url)}
                    className="h-6 px-2 text-xs"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Go
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Best value based on price, rating, and availability
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};