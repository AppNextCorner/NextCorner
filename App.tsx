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
import useMessageHandler from "hooks/websocket/useMessageHandler";

export default function App() {
  LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  ]);

  // BUG: When entering for the first time, the app refreshes, then it later works without refreshing
  const Root = () => {
    // Call useGetUserData here to fetch user data and authentication status
    const { isDone, isLoggedIn, url } = useGetUserData();
    const  {routeEvent} = useMessageHandler()
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

    let websocket: WebSocket | null = null;
let count : number = 0;
    function connectWebSocket() {
      // get your idd handy

      // put yoyur id and ip
      websocket = new WebSocket(
        `ws://192.168.1.19:4002/ws?uid=648d220045ba843985de5871`
      );
      websocket.addEventListener("open", () => {
        console.log("WebSocket connection opened\n\n\n\n\n\n\n\n\n\n\n\n");
        count++;
        console.log(count)
        // You can perform any necessary setup or send initial messages here
      });

      websocket.addEventListener("message", (event) => {
        console.log("Received message:", event.data);
        // Handle incoming messages here
        isDone && isLoggedIn ? routeEvent(event) : null;

      });

      websocket.addEventListener("close", () => {
        console.log("WebSocket connection closed");
        // Reconnect the WebSocket after a delay
        setTimeout(connectWebSocket, 5000); // Example: reconnect after 1 second
      });

      websocket.addEventListener("error", (error) => {
        console.error("WebSocket error:", error);
        // Handle errors here
      });
    }

    // Start the initial WebSocket connection
    connectWebSocket();

    // const websocket = new WebSocket(url);
    // websocket.addEventListener("close", () => {
    //   console.log("IS CLOSING!\n");
    //   console.log("IS CLOSING!\n");
    //   console.log("IS CLOSING!\n");
    //   console.log("IS CLOSING!\n");
    //   console.log("IS CLOSING!\n");
    //   console.log("IS CLOSING!\n");
    //   console.log("IS CLOSING!\n");
    //   console.log("IS CLOSING!\n");
    //   console.log("IS CLOSING!\n");
    //   console.log("IS CLOSING!\n");
    //   console.log("IS CLOSING!\n");
    //   console.log("IS CLOSING!\n");
    //   console.log("IS CLOSING!\n");
    //   console.log("IS CLOSING!\n");
    //   console.log("IS CLOSING!\n");
    //   console.log("IS CLOSING!\n");
    // });
    // websocket.addEventListener("open", () => {
    //   console.log("IS OPENING\n");
    //   console.log("IS OPENING\n");
    //   console.log("IS OPENING\n");
    //   console.log("IS OPENING\n");
    //   console.log("IS OPENING\n");
    //   console.log("IS OPENING\n");
    //   console.log("IS OPENING\n");
    //   console.log("IS OPENING\n");
    //   console.log("IS OPENING\n");
    //   console.log("IS OPENING\n");
    // });
    console.log("url for web socket: ", url);
    return (
      <Route
        isDone={isDone}
        isLoggedIn={isLoggedIn}
        url={url}
        websocket={websocket}
      />
    );
  };

  return (
    <Provider store={store}>
      <StripeProvider
        publishableKey={
          process.env.STRIPE_API_KEY ? process.env.STRIPE_API_KEY : ""
        }
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
