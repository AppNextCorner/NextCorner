import { useCallback } from "react";
import { useAppDispatch } from "../../store/hook";
import { addIncomingOrder } from "../../store/slices/WebsocketSlices/IncomingOrderSlice";
import { Alert } from "react-native";
import { setCompleted } from "../../store/slices/addToOrders";
import AppUser from "../../typeDefinitions/interfaces/user.interface";
interface IEvent {
  [key: string]: (event: Record<string, any>, userData: AppUser) => void | any;
}

/**
 * Handler to call a function depending on the type from the event data
 *
 */
const useMessageHandler = () => {
  const dispatch = useAppDispatch();

  /**
   * Places the incoming order inside the vendor list
   * @param event - Our data containing the type of event and payload of event
   * @param dispatcher - Using react redux dispatch for global update
   */
  const incomingOrder = (event: Record<string, any>, user: AppUser) => {
    const order = event.payload;
    dispatch(addIncomingOrder([order]));
  };
  // TOO DOO Change this code so that only users with roles get alerts
  const userAlertAcceptedOrder = (
    event: Record<string, any>,
    user: AppUser
  ) => {
    const order = event.payload;
    console.log("accepted handler is running!");
    if (order.accepted === "accepted") {
      // make it so only a user role gets this msg
      Alert.alert("Your order got accepted, awesome");
    } else if (order.accepted === "rejected") {
      // make it so only a user role gets this msg
      Alert.alert("Your order got rejected");
    }
  };

  const completedOrder = (event: Record<string, any>, user: AppUser) => {
    const payload = event.payload;
    // if (user.role === "user") {
    Alert.alert(
      `Your Order from ${payload.order.storeInfo.storeName} is complete!`
    );
    // }

    dispatch(setCompleted(payload.order));
  };
  let eventList: IEvent = {
    incoming_order: incomingOrder,
    return_change_accepted: userAlertAcceptedOrder,
    completed_order: completedOrder,
  };

  // Get the function from the event type as a key
  const routeEvent = useCallback(
    (event: MessageEvent, userData: AppUser) => {
      const data = JSON.parse(event.data);
      console.log("data in useMsgHandler: ", data);
      const eventHandler = eventList[data.type];

      if (eventHandler) {
        eventHandler(data, userData);
      }
    },
    [dispatch]
  );

  // Call the event handler
  return {
    routeEvent,
  };
};

export default useMessageHandler;
