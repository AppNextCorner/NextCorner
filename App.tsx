import Route from "./routing/Route";
// install complementary packages to use this package
import { Provider } from "react-redux";
import { store } from "./store/store";
// import { STRIPE_API_KEY } from "@env";
import { StripeProvider } from "@stripe/stripe-react-native";
import React from "react";
import { LogBox } from 'react-native';

export default function App() {
  LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage"]);
  return (
    <Provider store={store}>
      <StripeProvider
        publishableKey={
          process.env.STRIPE_API_KEY ? process.env.STRIPE_API_KEY : ""
        }
      >
        <Route />
      </StripeProvider>
    </Provider>
  );
}
