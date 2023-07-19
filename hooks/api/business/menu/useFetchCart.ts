// cartInitialization.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAppDispatch } from "../../../../store/hook";
import {
  setButtonState,
  setCart,
} from "../../../../store/slices/addToCartSessionSlice";

export const useFetchCart = () => {
  const dispatch = useAppDispatch();
  async function initializeCart() {
    try {
      const cartData: string | null = await AsyncStorage.getItem("cart");
      console.log("cart data", cartData);
      const addData: any = cartData !== null ? JSON.parse(cartData) : [];
      if (addData.length > 0) {
        dispatch(setButtonState(true));
      }
      dispatch(setCart(addData));
    } catch (error) {
      console.log("Error fetching cart from AsyncStorage:", error);
    }
  }
  return {
    initializeCart,
  };
};
