import { Iitem } from "./item.interface";
import { status } from "./status.interface";
import { location } from "./location.interface";
import { Iannouncements } from "./announcement.interface";
export interface vendor {
  name: string;
  image: string;
  // Replace with announcements later when vendor pages are finished
  announcementCards: Iannouncements[];
  location: location;
  open: string;
  close: string;
  category: string;
  item: Iitem[];
  userId: number;
  categoryId: number;
  trendingCategory: string;
  rating: number;
  trending: string;
  status: status;
  id?: string;
}
