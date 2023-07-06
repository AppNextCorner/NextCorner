import getReviews from "pages/BusinessStack/api/getReviews";
import { useState } from "react";
import fetchBusinesses from "pages/BusinessStack/api/getBusinessess";
import { useAppDispatch } from "../../../store/hook";
import { setBusinesses } from "../../../store/slices/BusinessSlice/businessSessionSlice";
import useBusinessInformation from "../business/useBusinessInformation";
export default function useFetchReviews() {
  /**
   * State definitions
   */

  const [reviews, setReviews] = useState<any[]>();
  const [reviewByUser, setReviewByUser] = useState<any[]>();
  /**
   * End of state definitions
   */

  const dispatch = useAppDispatch();
  const { updateBusinessInformation } = useBusinessInformation();
  /**
   *
   * @param id the id of the menuItem
   */
  const fetchReviews = async (id: string) => {
    try {
      // Fetch the reviews with the id
      const fetchedReviews = await getReviews(id);
      const fetchedBusinesses = await fetchBusinesses();
      dispatch(setBusinesses(fetchedBusinesses));
      // update the state values
      setReviews(fetchedReviews.payload);
      setReviewByUser(fetchedReviews.users);

      // update business Info
      await updateBusinessInformation();
    } catch (err) {
      console.log(err);
    }
  };
  /**
   * Return the function and the state values
   */
  return { fetchReviews, reviews, reviewByUser };
}
