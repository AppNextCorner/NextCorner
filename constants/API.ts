// Configuring API Url to use when developing

export let API = "";
const apiStatus: string = "development";

switch (apiStatus) {
  case "production":
    API = "";
    break;
  case "development":
    API = "https://nextcornerdevelopment.onrender.com";
    break;
  default:
    API = ``;
    break;
}

export const url = { API_URL: API };
console.log("url: ", url);
