import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getUsers, setUser, logOut } from '../store/slices/userSession'
import { onAuthStateChanged } from 'firebase/auth'
import { useAppDispatch } from '../store/hook'
import { fetchCart } from '../store/slices/addToCart'
import { getAuth } from 'firebase/auth'
import { getOrderList } from '../store/slices/addToOrders'

const useGetUserData = () => {

  const [isDone, setIsDone] = useState(false)

  const dispatch = useAppDispatch()

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
      try {
        const userData = await getLoggedInUserData()
        dispatch(setUser(userData))
        dispatch(fetchCart())
        dispatch(getOrderList())
      } catch (e) {
        console.log(e)
      }
    }

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

