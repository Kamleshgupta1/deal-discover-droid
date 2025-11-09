import { useState, useEffect } from 'react';
import { useLanguage } from './useLanguage';
import { translateText } from '@/utils/translateUtils';

interface TranslationCache {
  [key: string]: {
    [targetLang: string]: string;
  };
}

// In-memory cache for translations
const translationCache: TranslationCache = {};

// Load cache from localStorage on initialization
const loadCacheFromStorage = (): TranslationCache => {
  try {
    const cached = localStorage.getItem('translation-cache');
    return cached ? JSON.parse(cached) : {};
  } catch (error) {
    console.error('Failed to load translation cache:', error);
    return {};
  }
};

// Save cache to localStorage
const saveCacheToStorage = (cache: TranslationCache) => {
  try {
    localStorage.setItem('translation-cache', JSON.stringify(cache));
  } catch (error) {
    console.error('Failed to save translation cache:', error);
  }
};

// Initialize cache from storage
Object.assign(translationCache, loadCacheFromStorage());

export const useTranslation = () => {
  const { currentLanguage } = useLanguage();
  const [isTranslating, setIsTranslating] = useState(false);

  // Save cache periodically
  useEffect(() => {
    const interval = setInterval(() => {
      saveCacheToStorage(translationCache);
    }, 30000); // Save every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const translate = async (
    text: string,
    targetLanguage?: string,
    sourceLanguage: string = 'en'
  ): Promise<string> => {
    const targetLang = targetLanguage || currentLanguage;
    
    // Return original if same language
    if (targetLang === sourceLanguage || targetLang === 'en') {
      return text;
    }

    // Check cache first
    const cacheKey = `${text}_${sourceLanguage}`;
    if (translationCache[cacheKey]?.[targetLang]) {
      return translationCache[cacheKey][targetLang];
    }

    // Translate
    setIsTranslating(true);
    try {
      const translated = await translateText(text, targetLang, sourceLanguage);
      
      // Cache the result
      if (!translationCache[cacheKey]) {
        translationCache[cacheKey] = {};
      }
      translationCache[cacheKey][targetLang] = translated;
      saveCacheToStorage(translationCache);
      
      return translated;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    } finally {
      setIsTranslating(false);
    }
  };

  const translateMultiple = async (
    texts: string[],
    targetLanguage?: string,
    sourceLanguage: string = 'en'
  ): Promise<string[]> => {
    const targetLang = targetLanguage || currentLanguage;
    
    if (targetLang === sourceLanguage || targetLang === 'en') {
      return texts;
    }

    setIsTranslating(true);
    try {
      const translations = await Promise.all(
        texts.map(text => translate(text, targetLang, sourceLanguage))
      );
      return translations;
    } finally {
      setIsTranslating(false);
    }
  };

  const clearCache = () => {
    Object.keys(translationCache).forEach(key => delete translationCache[key]);
    localStorage.removeItem('translation-cache');
  };

  const getCacheSize = () => {
    return Object.keys(translationCache).length;
  };

  return {
    translate,
    translateMultiple,
    isTranslating,
    currentLanguage,
    clearCache,
    getCacheSize,
  };
};
