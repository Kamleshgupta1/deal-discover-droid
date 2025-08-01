import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { categories } from '@/data/categories';

const AllCategories = () => {
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <Card 
              key={category.id}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover-scale bg-primary text-white border-0"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-4 text-center space-y-3">
                <div className="flex items-center justify-center">
                  <div className="p-3 bg-white/20 rounded-2xl">
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-white">{category.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategories;