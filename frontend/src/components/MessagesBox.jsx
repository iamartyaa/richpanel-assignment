import React from "react";

function MessagesBox() {
  return (
    <div className="p-2 text-slate-700 text-[14px] border-b-2 hover:bg-gray-300 cursor-pointer">
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-1">
          <input type="checkbox" className="m-3 transform scale-150" />
          <div className="px-2">
            <p className="text-lg">Bruce Banner</p>
            <p className="text-md">Facebook DM</p>
          </div>
        </div>
        <p className="text-gray-600 font-medium ">10m</p>
      </div>
      <div className="ms-4 mt-2">
        <p className="font-semibold text-gray-600">Awesome Product</p>
        <p>Hey There, I probably did one of the best .....</p>
      </div>
    </div>
  );
}

export default MessagesBox;
