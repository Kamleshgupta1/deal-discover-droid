import { ComparisonResult } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Truck, ExternalLink, Crown } from 'lucide-react';

interface ComparisonResultsProps {
  results: ComparisonResult[];
  onPlatformClick: (url: string, isApp?: boolean) => void;
}

export const ComparisonResults = ({ results, onPlatformClick }: ComparisonResultsProps) => {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4 animate-float">🔍</div>
        <h3 className="text-xl font-semibold mb-2">Start Your Search</h3>
        <p className="text-muted-foreground">Select a category above to begin comparing options</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {results.map((result, idx) => (
        <Card key={result.id} className={`card-feature animate-slide-up`} style={{ animationDelay: `${idx * 100}ms` }}>
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
            {/* Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div className="bg-success/10 border border-success/20 rounded-lg p-3 text-center">
                <Crown className="h-4 w-4 text-success mx-auto mb-1" />
                <div className="text-xs font-medium text-success">Best Price</div>
                <div className="text-sm font-bold">{result.recommendation.bestPrice.platform.name}</div>
                <div className="text-xs">₹{result.recommendation.bestPrice.price}</div>
              </div>
              
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-center">
                <Clock className="h-4 w-4 text-accent mx-auto mb-1" />
                <div className="text-xs font-medium text-accent">Fastest</div>
                <div className="text-sm font-bold">{result.recommendation.fastestDelivery.platform.name}</div>
                <div className="text-xs">{result.recommendation.fastestDelivery.estimatedDelivery}</div>
              </div>
              
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 text-center">
                <Star className="h-4 w-4 text-warning mx-auto mb-1" />
                <div className="text-xs font-medium text-warning">Top Rated</div>
                <div className="text-sm font-bold">{result.recommendation.bestRated.platform.name}</div>
                <div className="text-xs">{result.recommendation.bestRated.rating} ⭐</div>
              </div>
            </div>
            
            {/* Platform Comparison */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Compare Across Platforms</h4>
              {result.platforms.map((platformResult) => (
                <div key={platformResult.platform.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{platformResult.platform.logo}</div>
                    <div>
                      <div className="font-medium text-sm">{platformResult.platform.name}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {platformResult.rating}
                        </span>
                        {platformResult.estimatedDelivery && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Truck className="h-3 w-3" />
                              {platformResult.estimatedDelivery}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-bold text-lg">₹{platformResult.price}</div>
                      {platformResult.specialOffers.length > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {platformResult.specialOffers[0]}
                        </Badge>
                      )}
                    </div>
                    
                    <Button 
                      size="sm" 
                      onClick={() => onPlatformClick(platformResult.platform.webLink)}
                      className="shrink-0"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Open
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};