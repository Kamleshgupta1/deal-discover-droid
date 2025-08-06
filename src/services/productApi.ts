export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subCategory?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  specifications: Record<string, any>;
  features: string[];
  rating: number;
  reviews: number;
  availability: boolean;
  images: string[];
  warranty?: string;
  url: string;
  variants?: Array<{
    name: string;
    price: number;
    specifications?: Record<string, any>;
  }>;
}

export const searchProducts = async (category: string, query?: string, filters?: Record<string, any>): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));

  const products: Omit<Product, 'id'>[] = [
    // Home & Kitchen Products
    {
      name: 'Prestige Svachh Hard Anodised Pressure Cooker',
      brand: 'Prestige',
      category: 'home-kitchen',
      subCategory: 'cookware',
      price: 2890,
      originalPrice: 3200,
      discount: 310,
      description: 'Hard anodised pressure cooker with unique spillage control feature',
      specifications: {
        capacity: '5 Litres',
        material: 'Hard Anodised Aluminium',
        safety: 'Unique spillage control',
        handles: 'Stay cool handles',
        base: 'Induction compatible'
      },
      features: ['Spillage Control', 'Deep Lid', 'Induction Compatible', 'ISI Certified'],
      rating: 4.3,
      reviews: 2500,
      availability: true,
      images: ['/placeholder.svg'],
      warranty: '5 years',
      url: 'https://prestige.co.in',
      variants: [
        { name: '3 Litres', price: 2190, specifications: { capacity: '3 Litres' } },
        { name: '5 Litres', price: 2890, specifications: { capacity: '5 Litres' } },
        { name: '7 Litres', price: 3490, specifications: { capacity: '7 Litres' } }
      ]
    },
    {
      name: 'Milton Thermosteel Flip Lid Flask',
      brand: 'Milton',
      category: 'home-kitchen',
      subCategory: 'drinkware',
      price: 1299,
      originalPrice: 1599,
      discount: 300,
      description: 'Double wall vacuum insulated stainless steel water bottle',
      specifications: {
        capacity: '1000ml',
        material: 'Stainless Steel 304',
        insulation: 'Double Wall Vacuum',
        temperature: 'Hot 24hrs, Cold 24hrs',
        lid: 'Flip Lid'
      },
      features: ['Leak Proof', 'Temperature Retention', 'Easy Grip', 'BPA Free'],
      rating: 4.5,
      reviews: 1800,
      availability: true,
      images: ['/placeholder.svg'],
      warranty: '1 year',
      url: 'https://milton.in'
    },
    // Personal Care Products
    {
      name: 'Philips Norelco OneBlade Face + Body',
      brand: 'Philips',
      category: 'personal-care',
      subCategory: 'grooming',
      price: 4995,
      originalPrice: 5995,
      discount: 1000,
      description: 'Revolutionary electric groomer that can trim, edge and shave any length of hair',
      specifications: {
        bladeType: 'OneBlade Technology',
        batteryLife: '90 minutes',
        attachments: '5 trimmer combs + 2 body combs',
        waterproof: 'Yes',
        charging: 'USB-A'
      },
      features: ['Dual-sided blade', 'Wet & Dry', 'No nicks or cuts', 'Easy to clean'],
      rating: 4.4,
      reviews: 3200,
      availability: true,
      images: ['/placeholder.svg'],
      warranty: '2 years',
      url: 'https://philips.com'
    },
    {
      name: 'Lakme Absolute Perfect Radiance Skin Lightening Serum',
      brand: 'Lakme',
      category: 'personal-care',
      subCategory: 'skincare',
      price: 1100,
      originalPrice: 1299,
      discount: 199,
      description: 'Advanced skin lightening serum with niacinamide for radiant skin',
      specifications: {
        volume: '30ml',
        keyIngredients: 'Niacinamide, Vitamin C',
        skinType: 'All Skin Types',
        usage: 'Day & Night',
        spf: 'No'
      },
      features: ['Reduces Dark Spots', 'Brightens Skin', 'Lightweight Formula', 'Dermatologically Tested'],
      rating: 4.2,
      reviews: 1500,
      availability: true,
      images: ['/placeholder.svg'],
      url: 'https://lakme.com'
    },
    // Sports & Fitness
    {
      name: 'Decathlon Domyos Cross Training Shoes',
      brand: 'Decathlon',
      category: 'sports-fitness',
      subCategory: 'footwear',
      price: 2999,
      originalPrice: 3499,
      discount: 500,
      description: 'Versatile training shoes designed for cardio and strength training',
      specifications: {
        type: 'Cross Training',
        upper: 'Mesh and Synthetic',
        sole: 'Rubber with pivot points',
        drop: '4mm',
        weight: '310g'
      },
      features: ['Multi-directional grip', 'Breathable mesh', 'Heel stability', 'Flexible forefoot'],
      rating: 4.3,
      reviews: 890,
      availability: true,
      images: ['/placeholder.svg'],
      warranty: '2 years',
      url: 'https://decathlon.in',
      variants: [
        { name: 'UK 7', price: 2999 },
        { name: 'UK 8', price: 2999 },
        { name: 'UK 9', price: 2999 },
        { name: 'UK 10', price: 2999 }
      ]
    },
    // Books & Stationery
    {
      name: 'Parker Jotter Steel Ballpoint Pen',
      brand: 'Parker',
      category: 'books-stationery',
      subCategory: 'writing',
      price: 850,
      originalPrice: 1000,
      discount: 150,
      description: 'Classic stainless steel ballpoint pen with signature arrow clip',
      specifications: {
        material: 'Stainless Steel',
        refill: 'Parker Quink Flow',
        tipSize: 'Medium',
        mechanism: 'Click',
        length: '129mm'
      },
      features: ['Iconic Design', 'Reliable Performance', 'Comfortable Grip', 'Lifetime Guarantee'],
      rating: 4.6,
      reviews: 650,
      availability: true,
      images: ['/placeholder.svg'],
      warranty: 'Lifetime',
      url: 'https://parker.com'
    },
    // Automotive Accessories
    {
      name: 'Bosch Car Battery 12V 65Ah',
      brand: 'Bosch',
      category: 'automotive',
      subCategory: 'battery',
      price: 7500,
      originalPrice: 8200,
      discount: 700,
      description: 'Maintenance-free car battery with silver alloy technology',
      specifications: {
        voltage: '12V',
        capacity: '65Ah',
        technology: 'Silver Alloy',
        warranty: '36 months',
        type: 'Maintenance Free'
      },
      features: ['Long Life', 'High Cranking Power', 'Leak Proof', 'Corrosion Resistant'],
      rating: 4.4,
      reviews: 1200,
      availability: true,
      images: ['/placeholder.svg'],
      warranty: '36 months',
      url: 'https://bosch.com'
    }
  ];

  let results = products
    .filter(product => !category || product.category === category || product.subCategory === category)
    .filter(product => !query || 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );

  // Apply filters
  if (filters) {
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      results = results.filter(product => product.price >= min && product.price <= max);
    }
    if (filters.brand) {
      results = results.filter(product => product.brand.toLowerCase() === filters.brand.toLowerCase());
    }
    if (filters.rating) {
      results = results.filter(product => product.rating >= filters.rating);
    }
  }

  return results.map((product, index) => ({
    ...product,
    id: `product-${index}`
  })).sort((a, b) => b.rating - a.rating);
};