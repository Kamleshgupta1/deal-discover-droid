import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

// Auto-detect browser language based on navigator and optionally geolocation
const detectBrowserLanguage = async (): Promise<string> => {
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  const langCode = browserLang.split('-')[0];
  
  const supportedLanguages = ['en', 'es', 'fr', 'de', 'hi', 'ta', 'kn', 'ml', 'ur', 'te', 'mr', 'bn', 'zh', 'ja', 'ar', 'pt', 'ru', 'it'];
  
  // Try geolocation-based language detection
  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
    });
    
    // Map common regions to languages (simplified)
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    
    // India
    if (lat >= 8 && lat <= 35 && lng >= 68 && lng <= 97) {
      return 'hi'; // Default to Hindi for India, but could be refined
    }
    // China
    if (lat >= 18 && lat <= 54 && lng >= 73 && lng <= 135) {
      return 'zh';
    }
    // Japan
    if (lat >= 24 && lat <= 46 && lng >= 122 && lng <= 146) {
      return 'ja';
    }
    // Middle East (Arabic speaking regions)
    if (lat >= 12 && lat <= 42 && lng >= 34 && lng <= 63) {
      return 'ar';
    }
    // Spain
    if (lat >= 36 && lat <= 44 && lng >= -9 && lng <= 4) {
      return 'es';
    }
    // France
    if (lat >= 42 && lat <= 51 && lng >= -5 && lng <= 8) {
      return 'fr';
    }
    // Germany
    if (lat >= 47 && lat <= 55 && lng >= 5 && lng <= 15) {
      return 'de';
    }
    // Portugal/Brazil (Brazil is large, simplified)
    if ((lat >= 37 && lat <= 42 && lng >= -9 && lng <= -6) ||
        (lat >= -34 && lat <= 5 && lng >= -74 && lng <= -35)) {
      return 'pt';
    }
    // Russia
    if (lat >= 41 && lat <= 82 && lng >= 19 && lng <= 180) {
      return 'ru';
    }
    // Italy
    if (lat >= 36 && lat <= 47 && lng >= 6 && lng <= 19) {
      return 'it';
    }
  } catch (error) {
    console.log('Geolocation not available, using browser language');
  }
  
  return supportedLanguages.includes(langCode) ? langCode : 'en';
};

export const useLanguage = () => {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isDetecting, setIsDetecting] = useState(true);

  // Initialize language on mount
  useEffect(() => {
    const initLanguage = async () => {
      const saved = localStorage.getItem('app-language');
      if (saved) {
        setCurrentLanguage(saved);
        setIsDetecting(false);
      } else {
        // Auto-detect language
        const detected = await detectBrowserLanguage();
        setCurrentLanguage(detected);
        localStorage.setItem('app-language', detected);
        setIsDetecting(false);
      }
    };
    
    initLanguage();
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  ];

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem('app-language', languageCode);
    setCurrentLanguage(languageCode);
    document.documentElement.lang = languageCode;
  };

  useEffect(() => {
    if (!isDetecting && currentLanguage && currentLanguage !== i18n.language) {
      i18n.changeLanguage(currentLanguage);
    }
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = ['ar', 'ur'].includes(i18n.language) ? 'rtl' : 'ltr';
  }, [currentLanguage, i18n.language, isDetecting]);

  return {
    currentLanguage,
    changeLanguage,
    languages,
    t,
    isDetecting
  };
};
