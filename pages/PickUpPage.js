/**
 * Purpose of the file: It is our Google Maps page that contains the location of the nearby restaurants and as well as a bottom modal that shows a preview of the nearby restaurant's food items
 * - The user can select a food item to order it or can select the location / restaurant to go to the store menu from the maps or from the "see all" button
 * - Uses BottomSheet npm library to create the bottom modal sheet
 */

import React, { useCallback, useMemo, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet from '@gorhom/bottom-sheet'
import { StatusBar } from 'expo-status-bar'
import GoogleMapsMenuSection from '../components/GoogleMapsMenuSection'
import VerticalPickUpList from '../components/VerticalPickUpList'
import BottomSheetView from '@gorhom/bottom-sheet'
export default function PickUpPage() {
  // initial state of the bottom modal
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
      <StatusBar style="auto" />
      <View style={{ flex: 1 }}>
        {/* Helps with the google maps to be able to display it, be able to zoom in and out, and other touchable features */}
        <GestureHandlerRootView style={{ flex: 1 }}>
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
            <VerticalPickUpList />
          </BottomSheet>
        </GestureHandlerRootView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
})
