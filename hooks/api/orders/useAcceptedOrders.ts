// useAcceptedOrders.ts
import useHandleIncomingOrders from 'hooks/handleOrders/useHandleIncomingOrders';
import { useState, useEffect } from 'react';

const useAcceptedOrders = (storeId: string) => {
  const [acceptedOrders, setAcceptedOrders] = useState<any[]>([]);
  const {
    getAcceptedOrderList,
  } = useHandleIncomingOrders();

  useEffect(() => {
    const fetchAcceptedOrders = async () => {
      try {
        const orders = await getAcceptedOrderList(storeId);
        setAcceptedOrders(orders);
      } catch (error) {
        console.error('Error fetching accepted orders:', error);
      }
    };

    fetchAcceptedOrders();
  }, [storeId]);

  return acceptedOrders;
};

export default useAcceptedOrders;
