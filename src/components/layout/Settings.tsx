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
  Plus
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useTextStyle } from '@/hooks/useTextStyle';
import { useFontSize } from '@/hooks/useFontSize';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface SettingsProps {
  children: React.ReactNode;
}

export const Settings = ({ children }: SettingsProps) => {
  const { currentTheme, setTheme, themes } = useTheme();
  const { currentStyle, setTextStyle, textStyles } = useTextStyle();
  const { currentSize, increaseSize, decreaseSize, fontSizes } = useFontSize();
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

        <div className="space-y-6 py-4">
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