import { useEffect, useState } from "react";
import { getAllBusinesses } from "../../store/slices/BusinessSlice/businessSlice";
import { createToken } from "../../store/slices/userSession";

/**
 * Custom hook that retrieves the list of businesses and filtered businesses based on the filter criteria.
 * 
 * @param {Function} getBusinesses - Function that returns the businesses to be filtered.
 * @returns {Object} - Object containing loading state, trending businesses, and filtered businesses.
 */
export default function useBusiness(getBusinesses) {
  const [loading, setLoading] = useState(true);
  const [trendingBusiness, setTrendingBusiness] = useState([]);
  const [business, setBusiness] = useState([]);
  console.log("TOKEN", createToken())
  createToken();
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
