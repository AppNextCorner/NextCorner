/**
 * Purpose of store: Being used to store all of our global state
 */

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import addToCart from "./slices/addToCart";
import addToOrders from "./slices/addToOrders";
import businessSlice from "./slices/BusinessSlice/businessSlice";
import userSession from "./slices/userSession";

export const store = configureStore({
    // function that receives the current state of the action object and decide when to update the userSession state 
    // event listener that handles events based on the received action type
    reducer: {
        // copy the original state and assign changes to the copied values we chooose
        userSession: userSession,
        addToCart: addToCart,
        addToOrders: addToOrders,
        businessSlice: businessSlice,
    },
    devTools: true,
})