import useFetchOrders from "hooks/api/business/orders/useFetchOrders";
import useUpdateOrders from "hooks/api/business/orders/useUpdateOrders";
import { Iorder } from "../../typeDefinitions/interfaces/order.interface";
import { useContext } from "react";
import { WebSocketContext } from "../../context/incomingOrderContext";
import { addAcceptedOrder, removeFromAccepted, removeFromPending, } from "../../store/slices/WebsocketSlices/IncomingOrderSlice";
import { useAppDispatch } from "../../store/hook";

const useHandleIncomingOrders = () => {
  const { updateOrderAcceptStatus, updateOrderStatus } = useUpdateOrders();
  const dispatch = useAppDispatch();
  const { fetchOrdersById } = useFetchOrders();
  const webSocket = useContext(WebSocketContext);
  const getAllOrders = async (storeId: string) => {
    const allOrders: Iorder[] = await fetchOrdersById(storeId);
    return allOrders;
  };

  const acceptOrder = async (targetUid: string, orderId: string) => {
    const accepted = "accepted";
    const payload = {
      type: "send_change_accepted",
      payload: {
        accepted,
        targetUid,
        id: orderId,
      },
    };
    webSocket.send(JSON.stringify(payload));
    const newAcceptedOrder = await updateOrderAcceptStatus({
      orderId,
      newStatus: accepted,
    });

    dispatch(addAcceptedOrder([newAcceptedOrder]));
  };

  const rejectOrder = async (targetUid: string, orderId: string) => {
    const accepted = "rejected";
    const payload = {
      type: "send_change_accepted",
      payload: {
        accepted,
        targetUid,
        id: orderId,
      },
    };
    webSocket.send(JSON.stringify(payload));
    await updateOrderAcceptStatus({
      orderId,
      newStatus: accepted,
    });
  };

  const completeOrder = async (targetUid: string, orderId: string, order: Iorder) => {
    const status = "completed";
    const payload = {
      type: "send_completed_order",
      payload: {
        order,
        status,
        targetUid,
        orderId,
      },
    };
    webSocket.send(JSON.stringify(payload));
    console.log('finished websocket')
    const updated = await updateOrderStatus({
      orderId,
      newStatus: status,
    });
    dispatch(removeFromAccepted(updated));
   
  };

  const getPendingOrderList = async (storeId: string) => {
    const allOrders = await getAllOrders(storeId);
    const pendingOrders = allOrders.filter(
      (singleOrder: Iorder) => singleOrder.accepted === "pending"
    );
    console.log("Pending Order List:", pendingOrders);
    return pendingOrders;
  };

  const getAcceptedOrderList = async (storeId: string) => {
    const allOrders = await getAllOrders(storeId);

    const acceptedOrdes = allOrders.filter(
      (singleOrder: Iorder) => singleOrder.accepted === "accepted"
    );
    return acceptedOrdes;
  };

  return {
    acceptOrder,
    rejectOrder,
    completeOrder,
    getPendingOrderList,
    getAcceptedOrderList,
  };
};

export default useHandleIncomingOrders;

// 