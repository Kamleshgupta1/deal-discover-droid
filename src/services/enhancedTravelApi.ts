// Enhanced Travel API with real platform data and better input handling
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
  aircraft: string;
  baggage: string;
}

interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  amenities: string[];
  image: string;
  roomType: string;
  cancellation: string;
  breakfast: boolean;
}

interface TravelPlatform {
  name: string;
  url: string;
  color: string;
  features: string[];
  bookingFee: number;
  cancellationPolicy: string;
  loyaltyProgram: string;
  customerSupport: string;
}

export class EnhancedTravelApi {
  private platforms: TravelPlatform[] = [
    {
      name: 'MakeMyTrip',
      url: 'https://makemytrip.com',
      color: '#e73c7e',
      features: ['Domestic & International', 'EMI Options', 'Trip Insurance'],
      bookingFee: 200,
      cancellationPolicy: 'Flexible cancellation available',
      loyaltyProgram: 'MMT Black',
      customerSupport: '24/7 Support'
    },
    {
      name: 'Goibibo',
      url: 'https://goibibo.com',
      color: '#f47100',
      features: ['GoCash Rewards', 'Price Promise', 'Instant Refunds'],
      bookingFee: 150,
      cancellationPolicy: 'Free cancellation up to 24hrs',
      loyaltyProgram: 'goRewards',
      customerSupport: 'Chat & Call Support'
    },
    {
      name: 'Cleartrip',
      url: 'https://cleartrip.com',
      color: '#ff6e40',
      features: ['Clean Interface', 'Price Alerts', 'Expressway Booking'],
      bookingFee: 175,
      cancellationPolicy: 'Depends on airline/hotel',
      loyaltyProgram: 'Cleartrip Rewards',
      customerSupport: 'Email & Phone'
    },
    {
      name: 'Yatra',
      url: 'https://yatra.com',
      color: '#e31e24',
      features: ['eCash Rewards', 'Travel Packages', 'Corporate Booking'],
      bookingFee: 225,
      cancellationPolicy: 'Standard terms apply',
      loyaltyProgram: 'Yatra eCash',
      customerSupport: '24x7 Customer Care'
    },
    {
      name: 'Expedia',
      url: 'https://expedia.co.in',
      color: '#ffc72c',
      features: ['Bundle & Save', 'Rewards Points', 'Global Inventory'],
      bookingFee: 300,
      cancellationPolicy: 'Varies by provider',
      loyaltyProgram: 'Expedia Rewards',
      customerSupport: 'International Support'
    },
    {
      name: 'Booking.com',
      url: 'https://booking.com',
      color: '#003580',
      features: ['Free Cancellation', 'No Booking Fees', 'Genius Discounts'],
      bookingFee: 0,
      cancellationPolicy: 'Free cancellation on most',
      loyaltyProgram: 'Genius Program',
      customerSupport: '24/7 Customer Service'
    },
    {
      name: 'Agoda',
      url: 'https://agoda.com',
      color: '#3c5a99',
      features: ['Asia Specialist', 'Member Deals', 'Local Support'],
      bookingFee: 100,
      cancellationPolicy: 'Flexible options available',
      loyaltyProgram: 'PointsMAX',
      customerSupport: 'Multilingual Support'
    },
    {
      name: 'OYO',
      url: 'https://oyorooms.com',
      color: '#ee2a24',
      features: ['Standardized Rooms', 'OYO Money', 'Sanitized Stays'],
      bookingFee: 50,
      cancellationPolicy: 'Free cancellation available',
      loyaltyProgram: 'OYO Rupee',
      customerSupport: 'App & Phone Support'
    }
  ];

  private airlines = [
    { name: 'IndiGo', code: '6E', type: 'domestic' },
    { name: 'Air India', code: 'AI', type: 'both' },
    { name: 'SpiceJet', code: 'SG', type: 'domestic' },
    { name: 'GoAir', code: 'G8', type: 'domestic' },
    { name: 'AirAsia India', code: 'I5', type: 'domestic' },
    { name: 'Vistara', code: 'UK', type: 'both' },
    { name: 'Emirates', code: 'EK', type: 'international' },
    { name: 'Qatar Airways', code: 'QR', type: 'international' },
    { name: 'Singapore Airlines', code: 'SQ', type: 'international' },
    { name: 'Lufthansa', code: 'LH', type: 'international' },
    { name: 'British Airways', code: 'BA', type: 'international' },
    { name: 'Thai Airways', code: 'TG', type: 'international' }
  ];

