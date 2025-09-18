import { ChatWindow } from "./components/ChatWindow";
import { ChatInput } from "./components/ChatInput";
import { ResetButton } from "./components/ResetButton";
import { ErrorToast } from "./components/ErrorToast";
import { useChat } from "./hooks/useChat";
import { Newspaper } from "lucide-react";

function App() {
  const {
    messages,
    isLoading,
    isTyping,
    error,
    sendMessage,
    resetChat,
    clearError,
  } = useChat();

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500 text-white rounded-lg">
            <Newspaper size={24} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              News RAG Chat
            </h1>
            <p className="text-sm text-gray-500">
              Ask about current news and events
            </p>
          </div>
        </div>
        <ResetButton onReset={resetChat} disabled={isLoading || isTyping} />
      </header>

      {/* Loading State */}
      {isLoading && messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Initializing chat session...</p>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {!isLoading && (
        <>
          <ChatWindow messages={messages} isTyping={isTyping} />
          <ChatInput
            onSendMessage={sendMessage}
            disabled={isLoading || isTyping}
          />
        </>
      )}

      {/* Error Toast */}
      {error && <ErrorToast message={error} onClose={clearError} />}
    </div>
  );
}

export default App;
