// Google Books API - Free
const GOOGLE_BOOKS_BASE_URL = 'https://www.googleapis.com/books/v1';

export interface Book {
  id: string;
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  language: string;
  imageLinks?: {
    thumbnail: string;
    smallThumbnail: string;
  };
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

export interface BookSaleInfo {
  country: string;
  isEbook: boolean;
  listPrice?: {
    amount: number;
    currencyCode: string;
  };
  retailPrice?: {
    amount: number;
    currencyCode: string;
  };
  buyLink?: string;
}

export interface BookDetails extends Book {
  saleInfo: BookSaleInfo;
  accessInfo: {
    epub: { isAvailable: boolean };
    pdf: { isAvailable: boolean };
    webReaderLink: string;
  };
}

class BooksApiService {
  async searchBooks(query: string): Promise<BookDetails[]> {
    try {
      const response = await fetch(
        `${GOOGLE_BOOKS_BASE_URL}/volumes?q=${encodeURIComponent(query)}&maxResults=20&printType=books`
      );
      const data = await response.json();
      
      return (data.items || []).map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        publisher: item.volumeInfo.publisher,
        publishedDate: item.volumeInfo.publishedDate,
        description: item.volumeInfo.description,
        pageCount: item.volumeInfo.pageCount,
        categories: item.volumeInfo.categories,
        averageRating: item.volumeInfo.averageRating,
        ratingsCount: item.volumeInfo.ratingsCount,
        language: item.volumeInfo.language,
        imageLinks: item.volumeInfo.imageLinks,
        previewLink: item.volumeInfo.previewLink,
        infoLink: item.volumeInfo.infoLink,
        canonicalVolumeLink: item.volumeInfo.canonicalVolumeLink,
        saleInfo: item.saleInfo,
        accessInfo: item.accessInfo
      }));
    } catch (error) {
      console.error('Error searching books:', error);
      return [];
    }
  }

  async getBookDetails(bookId: string): Promise<BookDetails | null> {
    try {
      const response = await fetch(`${GOOGLE_BOOKS_BASE_URL}/volumes/${bookId}`);
      const item = await response.json();
      
      return {
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        publisher: item.volumeInfo.publisher,
        publishedDate: item.volumeInfo.publishedDate,
        description: item.volumeInfo.description,
        pageCount: item.volumeInfo.pageCount,
        categories: item.volumeInfo.categories,
        averageRating: item.volumeInfo.averageRating,
        ratingsCount: item.volumeInfo.ratingsCount,
        language: item.volumeInfo.language,
        imageLinks: item.volumeInfo.imageLinks,
        previewLink: item.volumeInfo.previewLink,
        infoLink: item.volumeInfo.infoLink,
        canonicalVolumeLink: item.volumeInfo.canonicalVolumeLink,
        saleInfo: item.saleInfo,
        accessInfo: item.accessInfo
      };
    } catch (error) {
      console.error('Error getting book details:', error);
      return null;
    }
  }

  async getPopularBooks(): Promise<BookDetails[]> {
    return this.searchBooks('bestseller 2024');
  }

  formatPrice(saleInfo: BookSaleInfo): string | null {
    if (saleInfo.listPrice) {
      return `${saleInfo.listPrice.currencyCode} ${saleInfo.listPrice.amount}`;
    }
    return null;
  }
}

export const booksApi = new BooksApiService();