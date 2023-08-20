import React from "react";

export const WebSocketContext = React.createContext(
  new WebSocket(`ws://192.168.1.227:4002/ws?uid=649c81bc7405e86a8581caa1`)
);
