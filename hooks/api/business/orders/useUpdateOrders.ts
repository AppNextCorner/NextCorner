import { makePutRequest } from "../../../../config/axios.config";
import { useAppDispatch } from "../../../../store/hook";
import { addAcceptedOrder } from "../../../../store/slices/WebsocketSlices/IncomingOrderSlice";

export default function useUpdateOrders() {
  const dispatch = useAppDispatch();
    //payload : {orderId: id, newAcceptStatus: string}
    const updateOrderAcceptStatus = async(payload: any) => {
        const url = `/orders/update-accept-status`
        const response = await makePutRequest(url, payload);
        console.log('response of updated status: ', response.data)
        if(response.data.message !== null){
          dispatch(removeFromPending(response.data.payload))
          return
        }
        dispatch(addAcceptedOrder([response.data.updated]))
        return response.data.updated;

    }
  return {updateOrderAcceptStatus};
}
