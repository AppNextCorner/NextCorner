import { ICart } from "../../store/slices/addToCartSessionSlice";

export interface Iorder {
    orders: ICart[];
    minutesToDone: number;
    storeInfo: {
      storeName: string
      storeId: string
    },
    status: string;
    accepted: string
    uid: string;
    createdAt?: string;
    _id?: string;
  }
  