import { useState, useEffect } from "react";
import { Iorder } from "../../../typeDefinitions/interfaces/order.interface";
import useFetchOrders from "hooks/api/business/orders/useFetchOrders";
import useUpdateOrders from "hooks/api/business/orders/useUpdateOrders";

interface IHandleIncomingOrders {
  storeName: string;
  allOrders: Iorder[] | undefined;
  pendingOrdersList: Iorder[] | undefined;
  acceptedOrdersList: Iorder[] | undefined;
  acceptedOrders: Iorder[] | undefined;
  pendingOrders: Iorder[] | undefined;
  acceptOrder(orderId: string): Promise<void>;
  rejectOrder(orderId: string): Promise<void>;
}

const useHandleIncomingOrders = (storeName: string): IHandleIncomingOrders => {
  const [allOrders, setAllOrders] = useState<Iorder[] | undefined>();
  const [pendingOrdersList, setPendingOrdersList] = useState<
    Iorder[] | undefined
  >();
  const [acceptedOrdersList, setAcceptedOrdersList] = useState<
    Iorder[] | undefined
  >();

  useEffect(() => {
    const fetchOrders = async () => {
      const { fetchOrdersByName } = useFetchOrders();
      const orders: Iorder[] = await fetchOrdersByName(storeName);
      setAllOrders(orders);
    };

    fetchOrders();
  }, [storeName]);

  useEffect(() => {
    if (allOrders) {
      setPendingOrdersList(
        allOrders.filter(
          (singleOrder: Iorder) => singleOrder.accepted === "pending"
        )
      );
      setAcceptedOrdersList(
        allOrders.filter(
          (singleOrder: Iorder) => singleOrder.accepted === "accepted"
        )
      );
    }
  }, [allOrders]);

  const acceptOrder = async (orderId: string) => {
    const { updateOrderAcceptStatus } = useUpdateOrders();
    console.log('running accept order')
    await updateOrderAcceptStatus({ orderId, newStatus: "accepted" });
  };

  const rejectOrder = async (orderId: string) => {
    const { updateOrderAcceptStatus } = useUpdateOrders();
    // this one
    await updateOrderAcceptStatus({ orderId, newStatus: "rejected" });
  };

  return {
    storeName,
    allOrders,
    pendingOrdersList,
    acceptedOrdersList,
    get pendingOrders() {
      return pendingOrdersList;
    },
    get acceptedOrders() {
      return acceptedOrdersList;
    },
    acceptOrder,
    rejectOrder,
  };
};

export default useHandleIncomingOrders;
