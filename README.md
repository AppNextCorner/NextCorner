# Next Corner App

The app is made from the use of the Expo library, Node, Firebase, etc

## Contributors
Henry Martinez - henrymtz0390@gmail.com

Ralph Lopez - ralph90062@gmail.com

## Installation

Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install node.

```javascript
npm install --save
```


## Prerequisites
Make sure to get the required files to run in your machine

```javascript
// ./app.json
{
  "expo": {
    "name": "nextcorner-app",
    "slug": "nextcorner-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#78DBFF"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.example.NextCorner",
      "config": {
        "googleMapsApiKey": "(ADD GOOGLE MAPS CLOUD API KEY HERE)"
      }
      
}
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
```

```javascript
// ./utils/firebase.js
export const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };
```

```javascript
// ./constants/ApiKeys.js

export const STRIPE_API_KEY = ""
export const IP = ''

export const googleDirectionsAPIKey = '';

export const googleMapsAPIKey = ""

export const geonameAPIUser = ""
```
## Usage

```javascript
npm start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
