// Configuring API Url to use when developing

export let API = "";
const apiStatus: string = "local";

switch (apiStatus) {
  case "production":
    API = "";
    break;
  case "development":
    API = "https://nextcornerdevelopment.onrender.com";
    break;
  default:
    API = `http://192.168.1.24:4020`;
    break;
}

export const url = { API_URL: API };
