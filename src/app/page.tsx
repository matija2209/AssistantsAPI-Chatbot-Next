"use client";
import ChatHeader from "./_components/ChatHeader";
import MessageWindows from "./_components/MessageWindow";
import InputArea from "./_components/InputArea";
import { useEffect } from "react";

import { mutate } from "swr";
import { useChatbotContext } from "./_contexts/ChatbotProvider";

export default function Home() {
  const { runId, threadId, setIsLoading, isLoading, setRunId } =
    useChatbotContext();

  useEffect(() => {
    if (!runId || !threadId) return;

    const checkStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/status?threadId=${threadId}&runId=${runId}`
        );
        const { status } = await response.json();
        setIsLoading(true);

        if (status === "completed") {
          setIsLoading(false);
          await mutate(
            `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/messages?threadId=${threadId}`
          );
          setRunId(undefined);
          // You might want to do something once the run is completed.
        } else {
          // Recheck after a delay if not completed
          setTimeout(checkStatus, 1000);
        }
      } catch (error) {}
    };

    checkStatus();
  }, [runId, threadId]);

  return (
    <main
      id="chatbot-openai"
      className="w-screen h-screen bg-white shadow-lg overflow-hidden flex flex-col"
    >
      <ChatHeader></ChatHeader>
      <MessageWindows></MessageWindows>
      {isLoading && <LoadingSpinner></LoadingSpinner>}
      <InputArea></InputArea>
    </main>
  );
}

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
    </div>
  );
};
