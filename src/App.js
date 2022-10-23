import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
import Poll from "./components/Poll";
import useSocket from "./contexts/socket/useSocket";
import {Toaster} from 'react-hot-toast'

const App = () => {
  const { socket, connect, disconnect } = useSocket();

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/poll/:id" element={<Poll />} />
      </Routes>
    </div>
  );
};

export default App;
