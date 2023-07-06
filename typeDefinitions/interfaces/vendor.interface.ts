import { announcementType } from "./announcementData.interface";
import { categoryType } from "./category.interface";
import { itemType } from "./item.interface";
import { itemStatus } from "./itemStatus.interface";
import {location} from "./location.interface";
export interface vendor {
  name: string;
  image: string;
  // Replace with announcements later when vendor pages are finished
  announcementCards: announcementType[];
  location: location;
  open: string;
  close: string;
  category: categoryType;
  item: itemType[];
  userId: number;
  categoryId: number;
  trendingCategory: string;
  rating: number;
  trending: string;
  status: itemStatus;
  id: string;
}