  async searchFlights(from: string, to: string, departureDate?: string, returnDate?: string, passengers?: number): Promise<Flight[]> {
    await new Promise(resolve => setTimeout(resolve, 1200));

    const flights: Flight[] = [];
    const isInternational = this.isInternationalRoute(from, to);
    const relevantAirlines = this.airlines.filter(airline => 
      airline.type === 'both' || 
      (airline.type === 'domestic' && !isInternational) ||
      (airline.type === 'international' && isInternational)
    );

    for (let i = 0; i < 12; i++) {
      const airline = relevantAirlines[Math.floor(Math.random() * relevantAirlines.length)];
      const departureTime = this.generateTime();
      const flightDuration = this.calculateFlightDuration(from, to);
      const arrivalTime = this.addTimeToTime(departureTime, flightDuration);
      const stops = isInternational ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 2);
      const flightClass = Math.random() > 0.7 ? 'Business' : 'Economy';
      
      const basePrice = isInternational ? 
        Math.floor(Math.random() * 50000 + 20000) : 
        Math.floor(Math.random() * 8000 + 2000);
      
      const classMultiplier = flightClass === 'Business' ? 3 : 1;
      
      flights.push({
        id: `flight-${i}`,
        airline: `${airline.name}`,
        from,
        to,
        departure: departureTime,
        arrival: arrivalTime,
        duration: this.formatDuration(flightDuration),
        price: Math.floor(basePrice * classMultiplier),
        stops,
        class: flightClass,
        aircraft: this.getRandomAircraft(),
        baggage: flightClass === 'Business' ? '30kg + 7kg cabin' : '15kg + 7kg cabin'
      });
    }

    return flights.sort((a, b) => a.price - b.price);
  }

  async searchHotels(location: string, checkIn?: string, checkOut?: string, guests?: number, rooms?: number): Promise<Hotel[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const hotelChains = [
      'Taj Hotels', 'ITC Hotels', 'Oberoi Hotels', 'Leela Palaces', 'Marriott',
      'Hilton', 'Hyatt', 'Radisson', 'Lemon Tree', 'Sarovar Hotels',
      'OYO Hotels', 'Treebo Hotels', 'FabHotels', 'Zostel', 'Ginger Hotels'
    ];

    const roomTypes = [
      'Deluxe Room', 'Executive Room', 'Suite', 'Premium Room', 'Standard Room',
      'Sea View Room', 'Garden View Room', 'Club Room', 'Presidential Suite'
    ];

    const hotels: Hotel[] = [];

    for (let i = 0; i < 10; i++) {
      const hotelChain = hotelChains[Math.floor(Math.random() * hotelChains.length)];
      const roomType = roomTypes[Math.floor(Math.random() * roomTypes.length)];
      const rating = Math.round((Math.random() * 2 + 3) * 10) / 10;
      const isLuxury = hotelChain.includes('Taj') || hotelChain.includes('Oberoi') || hotelChain.includes('Leela');
      
      const basePrice = isLuxury ? 
        Math.floor(Math.random() * 15000 + 5000) : 
        Math.floor(Math.random() * 5000 + 1000);

      hotels.push({
        id: `hotel-${i}`,
        name: `${hotelChain} ${location}`,
        location: `${location} City Center`,
        rating,
        price: basePrice,
        amenities: this.getHotelAmenities(isLuxury),
        image: `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&auto=format&q=60&ixid=${i}`,
        roomType,
        cancellation: Math.random() > 0.3 ? 'Free cancellation until 24hrs' : 'Non-refundable',
        breakfast: Math.random() > 0.4
      });
    }

    return hotels.sort((a, b) => b.rating - a.rating);
  }

  private isInternationalRoute(from: string, to: string): boolean {
    const internationalCities = [
      'Dubai', 'Singapore', 'London', 'Paris', 'New York', 'Tokyo', 'Bangkok',
      'Hong Kong', 'Sydney', 'Toronto', 'Frankfurt', 'Amsterdam', 'Zurich'
    ];
    
    return internationalCities.some(city => 
      from.toLowerCase().includes(city.toLowerCase()) || 
      to.toLowerCase().includes(city.toLowerCase())
    );
  }

  private generateTime(): string {
    const hour = Math.floor(Math.random() * 24);
    const minute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  }

  private calculateFlightDuration(from: string, to: string): number {
    const isInternational = this.isInternationalRoute(from, to);
    if (isInternational) {
      return Math.floor(Math.random() * 480 + 360); // 6-14 hours
    } else {
      return Math.floor(Math.random() * 180 + 60); // 1-4 hours
    }
  }

  private addTimeToTime(time: string, minutesToAdd: number): string {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + minutesToAdd;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;
    return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
  }

  private formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  private getRandomAircraft(): string {
    const aircraft = [
      'Boeing 737', 'Airbus A320', 'Boeing 777', 'Airbus A330',
      'Boeing 787', 'Airbus A350', 'Boeing 747', 'ATR 72'
    ];
    return aircraft[Math.floor(Math.random() * aircraft.length)];
  }

  private getHotelAmenities(isLuxury: boolean): string[] {
    const basicAmenities = ['WiFi', 'AC', 'TV', 'Room Service'];
    const luxuryAmenities = ['Pool', 'Spa', 'Gym', 'Restaurant', 'Bar', 'Concierge', 'Valet Parking'];
    
    if (isLuxury) {
      return [...basicAmenities, ...luxuryAmenities.slice(0, Math.floor(Math.random() * 4 + 3))];
    } else {
      return [...basicAmenities, ...luxuryAmenities.slice(0, Math.floor(Math.random() * 3 + 1))];
    }
  }

  getPlatforms(): TravelPlatform[] {
    return this.platforms;
  }

  generatePlatformPrice(basePrice: number, platform: TravelPlatform): number {
    const variation = 0.85 + Math.random() * 0.3; // ±15% variation
    return Math.round((basePrice * variation + platform.bookingFee) * 100) / 100;
  }
}

export const enhancedTravelApi = new EnhancedTravelApi();