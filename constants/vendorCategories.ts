import { featured } from "../typeDefinitions/interfaces/IVendor/featured";
import { vendorCategory } from "../typeDefinitions/interfaces/vendorCategory.interface";

export const categories: featured[] = [
  { name: "Burger", id: 1 },
  { name: "Cheap", id: 2 },
  { name: "Best Reviews", id: 3 },
];
export const foodCategories: vendorCategory[] = [
  {
    text: "Grains",
    foodType: require("assets/CategoryIcons/bread.png"),
    key: 1,
  },
  {
    text: "Burger",
    foodType: require("assets/CategoryIcons/burger.png"),
    key: 2,
  },
  {
    text: "Burrito",
    foodType: require("assets/CategoryIcons/burrito.png"),
    key: 3,
  },
  {
    text: "Hot Dog",
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
