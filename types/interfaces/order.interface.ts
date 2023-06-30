import orderItem from "./orderItem.interface";

export default interface order {
    singleOrderList: orderItem[],
    timer: number,
    orderStatus: string, // Determines if the order is completed or not
    userId: string,
    createdAt: string,
    id: string
}