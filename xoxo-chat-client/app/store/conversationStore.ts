import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Conversation } from '../types';

interface Store {
  conversation: null | Conversation;
  setConversation: (conversation: Conversation) => void;
}

export const useConversationStore = create(
  persist<Store>(
    (set, get) => ({
      conversation: null,
      setConversation: (conversation: Conversation) =>
        set({ conversation: conversation })
    }),
    {
      name: 'conversation-store' // name of the item in the storage
    }
  )
);

export default useConversationStore;
