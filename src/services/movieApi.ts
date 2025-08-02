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

export const movieApi = new MovieApiService();