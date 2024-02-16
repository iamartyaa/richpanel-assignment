import React from 'react';

export const ConversationItem = ({ conversation }) => {
  const { participant, timestamp, lastMessage, isCurrentUser } = conversation;

  // border-solid border-2 border-red-200
  return (
    <div className={`${isCurrentUser ? 'self-end' : 'self-start'}`}>
      <li className="text-black p-4 w-80 bg-gray-200 rounded-md">
        <div className="flex flex-col w-full">
          <div className="text-base">{lastMessage}</div>
          <div className="text-sm font-medium">{participant}</div>
          <div className=" text-right text-xs text-gray-500">{timestamp}</div>
        </div>
      </li>
    </div>
  );
};
