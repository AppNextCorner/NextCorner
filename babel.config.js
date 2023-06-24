module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@cards": "./Cards",
            "@components": "./components",
            "@constants": "./constants",
            "@data": "./data",
            "@hooks": "./hooks",
            "@pages": "./pages",
            "@routing": "./routing",
            "@util": "./util",
            "@global": "./",
            "@assets": "./assets"
          },
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".android.js",
            ".android.tsx",
            ".ios.js",
            ".ios.tsx",
          ],
          //  Removes the need to add the extensions at the end of a file when importing
          resolve: {
            extensions: [
              ".js",
              ".jsx",
              ".ts",
              ".tsx",
              ".android.js",
              ".android.tsx",
              ".ios.js",
              ".ios.tsx",
              ".png"
            ],
          },
        },
      ],
    ],
  };
};
