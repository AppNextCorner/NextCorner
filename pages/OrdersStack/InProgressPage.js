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
import React, { useCallback, useMemo, useRef } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet from '@gorhom/bottom-sheet'
import { StatusBar } from 'expo-status-bar'
import GoogleMapsMenuSection from '../../components/GoogleMapsMenuSection'
import VerticalPickUpList from '../../components/VerticalPickUpList'
import BottomSheetView from '@gorhom/bottom-sheet'

const InProgressPage = () => {
  const navigation = useNavigation()
  const route = useRoute()

  const { item } = route.params
  console.log('item from route.params: ', item)

  const bottomSheetRef = useRef(null)

  // first value -> initial value / point to start with on the bottom
  // second value -> final point where the modal is supposed to stop in with snapping to it when near it
  const snapPoints = useMemo(() => ['25%', '100%'], [])
  // callbacks to show the snap points and when the snappoints occur represented by 1 and 0
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index)
  }, [])
  return (
    <>
      <View style={{ flex: 1 }}>
       
        {/* //       {/* Helps with the google maps to be able to display it, be able to zoom in and out, and other touchable features */}
        <GestureHandlerRootView style={{ flex: 1}}>
          {/* Google Maps component */}
          <GoogleMapsMenuSection />
          {/* Our bottom modal containing the restaurants and each individual menu */}
          <BottomSheet
            ref={bottomSheetRef}
            // where the modal should be located based on the HandleSheetChanges event
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            {/* The vertical list to encompass all of the content we want to display in the bottom modal */}
            <VerticalPickUpList orderItemDetails={item} />
          </BottomSheet>
        </GestureHandlerRootView>
      </View>
    </>
  )
}

export default InProgressPage

const styles = StyleSheet.create({})
