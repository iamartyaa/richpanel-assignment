import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FBConnect from "./components/FBconnect";
import { FacebookProvider } from "./context/FacebookContext";
import FBDisconnect from "./components/FBDisconnect";
import FBPageList from "./components/FBPageList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <FacebookProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FBConnect/>} />
          <Route path="/login" element={<FBConnect/>} />
          <Route path="/home" element={<FBDisconnect/>} />
          <Route path="/pagelist" element={<FBPageList/>} />
        </Routes>
      </BrowserRouter>
    </FacebookProvider>
  );
}

export default App;
