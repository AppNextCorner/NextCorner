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
import { AntDesign } from '@expo/vector-icons'

const InProgressPage = () => {
  const navigation = useNavigation()
  const route = useRoute()

  const returnBack = () => {
    console.log('returning back')
    navigation.goBack()
  }

  const { item } = route.params
  console.log('item from route.params: ', item)

  const bottomSheetRef = useRef(null)

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
            <AntDesign name="leftcircle" size={35} color="black" />
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
            <GoogleMapsMenuSection />
          </View>

          {/* Our bottom modal containing the restaurants and each individual menu */}
          <BottomSheet
            ref={bottomSheetRef}
            // where the modal should be located based on the HandleSheetChanges event
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            style={styles.bottomSheetContainer}
            backgroundStyle={styles.bottomSheetContainer}
          >
            {/* <BottomSheetView>
              <Text>d</Text>
            </BottomSheetView> */}
            {/* The vertical list to encompass all of the content we want to display in the bottom modal */}
            <VerticalPickUpList orderItemDetails={item} />
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
    backgroundColor: '#424242',
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
