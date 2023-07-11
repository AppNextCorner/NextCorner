import { Iitem } from "./item.interface";

export default interface orderItem {
  cartData: Iitem;
  businessOrderedFrom: string;
  userId: string;
  location: { longitude: number; latitude: number };
  logo: string;
  createdAt: string;
}
