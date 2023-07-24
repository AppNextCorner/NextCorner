import ItemPage from "pages/BusinessStack/components/ItemPage";
import MenuListPage from "pages/BusinessStack/components/MenuListPage";
import ReviewCreatePage from "pages/BusinessStack/components/ReviewCreatePage";
import VendorsCreate from "pages/BusinessStack/components/vendorCreate/VendorsCreate";
import ReviewsPage from "pages/BusinessStack/components/reviewsPage";
import CreateCustomizations from "pages/BusinessStack/components/vendorCreate/CreateCustomizations";
import CreateMenuItem from "pages/BusinessStack/components/vendorCreate/CreateMenuItem";
import VendorIncomingOrders from "pages/BusinessStack/components/vendorPages/VendorIncomingOrders";
import VendorMenu from "pages/BusinessStack/components/vendorPages/VendorMenu";
import VendorOptions from "pages/BusinessStack/components/vendorPages/VendorOptions";
import CartPage from "pages/CartPage";
import InProgressPage from "pages/OrdersStack/InProgressPage";
import OrderPlacedPage from "pages/PaymentStack/OrderPlacedPage";
import PaymentDetailsPage from "pages/PaymentStack/PaymentDetailsPage";
import { NearbyVendors } from "pages/home/NearbyVendors";

export const screens = [
  {
    name: "Cart",
    component: CartPage,
  },
  {
    name: "Item",
    component: ItemPage,
  },
  {
    name: "MenuList",
    component: MenuListPage,
  },
  {
    name: "PaymentDetails",
    component: PaymentDetailsPage,
  },
  {
    name: "OrderPlaced",
    component: OrderPlacedPage,
  },
  {
    name: "InProgressOrder",
    component: InProgressPage,
  },
  {
    name: "Browse",
    component: NearbyVendors,
  },
  {
    name: "Reviews",
    component: ReviewsPage,
  },
  {
    name: "ReviewCreate",
    component: ReviewCreatePage,
  },
];

export const vendorScreens = [
  {
    name: "VendorCreate",
    component: VendorsCreate,
  },
  {
    name: "VendorMenuCreate",
    component: CreateMenuItem,
  },
  {
    name: "VendorMenu",
    component: VendorMenu,
  },
  {
    name: "VendorOptions",
    component: VendorOptions,
  },
  {
    name: "VendorCustomizationCreate",
    component: CreateCustomizations,
  },
  {
    name: "VendorIncomingOrders",
    component: VendorIncomingOrders,
  },
];
