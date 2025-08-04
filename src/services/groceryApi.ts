interface GroceryProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  brand: string;
  rating: number;
  inStock: boolean;
}

interface GroceryPlatform {
  name: string;
  url: string;
  color: string;
  features: string[];
  deliveryTime: string;
  minimumOrder: number;
  deliveryFee: number;
}

export class GroceryApi {
  private platforms: GroceryPlatform[] = [
    {
      name: 'BigBasket',
      url: 'https://bigbasket.com',
      color: '#84c440',
      features: ['Fresh Produce', 'Same Day Delivery', 'Quality Guarantee'],
      deliveryTime: '2-4 hours',
      minimumOrder: 200,
      deliveryFee: 25
    },
    {
      name: 'Grofers (Blinkit)',
      url: 'https://blinkit.com',
      color: '#fcbf04',
      features: ['10 Min Delivery', 'Fresh Fruits', 'No Minimum Order'],
      deliveryTime: '10-15 mins',
      minimumOrder: 0,
      deliveryFee: 15
    },
    {
      name: 'Amazon Fresh',
      url: 'https://amazon.in/fresh',
      color: '#ff9900',
      features: ['Prime Benefits', 'Fresh Guarantee', 'Easy Returns'],
      deliveryTime: '1-2 hours',
      minimumOrder: 300,
      deliveryFee: 0
    },
    {
      name: 'Swiggy Instamart',
      url: 'https://swiggy.com/instamart',
      color: '#fc8019',
      features: ['Ultra Fast Delivery', 'Express Lane', 'Live Tracking'],
      deliveryTime: '15-30 mins',
      minimumOrder: 99,
      deliveryFee: 20
    },
    {
      name: 'JioMart',
      url: 'https://jiomart.com',
      color: '#0066cc',
      features: ['Bulk Orders', 'Wholesale Prices', 'Free Delivery'],
      deliveryTime: 'Next Day',
      minimumOrder: 500,
      deliveryFee: 0
    }
  ];

  async searchGroceries(query: string): Promise<GroceryProduct[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const products: GroceryProduct[] = [
      {
        id: '1',
        name: 'Organic Basmati Rice',
        category: 'Grains',
        price: 180,
        unit: '1 kg',
        image: '/placeholder.svg',
        brand: 'Fortune',
        rating: 4.3,
        inStock: true
      },
      {
        id: '2',
        name: 'Fresh Milk',
        category: 'Dairy',
        price: 65,
        unit: '1 liter',
        image: '/placeholder.svg',
        brand: 'Amul',
        rating: 4.5,
        inStock: true
      },
      {
        id: '3',
        name: 'Whole Wheat Bread',
        category: 'Bakery',
        price: 45,
        unit: '400g',
        image: '/placeholder.svg',
        brand: 'Britannia',
        rating: 4.2,
        inStock: true
      },
      {
        id: '4',
        name: 'Fresh Bananas',
        category: 'Fruits',
        price: 60,
        unit: '1 dozen',
        image: '/placeholder.svg',
        brand: 'Fresh',
        rating: 4.4,
        inStock: true
      }
    ];

    return products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  }

  getPlatforms(): GroceryPlatform[] {
    return this.platforms;
  }

  generatePlatformPrice(basePrice: number, platform: GroceryPlatform): number {
    const variation = Math.floor(Math.random() * 20) - 10; // ±10 variation
    return Math.max(basePrice + variation, basePrice * 0.8);
  }

  calculateDeliveryTime(platform: GroceryPlatform): string {
    return platform.deliveryTime;
  }
}

export const groceryApi = new GroceryApi();