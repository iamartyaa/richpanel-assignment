import React from "react";
import { ConversationItem } from "./ConversationItem";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Conversations = () => {
  const conversations = [
    {
      id: 1,
      participant: "Himanshu Chauhan",
      timestamp: "2024-02-15 @ 06:18",
      lastMessage: "Hey Bruce, what are you up to today?",
      isCurrentUser: true,
    },
    {
      id: 2,
      participant: "Bruce Banner",
      timestamp: "2024-02-15 @ 06:19",
      lastMessage: "Working on Gamma Rads ",
      isCurrentUser: false,
    },
    {
      id: 3,
      participant: "Bruce Banner",
      timestamp: "2024-02-15 @ 06:20",
      lastMessage: "did you get the package I sent. ",
      isCurrentUser: true,
    },
    {
      id: 4,
      participant: "Bruce Banner",
      timestamp: "2024-02-15 @ 06:21",
      lastMessage: "What package?",
      isCurrentUser: false,
    },
    {
      id: 5,
      participant: "Himanshu",
      timestamp: "2024-02-15 @ 06:22",
      lastMessage: "tell me you are kidding, right?",
      isCurrentUser: true,
    },
  ];

  // border-solid border-2 border-red-200

  return (
    <div className="h-full flex flex-col justify-between container mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-black border-b-2">Bruce Banner</h1>
      <ul className="grow flex flex-col space-y-4 w-full ">
        {conversations.map((conversation) => (
          <ConversationItem key={conversation.id} conversation={conversation} />
        ))}
      </ul>

      <div className="flex items-center">
        <input
          className="border-2 w-full mt-2 p-3 rounded-lg"
          placeholder="type your message here..."
          type="text"
          name="messageinput"
          id="msginput"
        />
        <FontAwesomeIcon
          className="m-2 fa-xl text-blue-700"
          icon={faPaperPlane}
        />
      </div>
    </div>
  );
};
