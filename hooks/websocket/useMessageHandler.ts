import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import incomingOrder from "./handlers/incomingOrder";
import completedOrder from "./handlers/completedOrder";
import userAlertAcceptedOrder from "./handlers/acceptedOrder";
import { getUser } from "../../store/slices/userSessionSlice";
import { getPendingOrders } from "../../store/slices/WebsocketSlices/IncomingOrderSlice";
interface IEvent {
  [key: string]: (
    event: Record<string, any>,
    dispatcher: (param: any) => any,
    extra?: Record<string, any> | undefined
  ) => void | any;
}

// List of the event handlers
const eventList: IEvent = {
  incoming_order: incomingOrder,
  return_change_accepted: userAlertAcceptedOrder,
  completed_order: completedOrder,
};

/**
 * Handler to call a function depending on the type from the event data
 *
 */
const useMessageHandler = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const pendingList = useAppSelector(getPendingOrders);

  
  const role = user?.role;
  const extra = {
    role,
    pending: pendingList 
  }
  console.log("mesg handler is running!");

  // Get the function from the event type as a key
  const routeEvent = useCallback(
    (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log("data in useMsgHandler: ", data);
      const eventHandler = eventList[data.type];

      if (eventHandler) {
        console.log("event handler was found");
        eventHandler(data, dispatch, extra);
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
