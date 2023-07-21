import { makeGetRequest } from "../../../../config/axios.config";

export default function useFetchOrders() {
    const fetchOrdersByName = async(name: string | undefined) => {
        const url = `/orders/get-orders-by-store-name/${name}`;
        const response = await makeGetRequest(url);
        console.log('invoming response', response)
        return response.data;
    }

    const fetchOrdersByUid = async(uid: string) => {
        console.log(uid);
        const url = `/orders/get-orders-by-uid/${uid}`;
        const response = await makeGetRequest(url);
        console.log(response)
        return response.data
    }



    return { fetchOrdersByName, fetchOrdersByUid, };
}