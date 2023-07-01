import { makePutRequest } from "../../../config/axios.config";

const postReview = async (payload: any): Promise<any> => {
  const url = "";
  const response = await makePutRequest(url, payload);
  return response;
};

export default postReview;
