import axios from "axios";
import refreshTokenId from "util/refreshTokenId";
import { url } from "constants/api.constants";

const axiosInstance = axios.create({
  baseURL: url.API_URL,
});

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";

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

export const makeGetRequest = async (reqUrl: string): Promise<any> => {
  await setUpdatedToken();
  return axiosInstance.get<any>(reqUrl);
};

export const makePostRequest = async (reqUrl: string, payload: any) => {
  setUpdatedToken();
  return axiosInstance.post<any>(reqUrl, payload);
};

export const makePutRequest = async (reqUrl: string, payload: any) => {
  setUpdatedToken();
  return axiosInstance.put<any>(reqUrl, payload);
};

export const makeDeleteRequest = async (reqUrl: string) => {
  setUpdatedToken();
  return axiosInstance.delete<any>(reqUrl);
};
