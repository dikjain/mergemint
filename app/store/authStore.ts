import { create } from 'zustand';
import {
  getCurrentSession,
  type User,
  type UserDetails,
} from '@/api/apiExporter';

interface AuthStore {
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  isInitialized: boolean;
  setUser: (user: User | null) => void;
  setUserDetails: (details: UserDetails | null) => void;
  setIsLoading: (loading: boolean) => void;
  fetchSession: () => Promise<void>;
  refreshSession: () => Promise<void>;
  clearSession: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  userDetails: null,
  isLoading: false,
  isInitialized: false,

  setUser: (user) => set({ user }),

  setUserDetails: (details) => set({ userDetails: details }),

  setIsLoading: (loading) => set({ isLoading: loading }),

  fetchSession: async () => {
    if (get().isInitialized) {
      return;
    }

    set({ isLoading: true });

    try {
      const sessionResult = await getCurrentSession();

      if (sessionResult.success && sessionResult.data) {
        set({
          user: sessionResult.data.user,
          userDetails: sessionResult.data.userDetails,
          isInitialized: true,
        });
      } else {
        set({
          user: null,
          userDetails: null,
          isInitialized: true,
        });
      }
    } catch (error) {
      console.error('Error fetching session:', error);
      set({
        user: null,
        userDetails: null,
        isInitialized: true,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  refreshSession: async () => {
    set({ isInitialized: false });
    const store = get();
    await store.fetchSession();
  },

  clearSession: () => {
    set({
      user: null,
      userDetails: null,
      isInitialized: false,
    });
  },
}));
