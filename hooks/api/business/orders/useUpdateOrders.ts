import { makePutRequest } from "../../../../config/axios.config";

export default function useUpdateOrders() {
  //payload : {orderId: id, newAcceptStatus: string}
  const updateOrderAcceptStatus = async (payload: any) => {
    const url = `/orders/update-accept-status`;
    const response = await makePutRequest(url, payload);
    return response.data.updated;
  };

  //payload : {orderId: id, newAcceptStatus: string}
  const updateOrderStatus = async (payload: any) => {
    const url = `/orders/update-status`;
    const response = await makePutRequest(url, payload);
    return response.data.updated;
  };
  return { updateOrderAcceptStatus, updateOrderStatus };
}
