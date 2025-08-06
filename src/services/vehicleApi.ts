export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  type: 'bike' | 'scooter' | 'electric-bike' | 'electric-scooter' | 'car' | 'electric-car' | 'truck' | 'bus';
  price: number;
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid' | 'cng';
  mileage: number;
  engineCapacity?: number;
  maxSpeed: number;
  seatingCapacity?: number;
  features: string[];
  url: string;
  rating: number;
  images: string[];
  specifications: {
    warranty: string;
    transmission: string;
    dimensions: string;
    weight: string;
  };
}

export const searchVehicles = async (type: string, brand?: string): Promise<Vehicle[]> => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  const vehicles: Omit<Vehicle, 'id'>[] = [
    // Two Wheelers - Bikes
    {
      name: 'Royal Enfield Classic 350',
      brand: 'Royal Enfield',
      type: 'bike',
      price: 195000,
      fuelType: 'petrol',
      mileage: 40,
      engineCapacity: 349,
      maxSpeed: 110,
      features: ['ABS', 'Digital Console', 'LED Headlight', 'Electric Start'],
      url: 'https://royalenfield.com',
      rating: 4.5,
      images: ['/placeholder.svg'],
      specifications: {
        warranty: '2 years',
        transmission: 'Manual',
        dimensions: '2130 x 800 x 1080 mm',
        weight: '195 kg'
      }
    },
    {
      name: 'Honda CB350RS',
      brand: 'Honda',
      type: 'bike',
      price: 210000,
      fuelType: 'petrol',
      mileage: 38,
      engineCapacity: 348,
      maxSpeed: 115,
      features: ['ABS', 'Bluetooth Connectivity', 'Digital Display', 'LED Lights'],
      url: 'https://honda.com',
      rating: 4.3,
      images: ['/placeholder.svg'],
      specifications: {
        warranty: '3 years',
        transmission: 'Manual',
        dimensions: '2130 x 790 x 1100 mm',
        weight: '181 kg'
      }
    },
    // Scooters
    {
      name: 'Honda Activa 6G',
      brand: 'Honda',
      type: 'scooter',
      price: 75000,
      fuelType: 'petrol',
      mileage: 60,
      engineCapacity: 109,
      maxSpeed: 83,
      features: ['Combi Brake', 'LED Headlight', 'Mobile Charging Port', 'Under Seat Storage'],
      url: 'https://honda.com',
      rating: 4.4,
      images: ['/placeholder.svg'],
      specifications: {
        warranty: '3 years',
        transmission: 'Automatic',
        dimensions: '1761 x 697 x 1156 mm',
        weight: '109 kg'
      }
    },
    {
      name: 'TVS Jupiter',
      brand: 'TVS',
      type: 'scooter',
      price: 73000,
      fuelType: 'petrol',
      mileage: 62,
      engineCapacity: 109,
      maxSpeed: 85,
      features: ['USB Charging', 'LED DRL', 'External Fuel Fill', 'Large Under Seat Storage'],
      url: 'https://tvs.com',
      rating: 4.2,
      images: ['/placeholder.svg'],
      specifications: {
        warranty: '3 years',
        transmission: 'Automatic',
        dimensions: '1834 x 650 x 1115 mm',
        weight: '108 kg'
      }
    },
    // Electric Vehicles
    {
      name: 'Ather 450X',
      brand: 'Ather',
      type: 'electric-scooter',
      price: 148000,
      fuelType: 'electric',
      mileage: 85, // km per charge
      maxSpeed: 90,
      features: ['Fast Charging', 'Google Maps', 'OTA Updates', 'Anti-theft'],
      url: 'https://atherenergy.com',
      rating: 4.6,
      images: ['/placeholder.svg'],
      specifications: {
        warranty: '3 years',
        transmission: 'Automatic',
        dimensions: '1840 x 720 x 1260 mm',
        weight: '108 kg'
      }
    },
    {
      name: 'Revolt RV400',
      brand: 'Revolt',
      type: 'electric-bike',
      price: 125000,
      fuelType: 'electric',
      mileage: 150,
      maxSpeed: 85,
      features: ['AI Enabled', 'Mobile App', 'Sound Simulator', 'GPS Tracking'],
      url: 'https://revoltmotors.com',
      rating: 4.1,
      images: ['/placeholder.svg'],
      specifications: {
        warranty: '5 years',
        transmission: 'Automatic',
        dimensions: '1970 x 780 x 1075 mm',
        weight: '108 kg'
      }
    },
    // Cars
    {
      name: 'Maruti Suzuki Swift',
      brand: 'Maruti Suzuki',
      type: 'car',
      price: 600000,
      fuelType: 'petrol',
      mileage: 23,
      engineCapacity: 1197,
      maxSpeed: 165,
      seatingCapacity: 5,
      features: ['ABS', 'Airbags', 'Power Steering', 'Central Locking'],
      url: 'https://marutisuzuki.com',
      rating: 4.3,
      images: ['/placeholder.svg'],
      specifications: {
        warranty: '2 years',
        transmission: 'Manual/AMT',
        dimensions: '3845 x 1735 x 1530 mm',
        weight: '860 kg'
      }
    },
    {
      name: 'Hyundai Creta',
      brand: 'Hyundai',
      type: 'car',
      price: 1200000,
      fuelType: 'petrol',
      mileage: 17,
      engineCapacity: 1497,
      maxSpeed: 180,
      seatingCapacity: 5,
      features: ['Sunroof', 'Touchscreen', 'Wireless Charging', 'Cruise Control'],
      url: 'https://hyundai.com',
      rating: 4.5,
      images: ['/placeholder.svg'],
      specifications: {
        warranty: '3 years',
        transmission: 'Manual/Automatic',
        dimensions: '4300 x 1790 x 1635 mm',
        weight: '1245 kg'
      }
    },
    // Electric Cars
    {
      name: 'Tata Nexon EV',
      brand: 'Tata',
      type: 'electric-car',
      price: 1500000,
      fuelType: 'electric',
      mileage: 312, // km per charge
      maxSpeed: 120,
      seatingCapacity: 5,
      features: ['Fast Charging', 'Connected Car Tech', 'IP67 Battery', 'Regenerative Braking'],
      url: 'https://tata.com',
      rating: 4.4,
      images: ['/placeholder.svg'],
      specifications: {
        warranty: '8 years',
        transmission: 'Automatic',
        dimensions: '3993 x 1811 x 1606 mm',
        weight: '1400 kg'
      }
    }
  ];

  const results: Vehicle[] = vehicles
    .filter(vehicle => !type || vehicle.type === type)
    .filter(vehicle => !brand || vehicle.brand.toLowerCase().includes(brand.toLowerCase()))
    .map((vehicle, index) => ({
      ...vehicle,
      id: `vehicle-${index}`
    }));

  return results.sort((a, b) => b.rating - a.rating);
};