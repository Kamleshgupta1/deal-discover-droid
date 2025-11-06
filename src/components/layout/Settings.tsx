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
  Shield,
  Globe,
  Moon,
  Sun,
  Monitor,
  Volume2,
  Smartphone,
  Mail,
  Lock,
  Database,
  HelpCircle,
  Info,
  Type,
  ZoomIn,
  ZoomOut,
  Minus,
  Plus,
  Grid3x3,
  List,
  LayoutGrid,
  ArrowUpDown,
  DollarSign,
  RefreshCw,
  Eye,
  Star,
  Languages
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useTextStyle } from '@/hooks/useTextStyle';
import { useFontSize } from '@/hooks/useFontSize';
import { useViewPreferences } from '@/hooks/useViewPreferences';
import { useSortPreferences } from '@/hooks/useSortPreferences';
import { useAppPreferences } from '@/hooks/useAppPreferences';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SettingsProps {
  children: React.ReactNode;
}

export const Settings = ({ children }: SettingsProps) => {
  const { currentTheme, setTheme, themes } = useTheme();
  const { currentStyle, setTextStyle, textStyles } = useTextStyle();
  const { currentSize, increaseSize, decreaseSize, fontSizes } = useFontSize();
  const { currentView, setViewMode, viewModes } = useViewPreferences();
  const { currentSort, setSortOption, sortOptions } = useSortPreferences();
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const { 
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
    toggleShowRatings
  } = useAppPreferences();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    deals: true,
    updates: false
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Notification Settings Updated",
      description: `${key} notifications ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case 'light': return Sun;
      case 'dark': return Moon;
      default: return Monitor;
    }
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
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Settings
          </SheetTitle>
          <SheetDescription>
            Customize your preferences and manage your account
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-4 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
          {/* Theme Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Appearance
              </CardTitle>
              <CardDescription>
                Choose your preferred theme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
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
            </CardContent>
          </Card>

          {/* Text Style Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Type className="h-4 w-4" />
                Text Design
              </CardTitle>
              <CardDescription>
                Choose your preferred text style
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {textStyles.map((style) => (
                  <Button
                    key={style.key}
                    variant={currentStyle === style.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTextStyle(style.key)}
                    className="justify-start gap-2"
                  >
                    <Type className="h-4 w-4" />
                    {style.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Font Size Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <ZoomIn className="h-4 w-4" />
                Font Size
              </CardTitle>
              <CardDescription>
                Adjust text size for better readability
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Current: {fontSizes.find(s => s.key === currentSize)?.label}
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
            </CardContent>
          </Card>

          {/* View Preferences */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <LayoutGrid className="h-4 w-4" />
                View Mode
              </CardTitle>
              <CardDescription>
                Choose how to display content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {viewModes.map((view) => {
                  const IconComponent = getViewIcon(view.key);
                  return (
                    <Button
                      key={view.key}
                      variant={currentView === view.key ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setViewMode(view.key);
                        toast({
                          title: "View Mode Updated",
                          description: `Switched to ${view.name}`,
                        });
                      }}
                      className="flex-col h-auto py-3 gap-1"
                    >
                      <IconComponent className="h-4 w-4" />
                      <span className="text-xs">{view.name.split(' ')[0]}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Sort Preferences */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Default Sort Order
              </CardTitle>
              <CardDescription>
                Choose default sorting preference
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select 
                value={currentSort} 
                onValueChange={(value) => {
                  setSortOption(value as any);
                  toast({
                    title: "Sort Order Updated",
                    description: `Default sort set to ${sortOptions.find(s => s.key === value)?.name}`,
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
            </CardContent>
          </Card>

          {/* Language Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Languages className="h-4 w-4" />
                Language
              </CardTitle>
              <CardDescription>
                Choose your preferred language
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select 
                value={currentLanguage} 
                onValueChange={(value) => {
                  changeLanguage(value);
                  toast({
                    title: "Language Updated",
                    description: `Language set to ${languages.find(l => l.code === value)?.name}`,
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
            </CardContent>
          </Card>

          {/* Currency & Regional Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Currency
              </CardTitle>
              <CardDescription>
                Select your preferred currency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select 
                value={currency} 
                onValueChange={(value) => {
                  updateCurrency(value as any);
                  toast({
                    title: "Currency Updated",
                    description: `Currency set to ${currencies.find(c => c.key === value)?.name}`,
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((curr) => (
                    <SelectItem key={curr.key} value={curr.key}>
                      {curr.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Data Refresh Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Data Refresh
              </CardTitle>
              <CardDescription>
                Control how often data updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select 
                value={dataRefresh} 
                onValueChange={(value) => {
                  updateDataRefresh(value as any);
                  toast({
                    title: "Refresh Settings Updated",
                    description: `Data refresh set to ${refreshOptions.find(r => r.key === value)?.name}`,
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {refreshOptions.map((option) => (
                    <SelectItem key={option.key} value={option.key}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Display Preferences */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Display Options
              </CardTitle>
              <CardDescription>
                Customize what you see
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="compact-mode">Compact mode</Label>
                </div>
                <Switch
                  id="compact-mode"
                  checked={compactMode}
                  onCheckedChange={(checked) => {
                    toggleCompactMode(checked);
                    toast({
                      title: "Display Updated",
                      description: `Compact mode ${checked ? 'enabled' : 'disabled'}`,
                    });
                  }}
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
                  onCheckedChange={(checked) => {
                    toggleShowPrices(checked);
                    toast({
                      title: "Display Updated",
                      description: `Prices ${checked ? 'shown' : 'hidden'}`,
                    });
                  }}
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
                  onCheckedChange={(checked) => {
                    toggleShowRatings(checked);
                    toast({
                      title: "Display Updated",
                      description: `Ratings ${checked ? 'shown' : 'hidden'}`,
                    });
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </CardTitle>
              <CardDescription>
                Manage your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="email-notifications">Email notifications</Label>
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
                  <Label htmlFor="push-notifications">Push notifications</Label>
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
            </CardContent>
          </Card>

          <Separator />

          {/* Account Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Account</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                Profile Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Lock className="h-4 w-4 mr-2" />
                Privacy & Security
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Database className="h-4 w-4 mr-2" />
                Data Management
              </Button>
            </div>
          </div>

          <Separator />

          {/* App Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">App</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Volume2 className="h-4 w-4 mr-2" />
                Sound Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Globe className="h-4 w-4 mr-2" />
                Language & Region
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help & Support
              </Button>
            </div>
          </div>
        </div>

        <SheetFooter className="pt-4">
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Close Settings
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};