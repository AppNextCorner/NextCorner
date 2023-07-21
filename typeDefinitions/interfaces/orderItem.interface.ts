import { Iitem } from "./item.interface";

export default interface orderItem {
  inCart: Iitem;
  storeName: string;
  uid: string;
  createdAt?: string;
}
