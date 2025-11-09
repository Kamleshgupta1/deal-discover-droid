import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

// Auto-detect browser language
const detectBrowserLanguage = (): string => {
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  // Extract language code (e.g., 'en-US' -> 'en')
  const langCode = browserLang.split('-')[0];
  
  // Check if detected language is supported
  const supportedLanguages = ['en', 'es', 'fr', 'de', 'hi', 'ta', 'kn', 'ml', 'ur', 'te', 'mr', 'bn', 'zh', 'ja', 'ar', 'pt', 'ru', 'it'];
  return supportedLanguages.includes(langCode) ? langCode : 'en';
};

export const useLanguage = () => {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const saved = localStorage.getItem('app-language');
    return saved || detectBrowserLanguage();
  });

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
    const saved = localStorage.getItem('app-language');
    const langToUse = saved || detectBrowserLanguage();
    
    if (langToUse && langToUse !== i18n.language) {
      i18n.changeLanguage(langToUse);
      setCurrentLanguage(langToUse);
      if (!saved) {
        // Auto-detected language - save it
        localStorage.setItem('app-language', langToUse);
      }
    }
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = ['ar', 'ur'].includes(i18n.language) ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return {
    currentLanguage,
    changeLanguage,
    languages,
    t
  };
};
