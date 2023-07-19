import { ICart } from "../../store/slices/addToCartSessionSlice";
import { Iitem } from "../../typeDefinitions/interfaces/item.interface";

// Function to calculate the total cost of items in the cart
export const calculateTotal = (items: ICart[]): number => {
  // Use the reduce function to calculate the total
  const total = items.reduce((accumulator, item) => {
    // Multiply the amountInCart with the price of the item and add it to the accumulator
    return accumulator + item.inCart.amountInCart * item.inCart.price;
  }, 0); // Initialize the accumulator with 0

  return total;
};
