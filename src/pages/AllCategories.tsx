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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCategories.map((category, index) => (
            <Card 
              key={category.id}
              className="group cursor-pointer hover:shadow-strong transition-all duration-300 hover-scale border-0 overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="bg-gradient-primary p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-2xl">
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">{category.name}</h3>
                    <p className="text-white/80 text-sm">{category.platforms.length} platforms available</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-white/90 text-sm font-medium">Popular Platforms:</p>
                  <div className="flex flex-wrap gap-2">
                    {category.platforms.slice(0, 3).map((platform) => (
                      <div 
                        key={platform.name}
                        className="px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium"
                      >
                        {platform.name}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-center gap-2 text-white/80 text-xs">
                    <span>✨ Compare features</span>
                    <span>•</span>
                    <span>📊 Find best deals</span>
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