import postReview from "pages/BusinessStack/api/postReview";
import { reviewInterface } from "../../../typeDefinitions/interfaces/reviews.interface";
import useBusinessInformation from "../business/useBusinessInformation";

export default function useCreateReview() {
  const { updateBusinessInformation } = useBusinessInformation();

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
      await postReview(payload);
      await updateBusinessInformation();
    } catch (err) {
      console.log(err);
    }
  };

  return { writeReview };
}
