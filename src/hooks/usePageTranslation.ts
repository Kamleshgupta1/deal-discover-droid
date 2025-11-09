import { useEffect } from 'react';
import { useLanguage } from './useLanguage';
import { useTranslation as useReactI18next } from 'react-i18next';

/**
 * Hook to automatically translate page content when language changes
 * Uses react-i18next for static content translation
 */
export const usePageTranslation = () => {
  const { currentLanguage } = useLanguage();
  const { i18n } = useReactI18next();

  useEffect(() => {
    // Sync i18n language with current language
    if (i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  return {
    currentLanguage,
    isReady: i18n.isInitialized,
  };
};
