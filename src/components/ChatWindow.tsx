import React, { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import type { Message } from "../types/chat";

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isTyping,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <div className="text-center max-w-md">
            <h2 className="text-xl font-semibold mb-2">
              Welcome to News RAG Chat
            </h2>
            <p className="text-sm">
              Ask me anything about current news and events. I'll search through
              the latest articles to provide you with accurate, up-to-date
              information.
            </p>
          </div>
        </div>
      ) : (
        <>
          {messages?.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
