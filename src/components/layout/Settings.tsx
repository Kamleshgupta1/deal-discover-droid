import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { 
  Settings as SettingsIcon,
  Palette,
  Bell,
  User,
  Lock,
  Moon,
  Sun,
  Mail,
  Smartphone,
  Info,
  ChevronDown,
  Eye,
  Star,
  DollarSign,
  LayoutGrid,
  ArrowUpDown,
  Languages,
  Grid3x3,
  List,
  ZoomIn,
  Minus,
  Plus
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useFontSize } from '@/hooks/useFontSize';
import { useViewPreferences } from '@/hooks/useViewPreferences';
import { useSortPreferences } from '@/hooks/useSortPreferences';
import { useAppPreferences } from '@/hooks/useAppPreferences';
import { useLanguage } from '@/hooks/useLanguage';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useNavigate } from 'react-router-dom';

interface SettingsProps {
  children: React.ReactNode;
}

export const Settings = ({ children }: SettingsProps) => {
  const { currentTheme, setTheme, themes } = useTheme();
  const { currentSize, increaseSize, decreaseSize, fontSizes } = useFontSize();
  const { currentView, setViewMode, viewModes } = useViewPreferences();
  const { currentSort, setSortOption, sortOptions } = useSortPreferences();
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const { 
    compactMode,
    toggleCompactMode,
    showPrices,
    toggleShowPrices,
    showRatings,
    toggleShowRatings
  } = useAppPreferences();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    deals: true,
    updates: false
  });

  const [openSections, setOpenSections] = useState({
    appearance: true,
    language: false,
    display: false,
    notifications: false,
    sorting: false,
    account: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Updated",
      description: `${key} ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const getThemeIcon = (theme: string) => {
    return theme === 'dark' ? Moon : Sun;
  };

  const getViewIcon = (view: string) => {
    switch (view) {
      case 'grid': return Grid3x3;
      case 'list': return List;
      case 'compact': return LayoutGrid;
      default: return Grid3x3;
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Settings
          </SheetTitle>
          <SheetDescription>
            Customize your experience
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-2 py-4">
          {/* Appearance */}
          <Collapsible open={openSections.appearance} onOpenChange={() => toggleSection('appearance')}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-muted/50 px-4 py-3 hover:bg-muted transition-colors">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span className="font-medium">Appearance</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections.appearance ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 py-3 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {themes.map((theme) => {
                  const IconComponent = getThemeIcon(theme.key);
                  return (
                    <Button
                      key={theme.key}
                      variant={currentTheme === theme.key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme(theme.key)}
                      className="justify-start gap-2"
                    >
                      <IconComponent className="h-4 w-4" />
                      {theme.name}
                    </Button>
                  );
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Language */}
          <Collapsible open={openSections.language} onOpenChange={() => toggleSection('language')}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-muted/50 px-4 py-3 hover:bg-muted transition-colors">
              <div className="flex items-center gap-2">
                <Languages className="h-4 w-4" />
                <span className="font-medium">Language</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections.language ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 py-3">
              <Select 
                value={currentLanguage} 
                onValueChange={(value) => {
                  changeLanguage(value);
                  toast({
                    title: "Language Updated",
                    description: `Set to ${languages.find(l => l.code === value)?.name}`,
                  });
                }}
              >
                <SelectTrigger>
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
            </CollapsibleContent>
          </Collapsible>

          {/* Display Options */}
          <Collapsible open={openSections.display} onOpenChange={() => toggleSection('display')}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-muted/50 px-4 py-3 hover:bg-muted transition-colors">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="font-medium">Display</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections.display ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 py-3 space-y-4">
              {/* View Mode */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">View Mode</Label>
                <div className="grid grid-cols-3 gap-2">
                  {viewModes.map((view) => {
                    const IconComponent = getViewIcon(view.key);
                    return (
                      <Button
                        key={view.key}
                        variant={currentView === view.key ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode(view.key)}
                        className="flex-col h-auto py-2 gap-1"
                      >
                        <IconComponent className="h-4 w-4" />
                        <span className="text-xs">{view.name.split(' ')[0]}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Font Size */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Font Size</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {fontSizes.find(s => s.key === currentSize)?.label}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decreaseSize}
                      disabled={currentSize === 'small'}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={increaseSize}
                      disabled={currentSize === 'extra-large'}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Toggle Options */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="compact-mode">Compact mode</Label>
                  </div>
                  <Switch
                    id="compact-mode"
                    checked={compactMode}
                    onCheckedChange={toggleCompactMode}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="show-prices">Show prices</Label>
                  </div>
                  <Switch
                    id="show-prices"
                    checked={showPrices}
                    onCheckedChange={toggleShowPrices}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="show-ratings">Show ratings</Label>
                  </div>
                  <Switch
                    id="show-ratings"
                    checked={showRatings}
                    onCheckedChange={toggleShowRatings}
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Notifications */}
          <Collapsible open={openSections.notifications} onOpenChange={() => toggleSection('notifications')}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-muted/50 px-4 py-3 hover:bg-muted transition-colors">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="font-medium">Notifications</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections.notifications ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 py-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="email-notifications">Email</Label>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notifications.email}
                  onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="push-notifications">Push</Label>
                </div>
                <Switch
                  id="push-notifications"
                  checked={notifications.push}
                  onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="h-4 w-4 p-0 text-xs">%</Badge>
                  <Label htmlFor="deals-notifications">Deal alerts</Label>
                </div>
                <Switch
                  id="deals-notifications"
                  checked={notifications.deals}
                  onCheckedChange={(checked) => handleNotificationChange('deals', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="updates-notifications">App updates</Label>
                </div>
                <Switch
                  id="updates-notifications"
                  checked={notifications.updates}
                  onCheckedChange={(checked) => handleNotificationChange('updates', checked)}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Sorting */}
          <Collapsible open={openSections.sorting} onOpenChange={() => toggleSection('sorting')}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-muted/50 px-4 py-3 hover:bg-muted transition-colors">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                <span className="font-medium">Sort Order</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections.sorting ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 py-3">
              <Select 
                value={currentSort} 
                onValueChange={(value) => {
                  setSortOption(value as any);
                  toast({
                    title: "Sort Updated",
                    description: sortOptions.find(s => s.key === value)?.name,
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.key} value={option.key}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CollapsibleContent>
          </Collapsible>

          {/* Account */}
          <Collapsible open={openSections.account} onOpenChange={() => toggleSection('account')}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-muted/50 px-4 py-3 hover:bg-muted transition-colors">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium">Account</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections.account ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 py-3 space-y-2">
              <SheetClose asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => navigate('/user-profile')}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => navigate('/privacy-policy')}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Privacy
                </Button>
              </SheetClose>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <SheetFooter className="pt-4">
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
