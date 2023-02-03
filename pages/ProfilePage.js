/**
 * Purpose of the file: It is our Google Maps page that contains the location of the nearby restaurants and as well as a bottom modal that shows a preview of the nearby restaurant's food items
 * - The user can select a food item to order it or can select the location / restaurant to go to the store menu from the maps or from the "see all" button
 * - Uses BottomSheet npm library to create the bottom modal sheet
 */

import React, { useCallback, useMemo, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet from '@gorhom/bottom-sheet'
import { StatusBar } from 'expo-status-bar'
import GoogleMapsMenuSection from '../components/InProgressOrderComponents/GoogleMapsMenuSection'
import VerticalPickUpList from '../components/InProgressOrderComponents/VerticalPickUpList'
import BottomSheetView from '@gorhom/bottom-sheet'
import { useAppDispatch } from '../store/hook'

// import firebase features 
import { signOut } from 'firebase/auth'
import { auth } from '../App'
import { logOut } from '../store/slices/userSession'

export default function ProfilePage() {
  // initial state of the bottom modal
  const bottomSheetRef = useRef(null)

  // first value -> initial value / point to start with on the bottom
  // second value -> final point where the modal is supposed to stop in with snapping to it when near it
  const snapPoints = useMemo(() => ['25%', '100%'], [])
  // callbacks to show the snap points and when the snappoints occur represented by 1 and 0
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index)
  }, [])
  const dispatch = useAppDispatch();

  const handleSignOutUser = async() => {
    try {
      console.log(auth.currentUser.email)
      dispatch(logOut())
      const result = await signOut(auth)

      console.log('entered sign out functions')
      console.log(auth.currentUser.email)
    } catch (err) {
      console.log(err.message)
    }
  }

  // return (
  //   <>
  //     <StatusBar style="auto" />
  //     <View style={{ flex: 1 }}>
  //       {/* Helps with the google maps to be able to display it, be able to zoom in and out, and other touchable features */}
  //       <GestureHandlerRootView style={{ flex: 1 }}>
  //         {/* Google Maps component */}
  //         <GoogleMapsMenuSection />
  //         {/* Our bottom modal containing the restaurants and each individual menu */}
  //         <BottomSheet
  //           ref={bottomSheetRef}

  //           // where the modal should be located based on the HandleSheetChanges event
  //           index={0}
  //           snapPoints={snapPoints}
  //           onChange={handleSheetChanges}

  //         >
  //           {/* The vertical list to encompass all of the content we want to display in the bottom modal */}
  //           <VerticalPickUpList />
  //         </BottomSheet>
  //       </GestureHandlerRootView>
  //     </View>
  //   </>
  // )
  // return (
  //   <View>
  //               <ScrollView>
  //                   <View style={{padding:10,width:'100%',backgroundColor:'#000',height:150}}>
  //                       <TouchableOpacity>
  //                           <Image source={require('../assets/restaurantImages/redFoodCart.png')}
  //                           style={{ width:30, height:30}}></Image>
  //                           <View></View>
  //                           <View></View>
  //                       </TouchableOpacity>
  //                   </View>
  //                   <View style={{alignItems:'left'}}>
  //                       <Image source={require('../assets/restaurantImages/redFoodCart.png')}style={{width:140,height:140,
  //                       borderRadius:100,marginTop:-70}}></Image>
  //                       <Text style={{fontSize:25,fontWeight:'bold',padding:10}}> Ralph Lopez </Text>
  //                       <Text style={{fontSize:15,fontWeight:'bold',color:'grey'}}> Ralph90062@gmail.com </Text>
  //                   </View>
  //                   <TouchableOpacity style={{
  //                       alignItems:'center',
  //                       justifyContent:'center',
  //                       flexDirection:'row',
  //                       backgroundColor:'white',
  //                       width:'90%',
  //                       padding:20,
  //                       borderRadius:10,
  //                       marginTop:20,
  //                       shadowOpacity:80,
  //                       elevation:15,
  //                   }}>
  //                   <Image source={require('../assets/restaurantImages/redFoodCart.png')}
  //                           style={{ width:30, height:30}}></Image>
  //                           <Text style={{fontSize:15,color:'#818181',fontWeight:'bold',marginLeft:10}}> Profile </Text>

  //                   </TouchableOpacity>

  //                   <TouchableOpacity style={{
  //                       alignItems:'center',
  //                       justifyContent:'center',
  //                       flexDirection:'row',
  //                       backgroundColor:'white',
  //                       width:'90%',
  //                       padding:20,
  //                       borderRadius:10,
  //                       marginTop:20,
  //                       shadowOpacity:80,
  //                       elevation:15,
  //                       marginBottom:40
  //                   }}>
  //                   <Image source={require('../assets/restaurantImages/redFoodCart.png')}
  //                           style={{ width:30, height:30}}></Image>
  //                           <Text style={{fontSize:15,color:'#818181',fontWeight:'bold',marginLeft:10}}> Profile </Text>
  //                   </TouchableOpacity>

  //                   <TouchableOpacity style={{
  //                       alignItems:'center',
  //                       justifyContent:'center',
  //                       flexDirection:'row',
  //                       backgroundColor:'white',
  //                       width:'90%',
  //                       padding:20,
  //                       borderRadius:10,
  //                       marginTop:20,
  //                       shadowOpacity:80,
  //                       elevation:15,
  //                       marginBottom:40,
  //                       backgroundColor:'blue'}}>
  //                           <Text style={{fontSize:15,color:'#fff',fontWeight:'bold',marginLeft:10}}> Logout </Text>
  //                   </TouchableOpacity>
  //               </ScrollView>
  //           </View>
  // )
  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileHeaderContainer}>
        <Text style={styles.profileHeaderText}>Account</Text>
      </View>

      <View style={styles.margin}></View>
      <View style={styles.accountSettingContainer}>
        <Text style={styles.accountSettingText}>Account Settings</Text>
        <View style={styles.logOutContainer}>
          <Pressable style={styles.logOutButton} onPress={() => handleSignOutUser()}>
            <Text style={styles.logOutText}>Log Out</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logOutButton: {
    borderColor: '#f0efed',
    borderWidth: 1,
    padding: '5%',
  },
  logOutContainer: {
    marginTop: '5%',
  },
  accountSettingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  accountSettingContainer: {
    flex: 0,
    margin: '5%',
  },

  profileHeaderContainer: {
    flex: 0,
  },
  // margin for every card to be splitted
  margin: {
    backgroundColor: '#f2f3f5',
    //flex: 1,
    paddingVertical: 5,
  },
  profileHeaderText: {
    margin: '10%',
    marginTop: '30%',
    fontSize: 30,
    fontWeight: 'bold',
  },
  accountSettingHeader: {},
  profileContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
})
