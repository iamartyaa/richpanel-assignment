import { useState } from "react";
import "./App.css";

import { Login } from "./components/Login";
import FBConnect from "./components/FBconnect";
import FBDisconnect from "./components/FBDisconnect";
import Agent from "./components/Agent";

import { FacebookProvider } from "./context/FacebookContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./components/Register";


function App() {
  const [count, setCount] = useState(0);

  return (
    <FacebookProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/connect-facebook" element={<FBConnect/>} />
          <Route path="/home" element={<FBDisconnect/>} />
          <Route path="/dashboard" element={<Agent/>} />
        </Routes>
      </BrowserRouter>
    </FacebookProvider>
  );
}

export default App;
