import { Platform } from 'react-native';

// Environment configuration for the mobile app.
// Currently we only define a development config, which is what the app uses.

type Environment = 'development' | 'production';

const ENV: Environment = __DEV__ ? 'development' : 'production';

const devApiHost = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const devApiPort = 3001;

const devConfig = {
  ENV: 'development' as const,
  API_HOST: devApiHost,
  API_PORT: devApiPort,
  API_BASE_URL: `http://${devApiHost}:${devApiPort}/api`,
};

// For now, production falls back to the same settings.
// This can be customized later without touching callers.
const prodConfig = devConfig;

export const env = ENV === 'development' ? devConfig : prodConfig;


