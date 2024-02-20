import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [label, setLabel] = useState("Register");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLabel("Registering...");
    try {
      const response = await axios.post(`http://localhost:3000/register`, {
        userName,
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
    } catch (e) {
      console.log(e.response.data.error);
      setLabel("Register");

      setError(e.response.data.error);
      return;
    }

    navigate("/login");
  };

  const dummyRegister = async (e) => {
    e.preventDefault();
    setLabel("Registering...");
    navigate("/connect-facebook");
  };

  return (
    <div className="bg-[#1E4D91] h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <form className="bg-white w-96 p-2 h-max px-4 rounded-2xl">
          {error && <p className="text-red-700">{error}</p>}

          <h1 className="text-lg text-center font-semibold m-7">
            Register your Account
          </h1>

          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Dummy User"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="p-1 border border-gray-600 rounded-sm w-full"
            />
          </div>

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
              onClick={handleRegister}
            >
              {label}
            </button>
          </div>
          <div className="">
            <button
              type="submit"
              className="bg-blue-800 text-white p-2 mt-4 w-full rounded-md"
              onClick={dummyRegister}
            >
              Dummy Register
            </button>
          </div>

          <div className="mt-3">
            <p>
              Already have an account,{" "}
              <span
                className="text-blue-600 underline cursor-pointer"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login here
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
