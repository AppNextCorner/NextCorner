import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

// for bottom modal
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet from '@gorhom/bottom-sheet'
import { StatusBar } from 'expo-status-bar'
import GoogleMapsMenuSection from '../../components/InProgressOrderComponents/GoogleMapsMenuSection'
import { durationFromStore, distanceFromStore } from '../../constants/ApiKeys'
import InProgressList from '../../components/InProgressOrderComponents/InProgressList'
import BottomSheetView from '@gorhom/bottom-sheet'
import { AntDesign, Feather } from '@expo/vector-icons'

/**
 * Used to display the status, map, and the items that are currently in the progress of being made 
 */
const InProgressPage = () => {
  // used to get the current location and duration from the user's home to the business
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);
  const navigation = useNavigation()
  const route = useRoute()

  const returnBack = () => {
    navigation.goBack()
  }

  const { item } = route.params
 
  // items displayed on the Google Maps component after being passed in
  const mapOrderItem = item.singleOrderList.map(location => location.location).flat()

  const bottomSheetRef = useRef(null) // set the initial bottom sheet to have nothing instantly until it is changed

  // first value -> initial value / point to start with on the bottom
  // second value -> final point where the modal is supposed to stop in with snapping to it when near it
  const snapPoints = useMemo(() => ['20%', '100%'], [])
  // callbacks to show the snap points and when the snappoints occur represented by 1 and 0
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index)
  }, [])
  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* //       {/* Helps with the google maps to be able to display it, be able to zoom in and out, and other touchable features */}
        <GestureHandlerRootView style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => returnBack()}
            style={styles.goBackButton}
          >
             <AntDesign name="arrowleft" size={30} color="black" />
          </TouchableOpacity>
          <View style={styles.headerContainer}>
            <Text style={styles.pageHeader}>Your Order</Text>
          </View>
          {/* Google Maps component */}
          <View
            style={{
              flex: 1,
              margin: '2%',
              marginTop: '40%',
              borderRadius: 25,
              overflow: 'hidden',
            }}
          >
            <GoogleMapsMenuSection  location={mapOrderItem} setDuration={setDuration} setDistance={setDistance}/>
          </View>

          {/* Our bottom modal containing the business and each individual menu */}
          <BottomSheet
            ref={bottomSheetRef}
            // where the modal should be located based on the HandleSheetChanges event
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            style={styles.bottomSheetContainer}
            backgroundStyle={styles.bottomSheetContainer}
          >
            {/* The vertical list to encompass all of the content we want to display in the bottom modal */}
            <InProgressList  duration={duration} distance={distance} orderItemDetails={item} />
          </BottomSheet>
        </GestureHandlerRootView>
      </View>
    </>
  )
}

export default InProgressPage

const styles = StyleSheet.create({
  // bottom sheet style
  bottomSheetContainer: {
    overflow: 'hidden',
    backgroundColor: '#78DBFF',
    borderRadius: 20,

  },
  goBackButton: {
    marginTopLeft: '5%',
    marginLeft: '5%',
    marginTop: '10%',
  },
  pageHeader: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: '-35%',
    flexDirection: 'row',
  },
})
