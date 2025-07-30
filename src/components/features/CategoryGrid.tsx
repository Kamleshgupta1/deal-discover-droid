import { Category } from '@/types';
import { CategoryCard } from '../CategoryCard';
import { ANIMATION_DELAYS } from '@/constants';

interface CategoryGridProps {
  categories: Category[];
  onCategorySelect: (category: Category) => void;
}

export const CategoryGrid = ({ categories, onCategorySelect }: CategoryGridProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose a Category</h2>
        <p className="text-muted-foreground">Select what you want to compare</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            onSelect={onCategorySelect}
            delay={index * ANIMATION_DELAYS.category}
          />
        ))}
      </div>
    </div>
  );
};