import Logo from "../assets/richpanellogo.png";
import { useNavigate } from "react-router-dom";
import MessagesBox from "./MessagesBox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faRotateRight,
  faInbox,
  faPeopleGroup,
  faArrowUpRightDots,
  faMobile,
  faRefresh,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const ConversationList = () => {
  const navigate = useNavigate();
  return (
    <div className="w-80 flex flex-col text-black border-r-2">
      <div className="flex items-center justify-between">
        <FontAwesomeIcon className="fa-xl ms-4 cursor-pointer" icon={faBars} />
        <h1 className="text-2xl font-semibold m-4 text-black">Conversations</h1>
        <FontAwesomeIcon className="fa-xl mr-2 cursor-pointer" icon={faRotateRight} />
      </div>

      <MessagesBox></MessagesBox>
      <MessagesBox></MessagesBox>
      <MessagesBox></MessagesBox>
      <MessagesBox></MessagesBox>
    </div>
  );
};
