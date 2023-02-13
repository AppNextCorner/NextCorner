/**
 * Purpose of the file: Displays the contents of the current user and be able to log out from the app through out logout slice changing the frontend screen and firebase singOut auth method to log out from the firebase 
 */

import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useAppDispatch, useAppSelector } from '../store/hook'

// import firebase features
import { signOut } from 'firebase/auth'
import { auth } from '../App'
import { getUser, logOut } from '../store/slices/userSession'

export default function ProfilePage() {
  const user = useAppSelector(getUser)
  const dispatch = useAppDispatch()
  // grabs the only user from the array as it has been already filtered out to include the current user
  const mainUser = user[0]
  const handleSignOutUser = async () => {
    try {
      dispatch(logOut())
      const result = await signOut(auth)
      return result
    } catch (err) {
      console.log(err.message)
    }
  }
  return (
    <View style={styles.profileContainer}>
      {/* Name information */}

      <View style={styles.profileHeaderContainer}>
        <Text style={styles.profileHeaderText}>Account</Text>
        <View style={styles.emailContainer}>
          <Text style={styles.nameText}>
            {mainUser.firstName + ' ' + mainUser.lastName}
          </Text>
          {/* Email of the user passed from mongo db user */}
          <Text style={styles.emailText}>{mainUser.email}</Text>
        </View>
      </View>

      <View style={styles.margin}></View>
      <View style={styles.accountSettingContainer}>
        <View style={styles.accountSettingHeaderText}>
          <Text style={styles.accountSettingText}>Account Settings</Text>
        </View>
      </View>
      <View style={styles.accountSettingContainer}>
        {/* Button containers for the page to be in a column */}
        <View style={styles.buttonContainer}>
          <Pressable style={styles.profileButton}>
            <Text style={styles.logOutText}>Profile</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.profileButton}>
            <Text style={styles.logOutText}>Payment Method</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.profileButton}>
            <Text style={styles.logOutText}>Help</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.profileButton}>
            <Text style={styles.logOutText}>Privacy Policy</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.profileButton}>
            <Text style={styles.logOutText}>Settings</Text>
          </Pressable>
        </View>
        <View style={styles.logOutContainer}>
          <Pressable
            style={styles.logOutButton}
            onPress={() => handleSignOutUser()}
          >
            <Text style={styles.logOutTextButton}>Log Out</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  nameText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  // Email
  emailContainer: {
    marginHorizontal: '10%',
    marginVertical: '5%',
  },
  emailText: {},
  // button of the profile page
  logOutTextButton: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  accountSettingHeaderText: {
    marginVertical: '5%',
  },
  profileButton: {
    borderColor: '#f0efed',
    borderWidth: 1,
    padding: '5%',
  },
  logOutContainer: {
    marginTop: '25%',
  },
  logOutButton: {
    padding: '5%',
    backgroundColor: '#78DBFF',
    borderRadius: 20,
  },
  accountSettingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  accountSettingContainer: {
    flex: 0,
    marginHorizontal: '5%',
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
    marginHorizontal: '10%',
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
