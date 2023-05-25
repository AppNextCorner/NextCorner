import { useEffect, useState } from "react";
import { CREATE_TRENDING_RESTAURANTS, CREATE_DEFAULT_RESTAURANTS } from "../constants/MenuData";
import { getAllBusinesses } from "../store/slices/BusinessSlice/businessSlice";

/**
 * Returns the list of businesses and the filtered businesses that match the filter criteria.
 * 
 * @returns business and trending business
 */
export default function useBusiness(getBusinesses) {
  const [loading, setLoading] = useState(true);
  const [trendingBusiness, setTrendingBusiness] = useState(CREATE_TRENDING_RESTAURANTS);
  const [business, setBusiness] = useState([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      try {
        // Fetch the businesses from the API
        await getAllBusinesses();

        // Get the businesses from the parameter
        setBusiness(getBusinesses);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching businesses:", error);
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [getBusinesses]);

  return {
    loading,
    trendingBusiness,
    business
  };
}
