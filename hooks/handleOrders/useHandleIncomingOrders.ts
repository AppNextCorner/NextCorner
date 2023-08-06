import useFetchOrders from "hooks/api/business/orders/useFetchOrders";
import useUpdateOrders from "hooks/api/business/orders/useUpdateOrders";
import { Iorder } from "../../typeDefinitions/interfaces/order.interface";
import { useContext } from "react";
import { WebSocketContext } from "../../context/incomingOrderContext";

const useHandleIncomingOrders = () => {
  const { updateOrderAcceptStatus } = useUpdateOrders();
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
    await updateOrderAcceptStatus({ orderId, newStatus: accepted });
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
    await updateOrderAcceptStatus({ orderId, newStatus: accepted });
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
    console.log("Accepted Order list:", acceptedOrdes);
    return acceptedOrdes;
  };

  return {
    acceptOrder,
    rejectOrder,
    getPendingOrderList,
    getAcceptedOrderList,
  };
};

export default useHandleIncomingOrders;
