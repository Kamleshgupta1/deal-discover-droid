import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Search, 
  User, 
  Bell, 
  Settings,
  LogOut,
  Shield,
  LayoutDashboard,
  Languages
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { APP_CONFIG } from '@/constants';
import { Settings as SettingsComponent } from '@/components/layout/Settings';
import appIcon from '@/assets/app-icon.png';
import { useToast } from '@/hooks/use-toast';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Deals', path: '/deals' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={appIcon} alt={APP_CONFIG.name} className="w-8 h-8 rounded-lg" />
            <span className="font-bold text-xl bg-gradient-hero bg-clip-text text-transparent">
              {APP_CONFIG.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActivePath(item.path)
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products, deals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-none focus:bg-background"
              />
            </div>
          </form>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <Select 
              value={currentLanguage} 
              onValueChange={(value) => {
                changeLanguage(value);
                toast({
                  title: 'Language Changed',
                  description: `Language set to ${languages.find(l => l.code === value)?.name}`,
                });
              }}
            >
              <SelectTrigger className="w-[140px] h-9">
                <Languages className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-primary text-primary-foreground">
                3
              </Badge>
            </Button>

            {/* Settings */}
            <SettingsComponent>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <Settings className="h-4 w-4" />
              </Button>
            </SettingsComponent>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>
                  {user ? user.email : 'My Account'}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user ? (
                  <>
                    {isAdmin && (
                      <DropdownMenuItem onClick={() => handleNavigation('/admin/dashboard')}>
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Admin Dashboard
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={() => handleNavigation('/login')}>
                      <User className="h-4 w-4 mr-2" />
                      Sign In
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigation('/register')}>
                      <Shield className="h-4 w-4 mr-2" />
                      Sign Up
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden h-9 w-9 p-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-4 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="px-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search products, deals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </form>

              {/* Mobile Navigation */}
              <nav className="space-y-2 px-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActivePath(item.path)
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="px-2 pt-4 border-t border-border space-y-4">
                {/* Mobile Language Switcher */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground px-2">Language</Label>
                  <Select 
                    value={currentLanguage} 
                    onValueChange={(value) => {
                      changeLanguage(value);
                      toast({
                        title: 'Language Changed',
                        description: `Language set to ${languages.find(l => l.code === value)?.name}`,
                      });
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <Languages className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {user ? (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground px-2">{user.email}</p>
                    {isAdmin && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleNavigation('/admin/dashboard')}
                      >
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Admin Dashboard
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" onClick={() => handleNavigation('/login')}>
                      Sign In
                    </Button>
                    <Button size="sm" onClick={() => handleNavigation('/register')}>
                      Sign Up
                    </Button>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  {/* Mobile Notifications */}
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-4 w-4 mr-2" />
                    <Badge className="absolute -top-1 left-2 h-4 w-4 p-0 text-xs bg-primary text-primary-foreground">
                      3
                    </Badge>
                    Notifications
                  </Button>
                  
                  {/* Mobile Settings */}
                  <SettingsComponent>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </SettingsComponent>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};