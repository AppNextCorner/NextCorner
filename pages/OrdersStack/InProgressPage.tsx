import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import GoogleMapsMenuSection from "components/unfinishedOrders/GoogleMapsMenuSection";
import InProgressList from "components/unfinishedOrders/InProgressList";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { WebSocketContext } from "../../context/incomingOrderContext";
import { location } from "../../typeDefinitions/interfaces/location.interface";
import { userLocation } from "hooks/handlePages/useGoogleMaps";

const InProgressPage = () => {
  const route: any = useRoute();
  const { order }: any = route.params; // Fetch the order from route params

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["20%", "100%"], []);

  const [location, setLocation] = useState<any>({
    longitude: 0,
    latitude: 0,
    latitudeDelta: 0.0106,
    longitudeDelta: 0.0121,
  });
  const [localUserLocation, setLocalUserLocation] = useState<location>({
    longitude: 0,
    latitude: 0,
    latitudeDelta: 0.0106,
    longitudeDelta: 0.0121,
  });

  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const returnBack = () => {
    navigation.goBack();
  };
  const isFocused = useIsFocused();
  const websocket = useContext(WebSocketContext);
  const handleWebSocketMessage = (event: MessageEvent) => {
    const parseEvent = JSON.parse(event.data);
    if (
      parseEvent.type === "vendor_location" &&
      parseEvent.payload.order_id === order.storeInfo.storeOwner
    ) {
  
      const newLocation = {
        latitude: parseEvent.payload.location.latitude,
        longitude: parseEvent.payload.location.longitude,
        latitudeDelta: 0.0106,
        longitudeDelta: 0.0121,
      };
      setLocation(newLocation);
    }
  };
  // Attach the WebSocket event listener when the component is focused
  isFocused
    ? (websocket.onmessage = handleWebSocketMessage)
    : (websocket.onmessage = null);
  const [_viewLocation, setViewLocation] = useState(false);
  // Update user location
  const updateUserLocation = React.useCallback(async () => {
    const updatedMapRegion = await userLocation(
      setViewLocation,
      setLocalUserLocation,
      localUserLocation,
      null
    );
    if (updatedMapRegion) {
      console.log("updated region fro user, ", updatedMapRegion);
      setLocalUserLocation(updatedMapRegion);
      setViewLocation(true);
    }
  }, [localUserLocation]);

  React.useEffect(() => {
    const intervalId = setInterval(updateUserLocation, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [updateUserLocation]);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TouchableOpacity
          onPress={() => returnBack()}
          style={styles.goBackButton}
        >
          <AntDesign name="arrowleft" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.pageHeader}>Your Order</Text>
        </View>
        <View
          style={{
            flex: 1,
            margin: "2%",
            marginTop: "40%",
            borderRadius: 25,
            overflow: "hidden",
          }}
        >
          {isFocused
             &&
            localUserLocation.latitude !== 0 &&
            location.latitude !== 0 ? (
            <GoogleMapsMenuSection
              time={order}
              userLocation={localUserLocation}
              location={location}
              setDuration={setDuration}
              setDistance={setDistance}
            />
          ) : (
            <></>
          )}
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          style={styles.bottomSheetContainer}
          backgroundStyle={styles.bottomSheetContainer}
        >
        
          <InProgressList
            duration={duration}
            distance={distance}
            order={order}
          />
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
};

export default InProgressPage;

const styles = StyleSheet.create({
  // bottom sheet style
  bottomSheetContainer: {
    overflow: "hidden",
    backgroundColor: "#78DBFF",
    borderRadius: 20,
  },
  goBackButton: {
    marginTopLeft: "5%",
    marginLeft: "5%",
    marginTop: "10%",
    borderRadius: 20,
    padding: "2%",
    width: "12.5%",
    backgroundColor: "#78DBFF",
  },
  pageHeader: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",

    marginBottom: "-35%",
    flexDirection: "row",
  },
});
