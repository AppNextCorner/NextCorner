import axios from "axios";
import refreshTokenId from "util/refreshTokenId";
import { url } from "constants/API";
import { Platform } from "react-native";

/**
 * The axiosInstance
 */
const axiosInstance = axios.create({
  baseURL: url.API_URL,
});

// Ensures that the content is recieved as json
axiosInstance.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";

const axiosImageInstance = axios.create({
  baseURL: url.API_URL,
})


const axiosDynamicInstance = axios.create({
  baseURL: url.API_URL,
})


/**
 * Token updater
 * @returns
 */
const setUpdatedToken = async () => {
  try {
    const token = await refreshTokenId();
    axiosDynamicInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    axiosImageInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    return Promise.resolve("done");
  } catch (e) {
    return Promise.reject({
      status: 400,
      errorMessage: "Error occured with Firebase token",
    });
  }
};

const makeDynamicPostRequest = async(reqUrl: string, payload: any, headers: any[]): Promise<any> => {
  await setUpdatedToken();
  console.log(headers)
  for(let i = 0; i < headers.length; i++) {
    axiosDynamicInstance.defaults.headers.post[headers[i].name] = headers[i].value;
  }
 
  return axiosDynamicInstance.post<any>(reqUrl, payload, );
} 

// GetRequest, update the token and then send a get request with axios
 const makeGetRequest = async (reqUrl: string): Promise<any> => {
  await setUpdatedToken();
  return axiosInstance.get<any>(reqUrl);
};

// PostRequest, update the token then send a post request with url and payload using axios
 const makePostRequest = async (reqUrl: string, payload: any) => {
  console.log("POST")
  setUpdatedToken();
  return axiosInstance.post<any>(reqUrl, payload);
};

// PutRequest, update the token and then send a put request with url and payload using axios
 const makePutRequest = async (reqUrl: string, payload: any) => {
  setUpdatedToken();
  return axiosInstance.put<any>(reqUrl, payload);
};

// DeleteRequest, update the token and then send a delete request with axios
 const makeDeleteRequest = async (reqUrl: string) => {
  setUpdatedToken();
  return axiosInstance.delete<any>(reqUrl);
};



// PostRequest, update the token then send a post request with url and payload using axios
const makeImagePostRequest = async (reqUrl: string, payload: any) => {
  Platform.OS === "ios" ? null : axiosImageInstance.defaults.headers.post["Content-Type"] = "multipart/form-data";

  setUpdatedToken();
  return axiosImageInstance.post<any>(reqUrl, payload);
};

// add comments
const makeImagePutRequest = async (reqUrl: string, payload: any) => {
  axiosImageInstance.defaults.headers.post["Content-Type"] = "multipart/form-data";
  //Platform.OS === "ios" ? null : 
  //axiosImageInstance.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";

  setUpdatedToken();
  return axiosImageInstance.put<any>(reqUrl, payload);
};

export {makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest,  makeImagePostRequest, makeImagePutRequest, makeDynamicPostRequest }