import { makePostRequest } from "../../../config/axios.config";
import { reviewInterface } from "../../../typeDefinitions/interfaces/reviews.interface";

/**
 * This function posts a review to the backend
 * @param payload The input of a review, required as reviewInterface type
 * @returns
 */
const postReview = async (payload: reviewInterface): Promise<any> => {
  const url = "/reviews/create"; // The url
  const response = await makePostRequest(url, payload); // make a post request to the backend, recieve the response
  return response;
};

export default postReview;
