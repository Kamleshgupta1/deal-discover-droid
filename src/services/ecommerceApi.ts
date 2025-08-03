// E-commerce API service for product comparisons
// Using Fake Store API for product data simulation

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface Platform {
  name: string;
  url: string;
  color: string;
  features: string[];
  priceMultiplier: number;
  deliveryTime: string;
  offers: string[];
}

const platforms: Platform[] = [
  {
    name: 'Amazon',
    url: 'https://amazon.com',
    color: '#ff9900',
    features: ['Prime Delivery', 'Easy Returns', '24/7 Support'],
    priceMultiplier: 1.0,
    deliveryTime: '1-2 days',
    offers: ['Prime discount', 'Cashback']
  },
  {
    name: 'Flipkart',
    url: 'https://flipkart.com',
    color: '#047bd6',
    features: ['Plus Membership', 'No Cost EMI', 'Exchange Offers'],
    priceMultiplier: 0.95,
    deliveryTime: '2-3 days',
    offers: ['Bank discount', 'Exchange bonus']
  },
  {
    name: 'Myntra',
    url: 'https://myntra.com',
    color: '#ff3e6c',
    features: ['Fashion Focus', 'Try & Buy', 'Style Guide'],
    priceMultiplier: 1.05,
    deliveryTime: '3-4 days',
    offers: ['Style insider', 'Seasonal sale']
  },
  {
    name: 'Ajio',
    url: 'https://ajio.com',
    color: '#d84a38',
    features: ['Trendy Collection', 'Quick Delivery', 'Size Guide'],
    priceMultiplier: 0.98,
    deliveryTime: '2-4 days',
    offers: ['First purchase', 'Festival discount']
  },
  {
    name: 'Meesho',
    url: 'https://meesho.com',
    color: '#9f2089',
    features: ['Bulk Orders', 'Wholesale Prices', 'Reseller Program'],
    priceMultiplier: 0.85,
    deliveryTime: '5-7 days',
    offers: ['Wholesale rates', 'Bulk discount']
  }
];

class EcommerceApi {
  private baseUrl = 'https://fakestoreapi.com';

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const response = await fetch(`${this.baseUrl}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const products: Product[] = await response.json();
      
      // Filter products based on query
      const filtered = products.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      
      return filtered.slice(0, 8); // Return top 8 matches
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await fetch(`${this.baseUrl}/products/category/${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products by category');
      }
      
      const products: Product[] = await response.json();
      return products.slice(0, 6);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/products/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  getPlatforms(): Platform[] {
    return platforms;
  }

  generatePlatformPrice(basePrice: number, multiplier: number): number {
    // Add some random variation (±5%) to make it more realistic
    const variation = 0.9 + Math.random() * 0.2;
    return Math.round(basePrice * multiplier * variation * 100) / 100;
  }

  generateDeliveryEstimate(baseTime: string): string {
    const estimates = [
      'Same day',
      '1-2 days',
      '2-3 days',
      '3-5 days',
      '5-7 days'
    ];
    
    return baseTime || estimates[Math.floor(Math.random() * estimates.length)];
  }
}

export const ecommerceApi = new EcommerceApi();