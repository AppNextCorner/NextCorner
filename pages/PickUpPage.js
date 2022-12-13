import React, { useCallback, useMemo, useRef } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { useBottomSheet} from '@gorhom/bottom-sheet'

import GoogleMapsMenuSection from '../components/GoogleMapsMenuSection'
import PickUpHorizontalList from '../components/PickUpHorizontalList';
import VerticalPickUpList from '../components/VerticalPickUpList';

export default function PickUpPage() {
  const bottomSheetRef = useRef(null);

  // first value -> initial value / point to start with on the bottom 
  // second value -> final point where the modal is supposed to stop in with snapping to it when near it
  const snapPoints = useMemo(() => ['25%', '100%'], [])

  const handleClosePress = () => bottomSheetRef.current.close()

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index)
  }, [])

  // renders

  return (
    <View style={{flex: 1}}>
      
      

      
        <GestureHandlerRootView style={{ flex: 1, }}>
        <GoogleMapsMenuSection  />
          
          <BottomSheet
          
            ref={bottomSheetRef}
            // presents where to start  with
            
            // changes where to start with
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            
            handleIndicatorStyle={{ display: "none" }}
          >
            <View style={styles.contentContainer}>
              
              <Text>Awesome 🎉</Text>
              <VerticalPickUpList />

            </View>
          </BottomSheet>
          
        </GestureHandlerRootView>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
})
