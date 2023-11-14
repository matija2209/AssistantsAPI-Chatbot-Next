import React from 'react'

function ChatHeader() {
    // existing logic for fetching data and handling chat toggle
    return (
      <div className="sticky top-0 w-full bg-white border-b border-gray-200">
        <div className="flex justify-between py-1 mb-4">
          <div className="flex items-center">
            {/* <img alt="profile picture" src={data?.logo ?? "src/assets/logo.png"} className="rounded-full m-1 mr-2 w-9 h-9" /> */}
            <h1 className="text-lg font-bold text-zinc-700">{"ChattyBird AI"}</h1>
          </div>
          <button className="text-sm py-3 hover:text-zinc-600 text-zinc-700">
            X
          </button>
        </div>
      </div>
    );
  }
  
export default ChatHeader