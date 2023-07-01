import getReviews from "pages/BusinessStack/api/getReviews";
import { useState } from "react";

export default function useFetchReviews() {
  /**
   * State definitions
   */

  const [reviews, setReviews] = useState<any[]>();
  const [reviewByUser, setReviewByUser] = useState<any[]>();

  /**
   * End of state definitions
   */

  /**
   *
   * @param id the id of the menuItem
   */
  const fetchReviews = async (id: string) => {
    try {
      // Fetche the reviews with the id
      const fetchedReviews = await getReviews(id);

      // update the state values
      setReviews(fetchedReviews.payload);
      setReviewByUser(fetchedReviews.users);
    } catch (err) {
      console.log(err);
    }
  };
  /**
   * Return the function and the state values
   */
  return { fetchReviews, reviews, reviewByUser };
}
