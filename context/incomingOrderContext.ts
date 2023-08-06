import React from "react";

export const WebSocketContext = React.createContext(
  new WebSocket(`ws://192.168.1.19:4002/ws/debug`)
);
