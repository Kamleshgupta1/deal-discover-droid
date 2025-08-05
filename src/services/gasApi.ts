export interface GasPrice {
  id: string;
  provider: string;
  gasType: 'commercial' | 'domestic';
  connectionType: 'new' | 'existing';
  price: number;
  securityDeposit?: number;
  monthlyRental?: number;
  features: string[];
  url: string;
  location: string;
}

export const searchGasPrices = async (gasType: string, location: string): Promise<GasPrice[]> => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  const providers = [
    { 
      name: 'Indane Gas', 
      domestic: { price: 850, deposit: 2000, rental: 25 },
      commercial: { price: 1650, deposit: 5000, rental: 100 },
      url: 'https://indane.co.in'
    },
    { 
      name: 'Bharat Gas', 
      domestic: { price: 848, deposit: 1900, rental: 25 },
      commercial: { price: 1640, deposit: 4800, rental: 95 },
      url: 'https://bharatgas.com'
    },
    { 
      name: 'HP Gas', 
      domestic: { price: 852, deposit: 2100, rental: 25 },
      commercial: { price: 1660, deposit: 5200, rental: 105 },
      url: 'https://hpgas.in'
    },
    { 
      name: 'Reliance Gas', 
      domestic: { price: 855, deposit: 2200, rental: 30 },
      commercial: { price: 1670, deposit: 5500, rental: 110 },
      url: 'https://reliancegas.com'
    }
  ];

  const type = gasType.toLowerCase() as 'domestic' | 'commercial';
  
  const results: GasPrice[] = providers.map((provider, index) => {
    const pricing = provider[type];
    const variation = 0.95 + Math.random() * 0.1;
    
    return {
      id: `${provider.name.toLowerCase().replace(/\s+/g, '-')}-${index}`,
      provider: provider.name,
      gasType: type,
      connectionType: 'new',
      price: Math.round(pricing.price * variation),
      securityDeposit: pricing.deposit,
      monthlyRental: pricing.rental,
      location: location || 'Delhi',
      features: [
        'Doorstep Delivery',
        'Online Booking',
        'Safety Check',
        type === 'domestic' ? 'Subsidized Rate' : 'GST Applicable'
      ],
      url: provider.url
    };
  });

  return results.sort((a, b) => a.price - b.price);
};