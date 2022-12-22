/**
 * Purpose of file: Contains our slice to use for our state 
 */

 import { createSlice } from "@reduxjs/toolkit";

 // setting the default state for the app
 const initialState = {
   cartButton: false, // user is not logged in by default
   cart: []
 };
 
 // create a slice object to store the state -> creates action creators for each case inside reducers and can safely mutate the state
 export const addToCart = createSlice({
 // prefix for generated action types
   name: "addToCart",
   // initial state of the reducer
   initialState,
   // object where the keys are strings and the values are functions that handle specific actions
   reducers: {
     // case reducer functions
     // action is what values we want to assign the state to and receive it from payload
     setCart: (state, action) => {
         console.log(action);
       // when user logs in, update logged in state by assigning it a new value -> could do more actions such as push to an array, but it all depends on the data type and current state
 
       // assign the null value of the user to the value we get from the setUser dispatch method
       state.cart.push(action.payload)
       state.cartButton= true;
      
     },
     orderPlaced: (state) => {
       // when user logs in, update logged in state
       state.cartButton = false;
       state.cart = null;
     },
   },
 });
 
 // export the case / function action from the userSession and access the object 
 export const {setCart} = addToCart.actions;
 
 // create getters
 
 // get the user loggedInSTate whether it is true or false and the value of the user -> USED MOSTLY FOR USEAPPSELECTOR methods
 // export state values through a function
 export const getButton = (state) => state.addToCart.cartButton;
export const getCart = (state) => state.addToCart.cart;
 
 // export the reducer of the slice
 export default addToCart.reducer;