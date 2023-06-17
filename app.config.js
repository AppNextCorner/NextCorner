import * as dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

export default ({ config }) => ({
  ...config,
  slug: 'next-corner',
  name: 'Next Corner',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.croon',
    config: {
      googleMapsApiKey:process.env.GOOGLE_CLOUD_API_KEY,
    },
  },
});