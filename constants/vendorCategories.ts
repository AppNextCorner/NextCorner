import { featured } from "../typeDefinitions/interfaces/IVendor/featured";
import { vendorCategory } from "../typeDefinitions/interfaces/vendorCategory.interface";

export const categories: featured[] = [
  { name: "Best Reviews", id: 1 },
  { name: "Best Tacos", id: 2 },
  { name: "Best Drinks", id: 3 },
  { name: "Best Fruits", id: 4 },
];
export const foodCategories: vendorCategory[] = [
  {
    text: "Tacos",
    foodType: require("assets/CategoryIcons/bread.png"),
    key: 1,
  },
  {
    text: "Fruits",
    foodType: require("assets/CategoryIcons/burger.png"),
    key: 2,
  },
  {
    text: "Nieves",
    foodType: require("assets/CategoryIcons/burrito.png"),
    key: 3,
  },
  {
    text: "Drinks",
    foodType: require("assets/CategoryIcons/corndog.png"),
    key: 4,
  },
  {
    text: "Wings",
    foodType: require("assets/CategoryIcons/chicken-leg.png"),
    key: 5,
  },
  {
    text: "Fries",
    foodType: require("assets/CategoryIcons/fries.png"),
    key: 6,
  },
  {
    text: "Pizza",
    foodType: require("assets/CategoryIcons/pizza.png"),
    key: 7,
  },
];
