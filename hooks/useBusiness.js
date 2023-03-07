import { useEffect, useState } from "react";
import { CREATE_TRENDING_RESTAURANTS, CREATE_DEFAULT_RESTAURANTS } from "../constants/MenuData";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { getAllBusinesses, getBusiness } from "../store/slices/BusinessSlice/businessSlice";

/**
 * Returns the list of businesses and the filtered businesses that match the filter criteria.
 * 
 * @returns business and trending business
 */
export default function useBusiness() {
 const getBusinesses = useAppSelector(getBusiness);
 // Important to copy the business data because we don't want to modify the business data as it can't without a request. This enables us to modify the business data from the user interface without having to modify the business data
 const cloneData = JSON.parse(JSON.stringify(getBusinesses)) 

  const [trendingBusiness, setTrendingBusiness] = useState(CREATE_TRENDING_RESTAURANTS);
  const [business, setBusinesss] = useState(cloneData)

  useEffect(() => {
    setBusinesss(cloneData)
  },[getBusinesses])
  return {
    trendingBusiness,
    business
  };
}
