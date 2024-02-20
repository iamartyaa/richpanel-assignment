import React, { useState, useEffect } from "react";
import { useFacebook } from "../context/FacebookContext";
import { Navigate, useNavigate } from "react-router-dom";

function FBConnect() {
  const { facebookToken, setToken } = useFacebook();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()

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
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          setIsLoggedIn(true);
          setToken(response.authResponse.accessToken);
        } else {
          console.error("Facebook login failed");
        }
      },
      { scope: "public_profile" }
    );
  };

  return (
    <div>
      {isLoggedIn ? (
        // <p>You are logged in with Facebook</p>
        <Navigate to="/home"></Navigate>
      ) : (
        <div className="bg-[#1E4F90] h-screen flex justify-center">
          <div className="flex flex-col justify-center">
            <div className="bg-white w-80 text-center p-8 h-max px-4 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">
                Facebook Page Integration
              </h3>
              <button
                onClick={handleLogin}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg mb-4"
              >
                Connect Facebook
              </button>
              <button
                onClick={() => {navigate('/home')}}
                className="bg-blue-800 text-white px-6 py-3 rounded-lg"
              >
                Login without FB - TRIAL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FBConnect;
