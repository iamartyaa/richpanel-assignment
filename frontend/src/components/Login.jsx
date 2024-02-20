import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [label, setLabel] = useState("Login");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLabel("Logging in...");
    try {
      const response = await axios.post(`http://localhost:3000/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      console.log(e.response.data.error);
      setLabel("Login");

      setError(e.response.data.error);
      return;
    }
    navigate("/connect-facebook");
  };

  const dummyLogin = async (e) => {
    e.preventDefault();
    setLabel("Logging in...");
    navigate("/connect-facebook");
  };

  return (
    <div className="bg-[#1E4D91] h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <form className="bg-white w-96 p-2 h-max px-4 rounded-2xl">
          {error && <p className="text-red-700">{error}</p>}
          <h1 className="text-lg text-center font-semibold m-7">
            Login to your Account
          </h1>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="dummy@user.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              className="p-1 border border-gray-600 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="*********"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              className="p-1 border border-gray-600 rounded-sm w-full"
            />
          </div>

          <div>
            <label htmlFor="rememberMe">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={() => {
                  setRememberMe(!rememberMe);
                }}
                name="rememberMe"
                id="rememberMe"
              />
              Remember me
            </label>
          </div>

          <div className="">
            <button
              type="submit"
              className="bg-blue-800 text-white p-2 mt-6 w-full rounded-md"
              onClick={handleLogin}
            >
              {label}
            </button>
          </div>
          <div className="">
            <button
              type="submit"
              className="bg-blue-800 text-white p-2 mt-4 w-full rounded-md"
              onClick={dummyLogin}
            >
              Dummy Login
            </button>
          </div>

          <div className="mt-3">
            <p>
              Do not have an account,{" "}
              <span
                className="text-blue-600 underline cursor-pointer"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register here
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
