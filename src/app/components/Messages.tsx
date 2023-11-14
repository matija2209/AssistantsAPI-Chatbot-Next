import React from "react";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import Message from "./Message";
import { ThreadMessagesPage } from "openai/resources/beta/threads/messages/messages.mjs";
import { useLocalStorage } from "usehooks-ts";

function Messages() {
  const [threadId, setThreadId] = useLocalStorage("threadId", undefined);
  const { data: messages, error } = useSWR<ThreadMessagesPage>(
    `http://localhost:3000/api/messages?threadId=${threadId}`,
    fetcher
  );

  if (error) return <div>Error loading messages...</div>;
  if (!messages) return <div>Loading...</div>;
  if (messages.noMessages) return <p>Type your first message BRO!!!!</p>;
  return (
    <div className="flex-grow overflow-y-auto">
      {messages.data.map((m, index) => (
        <Message key={index} message={m} />
      ))}
    </div>
  );
}

export default Messages;
