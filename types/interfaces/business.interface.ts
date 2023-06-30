import { announcementType } from "./announcementData.interface";
import { categoryType } from "./category.interface";
import { itemType } from "./item.interface";
import { itemStatus } from "./itemStatus.interface";

export interface business {
  name: string;
  image: string;
  // Replace with announcements later when vendor pages are finished
  announcementCards: announcementType[];
  location: { longitude: number; latitude: number };
  open: string;
  close: string;
  category: categoryType;
  item: itemType;
  userId: number;
  categoryId: number;
  rating: number;
  trending: string;
  status: itemStatus;
}
