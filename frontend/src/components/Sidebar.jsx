import Logo from "../assets/richpanellogo.png";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faPeopleGroup,
  faArrowUpRightDots,
  faMobile,
  faRefresh,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen bg-[#1E4D91] text-white">
      <div className="flex items-center justify-center p-4">
        <img src={Logo} alt="Logo" className="w-12 h-12" />
      </div>
      <div className="flex flex-col flex-1 items-center justify-between">
        <div className="my-4 flex flex-col items-center justify-center">
          <FontAwesomeIcon className="mb-8 fa-2xl" icon={faInbox} />
          {/* <div className=" border-solid border-2 border-red-700 h-12 w-full   bg-white text-black">
          </div> */}
          <FontAwesomeIcon className="mb-8 fa-2xl" icon={faPeopleGroup} />
          <FontAwesomeIcon className="mb-8 fa-2xl" icon={faArrowUpRightDots} />
        </div>
      </div>
      <div className="flex items-center p-4 cursor-pointer">
        <FontAwesomeIcon
          className="fa-2xl"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          icon={faUser}
        />
      </div>
    </div>
  );
};
