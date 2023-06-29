import { announcementType } from "./announcementData.interface";
import { categoryType } from "./category.interface";

export interface business {
  name: string;
  image: string[];
  announcements: announcementType[];
  location: { longitude: number; latitude: number };
  open: string;
  close: string;
  category: categoryType[];
  item;
}
