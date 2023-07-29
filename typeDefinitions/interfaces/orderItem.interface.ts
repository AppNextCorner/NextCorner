import { Iitem } from "./item.interface";

export default interface orderItem {
  inCart: Iitem;
  storeId: string;
  uid: string;
  createdAt?: string;
}
