import React, { useEffect, useState, useRef } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native'
import MapStyle from '../../constants/MapStyle.json'
import * as Location from 'expo-location'
import MapViewDirections from 'react-native-maps-directions'
import { googleDirectionsAPIKey } from '../../constants/GoogleMapsInfo'


export default function GoogleMapsMenuSection(props) {
  const { location, logo, setDuration, setDistance } = props
  // if the google maps api fails or the user does not have permission, then display this location
  const [mapRegion, setMapRegion] = useState({
    latitude: parseFloat(location[0]),
    longitude: parseFloat(location[1]),
    latitudeData: 0.0922,
    longitudeData: 0.0421,
  })
  const mapRef = useRef()

  const { width, height } = Dimensions.get('window')
  const traceRouteOnReady = (result) => {
    // args.distance
    // args.duration

    setDistance(result.distance)
    setDuration(result.duration)
    mapRef.current?.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: (width / 20),
        bottom: (height / 20),
        left: (width / 20),
        top: (height / 20),
      }
    }
    )
  }

  // use an async function to immediately get the user's approval to use maps rather than having to wait for other functions

  const userLocation = async () => {
    // ask the user for permission from Expo location library -> get status from the permissions
    let { status } = await Location.requestForegroundPermissionsAsync()

    // if the user does not agree for permissions, then display and error message to the user
    if (status !== 'granted') {
      setErrorMsg('Permissionto access location was denied')
    }

    // after the user has agreed for permission to access their location, begin to get their current position and store it in a variable to use its properties
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    })
    console.log(location)

    setMapRegion({
      // Get location from the object data we received from the position async and set the previous latitude and longitude of the previous state mapRegion, to the current location
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      // distance from the map center to the current location
      latitudeDelta: 0.0106,
      longitudeDelta: 0.0121,
    })
  }
  console.log(mapRegion)
  const destination = {
    latitude: parseFloat(location[0]),
    longitude: parseFloat(location[1]),
  }
  console.log(
    'desination: ' + destination.latitude + ' ' + destination.longitude,
  )
  // after the page is loaded, call the async function to update the location of the user
  useEffect(() => {
    userLocation()
  }, [])
  console.log('logo', logo[0])
  function CustomMarker() {
    return (
      <View style={styles.marker}>
        <Text>Hello</Text>
        <Image style={{ width: 50, height: 50 }} source={logo[0]} />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <MapView
      ref={mapRef}
        minZoomLevel={15} // default => 0
        maxZoomLevel={18} // default => 20
        // passing the json map styles to the customMapStyle property to update the style of the map according to the json map styles
        customMapStyle={MapStyle}
        // after the state of mapRegion is updated from the async function of userLocation() -> display the region according to the location
        region={mapRegion}
        // provider helps IOS to be able to use google maps
        provider={PROVIDER_GOOGLE}
        // show a blue icon of the user on the map
        showsUserLocation={true}
        style={{ flex: 1 }}
      >
         <Marker coordinate={destination}>
            {/* CustomMarker has to be a child of Marker*/}
            <CustomMarker />
          </Marker>
        <MapViewDirections
          origin={mapRegion}
          destination={destination}
          apikey={googleDirectionsAPIKey}
          strokeColor="#78DBFF"
          strokeWidth={4}
          onReady={(result) => {

            traceRouteOnReady(result)
          }}
          //onReady={(result) => traceRouteOnReady(result)}
        />
      </MapView>

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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    position: 'absolute',
    width: '90%',
    backgroundColor: '#fff',
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'red',
    zIndex: 2,
  },
})
