import { makeGetRequest } from "../../../config/axios.config";

/** Function to get all businesses */
const fetchBusinesses = async () => {
  // URL to make get request
  const url = "/business/get-vendors";

  // make the request and log its data
  const response = await makeGetRequest(url);

  // return that data
  return response.data;
};

export default fetchBusinesses;
