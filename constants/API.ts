// Configuring API Url to use when developing

export let API = "";
const apiStatus: string = "local";
export let wsUrl: string = "";
const wsChecker: string = "local";

switch(wsChecker) {
  case "production":
    wsUrl = "wss://nextcornerwebsocket.onrender.com/ws";
    break;
  case "development":
    wsUrl = "ws://192.168.1.19:4002/ws";
    break;
  default:
    wsUrl = "ws://192.168.1.19:4002/ws"
    break;
}

switch (apiStatus) {
  case "production":
    API = "";
    break;
  case "development":
    API = "https://nextcornerdevelopment.onrender.com";
    break;
  default:
    API = "http://192.168.1.19:4020";
    break;
}

export const url = { API_URL: API };
console.log("url: ", url);
