import React, { useEffect, useState, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import MapStyle from "../../constants/MapStyle.json";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { googleDirectionsAPIKey } from "@env";

// icons
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";


export default function GoogleMapsMenuSection(props) {
  const [mapFitted, setMapFitted] = useState(false);

  // used for differentiating the in progress orders through our maps on InProgress page and the InProgress cards
  const { time, location, setDuration, setDistance, scrollEnabled, pointerEvents } =
    props;
  // if the google maps api fails or the user does not have permission, then display this location
  const [mapRegion, setMapRegion] = useState({
    latitude: parseFloat(location[0].latitude),
    longitude: parseFloat(location[0].longitude),
    latitudeData: 0.0922,
    longitudeData: 0.0421,
  });
  const delay = 2;
  const [show, setShow] = useState(false);
  const [viewLocation, setViewLocation] = useState(false);
  // Helps to instantly create a new location
  const mapRef = useRef();
  // takes in result which has duration and distance properties
  const traceRouteOnReady = (result) => {
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
      setMapFitted(true); // Set the state variable to indicate that the map coordinates have been fitted
    }
  };
  

  // use an async function to immediately get the user's approval to use maps rather than having to wait for other functions
  const userLocation = async () => {
    // ask the user for permission from Expo location library -> get status from the permissions
    let { status } = await Location.requestForegroundPermissionsAsync();

    // if the user does not agree for permissions, then display and error message to the user
    if (status !== "granted") {
      setErrorMsg("Permissionto access location was denied");
    }

    // after the user has agreed for permission to access their location, begin to get their current position and store it in a variable to use its properties
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    // setting the location with the current position of the device
    setMapRegion({
      // Get location from the object data we received from the position async and set the previous latitude and longitude of the previous state mapRegion, to the current location
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      // distance from the map center to the current location
      latitudeDelta: 0.0106,
      longitudeDelta: 0.0121,
    });
    console.log(mapRegion)
    // After getting the necessary information, we can show the map
    setViewLocation(true);
  };

  // The location of the business coming from the database and turning it to a float
  const destination = {
    latitude: parseFloat(location[0].latitude),
    longitude: parseFloat(location[0].longitude),
  };

  useEffect(() => {
    let timer = null;
    const timeLimit = time; // Set the time limit in seconds
    const updateInterval = 1 * 1000; // Convert to milliseconds
  
    const updateUserLocation = () => {
      // Add your logic to update the user location here
      userLocation();
    };
  
    const stopUpdatingUserLocation = () => {
      clearTimeout(timer);
    };
  
    const startUpdatingUserLocation = () => {
      updateUserLocation();
      timer = setTimeout(() => {
        stopUpdatingUserLocation();
      }, timeLimit * 1000);
    };
  
    const intervalTimer = setInterval(() => {
      updateUserLocation();
    }, updateInterval);
  
    startUpdatingUserLocation();
  
    // Clean up the timers when the component unmounts
    return () => {
      clearInterval(intervalTimer);
      stopUpdatingUserLocation();
    };
  }, []);
  
  
  // after the page is loaded, call the async function to update the location of the user
  // The function runs asynchronously, meaning that the location will be updated and need to render again after the location is updated
  // useEffect(() => {
  //   userLocation();

  //   let timer1 = setTimeout(() => {
  //     userLocation();
  //   }, delay * 1000);

  //   // this will clear Timeout
  //   // when component unmount like in willComponentUnmount
  //   // and show will not change to true
  //   return () => {
  //     clearTimeout(timer1);
  //   };
  // }, []);

  // Create the component for the business icon for the map
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
  // Create the component for the user icon for the map
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
          pointerEvents={pointerEvents}
          scrollEnabled={scrollEnabled}
          ref={mapRef} // reference to the map view for the markers and tracker
          minZoomLevel={12} // default => 0
          maxZoomLevel={18} // default => 20
          // passing the json map styles to the customMapStyle property to update the style of the map according to the json map styles
          customMapStyle={MapStyle}
          // after the state of mapRegion is updated from the async function of userLocation() -> display the region according to the location
          region={mapRegion}
          // provider helps IOS to be able to use google maps
          provider={PROVIDER_GOOGLE}
          // show a blue icon of the user on the map
          //showsUserLocation={true}
          style={{ flex: 1 }}
        >
          <Marker coordinate={destination}>
            {/* CustomMarker has to be a child of Marker*/}
            <CustomMarker />
          </Marker>
          <Marker coordinate={mapRegion}>
            {/* CustomMarker has to be a child of Marker*/}
            <CustomUserMarker />
          </Marker>
          <MapViewDirections
            origin={mapRegion}
            destination={destination}
            apikey={googleDirectionsAPIKey}
            strokeColor="#78DBFF"
            strokeWidth={4}
            onReady={(result) => {
              traceRouteOnReady(result);
            }}
            //onReady={(result) => traceRouteOnReady(result)}
          />
        </MapView>
      ) : (
        <Text>Waiting for Maps</Text>
      )}

      {/* <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details)
          }}
          query={{
            key: { PROVIDER_GOOGLE },
            language: 'en',
          }}
        />
      </View> */}
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
