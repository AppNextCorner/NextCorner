import { Text, View, Alert } from "react-native";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Vendor from "pages/BusinessStack/components/vendorPages/Vendor";
import { user, vendors } from "constants/components/tabs";
import handleCreateTabStack from "hooks/components/handleCreateTabStack";
import HomePage from "pages/HomePage";
import { screens, vendorScreens } from "constants/components/logged";
import { loggedOutScreens } from "constants/components/loggedOut";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { getUserBusiness } from "../store/slices/BusinessSlice/businessSessionSlice";
import ITab from "../typeDefinitions/interfaces/IComponents/tab.interface";
import { WebSocketContext } from "../context/incomingOrderContext";
import { userLocation } from "hooks/handlePages/useGoogleMaps";
import AppNavigationContainer from "./AppNavigationContainer";
import { useMapRegion } from "hooks/useMaps/useMapRegion";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { addIncomingOrder, getAcceptedOrders } from "../store/slices/WebsocketSlices/IncomingOrderSlice";
import { auth } from "hooks/handleUsers/useFirebase";
import { setCompleted } from "../store/slices/addToOrders";

interface MemoizedScreenProps {
  route: RouteProp<ParamListBase, string>;
  navigation: any;
}

const Stack = createNativeStackNavigator();

const WebsocketProviderWrapper: React.FC<{
  children: React.ReactNode;
  websocket: WebSocket | null;
}> = ({ children, websocket }) => {
  return (
    <WebSocketContext.Provider value={websocket!}>
      {children}
    </WebSocketContext.Provider>
  );
};

interface IProps {
  isDone: boolean;
  isLoggedIn: boolean;
  url: string;
  websocket: WebSocket | null;
}

