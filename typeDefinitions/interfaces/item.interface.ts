import { clockFormat } from "./IVendor/time";
import { IOptions } from "./options.interface";
export interface Iitem {
  _id?: string;
  name: string;
  time: clockFormat;
  image: string;
  price: number;
  description: string;
  customizations: IOptions[];
  category: string;
  featured: boolean;
  amountInCart: number;
  rating: number;
  storeInfo: {
    storeName: string;
    storeId: string | undefined;
  }
  createdAt?: string;
}
