import React, { useState } from "react";

import io from "socket.io-client";

import SocketContext from "./context";

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const connect = () => {
    const sk = io("http://3.7.215.226:8080", {
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
