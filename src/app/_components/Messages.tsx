import { ThreadMessage } from "openai/resources/beta/threads/messages/messages.mjs";
import React, { useEffect, useRef } from "react";
import Message from "./Message";

function Messages({ messages }: { messages: ThreadMessage[] }) {
  const lastMessageRef = useRef<any>(null);

  // Scroll to the last message whenever the messages update
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      {messages.map((m, index) => (
        <Message
          key={index}
          message={m}
          ref={index === messages.length - 1 ? lastMessageRef : null}
        />
      ))}
    </div>
  );
}

export default Messages;
