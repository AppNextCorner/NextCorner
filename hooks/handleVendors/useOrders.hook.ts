import { useAppDispatch, useAppSelector } from "../../store/hook";
import { ICart } from "../../store/slices/addToCartSessionSlice";
import {
  setOrders,
  updateOrderStatusReducer,
} from "../../store/slices/addToOrders";
import { makePostRequest } from "../../config/axios.config";
import { getUser } from "../../store/slices/userSessionSlice";
import useFetchOrders from "hooks/api/business/orders/useFetchOrders";
import useGetUserData from "hooks/handleUsers/useGetUserData";

/**
 * After the user has entered the order, they should update the order list through the request to our backend.
 * - Be able to grab the order list from the backend when the function is called asynchronously
 * - The order is added
 *
 */

const UseOrders = () => {

  console.log("use orders is running");
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const { fetchOrdersByUid } = useFetchOrders();
  

  // going to run asynchronously when the order is fetched from the home page and/or the user has been logged in/ order page is fetched
  const getCurrentOrders = async (userFromParam?: any) => {
    try {
      // place the orders from the server by uid
      console.log("order user: ", user);
      let trueUser = user === null ? userFromParam : user;
      console.log("true user: ", trueUser);
      const userOrders = await fetchOrdersByUid(trueUser._id);
      // // place the data in the dispatch queue
      dispatch(setOrders(userOrders.userOrders));
    } catch (err) {
      console.error("Failed to save the post", err);
    }
  };
  /**
   * addCartToOrder - after user has confirmed the order, we can grab the order and send a request to the server
   * @param {*} cart - Contains the cart items
   */
  const addCartToOrder = async (cart: ICart[]) => {
    // multiply a single order item with the time it takes to complete and the amount it has
    const orderItemTimes = cart.map(
      (cart: ICart) =>
        cart.inCart.time.minutes * cart.inCart.amountInCart +
        (cart.inCart.time.seconds * cart.inCart.amountInCart) / 60
    );
    // add up all the previous cart items times together to make one single order time
    const sumOfTimes = orderItemTimes.reduce((a, b) => {
      return a + b;
    }, 0);
    const orderList = {
      orders: cart,
      minutesToDone: sumOfTimes,
      storeInfo: {
        storeName: cart[0].inCart.storeInfo.storeName,
        storeId: cart[0].inCart.storeInfo.storeId
      },
      status: "Order Not Completed",
      accepted: "pending",
      uid: user!._id,
    };
    await makePostRequest(`/orders/place-order`, orderList);
  };
  /**
   * The function runs when the timer has reached zero causing the order status to be changed and put into a new state with the completed orders.
   * @param {*} updatedStatus - the updated value of the order status in our order
   *
   */
  const updateOrder = async (updatedStatus: any) => {
    const itemStatus = {
      status: updatedStatus.orderStatus,
      id: updatedStatus.id,
    };
    try {
      // change the state of the order status through the global state to display the order status
      dispatch(updateOrderStatusReducer(itemStatus));
      // send in axios put request to change the status whether the order is completed or no in our backend
      dispatch(updateOrderStatusReducer(itemStatus));
    } catch (e) {
      console.log(e);
    }
  };

  return {
    addCartToOrder,
    getCurrentOrders,
    updateOrder,
  };
};

export default UseOrders;
