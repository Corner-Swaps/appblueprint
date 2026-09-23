import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.slava.appblueprint',
  appName: 'App Blueprint',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  ios: {
    contentInset: 'never',
    backgroundColor: '#000000'
  }
};

export default config;
