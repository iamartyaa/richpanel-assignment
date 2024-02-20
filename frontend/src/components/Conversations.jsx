import React from "react";
import { ConversationItem } from "./ConversationItem";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Conversations = () => {
  const conversations = [
    {
      id: 1,
      participant: "Dummy User 1",
      timestamp: "2024-02-15 @ 11:18",
      lastMessage: "Hey what are you up to today?",
      isCurrentUser: true,
    },
    {
      id: 2,
      participant: "Dummy User 2",
      timestamp: "2024-02-15 @ 11:21",
      lastMessage: "Working on a Project ",
      isCurrentUser: false,
    },
    {
      id: 3,
      participant: "Dummy User 2",
      timestamp: "2024-02-15 @ 11:30",
      lastMessage: "Did you get your product ? ",
      isCurrentUser: true,
    },
    {
      id: 4,
      participant: "Dummy User 1",
      timestamp: "2024-02-15 @ 16:21",
      lastMessage: "product ?",
      isCurrentUser: false,
    },
    {
      id: 5,
      participant: "Dummy User 1",
      timestamp: "2024-02-15 @ 16:22",
      lastMessage: "hello, which product?",
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
          className="m-2 fa-xl text-blue-700 cursor-pointer"
          icon={faPaperPlane}
        />
      </div>
    </div>
  );
};
