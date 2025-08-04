import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getAllCategories } from '@/data/categories';
import { Category } from '@/types';

const AllCategories = () => {
  const navigate = useNavigate();
  const allCategories = getAllCategories();
  
  const handleCategoryClick = (category: Category) => {
    navigate('/', { state: { selectedCategory: category } });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">All Categories</h1>
            <p className="text-muted-foreground">Choose from all available categories</p>
          </div>
        </div>

        {/* All Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allCategories.map((category, index) => (
            <Card 
              key={category.id}
              className="group cursor-pointer hover:shadow-elegant transition-all duration-300 hover-scale border-0 overflow-hidden bg-gradient-to-br from-white to-muted/50 dark:from-card dark:to-muted/20"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-primary rounded-2xl shadow-soft">
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg truncate">{category.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {category.platforms.length} platforms
                    </p>
                    {category.hasRealApi && (
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                        <span className="text-xs text-success font-medium">Live data</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Description */}
                {category.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                )}
                
                {/* Popular Platforms */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Popular Platforms
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {category.platforms.slice(0, 3).map((platform) => (
                      <div 
                        key={platform.name}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium"
                      >
                        {platform.name}
                      </div>
                    ))}
                    {category.platforms.length > 3 && (
                      <div className="px-2 py-1 bg-muted rounded-md text-xs font-medium text-muted-foreground">
                        +{category.platforms.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Footer */}
                <div className="pt-2 border-t border-border/50">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>✨ Smart comparison</span>
                    <span className="font-medium text-primary">Explore →</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategories;