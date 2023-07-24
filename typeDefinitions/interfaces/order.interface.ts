import { ICart } from "../../store/slices/addToCartSessionSlice";

export interface Iorder {
    orders: ICart[];
    minutesToDone: number;
    status: string;
    accepted: string
    uid: string;
    createdAt?: string;
    _id?: string;
  }
  