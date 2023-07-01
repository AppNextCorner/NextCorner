import { makeGetRequest } from "../../../config/axios.config";
/**
 *
 * This function sends a get request to the server to get the reviews
 * It returns an object of object arrays
 *
 *
 * @param id the id of the menu item
 * @returns RESPONSE.DATA
 *  RESPONSE.DATA.PAYLOAD gives you list of Reviews
 *  RESPONSE.DATA.USERS gives you list of users who made the reviews
 */
const getReviews = async (id: string): Promise<any> => {
  const url = `/reviews/getReviews/${id}`; // pass the id in the url
  const response = await makeGetRequest(url); // make the get request
  return response.data;
};

export default getReviews;
