import React from "react";
import useSWR from "swr";
import { fetcher } from "../_utils/fetcher";
import { ThreadMessagesPage } from "openai/resources/beta/threads/messages/messages.mjs";

import Messages from "./Messages";
import { useChatbotContext } from "../_contexts/ChatbotProvider";

function MessageWindows() {
  const { threadId } = useChatbotContext();
  const { data: messages, error } = useSWR<ThreadMessagesPage | any>(() => {
    if (threadId) {
      return `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/messages?threadId=${threadId}`;
    }
    return;
  }, fetcher);

  if (error)
    return (
      <div className="p-4 bg-red-500 text-white">Error loading messages...</div>
    );
  if (!messages) return; // It's still loading messages
  if (messages?.noMessages)
    return (
      <p className="bg-red-400 p-4 text-white">
        Sorry there was an error fetching your messages.
      </p>
    );

  const sortedMessagesByDate = messages.data.sort(
    (a: any, b: any) => a.created_at - b.created_at
  );
  return (
    <div className="flex-grow overflow-y-auto p-4">
      <Messages messages={sortedMessagesByDate}></Messages>
    </div>
  );
}

export default MessageWindows;
