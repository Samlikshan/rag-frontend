import axios from "axios";

import type {
  ChatRequest,
  ChatResponse,
  ChatSession,
  HistoryResponse,
} from "../types/chat";

const API_BASE_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: `${API_BASE_URL}/chat`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

class ChatService {
  async createSession(): Promise<string> {
    try {
      const { data } = await api.post<ChatSession>("/session");
      return data.sessionId;
    } catch (error: any) {
      console.error("Error creating session:", error);
      return error.messages;
    }
  }

  async sendMessage(request: ChatRequest): Promise<string> {
    try {
      const { data } = await api.post<ChatResponse>("/query", request, {
        timeout: 30000,
      });
      return data.response;
    } catch (error: any) {
      console.error("Error sending message:", error?.message || error);
      return error.messages;
    }
  }

  async getHistory(sessionId: string): Promise<HistoryResponse> {
    try {
      const { data } = await api.get<HistoryResponse>(`/${sessionId}/history`);
      return data;
    } catch (error: any) {
      console.error("Error getting history:", error?.message || error);
      return { history: [] };
    }
  }

  async resetChat(sessionId: string): Promise<void> {
    try {
      await api.post(`/${sessionId}/reset`);
    } catch (error: any) {
      console.error("Error resetting chat:", error?.message || error);
      console.warn("Reset failed, continuing anyway");
      return error.messages;
    }
  }
}

export const chatService = new ChatService();
