// CoinGecko API - Free tier
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

export interface Cryptocurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
}

export interface CryptoDetails extends Cryptocurrency {
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
  };
  market_data: {
    current_price: { [key: string]: number };
    market_cap: { [key: string]: number };
    total_volume: { [key: string]: number };
  };
}

export interface CryptoExchange {
  id: string;
  name: string;
  year_established: number;
  country: string;
  description: string;
  url: string;
  image: string;
  trust_score: number;
  trade_volume_24h_btc: number;
}

class CryptoApiService {
  async searchCrypto(query: string): Promise<Cryptocurrency[]> {
    try {
      // First get list of all coins to search
      const searchResponse = await fetch(
        `${COINGECKO_BASE_URL}/search?query=${encodeURIComponent(query)}`
      );
      const searchData = await searchResponse.json();
      
      if (!searchData.coins || searchData.coins.length === 0) {
        return [];
      }

      // Get detailed market data for found coins
      const coinIds = searchData.coins.slice(0, 10).map((coin: any) => coin.id).join(',');
      const marketResponse = await fetch(
        `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
      );
      const marketData = await marketResponse.json();
      
      return marketData || [];
    } catch (error) {
      console.error('Error searching crypto:', error);
      return [];
    }
  }

  async getCryptoDetails(coinId: string): Promise<CryptoDetails | null> {
    try {
      const response = await fetch(
        `${COINGECKO_BASE_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      );
      return await response.json();
    } catch (error) {
      console.error('Error getting crypto details:', error);
      return null;
    }
  }

  async getTopCryptos(): Promise<Cryptocurrency[]> {
    try {
      const response = await fetch(
        `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`
      );
      return await response.json();
    } catch (error) {
      console.error('Error getting top cryptos:', error);
      return [];
    }
  }

  async getExchanges(): Promise<CryptoExchange[]> {
    try {
      const response = await fetch(
        `${COINGECKO_BASE_URL}/exchanges?per_page=10&page=1`
      );
      return await response.json();
    } catch (error) {
      console.error('Error getting exchanges:', error);
      return [];
    }
  }

  formatPrice(price: number): string {
    if (price < 0.01) {
      return `$${price.toFixed(6)}`;
    } else if (price < 1) {
      return `$${price.toFixed(4)}`;
    } else {
      return `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
    }
  }

  formatMarketCap(marketCap: number): string {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else {
      return `$${marketCap.toLocaleString()}`;
    }
  }
}

export const cryptoApi = new CryptoApiService();