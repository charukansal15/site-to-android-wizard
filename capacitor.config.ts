
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.13823adcb5544733a3ad8ef71a9e874b',
  appName: 'site-to-android-wizard',
  webDir: 'dist',
  server: {
    url: 'https://13823adc-b554-4733-a3ad-8ef71a9e874b.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: null,
      keystoreAlias: null,
      keystorePassword: null,
      keystoreAliasPassword: null,
      releaseType: null,
    }
  }
};

export default config;
