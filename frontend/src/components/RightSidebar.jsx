import Logo from "../assets/richpanellogo.png";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faPeopleGroup,
  faArrowUpRightDots,
  faMobile,
  faRefresh,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const RightSidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-80 flex flex-col text-black border-l-2">
      <div className="flex flex-col items-center justify-center h-80 p-4">
        <FontAwesomeIcon
          className="m-2 fa-2xl text-blue-700 border-2 p-6 rounded-full bg-gray-300"
          icon={faUser}
        />
        <p>Dummy User</p>
        <p>online</p>
        <div className="flex mt-6">
          <button className="border-2 mr-8 px-4 py-1 rounded">
            <FontAwesomeIcon className="fa-regular mr-2" icon={faPhone} />
            Call
          </button>
          <button className="border-2 px-4 py-1 rounded">
            <FontAwesomeIcon className="fa-regular mr-2" icon={faUser} />
            Profile
          </button>
        </div>
      </div>

      <div className="bg-gray-200 grow">
        <div className="p-2 rounded bg-white m-4 h-60">
          <h2 className="p-2 font-semibold text-xl">Customer Details</h2>
          <div className="p-2 flex flex-col">
            <div className="flex justify-between mb-3">
              <p className="text-gray-500">Email</p>
              <p>dummy@user.com</p>
            </div>
            <div className="flex justify-between mb-3">
              <p className="text-gray-500">First Name</p>
              <p>Dummy</p>
            </div>
            <div className="flex justify-between mb-3">
              <p className="text-gray-500">Last Name</p>
              <p>User</p>
            </div>
          </div>
          <p className="p-2 cursor-pointer text-blue-700">View more details</p>
        </div>
      </div>
    </div>
  );
};
