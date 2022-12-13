import React from 'react'
import MapView, { PROVIDER_GOOGLE, mapRegion} from 'react-native-maps'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { StyleSheet, View, Dimensions } from 'react-native'



// grab the screen of the current device
const { width, height } = Dimensions.get('window')

// grab the screen size of the current device
const ASPECT_RATIO = width / height

//
const LATITUDE_DELTA = 0.02

// gives the zoom factor
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const INITIAL_POSITION = {
  latitude: 40.76711,
  longitude: -73.979704,
  latitudeData: LATITUDE_DELTA,
  longitudeData: LONGITUDE_DELTA,
}

export default function GoogleMapsMenuSection() {
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={INITIAL_POSITION}
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
