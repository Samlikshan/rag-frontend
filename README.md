## News RAG Chat — Frontend (React + TypeScript + Vite + Tailwind)

A lightweight chat UI for a news-focused RAG backend. Built with React 19, TypeScript, Vite, Tailwind CSS, and Axios. It manages a chat session, sends user queries, displays assistant responses, shows typing/loading states, and supports clearing history.

### Highlights
- **Modern stack**: React 19 + Vite 7 + TypeScript + Tailwind CSS
- **Session management**: Persists `sessionId` in `localStorage`
- **API integration**: Configurable backend via `VITE_SERVER_URL`
- **UX niceties**: Typing indicator, error toasts, reset chat

---

### Quick start
1) Requirements
- Node.js 18+ (LTS) and npm

2) Install dependencies
```bash
npm install
```

3) Configure environment
- Create a `.env.local` at the project root (same folder as `package.json`).
- Set the backend URL (defaults to `http://localhost:5000/api` if omitted):
```bash
VITE_SERVER_URL=http://localhost:5000/api
```

4) Run the app
```bash
npm run dev
```
- Open the printed local URL (typically `http://localhost:5173`).

5) Build & preview production
```bash
npm run build
npm run preview
```

6) Lint
```bash
npm run lint
```

---

### Scripts
- `npm run dev`: Start Vite dev server
- `npm run build`: Type-check and build for production
- `npm run preview`: Preview the production build
- `npm run lint`: Run ESLint

---

### Configuration
- `VITE_SERVER_URL`: Base API URL for your backend (without the `/chat` suffix). The frontend will call `${VITE_SERVER_URL}/chat/...`.
  - Example: `http://localhost:5000/api`

---

### How it works

The app state is managed by `useChat` and the backend communication is handled by `chatService`.

- `src/hooks/useChat.ts`
  - Initializes/loads a `sessionId` from `localStorage` (`news-rag-session-id`).
  - Loads previous chat history.
  - Sends user messages and appends assistant responses.
  - Exposes `messages`, `isLoading`, `isTyping`, `error`, `sendMessage`, `resetChat`, `clearError`.

- `src/services/chatService.ts`
  - Axios instance configured with `baseURL = ${VITE_SERVER_URL}/chat`.
  - Methods: `createSession`, `sendMessage`, `getHistory`, `resetChat`.

- UI (`src/components`)
  - `ChatWindow`, `MessageBubble`, `TypingIndicator`, `ChatInput`, `ResetButton`, `ErrorToast`.

---

### API contract (expected backend)
Base: `${VITE_SERVER_URL}/chat`

- POST `/session`
  - Response: `{ sessionId: string }`

- POST `/query`
  - Request body: `{ sessionId: string; query: string }`
  - Response: `{ response: string; sessionId: string }`

- GET `/:sessionId/history`
  - Response: `{ history: Array<{ role: 'user' | 'assistant'; content: string; timestamp: string }>} }

- POST `/:sessionId/reset`
  - Response: 200/204

Type definitions live in `src/types/chat.ts`.

---

### Project structure
```
frontend/
  src/
    components/            # Presentational components (chat UI, inputs, toasts)
    hooks/useChat.ts       # Chat state and side effects
    services/chatService.ts# Axios client and API calls
    types/chat.ts          # Shared TypeScript types for chat
```

---

### Troubleshooting
- **CORS errors**: Ensure the backend allows the dev origin (e.g., `http://localhost:5173`).
- **404/Network errors**: Verify `VITE_SERVER_URL` and that your backend exposes `/chat/*` routes.
- **Session issues**: Clear `localStorage` key `news-rag-session-id` and refresh.
- **Timeouts**: `sendMessage` uses a 30s timeout. Increase server timeouts for long RAG calls.

---

### Deployment
The frontend builds to static assets in `dist/` and can be hosted on any static host (Netlify, Vercel, S3 + CloudFront, Nginx). Ensure the environment variable `VITE_SERVER_URL` is set at build time to point to your backend.

