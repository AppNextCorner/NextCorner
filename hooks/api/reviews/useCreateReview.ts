import postReview from "pages/BusinessStack/api/postReview";
import { reviewInterface } from "../../../typeDefinitions/interfaces/reviews.interface";
import useGetUserData from "hooks/handleUsers/useGetUserData";
export default function useCreateReview() {
  const { fetchBusinesses } = useGetUserData();
  /**
   *
   * This function writes the Review
   *
   * @param payload THe payload given to make the post request.
   *                 Must be in the type of Review given by reviewINterface
   */
  const writeReview = async (payload: reviewInterface) => {
    try {
      // get the created review
      const createdReview = await postReview(payload);
      await fetchBusinesses();
      // do something with the createdReview
    } catch (err) {
      console.log(err);
    }
  };

  return { writeReview };
}
