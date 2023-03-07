import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Alert } from 'react-native'
import { useAppDispatch } from '../store/hook'
import { createUser, getUsers } from '../store/slices/userSession'
const useAddUser = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation();

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
      console.log('ran useAddUser')
      console.log(firstName, lastName, email, password, phoneNumber)

      await dispatch(createUser(userData))
      
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
