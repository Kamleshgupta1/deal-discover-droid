import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export const useLanguage = () => {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(
    () => localStorage.getItem('app-language') || 'en'
  );

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
    if (saved && saved !== i18n.language) {
      i18n.changeLanguage(saved);
      setCurrentLanguage(saved);
    }
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return {
    currentLanguage,
    changeLanguage,
    languages,
    t
  };
};
