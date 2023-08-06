import { ICart } from "../../store/slices/addToCartSessionSlice";

export interface Iorder {
    orders: ICart[];
    minutesToDone: number;
    storeInfo: {
      storeName: string
      storeId: string
      storeOwner?: string
    },
    status: string;
    accepted: string
    uid: string;
    createdAt?: string;
    userName: string;
    location: {longitude: number, latitude: number},
    _id?: string;
  }
  