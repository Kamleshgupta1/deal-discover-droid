interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  priceRange: string;
  location: string;
}

interface FoodItem {
  id: string;
  restaurant: Restaurant;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  rating: number;
}

interface FoodPlatform {
  name: string;
  url: string;
  color: string;
  features: string[];
  deliveryFee: number;
  minimumOrder: number;
  commission: number;
}

export class FoodDeliveryApi {
  private platforms: FoodPlatform[] = [
    {
      name: 'Swiggy',
      url: 'https://swiggy.com',
      color: '#fc8019',
      features: ['Fast Delivery', 'Live Tracking', 'Swiggy One'],
      deliveryFee: 25,
      minimumOrder: 149,
      commission: 0.15
    },
    {
      name: 'Zomato',
      url: 'https://zomato.com',
      color: '#e23744',
      features: ['Gold Membership', 'Reviews', 'Pro Delivery'],
      deliveryFee: 30,
      minimumOrder: 199,
      commission: 0.18
    },
    {
      name: 'Uber Eats',
      url: 'https://ubereats.com',
      color: '#000000',
      features: ['Uber Pass', 'Priority Delivery', 'Real-time Tracking'],
      deliveryFee: 35,
      minimumOrder: 99,
      commission: 0.20
    },
    {
      name: 'Foodpanda',
      url: 'https://foodpanda.com',
      color: '#ff2b85',
      features: ['Panda Pro', 'Group Orders', 'Schedule Delivery'],
      deliveryFee: 20,
      minimumOrder: 150,
      commission: 0.16
    },
    {
      name: 'DoorDash',
      url: 'https://doordash.com',
      color: '#ff3008',
      features: ['DashPass', 'No Contact Delivery', 'Order Ahead'],
      deliveryFee: 40,
      minimumOrder: 120,
      commission: 0.17
    }
  ];

  async searchFood(query: string, location: string = 'Delhi'): Promise<FoodItem[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 900));

    const restaurants: Restaurant[] = [
      {
        id: 'rest-1',
        name: 'Burger King',
        cuisine: 'Fast Food',
        rating: 4.2,
        deliveryTime: '25-30 mins',
        deliveryFee: 15,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
        priceRange: '₹200-400',
        location: location
      },
      {
        id: 'rest-2',
        name: 'KFC',
        cuisine: 'Fried Chicken',
        rating: 4.1,
        deliveryTime: '20-25 mins',
        deliveryFee: 20,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
        priceRange: '₹250-500',
        location: location
      },
      {
        id: 'rest-3',
        name: 'Pizza Hut',
        cuisine: 'Italian',
        rating: 4.3,
        deliveryTime: '30-40 mins',
        deliveryFee: 25,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop',
        priceRange: '₹300-600',
        location: location
      },
      {
        id: 'rest-4',
        name: 'Dominos',
        cuisine: 'Pizza',
        rating: 4.0,
        deliveryTime: '25-35 mins',
        deliveryFee: 20,
        image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=300&h=200&fit=crop',
        priceRange: '₹200-500',
        location: location
      },
      {
        id: 'rest-5',
        name: 'Subway',
        cuisine: 'Sandwiches',
        rating: 4.1,
        deliveryTime: '15-20 mins',
        deliveryFee: 15,
        image: 'https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=300&h=200&fit=crop',
        priceRange: '₹150-300',
        location: location
      },
      {
        id: 'rest-6',
        name: 'Chinese Dragon',
        cuisine: 'Chinese',
        rating: 4.4,
        deliveryTime: '35-45 mins',
        deliveryFee: 30,
        image: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=300&h=200&fit=crop',
        priceRange: '₹250-450',
        location: location
      }
    ];

    const foodItems: FoodItem[] = [];
    const searchLower = query.toLowerCase();

    restaurants.forEach(restaurant => {
      if (restaurant.name.toLowerCase().includes(searchLower) || 
          restaurant.cuisine.toLowerCase().includes(searchLower) ||
          searchLower.includes('food') || searchLower.includes('order')) {
        
        // Generate sample food items for each restaurant
        const items = this.generateFoodItems(restaurant, query);
        foodItems.push(...items);
      }
    });

    return foodItems.slice(0, 12);
  }

  private generateFoodItems(restaurant: Restaurant, query: string): FoodItem[] {
    const menuItems = [
      { name: 'Chicken Burger', category: 'Burgers', isVeg: false, price: 199 },
      { name: 'Veg Supreme Pizza', category: 'Pizza', isVeg: true, price: 349 },
      { name: 'Chicken Biryani', category: 'Indian', isVeg: false, price: 299 },
      { name: 'Paneer Tikka', category: 'Indian', isVeg: true, price: 249 },
      { name: 'Fried Chicken', category: 'Chicken', isVeg: false, price: 179 },
      { name: 'Margherita Pizza', category: 'Pizza', isVeg: true, price: 269 },
      { name: 'Chicken Roll', category: 'Wraps', isVeg: false, price: 159 },
      { name: 'Veg Sandwich', category: 'Sandwiches', isVeg: true, price: 129 }
    ];

    return menuItems.slice(0, 3).map((item, idx) => ({
      id: `${restaurant.id}-item-${idx}`,
      restaurant,
      name: item.name,
      description: `Delicious ${item.name} from ${restaurant.name}`,
      price: item.price + Math.floor(Math.random() * 50),
      image: `https://images.unsplash.com/photo-${1555072956 + idx}-7758afb20e8f?w=200&h=150&fit=crop`,
      category: item.category,
      isVeg: item.isVeg,
      rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10
    }));
  }

  getPlatforms(): FoodPlatform[] {
    return this.platforms;
  }

  generatePlatformPrice(basePrice: number, platform: FoodPlatform): number {
    // Add platform commission and delivery fee
    const platformPrice = basePrice * (1 + platform.commission);
    return Math.round((platformPrice + platform.deliveryFee) * 100) / 100;
  }
}

export const foodDeliveryApi = new FoodDeliveryApi();