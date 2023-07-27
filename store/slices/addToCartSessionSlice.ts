import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { Iitem } from "../../typeDefinitions/interfaces/item.interface";
import { RootState } from "../store";
import { produce } from "immer";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Interface for the items in the cart
export interface ICart {
  inCart: Iitem;
  storeName: string;
  uid: string | undefined;
}

// Interface for the state of the cart
export interface State {
  cartButton: boolean;
  data: ICart[];
}

const initialState: State = {
  cartButton: false,
  data: [],
};

export const addToCartSessionSlice = createSlice({
  name: "addToCartSessionSlice",
  initialState,
  reducers: {
    // Reducer to add a new item to the cart
    addCartItem: (state, action) => {
      console.log("old data: ", state.data);
      state.data = [...state.data, action.payload]; // Push the new item into the existing array
      AsyncStorage.setItem("cart", JSON.stringify(state.data));
      
      console.log('new data: ', state.data);
      console.log('new length of cart: ', state.data.length)
    },

    // Reducer to configure the amount of an item in the cart
    configureItemAmountInCart: (state, action: PayloadAction<{ amount: number; index: number }>) => {
      state.data = produce(state.data, (draft) => {
        const cartItem = draft[action.payload.index];

        // Adding the amount we want to increment
        const newAmountInCart = cartItem.inCart.amountInCart + action.payload.amount;
        if (newAmountInCart > 0) {
          cartItem.inCart.amountInCart = newAmountInCart;
        } else {
          // Remove the item from the cart if amountInCart becomes less than 0
          draft.splice(action.payload.index, 1);
        }
        
        AsyncStorage.setItem("cart", JSON.stringify(draft)); // Save updated data to Async Storage
      });
    },

    // Reducer to set the state of the cart button
    setButtonState: (state, action) => {
      state.cartButton = action.payload;
    },

    // Reducer to set the entire cart state
    setCart: (state, action: PayloadAction<ICart[]>) => {
      state.data = action.payload as Draft<ICart[]>;
    },

    deleteAllCartItems: (state) => {
      state.data = []; // Set the cart data to an empty array to delete all items
      AsyncStorage.setItem("cart", JSON.stringify([])); // Save the empty cart data to AsyncStorage
    },
  },
});

export const { addCartItem, configureItemAmountInCart, setButtonState, setCart, deleteAllCartItems } =
  addToCartSessionSlice.actions;
export const getCart = (state: RootState) => state.addToCartSessionSlice.data;
export const getButton = (state: RootState) =>
  state.addToCartSessionSlice.cartButton;

export default addToCartSessionSlice.reducer;
