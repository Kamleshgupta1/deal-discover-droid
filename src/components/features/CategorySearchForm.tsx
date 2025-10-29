import { useState } from 'react';
import { Category } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Calendar, DollarSign, Filter, Users, Shield } from 'lucide-react';

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
          { key: 'query', label: 'Product Name', placeholder: 'e.g., iPhone 15, laptop, mobile', icon: Search, required: true },
          { key: 'location', label: 'Location', placeholder: 'e.g., New York, London', icon: MapPin },
          { key: 'minPrice', label: 'Min Price', placeholder: 'e.g., 100', icon: DollarSign },
          { key: 'maxPrice', label: 'Max Price', placeholder: 'e.g., 1000', icon: DollarSign },
          { key: 'brand', label: 'Brand', placeholder: 'e.g., Apple, Samsung', icon: Filter }
        ];
      
      case 'grocery':
        return [
          { key: 'query', label: 'Product/Item', placeholder: 'e.g., Rice, Milk, Vegetables', icon: Search, required: true },
          { key: 'location', label: 'Location', placeholder: 'e.g., Mumbai, Delhi', icon: MapPin },
          { key: 'brand', label: 'Brand', placeholder: 'e.g., Amul, Fortune', icon: Filter },
          { key: 'quantity', label: 'Quantity', placeholder: 'e.g., 1kg, 2 liters', icon: Filter }
        ];
      
      case 'clothing':
        return [
          { key: 'query', label: 'Clothing Item', placeholder: 'e.g., Shirt, Jeans, Dress', icon: Search, required: true },
          { key: 'brand', label: 'Brand', placeholder: 'e.g., Nike, Zara, H&M', icon: Filter },
          { key: 'size', label: 'Size', placeholder: 'e.g., M, L, 32', icon: Filter },
          { key: 'color', label: 'Color', placeholder: 'e.g., Black, Blue', icon: Filter }
        ];
      
      case 'travel':
        return [
          { key: 'from', label: 'From', placeholder: 'e.g., Mumbai, Delhi', icon: MapPin, required: true },
          { key: 'to', label: 'To', placeholder: 'e.g., Goa, Bangalore', icon: MapPin, required: true },
          { key: 'departureDate', label: 'Departure Date', placeholder: 'YYYY-MM-DD', icon: Calendar },
          { key: 'returnDate', label: 'Return Date', placeholder: 'YYYY-MM-DD', icon: Calendar },
          { key: 'passengers', label: 'Passengers', placeholder: 'e.g., 2', icon: Users },
          { key: 'class', label: 'Travel Class', placeholder: 'Economy, Business', icon: Filter }
        ];
      
      case 'train':
        return [
          { key: 'from', label: 'From Station', placeholder: 'e.g., New Delhi, Mumbai Central', icon: MapPin, required: true },
          { key: 'to', label: 'To Station', placeholder: 'e.g., Bangalore, Chennai', icon: MapPin, required: true },
          { key: 'date', label: 'Journey Date', placeholder: 'YYYY-MM-DD', icon: Calendar, required: true },
          { key: 'class', label: 'Class', placeholder: 'Sleeper, AC 3-Tier, AC 2-Tier', icon: Filter },
          { key: 'passengers', label: 'Passengers', placeholder: 'e.g., 2', icon: Users }
        ];
      
      case 'bus':
        return [
          { key: 'from', label: 'From', placeholder: 'e.g., Mumbai, Delhi', icon: MapPin, required: true },
          { key: 'to', label: 'To', placeholder: 'e.g., Pune, Agra', icon: MapPin, required: true },
          { key: 'date', label: 'Journey Date', placeholder: 'YYYY-MM-DD', icon: Calendar, required: true },
          { key: 'busType', label: 'Bus Type', placeholder: 'AC, Non-AC, Sleeper', icon: Filter },
          { key: 'passengers', label: 'Passengers', placeholder: 'e.g., 2', icon: Users }
        ];
        
      case 'flight':
        return [
          { key: 'from', label: 'From', placeholder: 'e.g., Mumbai (BOM), Delhi (DEL)', icon: MapPin, required: true },
          { key: 'to', label: 'To', placeholder: 'e.g., Bangalore (BLR), Chennai (MAA)', icon: MapPin, required: true },
          { key: 'departureDate', label: 'Departure Date', placeholder: 'YYYY-MM-DD', icon: Calendar, required: true },
          { key: 'returnDate', label: 'Return Date', placeholder: 'YYYY-MM-DD (optional)', icon: Calendar },
          { key: 'passengers', label: 'Passengers', placeholder: 'e.g., 2', icon: Users },
          { key: 'class', label: 'Class', placeholder: 'Economy, Business, First', icon: Filter }
        ];
        
      case 'ride-booking':
        return [
          { key: 'from', label: 'Pickup Location', placeholder: 'e.g., Airport, Hotel, Address', icon: MapPin, required: true },
          { key: 'to', label: 'Drop Location', placeholder: 'e.g., Office, Mall, Address', icon: MapPin, required: true },
          { key: 'rideType', label: 'Ride Type', placeholder: 'Economy, Premium, Bike, Auto', icon: Filter },
          { key: 'time', label: 'Pickup Time', placeholder: 'Now, Schedule for later', icon: Calendar }
        ];
      
      case 'jobs-old':
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
          { key: 'location', label: 'Location', placeholder: 'e.g., Mumbai, Delhi (for theaters)', icon: MapPin },
          { key: 'genre', label: 'Genre', placeholder: 'e.g., Action, Comedy', icon: Filter },
          { key: 'showType', label: 'Show Type', placeholder: 'Movie, Web Series, Documentary', icon: Filter },
          { key: 'date', label: 'Show Date', placeholder: 'YYYY-MM-DD (for theaters)', icon: Calendar }
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

      case 'crypto':
        return [
          { key: 'query', label: 'Cryptocurrency', placeholder: 'e.g., Bitcoin, Ethereum', icon: Search, required: true },
          { key: 'currency', label: 'Currency', placeholder: 'e.g., USD, INR', icon: DollarSign },
          { key: 'timeframe', label: 'Timeframe', placeholder: 'e.g., 24h, 7d, 30d', icon: Calendar }
        ];

      case 'jobs':
        return [
          { key: 'position', label: 'Job Title', placeholder: 'e.g., Software Engineer', icon: Search, required: true },
          { key: 'location', label: 'Location', placeholder: 'e.g., San Francisco, Remote', icon: MapPin },
          { key: 'experience', label: 'Experience Level', placeholder: 'e.g., 3-5 years', icon: Filter },
          { key: 'salary', label: 'Expected Salary', placeholder: 'e.g., 80000', icon: DollarSign },
          { key: 'remote', label: 'Remote Work', placeholder: 'yes/no/hybrid', icon: Filter }
        ];

      case 'health':
        return [
          { key: 'query', label: 'Service/Doctor', placeholder: 'e.g., cardiologist, dental', icon: Search, required: true },
          { key: 'location', label: 'Location', placeholder: 'e.g., Mumbai, Delhi', icon: MapPin },
          { key: 'specialty', label: 'Specialty', placeholder: 'e.g., cardiology, dermatology', icon: Filter },
          { key: 'insurance', label: 'Insurance', placeholder: 'e.g., cashless, accepted', icon: Shield }
        ];

      case 'education':
        return [
          { key: 'query', label: 'Course/Topic', placeholder: 'e.g., Python, Data Science', icon: Search, required: true },
          { key: 'level', label: 'Level', placeholder: 'e.g., beginner, intermediate', icon: Filter },
          { key: 'duration', label: 'Duration', placeholder: 'e.g., 4 weeks, 6 months', icon: Calendar },
          { key: 'budget', label: 'Budget', placeholder: 'e.g., free, <5000', icon: DollarSign }
        ];

      case 'real-estate':
        return [
          { key: 'query', label: 'Property Type', placeholder: 'e.g., 2BHK, villa, commercial', icon: Search, required: true },
          { key: 'location', label: 'Location', placeholder: 'e.g., Bandra, Gurgaon', icon: MapPin, required: true },
          { key: 'budget', label: 'Budget Range', placeholder: 'e.g., 50000-100000', icon: DollarSign },
          { key: 'type', label: 'Rent/Buy', placeholder: 'rent/buy', icon: Filter }
        ];

      case 'automotive':
        return [
          { key: 'query', label: 'Vehicle', placeholder: 'e.g., Maruti Swift, Honda City', icon: Search, required: true },
          { key: 'location', label: 'Location', placeholder: 'e.g., Mumbai, Delhi', icon: MapPin },
          { key: 'budget', label: 'Budget', placeholder: 'e.g., 500000-1000000', icon: DollarSign },
          { key: 'type', label: 'Type', placeholder: 'e.g., new, used', icon: Filter }
        ];

      case 'vehicles':
        return [
          { key: 'vehicleType', label: 'Vehicle Type', placeholder: 'Bike, Scooter, Car, Truck, Bus, Electric', icon: Filter, required: true },
          { key: 'query', label: 'Model/Brand', placeholder: 'e.g., Royal Enfield, Honda Activa', icon: Search, required: true },
          { key: 'budget', label: 'Budget Range', placeholder: 'e.g., 100000-500000', icon: DollarSign },
          { key: 'fuelType', label: 'Fuel Type', placeholder: 'Petrol, Diesel, Electric, CNG', icon: Filter }
        ];

      case 'mobile-devices':
        return [
          { key: 'query', label: 'Device Model', placeholder: 'e.g., iPhone 15, Samsung Galaxy', icon: Search, required: true },
          { key: 'brand', label: 'Brand', placeholder: 'Apple, Samsung, OnePlus', icon: Filter },
          { key: 'budget', label: 'Budget', placeholder: 'e.g., 20000-50000', icon: DollarSign },
          { key: 'storage', label: 'Storage', placeholder: 'e.g., 128GB, 256GB', icon: Filter }
        ];

      case 'computers-laptops':
        return [
          { key: 'query', label: 'Product Name', placeholder: 'e.g., MacBook Pro, Dell XPS', icon: Search, required: true },
          { key: 'type', label: 'Type', placeholder: 'Laptop, Desktop, Components', icon: Filter },
          { key: 'processor', label: 'Processor', placeholder: 'e.g., Intel i7, AMD Ryzen', icon: Filter },
          { key: 'budget', label: 'Budget', placeholder: 'e.g., 50000-150000', icon: DollarSign }
        ];

      case 'home-appliances':
        return [
          { key: 'applianceType', label: 'Appliance Type', placeholder: 'Fridge, AC, Washing Machine, Microwave', icon: Filter, required: true },
          { key: 'brand', label: 'Brand', placeholder: 'LG, Samsung, Whirlpool', icon: Filter },
          { key: 'capacity', label: 'Capacity', placeholder: 'e.g., 200L, 1.5 Ton', icon: Filter },
          { key: 'budget', label: 'Budget', placeholder: 'e.g., 15000-50000', icon: DollarSign }
        ];

      case 'home-products':
        return [
          { key: 'query', label: 'Product Name', placeholder: 'e.g., sofa, dining table, cookware', icon: Search, required: true },
          { key: 'category', label: 'Category', placeholder: 'Furniture, Kitchen, Decor', icon: Filter },
          { key: 'brand', label: 'Brand', placeholder: 'e.g., IKEA, Urban Ladder', icon: Filter },
          { key: 'budget', label: 'Budget', placeholder: 'e.g., 5000-30000', icon: DollarSign }
        ];

      case 'food-delivery':
        return [
          { key: 'query', label: 'Restaurant/Dish', placeholder: 'e.g., Pizza, Chinese, McDonald\'s', icon: Search, required: true },
          { key: 'location', label: 'Delivery Location', placeholder: 'e.g., Bandra, Koramangala', icon: MapPin, required: true },
          { key: 'cuisine', label: 'Cuisine Type', placeholder: 'e.g., Italian, Indian, Chinese', icon: Filter },
          { key: 'budget', label: 'Budget per Person', placeholder: 'e.g., 200-500', icon: DollarSign }
        ];

      case 'statistics':
        return [
          { key: 'topic', label: 'Data Topic', placeholder: 'e.g., GDP, Employment, Education', icon: Search, required: true },
          { key: 'country1', label: 'First Country/State', placeholder: 'e.g., India, USA, California', icon: MapPin, required: true },
          { key: 'country2', label: 'Second Country/State', placeholder: 'e.g., China, UK, Texas', icon: MapPin },
          { key: 'year', label: 'Year', placeholder: 'e.g., 2023, 2022', icon: Calendar },
          { key: 'indicator', label: 'Specific Indicator', placeholder: 'Optional - specific metric', icon: Filter }
        ];

      case 'stats-religion':
        return [
          { key: 'religion1', label: 'First Religion', placeholder: 'e.g., Christianity, Islam, Hinduism', icon: Search, required: true },
          { key: 'religion2', label: 'Second Religion', placeholder: 'e.g., Buddhism, Judaism', icon: Search },
          { key: 'country', label: 'Country/Region', placeholder: 'e.g., India, USA, World', icon: MapPin },
          { key: 'aspect', label: 'Comparison Aspect', placeholder: 'Population, Growth, Distribution', icon: Filter }
        ];

      case 'stats-financial':
        return [
          { key: 'entity1', label: 'First Entity', placeholder: 'e.g., USA, India, Google', icon: Search, required: true },
          { key: 'entity2', label: 'Second Entity', placeholder: 'e.g., China, Brazil, Apple', icon: Search },
          { key: 'metric', label: 'Financial Metric', placeholder: 'GDP, Revenue, Market Cap, Wealth', icon: DollarSign },
          { key: 'year', label: 'Year', placeholder: 'e.g., 2023', icon: Calendar }
        ];

      case 'stats-political':
        return [
          { key: 'party1', label: 'First Party', placeholder: 'e.g., Democratic, BJP, Labour', icon: Search, required: true },
          { key: 'party2', label: 'Second Party', placeholder: 'e.g., Republican, Congress, Conservative', icon: Search },
          { key: 'country', label: 'Country', placeholder: 'e.g., USA, India, UK', icon: MapPin, required: true },
          { key: 'aspect', label: 'Compare By', placeholder: 'Policies, History, Performance, Ideology', icon: Filter }
        ];

      case 'stats-person':
        return [
          { key: 'person1', label: 'First Person', placeholder: 'e.g., Elon Musk, Jeff Bezos', icon: Search, required: true },
          { key: 'person2', label: 'Second Person', placeholder: 'e.g., Bill Gates, Warren Buffett', icon: Search },
          { key: 'aspect', label: 'Compare By', placeholder: 'Wealth, Influence, Career, Achievements', icon: Filter },
          { key: 'field', label: 'Field', placeholder: 'Business, Politics, Sports, Entertainment', icon: Filter }
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