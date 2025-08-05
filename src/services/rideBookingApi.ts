interface RideOption {
  id: string;
  type: string;
  name: string;
  description: string;
  capacity: number;
  estimatedTime: string;
  estimatedPrice: number;
  surge: number;
  features: string[];
}

interface RidePlatform {
  name: string;
  url: string;
  color: string;
  features: string[];
  bookingFee: number;
  cancellationFee: number;
  basePrice: number;
  pricePerKm: number;
  pricePerMin: number;
}

export class RideBookingApi {
  private platforms: RidePlatform[] = [
    {
      name: 'Uber',
      url: 'https://uber.com',
      color: '#000000',
      features: ['GPS Tracking', 'Cashless Payment', 'Driver Rating'],
      bookingFee: 5,
      cancellationFee: 20,
      basePrice: 50,
      pricePerKm: 12,
      pricePerMin: 2
    },
    {
      name: 'Ola',
      url: 'https://olacabs.com',
      color: '#00b956',
      features: ['Live Tracking', 'Multiple Payment', 'Safety Features'],
      bookingFee: 3,
      cancellationFee: 15,
      basePrice: 45,
      pricePerKm: 10,
      pricePerMin: 1.5
    },
    {
      name: 'Rapido',
      url: 'https://rapido.bike',
      color: '#ffa500',
      features: ['Bike Taxi', 'Quick Rides', 'Helmet Provided'],
      bookingFee: 2,
      cancellationFee: 10,
      basePrice: 25,
      pricePerKm: 8,
      pricePerMin: 1
    },
    {
      name: 'Lyft',
      url: 'https://lyft.com',
      color: '#e70b81',
      features: ['Friendly Drivers', 'Round Up Donation', 'Shared Rides'],
      bookingFee: 4,
      cancellationFee: 25,
      basePrice: 55,
      pricePerKm: 13,
      pricePerMin: 2.5
    },
    {
      name: 'BluSmart',
      url: 'https://blusmart.com',
      color: '#0066cc',
      features: ['Electric Vehicles', 'Clean Cars', 'Fixed Pricing'],
      bookingFee: 0,
      cancellationFee: 30,
      basePrice: 60,
      pricePerKm: 15,
      pricePerMin: 2
    }
  ];

  async searchRides(from: string, to: string, rideType?: string): Promise<RideOption[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));

    // Calculate estimated distance and time
    const estimatedDistance = Math.floor(Math.random() * 15 + 5); // 5-20 km
    const estimatedTime = Math.floor(estimatedDistance / 2 + Math.random() * 10 + 10); // minutes

    const rideTypes = [
      {
        type: 'economy',
        name: 'Economy',
        description: 'Affordable rides for daily commute',
        capacity: 4,
        multiplier: 1.0,
        features: ['Standard Car', 'AC Available']
      },
      {
        type: 'premium',
        name: 'Premium',
        description: 'Comfortable rides in premium cars',
        capacity: 4,
        multiplier: 1.5,
        features: ['Premium Car', 'Professional Driver', 'Extra Legroom']
      },
      {
        type: 'xl',
        name: 'XL/SUV',
        description: 'Spacious vehicles for groups',
        capacity: 6,
        multiplier: 1.8,
        features: ['SUV/MPV', 'Extra Space', 'Group Travel']
      },
      {
        type: 'bike',
        name: 'Bike',
        description: 'Quick and economical bike rides',
        capacity: 1,
        multiplier: 0.6,
        features: ['Motorcycle', 'Helmet Provided', 'Fast Travel']
      },
      {
        type: 'auto',
        name: 'Auto',
        description: 'Traditional auto-rickshaw rides',
        capacity: 3,
        multiplier: 0.8,
        features: ['Auto Rickshaw', 'Local Experience', 'Quick Rides']
      }
    ];

    const rides: RideOption[] = [];
    const currentSurge = 1 + (Math.random() * 0.5); // 1.0 to 1.5x surge

    rideTypes.forEach((type, idx) => {
      const basePrice = 80 + (estimatedDistance * 10 * type.multiplier);
      const surgedPrice = basePrice * currentSurge;

      rides.push({
        id: `ride-${idx}`,
        type: type.type,
        name: type.name,
        description: type.description,
        capacity: type.capacity,
        estimatedTime: `${estimatedTime + Math.floor(Math.random() * 5)}`,
        estimatedPrice: Math.round(surgedPrice),
        surge: Math.round(currentSurge * 10) / 10,
        features: type.features
      });
    });

    return rides;
  }

  async getEstimatedFare(from: string, to: string, rideType: string): Promise<number> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const distance = Math.floor(Math.random() * 15 + 5);
    const time = Math.floor(distance / 2 + Math.random() * 10 + 10);
    
    const multipliers = {
      economy: 1.0,
      premium: 1.5,
      xl: 1.8,
      bike: 0.6,
      auto: 0.8
    };

    const basePrice = 80 + (distance * 10 * (multipliers[rideType as keyof typeof multipliers] || 1.0));
    const surge = 1 + (Math.random() * 0.5);
    
    return Math.round(basePrice * surge);
  }

  getPlatforms(): RidePlatform[] {
    return this.platforms;
  }

  generatePlatformPrice(basePrice: number, platform: RidePlatform): number {
    // Add platform-specific pricing variations
    const variation = 0.9 + Math.random() * 0.2; // ±10% variation
    return Math.round((basePrice * variation + platform.bookingFee) * 100) / 100;
  }

  calculateDistance(from: string, to: string): number {
    // Simulate distance calculation
    return Math.floor(Math.random() * 15 + 5);
  }
}

export const rideBookingApi = new RideBookingApi();