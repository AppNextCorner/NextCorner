import React, { useEffect, useState } from 'react'
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps'

import { StyleSheet, View} from 'react-native'
import  MapStyle from '../constants/MapStyle.json'
import * as Location from 'expo-location'


export default function GoogleMapsMenuSection() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 30.78825,
    longitude: -1.4324,
    latitudeData: 0.0922,
    longitudeData: 0.0421,
  })
  
  const userLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if( status !== 'granted') {
      setErrorMsg('Permissionto access location was denied');
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0106,
      longitudeDelta: 0.0121,
    });
    
  }

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View style={styles.container}>
      
      <MapView
        customMapStyle={MapStyle}
        region={mapRegion}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={{ flex: 1}}
      />

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
  
  }

})
