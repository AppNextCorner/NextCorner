import { Text, View } from "react-native";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Vendor from "pages/BusinessStack/components/vendorPages/Vendor";
import { user, vendors } from "constants/components/tabs";
import handleCreateTabStack from "hooks/components/handleCreateTabStack";
import HomePage from "pages/HomePage";
import { screens, vendorScreens } from "constants/components/logged";
import { loggedOutScreens } from "constants/components/loggedOut";
import { useAppSelector } from "../store/hook";
import { getUserBusiness } from "../store/slices/BusinessSlice/businessSessionSlice";
import ITab from "../typeDefinitions/interfaces/IComponents/tab.interface";
import { WebSocketContext } from "../context/incomingOrderContext";
import { userLocation } from "hooks/handlePages/useGoogleMaps";
import AppNavigationContainer from "./AppNavigationContainer";
import { useMapRegion } from "hooks/useMaps/useMapRegion";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { getAcceptedOrders } from "../store/slices/WebsocketSlices/IncomingOrderSlice";

interface MemoizedScreenProps {
  route: RouteProp<ParamListBase, string>;
  navigation: any;
}


const Stack = createNativeStackNavigator();

const WebsocketProviderWrapper: React.FC<{ children: React.ReactNode, websocket: WebSocket | null;}>= ({ children , websocket}) => {
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

function useUserLocation(url: string, websocket: WebSocket | null, accepted: any) {
  const [mapRegion, setMapRegion] = useMapRegion();
  const [viewLocation, setViewLocation] = React.useState(false);
  const getUserDataRef = accepted
  const getUserData = getUserDataRef

  const handleUserLocation = React.useCallback(
    async (newRegion: any) => {
      try {
        setMapRegion(newRegion);
      
       const getUserUid = getUserData.map((order: any) => order.uid);
        console.log('get user uid: ', getUserUid)
        //Remove duplicates from array by comparing every first instance of a uid
        const getUsersWhoOrdered = getUserUid.filter(function (item: any, pos: number) {
          return getUserUid.indexOf(item) === pos;
        });
        console.log('get user data ref', getUsersWhoOrdered)
        console.log('running handleUserLocation')

        if (websocket) {
          const sendRegion = {
            type: "send_vendor_location",
            payload: {
              location: {
                longitude: newRegion.longitude,
                latitude: newRegion.latitude,
              },
              users: getUsersWhoOrdered,
            },
          };
          console.log('sending to user')
          websocket.send(JSON.stringify(sendRegion));
        }
      } catch (error) {
        console.error("Error updating user location:", error);
      }
    },
    [websocket, setMapRegion, accepted]
  );

  React.useEffect(() => {
    const updateUserLocation = async () => {
      try {
        await userLocation(
          setViewLocation,
          setMapRegion,
          mapRegion,
          null,
          handleUserLocation, // Sets the map region
        );
        console.log('updated user location')
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
  }, [url, handleUserLocation, mapRegion, getUserData]);

  return { mapRegion, handleUserLocation };
}

export default function Route(props: IProps) {
  const { isDone, isLoggedIn, url, websocket } = props;
  const acceptedOrders = useAppSelector(getAcceptedOrders)
  const { mapRegion, handleUserLocation } = useUserLocation(url, websocket, acceptedOrders);

  console.log("Current map region:", mapRegion);

  // React.useEffect(() => {
  //   const updateUserLocation = async () => {
  //     try {
  //       await userLocation(
  //         setViewLocation,
  //         memoizedUserLocation,
  //         mapRegion,
  //         vendors
  //       );
  //     } catch (error) {
  //       console.error("Error updating user location:", error);
  //     }
  //   };

  //   const intervalId = setInterval(() => {
  //     updateUserLocation();
  //   }, 5000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [url, memoizedUserLocation, mapRegion]);

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

  const MemoizedHomeStackComponent: React.FC<MemoizedScreenProps> = React.memo(HomeStackComponent);

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
              const MemoizedComponent: React.FC<MemoizedScreenProps> = React.memo(Component);
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
              const MemoizedScreenComponent: React.FC<MemoizedScreenProps> = React.memo(screen.component);
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
              const MemoizedScreenComponent: React.FC<MemoizedScreenProps> = React.memo(screen.component);
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
