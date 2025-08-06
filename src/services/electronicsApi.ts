export interface ElectronicProduct {
  id: string;
  name: string;
  brand: string;
  category: 'mobile' | 'laptop' | 'tablet' | 'desktop' | 'smartwatch' | 'headphones' | 'camera' | 'tv' | 'gaming-console';
  price: number;
  originalPrice?: number;
  discount?: number;
  specifications: Record<string, any>;
  features: string[];
  rating: number;
  reviews: number;
  availability: boolean;
  images: string[];
  warranty: string;
  url: string;
}

export const searchElectronics = async (category: string, brand?: string, priceRange?: [number, number]): Promise<ElectronicProduct[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const products: Omit<ElectronicProduct, 'id'>[] = [
    // Mobile Phones
    {
      name: 'iPhone 15 Pro',
      brand: 'Apple',
      category: 'mobile',
      price: 134900,
      originalPrice: 139900,
      discount: 5000,
      specifications: {
        display: '6.1" Super Retina XDR',
        processor: 'A17 Pro',
        storage: '128GB',
        camera: '48MP Main + 12MP Ultra Wide',
        battery: '3274 mAh',
        os: 'iOS 17'
      },
      features: ['Face ID', '5G', 'Wireless Charging', 'Water Resistant', 'MagSafe'],
      rating: 4.8,
      reviews: 2500,
      availability: true,
      images: ['/placeholder.svg'],
      warranty: '1 year',
      url: 'https://apple.com'
    },
    {
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      category: 'mobile',
      price: 129999,
      originalPrice: 134999,
      discount: 5000,
      specifications: {
        display: '6.8" Dynamic AMOLED 2X',
        processor: 'Snapdragon 8 Gen 3',
        storage: '256GB',
        camera: '200MP Main + 12MP Ultra Wide',
        battery: '5000 mAh',
        os: 'Android 14'
      },
      features: ['S Pen', '5G', 'Fast Charging', 'IP68', 'DeX Mode'],
      rating: 4.7,
      reviews: 3200,
      availability: true,
      images: ['/placeholder.svg'],
      warranty: '1 year',
      url: 'https://samsung.com'
    },
    {
      name: 'OnePlus 12',
      brand: 'OnePlus',
      category: 'mobile',
      price: 64999,
      originalPrice: 69999,
      discount: 5000,
      specifications: {
        display: '6.82" LTPO AMOLED',
        processor: 'Snapdragon 8 Gen 3',
        storage: '256GB',
        camera: '50MP Main + 64MP Periscope',
        battery: '5400 mAh',
        os: 'OxygenOS 14'
      },
      features: ['120Hz Display', '100W Fast Charging', 'Alert Slider', 'Hasselblad Camera'],
      rating: 4.6,
      reviews: 1800,
      availability: true,
      images: ['/placeholder.svg'],
      warranty: '1 year',
      url: 'https://oneplus.com'
    },
    // Laptops
    {
      name: 'MacBook Air M3',
      brand: 'Apple',
      category: 'laptop',
      price: 134900,
      originalPrice: 139900,
      discount: 5000,
      specifications: {
        display: '13.6" Liquid Retina',
        processor: 'Apple M3',
        ram: '8GB Unified Memory',
        storage: '256GB SSD',
        graphics: '8-core GPU',
        battery: '18 hours',
        weight: '1.24 kg'
      },
      features: ['Touch ID', 'MagSafe Charging', 'Backlit Keyboard', 'Force Touch Trackpad'],
      rating: 4.8,
      reviews: 1500,
      availability: true,
      images: ['/placeholder.svg'],
      warranty: '1 year',
      url: 'https://apple.com'
    },
    {
      name: 'Dell XPS 13 Plus',
      brand: 'Dell',
      category: 'laptop',
      price: 159999,
      originalPrice: 169999,
      discount: 10000,
      specifications: {
        display: '13.4" InfinityEdge Touch',
        processor: 'Intel Core i7-13700H',
        ram: '16GB LPDDR5',
        storage: '512GB SSD',
        graphics: 'Intel Iris Xe',
        battery: '12 hours',
        weight: '1.26 kg'
      },
      features: ['4K Display', 'Fingerprint Reader', 'Thunderbolt 4', 'Premium Build'],
      rating: 4.6,
      reviews: 890,
      availability: true,
      images: ['/placeholder.svg'],
      warranty: '1 year',
      url: 'https://dell.com'
    },
    {
      name: 'HP Spectre x360',
      brand: 'HP',
      category: 'laptop',
      price: 124999,
      originalPrice: 134999,
      discount: 10000,
      specifications: {
        display: '13.5" OLED Touch',
        processor: 'Intel Core i7-1355U',
        ram: '16GB DDR4',
        storage: '1TB SSD',
        graphics: 'Intel Iris Xe',
        battery: '15 hours',
        weight: '1.36 kg'
      },
      features: ['360° Hinge', 'Privacy Camera', 'Bang & Olufsen Audio', 'Convertible Design'],
      rating: 4.5,
      reviews: 650,
      availability: true,
      images: ['/placeholder.svg'],
      warranty: '1 year',
      url: 'https://hp.com'
    },
    // Gaming Consoles
    {
      name: 'PlayStation 5',
      brand: 'Sony',
      category: 'gaming-console',
      price: 54990,
      originalPrice: 54990,
      specifications: {
        processor: 'AMD Zen 2',
        graphics: 'AMD RDNA 2',
        memory: '16GB GDDR6',
        storage: '825GB SSD',
        resolution: '4K/8K Support',
        frameRate: '120fps'
      },
      features: ['Ray Tracing', 'Haptic Feedback', 'Tempest 3D Audio', 'Backward Compatibility'],
      rating: 4.9,
      reviews: 5000,
      availability: false,
      images: ['/placeholder.svg'],
      warranty: '1 year',
      url: 'https://playstation.com'
    },
    {
      name: 'Xbox Series X',
      brand: 'Microsoft',
      category: 'gaming-console',
      price: 52990,
      originalPrice: 52990,
      specifications: {
        processor: 'AMD Zen 2',
        graphics: 'AMD RDNA 2',
        memory: '16GB GDDR6',
        storage: '1TB SSD',
        resolution: '4K/8K Support',
        frameRate: '120fps'
      },
      features: ['Game Pass', 'Quick Resume', 'Auto HDR', 'Smart Delivery'],
      rating: 4.8,
      reviews: 3800,
      availability: true,
      images: ['/placeholder.svg'],
      warranty: '1 year',
      url: 'https://xbox.com'
    }
  ];

  let results = products
    .filter(product => !category || product.category === category)
    .filter(product => !brand || product.brand.toLowerCase().includes(brand.toLowerCase()))
    .filter(product => !priceRange || (product.price >= priceRange[0] && product.price <= priceRange[1]));

  return results.map((product, index) => ({
    ...product,
    id: `electronics-${index}`
  })).sort((a, b) => b.rating - a.rating);
};