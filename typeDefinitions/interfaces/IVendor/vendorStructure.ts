import { status } from "../status.interface";
import { Iitem } from "../item.interface";
import { location } from "../location.interface";
import { Iannouncements } from "../announcement.interface";
import { Icategory } from "../categorySchema.interface";
import { Itime } from "../vendorTime.interface";

export interface vendorStructure {
  name: string;
  image: string;
  // Replace with announcements later when vendor pages are finished
  announcements: {
    cards: Iannouncements[];
    toggle: boolean;
  };
  location: location;
  times: Itime[];
  itemCategories: string[];
  category: Icategory;
  menu: Iitem[];
  uid?: string;
  trending: string;
  rating: number;
  status: status;
  storeStatus: string;
  id?: string;
}
