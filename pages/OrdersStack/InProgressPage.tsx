import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

// for bottom modal
import React, { useMemo, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import GoogleMapsMenuSection from "components/unfinishedOrders/GoogleMapsMenuSection";
import InProgressList from "components/unfinishedOrders/InProgressList";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import orderItem from "../../typeDefinitions/interfaces/orderItem.interface";
import { location } from "../../typeDefinitions/interfaces/location.interface";
/**
 * Used to display the status, map, and the items that are currently in the progress of being made
 */
const InProgressPage = () => {
  // used to get the current location and duration from the user's home to the business
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();

  const returnBack = () => {
    navigation.goBack();
  };
  const isFocused = useIsFocused();

  const { order }: any = route.params;

  // items displayed on the Google Maps component after being passed in
  const mapOrderItem: location[] = order.singleOrderList
    .map((orderItem: orderItem) => orderItem.location)
    .flat();

  const bottomSheetRef = useRef(null); // set the initial bottom sheet to have nothing instantly until it is changed
  
  // first value -> initial value / point to start with on the bottom
  // second value -> final point where the modal is supposed to stop in with snapping to it when near it
  const snapPoints = useMemo(() => ["20%", "100%"], []);
  return (
    <>
    
        {/* //       {/* Helps with the google maps to be able to display it, be able to zoom in and out, and other touchable features */}
        <GestureHandlerRootView style={{ flex: 1 , backgroundColor: "#fff" }}>
          <TouchableOpacity
            onPress={() => returnBack()}
            style={styles.goBackButton}
          >
            <AntDesign name="arrowleft" size={30} color="white" />
          </TouchableOpacity>
          <View style={styles.headerContainer}>
            <Text style={styles.pageHeader}>Your Order</Text>
          </View>
          {/* Google Maps component */}
          <View
            style={{
              flex: 1,
              margin: "2%",
              marginTop: "40%",
              borderRadius: 25,
              overflow: "hidden",
            }}
          >
            {isFocused ? (
              <GoogleMapsMenuSection
                time={order}
                location={mapOrderItem}
                setDuration={setDuration}
                setDistance={setDistance}
              />
            ) : (
              <></>
            )}
          </View>

          {/* Our bottom modal containing the business and each individual menu */}
          <BottomSheet
            ref={bottomSheetRef}
            // where the modal should be located based on the HandleSheetChanges event
            index={0}
            snapPoints={snapPoints}
            style={styles.bottomSheetContainer}
            backgroundStyle={styles.bottomSheetContainer}
          >
            {/* The vertical list to encompass all of the content we want to display in the bottom modal */}
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
