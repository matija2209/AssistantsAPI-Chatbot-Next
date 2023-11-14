"use client";
import ChatHeader from "./components/ChatHeader";
import Messages from "./components/Messages";
import InputArea from "./components/InputArea";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { mutate } from "swr";

export default function Home() {
  const [threadId, setThreadId] = useLocalStorage("threadId", undefined);
  const [runId, setRunId] = useLocalStorage<string | undefined>(
    "runId",
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!runId) return;

    const checkStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/status?threadId=${threadId}&runId=${runId}`
        );
        const { status } = await response.json();
        setIsLoading(status);

        if (status === "completed") {
          setIsLoading(status);
          await mutate(
            `http://localhost:3000/api/messages?threadId=${threadId}`
          );
          // You might want to do something once the run is completed.
        } else {
          // Recheck after a delay if not completed
          setTimeout(checkStatus, 2000);
        }
      } catch (error) {
        console.error("Error checking run status:", error);
        // Handle error appropriately
      }
    };

    checkStatus();
  }, [runId]);

  return (
    <main
      id="chatbot"
      className="w-screen h-screen bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
    >
      is loading: {isLoading}
      <ChatHeader></ChatHeader>
      <Messages></Messages>
      <InputArea></InputArea>
    </main>
  );
}
