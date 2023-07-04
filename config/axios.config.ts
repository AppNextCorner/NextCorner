import axios from "axios";
import refreshTokenId from "util/refreshTokenId";
import { url } from "constants/API";

/**
 * The axiosInstance
 */
const axiosInstance = axios.create({
  baseURL: url.API_URL,
});

// Ensures that the content is recieved as json
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";

/**
 * Token updater
 * @returns
 */
const setUpdatedToken = async () => {
  try {
    const token = await refreshTokenId();

    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    return Promise.resolve("done");
  } catch (e) {
    return Promise.reject({
      status: 400,
      errorMessage: "Error occured with Firebase token",
    });
  }
};

// GetRequest, update the token and then send a get request with axios
export const makeGetRequest = async (reqUrl: string): Promise<any> => {
  await setUpdatedToken();
  return axiosInstance.get<any>(reqUrl);
};

// PostRequest, update the token then send a post request with url and payload using axios
export const makePostRequest = async (reqUrl: string, payload: any) => {
  setUpdatedToken();
  return axiosInstance.post<any>(reqUrl, payload);
};

// PutRequest, update the token and then send a put request with url and payload using axios
export const makePutRequest = async (reqUrl: string, payload: any) => {
  setUpdatedToken();
  return axiosInstance.put<any>(reqUrl, payload);
};

// DeleteRequest, update the token and then send a delete request with axios
export const makeDeleteRequest = async (reqUrl: string) => {
  setUpdatedToken();
  return axiosInstance.delete<any>(reqUrl);
};
