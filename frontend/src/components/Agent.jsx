import React, { useState, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard"

function Agent() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
  }, []);

  return (
      <Dashboard></Dashboard>
  );
}

export default Agent;
