import React, { useState, useRef, useEffect, useCallback } from "react";
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
// import { getBusiness } from "../../store/slices/BusinessSlice/businessSlice";
import { useNavigation } from "@react-navigation/native";
import { location } from "../../typeDefinitions/interfaces/location.interface";
import { mapRegion } from "../../typeDefinitions/interfaces/mapRegion.interface";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { API } from "constants/API";
import { vendorStructure } from "../../typeDefinitions/interfaces/IVendor/vendorStructure";
const RADIUS = 1.25 * 1609.344; // Convert miles to meters

export const NearbyVendors = () => {
  const [mapRegion, setMapRegion] = useState<mapRegion>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  const [viewLocation, setViewLocation] = useState(false);
  const mapRef = useRef<any>();
  const flatListRef = useRef<any>();
  const vendors: vendorStructure[] = useAppSelector(getBusinesses);
  const navigate = useNavigation<NativeStackNavigationProp<any>>();

  // Filter vendors within the specified radius
  const filterVendorsByRadius = useCallback(() => {
    if (!mapRegion) return []; // Return an empty array if mapRegion is not set yet

    const filteredVendors = vendors.filter((vendor: vendorStructure) => {
      const vendorLocation = {
        latitude: vendor.location.latitude,
        longitude: vendor.location.longitude,
      };
      const distance = haversineDistance(mapRegion, vendorLocation);
      return distance <= RADIUS;
    });
    return filteredVendors;
  }, [mapRegion, vendors]);

  // Update user location
  const updateUserLocation = useCallback(async () => {
    const updatedMapRegion = await userLocation(
      setViewLocation,
      setMapRegion,
      mapRegion,
      vendors
    );
    if (updatedMapRegion) {
      setMapRegion(updatedMapRegion);
      setViewLocation(true);
    }
  }, [vendors]);

  useEffect(() => {
    updateUserLocation();
  }, [updateUserLocation]);

  useEffect(() => {
    const intervalId = setInterval(updateUserLocation, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const callback = (newRegion: mapRegion) => {
      console.log("new region:", newRegion);
    };

    if (mapRegion && typeof callback === "function") {
      callback(mapRegion);
    }
  }, [mapRegion]);

  // Calculate haversine distance between two points
  const haversineDistance = useCallback(
    (point1: mapRegion, point2: location) => {
      const R = 6371e3; // Earth's radius in meters
      const lat1 = toRadians(point1.latitude);
      const lat2 = toRadians(parseFloat(point2.latitude));
      const deltaLat = toRadians(parseFloat(point2.latitude) - point1.latitude);
      const deltaLng = toRadians(
        parseFloat(point2.longitude) - point1.longitude
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

  // new comment
  const currentDayString = currentDate.toLocaleDateString('en-US', {weekday: 'long'});
  

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
            {filterVendorsByRadius().map((vendor, index) => (
              <Marker
                onPress={() => {
                  flatListRef.current.scrollToIndex({
                    index,
                    animated: true,
                  });
                }}
                coordinate={{
                  latitude: parseFloat(vendor.location.latitude),
                  longitude: parseFloat(vendor.location.longitude),
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
              // Find day index 
              const indexOfDay = item.times.map( (currentTime) => currentTime.day).indexOf(currentDayString)
              return (
              <Pressable
                onPress={() =>
                  navigate.navigate("MenuList", { business: item })
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
                        uri: `${API}/${item.image}`,
                      }}
                    />
                  </View>
                  <View style={styles.vendorInfo}>
                    <Text style={styles.vendorName}>{item.name}</Text>
                    <Text style={styles.description}>{item.times[indexOfDay].time.open}</Text>
                  </View>
                </View>
              </Pressable>
            )}}
          />
        </>
      )}
    </View>
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
