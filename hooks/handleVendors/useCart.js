import { useAppSelector, useAppDispatch } from '@store/hook'
import {
  fetchCart,
  addNewCartItem,
  updateCartItemAmount,
  getCart,
  updateRemoveCartItemAmount,
  deleteItem,
  deleteItemReducer,
  deleteItemAfterOrder,
} from '@store/slices/addToCart'

/**
 * create a cart item and be able to increment/decrement amount of item, delete, and create a new item into our redux cart slice - handles sending the data to the slice
 */
export default UseCart = () => {
  const dispatch = useAppDispatch()
  const getCartFromSlice =  useAppSelector(getCart);
  const findAmount = JSON.parse(JSON.stringify(getCartFromSlice))
 // getting the amount of the item in the cart to change the visual part of the cart

  const getCurrentCartItems = async () => {
    try {
      await dispatch(fetchCart())
    } catch (err) {
      console.error('Failed to save the post', err)
    }
  }

  const addToCart = async (
    item,
    userId,
    businessOrderedFrom,
    location,
  ) => {
    /**
     * - Grabs location and logo for the google maps service
     * - businessOrderedFrom - data used to check if the business has already been added
     */
    const cartItem = {
      cartData: item,
      businessOrderedFrom,
      userId,
      location: location,
    }
    try {
      await dispatch(addNewCartItem(cartItem))
    } catch (e) {
      console.error(e)
    }
  }
  const deleteCartData = async (item) => {
    const idObject = {
      id: item.id,
    }
    try {
      await dispatch(deleteItem(idObject))
      dispatch(deleteItemAfterOrder(idObject))
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Be able to increment the cart item count 
   * @param {Object} updateItem - The updated item that was incremented in their amountIncart
   */
  const updateCartItemData = async (updateItem) => {
    
    const cartItem = {
      updatedItem: updateItem.updatedCartItem,
      id: updateItem.id,
    }
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
        dispatch(
          deleteItemReducer({
            id: updateItem.id,
          }),
        )
        dispatch(deleteItem(cartItem))
      } else if (cartItemMap.cartData.amountInCart >= 1) {

        dispatch(updateRemoveCartItemAmount(cartItem))
      }
    }
  }
  return {
    addToCart,
    getCurrentCartItems,
    updateCartItemData,
    deleteCartData,
  }
}
