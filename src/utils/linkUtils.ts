import { DEEP_LINK_TIMEOUT } from '@/constants';

export const handlePlatformLink = (url: string, isApp?: boolean): void => {
  if (isApp) {
    // Try to open app first, fallback to web
    window.location.href = url;
    setTimeout(() => {
      window.open(url.replace(/^.*:\/\//, 'https://'), '_blank');
    }, DEEP_LINK_TIMEOUT);
  } else {
    window.open(url, '_blank');
  }
};

export const formatCurrency = (amount: number, currency: string = '₹'): string => {
  return `${currency}${amount}`;
};