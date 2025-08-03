const WEATHER_API_KEY = 'a8a9a2b4b65c4d58b8a192431241201'; // Free tier key
const BASE_URL = 'https://api.weatherapi.com/v1';

export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    feelslike_c: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      };
    }>;
  };
}

export const weatherApi = {
  getCurrentWeather: async (location: string): Promise<WeatherData | null> => {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(location)}&days=3&aqi=no&alerts=no`
      );
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      
      const data: WeatherData = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather:', error);
      return null;
    }
  },

  searchLocations: async (query: string): Promise<Array<{name: string; region: string; country: string}>> => {
    try {
      const response = await fetch(
        `${BASE_URL}/search.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Error searching locations:', error);
      return [];
    }
  }
};