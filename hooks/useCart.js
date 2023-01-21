import { IP } from '../constants/StripeApiKey'
import { firebaseConfig } from '../firebase/firebase-config'
import { fetchCart, addNewCartItem } from '../store/addToCart'
// import { initializeApp } from 'firebase/app'
import { auth } from '../App'
import { useDispatch } from 'react-redux'
import { app } from '../App'
import { getAuth } from 'firebase/auth'

import axios from 'axios'
export default UseCart = () => {
  const auth = getAuth(app)

  // Initialize Firebase

  // Initialize Firebase Authentication and get a reference to the service
  //
  const dispatch = useDispatch()

  const createToken = async () => {
    let user = auth.currentUser
    const token = user && (await user.getIdToken())

    const payloadHeader = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    return payloadHeader
  }
  const url = `http://${IP}:4020/api`

  const getCurrentCartItems = async () => {
    try {
      dispatch(fetchCart())
    } catch (err) {
      console.error('Failed to save the post', err)
    }
  }

  const addToCart = async (item, userId) => {
    const cartItem = {
      cartData: item,
      userId,
    }
    try {
      dispatch(addNewCartItem(cartItem))
    } catch (e) {
      console.error(e)
    }
    // try {
    //   const res = await axios.post(url, item, header)
    //   console.log('item added', item)
    //   return res.data
    // } catch (e) {
    //   console.error(e)
    // }
  }
  return {
    addToCart,
    getCurrentCartItems,
  }
}
