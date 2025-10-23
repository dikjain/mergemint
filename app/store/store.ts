import { create } from 'zustand';
import type { MarkStore, StoreItem } from '@/types';

export type { MarkStore, StoreItem };

export const useMarkStore = create<MarkStore>((set, get) => ({
  currentMark: 0,
  currentItems: null,
  storeItems: [],

  setCurrentMark: (mark: number) => set({ currentMark: mark }),

  incrementMark: (amount = 1) =>
    set((state) => ({
      currentMark: state.currentMark + amount,
    })),

  resetMark: () => set({ currentMark: 0 }),

  setCurrentItems: (item: StoreItem | null) => {
    set({ currentItems: item });
  },

  setStoreItems: (items: StoreItem[]) => {
    set({ storeItems: items });
  },
}));
