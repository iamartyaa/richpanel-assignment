import React, { useState, useEffect } from "react";
import { useFacebook } from "../context/FacebookContext";
import { Route, useNavigate} from "react-router-dom";

function FBDisconnect() {
  const { disconnect } = useFacebook();
  const navigate = useNavigate();

  const handleDisconnect = () => {
    disconnect();
    // Redirect to the login page after disconnecting
    navigate('/login'); // Replace '/login' with your actual login route
  };

  return (
    <div className="bg-white p-10 rounded text-3xl font-bold">
      <p className="text-black mb-8"> Facebook Page integration</p>
      <p className="text-black mb-8"> Integrated Page: </p>
      <div className="flex flex-col">
        <button onClick={handleDisconnect} className="bg-red-500 mb-8 text-white">
          Delete Integration
        </button>
        <button onClick={() => navigate('/pagelist')} className="bg-blue-700 text-white">Reply to Messages</button>
      </div>
    </div>
  );
}

export default FBDisconnect;
