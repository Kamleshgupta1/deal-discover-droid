import { Category } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, FolderOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { CategoryCard } from '../CategoryCard';

interface ParentCategoryCardProps {
  category: Category;
  onSubCategorySelect: (category: Category) => void;
  delay?: number;
}

export const ParentCategoryCard = ({ 
  category, 
  onSubCategorySelect,
  delay = 0 
}: ParentCategoryCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = category.icon;
  const subCategoriesCount = category.subCategories?.length || 0;

  return (
    <div 
      className="animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Card className="card-feature hover-scale group overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-primary text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {category.name}
                </CardTitle>
                <CardDescription className="text-sm mt-1">
                  {category.description}
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <FolderOpen className="h-3 w-3" />
              {subCategoriesCount}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <Button
            variant="outline"
            className="w-full justify-between"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span>{isExpanded ? 'Hide' : 'Show'} Sub-Categories</span>
            <ChevronRight 
              className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
            />
          </Button>
          
          {isExpanded && category.subCategories && (
            <div className="mt-4 space-y-3 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Available Sub-Categories
              </p>
              <div className="grid grid-cols-1 gap-3">
                {category.subCategories.map((subCat, index) => (
                  <CategoryCard
                    key={subCat.id}
                    category={subCat}
                    onSelect={onSubCategorySelect}
                    delay={index * 50}
                    variant="compact"
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
