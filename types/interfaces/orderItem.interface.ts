import { itemType } from "./item.interface";


export default interface orderItem {
    cartData: itemType;
    businessOrderedFrom: string,
    userId: string,
    location: {longitude: number; latitude: number},
    logo: string,
    createdAt: string
}