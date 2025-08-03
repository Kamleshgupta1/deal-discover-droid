// Travel API service for flight, hotel, and travel comparisons
// Using simulated data for demonstration

interface Flight {
  id: string;
  airline: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  stops: number;
  class: string;
}

interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  amenities: string[];
  image: string;
}

interface TravelPlatform {
  name: string;
  url: string;
  color: string;
  features: string[];
  bookingFee: number;
  cancellationPolicy: string;
}

const travelPlatforms: TravelPlatform[] = [
  {
    name: 'Booking.com',
    url: 'https://booking.com',
    color: '#003580',
    features: ['Free Cancellation', 'No Booking Fees', 'Genius Discounts'],
    bookingFee: 0,
    cancellationPolicy: 'Free cancellation on most bookings'
  },
  {
    name: 'Expedia',
    url: 'https://expedia.com',
    color: '#ffc72c',
    features: ['Bundle Deals', 'Rewards Points', '24/7 Support'],
    bookingFee: 15,
    cancellationPolicy: 'Varies by property'
  },
  {
    name: 'Agoda',
    url: 'https://agoda.com',
    color: '#3c5a99',
    features: ['Asia Focus', 'Member Discounts', 'Local Support'],
    bookingFee: 10,
    cancellationPolicy: 'Flexible options available'
  },
  {
    name: 'Kayak',
    url: 'https://kayak.com',
    color: '#ff6900',
    features: ['Price Alerts', 'Trip Planning', 'Hacker Fares'],
    bookingFee: 0,
    cancellationPolicy: 'Depends on provider'
  },
  {
    name: 'MakeMyTrip',
    url: 'https://makemytrip.com',
    color: '#e73c7e',
    features: ['India Focus', 'EMI Options', 'Local Packages'],
    bookingFee: 20,
    cancellationPolicy: 'Standard terms apply'
  }
];

class TravelApi {
  private airlines = [
    'Emirates', 'Singapore Airlines', 'Qatar Airways', 'Lufthansa',
    'British Airways', 'Air France', 'KLM', 'Turkish Airlines',
    'IndiGo', 'Air India', 'SpiceJet', 'GoAir'
  ];

  private cities = [
    'New York', 'London', 'Paris', 'Tokyo', 'Dubai',
    'Singapore', 'Mumbai', 'Delhi', 'Bangalore', 'Sydney',
    'Los Angeles', 'Amsterdam', 'Frankfurt', 'Hong Kong'
  ];

  async searchFlights(query: string, from?: string, to?: string): Promise<Flight[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const flights: Flight[] = [];
      
      // Extract cities from query if not provided
      const searchFrom = from || this.extractCity(query, 'from') || this.cities[0];
      const searchTo = to || this.extractCity(query, 'to') || this.cities[1];

      for (let i = 0; i < 8; i++) {
        const airline = this.airlines[Math.floor(Math.random() * this.airlines.length)];
        const departureTime = this.generateTime();
        const arrivalTime = this.generateTime();
        const duration = this.calculateDuration();
        const stops = Math.floor(Math.random() * 3);
        
        flights.push({
          id: `flight-${i}`,
          airline,
          from: searchFrom,
          to: searchTo,
          departure: departureTime,
          arrival: this.generateTime(),
          duration,
          price: Math.floor(Math.random() * 800 + 200),
          stops,
          class: Math.random() > 0.7 ? 'Business' : 'Economy'
        });
      }

      return flights.sort((a, b) => a.price - b.price);
    } catch (error) {
      console.error('Error searching flights:', error);
      return [];
    }
  }

  async searchHotels(query: string, location?: string): Promise<Hotel[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    try {
      const hotels: Hotel[] = [];
      const searchLocation = location || this.extractCity(query, 'in') || 'New York';

      const hotelNames = [
        'Grand Hotel', 'Luxury Resort', 'Business Inn', 'City Center Hotel',
        'Boutique Stay', 'Premium Suites', 'Comfort Lodge', 'Elite Towers'
      ];

      const amenities = [
        ['WiFi', 'Pool', 'Gym', 'Spa'],
        ['Restaurant', 'Bar', 'Room Service'],
        ['Parking', 'Airport Shuttle', 'Concierge'],
        ['Business Center', 'Meeting Rooms', 'Laundry']
      ];

      for (let i = 0; i < 6; i++) {
        const name = hotelNames[Math.floor(Math.random() * hotelNames.length)];
        const rating = Math.round((Math.random() * 2 + 3) * 10) / 10; // 3.0-5.0
        const selectedAmenities = amenities[Math.floor(Math.random() * amenities.length)];

        hotels.push({
          id: `hotel-${i}`,
          name: `${name} ${searchLocation}`,
          location: searchLocation,
          rating,
          price: Math.floor(Math.random() * 300 + 50),
          amenities: selectedAmenities,
          image: `https://picsum.photos/400/300?random=${i}`
        });
      }

      return hotels.sort((a, b) => b.rating - a.rating);
    } catch (error) {
      console.error('Error searching hotels:', error);
      return [];
    }
  }

  getPlatforms(): TravelPlatform[] {
    return travelPlatforms;
  }

  private extractCity(query: string, type: 'from' | 'to' | 'in'): string | null {
    const words = query.toLowerCase().split(' ');
    for (const city of this.cities) {
      if (words.some(word => word.includes(city.toLowerCase().split(' ')[0]))) {
        return city;
      }
    }
    return null;
  }

  private generateTime(): string {
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 60);
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  }

  private calculateDuration(): string {
    const hours = Math.floor(Math.random() * 12 + 1);
    const minutes = Math.floor(Math.random() * 60);
    return `${hours}h ${minutes}m`;
  }

  generatePlatformPrice(basePrice: number, platform: TravelPlatform): number {
    const variation = 0.85 + Math.random() * 0.3; // ±15% variation
    return Math.round((basePrice * variation + platform.bookingFee) * 100) / 100;
  }
}

export const travelApi = new TravelApi();