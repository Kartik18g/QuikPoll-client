import React, { useState } from "react";

import io from "socket.io-client";

import SocketContext from "./context";

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const connect = () => {
    const sk = io("wss://7jjo66x7za.execute-api.ap-south-1.amazonaws.com/production", {
      transports: ["websocket", "polling","flashsocket"],   
    });
    setSocket(sk);
  };

  const disconnect = () => {
    if (socket) {
      socket.close();
    }
  };

  return (
    <SocketContext.Provider value={{ socket, connect, disconnect }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
