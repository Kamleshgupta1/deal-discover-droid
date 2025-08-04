interface Theater {
  id: string;
  name: string;
  location: string;
  distance: string;
  showtimes: string[];
  features: string[];
}

interface TheaterTicket {
  id: string;
  theater: Theater;
  movieTitle: string;
  showtime: string;
  price: number;
  seatType: string;
  bookingUrl: string;
  platform: string;
}

interface TicketPlatform {
  name: string;
  url: string;
  color: string;
  features: string[];
  bookingFee: number;
}

export class TheaterApi {
  private platforms: TicketPlatform[] = [
    {
      name: 'BookMyShow',
      url: 'https://bookmyshow.com',
      color: '#dc2626',
      features: ['Advance Booking', 'Seat Selection', 'Mobile Tickets'],
      bookingFee: 15
    },
    {
      name: 'Paytm Movies',
      url: 'https://paytm.com/movies',
      color: '#0f62fe',
      features: ['Cashback Offers', 'Multiple Payment', 'QR Tickets'],
      bookingFee: 12
    },
    {
      name: 'Fandango',
      url: 'https://fandango.com',
      color: '#ff8c00',
      features: ['Guaranteed Tickets', 'Theater Rewards', 'Digital Tickets'],
      bookingFee: 18
    },
    {
      name: 'Atom Tickets',
      url: 'https://atomtickets.com',
      color: '#8b5cf6',
      features: ['Social Features', 'Pre-Order Food', 'Group Booking'],
      bookingFee: 14
    }
  ];

  async searchTheaterTickets(movieTitle: string, location: string): Promise<TheaterTicket[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const theaters: Theater[] = [
      {
        id: '1',
        name: 'PVR Cinemas',
        location: `${location} Mall`,
        distance: '2.3 km',
        showtimes: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'],
        features: ['IMAX', 'Dolby Atmos', 'Recliner Seats']
      },
      {
        id: '2',
        name: 'INOX Multiplex',
        location: `${location} Central`,
        distance: '3.1 km',
        showtimes: ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'],
        features: ['4DX', 'Laser Projection', 'Premium Seats']
      },
      {
        id: '3',
        name: 'Cinepolis',
        location: `${location} Square`,
        distance: '4.5 km',
        showtimes: ['9:30 AM', '12:30 PM', '3:30 PM', '6:30 PM', '9:30 PM'],
        features: ['VIP Experience', 'Gourmet Food', 'Private Screening']
      }
    ];

    const tickets: TheaterTicket[] = [];
    const seatTypes = ['Regular', 'Premium', 'Recliner', 'VIP'];
    const basePrices = { Regular: 150, Premium: 250, Recliner: 350, VIP: 500 };

    theaters.forEach(theater => {
      theater.showtimes.forEach(showtime => {
        seatTypes.forEach(seatType => {
          this.platforms.forEach(platform => {
            const basePrice = basePrices[seatType as keyof typeof basePrices];
            const finalPrice = basePrice + platform.bookingFee + Math.floor(Math.random() * 50);
            
            tickets.push({
              id: `${theater.id}-${showtime}-${seatType}-${platform.name}`,
              theater,
              movieTitle,
              showtime,
              price: finalPrice,
              seatType,
              bookingUrl: `${platform.url}/movie/${encodeURIComponent(movieTitle)}`,
              platform: platform.name
            });
          });
        });
      });
    });

    return tickets.sort((a, b) => a.price - b.price);
  }

  getPlatforms(): TicketPlatform[] {
    return this.platforms;
  }

  generatePlatformPrice(basePrice: number, platform: TicketPlatform): number {
    return basePrice + platform.bookingFee + Math.floor(Math.random() * 30);
  }
}

export const theaterApi = new TheaterApi();