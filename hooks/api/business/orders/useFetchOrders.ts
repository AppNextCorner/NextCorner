import { makeGetRequest } from "../../../../config/axios.config";

export default function useFetchOrders() {
    const fetchOrdersByName = async(name: string | undefined) => {
        const url = `/orders/get-orders-by-store-name/${name}`;
        const response = await makeGetRequest(url);
        console.log('invoming response', response)
        return response;
    }
    return { fetchOrdersByName };
}