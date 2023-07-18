/**
 * Purpose of store: Being used to store all of our global state
 */

import { configureStore } from "@reduxjs/toolkit";
import userSessionReducer from "./slices/userSessionSlice";
import addToCart from "./slices/addToCart";
import addToOrders from "./slices/addToOrders";
import businessSessionReducer from "./slices/BusinessSlice/businessSessionSlice";
import businessSlice from "./slices/BusinessSlice/businessSlice";
import menuCreateSlice from "./slices/BusinessSlice/menuCreateSlice";
// import userSession from "./slices/userSession";

export const store = configureStore({
  // function that receives the current state of the action object and decide when to update the userSession state
  // event listener that handles events based on the received action type
  reducer: {
    // copy the original state and assign changes to the copied values we chooose
    userSession: userSessionReducer,
    addToCart: addToCart,
    addToOrders: addToOrders,
    businessSlice: businessSlice,
    businessSession: businessSessionReducer,
    menuCreate: menuCreateSlice
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
