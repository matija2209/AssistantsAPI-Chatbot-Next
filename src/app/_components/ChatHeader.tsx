import Image from "next/image";
import React from "react";
import BotImage from "@/assets/chatbot-icon.svg";

function ChatHeader() {
  return (
    <div className="sticky top-0 w-full bg-white border-b border-gray-200">
      <div className="flex justify-between py-1 mb-4">
        <div className="flex items-center  px-2 gap-2 pt-2">
          <Image className="w-10 h-10" src={BotImage} alt="Chatbot"></Image>
          <span className="text-lg font-bold text-zinc-700">
            {process.env.NEXT_PUBLIC_CHATBOT_NAME}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
