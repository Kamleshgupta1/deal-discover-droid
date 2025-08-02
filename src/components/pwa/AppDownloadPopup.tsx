import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, X, Smartphone, Star } from 'lucide-react';
import { APP_CONFIG } from '@/constants';

export const AppDownloadPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if running on iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if app is already installed or popup was dismissed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         (window.navigator as any).standalone === true;
    const popupDismissed = localStorage.getItem('app-download-popup-dismissed');
    
    if (isStandalone || popupDismissed) return;

    // Show popup after 20 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    if (isIOS) {
      // For iOS, show instructions to add to home screen
      alert('To install this app:\n1. Tap the Share button\n2. Select "Add to Home Screen"\n3. Tap "Add"');
    } else {
      // For Android/other platforms, trigger PWA install
      const installEvent = (window as any).deferredPrompt;
      if (installEvent) {
        installEvent.prompt();
      }
    }
    setShowPopup(false);
    localStorage.setItem('app-download-popup-dismissed', 'true');
  };

  const handleDismiss = () => {
    setShowPopup(false);
    localStorage.setItem('app-download-popup-dismissed', 'true');
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <Card className="mx-4 max-w-md w-full p-6 bg-gradient-primary text-white shadow-strong animate-scale-in">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-white/20 rounded-full">
              <Smartphone className="h-8 w-8" />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-2">Get the {APP_CONFIG.name} App!</h3>
            <p className="text-sm opacity-90 mb-4">
              Experience faster loading, offline access, and a native app feel.
            </p>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm">4.8/5 rating</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button
              onClick={handleDownload}
              className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
              size="lg"
            >
              <Download className="h-5 w-5 mr-2" />
              {isIOS ? 'Add to Home Screen' : 'Install App'}
            </Button>
            
            <Button
              onClick={handleDismiss}
              variant="ghost"
              className="w-full text-white hover:bg-white/10"
            >
              Maybe Later
            </Button>
          </div>
          
          <Button
            onClick={handleDismiss}
            variant="ghost"
            className="absolute top-2 right-2 h-8 w-8 p-0 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};