export interface StoreItem {
  id: number;
  image: string;
  text: string;
  title: string;
  description: string;
  cost: number;
  solana: number;
  layoutId: string;
  x: number;
  y: number;
  video: string | null;
}

export interface MarkStore {
  currentMark: number;
  currentItems: StoreItem | null;
  storeItems: StoreItem[];
  setCurrentMark: (mark: number) => void;
  incrementMark: (amount?: number) => void;
  resetMark: () => void;
  setCurrentItems: (item: StoreItem | null) => void;
  setStoreItems: (items: StoreItem[]) => void;
}
