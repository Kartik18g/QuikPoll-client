import React, { useState } from "react";
import { useEffect } from "react";

import io from "socket.io-client";

import SocketContext from "./context";

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const connect = () => {
    const sk = io("https://warm-plateau-12609.herokuapp.com/", {
      path: "/production",
      transports: ["websocket", "polling","flashsocket"],
      reconnection: true,
      reconnectionDelay: 1000,
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