function useUserLocation(
  url: string,
  websocket: WebSocket | null,
) {
  const [mapRegion, setMapRegion] = useMapRegion();
  const [_viewLocation, setViewLocation] = React.useState(false);
  const acceptedOrders = useAppSelector(getAcceptedOrders)
  const dispatch = useAppDispatch();

  // NOTE TODO: MAKE ANOTHER OR ANOTHER WAY TO SEND THE LOCATION GLOBALLY FOR THE NEARBY VENDORS
  const handleUserLocation = React.useCallback(
    async (newRegion: any) => {
      try {
        setMapRegion(newRegion);

        const getUserUid = acceptedOrders.map((order: any) => order.uid);
        //Remove duplicates from array by comparing every first instance of a uid
        const getUsersWhoOrdered = getUserUid.filter(function (
          item: any,
          pos: number
        ) {
          return getUserUid.indexOf(item) === pos;
        });

        if (websocket) {
          const sendRegion = {
            type: "send_vendor_location",
            payload: {
              location: {
                longitude: newRegion.longitude,
                latitude: newRegion.latitude,
              },
              users: getUsersWhoOrdered,
              order_id: auth.currentUser!.uid,
            },
          };
          console.log("sending to user");
          websocket.send(JSON.stringify(sendRegion));
        }
      } catch (error) {
        console.error("Error updating user location:", error);
      }
    },
    [websocket, setMapRegion, acceptedOrders]
  );

  React.useEffect(() => {
    const handleWebSocketMessage = (event: any) => {
      const parsedData = JSON.parse(event.data);
      const order = parsedData.payload;
      console.log("Here is parsed data:", parsedData)
      if (parsedData.type === "incoming_order" && order.accepted === "pending") {
        console.log("Incoming order",  order)
        // This one needs testing, a lot of testing...
        dispatch(addIncomingOrder([order]))
        }
      if(parsedData.type === "return_change_accepted" && order.accepted === "rejected"){

        Alert.alert("Your order got rejected")
      }

      if(parsedData.type === "return_change_accepted" && order.accepted === "accepted"){

        Alert.alert("Your order got accepted")
      }

      if (parsedData.type === "completed_order") {
        console.log("hoist is target uid:", order.order._id);
      
        Alert.alert(
          `Your Order from ${order.order.storeInfo.storeName} is complete!`
        );
        dispatch(setCompleted(order.order));
      }
    };
    websocket!.onmessage = handleWebSocketMessage;
    const updateUserLocation = async () => {
      try {
        await userLocation(
          setViewLocation,
          setMapRegion,
          mapRegion,
          null,
          handleUserLocation // Sets the map region
        );
        console.log("updated user location");
      } catch (error) {
        console.error("Error updating user location:", error);
      }
    };

    const intervalId = setInterval(() => {
      updateUserLocation();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [ mapRegion, acceptedOrders]);
}

export default function Route(props: IProps) {
  const { isDone, isLoggedIn, url, websocket } = props;
 
  {isDone && isLoggedIn ? useUserLocation(url, websocket) : null}

  // console.log("Current map region:", mapRegion);

  const VendorComponent = React.memo(() => {
    const store = useAppSelector(getUserBusiness);
    const nullCheck = store === null ? false : store!.length > 0;
    const blacklist = !nullCheck ? ["Orders", "Settings", "Menu"] : [];
    const vendorTabList = vendors.filter(
      (tab: ITab) => !blacklist.includes(tab.name)
    );
    const vendorStack = handleCreateTabStack({
      tabList: vendorTabList,
      initialRoute: "Vendors",
    });

    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        {vendorStack || <Vendor />}
      </View>
    );
  });

  const HomeStackComponent = React.memo(() => {
    const homeStack = handleCreateTabStack({
      tabList: user,
      initialRoute: "Home",
    });

    return homeStack || <HomePage />;
  });

  const ScreenWrapper = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
  };

  const MemoizedVendorComponent: React.FC<{
    route: RouteProp<ParamListBase, string>;
    navigation: any;
  }> = React.memo(VendorComponent);

  const MemoizedHomeStackComponent: React.FC<MemoizedScreenProps> =
    React.memo(HomeStackComponent);

  return (
    <WebsocketProviderWrapper websocket={websocket}>
      {isDone === true && isLoggedIn ? (
        <AppNavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="HomeStack"
              component={MemoizedHomeStackComponent}
            />

            {screens.map((screen, index) => {
              const Component = (props: any) => <screen.component {...props} />;
              const MemoizedComponent: React.FC<MemoizedScreenProps> =
                React.memo(Component);
              return (
                <Stack.Screen key={index} name={screen.name}>
                  {(props) => (
                    <ScreenWrapper>
                      <MemoizedComponent {...props} />
                    </ScreenWrapper>
                  )}
                </Stack.Screen>
              );
            })}

            <Stack.Screen name="Vendor">
              {(props) => (
                <ScreenWrapper>
                  <MemoizedVendorComponent {...props} />
                </ScreenWrapper>
              )}
            </Stack.Screen>

            {vendorScreens.map((screen, index) => {
              const MemoizedScreenComponent: React.FC<MemoizedScreenProps> =
                React.memo(screen.component);
              return (
                <Stack.Screen key={index} name={screen.name}>
                  {(props) => (
                    <ScreenWrapper>
                      <MemoizedScreenComponent {...props} />
                    </ScreenWrapper>
                  )}
                </Stack.Screen>
              );
            })}
          </Stack.Navigator>
        </AppNavigationContainer>
      ) : isDone === true && !isLoggedIn ? (
        <AppNavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {loggedOutScreens.map((screen, index) => {
              const MemoizedScreenComponent: React.FC<MemoizedScreenProps> =
                React.memo(screen.component);
              return (
                <Stack.Screen key={index} name={screen.name}>
                  {(props) => (
                    <ScreenWrapper>
                      <MemoizedScreenComponent {...props} />
                    </ScreenWrapper>
                  )}
                </Stack.Screen>
              );
            })}
          </Stack.Navigator>
        </AppNavigationContainer>
      ) : (
        <Text>fetching user...</Text>
      )}
    </WebsocketProviderWrapper>
  );
}
