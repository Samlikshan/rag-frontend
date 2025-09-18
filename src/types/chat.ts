export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ChatSession {
  sessionId: string;
}

export interface ChatRequest {
  sessionId: string;
  query: string;
}

export interface ChatResponse {
  response: string;
  sessionId: string;
}

export interface HistoryResponse {
  history: Message[];
}
