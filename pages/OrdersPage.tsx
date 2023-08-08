import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import UseOrders from "hooks/handleVendors/useOrders.hook";
import { useAppSelector } from "../store/hook";
import InProgressOrderCard from "../Cards/Order/InProgressOrderCard";
import CompletedOrderCard from "../Cards/Order/CompletedOrderCard";
import { getOrders, state } from "../store/slices/addToOrders";
import { getUser } from "../store/slices/userSessionSlice";
import { userLocation } from "hooks/handlePages/useGoogleMaps";
import { location } from "../typeDefinitions/interfaces/location.interface";
import { WebSocketContext } from "../context/incomingOrderContext";
import { useIsFocused } from "@react-navigation/native";

export interface WSLocation {
  location: location;
  orderId: string;
}

export default function OrdersPage() {
  const websocket = useContext(WebSocketContext);
  const isFocused = useIsFocused();
  const orders = useAppSelector(getOrders);
  const user = useAppSelector(getUser);
  const [storeLocations, setStoreLocations] = useState<WSLocation[]>([]);
  const [location, setLocation] = useState<any>({
    longitude: 0,
    latitude: 0,
    latitudeDelta: 0.0106,
    longitudeDelta: 0.0121,
  });
  const [_viewLocation, setViewLocation] = useState(false);
  const { getCurrentOrders } = UseOrders();

  const [orderSelection, setOrderSelection] = useState(false);

  // Update user location
  const updateUserLocation = useCallback(async () => {
    const updatedMapRegion = await userLocation(
      setViewLocation,
      setLocation,
      location,
      null
    );
    if (updatedMapRegion) {
      setLocation(updatedMapRegion);
      setViewLocation(true);
    }
  }, [location]);

  useEffect(() => {
    const intervalId = setInterval(updateUserLocation, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [updateUserLocation]);

  useEffect(() => {
    getCurrentOrders(user);
  }, []);

  const filterCompletedData = orders.filter((item: state) => {
    return item.status === "completed";
  });


  const handleWebSocketMessage = (event: MessageEvent) => {
    const parseEvent = JSON.parse(event.data);
    console.log("parse event", parseEvent);
    const lookForOrder = orders.find(
      (item: state) =>
        item.orders[0].inCart.storeInfo.storeOwner ===
        parseEvent.payload.order_id
    );
    console.log("lookForOrder", lookForOrder);
    if (parseEvent.type === "vendor_location" && lookForOrder) {
      console.log("here is location from vendor_location: ", parseEvent);
      const newLocation: WSLocation = {
        location: {
          latitude: parseEvent.payload.location.latitude,
          longitude: parseEvent.payload.location.longitude,
          latitudeDelta: 0.0106,
          longitudeDelta: 0.0121,
        },
        orderId: parseEvent.payload.order_id,
      };
      console.log("here is new location,", newLocation);
      const findIfStoreExists = storeLocations.find(
        (item: WSLocation) => item.orderId === newLocation.orderId
      );
      const objIndex = storeLocations.findIndex(
        (obj) => obj.orderId == newLocation.orderId
      );

      // Copy
      const copy = [...storeLocations];
      copy[objIndex] = newLocation;

      console.log("find store if exists", findIfStoreExists);
      console.log("store locations: ", storeLocations);
      // Check for the store -> Update the copy and replace the original with the copy -> else add a new location
      findIfStoreExists
        ? setStoreLocations(copy)
        : setStoreLocations((prevState) => prevState.concat([newLocation]));
    }
  };

  if (isFocused) {
    console.log("focused: ", isFocused);
    // Attach the WebSocket event listener when the component is focused
    websocket.onmessage = handleWebSocketMessage;
  } else {
    // Remove the WebSocket event listener when the component is not focused
    websocket.onmessage = null;
  }

  //   return () => {
  //     // Clean up by removing the WebSocket event listener when the component unmounts
  //     websocket.onmessage = null;
  //   };


  const finishedOrders = [
    ...new Map(
      filterCompletedData.reverse().map((m: any) => [m.createdAt, m])
    ).values(),
  ];

  const filterInProgressData = orders.filter(
    (item: state) => item.status === "Order Not Completed"
  );

  const inProgress = () => {
    setOrderSelection(false);
  };

  const completedOrders = () => {
    setOrderSelection(true);
  };

  return (
    <View style={styles.orderPageContainer}>
      <Text style={styles.headerText}>Your Orders</Text>
      <View style={styles.orderTypeContainer}>
        <View style={styles.headerOfOrder}>
          <TouchableOpacity onPress={inProgress} style={styles.sectionButton}>
            <Text style={styles.sectionHeader}>In progress</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={completedOrders}
            style={styles.sectionButton}
          >
            <Text style={styles.sectionHeader}>Complete</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={!orderSelection ? filterInProgressData : finishedOrders}
          keyExtractor={(_item, index) => index.toString()}
          style={styles.cardContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            console.log("store locations: ", storeLocations);
            const findItemLocation = storeLocations.find(
              (store) => store.orderId === item.storeInfo.storeOwner
            );
            return !orderSelection ? (
              /**
               * findItemLocation -> { location, objectId }
               */
              <InProgressOrderCard
                order={item}
                storeLocation={findItemLocation ? findItemLocation : location}
                userLocation={location}
              />
            ) : (
              <Pressable>
                <CompletedOrderCard completedOrder={item} />
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // margin for every card to be splitted
  margin: {
    backgroundColor: "#f2f3f5",
    flex: 1,
    paddingVertical: 5,
  },
  // header for completed page / completed page styles
  completedPageList: {
    marginHorizontal: "-2%",
    marginBottom: "25%",
  },

  completedPageHeader: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: "5%",
    padding: "5%",
  },
  cardContainer: {
    width: "100%",
    marginBottom: "25%",
  },
  // header
  amountContainer: {
    flex: 1,
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",
  },
  sectionHeader: {
    textAlign: "center",
    fontWeight: "bold",
  },
  sectionButton: {
    borderRadius: 10,
    backgroundColor: "#f2f5f5",
    padding: "2.5%",
    paddingHorizontal: "10%",
    marginHorizontal: "5%",
  },
  headerOfOrder: {
    flexDirection: "row",
    paddingBottom: "2%",
  },
  orderTypeContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  orderPageContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerText: {
    margin: "10%",
    marginTop: "30%",
    fontSize: 30,
    fontWeight: "bold",
  },
  // Card styles
  descriptionOfItem: {
    flex: 1,
    fontSize: 10,
  },
  imageBox: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  distanceText: {
    marginLeft: 10,
    fontSize: 11,
    marginTop: 5,
    flex: 1,
  },
  categoryText: {
    fontSize: 17,
    fontWeight: "bold",
    //fontFamily: 'monospace',
    marginTop: 15,
    flex: 1,
  },
  foodImages: {
    width: "20%",
    flex: 1,

    // Increase the image size
    padding: "30%",
    marginLeft: 25,
    marginTop: "18%",
    marginBottom: "70%",
    borderRadius: 10,
  },
  card: {
    width: 250,
    height: 115,
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
  },
  priceText: {
    flex: 1,
    alignContent: "flex-end",
    color: "#97989F",
    marginTop: 0,
  },
  foodTexts: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
    marginTop: 5,
  },
  foodCategoryStyle: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    backgroundColor: "#fff",
    borderColor: "#d6d6d6",
    borderStyle: "solid",

    borderBottomWidth: 1,
    marginBottom: -0.1,
    marginTop: 0,
  },
});
