import { useState, useEffect } from 'react';

export type TextStyleMode = 
  | 'default'
  | 'elegant'
  | 'modern'
  | 'playful'
  | 'professional';

const textStyles = {
  default: {
    name: 'Default',
    fontFamily: 'Inter, system-ui, sans-serif',
    headingWeight: '700',
    bodyWeight: '400',
    letterSpacing: 'normal',
  },
  elegant: {
    name: 'Elegant',
    fontFamily: 'Georgia, serif',
    headingWeight: '600',
    bodyWeight: '400',
    letterSpacing: '0.02em',
  },
  modern: {
    name: 'Modern',
    fontFamily: 'Poppins, sans-serif',
    headingWeight: '700',
    bodyWeight: '400',
    letterSpacing: '-0.01em',
  },
  playful: {
    name: 'Playful',
    fontFamily: 'Quicksand, sans-serif',
    headingWeight: '700',
    bodyWeight: '500',
    letterSpacing: '0.01em',
  },
  professional: {
    name: 'Professional',
    fontFamily: 'Roboto, sans-serif',
    headingWeight: '600',
    bodyWeight: '400',
    letterSpacing: 'normal',
  },
};

export const useTextStyle = () => {
  const [currentStyle, setCurrentStyle] = useState<TextStyleMode>('default');

  useEffect(() => {
    const savedStyle = localStorage.getItem('textStyle') as TextStyleMode;
    if (savedStyle && textStyles[savedStyle]) {
      setCurrentStyle(savedStyle);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const style = textStyles[currentStyle];
    
    root.style.setProperty('--font-family', style.fontFamily);
    root.style.setProperty('--heading-weight', style.headingWeight);
    root.style.setProperty('--body-weight', style.bodyWeight);
    root.style.setProperty('--letter-spacing', style.letterSpacing);

    // Update body font
    document.body.style.fontFamily = style.fontFamily;

    localStorage.setItem('textStyle', currentStyle);
  }, [currentStyle]);

  return {
    currentStyle,
    setTextStyle: setCurrentStyle,
    textStyles: Object.entries(textStyles).map(([key, value]) => ({
      key: key as TextStyleMode,
      name: value.name,
    })),
  };
};
