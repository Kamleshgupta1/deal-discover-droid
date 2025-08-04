import { Category } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CategoryShowcaseProps {
  categories: Category[];
  onCategorySelect: (category: Category) => void;
  onSeeMore: () => void;
  hasMoreCategories: boolean;
}

export const CategoryShowcase = ({ 
  categories, 
  onCategorySelect, 
  onSeeMore, 
  hasMoreCategories 
}: CategoryShowcaseProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-hero bg-clip-text text-transparent">
          Popular Categories
        </h2>
        <p className="text-muted-foreground text-lg">Select what you want to compare</p>
      </div>
      
      {/* Categories Grid - Mobile Optimized */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {categories.map((category, index) => (
          <Card 
            key={category.id}
            className="group cursor-pointer hover:shadow-elegant transition-all duration-300 hover-scale bg-gradient-primary text-white border-0 overflow-hidden"
            onClick={() => onCategorySelect(category)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6 text-center space-y-4">
              <div className="flex items-center justify-center">
                <div className="p-4 bg-white/20 rounded-3xl shadow-soft backdrop-blur-sm">
                  <category.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-white">{category.name}</h3>
                <p className="text-white/80 text-sm">
                  {category.platforms.length} platforms
                </p>
                
                {/* API Status Indicator */}
                {category.hasRealApi && (
                  <div className="flex items-center justify-center gap-1 text-xs">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white/70">Live data</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* See More Button */}
      {hasMoreCategories && (
        <div className="text-center pt-6">
          <Button 
            variant="outline" 
            className="rounded-full px-8 py-3 text-lg border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
            onClick={onSeeMore}
          >
            Explore All Categories
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};