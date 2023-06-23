import { useState, useRef, useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import styled from "@emotion/native";
import { useAppSelector } from "../../store/hook";
import { userLocation } from "../../hooks/handlePages/useGoogleMaps";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Circle } from "react-native-maps";
import MapStyle from "../../constants/MapStyle.json";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { getBusiness } from "../../store/slices/BusinessSlice/businessSlice";

const RADIUS = 0.5 * 1609.344; // Convert miles to meters

export const NearbyVendors = () => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeData: 0.0922,
    longitudeData: 0.0421,
  });
  const [viewLocation, setViewLocation] = useState(false);
  const mapRef = useRef();
  const vendors = useAppSelector(getBusiness);

  // Function to filter vendors based on the radius
  const filterVendorsByRadius = () => {
    const filteredVendors = vendors.filter((vendor) => {
      const vendorLocation = {
        latitude: parseFloat(vendor.location.latitude),
        longitude: parseFloat(vendor.location.longitude),
      };
      const distance = haversineDistance(mapRegion, vendorLocation);
      return distance <= RADIUS;
    });
    return filteredVendors;
  };

  // Function to calculate the Haversine distance between two coordinates
  const haversineDistance = (point1, point2) => {
    const R = 6371e3; // Earth's radius in meters
    const lat1 = toRadians(point1.latitude);
    const lat2 = toRadians(point2.latitude);
    const deltaLat = toRadians(point2.latitude - point1.latitude);
    const deltaLng = toRadians(point2.longitude - point1.longitude);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLng / 2) *
        Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  };

  const toRadians = (value) => {
    return (value * Math.PI) / 180;
  };

  const CustomUserMarker = () => {
    return (
      <View style={styles.userMarker}>
        <Ionicons name="md-person-circle" size={24} color="white" />
      </View>
    );
  };

  const updateUserLocation = useCallback(async () => {
    const updatedMapRegion = await userLocation(
      setViewLocation,
      setMapRegion,
      mapRegion
    );
    if (updatedMapRegion) {
      setMapRegion(updatedMapRegion);
    }
  }, [mapRegion]);

  useEffect(() => {
    updateUserLocation();
    setViewLocation(true);

    const intervalId = setInterval(updateUserLocation, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [updateUserLocation]);

  const CustomMarker = () => {
    return (
      <View style={styles.marker}>
        <MaterialCommunityIcons
          style={{ zIndex: 5 }}
          name="store"
          size={24}
          color="white"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {viewLocation === true ? (
        <MapView
          scrollEnabled={true}
          ref={mapRef}
          minZoomLevel={14}
          maxZoomLevel={18}
          customMapStyle={MapStyle}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={false}
          style={{ flex: 1 }}
          initialRegion={mapRegion}
        >
          {/* Create markers for filtered vendors within the radius */}
          {filterVendorsByRadius().map((vendor, index) => (
            <Marker
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
            fillColor={"#0FBCF926"}
          />
          <Marker coordinate={mapRegion}>
            <CustomUserMarker />
          </Marker>
        </MapView>
      ) : (
        <WaitingFor>Waiting for Maps</WaitingFor>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
