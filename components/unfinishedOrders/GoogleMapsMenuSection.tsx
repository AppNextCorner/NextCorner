import React, { useEffect, useState, useRef, useCallback, Dispatch, SetStateAction } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import MapStyle from "../../constants/MapStyle.json";
import MapViewDirections from "react-native-maps-directions";
// import { googleDirectionsAPIKey } from "@env";
import { userLocation } from "../../hooks/handlePages/useGoogleMaps";
// icons
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { vendor } from "../../typeDefinitions/interfaces/vendor.interface";
import { location } from "../../typeDefinitions/interfaces/location.interface";
import { mapRegion } from "../../typeDefinitions/interfaces/mapRegion.interface";

interface Props {
  time?: vendor;
  location: location[];
  scrollEnabled?: boolean;
  pointerEvents?: string;
  setDuration: Dispatch<SetStateAction<number>>;
  setDistance: Dispatch<SetStateAction<number>>;
}
export default function GoogleMapsMenuSection(props: Props) {
  const { location, setDuration, setDistance, scrollEnabled } = props;

  const [mapFitted, setMapFitted] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState<mapRegion>({
    latitude: parseFloat(location[0].latitude),
    longitude: parseFloat(location[0].longitude),
    latitudeDelta: 0.0106,
    longitudeDelta: 0.0121,
  });
  const mapRef = useRef<any>();

  const updateUserLocation = useCallback(async () => {
    const updatedMapCoordinates = await userLocation(
      setMapFitted,
      setMapCoordinates,
      mapCoordinates
    );
    if (updatedMapCoordinates) {
      setMapCoordinates(updatedMapCoordinates);
    }
    console.log("new coords: ", mapCoordinates);
  }, [mapCoordinates]);

  useEffect(() => {
    const intervalId = setInterval(updateUserLocation, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [updateUserLocation]);

  useEffect(() => {
    updateUserLocation();
  }, []);

  useEffect(() => {
    // what is newRegion?
    const callback = (newRegion: any) => {
      console.log("new region:", newRegion);
    };

    if (mapCoordinates && typeof callback === "function") {
      callback(mapCoordinates);
    }
  }, [mapCoordinates]);

  const traceRouteOnReady = useCallback(
    // what is result?
    (result: any) => {
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
    },
    [mapFitted]
  );

  const destination = {
    latitude: parseFloat(location[0].latitude),
    longitude: parseFloat(location[0].longitude),
  };

  // what is icon?
  function CustomMarker({ icon }: any) {
    return <View style={styles.marker}>{icon}</View>;
  }

  return (
    <View style={styles.container}>
      {mapCoordinates ? (
        <MapView
          scrollEnabled={scrollEnabled}
          ref={mapRef}
          minZoomLevel={14}
          maxZoomLevel={18}
          customMapStyle={MapStyle}
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1, position: "relative" }}
          initialRegion={mapCoordinates}
          //onRegionChangeComplete={setMapCoordinates}
        >
          <Marker coordinate={destination}>
            <CustomMarker
              icon={
                <MaterialCommunityIcons name="store" size={24} color="white" />
              }
            />
          </Marker>
          <Marker coordinate={mapCoordinates} anchor={{ x: 0.5, y: 0.5 }}>
            <CustomMarker
              icon={<Entypo name="home" size={24} color="white" />}
            />
          </Marker>
          <MapViewDirections
            origin={mapCoordinates}
            destination={destination}
            apikey={
              process.env.googleDirectionsAPIKey
                ? process.env.googleDirectionsAPIKey
                : ""
            }
            strokeColor="#78DBFF"
            strokeWidth={4}
            onReady={traceRouteOnReady}
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