import { create } from 'zustand';
import { Player } from '../types';

interface Store {
  player: null | Player;
  setPlayer: (player: Player) => void;
}

export const usePlayerStore = create<Store>((set) => ({
  player: null,
  setPlayer: (player: Player) => set({ player: player })
}));

export default usePlayerStore;
