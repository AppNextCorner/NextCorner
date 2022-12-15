import React, { useCallback, useMemo, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet from '@gorhom/bottom-sheet'
import { StatusBar } from 'expo-status-bar'
import GoogleMapsMenuSection from '../components/GoogleMapsMenuSection'
import VerticalPickUpList from '../components/VerticalPickUpList'
import BottomSheetView from '@gorhom/bottom-sheet'
export default function PickUpPage() {
  const bottomSheetRef = useRef(null)

  // first value -> initial value / point to start with on the bottom
  // second value -> final point where the modal is supposed to stop in with snapping to it when near it
  const snapPoints = useMemo(() => ['25%', '100%'], [])
  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index)
  }, [])

  // renders

  return (
    <>
      <StatusBar style="auto" />
      <View style={{ flex: 1 }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <GoogleMapsMenuSection />

          <BottomSheet
          
            ref={bottomSheetRef}
            // presents where to start  with
                
            // changes where to start with
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            handleIndicatorStyle={{ display: 'none' }}
          >
            
              
              <VerticalPickUpList  />
            
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
