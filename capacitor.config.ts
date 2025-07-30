import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.7b26cc4baa364dcf9068311eb4c1edc7',
  appName: 'CompareAll',
  webDir: 'dist',
  server: {
    url: 'https://7b26cc4b-aa36-4dcf-9068-311eb4c1edc7.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
  },
};

export default config;