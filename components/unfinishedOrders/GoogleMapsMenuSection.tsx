import React, { useEffect, useState, useRef, useCallback, Dispatch, SetStateAction } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import MapStyle from "../../constants/MapStyle.json";
import MapViewDirections from "react-native-maps-directions";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import {location} from '../../typeDefinitions/interfaces/location.interface'
import { mapRegion } from "../../typeDefinitions/interfaces/mapRegion.interface";
import { vendorStructure } from "../../typeDefinitions/interfaces/IVendor/vendorStructure";
import { useRoute } from "@react-navigation/native";

interface Props {
  time?: vendorStructure;
  location?: location;
  userLocation: location;
  scrollEnabled?: boolean;
  pointerEvents?: string;
  setDuration: Dispatch<SetStateAction<number>>;
  setDistance: Dispatch<SetStateAction<number>>;
}
export default function GoogleMapsMenuSection(props: Props) {
  const { userLocation, location, setDuration, setDistance, scrollEnabled } = props;

  const [mapFitted, setMapFitted] = useState(false);
  const mapRef = useRef<any>(location);
  const route = useRoute();
  // useEffect(() => {
  //   console.log('running changes in params')
  //   // Logic to handle changes in userLocation or location
  //   // This will run whenever userLocation or location changes
  //   // Update your UI or perform any necessary logic here
  // }, [userLocation, location]);

  // Check the region of the user
  useEffect(() => {
    const callback = (newRegion: mapRegion) => {
      console.log("new region:", newRegion);
    };
    console.log('route: ', route.name)
    if (route.name === "Orders" && location && typeof callback === "function") {
      callback(location as any);
    }
  }, [route.name, location]);

  // Create a route
  const traceRouteOnReady = useCallback(
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

  const destination: location = {
    latitude: location!.latitude,
    longitude: location!.longitude
  };

  // what is icon?
  function CustomMarker({ icon }: any) {
    return <View style={styles.marker}>{icon}</View>;
  }

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          scrollEnabled={scrollEnabled}
          ref={mapRef}
          minZoomLevel={14}
          maxZoomLevel={18}
          customMapStyle={MapStyle}
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1, position: "relative" }}
          initialRegion={userLocation as any}
          //onRegionChangeComplete={setMapCoordinates}
        >
          <Marker coordinate={destination as any}>
            <CustomMarker
              icon={
                <MaterialCommunityIcons name="store" size={24} color="white" />
              }
            />
          </Marker>
          <Marker coordinate={userLocation as any} anchor={{ x: 0.5, y: 0.5 }}>
            <CustomMarker
              icon={<Entypo name="home" size={24} color="white" />}
            />
          </Marker>
          <MapViewDirections
            origin={userLocation as any}
            destination={location as any}
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