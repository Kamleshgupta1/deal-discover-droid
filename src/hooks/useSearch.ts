import { useState } from 'react';
import { Category, ComparisonResult } from '@/types';
import { generateMockResults } from '@/utils/categoryUtils';
import { movieApi } from '@/services/movieApi';
import { booksApi } from '@/services/booksApi';
import { cryptoApi } from '@/services/cryptoApi';
import { newsApi } from '@/services/newsApi';
import { weatherApi } from '@/services/weatherApi';
import { recipesApi } from '@/services/recipesApi';
import { ecommerceApi } from '@/services/ecommerceApi';
import { jobsApi } from '@/services/jobsApi';
import { travelApi } from '@/services/travelApi';
import { theaterApi } from '@/services/theaterApi';
import { trainApi } from '@/services/trainApi';
import { groceryApi } from '@/services/groceryApi';
import { clothingApi } from '@/services/clothingApi';
import { searchFuelPrices } from '@/services/fuelApi';
import { searchGasPrices } from '@/services/gasApi';
import { searchRechargeOptions } from '@/services/rechargeApi';
import { searchMutualFunds } from '@/services/mutualFundApi';
import { searchInsurancePolicies } from '@/services/insuranceApi';
import { searchBankingProducts } from '@/services/bankingApi';
import { searchVehicles } from '@/services/vehicleApi';
import { searchElectronics } from '@/services/electronicsApi';
import { searchAppliances } from '@/services/applianceApi';
import { searchProducts } from '@/services/productApi';
import { foodDeliveryApi } from '@/services/foodDeliveryApi';
import { rideBookingApi } from '@/services/rideBookingApi';
import { medicineApi } from '@/services/medicineApi';
import { enhancedTravelApi } from '@/services/enhancedTravelApi';
import { 
  searchStatistics, 
  generateReligionComparison, 
  generateFinancialComparison, 
  generatePoliticalComparison, 
  generatePersonComparison 
} from '@/services/statisticsApi';

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
      } else if (category.id === 'shopping' && query) {
        results = await searchProducts(query);
      } else if (category.id === 'jobs' && query) {
        results = await searchJobs(query);
      } else if (category.id === 'travel' && query) {
        results = await searchTravel(query, location);
      } else if (category.id === 'electronics' && query) {
        results = await searchProducts(query);
      } else if (category.id === 'grocery' && query) {
        results = await searchGrocery(query);
      } else if (category.id === 'clothing' && query) {
        results = await searchClothing(query);
      } else if (category.id === 'fuel' && query) {
        results = await searchFuel(query, location);
      } else if (category.id === 'gas' && query) {
        results = await searchGas(query, location);
      } else if (category.id === 'recharge' && query) {
        results = await searchRecharge(query);
      } else if (category.id === 'mutual-funds' && query) {
        results = await searchMutualFundsWrapper(query);
      } else if (category.id === 'insurance' && query) {
        results = await searchInsurance(query);
      } else if (category.id === 'banking' && query) {
        results = await searchBanking(query);
      } else if (category.id === 'food-delivery' && query) {
        results = await searchFoodDelivery(query, location);
      } else if (category.id === 'ride-booking' && query) {
        results = await searchRideBooking(query, location);
      } else if (category.id === 'medicine' && query) {
        results = await searchMedicine(query, location);
      } else if (category.id === 'vehicles' && query) {
        const vehicles = await searchVehicles(query);
        results = convertVehiclesToResults(vehicles);
      } else if (category.id === 'mobile-devices' && query) {
        const electronics = await searchElectronics(query);
        results = convertElectronicsToResults(electronics);
      } else if (category.id === 'computers-laptops' && query) {
        const electronics = await searchElectronics(query);
        results = convertElectronicsToResults(electronics);
      } else if (category.id === 'home-appliances' && query) {
        const appliances = await searchAppliances(query);
        results = convertAppliancesToResults(appliances);
      } else if (category.id === 'home-products' && query) {
        results = await searchProducts(query);
      } else if (category.id === 'statistics' && query) {
        results = await handleStatisticsSearch(query, location);
      } else if (category.id === 'stats-religion' && query) {
        results = await handleReligionStats(query, location);
      } else if (category.id === 'stats-financial' && query) {
        results = await handleFinancialStats(query, location);
      } else if (category.id === 'stats-political' && query) {
        results = await handlePoliticalStats(query, location);
      } else if (category.id === 'stats-person' && query) {
        results = await handlePersonStats(query, location);
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

  const searchProducts = async (query: string): Promise<ComparisonResult[]> => {
    const products = await ecommerceApi.searchProducts(query);
    const platforms = ecommerceApi.getPlatforms();
    const results: ComparisonResult[] = [];

    for (const product of products.slice(0, 6)) {
      const productPlatforms = platforms.map(platform => ({
        platform: {
          name: platform.name,
          url: platform.url,
          color: platform.color,
          features: platform.features
        },
        price: ecommerceApi.generatePlatformPrice(product.price, platform.priceMultiplier),
        availability: true,
        estimatedDelivery: platform.deliveryTime,
        specialOffers: platform.offers,
        rating: product.rating.rate,
        reviews: product.rating.count
      }));

      const bestPrice = productPlatforms.reduce((min, p) => p.price < min.price ? p : min);
      const bestRated = productPlatforms.reduce((max, p) => p.rating > max.rating ? p : max);
      const fastestDelivery = productPlatforms.reduce((min, p) => 
        p.estimatedDelivery.includes('1-2') ? p : min
      );

      results.push({
        id: product.id.toString(),
        name: product.title,
        image: product.image,
        platforms: productPlatforms,
        recommendation: {
          bestPrice,
          fastestDelivery,
          bestRated
        }
      });
    }

    return results;
  };

  const searchJobs = async (query: string): Promise<ComparisonResult[]> => {
    const jobs = await jobsApi.searchJobs(query);
    const platforms = jobsApi.getPlatforms();
    const results: ComparisonResult[] = [];

    for (const job of jobs.slice(0, 5)) {
      const jobPlatforms = platforms.map(platform => ({
        platform: {
          name: platform.name,
          url: platform.url,
          color: platform.color,
          features: platform.features
        },
        price: 0, // Jobs don't have prices
        availability: true,
        estimatedDelivery: 'Apply Now',
        specialOffers: [`${jobsApi.generatePlatformJobCount(platform, query)} similar jobs`],
        rating: platform.premium ? 4.8 : 4.2,
        reviews: platform.jobCount
      }));

      const bestRated = jobPlatforms.reduce((max, p) => p.rating > max.rating ? p : max);
      const mostJobs = jobPlatforms.reduce((max, p) => p.reviews > max.reviews ? p : max);

      results.push({
        id: job.id,
        name: job.title,
        image: job.logo || '/placeholder.svg',
        platforms: jobPlatforms,
        recommendation: {
          bestPrice: jobPlatforms[0], // Not applicable for jobs
          fastestDelivery: jobPlatforms[0],
          bestRated
        }
      });
    }

    return results;
  };

  const searchTravel = async (query: string, location: string): Promise<ComparisonResult[]> => {
    const flights = await travelApi.searchFlights(query, undefined, location);
    const hotels = await travelApi.searchHotels(query, location);
    const platforms = travelApi.getPlatforms();
    const results: ComparisonResult[] = [];

    // Add flight results
    for (const flight of flights.slice(0, 3)) {
      const flightPlatforms = platforms.map(platform => ({
        platform: {
          name: platform.name,
          url: platform.url,
          color: platform.color,
          features: platform.features
        },
        price: travelApi.generatePlatformPrice(flight.price, platform),
        availability: true,
        estimatedDelivery: 'Instant Booking',
        specialOffers: [platform.cancellationPolicy],
        rating: 4.5,
        reviews: 1000
      }));

      const bestPrice = flightPlatforms.reduce((min, p) => p.price < min.price ? p : min);
      const bestRated = flightPlatforms.reduce((max, p) => p.rating > max.rating ? p : max);

      results.push({
        id: flight.id,
        name: `${flight.airline}: ${flight.from} → ${flight.to}`,
        image: '/placeholder.svg',
        platforms: flightPlatforms,
        recommendation: {
          bestPrice,
          fastestDelivery: flightPlatforms[0],
          bestRated
        }
      });
    }

    // Add hotel results
    for (const hotel of hotels.slice(0, 3)) {
      const hotelPlatforms = platforms.map(platform => ({
        platform: {
          name: platform.name,
          url: platform.url,
          color: platform.color,
          features: platform.features
        },
        price: travelApi.generatePlatformPrice(hotel.price, platform),
        availability: true,
        estimatedDelivery: 'Instant Booking',
        specialOffers: [platform.cancellationPolicy],
        rating: hotel.rating,
        reviews: 500
      }));

      const bestPrice = hotelPlatforms.reduce((min, p) => p.price < min.price ? p : min);
      const bestRated = hotelPlatforms.reduce((max, p) => p.rating > max.rating ? p : max);

      results.push({
        id: hotel.id,
        name: hotel.name,
        image: hotel.image,
        platforms: hotelPlatforms,
        recommendation: {
          bestPrice,
          fastestDelivery: hotelPlatforms[0],
          bestRated
        }
      });
    }

    return results;
  };

  const searchGrocery = async (query: string): Promise<ComparisonResult[]> => {
    const products = await groceryApi.searchGroceries(query);
    const platforms = groceryApi.getPlatforms();
    const results: ComparisonResult[] = [];

    for (const product of products.slice(0, 6)) {
      const productPlatforms = platforms.map(platform => ({
        platform: {
          name: platform.name,
          url: platform.url,
          color: platform.color,
          features: platform.features
        },
        price: groceryApi.generatePlatformPrice(product.price, platform),
        availability: product.inStock,
        estimatedDelivery: platform.deliveryTime,
        specialOffers: [`Min Order: ₹${platform.minimumOrder}`, `Delivery: ₹${platform.deliveryFee}`],
        rating: product.rating,
        reviews: Math.floor(Math.random() * 500) + 100
      }));

      const bestPrice = productPlatforms.reduce((min, p) => p.price < min.price ? p : min);
      const bestRated = productPlatforms.reduce((max, p) => p.rating > max.rating ? p : max);
      const fastestDelivery = productPlatforms.reduce((min, p) => 
        p.estimatedDelivery.includes('min') ? p : min
      );

      results.push({
        id: product.id,
        name: `${product.name} (${product.unit})`,
        image: product.image,
        platforms: productPlatforms,
        recommendation: {
          bestPrice,
          fastestDelivery,
          bestRated
        }
      });
    }

    return results;
  };

  const searchClothing = async (query: string): Promise<ComparisonResult[]> => {
    const products = await clothingApi.searchClothing(query);
    const platforms = clothingApi.getPlatforms();
    const results: ComparisonResult[] = [];

    for (const product of products.slice(0, 6)) {
      const productPlatforms = platforms.map(platform => ({
        platform: {
          name: platform.name,
          url: platform.url,
          color: platform.color,
          features: platform.features
        },
        price: clothingApi.generatePlatformPrice(product.price, platform),
        availability: true,
        estimatedDelivery: platform.deliveryTime,
        specialOffers: platform.offers.slice(0, 1),
        rating: product.rating,
        reviews: Math.floor(Math.random() * 1000) + 200
      }));

      const bestPrice = productPlatforms.reduce((min, p) => p.price < min.price ? p : min);
      const bestRated = productPlatforms.reduce((max, p) => p.rating > max.rating ? p : max);
      const fastestDelivery = productPlatforms.reduce((min, p) => 
        parseInt(p.estimatedDelivery) < parseInt(min.estimatedDelivery) ? p : min
      );

      results.push({
        id: product.id,
        name: `${product.name} - ${product.brand}`,
        image: product.image,
        platforms: productPlatforms,
        recommendation: {
          bestPrice,
          fastestDelivery,
          bestRated
        }
      });
    }

    return results;
  };

  const searchFuel = async (query: string, location: string): Promise<ComparisonResult[]> => {
    const fuelPrices = await searchFuelPrices(query, location);
    const results: ComparisonResult[] = [];

    const groupedPrices = fuelPrices.reduce((acc, fuel) => {
      if (!acc[fuel.fuelType]) acc[fuel.fuelType] = [];
      acc[fuel.fuelType].push(fuel);
      return acc;
    }, {} as Record<string, typeof fuelPrices>);

    Object.entries(groupedPrices).forEach(([fuelType, prices]) => {
      const platforms = prices.map(fuel => ({
        platform: {
          name: fuel.provider,
          url: fuel.url,
          color: '#ff6b35',
          features: fuel.features
        },
        price: fuel.price,
        availability: true,
        estimatedDelivery: 'Available Now',
        specialOffers: [`Updated: ${new Date(fuel.lastUpdated).toLocaleDateString()}`],
        rating: 4.5,
        reviews: 100
      }));

      const bestPrice = platforms.reduce((min, p) => p.price < min.price ? p : min);
      const bestRated = platforms.reduce((max, p) => p.rating > max.rating ? p : max);

      results.push({
        id: fuelType,
        name: `${fuelType.toUpperCase()} - ${location}`,
        image: '/placeholder.svg',
        platforms,
        recommendation: {
          bestPrice,
          fastestDelivery: platforms[0],
          bestRated
        }
      });
    });

    return results;
  };

  const searchGas = async (query: string, location: string): Promise<ComparisonResult[]> => {
    const gasPrices = await searchGasPrices(query, location);
    const results: ComparisonResult[] = [];

    const platforms = gasPrices.map(gas => ({
      platform: {
        name: gas.provider,
        url: gas.url,
        color: '#0066cc',
        features: gas.features
      },
      price: gas.price,
      availability: true,
      estimatedDelivery: 'Available Now',
      specialOffers: [`Security Deposit: ₹${gas.securityDeposit}`, `Monthly Rental: ₹${gas.monthlyRental}`],
      rating: 4.5,
      reviews: 200
    }));

    const bestPrice = platforms.reduce((min, p) => p.price < min.price ? p : min);
    const bestRated = platforms.reduce((max, p) => p.rating > max.rating ? p : max);

    results.push({
      id: query,
      name: `${query.toUpperCase()} Gas Connection - ${location}`,
      image: '/placeholder.svg',
      platforms,
      recommendation: {
        bestPrice,
        fastestDelivery: platforms[0],
        bestRated
      }
    });

    return results;
  };

  const searchRecharge = async (query: string): Promise<ComparisonResult[]> => {
    const rechargeOptions = await searchRechargeOptions(query);
    const results: ComparisonResult[] = [];

    const groupedOptions = rechargeOptions.reduce((acc, option) => {
      if (!acc[option.plan]) acc[option.plan] = [];
      acc[option.plan].push(option);
      return acc;
    }, {} as Record<string, typeof rechargeOptions>);

    Object.entries(groupedOptions).forEach(([planName, options]) => {
      const platforms = options.map(option => ({
        platform: {
          name: option.provider,
          url: option.url,
          color: '#5f259f',
          features: option.features
        },
        price: option.amount,
        availability: true,
        estimatedDelivery: 'Instant',
        specialOffers: [`Cashback: ₹${option.cashback}`, `Validity: ${option.validity}`],
        rating: 4.3,
        reviews: 500
      }));

      const bestPrice = platforms.reduce((min, p) => p.price < min.price ? p : min);
      const bestCashback = platforms.reduce((max, p) => 
        parseInt(p.specialOffers[0].split('₹')[1]) > parseInt(max.specialOffers[0].split('₹')[1]) ? p : max
      );

      results.push({
        id: planName,
        name: `${planName} - ${query.toUpperCase()}`,
        image: '/placeholder.svg',
        platforms,
        recommendation: {
          bestPrice,
          fastestDelivery: platforms[0],
          bestRated: bestCashback
        }
      });
    });

    return results;
  };

  const searchMutualFundsWrapper = async (query: string): Promise<ComparisonResult[]> => {
    const funds = await searchMutualFunds(query);
    const results: ComparisonResult[] = [];

    for (const fund of funds) {
      const platforms = [{
        platform: {
          name: fund.provider,
          url: fund.url,
          color: '#0066cc',
          features: fund.features
        },
        price: fund.nav,
        availability: true,
        estimatedDelivery: 'SIP Available',
        specialOffers: [
          `1Y Return: ${fund.returns1Y}%`,
          `3Y Return: ${fund.returns3Y}%`,
          `Expense Ratio: ${fund.expenseRatio}%`,
          `Min Investment: ₹${fund.minInvestment}`
        ],
        rating: fund.rating,
        reviews: 300
      }];

      results.push({
        id: fund.id,
        name: fund.fundName,
        image: '/placeholder.svg',
        platforms,
        recommendation: {
          bestPrice: platforms[0],
          fastestDelivery: platforms[0],
          bestRated: platforms[0]
        }
      });
    }

    return results.sort((a, b) => 
      parseFloat(b.platforms[0].specialOffers[0].split('%')[0].split(': ')[1]) - 
      parseFloat(a.platforms[0].specialOffers[0].split('%')[0].split(': ')[1])
    );
  };

  const searchInsurance = async (query: string): Promise<ComparisonResult[]> => {
    const policies = await searchInsurancePolicies(query);
    const results: ComparisonResult[] = [];

    for (const policy of policies) {
      const platforms = [{
        platform: {
          name: policy.provider,
          url: policy.url,
          color: '#ff3366',
          features: policy.features
        },
        price: policy.premium,
        availability: true,
        estimatedDelivery: 'Instant Quote',
        specialOffers: [
          `Coverage: ₹${policy.coverage.toLocaleString()}`,
          `Claim Ratio: ${policy.claimRatio}%`,
          `Tenure: ${policy.tenure}`,
          policy.ageLimit || 'All Ages'
        ],
        rating: policy.rating,
        reviews: 400
      }];

      results.push({
        id: policy.id,
        name: `${policy.policyName} - ${policy.policyType.toUpperCase()}`,
        image: '/placeholder.svg',
        platforms,
        recommendation: {
          bestPrice: platforms[0],
          fastestDelivery: platforms[0],
          bestRated: platforms[0]
        }
      });
    }

    return results;
  };

  const searchBanking = async (query: string): Promise<ComparisonResult[]> => {
    const products = await searchBankingProducts(query);
    const results: ComparisonResult[] = [];

    for (const product of products) {
      const platforms = [{
        platform: {
          name: product.bank,
          url: product.url,
          color: '#004c8c',
          features: product.features
        },
        price: product.productType === 'creditcard' ? (product.annualFee || 0) : (product.fees || 0),
        availability: true,
        estimatedDelivery: product.processingTime || 'Apply Now',
        specialOffers: [
          product.interestRate ? `Interest Rate: ${product.interestRate}%` : '',
          product.creditLimit ? `Credit Limit: ₹${product.creditLimit.toLocaleString()}` : '',
          product.minBalance ? `Min Balance: ₹${product.minBalance.toLocaleString()}` : '',
          `Rating: ${product.rating}/5`
        ].filter(Boolean),
        rating: product.rating,
        reviews: 600
      }];

      results.push({
        id: product.id,
        name: `${product.productName} - ${product.productType.toUpperCase()}`,
        image: '/placeholder.svg',
        platforms,
        recommendation: {
          bestPrice: platforms[0],
          fastestDelivery: platforms[0],
          bestRated: platforms[0]
        }
      });
    }

    return results;
  };

  const searchFoodDelivery = async (query: string, location: string): Promise<ComparisonResult[]> => {
    const foods = await foodDeliveryApi.searchFood(query, location);
    const platforms = foodDeliveryApi.getPlatforms();
    const results: ComparisonResult[] = [];

    for (const food of foods.slice(0, 8)) {
      const foodPlatforms = platforms.map(platform => ({
        platform: {
          name: platform.name,
          url: platform.url,
          color: platform.color,
          features: platform.features
        },
        price: foodDeliveryApi.generatePlatformPrice(food.price, platform),
        availability: true,
        estimatedDelivery: food.restaurant.deliveryTime,
        specialOffers: [`${food.restaurant.rating}⭐`, food.restaurant.priceRange],
        rating: food.rating,
        reviews: 150
      }));

      const bestPrice = foodPlatforms.reduce((min, p) => p.price < min.price ? p : min);
      const fastestDelivery = foodPlatforms.reduce((min, p) => 
        parseInt(p.estimatedDelivery) < parseInt(min.estimatedDelivery) ? p : min
      );

      results.push({
        id: food.id,
        name: `${food.name} from ${food.restaurant.name}`,
        image: food.image,
        platforms: foodPlatforms,
        recommendation: {
          bestPrice,
          fastestDelivery,
          bestRated: foodPlatforms[0]
        }
      });
    }

    return results;
  };

  const searchRideBooking = async (from: string, to: string): Promise<ComparisonResult[]> => {
    const rides = await rideBookingApi.searchRides(from, to);
    const platforms = rideBookingApi.getPlatforms();
    const results: ComparisonResult[] = [];

    for (const ride of rides) {
      const ridePlatforms = platforms.map(platform => ({
        platform: {
          name: platform.name,
          url: platform.url,
          color: platform.color,
          features: platform.features
        },
        price: rideBookingApi.generatePlatformPrice(ride.estimatedPrice, platform),
        availability: true,
        estimatedDelivery: `${ride.estimatedTime} mins`,
        specialOffers: [`${ride.capacity} seats`, `Surge: ${ride.surge}x`],
        rating: 4.3,
        reviews: 1000
      }));

      const bestPrice = ridePlatforms.reduce((min, p) => p.price < min.price ? p : min);

      results.push({
        id: ride.id,
        name: `${ride.name} - ${from} to ${to}`,
        image: '/placeholder.svg',
        platforms: ridePlatforms,
        recommendation: {
          bestPrice,
          fastestDelivery: ridePlatforms[0],
          bestRated: ridePlatforms[0]
        }
      });
    }

    return results;
  };

  const searchMedicine = async (query: string, location: string): Promise<ComparisonResult[]> => {
    const medicines = await medicineApi.searchMedicines(query, location);
    const platforms = medicineApi.getPlatforms();
    const results: ComparisonResult[] = [];

    for (const medicine of medicines.slice(0, 6)) {
      const medicinePlatforms = platforms.map(platform => ({
        platform: {
          name: platform.name,
          url: platform.url,
          color: platform.color,
          features: platform.features
        },
        price: medicineApi.generatePlatformPrice(medicine.mrp, platform),
        availability: true,
        estimatedDelivery: platform.deliveryTime,
        specialOffers: [medicine.prescriptionRequired ? 'Prescription Required' : 'No Prescription', medicine.packSize],
        rating: 4.4,
        reviews: 200
      }));

      const bestPrice = medicinePlatforms.reduce((min, p) => p.price < min.price ? p : min);

      results.push({
        id: medicine.id,
        name: `${medicine.name} ${medicine.strength}`,
        image: medicine.image,
        platforms: medicinePlatforms,
        recommendation: {
          bestPrice,
          fastestDelivery: medicinePlatforms[0],
          bestRated: medicinePlatforms[0]
        }
      });
    }

    return results;
  };

  const convertVehiclesToResults = (vehicles: any[]): ComparisonResult[] => {
    return vehicles.slice(0, 6).map(vehicle => {
      const platforms = [
        {
          platform: { name: 'CarDekho', url: 'https://cardekho.com', color: '#ff6b35', features: ['Expert Reviews', 'Price Comparison'] },
          price: vehicle.price,
          availability: true,
          estimatedDelivery: 'Visit Showroom',
          specialOffers: vehicle.offers || [],
          rating: vehicle.rating || 4.5,
          reviews: 500
        },
        {
          platform: { name: 'CarWale', url: 'https://carwale.com', color: '#0066cc', features: ['Latest Offers', 'EMI Calculator'] },
          price: vehicle.price * 1.02,
          availability: true,
          estimatedDelivery: 'Visit Showroom',
          specialOffers: ['Test Drive Available'],
          rating: 4.4,
          reviews: 400
        }
      ];
      
      const bestPrice = platforms.reduce((min, p) => p.price < min.price ? p : min);
      
      return {
        id: vehicle.id,
        name: vehicle.name,
        image: vehicle.image || '/placeholder.svg',
        platforms,
        recommendation: {
          bestPrice,
          fastestDelivery: platforms[0],
          bestRated: platforms[0]
        }
      };
    });
  };

  const convertElectronicsToResults = (electronics: any[]): ComparisonResult[] => {
    return electronics.slice(0, 6).map(item => {
      const platforms = [
        {
          platform: { name: 'Amazon', url: 'https://amazon.in', color: '#ff9900', features: ['Fast Delivery', 'Returns'] },
          price: item.price,
          availability: true,
          estimatedDelivery: '1-2 days',
          specialOffers: ['Prime Delivery'],
          rating: item.rating || 4.3,
          reviews: 1000
        },
        {
          platform: { name: 'Flipkart', url: 'https://flipkart.com', color: '#2874f0', features: ['Exchange Offers', 'EMI'] },
          price: item.price * 0.98,
          availability: true,
          estimatedDelivery: '2-3 days',
          specialOffers: ['Bank Offers'],
          rating: 4.2,
          reviews: 800
        }
      ];
      
      const bestPrice = platforms.reduce((min, p) => p.price < min.price ? p : min);
      
      return {
        id: item.id,
        name: item.name,
        image: item.image || '/placeholder.svg',
        platforms,
        recommendation: {
          bestPrice,
          fastestDelivery: platforms[0],
          bestRated: platforms[0]
        }
      };
    });
  };

  const convertAppliancesToResults = (appliances: any[]): ComparisonResult[] => {
    return appliances.slice(0, 6).map(appliance => {
      const platforms = [
        {
          platform: { name: 'Amazon', url: 'https://amazon.in', color: '#ff9900', features: ['Installation', 'Warranty'] },
          price: appliance.price,
          availability: true,
          estimatedDelivery: '3-5 days',
          specialOffers: ['Free Installation'],
          rating: appliance.rating || 4.4,
          reviews: 600
        },
        {
          platform: { name: 'Reliance Digital', url: 'https://reliancedigital.in', color: '#0066cc', features: ['Demo Available', 'Extended Warranty'] },
          price: appliance.price * 1.03,
          availability: true,
          estimatedDelivery: '4-6 days',
          specialOffers: ['Exchange Offer'],
          rating: 4.3,
          reviews: 400
        }
      ];
      
      const bestPrice = platforms.reduce((min, p) => p.price < min.price ? p : min);
      
      return {
        id: appliance.id,
        name: appliance.name,
        image: appliance.image || '/placeholder.svg',
        platforms,
        recommendation: {
          bestPrice,
          fastestDelivery: platforms[0],
          bestRated: platforms[0]
        }
      };
    });
  };

  const handleStatisticsSearch = async (topic: string, countries: string): Promise<ComparisonResult[]> => {
    // Parse countries from the combined search data
    const [country1, country2] = countries.split(',').map(c => c.trim()).filter(Boolean);
    
    try {
      const statsData = await searchStatistics(topic, country1, country2);
      
      // Convert statistics data to ComparisonResult format
      if (statsData.data.length === 0) return [];

      const platforms = [
        {
          platform: {
            name: 'World Bank Data',
            url: 'https://data.worldbank.org',
            color: '#009fda',
            features: ['Official Data', 'Historical Trends']
          },
          price: 0,
          availability: true,
          estimatedDelivery: 'Real-time',
          specialOffers: ['Free Access'],
          rating: 4.9,
          reviews: 10000
        }
      ];

      return [{
        id: `stats-${topic}-${country1}`,
        name: `${topic} Statistics: ${country1}${country2 ? ` vs ${country2}` : ''}`,
        image: '/placeholder.svg',
        platforms,
        recommendation: {
          bestPrice: platforms[0],
          fastestDelivery: platforms[0],
          bestRated: platforms[0]
        }
      }];
    } catch (error) {
      console.error('Statistics search error:', error);
      return [];
    }
  };

  const handleReligionStats = async (religion1: string, country: string): Promise<ComparisonResult[]> => {
    const [rel1, rel2] = religion1.split(',').map(r => r.trim()).filter(Boolean);
    const data = generateReligionComparison(rel1, rel2, country);
    
    const platforms = [{
      platform: {
        name: 'Religious Demographics Data',
        url: 'https://pewresearch.org',
        color: '#ff6b35',
        features: ['Global Data', 'Trend Analysis']
      },
      price: 0,
      availability: true,
      estimatedDelivery: 'Instant',
      specialOffers: ['Free Research Data'],
      rating: 4.7,
      reviews: 5000
    }];

    return [{
      id: `religion-${rel1}`,
      name: `Religion Comparison: ${rel1}${rel2 ? ` vs ${rel2}` : ''}`,
      image: '/placeholder.svg',
      platforms,
      recommendation: {
        bestPrice: platforms[0],
        fastestDelivery: platforms[0],
        bestRated: platforms[0]
      }
    }];
  };

  const handleFinancialStats = async (entity1: string, metric: string): Promise<ComparisonResult[]> => {
    const [ent1, ent2] = entity1.split(',').map(e => e.trim()).filter(Boolean);
    const data = generateFinancialComparison(ent1, ent2, metric);
    
    const platforms = [{
      platform: {
        name: 'Financial Power Analysis',
        url: 'https://forbes.com',
        color: '#0066cc',
        features: ['Wealth Data', 'Market Analysis']
      },
      price: 0,
      availability: true,
      estimatedDelivery: 'Real-time',
      specialOffers: ['Updated Daily'],
      rating: 4.8,
      reviews: 8000
    }];

    return [{
      id: `financial-${ent1}`,
      name: `Financial Comparison: ${ent1}${ent2 ? ` vs ${ent2}` : ''}`,
      image: '/placeholder.svg',
      platforms,
      recommendation: {
        bestPrice: platforms[0],
        fastestDelivery: platforms[0],
        bestRated: platforms[0]
      }
    }];
  };

  const handlePoliticalStats = async (party1: string, country: string): Promise<ComparisonResult[]> => {
    const [p1, p2] = party1.split(',').map(p => p.trim()).filter(Boolean);
    const data = generatePoliticalComparison(p1, country, p2);
    
    const platforms = [{
      platform: {
        name: 'Political Analysis Data',
        url: 'https://politicaldata.org',
        color: '#cc0000',
        features: ['Party History', 'Policy Comparison']
      },
      price: 0,
      availability: true,
      estimatedDelivery: 'Instant',
      specialOffers: ['Comprehensive Analysis'],
      rating: 4.6,
      reviews: 3000
    }];

    return [{
      id: `political-${p1}`,
      name: `Political Party: ${p1}${p2 ? ` vs ${p2}` : ''} (${country})`,
      image: '/placeholder.svg',
      platforms,
      recommendation: {
        bestPrice: platforms[0],
        fastestDelivery: platforms[0],
        bestRated: platforms[0]
      }
    }];
  };

  const handlePersonStats = async (person1: string, aspect: string): Promise<ComparisonResult[]> => {
    const [p1, p2] = person1.split(',').map(p => p.trim()).filter(Boolean);
    const data = generatePersonComparison(p1, aspect, p2);
    
    const platforms = [{
      platform: {
        name: 'Person Comparison Data',
        url: 'https://forbes.com',
        color: '#0066cc',
        features: ['Wealth Rankings', 'Achievement Data']
      },
      price: 0,
      availability: true,
      estimatedDelivery: 'Instant',
      specialOffers: ['Detailed Profiles'],
      rating: 4.7,
      reviews: 6000
    }];

    return [{
      id: `person-${p1}`,
      name: `Person Comparison: ${p1}${p2 ? ` vs ${p2}` : ''}`,
      image: '/placeholder.svg',
      platforms,
      recommendation: {
        bestPrice: platforms[0],
        fastestDelivery: platforms[0],
        bestRated: platforms[0]
      }
    }];
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