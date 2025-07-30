export const APP_CONFIG = {
  name: 'CompareAll',
  description: 'Compare prices, delivery times, and offers across all major platforms in one place',
  version: '1.0.0',
  maxSearchResults: 10,
  defaultAnimationDelay: 100,
} as const;

export const ANIMATION_DELAYS = {
  category: 100,
  result: 100,
  platform: 50,
} as const;

export const CURRENCY = {
  symbol: '₹',
  code: 'INR',
} as const;

export const DEEP_LINK_TIMEOUT = 500;