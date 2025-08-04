interface ClothingProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  brand: string;
  rating: number;
  sizes: string[];
  colors: string[];
  material: string;
}

interface ClothingPlatform {
  name: string;
  url: string;
  color: string;
  features: string[];
  deliveryTime: string;
  returnPolicy: string;
  offers: string[];
}

export class ClothingApi {
  private platforms: ClothingPlatform[] = [
    {
      name: 'Myntra',
      url: 'https://myntra.com',
      color: '#ff3f6c',
      features: ['Fashion Forward', 'Easy Returns', 'Brand Variety'],
      deliveryTime: '2-7 days',
      returnPolicy: '14 days return',
      offers: ['Flat 50% Off', 'Buy 2 Get 1 Free']
    },
    {
      name: 'Amazon Fashion',
      url: 'https://amazon.in/fashion',
      color: '#ff9900',
      features: ['Prime Delivery', 'Try Before Buy', 'Wide Selection'],
      deliveryTime: '1-2 days',
      returnPolicy: '30 days return',
      offers: ['Prime Free Delivery', 'Fashion Sale']
    },
    {
      name: 'Flipkart Fashion',
      url: 'https://flipkart.com/clothing',
      color: '#2874f0',
      features: ['Big Billion Days', 'Plus Exclusive', 'Assured Quality'],
      deliveryTime: '2-6 days',
      returnPolicy: '10 days return',
      offers: ['Super Coin Cashback', 'Exchange Offers']
    },
    {
      name: 'Ajio',
      url: 'https://ajio.com',
      color: '#c8a86d',
      features: ['Curated Fashion', 'Exclusive Brands', 'Style Guides'],
      deliveryTime: '3-7 days',
      returnPolicy: '15 days return',
      offers: ['Flat 60% Off', 'Style Points']
    },
    {
      name: 'Nykaa Fashion',
      url: 'https://nykaafashion.com',
      color: '#e91e63',
      features: ['Beauty & Fashion', 'Premium Brands', 'Style Tips'],
      deliveryTime: '3-5 days',
      returnPolicy: '15 days return',
      offers: ['Beauty Points', 'Fashion Week Sale']
    }
  ];

  async searchClothing(query: string): Promise<ClothingProduct[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const products: ClothingProduct[] = [
      {
        id: '1',
        name: 'Cotton Casual Shirt',
        category: 'Shirts',
        price: 899,
        image: '/placeholder.svg',
        brand: 'Allen Solly',
        rating: 4.2,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Blue', 'White', 'Black', 'Grey'],
        material: '100% Cotton'
      },
      {
        id: '2',
        name: 'Slim Fit Jeans',
        category: 'Pants',
        price: 1499,
        image: '/placeholder.svg',
        brand: 'Levis',
        rating: 4.5,
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['Blue', 'Black', 'Grey'],
        material: 'Denim'
      },
      {
        id: '3',
        name: 'Summer Dress',
        category: 'Dresses',
        price: 1299,
        image: '/placeholder.svg',
        brand: 'Vero Moda',
        rating: 4.3,
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Floral', 'Solid Blue', 'Solid Black'],
        material: 'Polyester Blend'
      },
      {
        id: '4',
        name: 'Sports T-Shirt',
        category: 'Activewear',
        price: 699,
        image: '/placeholder.svg',
        brand: 'Nike',
        rating: 4.6,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Red', 'Blue', 'Black', 'White'],
        material: 'Polyester Dri-FIT'
      }
    ];

    return products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase())
    );
  }

  getPlatforms(): ClothingPlatform[] {
    return this.platforms;
  }

  generatePlatformPrice(basePrice: number, platform: ClothingPlatform): number {
    const variation = Math.floor(Math.random() * 200) - 100; // ±100 variation
    return Math.max(basePrice + variation, basePrice * 0.7);
  }
}

export const clothingApi = new ClothingApi();