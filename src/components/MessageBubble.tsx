import React from "react";
import type { Message } from "../types/chat";
import { User, Bot } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === "user";
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex items-start gap-3 mb-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? "bg-blue-500" : "bg-gray-500"
        }`}
      >
        {isUser ? (
          <User size={16} className="text-white" />
        ) : (
          <Bot size={16} className="text-white" />
        )}
      </div>

      <div className={`max-w-[70%] ${isUser ? "text-right" : "text-left"}`}>
        <div
          className={`inline-block px-4 py-3 rounded-2xl ${
            isUser
              ? "bg-blue-500 text-white rounded-br-md"
              : "bg-gray-100 text-gray-900 rounded-bl-md"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
        <div
          className={`text-xs text-gray-500 mt-1 ${isUser ? "text-right" : "text-left"}`}
        >
          {timestamp}
        </div>
      </div>
    </div>
  );
};
