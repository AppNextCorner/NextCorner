import useFetchOrders from "hooks/api/business/orders/useFetchOrders";
import useUpdateOrders from "hooks/api/business/orders/useUpdateOrders";
import { Iorder } from "../../typeDefinitions/interfaces/order.interface";

const useHandleIncomingOrders = () => {
  const { updateOrderAcceptStatus } = useUpdateOrders();
  const { fetchOrdersById } = useFetchOrders();

  const getAllOrders = async (storeId: string) => {
    const allOrders: Iorder[] = await fetchOrdersById(storeId);
    return allOrders;
  };

  const acceptOrder = async (orderId: string) => {
    await updateOrderAcceptStatus({ orderId, newStatus: "accepted" });
  };

  const rejectOrder = async (orderId: string) => {
    // this one
    await updateOrderAcceptStatus({ orderId, newStatus: "rejected" });
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
