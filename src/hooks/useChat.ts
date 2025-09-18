import { useState, useEffect, useCallback } from "react";
import type { Message } from "../types/chat";
import { chatService } from "../services/chatService";

const SESSION_STORAGE_KEY = "news-rag-session-id";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeSession = async () => {
      try {
        setIsLoading(true);

        let storedSessionId = localStorage.getItem(SESSION_STORAGE_KEY);

        if (
          !storedSessionId ||
          storedSessionId == "false" ||
          storedSessionId == "undefined" ||
          storedSessionId == "" ||
          storedSessionId.trim().length == 0
        ) {
          storedSessionId = await chatService.createSession();
          localStorage.setItem(SESSION_STORAGE_KEY, storedSessionId);
        }

        setSessionId(storedSessionId);

        try {
          const response = await chatService.getHistory(storedSessionId);
          setMessages(response.history);
        } catch (historyError) {
          console.warn(
            "No history found or error loading history:",
            historyError,
          );
        }
      } catch (error) {
        console.log("error initializing session", error);
        setError("Failed to initialize chat session. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };

    initializeSession();
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!sessionId || isTyping) return;

      const userMessage: Message = {
        role: "user",
        content,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => {
        return [...prev, userMessage];
      });
      setIsTyping(true);
      setError(null);

      try {
        const response = await chatService.sendMessage({
          sessionId,
          query: content,
        });
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        setError("Failed to send message. Please try again.");
        console.error("Error sending message:", error);
      } finally {
        setIsTyping(false);
      }
    },
    [sessionId, isTyping],
  );

  const resetChat = useCallback(async () => {
    if (!sessionId || isTyping) return;

    try {
      setIsLoading(true);
      await chatService.resetChat(sessionId);
      setMessages([]);
      setError(null);
    } catch (error) {
      setError("Failed to reset chat. Please try again.");
      console.error("Error resetting chat:", error);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, isTyping]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    isTyping,
    error,
    sendMessage,
    resetChat,
    clearError,
  };
};
