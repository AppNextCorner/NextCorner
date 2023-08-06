import Route from "./routing/Route";
// Install complementary packages to use this package
import { Provider } from "react-redux";
import { store } from "./store/store";
import { StripeProvider } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import { LogBox, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import useGetUserData from "hooks/handleUsers/useGetUserData";
import * as Location from "expo-location";
import { useAppSelector } from "./store/hook";
import { getAcceptedOrders } from "./store/slices/WebsocketSlices/IncomingOrderSlice";

export default function App() {
  LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  ]);

  // BUG: When entering for the first time, the app refreshes, then it later works without refreshing
  const Root = () => {
    // Call useGetUserData here to fetch user data and authentication status
    const { isDone, isLoggedIn, url } = useGetUserData();
    // const getAcceptedOrderList = useAppSelector(getAcceptedOrders)
    // console.log("accepted order list: ",getAcceptedOrderList);
    const [locationPermissionStatus, setLocationPermissionStatus] = useState(
      Location.PermissionStatus.UNDETERMINED
    );

    // Request permission to access the user's location
    useEffect(() => {
      // Request location permission only once when the app starts
      const requestLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setLocationPermissionStatus(status);
      };

      // Check the current location permission status
      const checkLocationPermissionStatus = async () => {
        const { status } = await Location.getForegroundPermissionsAsync();
        setLocationPermissionStatus(status);
      };

      // Check if the permission status is granted
      if (locationPermissionStatus === Location.PermissionStatus.GRANTED) {
        // If granted, check if it's still granted
        checkLocationPermissionStatus();
      } else {
        // If not granted, request permission
        requestLocationPermission();
      }
    }, [locationPermissionStatus]);

    if (locationPermissionStatus !== Location.PermissionStatus.GRANTED) {
      // Show a loading screen or a screen to explain why location permission is needed
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    const websocket = new WebSocket(url)
    console.log('url for web socket: ', url)
    return <Route isDone={isDone} isLoggedIn={isLoggedIn} url={url} websocket={websocket} />;
  };

  return (
    <Provider store={store}>
      <StripeProvider
        publishableKey={process.env.STRIPE_API_KEY ? process.env.STRIPE_API_KEY : ""}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer independent={true}>
            <Root />
          </NavigationContainer>
        </GestureHandlerRootView>
      </StripeProvider>
    </Provider>
  );
}
