import React, { useEffect, useState } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import MapStyle from '../../constants/MapStyle.json'
import * as Location from 'expo-location'
import MapViewDirections from 'react-native-maps-directions'

export default function GoogleMapsMenuSection() {
  // if the google maps api fails or the user does not have permission, then display this location
  const [mapRegion, setMapRegion] = useState({
    latitude: 30.78825,
    longitude: -1.4324,
    latitudeData: 0.0922,
    longitudeData: 0.0421,
  })

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
const destination = {latitude: 37.771707, longitude: -122.4053769}
  // after the page is loaded, call the async function to update the location of the user
  useEffect(() => {
    userLocation()
  }, [])
  

  return (
    <View style={styles.container}>
      
      <MapView
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
        {/* <MapViewDirections
            origin={mapRegion}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeColor="#6644ff"
            strokeWidth={4}
            //onReady={traceRouteOnReady}
          /> */}
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
    zIndex: 2
  },
})
