import { useState, useEffect } from 'react';

export type FontSizeLevel = 'small' | 'medium' | 'large' | 'extra-large';

const fontSizes = {
  small: {
    base: '14px',
    heading: '1.5rem',
    label: 'Small',
  },
  medium: {
    base: '16px',
    heading: '1.75rem',
    label: 'Medium',
  },
  large: {
    base: '18px',
    heading: '2rem',
    label: 'Large',
  },
  'extra-large': {
    base: '20px',
    heading: '2.25rem',
    label: 'Extra Large',
  },
};

export const useFontSize = () => {
  const [currentSize, setCurrentSize] = useState<FontSizeLevel>('medium');

  useEffect(() => {
    const savedSize = localStorage.getItem('fontSize') as FontSizeLevel;
    if (savedSize && fontSizes[savedSize]) {
      setCurrentSize(savedSize);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const size = fontSizes[currentSize];
    
    root.style.setProperty('--font-size-base', size.base);
    root.style.setProperty('--font-size-heading', size.heading);
    
    // Update body font size
    document.body.style.fontSize = size.base;

    localStorage.setItem('fontSize', currentSize);
  }, [currentSize]);

  const increaseSize = () => {
    const levels: FontSizeLevel[] = ['small', 'medium', 'large', 'extra-large'];
    const currentIndex = levels.indexOf(currentSize);
    if (currentIndex < levels.length - 1) {
      setCurrentSize(levels[currentIndex + 1]);
    }
  };

  const decreaseSize = () => {
    const levels: FontSizeLevel[] = ['small', 'medium', 'large', 'extra-large'];
    const currentIndex = levels.indexOf(currentSize);
    if (currentIndex > 0) {
      setCurrentSize(levels[currentIndex - 1]);
    }
  };

  return {
    currentSize,
    setFontSize: setCurrentSize,
    increaseSize,
    decreaseSize,
    fontSizes: Object.entries(fontSizes).map(([key, value]) => ({
      key: key as FontSizeLevel,
      label: value.label,
    })),
  };
};
