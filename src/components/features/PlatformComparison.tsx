import { PlatformResult } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Truck, ExternalLink } from 'lucide-react';

interface PlatformComparisonProps {
  platforms: PlatformResult[];
  onPlatformClick: (url: string, isApp?: boolean) => void;
}

export const PlatformComparison = ({ platforms, onPlatformClick }: PlatformComparisonProps) => {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-sm">Compare Across Platforms</h4>
      {platforms.map((platformResult) => (
        <div 
          key={platformResult.platform.id} 
          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
        >
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
  );
};