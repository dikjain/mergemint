/**
 * Store Types
 *
 * This file contains types for Zustand state management stores
 * and related data structures.
 */

// ===========================
// Store Item Types
// ===========================

/**
 * Store item configuration
 * Represents a purchasable/unlockable item in the store
 */
export interface StoreItem {
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

// ===========================
// Store State Types
// ===========================

/**
 * Mark/Points Store State
 * Manages user points/marks and current item selection
 */
export interface MarkStore {
  currentMark: number;
  currentItems: StoreItem | null;
  setCurrentMark: (mark: number) => void;
  incrementMark: (amount?: number) => void;
  resetMark: () => void;
  setCurrentItems: (item: StoreItem | null) => void;
}
