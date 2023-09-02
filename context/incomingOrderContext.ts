import React from "react";

export const WebSocketContext = React.createContext(
  new WebSocket(`ws://192.168.0.20:4002/`)
);
