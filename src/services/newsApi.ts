const NEWS_API_KEY = '0c54ed8b6e42432d87e3e6b50f7b5d30'; // Free tier key
const BASE_URL = 'https://newsapi.org/v2';

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  author: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export const newsApi = {
  searchNews: async (query: string): Promise<NewsArticle[]> => {
    try {
      const response = await fetch(
        `${BASE_URL}/everything?q=${encodeURIComponent(query)}&sortBy=popularity&language=en&pageSize=20&apiKey=${NEWS_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`News API error: ${response.status}`);
      }
      
      const data: NewsResponse = await response.json();
      return data.articles || [];
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  },

  getTopHeadlines: async (category?: string): Promise<NewsArticle[]> => {
    try {
      const categoryParam = category ? `&category=${category}` : '';
      const response = await fetch(
        `${BASE_URL}/top-headlines?country=us${categoryParam}&pageSize=20&apiKey=${NEWS_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`News API error: ${response.status}`);
      }
      
      const data: NewsResponse = await response.json();
      return data.articles || [];
    } catch (error) {
      console.error('Error fetching headlines:', error);
      return [];
    }
  }
};