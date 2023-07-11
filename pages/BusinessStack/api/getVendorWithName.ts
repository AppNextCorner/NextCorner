import { makePostRequest } from "../../../config/axios.config";
import { vendorStructure } from "../../../typeDefinitions/interfaces/IVendor/vendorStructure";

/**
 *
 * This function returns the vendor object data when you give it its name
 * @param payload payload is businessName
 * @returns
 */
const getVendorWithName = async (payload: any): Promise<vendorStructure> => {
  const url = "/business/getVendorByName";
  const response = await makePostRequest(url, payload);
  return response.data.payload;
};

export default getVendorWithName;
