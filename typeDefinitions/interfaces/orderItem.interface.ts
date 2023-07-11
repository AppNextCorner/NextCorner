import { Iitem } from "./item.interface";

export default interface orderItem {
  cartData: Iitem;
  businessOrderedFrom: string;
  userId: string;
  location: { longitude: string; latitude: string };
  logo: string;
  createdAt: string;
}
