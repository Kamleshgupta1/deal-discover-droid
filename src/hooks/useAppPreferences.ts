import { useState, useEffect } from 'react';

export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP';
export type DataRefresh = 'auto' | 'manual' | '5min' | '15min' | '30min';

const currencies = [
  { key: 'INR' as Currency, name: 'Indian Rupee (₹)', symbol: '₹' },
  { key: 'USD' as Currency, name: 'US Dollar ($)', symbol: '$' },
  { key: 'EUR' as Currency, name: 'Euro (€)', symbol: '€' },
  { key: 'GBP' as Currency, name: 'British Pound (£)', symbol: '£' },
];

const refreshOptions = [
  { key: 'auto' as DataRefresh, name: 'Auto Refresh', description: 'Update automatically' },
  { key: 'manual' as DataRefresh, name: 'Manual Only', description: 'Update on request' },
  { key: '5min' as DataRefresh, name: 'Every 5 Minutes', description: 'Refresh every 5 min' },
  { key: '15min' as DataRefresh, name: 'Every 15 Minutes', description: 'Refresh every 15 min' },
  { key: '30min' as DataRefresh, name: 'Every 30 Minutes', description: 'Refresh every 30 min' },
];

export const useAppPreferences = () => {
  const [currency, setCurrency] = useState<Currency>('INR');
  const [dataRefresh, setDataRefresh] = useState<DataRefresh>('auto');
  const [compactMode, setCompactMode] = useState(false);
  const [showPrices, setShowPrices] = useState(true);
  const [showRatings, setShowRatings] = useState(true);

  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency') as Currency;
    const savedRefresh = localStorage.getItem('dataRefresh') as DataRefresh;
    const savedCompact = localStorage.getItem('compactMode') === 'true';
    const savedShowPrices = localStorage.getItem('showPrices') !== 'false';
    const savedShowRatings = localStorage.getItem('showRatings') !== 'false';

    if (savedCurrency && currencies.some(c => c.key === savedCurrency)) {
      setCurrency(savedCurrency);
    }
    if (savedRefresh && refreshOptions.some(r => r.key === savedRefresh)) {
      setDataRefresh(savedRefresh);
    }
    setCompactMode(savedCompact);
    setShowPrices(savedShowPrices);
    setShowRatings(savedShowRatings);
  }, []);

  const updateCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    localStorage.setItem('currency', newCurrency);
  };

  const updateDataRefresh = (newRefresh: DataRefresh) => {
    setDataRefresh(newRefresh);
    localStorage.setItem('dataRefresh', newRefresh);
  };

  const toggleCompactMode = (value: boolean) => {
    setCompactMode(value);
    localStorage.setItem('compactMode', value.toString());
  };

  const toggleShowPrices = (value: boolean) => {
    setShowPrices(value);
    localStorage.setItem('showPrices', value.toString());
  };

  const toggleShowRatings = (value: boolean) => {
    setShowRatings(value);
    localStorage.setItem('showRatings', value.toString());
  };

  return {
    currency,
    updateCurrency,
    currencies,
    dataRefresh,
    updateDataRefresh,
    refreshOptions,
    compactMode,
    toggleCompactMode,
    showPrices,
    toggleShowPrices,
    showRatings,
    toggleShowRatings,
  };
};
