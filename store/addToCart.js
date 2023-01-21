/**
 * Purpose of file: Contains our slice to use for our state
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { firebaseConfig } from '../firebase/firebase-config'

import { IP } from '../constants/StripeApiKey'
import { auth } from '../App'

const POSTS_URL = `http://${IP}:4020/api`

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

export const fetchCart = createAsyncThunk('addToCart/fetchCart', async () => {
  const headers = await createToken()
  console.log('headers', headers.headers)
  try {
    console.log('Here is headers: ', headers)
    const response = await axios.get(POSTS_URL, headers)
    console.log('Here is response data: ', response.data)
    return response.data // Return a value synchronously using Async-await
  } catch (err) {
    if (!err.response) {
      console.log(err.response)
      throw err
    }
  }
})

export const addNewCartItem = createAsyncThunk(
  'addToCart/addNewCartItem',
  async (cartItem) => {
    const headers = await createToken()
    console.log('payload item: ', cartItem)
    // It isn't clear if you intended to use 'newUser' in this function or not.
    // But it is sent from your 'signupBtn' event handler function when
    // dispatch(registerNewUser(newUser)) is called.

    try {
      console.log('payloadffff: ', cartItem)
      const resp = await axios.post(POSTS_URL, cartItem, headers)
      console.log('Here is response: ', resp.data)
      console.log('cart data from post: ', cartItem['item'].cartData)
      return resp.data
    } catch (error) {
      console.log('error')
    }
  },
)
// console.log('ADDED', addNewPost)

// setting the default state for the app
const initialState = {
  cartButton: false, // user is not logged in by default
  cart: [],
  order: [],
  total: 0,
  status: 'idle',
  error: null,
}

// create a slice object to store the state -> creates action creators for each case inside reducers and can safely mutate the state
export const addToCart = createSlice({
  // prefix for generated action types
  name: 'addToCart',
  // initial state of the reducer
  initialState,
  // object where the keys are strings and the values are functions that handle specific actions
  reducers: {
    setOrder: (state, { payload }) => {
      console.log('here is order')
      console.log(payload.order)
      console.log('HERE is order cart right now')
      let removeCart = state.cart.splice(0, state.cart.length)
      let order = state.order.push(payload.order)
      console.log(state.order)
      state.cartButton = false
    },
    // case reducer functions
    // action is what values we want to assign the state to and receive it from payload
    setCart: (state, action) => {
      console.log('DATA SENT', action.payload)

      // when user logs in, update logged in state by assigning it a new value -> could do more actions such as push to an array, but it all depends on the data type and current state

      // assign the null value of the user to the value we get from the setUser dispatch method
      const mapCart = state.cart.map((itemList) => itemList.cartData)

      const mapCartMenuItem = mapCart.map((item) => item.customizations).flat()
      //const mapCartOptions = mapCartMenuItem
      // .map((item) => item.customizations)

      //const mapCartOptionsMenuItem = mapCartOptions.map((item) => item.selected)

      console.log('HERE IS OPTIONS', mapCartMenuItem)
      console.log('payload of customizations', action.payload.customizations)

      const cartItem = mapCart.find(
        (item) => item.itemId === action.payload.id,
        // &&
        // item
        //   .map((object) => object.customizations)
        //   .flat()
        //   .map((object) => object.selected) === action.payload.customizations,
      )
      const index = mapCart.indexOf(cartItem)
      if (index > -1) {
        cartItem.amountInCart += 1
        // only splice array when item is found
        mapCart.splice(index, 1) // 2nd parameter means remove one item only
      } else {
        state.cart.push(action.payload)
      }

      console.log('MAPCART:', mapCart)
      if (state.cart.length > 0) {
        state.cartButton = true
      } else {
        state.cartButton = false
      }
      console.log('CURRENT STATE OF CART', state.cart)
    },
    orderPlaced: (state) => {
      // when user logs in, update logged in state
      if (state.cart.length == 0) {
        state.cartButton = false
      } else {
        state.cartButton = true
      }
    },

    increaseInFoodDetails: (state, { payload }) => {
      payload.amountInCart += 1
      console.log(payload.amountInCart)
    },

    increase: (state, { payload }) => {
       // get the data of each object in the state array
       const mapCart = state.cart.map((itemList) => itemList.cartData)
       //
       const cartItem = mapCart.find((item) => item.itemId === payload.id)
       // function to remove the item from the state array with the find index method
       function removeObjectWithId(arr, id) {
         const mapAnotherCart = arr.map((item) => item.cartData)
         // find the index of the item in the array that the item belongs to with the given id from the payload
         const objWithIdIndex = mapAnotherCart.findIndex(
           (obj) => obj.itemId === id,
         )
         // confirm if the item exists in the array
         if (objWithIdIndex > -1) {
           // if the item is already in the array, remove it from the array with the index found
           arr.splice(objWithIdIndex, 1)
         }
         // mutated the array to avoid copying the original / modified array
         return arr
       }
       // checks if the object property is below or over 1 to either eliminate it from the array with the removeObjectWithId function
       if (cartItem.amountInCart - 1 < 1) {
         // pass the global state to the removeObjectWithId function to mutate the array and the payload if to remove the item from the array
         removeObjectWithId(state.cart, payload.id)
       } else if (cartItem.amountInCart >= 1) {
         // remove the item from the cart item counter
         cartItem.amountInCart += 1
       }
    },
    // status: completed
    decrease: (state, { payload }) => {
      // get the data of each object in the state array
      const mapCart = state.cart.map((itemList) => itemList.cartData)
      //
      const cartItem = mapCart.find((item) => item.itemId === payload.id)
      // function to remove the item from the state array with the find index method
      function removeObjectWithId(arr, id) {
        const mapAnotherCart = arr.map((item) => item.cartData)
        // find the index of the item in the array that the item belongs to with the given id from the payload
        const objWithIdIndex = mapAnotherCart.findIndex(
          (obj) => obj.itemId === id,
        )
        // confirm if the item exists in the array
        if (objWithIdIndex > -1) {
          // if the item is already in the array, remove it from the array with the index found
          arr.splice(objWithIdIndex, 1)
        }
        // mutated the array to avoid copying the original / modified array
        return arr
      }
      // checks if the object property is below or over 1 to either eliminate it from the array with the removeObjectWithId function
      if (cartItem.amountInCart - 1 < 1) {
        // pass the global state to the removeObjectWithId function to mutate the array and the payload if to remove the item from the array
        removeObjectWithId(state.cart, payload.id)
      } else if (cartItem.amountInCart >= 1) {
        // remove the item from the cart item counter
        cartItem.amountInCart -= 1
      }
    },
    // WORK IN PROGRESS
    calculateTotals: (state) => {
      const mapCart = state.cart.map((itemList) => itemList.cartData)
      let total = 0
      for (let i = 0; i < mapCart.length; i++) {
        total += Number(mapCart[i].price * mapCart[i].amountInCart)
      }
      console.log(total)
      state.total = total
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state, { payload }) => {
      console.log('pending')
    })
    builder.addCase(fetchCart.rejected, (state, { payload }) => {
      console.log('Rejected')
    })
    builder.addCase(fetchCart.fulfilled, (state, { payload }) => {
      state.cartButton = true
      console.log('payload from backend', payload)
      state.cart = state.cart.concat(payload).filter(uidItem => uidItem.userId === auth.currentUser.uid)
      
      console.log('Cart state: ', state.cart)
    })
    builder.addCase(addNewCartItem.pending, (state, { payload }) => {
      console.log('pending')
    })
    builder.addCase(addNewCartItem.rejected, (state, { payload }) => {
      console.log('Rejected')
    })
    builder.addCase(addNewCartItem.fulfilled, (state, { payload }) => {
      state.cartButton = true
      console.log('payload from backend', payload)
      //state.cart = state.cart.concat(payload)

    })
  },

  // Thunk API requests
})

// export the case / function action from the userSession and access the object
export const {
  setCart,
  orderPlaced,
  increase,
  decrease,
  calculateTotals,
  setOrder,
  increaseInFoodDetails,
} = addToCart.actions

// create getters

// get the user loggedInSTate whether it is true or false and the value of the user -> USED MOSTLY FOR USEAPPSELECTOR methods
// export state values through a function
export const getButton = (state) => state.addToCart.cartButton
export const getCart = (state) => state.addToCart.cart
export const getTotal = (state) => state.addToCart.total
export const getOrder = (state) => state.addToCart.order

// export the reducer of the slice
export default addToCart.reducer
