import { create } from 'zustand';

export interface MarkStore {
  currentMark: number;
  currentItems: Item | null;
  setCurrentMark: (mark: number) => void;
  incrementMark: (amount?: number) => void;
  resetMark: () => void;
  setCurrentItems: (item: Item | null) => void;
}

export interface Item {
  image: string;
  text: string;
  title: string;
  description: string;
  cost: number;
  solana: number;
  layoutId: string;
  x: number;
  y: number;
  rotation: number;
}
export const defaultItems: Item[] = [
  {
    image: `https://wallpapers.com/images/high/nft-monkey-441q73yzqpw8o6y5.webp`,
    text: 'Golden Ape',
    title: 'Golden Ape NFT',
    description:
      'A rare golden ape with shimmering fur and diamond eyes. This exclusive NFT represents the pinnacle of digital primate artistry.',
    cost: 2.5,
    solana: 0.0087, // Random value between 0.001 and 0.01
    layoutId: 'golden-ape',
    x: 25,
    y: 30,
    rotation: -15,
  },
  {
    image: `https://wallpapers.com/images/high/nft-monkey-r237cp3zh1bj5ivs.webp`,
    text: 'Rare Ape',
    title: 'Rare Ape Collection',
    description:
      'An uncommon ape specimen with unique facial features and vibrant colors. Part of the exclusive rare collection series.',
    cost: 1.8,
    solana: 0.0034, // Random value between 0.001 and 0.01
    layoutId: 'rare-ape',
    x: 65,
    y: 45,
    rotation: -10,
  },
  {
    image: `https://wallpapers.com/images/high/nft-monkey-piax0vgvrmnr3tss.webp`,
    text: 'Digital Primate',
    title: 'Digital Primate Genesis',
    description:
      'A futuristic digital primate with cybernetic enhancements and neon accents. The future of primate evolution.',
    cost: 3.2,
    solana: 0.0092, // Random value between 0.001 and 0.01
    layoutId: 'digital-primate',
    x: 40,
    y: 30,
    rotation: 25,
  },
  {
    image: `https://wallpapers.com/images/high/nft-monkey-pg4k4qtmfem0qlho.webp`,
    text: 'Pixel Monkey',
    title: 'Pixel Monkey Retro',
    description:
      'A nostalgic 8-bit inspired monkey with pixelated charm and retro gaming aesthetics. Perfect for collectors of vintage digital art.',
    cost: 1.2,
    solana: 0.0015, // Random value between 0.001 and 0.01
    layoutId: 'pixel-monkey',
    x: 80,
    y: 25,
    rotation: 20,
  },
  {
    image: `https://wallpapers.com/images/high/nft-monkey-fdm9t6g8p3h4nj7n.webp`,
    text: 'Neon Ape',
    title: 'Neon Ape Electric',
    description:
      'An electrifying ape glowing with neon lights and electric energy. This vibrant NFT pulses with digital life.',
    cost: 2.1,
    solana: 0.0067, // Random value between 0.001 and 0.01
    layoutId: 'neon-ape',
    x: 15,
    y: 60,
    rotation: 8,
  },
  {
    image: `https://wallpapers.com/images/high/nft-monkey-j0rpoqvt1zl8z03g.webp`,
    text: 'Elite Monkey',
    title: 'Elite Monkey VIP',
    description:
      'An exclusive elite monkey wearing luxury accessories and sporting a sophisticated demeanor. Only for the most discerning collectors.',
    cost: 4.7,
    solana: 0.0098, // Random value between 0.001 and 0.01
    layoutId: 'elite-monkey',
    x: 50,
    y: 60,
    rotation: 3,
  },
  {
    image: `https://wallpapers.com/images/high/nft-monkey-cqcs8keyywd67e84.webp`,
    text: 'Chrome Ape',
    title: 'Chrome Ape Metallic',
    description:
      'A sleek chrome-plated ape with mirror-like reflective surfaces and industrial design elements. The epitome of modern digital craftsmanship.',
    cost: 3.8,
    solana: 0.0045, // Random value between 0.001 and 0.01
    layoutId: 'chrome-ape',
    x: 35,
    y: 50,
    rotation: 12,
  },
  {
    image: `https://wallpapers.com/images/high/nft-monkey-2gqnsrs1nnyi66m2.webp`,
    text: 'Legendary Primate',
    title: 'Legendary Primate Mythic',
    description:
      'The most coveted primate in existence, adorned with mythical powers and ancient wisdom. A true masterpiece of digital artistry.',
    cost: 6.5,
    solana: 0.0076, // Random value between 0.001 and 0.01
    layoutId: 'legendary-primate',
    x: 75,
    y: 65,
    rotation: -8,
  },
];

export const useMarkStore = create<MarkStore>((set, get) => ({
  currentMark: 0,
  currentItems: null,

  setCurrentMark: (mark: number) => set({ currentMark: mark }),

  incrementMark: (amount = 1) =>
    set((state) => ({
      currentMark: state.currentMark + amount,
    })),
  resetMark: () => set({ currentMark: 0 }),

  setCurrentItems: (item: Item | null) => {
    set({ currentItems: item });
  },
}));
