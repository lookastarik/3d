import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Page {
  id: string;
  title: string;
  content: any;
  parentId: string | null;
  createdAt: number;
  updatedAt: number;
}

interface PageStore {
  pages: Page[];
  currentPage: string | null;
  addPage: (page: Page) => void;
  updatePage: (id: string, updates: Partial<Page>) => void;
  deletePage: (id: string) => void;
  setCurrentPage: (id: string | null) => void;
}

export const usePageStore = create<PageStore>()(
  persist(
    (set) => ({
      pages: [],
      currentPage: null,
      addPage: (page) =>
        set((state) => ({ pages: [...state.pages, page] })),
      updatePage: (id, updates) =>
        set((state) => ({
          pages: state.pages.map((page) =>
            page.id === id ? { ...page, ...updates, updatedAt: Date.now() } : page
          ),
        })),
      deletePage: (id) =>
        set((state) => ({
          pages: state.pages.filter((page) => page.id !== id),
        })),
      setCurrentPage: (id) => set({ currentPage: id }),
    }),
    {
      name: 'pages-storage',
    }
  )
);