import React, { createContext, useContext, useState } from "react";

const FacebookContext = createContext();

export const FacebookProvider = ({ children }) => {
  const [facebookToken, setFacebookToken] = useState("");

  const setToken = (token) => {
    setFacebookToken(token);
  };

  const disconnect = () => {
    window.FB.logout(function (response) {});
    // Person is now logged out      

    setFacebookToken("");
  };

  return (
    <FacebookContext.Provider value={{ facebookToken, setToken, disconnect }}>
      {children}
    </FacebookContext.Provider>
  );
};

export const useFacebook = () => {
  return useContext(FacebookContext);
};
