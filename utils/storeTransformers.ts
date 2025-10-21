import type { BackendStoreItem } from '@/types/api.types';
import type { StoreItem } from '@/types/store.types';

const getRandomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateLayoutId = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

export const transformBackendStoreItem = (
  backendItem: BackendStoreItem
): StoreItem => {
  return {
    image: backendItem.image,
    text: backendItem.name,
    title: backendItem.name,
    description: backendItem.description,
    cost: parseFloat(backendItem.cost),
    solana: parseFloat(backendItem.worth),
    layoutId: generateLayoutId(backendItem.name),
    x: getRandomInRange(15, 85),
    y: getRandomInRange(25, 65),
    video: backendItem.video,
  };
};

export const transformBackendStoreItems = (
  backendItems: BackendStoreItem[]
): StoreItem[] => {
  return backendItems.map(transformBackendStoreItem);
};
