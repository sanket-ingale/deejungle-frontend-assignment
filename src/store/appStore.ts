import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface DataItem {
  userId: number;
  id: number;
  title: string;
  completed?: boolean;
  body?: string;
}

export interface AppState {
  counter: number;
  items: DataItem[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  incrementCounter: () => void;
  resetData: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      counter: 0,
      items: [],
      loading: false,
      error: null,

      incrementCounter: () => set((state) => ({ counter: state.counter + 1 })),

      fetchData: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(
            'https://jsonplaceholder.typicode.com/posts?_limit=10'
          );
          const data = await response.json();

          const shuffledItems = [...data].sort(() => Math.random() - 0.5);

          set((state) => ({
            items: shuffledItems,
            counter: state.counter + 1,
            loading: false,
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch data',
            loading: false,
          });
        }
      },

      resetData: () => set({ items: [], counter: 0, error: null }),
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => {
        if (Platform.OS === 'web') {
          return {
            getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
            setItem: (key: string, value: string) => Promise.resolve(localStorage.setItem(key, value)),
            removeItem: (key: string) => Promise.resolve(localStorage.removeItem(key)),
          };
        } else {
          return {
            getItem: SecureStore.getItemAsync,
            setItem: SecureStore.setItemAsync,
            removeItem: SecureStore.deleteItemAsync,
          };
        }
      }),
      partialize: (state) => ({
        counter: state.counter,
        items: state.items,
      }),
    }
  )
);
