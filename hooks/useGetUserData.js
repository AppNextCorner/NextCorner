import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getUsers, setUser, logOut } from '../store/slices/userSession'
import { onAuthStateChanged } from 'firebase/auth'
import { useAppDispatch } from '../store/hook'
import { fetchCart } from '../store/slices/addToCart'
import { getAuth } from 'firebase/auth'
import { getOrderList } from '../store/slices/addToOrders'

/**
 * Hook used to configure the user slice on redux by fetching the user data from the mongodb server and firebase auth to be able to access the data for that user from redux
 * 
 * @returns isDone - used to confirm that the authentication process has been completed
 */
const useGetUserData = () => {
  const [isDone, setIsDone] = useState(false) // runs when the authentication has been initialized whether a user is authenticated or not

  const dispatch = useAppDispatch()

  /**
   * Call the redux slice to send a request to grab the authenticated information from the mongodb server
   */
  const getLoggedInUserData = async () => {
    try {
      await dispatch(getUsers())
    } catch (err) {
      console.log('no users found with this email address', err)
    }
  }
  

  useEffect(() => {
    const auth = getAuth()

    async function fetchUserAsync() {
      // after user is confirmed, grab their data 
      try {
        const userData = await getLoggedInUserData()
        dispatch(setUser(userData)) // set the user data to the slice 
        dispatch(fetchCart())
        dispatch(getOrderList())
      } catch (e) {
        console.log(e)
      }
    }

    /**
     * checkiing if the user is authenticated in firebase, and if so, then fetch the data of the user
     */
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        fetchUserAsync()
        setIsDone(true)
      } else {
        // User is signed out
        dispatch(logOut()) 
        setIsDone(true)
      }
    })
  }, [])
  return {
    isDone,
  }
}

export default useGetUserData
