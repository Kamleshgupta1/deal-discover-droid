import { ComparisonResult } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, TrendingUp, Clock, Award, ExternalLink, Zap } from 'lucide-react';
import { useState } from 'react';

interface EnhancedComparisonProps {
  results: ComparisonResult[];
  onPlatformClick: (url: string, isApp?: boolean) => void;
  category?: string;
}

export const EnhancedComparison = ({ results, onPlatformClick, category }: EnhancedComparisonProps) => {
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'delivery'>('price');
  
  // Sort platforms within each result based on selected criteria
  const sortedResults = results.map(result => ({
    ...result,
    platforms: [...result.platforms].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'delivery':
          // Simple delivery time comparison (faster delivery first)
          const aTime = a.estimatedDelivery.toLowerCase();
          const bTime = b.estimatedDelivery.toLowerCase();
          if (aTime.includes('instant') || aTime.includes('min')) return -1;
          if (bTime.includes('instant') || bTime.includes('min')) return 1;
          return 0;
        default:
          return 0;
      }
    })
  }));

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'price': return <TrendingUp className="h-4 w-4" />;
      case 'rating': return <Award className="h-4 w-4" />;
      case 'delivery': return <Zap className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const getRecommendationColor = (type: string) => {
    switch (type) {
      case 'price': return 'bg-green-500/10 text-green-700 border-green-200';
      case 'rating': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'delivery': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      default: return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Results Found</h3>
        <p className="text-muted-foreground">Try searching with different keywords or check your spelling.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex items-center gap-2 p-4 bg-muted/30 rounded-xl">
        <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={sortBy === 'price' ? 'default' : 'outline'}
            onClick={() => setSortBy('price')}
            className="h-8"
          >
            <TrendingUp className="h-3 w-3 mr-1" />
            Price
          </Button>
          <Button
            size="sm"
            variant={sortBy === 'rating' ? 'default' : 'outline'}
            onClick={() => setSortBy('rating')}
            className="h-8"
          >
            <Award className="h-3 w-3 mr-1" />
            Rating
          </Button>
          <Button
            size="sm"
            variant={sortBy === 'delivery' ? 'default' : 'outline'}
            onClick={() => setSortBy('delivery')}
            className="h-8"
          >
            <Zap className="h-3 w-3 mr-1" />
            Speed
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="grid gap-6">
        {sortedResults.map((result, index) => (
          <Card key={result.id} className="overflow-hidden border-0 shadow-elegant bg-gradient-to-br from-white via-white to-muted/20 dark:from-card dark:via-card dark:to-muted/10">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img
                    src={result.image}
                    alt={result.name}
                    className="w-20 h-20 rounded-2xl object-cover shadow-soft"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">#{index + 1}</span>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-xl mb-2 line-clamp-2">{result.name}</CardTitle>
                  
                  {/* Recommendation Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {result.recommendation.bestPrice.price === Math.min(...result.platforms.map(p => p.price)) && (
                      <Badge className={`${getRecommendationColor('price')} text-xs`}>
                        {getRecommendationIcon('price')}
                        <span className="ml-1">Best Price</span>
                      </Badge>
                    )}
                    {result.recommendation.bestRated.rating === Math.max(...result.platforms.map(p => p.rating)) && (
                      <Badge className={`${getRecommendationColor('rating')} text-xs`}>
                        {getRecommendationIcon('rating')}
                        <span className="ml-1">Top Rated</span>
                      </Badge>
                    )}
                    {result.recommendation.fastestDelivery.estimatedDelivery.includes('instant') || 
                     result.recommendation.fastestDelivery.estimatedDelivery.includes('min') && (
                      <Badge className={`${getRecommendationColor('delivery')} text-xs`}>
                        {getRecommendationIcon('delivery')}
                        <span className="ml-1">Fastest</span>
                      </Badge>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">
                        {(result.platforms.reduce((sum, p) => sum + p.rating, 0) / result.platforms.length).toFixed(1)}
                      </span>
                    </div>
                    <span>•</span>
                    <span>{result.platforms.length} platforms</span>
                    <span>•</span>
                    <span className="font-medium text-primary">
                      From ₹{Math.min(...result.platforms.map(p => p.price))}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Platform Comparison Grid */}
              <div className="grid gap-3">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Available On ({result.platforms.length} platforms)
                </h4>
                
                <div className="grid gap-2">
                  {result.platforms.slice(0, 6).map((platformResult) => (
                    <div
                      key={platformResult.platform.name}
                      className="group relative p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl hover:from-muted/50 hover:to-muted/30 transition-all duration-300 border border-border/50 hover:border-border hover:shadow-soft"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-soft"
                            style={{ backgroundColor: platformResult.platform.color }}
                          >
                            <span className="text-white text-sm font-bold">
                              {platformResult.platform.name.charAt(0)}
                            </span>
                          </div>
                          
                          <div className="flex-1">
                            <div className="font-semibold text-sm">{platformResult.platform.name}</div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span>{platformResult.rating.toFixed(1)}</span>
                              </div>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{platformResult.estimatedDelivery}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="font-bold text-lg">
                              {platformResult.price === 0 ? 'Free' : `₹${platformResult.price}`}
                            </div>
                            {platformResult.specialOffers.length > 0 && (
                              <div className="text-xs text-muted-foreground">
                                {platformResult.specialOffers[0]}
                              </div>
                            )}
                          </div>

                          <Button
                            size="sm"
                            onClick={() => onPlatformClick(platformResult.platform.url)}
                            className="shrink-0 shadow-soft hover:shadow-elegant transition-all duration-300"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Open
                          </Button>
                        </div>
                      </div>

                      {/* Platform Features */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {platformResult.platform.features.slice(0, 3).map((feature) => (
                          <Badge
                            key={feature}
                            variant="secondary"
                            className="text-xs bg-white/50 dark:bg-muted/50"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {result.platforms.length > 6 && (
                    <div className="text-center py-2 text-sm text-muted-foreground">
                      +{result.platforms.length - 6} more platforms available
                    </div>
                  )}
                </div>
              </div>

              {/* Best Overall Choice */}
              <div className="p-4 bg-gradient-primary/10 rounded-xl border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-primary">🏆 Best Overall Choice</h4>
                    <p className="text-sm text-muted-foreground">
                      {result.recommendation.bestPrice.platform.name} - Best value for money
                    </p>
                  </div>
                  <Button
                    onClick={() => onPlatformClick(result.recommendation.bestPrice.platform.url)}
                    className="bg-primary hover:bg-primary/90 shadow-soft"
                  >
                    Choose This
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      {results.length > 1 && (
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Search Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {results.reduce((sum, r) => sum + r.platforms.length, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Platforms</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  ₹{Math.min(...results.flatMap(r => r.platforms.map(p => p.price)))}
                </div>
                <div className="text-sm text-muted-foreground">Lowest Price</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {Math.max(...results.flatMap(r => r.platforms.map(p => p.rating))).toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">Highest Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{results.length}</div>
                <div className="text-sm text-muted-foreground">Items Found</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};