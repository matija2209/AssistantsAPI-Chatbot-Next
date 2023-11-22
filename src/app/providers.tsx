"use client";

import { ReactNode } from "react";
import { ChatbotProvider } from "./_contexts/ChatbotProvider";

export function Providers({ children }: { children: ReactNode }) {
  return <ChatbotProvider>{children}</ChatbotProvider>;
}
