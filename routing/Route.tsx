import { Text, TouchableOpacity, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useGetUserData, { websocket } from "hooks/handleUsers/useGetUserData";
import Vendor from "pages/BusinessStack/components/vendorPages/Vendor";
import { user, vendors } from "constants/components/tabs";
import handleCreateTabStack from "hooks/components/handleCreateTabStack";
import HomePage from "pages/HomePage";
import { screens, vendorScreens } from "constants/components/logged";
import { loggedOutScreens } from "constants/components/loggedOut";
import { useAppSelector } from "../store/hook";
import { getUserBusiness } from "../store/slices/BusinessSlice/businessSessionSlice";
import ITab from "../typeDefinitions/interfaces/IComponents/tab.interface";
const Stack = createNativeStackNavigator();

export default function Route() {
  const { isDone, isLoggedIn } = useGetUserData();
  const payload = {
    type: "sent_order",
    payload: {
      message: "Greetings from frontend!",
      from: "your_username", // Replace "your_username" with the actual username of the sender
    },
  };

  function routeEvent(event: MessageEvent<any>) {
    console.log("Event type", event.type);
    const parseEvent = JSON.parse(event.data);
    if (parseEvent.type === undefined) {
      alert("no 'type' field in parseEvent");
    }
    switch (parseEvent.type) {
      case "new_order":
        // Format payload
        console.log("received message from web socket: ", parseEvent);

        if (parseEvent.payload.julian_boolean) {
          alert("Julian Boolean");
        }
        // const messageEvent = Object.assign(NewMessageEvent, event);
        // //appendChatMessage(messageEvent);
        // console.log("new message created: ", new messageEvent());
        break;
      default:
        alert("unsupported message type");
        break;
    }
  }
  function sendEvent(payload: any) {
    // Create a event Object with a event named send_message
    // Format as JSON and send
    console.log("event created: ", payload);
    console.log("web socket: ", websocket);
    websocket.send(JSON.stringify(payload));
  }

  const sendFakeMessage = () => {
    const newmessage = "Cool Message";
    if (newmessage != null) {
      sendEvent(payload);
    }
  };
  console.log("IS DONE: ", isDone, isLoggedIn);

  websocket.onopen = (event) => {
    console.log("WebSocket connected:", event);
  };

  // Messages that were received from the WebSocket server
  websocket.onmessage = (event) => {
    console.log("Received message:", event.data);
    routeEvent(event);
  };

  websocket.onerror = (error) => {
    console.log("WebSocket error:", error);
  };

  websocket.onclose = (event) => {
    console.log("WebSocket closed:", event);
  };

  const VendorComponent = () => {
    const store = useAppSelector(getUserBusiness);

    const nullCheck = store === null ? false : store!.length > 0;
    const blacklist = !nullCheck ? ["Orders", "Settings", "Menu"] : []; // Add menu later
    const vendorTabList = vendors.filter(
      (tab: ITab) => !blacklist.includes(tab.name)
    );
    const vendorStack = handleCreateTabStack({
      tabList: vendorTabList,
      initialRoute: "Vendors",
    });
    console.log("re run");

    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        {/* {store !== null ? <IncomingOrderAlert  /> : null} */}
        <TouchableOpacity
          onPress={sendFakeMessage}
          style={{ marginTop: "20%" }}
        >
          <Text>Send messages</Text>
        </TouchableOpacity>
        {vendorStack || <Vendor />}
      </View>
    );
  };
  const HomeStackComponent = () => {
    const homeStack = handleCreateTabStack({
      tabList: user,
      initialRoute: "Home",
    });

    return homeStack || <HomePage />;
  };

  if (isDone === true && isLoggedIn) {
    return (
      <>
        <NavigationContainer independent={true}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeStack" component={HomeStackComponent} />

            {screens.map((screen, index) => {
              const Component = (props: any) => <screen.component {...props} />;
              return (
                <Stack.Screen
                  key={index}
                  name={screen.name}
                  component={Component}
                />
              );
            })}

            {/* Vendor Pages */}
            <Stack.Screen name="Vendor" component={VendorComponent} />

            {/* Forms */}
            {vendorScreens.map((screen, index) => (
              <Stack.Screen
                key={index}
                name={screen.name}
                component={screen.component}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  } else if (isDone === true && !isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {loggedOutScreens.map((screen, index) => (
            <Stack.Screen
              key={index}
              name={screen.name}
              component={screen.component}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <Text>fetching user...</Text>;
  }
}
