import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Alert } from 'react-native'
import { useAppDispatch } from '../store/hook'
import { createUser } from '../store/slices/userSession';

/**
 * This hook shall help developers add a user to the firebase account
 *
 */
const useAddUser = () => {
  // User sessions using dispacth hook
  const dispatch = useAppDispatch()
  const navigation = useNavigation();

  /**
   * make user will ensure that user submits all fields that include the following:
   * 
   * @param firstName - the user that signs up for the first time
   * @param lastName 
   * @param email 
   * @param password 
   * @param phoneNumber 
   */
  const makeUser = async (
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
  ) => {
    const userData = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    }
    try {


      await dispatch(createUser(userData)) // wait for user to be created in the backend
      
    } catch (err) {
      console.log('user was not created', err)
    }
  }

  return {
    makeUser,
  }
}
// exporting
export default useAddUser
