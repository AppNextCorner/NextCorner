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

const fetchVendorBusiness = async(uid: string) => {
  const url = `/business/get-stores-by-uid/${uid}`
  const response = await makeGetRequest(url);
  return response.data.stores;
}

export {fetchVendorBusiness} 
export default fetchBusinesses;
