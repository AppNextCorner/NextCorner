import { announcementType } from "./announcementData.interface";
import { itemType } from "./item.interface";
import { status } from "./status.interface";
import {location} from "./location.interface";
export interface vendor {
  name: string;
  image: string;
  // Replace with announcements later when vendor pages are finished
  announcementCards: announcementType[];
  location: location;
  open: string;
  close: string;
  category: string;
  item: itemType[];
  userId: number;
  categoryId: number;
  trendingCategory: string;
  rating: number;
  trending: string;
  status: status;
  id?: string;
}
