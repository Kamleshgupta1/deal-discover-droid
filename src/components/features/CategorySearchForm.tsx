import { useState } from 'react';
import { Category } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Calendar, DollarSign, Filter, Users } from 'lucide-react';

interface CategorySearchFormProps {
  category: Category;
  onSearch: (searchData: Record<string, string>) => void;
}

export const CategorySearchForm = ({ category, onSearch }: CategorySearchFormProps) => {
  const [searchData, setSearchData] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchData);
  };

  const getFieldsForCategory = () => {
    switch (category.id) {
      case 'shopping':
      case 'electronics':
        return [
          { key: 'query', label: 'Product Name', placeholder: 'e.g., iPhone 15, laptop', icon: Search, required: true },
          { key: 'location', label: 'Location', placeholder: 'e.g., New York, London', icon: MapPin },
          { key: 'minPrice', label: 'Min Price', placeholder: 'e.g., 100', icon: DollarSign },
          { key: 'maxPrice', label: 'Max Price', placeholder: 'e.g., 1000', icon: DollarSign },
          { key: 'brand', label: 'Brand', placeholder: 'e.g., Apple, Samsung', icon: Filter }
        ];
      
      case 'travel':
        return [
          { key: 'destination', label: 'Destination', placeholder: 'e.g., Paris, Tokyo', icon: MapPin, required: true },
          { key: 'departure', label: 'Departure From', placeholder: 'e.g., New York', icon: MapPin },
          { key: 'checkIn', label: 'Check-in Date', placeholder: 'YYYY-MM-DD', icon: Calendar },
          { key: 'checkOut', label: 'Check-out Date', placeholder: 'YYYY-MM-DD', icon: Calendar },
          { key: 'guests', label: 'Number of Guests', placeholder: 'e.g., 2', icon: Users }
        ];
      
      case 'jobs':
        return [
          { key: 'position', label: 'Job Title', placeholder: 'e.g., Software Engineer', icon: Search, required: true },
          { key: 'location', label: 'Location', placeholder: 'e.g., San Francisco', icon: MapPin },
          { key: 'experience', label: 'Experience Level', placeholder: 'e.g., 3-5 years', icon: Filter },
          { key: 'salary', label: 'Expected Salary', placeholder: 'e.g., 80000', icon: DollarSign },
          { key: 'remote', label: 'Remote Work', placeholder: 'yes/no', icon: Filter }
        ];
      
      case 'food':
        return [
          { key: 'query', label: 'Recipe/Dish', placeholder: 'e.g., chicken curry, pasta', icon: Search, required: true },
          { key: 'cuisine', label: 'Cuisine Type', placeholder: 'e.g., Italian, Indian', icon: Filter },
          { key: 'diet', label: 'Dietary Restrictions', placeholder: 'e.g., vegetarian, gluten-free', icon: Filter },
          { key: 'cookTime', label: 'Max Cook Time (mins)', placeholder: 'e.g., 30', icon: Calendar },
          { key: 'ingredients', label: 'Main Ingredients', placeholder: 'e.g., chicken, tomatoes', icon: Filter }
        ];
      
      case 'medicine':
        return [
          { key: 'medicine', label: 'Medicine Name', placeholder: 'e.g., Aspirin, Paracetamol', icon: Search, required: true },
          { key: 'location', label: 'Location', placeholder: 'e.g., New York', icon: MapPin },
          { key: 'type', label: 'Medicine Type', placeholder: 'e.g., tablet, syrup', icon: Filter },
          { key: 'brand', label: 'Brand Preference', placeholder: 'e.g., Generic, Brand', icon: Filter }
        ];
      
      case 'entertainment':
        return [
          { key: 'query', label: 'Movie/Show Title', placeholder: 'e.g., Avengers, Game of Thrones', icon: Search, required: true },
          { key: 'genre', label: 'Genre', placeholder: 'e.g., Action, Comedy', icon: Filter },
          { key: 'year', label: 'Release Year', placeholder: 'e.g., 2023', icon: Calendar },
          { key: 'rating', label: 'Min Rating', placeholder: 'e.g., 7.0', icon: Filter }
        ];
      
      case 'books':
        return [
          { key: 'query', label: 'Book Title/Author', placeholder: 'e.g., Harry Potter, Stephen King', icon: Search, required: true },
          { key: 'genre', label: 'Genre', placeholder: 'e.g., Fiction, Mystery', icon: Filter },
          { key: 'year', label: 'Publication Year', placeholder: 'e.g., 2020', icon: Calendar },
          { key: 'language', label: 'Language', placeholder: 'e.g., English, Spanish', icon: Filter }
        ];
      
      case 'news':
        return [
          { key: 'query', label: 'News Topic', placeholder: 'e.g., technology, politics', icon: Search, required: true },
          { key: 'category', label: 'Category', placeholder: 'e.g., business, sports', icon: Filter },
          { key: 'country', label: 'Country', placeholder: 'e.g., us, uk', icon: MapPin },
          { key: 'language', label: 'Language', placeholder: 'e.g., en, es', icon: Filter }
        ];
      
      case 'weather':
        return [
          { key: 'location', label: 'Location', placeholder: 'e.g., London, New York', icon: MapPin, required: true },
          { key: 'days', label: 'Forecast Days', placeholder: 'e.g., 5', icon: Calendar }
        ];
      
      default:
        return [
          { key: 'query', label: 'Search Term', placeholder: `Search ${category.name.toLowerCase()}...`, icon: Search, required: true },
          { key: 'location', label: 'Location', placeholder: 'e.g., New York', icon: MapPin }
        ];
    }
  };

  const fields = getFieldsForCategory();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={field.key} className="text-sm font-medium flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {field.label}
                    {field.required && <span className="text-destructive">*</span>}
                  </Label>
                  <Input
                    id={field.key}
                    placeholder={field.placeholder}
                    value={searchData[field.key] || ''}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    required={field.required}
                    className="w-full"
                  />
                </div>
              );
            })}
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:shadow-strong"
            size="lg"
          >
            <Search className="h-4 w-4 mr-2" />
            Search {category.name}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};