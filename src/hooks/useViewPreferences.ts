import { useState, useEffect } from 'react';

export type ViewMode = 'grid' | 'list' | 'compact';

const viewModes = [
  { key: 'grid' as ViewMode, name: 'Grid View', description: 'Cards in a grid layout' },
  { key: 'list' as ViewMode, name: 'List View', description: 'Detailed list layout' },
  { key: 'compact' as ViewMode, name: 'Compact View', description: 'Dense information display' },
];

export const useViewPreferences = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('grid');

  useEffect(() => {
    const savedView = localStorage.getItem('viewMode') as ViewMode;
    if (savedView && viewModes.some(v => v.key === savedView)) {
      setCurrentView(savedView);
    }
  }, []);

  const setViewMode = (mode: ViewMode) => {
    setCurrentView(mode);
    localStorage.setItem('viewMode', mode);
  };

  return {
    currentView,
    setViewMode,
    viewModes,
  };
};
