import { useState, useEffect } from 'react';

export type ThemeMode = 
  | 'light' 
  | 'dark' 
  | 'ocean' 
  | 'earth' 
  | 'mystic' 
  | 'sunset' 
  | 'forest';

const themes = {
  light: {
    name: 'Light',
    primary: '260 84% 57%',
    secondary: '25 95% 60%',
    accent: '210 100% 60%',
    background: '0 0% 100%',
    foreground: '230 20% 10%',
  },
  dark: {
    name: 'Dark',
    primary: '270 100% 70%',
    secondary: '25 95% 65%',
    accent: '220 100% 70%',
    background: '230 15% 7%',
    foreground: '0 0% 95%',
  },
  ocean: {
    name: 'Ocean Breeze',
    primary: '200 100% 60%',
    secondary: '180 80% 50%',
    accent: '220 100% 70%',
    background: '200 30% 96%',
    foreground: '200 50% 15%',
  },
  earth: {
    name: 'Earth Tone',
    primary: '25 60% 45%',
    secondary: '40 50% 55%',
    accent: '15 70% 50%',
    background: '30 20% 95%',
    foreground: '25 30% 20%',
  },
  mystic: {
    name: 'Mystic Purple',
    primary: '280 90% 65%',
    secondary: '320 80% 60%',
    accent: '260 100% 70%',
    background: '280 20% 96%',
    foreground: '280 40% 15%',
  },
  sunset: {
    name: 'Sunset Glow',
    primary: '15 90% 60%',
    secondary: '35 100% 55%',
    accent: '50 100% 65%',
    background: '25 30% 96%',
    foreground: '15 40% 20%',
  },
  forest: {
    name: 'Forest Green',
    primary: '140 60% 45%',
    secondary: '120 50% 40%',
    accent: '160 70% 50%',
    background: '140 20% 96%',
    foreground: '140 40% 15%',
  },
};

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const theme = themes[currentTheme];
    
    // Apply theme variables
    Object.entries(theme).forEach(([key, value]) => {
      if (key !== 'name') {
        root.style.setProperty(`--${key}`, value);
      }
    });

    // Apply dark class for dark themes
    if (currentTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  return {
    currentTheme,
    setTheme: setCurrentTheme,
    themes: Object.entries(themes).map(([key, value]) => ({
      key: key as ThemeMode,
      name: value.name,
    })),
  };
};