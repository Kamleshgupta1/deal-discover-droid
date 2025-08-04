interface Train {
  id: string;
  name: string;
  number: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  classes: TrainClass[];
}

interface TrainClass {
  name: string;
  code: string;
  price: number;
  availability: string;
  features: string[];
}

interface TrainPlatform {
  name: string;
  url: string;
  color: string;
  features: string[];
  bookingFee: number;
  cancellationPolicy: string;
}

export class TrainApi {
  private platforms: TrainPlatform[] = [
    {
      name: 'IRCTC',
      url: 'https://irctc.co.in',
      color: '#0066cc',
      features: ['Official Booking', 'E-Tickets', 'Tatkal Booking'],
      bookingFee: 15,
      cancellationPolicy: 'As per railway rules'
    },
    {
      name: 'MakeMyTrip Trains',
      url: 'https://makemytrip.com/railways',
      color: '#ef4444',
      features: ['Easy Booking', 'Travel Insurance', 'Customer Support'],
      bookingFee: 25,
      cancellationPolicy: 'Free cancellation up to 4 hours'
    },
    {
      name: 'Goibibo Trains',
      url: 'https://goibibo.com/trains',
      color: '#f97316',
      features: ['Instant Refund', 'Travel Assist', 'Price Alerts'],
      bookingFee: 20,
      cancellationPolicy: 'Free cancellation up to 2 hours'
    },
    {
      name: 'Paytm Trains',
      url: 'https://paytm.com/trains',
      color: '#0f62fe',
      features: ['Cashback Offers', 'Quick Booking', 'Digital Tickets'],
      bookingFee: 18,
      cancellationPolicy: 'As per terms and conditions'
    }
  ];

  async searchTrains(from: string, to: string, date?: string): Promise<Train[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const trainClasses: TrainClass[] = [
      {
        name: 'Sleeper Class',
        code: 'SL',
        price: 450,
        availability: 'Available',
        features: ['Basic Berth', 'Shared Toilet']
      },
      {
        name: 'AC 3 Tier',
        code: '3A',
        price: 850,
        availability: 'RAC 15',
        features: ['AC Berth', 'Bed Sheets', 'Curtains']
      },
      {
        name: 'AC 2 Tier',
        code: '2A',
        price: 1250,
        availability: 'Available',
        features: ['Comfortable Berth', 'Privacy', 'Premium Service']
      },
      {
        name: 'AC 1 Tier',
        code: '1A',
        price: 2100,
        availability: 'WL 8',
        features: ['Luxury Cabin', 'Personal Attendant', 'Premium Meals']
      }
    ];

    return [
      {
        id: '12951',
        name: 'Mumbai Rajdhani Express',
        number: '12951',
        from: from,
        to: to,
        departure: '16:05',
        arrival: '08:35+1',
        duration: '16h 30m',
        classes: trainClasses
      },
      {
        id: '12423',
        name: 'Dibrugarh Rajdhani Express',
        number: '12423',
        from: from,
        to: to,
        departure: '19:40',
        arrival: '11:50+1',
        duration: '16h 10m',
        classes: trainClasses.map(cls => ({ ...cls, price: cls.price + 100 }))
      },
      {
        id: '12301',
        name: 'Howrah Rajdhani Express',
        number: '12301',
        from: from,
        to: to,
        departure: '16:55',
        arrival: '10:05+1',
        duration: '17h 10m',
        classes: trainClasses.map(cls => ({ ...cls, price: cls.price + 50 }))
      }
    ];
  }

  getPlatforms(): TrainPlatform[] {
    return this.platforms;
  }

  generatePlatformPrice(basePrice: number, platform: TrainPlatform): number {
    return basePrice + platform.bookingFee + Math.floor(Math.random() * 20);
  }
}

export const trainApi = new TrainApi();