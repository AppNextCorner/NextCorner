import { useAppDispatch} from "../../store/hook";
import {
  ICart,
  addCartItem,
  configureItemAmountInCart,
} from "../../store/slices/addToCartSessionSlice";
import { useFetchCart } from "hooks/api/business/menu/useFetchCart";
// Custom hook useCart for managing the cart state and interactions
export default function useCart() {
  const dispatch = useAppDispatch(); // Get the dispatch function from Redux store
  const { initializeCart } = useFetchCart(); // Custom hook to fetch and initialize the cart data

  // Function to add an item to the cart
  const addItemToCart = async (item: ICart) => {
    console.log("adding item to cart:", [item]);
    await dispatch(addCartItem(item)); // Dispatch the action to add the item to the cart state
  };

  // Function to update the amount of an item in the cart
  const updateCartItemAmount = async (amount: number, index: number) => {
    dispatch(configureItemAmountInCart({ amount, index })); // Dispatch the action to update the amount of the item in the cart state
    await initializeCart(); // Fetch the latest cart data after the dispatch to reflect the updated changes
  };

  

  // Return the functions to add and update items in the cart
  return {
    addItemToCart,
    updateCartItemAmount,
  };
}
