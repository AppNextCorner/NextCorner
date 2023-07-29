import * as dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

export default ({ config }) => ({
  ...config,
  slug: 'nextcorner-app',
  name: 'Next Corner',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.croon',
    config: {
      googleMapsApiKey:process.env.GOOGLE_CLOUD_API_KEY,
    },
  },
  updates: {
    url: "https://u.expo.dev/5a9ef8e7-b74a-4d0d-9abd-85dc2e35be3f"
  },
  runtimeVersion: {
    policy: "sdkVersion"
  }
  

});
