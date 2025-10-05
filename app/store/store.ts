import { create } from 'zustand';

export interface MarkStore {
  currentMark: number;
  currentItems: Item[] | null;
  setCurrentMark: (mark: number) => void;
  incrementMark: (amount?: number) => void;
  resetMark: () => void;
  setCurrentItems: (items: Item[] | null) => void;
}

export interface Item {
  image: string;
  text: string;
  layoutId: string;
  x: number;
  y: number;
  rotation: number;
}

  export const defaultItems: Item[] = [
        {
          image: `https://wallpapers.com/images/high/nft-monkey-441q73yzqpw8o6y5.webp`,
          text: 'Golden Ape',
          layoutId : 'golden-ape',
          x: 25,
          y: 30,
          rotation: -15
        },
        {
          image: `https://wallpapers.com/images/high/nft-monkey-r237cp3zh1bj5ivs.webp`,
          text: 'Rare Ape',
          layoutId : 'rare-ape',
          x: 65,
          y: 45,
          rotation: -10
        },
        {
          image: `https://wallpapers.com/images/high/nft-monkey-piax0vgvrmnr3tss.webp`,
          text: 'Digital Primate',
          layoutId : 'digital-primate',
          x: 40,
          y: 30,
          rotation: 25
        },
        {
          image: `https://wallpapers.com/images/high/nft-monkey-pg4k4qtmfem0qlho.webp`,
          text: 'Pixel Monkey',
          layoutId : 'pixel-monkey',
          x: 80,
          y: 25,
          rotation: 20
        },
        {
          image: `https://wallpapers.com/images/high/nft-monkey-fdm9t6g8p3h4nj7n.webp`,
          text: 'Neon Ape',
          layoutId : 'neon-ape',
          x: 15,
          y: 60,
          rotation: 8
        },
        {
          image: `https://wallpapers.com/images/high/nft-monkey-j0rpoqvt1zl8z03g.webp`,
          text: 'Elite Monkey',
          layoutId : 'elite-monkey',
          x: 50,
          y: 60,
          rotation: 3
        },
        {
          image: `https://wallpapers.com/images/high/nft-monkey-cqcs8keyywd67e84.webp`,
          text: 'Chrome Ape',
          layoutId : 'chrome-ape',
          x: 35,
          y: 50,
          rotation: 12
        },
        {
          image: `https://wallpapers.com/images/high/nft-monkey-2gqnsrs1nnyi66m2.webp`,
          text: 'Legendary Primate',
          layoutId : 'legendary-primate',
          x: 75,
          y: 65,
          rotation: -8
        }
      ];

export const useMarkStore = create<MarkStore>((set, get) => ({
  currentMark: 0,
  currentItems: null,
  
  setCurrentMark: (mark: number) => set({ currentMark: mark }),
  
  incrementMark: (amount = 1) => set((state) => ({ 
    currentMark: state.currentMark + amount 
  })),
    resetMark: () => set({ currentMark: 0 }),

  setCurrentItems: (items: Item[] | null) => {
    if (items && items.length > 0) {
      const currentMark = get().currentMark;
      const validMark = Math.min(currentMark, items.length - 1);
      set({ currentItems: [items[validMark]] });
    } else {
      set({ currentItems: items });
    }
  }
}));
