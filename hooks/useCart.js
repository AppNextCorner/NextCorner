import { IP } from '../constants/StripeApiKey'
import { firebaseConfig } from '../firebase/firebase-config'
import { useAppSelector, useAppDispatch } from '../store/hook'
import {
  fetchCart,
  addNewCartItem,
  updateCartItemAmount,
  getCart,
  updateRemoveCartItemAmount,
  deleteItem,
  deleteItemReducer,
} from '../store/slices/addToCart'
// import { initializeApp } from 'firebase/app'
import { auth } from '../App'
import { useDispatch } from 'react-redux'
import { app } from '../App'
import { getAuth } from 'firebase/auth'
export default UseCart = () => {
  const auth = getAuth(app)

  // Initialize Firebase

  // Initialize Firebase Authentication and get a reference to the service
  //
  const dispatch = useDispatch()
  const findAmount = useAppSelector(getCart)

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
      await dispatch(fetchCart())
    } catch (err) {
      console.error('Failed to save the post', err)
    }
  }

  const addToCart = async (item, userId, businessOrderedFrom, location, logo) => {
    console.log("adding to cart", location)
    const cartItem = {
      cartData: item,
      businessOrderedFrom,
      userId,
      location: location,
      logo: logo
    }
    try {
      await dispatch(addNewCartItem(cartItem))
      
    } catch (e) {
      console.error(e)
    }
  }
  const deleteCartData = async (id) => {
    try{
      dispatch(
        deleteItemReducer(id),
      )
      await dispatch(deleteItem(id));
    }
    catch (e) {
      console.log(e);
    }
  }
// takes in the updated object and the item id to be updated 
  const updateCartItemData = async (updateItem) => {
    console.log('run updateCartItemData')
    const cartItem = {
      updatedItem: updateItem.updatedCartItem,
      id: updateItem.id,
    }

    console.log(cartItem.updatedItem)
    // find the item in the cart items list and look for the one that matches the updated item
    const cartItemMap = findAmount.find((item) => item.id === updateItem.id)

    if (
      updateItem.updatedCartItem.amountInCart - 1 ===
      cartItemMap.cartData.amountInCart
    ) {
      // increment the amount of one cart item
      dispatch(updateCartItemAmount(cartItem))
    } else {
      // if less
      if (cartItemMap.cartData.amountInCart <= 1) {
        
        //removeObjectWithId(findAmount, updateItem.id)
        dispatch(
          deleteItemReducer({
            id: updateItem.id,
          }),
        )
        dispatch(deleteItem(cartItem))
        // findAmount = findAmount.filter(
        //   (cartItemId) => cartItemId.id !== updateItem.id,
        // )
      } else if (cartItemMap.cartData.amountInCart >= 1) {
        console.log('run')
        console.log(cartItemMap)
        dispatch(updateRemoveCartItemAmount(cartItem))
      }
    }
  }
  return {
    addToCart,
    getCurrentCartItems,
    updateCartItemData,
    deleteCartData 
  }
}
