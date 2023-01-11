/**
 * Purpose of file: Contains our slice to use for our state
 */

import { createSlice } from '@reduxjs/toolkit'

// setting the default state for the app
const initialState = {
  cartButton: false, // user is not logged in by default
  cart: [
    // {
    //   name: "Coffee",
    //   quantity: 1,
    //   price: 2.99,
    //   customizations: [
    //     {
    //       size: "m",
    //     },
    //   ],
    // },
  ],
  total: 0,
}

// create a slice object to store the state -> creates action creators for each case inside reducers and can safely mutate the state
export const addToCart = createSlice({
  // prefix for generated action types
  name: 'addToCart',
  // initial state of the reducer
  initialState,
  // object where the keys are strings and the values are functions that handle specific actions
  reducers: {
    // case reducer functions
    // action is what values we want to assign the state to and receive it from payload
    setCart: (state, action) => {
      console.log('DATA SENT', action.payload)
      // when user logs in, update logged in state by assigning it a new value -> could do more actions such as push to an array, but it all depends on the data type and current state

      // assign the null value of the user to the value we get from the setUser dispatch method
      const mapCart = state.cart.map((itemList) => itemList.cartData)

     
      
      const cartItem = mapCart.find((item) => item.itemId === action.payload.id )
      const index = mapCart.indexOf(cartItem)
      if (index > -1) {
        cartItem.amountInCart += 1
        // only splice array when item is found
        mapCart.splice(index, 1) // 2nd parameter means remove one item only
      }
      else {
        state.cart.push(action.payload)
      }
      
      console.log('MAPCART:', mapCart)

      state.cartButton = true

      console.log('CURRENT STATE OF CART', state.cart)
    },
    orderPlaced: (state) => {
      // when user logs in, update logged in state
      state.cartButton = false
      state.cart = null
    },
    increase: (state, { payload }) => {
      const mapCart = state.cart.map((itemList) => itemList.cartData)
      console.log(mapCart)
      const cartItem = mapCart.find((item) => item.itemId === payload.id)
      cartItem.amountInCart += 1

      /**
       * CHECK IN FOR LATER ON DUPLICATE ITEMS with different options -> if they have the same options add one more and if their OPTIONS ARE DIFFERENT then they will be a new item
       */
      //function removeObjectWithId(arr, id) {
      // const mapAnotherCart = arr.map((item) => item.cartData)

      // const objWithIdIndex = mapAnotherCart.findIndex(
      //   (obj) => obj.menuItemId === id,
      // )

      // console.log(objWithIdIndex)
      // if (objWithIdIndex > -1) {
      //   let bruh = arr.at(objWithIdIndex)
      //   let bruh2 = bruh.cartData
      //   let bruh3 = arr[objWithIdIndex].cartData.menuItemCartAmount + 1
      //   let bruh4 = bruh3 + 1
      //   console.log(bruh4)
      //   arr[objWithIdIndex].cartData.menuItemCartAmount = bruh3
      // }

      // return arr
      // }
      //removeObjectWithId(state.cart, payload.id)
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
      let amount = 0
      let total = 0
      state.cart.forEach((item) => {
        amount += item.amount
        total += item.amount * item.price
      })
      state.amount = amount
      state.total = total
    },
  },
})

// export the case / function action from the userSession and access the object
export const {
  setCart,
  orderPlaced,
  increase,
  decrease,
  calculateTotals,
} = addToCart.actions

// create getters

// get the user loggedInSTate whether it is true or false and the value of the user -> USED MOSTLY FOR USEAPPSELECTOR methods
// export state values through a function
export const getButton = (state) => state.addToCart.cartButton
export const getCart = (state) => state.addToCart.cart
export const getAmount = (state) => state.addToCart.amount

// export the reducer of the slice
export default addToCart.reducer
