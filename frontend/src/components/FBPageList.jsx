import React, { useState, useEffect } from "react";
import { useFacebook } from "../context/FacebookContext";
import { Route, useNavigate } from "react-router-dom";

function FBPageList() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    window.FB.api("/me/accounts", "GET", {}, (response) => {
      if (response && !response.error) {
        response.data.forEach((page) => {
          console.log(page);
        });
      } else {
        console.error("Error fetching user's pages");
      }
    });
  }, []);

  return (
    <div className="bg-white p-10 rounded text-3xl font-bold">
      <p className="text-black mb-8"> Facebook Pages List</p>
    </div>
  );
}

export default FBPageList;
