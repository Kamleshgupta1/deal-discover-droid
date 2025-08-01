import { Category } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onSelect: (category: Category) => void;
  delay?: number;
}

export const CategoryCard = ({ category, onSelect, delay = 0 }: CategoryCardProps) => {
  return (
    <Card 
      className={`card-feature hover:scale-105 cursor-pointer animate-slide-up`}
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => onSelect(category)}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`text-4xl mb-2 animate-float p-3 bg-primary/10 rounded-2xl`} style={{ animationDelay: `${delay + 200}ms` }}>
            <category.icon className="h-8 w-8 text-primary" />
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-foreground">{category.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {category.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {category.platforms.slice(0, 3).map((platform, idx) => (
            <div key={platform.id} className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-full">
              <span>{platform.logo}</span>
              <span>{platform.name}</span>
            </div>
          ))}
          {category.platforms.length > 3 && (
            <div className="text-xs text-muted-foreground px-2 py-1">
              +{category.platforms.length - 3} more
            </div>
          )}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full group"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(category);
          }}
        >
          Compare Now
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};