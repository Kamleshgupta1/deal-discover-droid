// The Movie Database (TMDB) API - Free tier
const TMDB_API_KEY = '8265bd1679663a7ea12ac168da84d2e8'; // Public demo key
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  adult: boolean;
  original_language: string;
  runtime?: number;
  budget?: number;
  revenue?: number;
}

export interface MovieDetails extends Movie {
  runtime: number;
  budget: number;
  revenue: number;
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string; logo_path: string }[];
  imdb_id: string;
}

export interface MovieProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
  display_priority: number;
}

export interface MovieWatchProviders {
  flatrate?: MovieProvider[];
  rent?: MovieProvider[];
  buy?: MovieProvider[];
  link: string;
}

class MovieApiService {
  async searchMovies(query: string): Promise<Movie[]> {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=1`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error searching movies:', error);
      return [];
    }
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails | null> {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`
      );
      return await response.json();
    } catch (error) {
      console.error('Error getting movie details:', error);
      return null;
    }
  }

  async getWatchProviders(movieId: number): Promise<MovieWatchProviders | null> {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/${movieId}/watch/providers?api_key=${TMDB_API_KEY}`
      );
      const data = await response.json();
      return data.results?.US || null; // US providers
    } catch (error) {
      console.error('Error getting watch providers:', error);
      return null;
    }
  }

  getImageUrl(path: string): string {
    return path ? `${IMAGE_BASE_URL}${path}` : '';
  }

  async getPopularMovies(): Promise<Movie[]> {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=1`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error getting popular movies:', error);
      return [];
    }
  }
}

// Enhanced Movie API with theatre bookings
interface TheaterTicket {
  id: string;
  theater: {
    name: string;
    location: string;
    distance: string;
    features: string[];
  };
  showtime: string;
  price: number;
  seatType: string;
  bookingUrl: string;
  platform: string;
}

interface MovieTicketPlatform {
  name: string;
  url: string;
  color: string;
  features: string[];
  bookingFee: number;
}

class EnhancedMovieApiService extends MovieApiService {
  private ticketPlatforms: MovieTicketPlatform[] = [
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
    },
    {
      name: 'Cineplex',
      url: 'https://cineplex.com',
      color: '#1e40af',
      features: ['Scene Points', 'Premium Experience', 'VIP Theaters'],
      bookingFee: 16
    }
  ];

  async searchTheaterTickets(movieTitle: string, location: string): Promise<TheaterTicket[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const theaters = [
      {
        name: 'PVR Cinemas',
        location: `${location} Mall`,
        distance: '2.3 km',
        features: ['IMAX', 'Dolby Atmos', 'Recliner Seats']
      },
      {
        name: 'INOX Multiplex',
        location: `${location} Central`,
        distance: '3.1 km',
        features: ['4DX', 'Laser Projection', 'Premium Seats']
      },
      {
        name: 'Cinepolis',
        location: `${location} Square`,
        distance: '4.5 km',
        features: ['VIP Experience', 'Gourmet Food', 'Private Screening']
      },
      {
        name: 'Carnival Cinemas',
        location: `${location} City Center`,
        distance: '1.8 km',
        features: ['Gold Class', 'Restaurant', 'Parking']
      },
      {
        name: 'Fun Republic',
        location: `${location} Junction`,
        distance: '5.2 km',
        features: ['IMAX', 'Food Court', 'Gaming Zone']
      }
    ];

    const showtimes = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'];
    const seatTypes = ['Regular', 'Premium', 'Recliner', 'VIP'];
    const basePrices = { Regular: 150, Premium: 250, Recliner: 350, VIP: 500 };

    const tickets: TheaterTicket[] = [];

    theaters.forEach(theater => {
      showtimes.slice(0, Math.floor(Math.random() * 3 + 2)).forEach(showtime => {
        seatTypes.slice(0, Math.floor(Math.random() * 2 + 2)).forEach(seatType => {
          this.ticketPlatforms.forEach(platform => {
            const basePrice = basePrices[seatType as keyof typeof basePrices];
            const finalPrice = basePrice + platform.bookingFee + Math.floor(Math.random() * 50);
            
            tickets.push({
              id: `${theater.name}-${showtime}-${seatType}-${platform.name}`.replace(/\s+/g, '-'),
              theater,
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

  getTicketPlatforms(): MovieTicketPlatform[] {
    return this.ticketPlatforms;
  }
}

export const movieApi = new EnhancedMovieApiService();