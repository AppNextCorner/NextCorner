import { useAppDispatch, useAppSelector } from "../../store/hook";
import { ICart } from "../../store/slices/addToCartSessionSlice";
import {
  setOrders,
} from "../../store/slices/addToOrders";
import { makePostRequest } from "../../config/axios.config";
import { getUser } from "../../store/slices/userSessionSlice";
import useFetchOrders from "hooks/api/business/orders/useFetchOrders";
import { Iorder } from "../../typeDefinitions/interfaces/order.interface";
import { useContext } from "react";
import { WebSocketContext } from "../../context/incomingOrderContext";
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
  const websocket = useContext(WebSocketContext);

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
    const orderList: Iorder = {
      orders: cart,
      minutesToDone: sumOfTimes, // Don't replace the minutes when the response is sent back
      storeInfo: {
        storeName: cart[0].inCart.storeInfo.storeName,
        storeId: cart[0].inCart.storeInfo.storeId!,
        storeOwner: cart[0].inCart.storeInfo.storeOwner,
      },
      status: "Order Not Completed",
      accepted: "pending",
      location: { longitude: 0, latitude: 0 },
      uid: user?._id!,
      userName: user?.firstName + " " + user?.lastName,
    };
    const orderPlaced = await makePostRequest(`/orders/place-order`, orderList);

    const payload = {
      type: "send_incoming_order",
      payload: orderPlaced.data.placedOrder
    }
    console.log('order placed from http: ', payload);
    websocket.send(JSON.stringify(payload));
  };



  return {
    addCartToOrder,
    getCurrentOrders,
  };
};

export default UseOrders;
