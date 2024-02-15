import React, { useState, useEffect } from "react";
import { useFacebook } from "../context/FacebookContext";
import { Navigate } from "react-router-dom";

function FBConnect() {
  const { facebookToken, setToken } = useFacebook();
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const checkLoginStatus = () => {
    window.FB.getLoginStatus((response) => {
      if (response.status === "connected") {
        setIsLoggedIn(true);
        setToken(response.authResponse.accessToken); // Store the token
      }
    });
  };

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1059554408600402",
        xfbml: true,
        version: "v19.0",
      });
      checkLoginStatus();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleLogin = () => {
    window.FB.login((response) => {
      if (response.authResponse) {
        setIsLoggedIn(true);
        setToken(response.authResponse.accessToken);
      } else {
        console.error("Facebook login failed");
      }
    }, {scope: 'public_profile, email, pages_messaging, pages_show_list'});
  };


  return (
    <div>
      {isLoggedIn ? (
        // <p>You are logged in with Facebook</p>
        <Navigate to="/home"></Navigate>
      ) : (
        <div className="bg-white p-10 rounded text-3xl font-bold">
          <p className="text-black mb-8"> Facebook Page integration</p>
          <button onClick={handleLogin} className="bg-blue-700 text-white">
            Connect Facebook
          </button>
        </div>
      )}
    </div>
  );
}

export default FBConnect;
