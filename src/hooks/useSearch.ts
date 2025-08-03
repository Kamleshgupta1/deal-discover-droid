import { useState } from 'react';
import { Category, ComparisonResult } from '@/types';
import { generateMockResults } from '@/utils/categoryUtils';
import { movieApi } from '@/services/movieApi';
import { booksApi } from '@/services/booksApi';
import { cryptoApi } from '@/services/cryptoApi';
import { newsApi } from '@/services/newsApi';
import { weatherApi } from '@/services/weatherApi';
import { recipesApi } from '@/services/recipesApi';

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState<ComparisonResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (category: Category, query: string, location: string) => {
    setIsLoading(true);
    
    try {
      let results: ComparisonResult[] = [];

      // Use real APIs for specific categories
      if (category.id === 'entertainment' && query) {
        results = await searchMovies(query);
      } else if (category.id === 'books' && query) {
        results = await searchBooks(query);
      } else if (category.id === 'cryptocurrency' && query) {
        results = await searchCrypto(query);
      } else if (category.id === 'news' && query) {
        results = await searchNews(query);
      } else if (category.id === 'weather' && query) {
        results = await searchWeather(query, location);
      } else if (category.id === 'food' && query) {
        results = await searchRecipes(query);
      } else {
        // Use mock data for other categories
        results = generateMockResults(category, query);
      }

      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to mock data
      const results = generateMockResults(category, query);
      setSearchResults(results);
    } finally {
      setIsLoading(false);
    }
  };

  const searchMovies = async (query: string): Promise<ComparisonResult[]> => {
    const movies = await movieApi.searchMovies(query);
    const results: ComparisonResult[] = [];

    for (const movie of movies.slice(0, 5)) {
      const details = await movieApi.getMovieDetails(movie.id);
      const watchProviders = await movieApi.getWatchProviders(movie.id);
      
      const platforms = [];
      
      if (watchProviders?.flatrate) {
        platforms.push(...watchProviders.flatrate.map(provider => ({
          platform: {
            name: provider.provider_name,
            url: watchProviders.link,
            color: '#e50914',
            features: ['Streaming', 'HD Quality']
          },
          price: 0, // Included in subscription
          availability: true,
          estimatedDelivery: 'Instant',
          specialOffers: ['Included in subscription'],
          rating: movie.vote_average,
          reviews: movie.vote_count
        })));
      }

      if (watchProviders?.rent) {
        platforms.push(...watchProviders.rent.map(provider => ({
          platform: {
            name: provider.provider_name,
            url: watchProviders.link,
            color: '#ff9500',
            features: ['Rental', 'HD Quality']
          },
          price: 3.99, // Typical rental price
          availability: true,
          estimatedDelivery: 'Instant',
          specialOffers: ['48-hour rental'],
          rating: movie.vote_average,
          reviews: movie.vote_count
        })));
      }

      if (watchProviders?.buy) {
        platforms.push(...watchProviders.buy.map(provider => ({
          platform: {
            name: provider.provider_name,
            url: watchProviders.link,
            color: '#007aff',
            features: ['Purchase', 'Lifetime Access']
          },
          price: 9.99, // Typical purchase price
          availability: true,
          estimatedDelivery: 'Instant',
          specialOffers: ['Own forever'],
          rating: movie.vote_average,
          reviews: movie.vote_count
        })));
      }

      if (platforms.length > 0) {
        const bestPrice = platforms.reduce((min, p) => p.price < min.price ? p : min);
        const bestRated = platforms.reduce((max, p) => p.rating > max.rating ? p : max);
        const fastestDelivery = platforms[0]; // All are instant

        results.push({
          id: movie.id.toString(),
          name: movie.title,
          image: movieApi.getImageUrl(movie.poster_path) || '/placeholder.svg',
          platforms,
          recommendation: {
            bestPrice,
            fastestDelivery,
            bestRated
          }
        });
      }
    }

    return results;
  };

  const searchBooks = async (query: string): Promise<ComparisonResult[]> => {
    const books = await booksApi.searchBooks(query);
    const results: ComparisonResult[] = [];

    for (const book of books.slice(0, 5)) {
      const platforms = [];

      // Google Play Books
      if (book.saleInfo.buyLink) {
        platforms.push({
          platform: {
            name: 'Google Play Books',
            url: book.saleInfo.buyLink,
            color: '#4285f4',
            features: ['Digital', 'Cloud Sync']
          },
          price: book.saleInfo.listPrice?.amount || 9.99,
          availability: true,
          estimatedDelivery: 'Instant',
          specialOffers: book.saleInfo.isEbook ? ['Digital Download'] : [],
          rating: book.averageRating || 4.0,
          reviews: book.ratingsCount || 100
        });
      }

      // Preview link
      if (book.previewLink) {
        platforms.push({
          platform: {
            name: 'Google Books Preview',
            url: book.previewLink,
            color: '#34a853',
            features: ['Free Preview', 'Sample Pages']
          },
          price: 0,
          availability: true,
          estimatedDelivery: 'Instant',
          specialOffers: ['Free Preview'],
          rating: book.averageRating || 4.0,
          reviews: book.ratingsCount || 100
        });
      }

      // Info link
      platforms.push({
        platform: {
          name: 'More Info',
          url: book.infoLink,
          color: '#ea4335',
          features: ['Full Details', 'Reviews']
        },
        price: 0,
        availability: true,
        estimatedDelivery: 'Instant',
        specialOffers: ['Free Information'],
        rating: book.averageRating || 4.0,
        reviews: book.ratingsCount || 100
      });

      if (platforms.length > 0) {
        const bestPrice = platforms.reduce((min, p) => p.price < min.price ? p : min);
        const bestRated = platforms.reduce((max, p) => p.rating > max.rating ? p : max);
        const fastestDelivery = platforms[0];

        results.push({
          id: book.id,
          name: book.title,
          image: book.imageLinks?.thumbnail || '/placeholder.svg',
          platforms,
          recommendation: {
            bestPrice,
            fastestDelivery,
            bestRated
          }
        });
      }
    }

    return results;
  };

  const searchCrypto = async (query: string): Promise<ComparisonResult[]> => {
    const cryptos = await cryptoApi.searchCrypto(query);
    const exchanges = await cryptoApi.getExchanges();
    const results: ComparisonResult[] = [];

    for (const crypto of cryptos.slice(0, 5)) {
      const platforms = exchanges.slice(0, 3).map(exchange => ({
        platform: {
          name: exchange.name,
          url: exchange.url,
          color: '#f7931a',
          features: ['Trading', 'Secure']
        },
        price: crypto.current_price,
        availability: true,
        estimatedDelivery: 'Instant',
        specialOffers: [`Trust Score: ${exchange.trust_score}/10`],
        rating: exchange.trust_score,
        reviews: Math.floor(exchange.trade_volume_24h_btc * 100)
      }));

      if (platforms.length > 0) {
        const bestPrice = platforms.reduce((min, p) => p.price < min.price ? p : min);
        const bestRated = platforms.reduce((max, p) => p.rating > max.rating ? p : max);
        const fastestDelivery = platforms[0];

        results.push({
          id: crypto.id,
          name: `${crypto.name} (${crypto.symbol.toUpperCase()})`,
          image: crypto.image || '/placeholder.svg',
          platforms,
          recommendation: {
            bestPrice,
            fastestDelivery,
            bestRated
          }
        });
      }
    }

    return results;
  };

  const searchNews = async (query: string): Promise<ComparisonResult[]> => {
    const articles = await newsApi.searchNews(query);
    const results: ComparisonResult[] = [];

    for (const article of articles.slice(0, 5)) {
      const platforms = [
        {
          platform: {
            name: article.source.name,
            url: article.url,
            color: '#1da1f2',
            features: ['Free Read', 'Breaking News']
          },
          price: 0,
          availability: true,
          estimatedDelivery: 'Instant',
          specialOffers: ['Free Article'],
          rating: 4.5,
          reviews: 100
        }
      ];

      const bestPrice = platforms[0];
      const bestRated = platforms[0];
      const fastestDelivery = platforms[0];

      results.push({
        id: article.url,
        name: article.title,
        image: article.urlToImage || '/placeholder.svg',
        platforms,
        recommendation: {
          bestPrice,
          fastestDelivery,
          bestRated
        }
      });
    }

    return results;
  };

  const searchWeather = async (query: string, location: string): Promise<ComparisonResult[]> => {
    const weatherData = await weatherApi.getCurrentWeather(location || query);
    if (!weatherData) return [];

    const platforms = [
      {
        platform: {
          name: 'WeatherAPI',
          url: `https://www.weatherapi.com/weather/q/${encodeURIComponent(location || query)}`,
          color: '#87ceeb',
          features: ['Current Weather', '3-Day Forecast']
        },
        price: 0,
        availability: true,
        estimatedDelivery: 'Real-time',
        specialOffers: ['Free Weather Data'],
        rating: 4.8,
        reviews: 1000
      }
    ];

    const bestPrice = platforms[0];
    const bestRated = platforms[0];
    const fastestDelivery = platforms[0];

    return [{
      id: weatherData.location.name,
      name: `Weather in ${weatherData.location.name}`,
      image: `https:${weatherData.current.condition.icon}`,
      platforms,
      recommendation: {
        bestPrice,
        fastestDelivery,
        bestRated
      }
    }];
  };

  const searchRecipes = async (query: string): Promise<ComparisonResult[]> => {
    const recipes = await recipesApi.searchRecipes(query);
    const results: ComparisonResult[] = [];

    for (const recipe of recipes.slice(0, 5)) {
      const platforms = [
        {
          platform: {
            name: 'TheMealDB',
            url: recipe.strYoutube || `https://www.themealdb.com/meal/${recipe.idMeal}`,
            color: '#ff6b6b',
            features: ['Free Recipe', 'Video Tutorial']
          },
          price: 0,
          availability: true,
          estimatedDelivery: 'Instant',
          specialOffers: ['Free Recipe & Video'],
          rating: 4.7,
          reviews: 200
        }
      ];

      const bestPrice = platforms[0];
      const bestRated = platforms[0];
      const fastestDelivery = platforms[0];

      results.push({
        id: recipe.idMeal,
        name: recipe.strMeal,
        image: recipe.strMealThumb || '/placeholder.svg',
        platforms,
        recommendation: {
          bestPrice,
          fastestDelivery,
          bestRated
        }
      });
    }

    return results;
  };

  const clearResults = () => {
    setSearchResults([]);
  };

  return {
    searchResults,
    isLoading,
    handleSearch,
    clearResults,
  };
};