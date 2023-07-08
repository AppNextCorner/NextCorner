import { option } from "./option.interface";

export interface itemType {
  name: string;
  time: number;
  image: string;
  price: number;
  description: string;
  customizations: option[];
  category: string;
  featured: boolean;
  amountInCart: number;
  rating: number;
  createdAt?: string;
  _id?: string
}
