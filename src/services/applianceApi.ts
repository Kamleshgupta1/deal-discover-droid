export interface Appliance {
  id: string;
  name: string;
  brand: string;
  category: 'refrigerator' | 'washing-machine' | 'air-conditioner' | 'microwave' | 'television' | 'cooler' | 'water-heater' | 'dishwasher';
  price: number;
  originalPrice?: number;
  discount?: number;
  specifications: Record<string, any>;
  features: string[];
  energyRating: number; // 1-5 stars
  warranty: string;
  rating: number;
  reviews: number;
  availability: boolean;
  images: string[];
  url: string;
}

export const searchAppliances = async (category: string, brand?: string, capacity?: string): Promise<Appliance[]> => {
  await new Promise(resolve => setTimeout(resolve, 900));

  const appliances: Omit<Appliance, 'id'>[] = [
    // Refrigerators
    {
      name: 'LG 687L Side by Side Refrigerator',
      brand: 'LG',
      category: 'refrigerator',
      price: 89990,
      originalPrice: 99990,
      discount: 10000,
      specifications: {
        capacity: '687 Liters',
        type: 'Side by Side',
        compressor: 'Inverter Linear',
        shelves: 'Toughened Glass',
        cooling: 'Multi Air Flow',
        dimensions: '912 x 738 x 1790 mm'
      },
      features: ['Door Cooling+', 'Smart Diagnosis', 'Smart Connect', 'Door Lock', 'LED Lighting'],
      energyRating: 3,
      warranty: '10 years on compressor',
      rating: 4.4,
      reviews: 1250,
      availability: true,
      images: ['/placeholder.svg'],
      url: 'https://lg.com'
    },
    {
      name: 'Samsung 700L French Door Refrigerator',
      brand: 'Samsung',
      category: 'refrigerator',
      price: 125000,
      originalPrice: 135000,
      discount: 10000,
      specifications: {
        capacity: '700 Liters',
        type: 'French Door',
        compressor: 'Digital Inverter',
        freezer: 'Triple Cooling',
        technology: 'SpaceMax',
        dimensions: '908 x 716 x 1825 mm'
      },
      features: ['Family Hub', 'Twin Cooling Plus', 'FlexZone', 'All Around Cooling', 'Digital Display'],
      energyRating: 4,
      warranty: '20 years on compressor',
      rating: 4.6,
      reviews: 980,
      availability: true,
      images: ['/placeholder.svg'],
      url: 'https://samsung.com'
    },
    // Air Conditioners
    {
      name: 'Daikin 1.5 Ton 5 Star Split AC',
      brand: 'Daikin',
      category: 'air-conditioner',
      price: 42990,
      originalPrice: 48990,
      discount: 6000,
      specifications: {
        capacity: '1.5 Ton',
        type: 'Split AC',
        compressor: 'Inverter',
        refrigerant: 'R32',
        coverage: '150-180 sq ft',
        coolingCapacity: '5100 W'
      },
      features: ['Copper Condenser', 'PM 2.5 Filter', 'Dew Clean Technology', 'Coanda Airflow'],
      energyRating: 5,
      warranty: '1+4 years comprehensive',
      rating: 4.5,
      reviews: 2100,
      availability: true,
      images: ['/placeholder.svg'],
      url: 'https://daikin.com'
    },
    {
      name: 'Voltas 1.5 Ton 3 Star Split AC',
      brand: 'Voltas',
      category: 'air-conditioner',
      price: 31990,
      originalPrice: 36990,
      discount: 5000,
      specifications: {
        capacity: '1.5 Ton',
        type: 'Split AC',
        compressor: 'Fixed Speed',
        refrigerant: 'R32',
        coverage: '150-180 sq ft',
        coolingCapacity: '5100 W'
      },
      features: ['Copper Condenser', 'Anti-Dust Filter', 'Turbo Cool', 'Self Diagnosis'],
      energyRating: 3,
      warranty: '1+4 years comprehensive',
      rating: 4.2,
      reviews: 1800,
      availability: true,
      images: ['/placeholder.svg'],
      url: 'https://voltas.com'
    },
    // Washing Machines
    {
      name: 'IFB 8kg Front Load Washing Machine',
      brand: 'IFB',
      category: 'washing-machine',
      price: 45990,
      originalPrice: 52990,
      discount: 7000,
      specifications: {
        capacity: '8 kg',
        type: 'Front Load',
        technology: 'Inverter',
        speed: '1400 RPM',
        programs: '15 Wash Programs',
        display: 'LED Display'
      },
      features: ['Steam Wash', 'Cradle Wash', 'Baby Care', 'Aqua Energie', 'Crescent Moon Drum'],
      energyRating: 5,
      warranty: '4 years comprehensive',
      rating: 4.3,
      reviews: 950,
      availability: true,
      images: ['/placeholder.svg'],
      url: 'https://ifbappliances.com'
    },
    {
      name: 'LG 9kg Front Load Washing Machine',
      brand: 'LG',
      category: 'washing-machine',
      price: 54990,
      originalPrice: 62990,
      discount: 8000,
      specifications: {
        capacity: '9 kg',
        type: 'Front Load',
        technology: 'AI Direct Drive',
        speed: '1400 RPM',
        programs: '14 Wash Programs',
        display: 'Touch Panel'
      },
      features: ['Steam Wash', 'Allergiene', 'Smart Diagnosis', 'Child Lock', '6 Motion DD'],
      energyRating: 5,
      warranty: '10 years on motor',
      rating: 4.5,
      reviews: 1650,
      availability: true,
      images: ['/placeholder.svg'],
      url: 'https://lg.com'
    },
    // Televisions
    {
      name: 'Sony 55" 4K OLED Smart TV',
      brand: 'Sony',
      category: 'television',
      price: 199990,
      originalPrice: 219990,
      discount: 20000,
      specifications: {
        screenSize: '55 inches',
        resolution: '4K UHD',
        display: 'OLED',
        processor: 'Cognitive Processor XR',
        soundOutput: '30W',
        os: 'Google TV'
      },
      features: ['Dolby Vision', 'Dolby Atmos', 'Netflix Calibrated', 'Apple AirPlay', 'Google Assistant'],
      energyRating: 4,
      warranty: '1 year',
      rating: 4.7,
      reviews: 750,
      availability: true,
      images: ['/placeholder.svg'],
      url: 'https://sony.com'
    },
    {
      name: 'Samsung 65" Neo QLED 4K Smart TV',
      brand: 'Samsung',
      category: 'television',
      price: 249990,
      originalPrice: 279990,
      discount: 30000,
      specifications: {
        screenSize: '65 inches',
        resolution: '4K UHD',
        display: 'Neo QLED',
        processor: 'Neo Quantum Processor 4K',
        soundOutput: '60W',
        os: 'Tizen'
      },
      features: ['Quantum HDR', 'Object Tracking Sound', 'Gaming Hub', 'Bixby', 'SmartThings'],
      energyRating: 4,
      warranty: '1 year',
      rating: 4.6,
      reviews: 1200,
      availability: true,
      images: ['/placeholder.svg'],
      url: 'https://samsung.com'
    },
    // Coolers
    {
      name: 'Symphony Desert 50i Tower Cooler',
      brand: 'Symphony',
      category: 'cooler',
      price: 8990,
      originalPrice: 10990,
      discount: 2000,
      specifications: {
        capacity: '50 Litres',
        type: 'Tower Cooler',
        airThrow: '25 feet',
        coverage: '350 sq ft',
        pads: 'Honeycomb',
        wheels: 'Castor Wheels'
      },
      features: ['Ice Chamber', 'Auto Drain', 'Mosquito Net', 'Remote Control', 'Timer Function'],
      energyRating: 4,
      warranty: '1 year',
      rating: 4.1,
      reviews: 850,
      availability: true,
      images: ['/placeholder.svg'],
      url: 'https://symphonylimited.com'
    }
  ];

  let results = appliances
    .filter(appliance => !category || appliance.category === category)
    .filter(appliance => !brand || appliance.brand.toLowerCase().includes(brand.toLowerCase()));

  return results.map((appliance, index) => ({
    ...appliance,
    id: `appliance-${index}`
  })).sort((a, b) => b.rating - a.rating);
};