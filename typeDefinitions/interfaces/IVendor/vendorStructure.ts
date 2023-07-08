import { announcementType } from "../announcementData.interface";
import { itemType } from "../item.interface";
import { status } from "../status.interface";
import {location} from "../location.interface";
import { time } from "./time";

interface category {
    name: string;
    id: number;
}

export interface vendorStructure {
  name: string;
  image: string;
  // Replace with announcements later when vendor pages are finished
  announcements: {
    cards: announcementType[];
    toggle: boolean
  }
  location: location;
  times: time[];
  category: category;
  item: itemType[];
  uid: string;
  trending: string;
  rating: number;
  status: status;
  id?: string;
}
