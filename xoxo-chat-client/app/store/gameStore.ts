import { create } from 'zustand';

interface Store {
  pairs: string[];
  setPairs: (id: string) => void;
}

const useGameStore = create<Store>((set) => ({
  pairs: [],
  setPairs: (id: string) => set((state) => ({ pairs: [...state.pairs, id] }))
}));

export default useGameStore;
