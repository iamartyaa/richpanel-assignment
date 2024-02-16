import { useState } from "react";
import "./App.css";

import FBConnect from "./components/FBconnect";
import FBDisconnect from "./components/FBDisconnect";
import Agent from "./components/Agent";

import { FacebookProvider } from "./context/FacebookContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0);

  return (
    <FacebookProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FBConnect/>} />
          <Route path="/login" element={<FBConnect/>} />
          <Route path="/home" element={<FBDisconnect/>} />
          <Route path="/dashboard" element={<Agent/>} />
        </Routes>
      </BrowserRouter>
    </FacebookProvider>
  );
}

export default App;
