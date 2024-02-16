import React, { useState, useEffect } from "react";
import { useFacebook } from "../context/FacebookContext";
import { Route, useNavigate } from "react-router-dom";

function FBDisconnect() {
  const { disconnect } = useFacebook();
  const navigate = useNavigate();

  const handleDisconnect = () => {
    disconnect();
    // Redirect to the connect page after disconnecting
    navigate("/connect-facebook"); 
  };

  return (
    <div className="bg-[#1E4D91] h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-white p-6 rounded text-center">
          <p className="text-xl text-gray-900 mb-1">
            Facebook Page integration
          </p>
          <p className="text-lg text-gray-900 mb-5">
            Integrated Page: <span className="font-bold">Amazon Business</span>
          </p>
          <div className="flex flex-col">
            <button
              onClick={handleDisconnect}
              className="bg-red-500 mb-3 p-1 text-white"
            >
              Delete Integration
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-700 p-1 text-white"
            >
              Reply to Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FBDisconnect;
