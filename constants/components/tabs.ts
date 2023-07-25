import HomePage from "pages/HomePage";
import OrdersPage from "pages/OrdersPage";
import { NearbyVendors } from "pages/home/NearbyVendors";
import ProfilePage from "pages/ProfilePage";
import Vendor from "pages/BusinessStack/components/vendorPages/Vendor";
import VendorMore from "pages/BusinessStack/components/vendorPages/VendorMore";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Octicons,
  Ionicons,
} from "@expo/vector-icons";
import ITab from "../../typeDefinitions/interfaces/IComponents/tab.interface";

export const user: ITab[] = [
  {
    name: "Home",
    component: HomePage,
    focusedName: "home",
    icon: MaterialCommunityIcons,
    unfocused: "home-outline",
  },
  {
    name: "Browse",
    component: NearbyVendors,
    focusedName: "running",
    unfocused: "running",
    icon: FontAwesome5,
  },
  {
    name: "Orders",
    component: OrdersPage,
    focusedName: "checklist",
    unfocused: "checklist",
    icon: Octicons,
  },
  {
    name: "Profile",
    component: ProfilePage,
    focusedName: "person",
    unfocused: "person",
    icon: Ionicons,
  },
];

export const vendors: ITab[] = [
  {
    name: "Vendors",
    component: Vendor,
    focusedName: "store",
    unfocused: "store-outline",
    icon: MaterialCommunityIcons,
  },
  {
    name: "More",
    component: VendorMore,
    focusedName: "dots-horizontal-circle",
    unfocused: "dots-horizontal-circle-outline",
    icon: MaterialCommunityIcons,
  },
];
