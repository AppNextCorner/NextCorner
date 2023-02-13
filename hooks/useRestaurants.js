import { useState } from "react";
import { CREATE_TRENDING_RESTAURANTS, CREATE_DEFAULT_RESTAURANTS } from "../constants/MenuData";

/**
 * Returns the list of businesses and the filtered businesses that match the filter criteria.
 * 
 * @returns restaurants and trending restaurants
 */
export default function useRestaurants() {
  const [trendingRestaurants, setTrendingRestaurants] = useState(CREATE_TRENDING_RESTAURANTS);
  const [restaurants, setRestaurants] = useState(CREATE_DEFAULT_RESTAURANTS)


  
  return {
    trendingRestaurants,
    restaurants
  };
}
