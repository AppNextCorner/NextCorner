import { makeGetRequest } from "../../../../config/axios.config";

export default function useFetchOrders() {
    const fetchOrdersById = async(id: string | undefined) => {
        const url = `/orders/get-orders-by-store-id/${id}`;
        const response = await makeGetRequest(url);
        console.log("response")
        console.log(response.data.orders)
        return response.data.orders;
    }

    const fetchOrdersByUid = async(uid: string) => {
        console.log(uid);
        const url = `/orders/get-orders-by-uid/${uid}`;
        const response = await makeGetRequest(url);
        console.log(response)
        return response.data
    }




    return { fetchOrdersById, fetchOrdersByUid, };
}