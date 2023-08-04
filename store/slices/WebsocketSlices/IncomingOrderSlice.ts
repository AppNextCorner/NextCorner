import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { Iitem } from "../../../typeDefinitions/interfaces/item.interface";
import { RootState } from "../../store";
import { produce } from "immer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Iorder } from "../../../typeDefinitions/interfaces/order.interface";

// Interface for the state of the cart
export interface IOrderSlice {
  incoming: Iorder[];
}

const initialState: IOrderSlice = {
  incoming: [],
};

export const addToCartSessionSlice = createSlice({
  name: "addToCartSessionSlice",
  initialState,
  reducers: {
    // Reducer to add a new item to the cart
    setInitialOrders: (state, action) => {
        state.incoming = action.payload;
    },
    addIncomingOrder: (state, action) => {
        
    },
  },
});

export const {} = addToCartSessionSlice.actions;
export const getCart = (state: RootState) => state.addToCartSessionSlice.data;
export const getButton = (state: RootState) =>
  state.addToCartSessionSlice.cartButton;

export default addToCartSessionSlice.reducer;
