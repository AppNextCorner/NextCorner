import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import { useAppSelector } from "../../store/hook";
import { userLocation } from "../../hooks/handlePages/useGoogleMaps";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Circle, Marker } from "react-native-maps";
import MapStyle from "../../constants/MapStyle.json";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { getBusinesses } from "../../store/slices/BusinessSlice/businessSessionSlice";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { mapRegion } from "../../typeDefinitions/interfaces/mapRegion.interface";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { WebSocketContext } from "../../context/incomingOrderContext";
import { WSLocation } from "pages/OrdersPage";
const RADIUS = 1.25 * 1609.344; // Convert miles to meters
export const NearbyVendors = () => {
  const vendors = useAppSelector(getBusinesses);
  const isFocused = useIsFocused();
  const route = useRoute();
  const navigate = useNavigation<NativeStackNavigationProp<any>>();

  const [mapRegion, setMapRegion] = useState<any>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  const mapRef = useRef<any>();
  const flatListRef = useRef<any>();
  const [storeLocations, setStoreLocations] = useState<WSLocation[]>([]);
  const [viewLocation, setViewLocation] = useState(false);

  const websocket = useContext(WebSocketContext);
 
  const handleWebSocketMessage = (event: MessageEvent) => {
    const parseEvent = JSON.parse(event.data);
    console.log("parse event", parseEvent);

    
    if (parseEvent.type === "vendor_location") {
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
      console.log('run the websocket')
      // Attach the WebSocket event listener when the component is focused
      websocket.onmessage = handleWebSocketMessage;
    } else {
      // Remove the WebSocket event listener when the component is not focused
      websocket.onmessage = null;
    }


  // ... rest of your component code ...

  // Filter vendors within the specified radius
  const filterVendorsByRadius = useCallback(() => {
    if (!mapRegion) return []; // Return an empty array if mapRegion is not set yet

    const filteredVendors = storeLocations.filter((location: WSLocation) => {
      const vendorLocation = {
        latitude: location.location.latitude,
        longitude: location.location.longitude,
      };
      const distance = haversineDistance(mapRegion, vendorLocation);
      return distance <= RADIUS;
    });
    console.log('filtered vendors: from radius ', filteredVendors)
    return filteredVendors;
  }, [mapRegion, storeLocations]);

  // Update user location
  const updateUserLocation = useCallback(async () => {
    const updatedMapRegion = await userLocation(
      setViewLocation,
      setMapRegion,
      mapRegion,
      null
    );
    if (updatedMapRegion) {
      setMapRegion(updatedMapRegion);
      setViewLocation(true);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      updateUserLocation();
    }
  }, [isFocused, updateUserLocation]);

  useEffect(() => {
    let intervalId: any;

    if (isFocused) {
      intervalId = setInterval(() => {
        updateUserLocation();
      }, 5000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isFocused, updateUserLocation]);

  useEffect(() => {
    const callback = (newRegion: mapRegion) => {
      console.log("new region:", newRegion);
    };
    if (
      route.name === "Browse" &&
      mapRegion &&
      typeof callback === "function"
    ) {
      callback(mapRegion);
    }
  }, [route.name, mapRegion]);

  // Calculate haversine distance between two points
  const haversineDistance = useCallback(
    (point1: any, point2: any) => {
      const R = 6371e3; // Earth's radius in meters
      const lat1 = toRadians(point1.latitude as number);
      const lat2 = toRadians(point2.latitude as number);
      const deltaLat = toRadians(point2.latitude as any - point1.latitude as any);
      const deltaLng = toRadians(
        point2.longitude - point1.longitude
      );

      const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1) *
          Math.cos(lat2) *
          Math.sin(deltaLng / 2) *
          Math.sin(deltaLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = R * c;
      return distance;
    },
    []
  );

  // get the day today to find the days open for the vendor
  const currentDate = new Date();
  const currentDayString = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const toRadians = useCallback((value: number) => {
    return (value * Math.PI) / 180;
  }, []);

  const CustomUserMarker = () => {
    return (
      <View style={styles.userMarker}>
        <Ionicons name="md-person-circle" size={24} color="white" />
      </View>
    );
  };

  const CustomMarker = () => {
    return (
      <View style={styles.marker}>
        <MaterialCommunityIcons name="store" size={24} color="white" />
      </View>
    );
  };

  if (!viewLocation) {
    return <Text>Waiting for Maps</Text>;
  }

  // Rest of the component code

  return (
    <View style={styles.container}>
      {mapRegion.latitude !== 0 && (
        <>
          <MapView
            scrollEnabled={true}
            ref={mapRef}
            minZoomLevel={12}
            maxZoomLevel={18}
            customMapStyle={MapStyle}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={false}
            style={{ flex: 1, position: "relative" }}
            initialRegion={mapRegion}
          >
            {filterVendorsByRadius().map((location: WSLocation, index) => (
              <Marker
                onPress={() => {
                  flatListRef.current.scrollToIndex({
                    index,
                    animated: true,
                  });
                }}
                coordinate={{
                  latitude: location.location.latitude as number,
                  longitude: location.location.longitude as number,
                }}
                key={index}
              >
                <CustomMarker />
              </Marker>
            ))}

            <Circle
              center={mapRegion}
              radius={RADIUS}
              strokeWidth={0}
              strokeColor={"#0FBCF926"}
              fillColor={"#0FBCF926"}
            />

            <Marker coordinate={mapRegion}>
              <CustomUserMarker />
            </Marker>
          </MapView>

          <FlatList
            horizontal={true}
            ref={flatListRef}
            snapToAlignment="start"
            decelerationRate={"fast"}
            snapToInterval={Dimensions.get("window").width}
            showsHorizontalScrollIndicator={false}
            data={filterVendorsByRadius()}
            style={styles.cardList}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({ item, index }) => {
              const findVendorByOrderId = vendors.find((vendor) => vendor.uid === item.orderId)
              // Find day index
              // const indexOfDay = item.times
              //   .map((currentTime) => currentTime.day)
              //   .indexOf(currentDayString);
              return (
                <Pressable
                  onPress={() =>
                    navigate.navigate("MenuList", { business: findVendorByOrderId })
                  }
                  key={index}
                  style={styles.card}
                >
                  <Text style={styles.amountHeader}>
                    {index + 1} of {filterVendorsByRadius().length}
                  </Text>
                  <View style={styles.cardContent}>
                    <View>
                      <View style={styles.status}></View>
                      <Image
                        style={styles.cardImage}
                        source={{
                          uri: findVendorByOrderId?.image,
                        }}
                      />
                    </View>
                    <View style={styles.vendorInfo}>
                      <Text style={styles.vendorName}>{findVendorByOrderId?.name}</Text>
                      {/* <Text style={styles.description}>
                        {item.times[indexOfDay].time.open}
                      </Text> */}
                    </View>
                  </View>
                </Pressable>
              );
            }}
          />
        </>
      )}
    </View>
    // <>
    // </>
  );
};

const styles = StyleSheet.create({
  // Bottom cards
  vendorName: {
    color: "#2B3B4B",
    fontWeight: "bold",
  },
  description: {
    color: "#A0A0A0",
  },
  vendorInfo: {
    marginLeft: "2%",
  },
  status: {
    // flex: 1,
    // height: 5,
    backgroundColor: "#FFE500",
    borderColor: "#fff",
    borderWidth: 2,
    position: "absolute",
    marginLeft: "75%",
    marginTop: "5%",
    borderRadius: 50,
    zIndex: 2,
    width: 10,
    height: 10,
    flexShrink: 0,
  },
  cardImage: {
    borderColor: "#f2f0f0",
    borderWidth: 2,
    width: 65,
    height: 65,
    borderRadius: 50,
    overflow: "hidden",
  },
  cardContent: {
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    height: 125,
    marginHorizontal: 20,
    width: 352.5,
    marginBottom: 5,
    padding: "5%",
    borderRadius: 20,
    shadowColor: "#c2c3c4",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  cardList: {
    position: "absolute", //Here is the trick
    bottom: "12%", //Here is the trick
  },
  amountHeader: {
    fontSize: 12,
    textAlign: "right",
  },
  cardsContainer: {},
  marker: {
    backgroundColor: "#78DBFF",
    padding: 8,
    borderRadius: 20,
  },
  userMarker: {
    backgroundColor: "#037ffc",
    padding: 8,
    borderRadius: 50,
  },
  container: {
    flex: 1,
  },
});
