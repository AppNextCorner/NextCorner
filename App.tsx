import Route from "./routing/Route";
// install complementary packages to use this package
import { Provider } from "react-redux";
import { store } from "./store/store";
// import { STRIPE_API_KEY } from "@env";
import { StripeProvider } from "@stripe/stripe-react-native";
import React from "react";

export default function App() {
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
