import { Sparkles } from 'lucide-react';
import appIcon from '@/assets/app-icon.png';
import { APP_CONFIG } from '@/constants';
import { GlobalSearch } from '@/components/GlobalSearch';
import { Category } from '@/types';

interface HomeHeroProps {
  onGlobalSearch: (query: string, location: string, category?: Category) => void;
}

export const HomeHero = ({ onGlobalSearch }: HomeHeroProps) => {
  return (
    <div className="text-center space-y-6 animate-slide-up">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="relative">
          <img src={appIcon} alt={APP_CONFIG.name} className="w-16 h-16 rounded-2xl shadow-elegant" />
          <div className="absolute -top-2 -right-2 bg-gradient-primary text-white rounded-full p-1 shadow-soft">
            <Sparkles className="h-4 w-4" />
          </div>
        </div>
        <div className="text-left">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent animate-fade-in">
            First Look
          </h1>
          <p className="text-muted-foreground text-lg">Get your first look at the best deals</p>
        </div>
      </div>

      {/* Global Search Bar */}
      <GlobalSearch 
        onSearch={onGlobalSearch} 
        placeholder="Search anything - movies, books, news, recipes..." 
      />

      {/* Stats Row */}
      <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground mt-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span>Real-time data</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span>25+ categories</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <span>500+ platforms</span>
        </div>
      </div>
    </div>
  );
};