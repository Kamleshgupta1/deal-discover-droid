export interface FuelPrice {
  id: string;
  provider: string;
  fuelType: 'petrol' | 'diesel' | 'cng' | 'lpg';
  price: number;
  location: string;
  lastUpdated: string;
  features: string[];
  url: string;
  logo?: string;
}

export const searchFuelPrices = async (fuelType: string, location: string): Promise<FuelPrice[]> => {
  // Simulate API call with realistic fuel prices
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const providers = [
    { name: 'Indian Oil', basePrice: { petrol: 103.50, diesel: 89.20, cng: 75.30, lpg: 850.00 }, url: 'https://iocl.com' },
    { name: 'Bharat Petroleum', basePrice: { petrol: 103.45, diesel: 89.15, cng: 75.25, lpg: 848.50 }, url: 'https://bharatpetroleum.in' },
    { name: 'Hindustan Petroleum', basePrice: { petrol: 103.55, diesel: 89.25, cng: 75.35, lpg: 851.00 }, url: 'https://hindustanpetroleum.com' },
    { name: 'Reliance Petroleum', basePrice: { petrol: 103.40, diesel: 89.10, cng: 75.20, lpg: 847.00 }, url: 'https://ril.com' },
    { name: 'Shell', basePrice: { petrol: 104.20, diesel: 89.80, cng: 76.00, lpg: 855.00 }, url: 'https://shell.in' },
    { name: 'Nayara Energy', basePrice: { petrol: 103.60, diesel: 89.30, cng: 75.40, lpg: 852.00 }, url: 'https://nayaraenergy.com' }
  ];

  const locationMultiplier = location?.toLowerCase().includes('mumbai') ? 1.02 : 
                           location?.toLowerCase().includes('delhi') ? 1.01 : 
                           location?.toLowerCase().includes('bangalore') ? 0.99 : 1.00;

  const results: FuelPrice[] = providers.map((provider, index) => {
    const basePrice = provider.basePrice[fuelType.toLowerCase() as keyof typeof provider.basePrice] || provider.basePrice.petrol;
    const finalPrice = basePrice * locationMultiplier * (0.98 + Math.random() * 0.04);

    return {
      id: `${provider.name.toLowerCase().replace(/\s+/g, '-')}-${index}`,
      provider: provider.name,
      fuelType: fuelType.toLowerCase() as 'petrol' | 'diesel' | 'cng' | 'lpg',
      price: Math.round(finalPrice * 100) / 100,
      location: location || 'Delhi',
      lastUpdated: new Date().toISOString(),
      features: [
        fuelType === 'lpg' ? 'Subsidized Rate' : 'Premium Quality',
        'Daily Price Updates',
        'Loyalty Programs',
        'Digital Payments'
      ],
      url: provider.url
    };
  });

  return results.sort((a, b) => a.price - b.price);
};