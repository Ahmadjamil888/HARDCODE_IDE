import { create } from 'zustand';
import { ChatMessage } from '@/types/ai';

interface AIStore {
  messages: ChatMessage[];
  isStreaming: boolean;
  streamingContent: string;
  addMessage: (msg: ChatMessage) => void;
  setMessages: (messages: ChatMessage[]) => void;
  setStreaming: (isStreaming: boolean) => void;
  setStreamingContent: (content: string) => void;
  appendStreamChunk: (chunk: string) => void;
  finalizeStream: (role: 'assistant' | 'user') => void;
  clearMessages: () => void;
}

export const useAIStore = create<AIStore>((set, get) => ({
  messages: [],
  isStreaming: false,
  streamingContent: '',

  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  
  setMessages: (messages) => set({ messages }),

  setStreaming: (isStreaming) => set({ isStreaming }),

  setStreamingContent: (streamingContent) => set({ streamingContent }),

  appendStreamChunk: (chunk) => set((state) => ({ streamingContent: state.streamingContent + chunk })),

  finalizeStream: (role) => {
    const { streamingContent, messages } = get();
    if (!streamingContent) return;

    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      projectId: '', // Context-dependent
      role,
      content: streamingContent,
      createdAt: new Date()
    };

    set({
      messages: [...messages, newMessage],
      streamingContent: '',
      isStreaming: false
    });
  },

  clearMessages: () => set({ messages: [], streamingContent: '', isStreaming: false })
}));