## News RAG Chat — Frontend (React + TypeScript + Vite + Tailwind)

A lightweight chat UI for a news-focused RAG backend. Built with React 19, TypeScript, Vite, Tailwind CSS, and Axios. It manages a chat session, sends user queries, displays assistant responses, shows typing/loading states, and supports clearing history.

### Highlights
- **Modern stack**: React 19 + Vite 7 + TypeScript + Tailwind CSS
- **Session management**: Persists `sessionId` in `localStorage`
- **API integration**: Configurable backend via `VITE_SERVER_URL`
- **UX niceties**: Typing indicator, error toasts, reset chat

---

### Quick start
1) Requirements
- Node.js 18+ (recommended LTS) and npm

2) Install dependencies
```bash
npm install
```

3) Configure environment
- Create a `.env.local` at the project root (same folder as `package.json`).
- Set the backend URL (defaults to `http://localhost:5000/api` if omitted):
```bash
VITE_SERVER_URL=http://localhost:5000/api
```

4) Run the app
```bash
npm run dev
```
- Open the printed local URL (typically `http://localhost:5173`).

5) Build & preview production
```bash
npm run build
npm run preview
```

6) Lint
```bash
npm run lint
```

---

### Scripts
- `npm run dev`: Start Vite dev server
- `npm run build`: Type-check and build for production
- `npm run preview`: Preview the production build
- `npm run lint`: Run ESLint

---

### Configuration
- `VITE_SERVER_URL`: Base API URL for your backend (without the `/chat` suffix). The frontend will call `${VITE_SERVER_URL}/chat/...`.
  - Example: `http://localhost:5000/api`

---

### How it works

The app state is managed by `useChat` and the backend communication is handled by `chatService`.

- `src/hooks/useChat.ts`
  - Initializes/loads a `sessionId` from `localStorage` (`news-rag-session-id`).
  - Loads previous chat history.
  - Sends user messages and appends assistant responses.
  - Exposes `messages`, `isLoading`, `isTyping`, `error`, `sendMessage`, `resetChat`, `clearError`.

- `src/services/chatService.ts`
  - Axios instance configured with `baseURL = ${VITE_SERVER_URL}/chat`.
  - Methods: `createSession`, `sendMessage`, `getHistory`, `resetChat`.

- UI (`src/components`)
  - `ChatWindow`, `MessageBubble`, `TypingIndicator`, `ChatInput`, `ResetButton`, `ErrorToast`.

---

### API contract (expected backend)
Base: `${VITE_SERVER_URL}/chat`

- POST `/session`
  - Response: `{ sessionId: string }`

- POST `/query`
  - Request body: `{ sessionId: string; query: string }`
  - Response: `{ response: string; sessionId: string }`

- GET `/:sessionId/history`
  - Response: `{ history: Array<{ role: 'user' | 'assistant'; content: string; timestamp: string }>} }

- POST `/:sessionId/reset`
  - Response: 200/204

Type definitions live in `src/types/chat.ts`.

---

### Project structure
```
frontend/
  src/
    components/            # Presentational components (chat UI, inputs, toasts)
    hooks/useChat.ts       # Chat state and side effects
    services/chatService.ts# Axios client and API calls
    types/chat.ts          # Shared TypeScript types for chat
```

---

### Troubleshooting
- CORS errors: Ensure the backend allows the dev origin (e.g., `http://localhost:5173`).
- 404/Network errors: Verify `VITE_SERVER_URL` and that your backend exposes `/chat/*` routes.
- Session issues: Clear `localStorage` key `news-rag-session-id` and refresh.
- Timeouts: `sendMessage` uses a 30s timeout. Increase server timeouts for long RAG calls.

---

### Deployment
The frontend builds to static assets in `dist/` and can be hosted on any static host (Netlify, Vercel, S3 + CloudFront, Nginx). Ensure the environment variable `VITE_SERVER_URL` is set at build time to point to your backend.


