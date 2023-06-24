import React, { useEffect, useState, useRef, useCallback } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import MapStyle from "../../constants/MapStyle.json";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { googleDirectionsAPIKey } from "@env";
import { userLocation } from "../../hooks/handlePages/useGoogleMaps";
// icons
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

export default function GoogleMapsMenuSection(props) {
  const {
    time,
    location,
    setDuration,
    setDistance,
    scrollEnabled,
    pointerEvents,
  } = props;

  const [mapFitted, setMapFitted] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState({
    latitude: parseFloat(location[0].latitude),
    longitude: parseFloat(location[0].longitude),
    latitudeDelta: 0.0106,
    longitudeDelta: 0.0121,
  });
  const [viewLocation, setViewLocation] = useState(false);
  const mapRef = useRef();

  

  const delay = 2;

  const updateUserLocation = useCallback(async () => {
    const updatedMapCoordinates = await userLocation(
      setViewLocation,
      setMapCoordinates,
      mapCoordinates
    );
    if (updatedMapCoordinates) {
      setMapCoordinates(updatedMapCoordinates);
      console.log('updated map coordinates: ', updatedMapCoordinates)
    }
    console.log('update region')
  }, [mapCoordinates]);

  useEffect(() => {
    const intervalId = setInterval(updateUserLocation, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, [updateUserLocation]);

  useEffect(() => {
    updateUserLocation();
  }, []);

  const traceRouteOnReady = useCallback((result) => {
    setDistance(result.distance);
    setDuration(result.duration);

    if (!mapFitted) {
      mapRef.current?.fitToCoordinates(result.coordinates, {
        edgePadding: {
          right: 70,
          bottom: 70,
          left: 70,
          top: 70,
        },
      });
      setMapFitted(true);
    }
  }, [mapFitted]);

  const destination = {
    latitude: parseFloat(location[0].latitude),
    longitude: parseFloat(location[0].longitude),
  };

  function CustomMarker() {
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
  }

  const CustomUserMarker = () => {
    return (
      <View style={styles.marker}>
        <Entypo name="home" size={24} color="white" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {viewLocation === true ? (
        <MapView
          scrollEnabled={scrollEnabled}
          ref={mapRef}
          minZoomLevel={14}
          maxZoomLevel={18}
          customMapStyle={MapStyle}
          region={mapCoordinates}
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1, position: "relative" }}
          initialRegion={mapCoordinates}
        >
          <Marker coordinate={destination}>
            {/* CustomMarker has to be a child of Marker*/}
            <CustomMarker />
          </Marker>
          <Marker coordinate={mapCoordinates}>
            {/* CustomMarker has to be a child of Marker*/}
            <CustomUserMarker />
          </Marker>
          <MapViewDirections
            origin={mapCoordinates}
            destination={destination}
            apikey={googleDirectionsAPIKey}
            strokeColor="#78DBFF"
            strokeWidth={4}
            onReady={(result) => {
              traceRouteOnReady(result);
            }}
          />
        </MapView>
      ) : (
        <Text>Waiting for Maps</Text>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  marker: {
    backgroundColor: "#78DBFF",
    padding: 8,
    borderRadius: 20,
  },
  // map logo icon style
  logoOnMap: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  userOnMap: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  // container for map
  container: {
    flex: 0.78,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "#fff",
  },
  overlay: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "red",
    zIndex: 2,
  },
});
