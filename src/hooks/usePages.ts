import { useState, useEffect } from 'react';
import Dexie from 'dexie';
import { Page, PageType } from '../types';

class NotionDB extends Dexie {
  pages!: Dexie.Table<Page, string>;

  constructor() {
    super('NotionDB');
    this.version(1).stores({
      pages: '++id, title, content, type, createdAt, updatedAt'
    });
  }
}

const db = new NotionDB();

interface UsePagesReturn {
  pages: Page[];
  loading: boolean;
  error: Error | null;
  createPage: (type: PageType) => Promise<string | null>;
  updatePage: (pageId: string, updates: Partial<Page>) => Promise<void>;
  deletePage: (pageId: string) => Promise<void>;
}

export function usePages(): UsePagesReturn {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadPages = async () => {
    try {
      const allPages = await db.pages.toArray();
      setPages(allPages);
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to load pages');
      console.error('Error loading pages:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  const createPage = async (type: PageType): Promise<string | null> => {
    try {
      const timestamp = Date.now();
      const newPage: Omit<Page, 'id'> = {
        title: 'Untitled',
        content: '',
        type,
        createdAt: timestamp,
        updatedAt: timestamp
      };
      
      const id = await db.pages.add(newPage);
      await loadPages();
      return id.toString();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create page');
      console.error('Error creating page:', error);
      setError(error);
      return null;
    }
  };

  const updatePage = async (pageId: string, updates: Partial<Page>): Promise<void> => {
    try {
      const page = await db.pages.get(pageId);
      if (!page) {
        throw new Error('Page not found');
      }

      await db.pages.update(pageId, {
        ...updates,
        updatedAt: Date.now()
      });
      await loadPages();
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update page');
      console.error('Error updating page:', error);
      setError(error);
    }
  };

  const deletePage = async (pageId: string): Promise<void> => {
    try {
      const page = await db.pages.get(pageId);
      if (!page) {
        throw new Error('Page not found');
      }

      await db.pages.delete(pageId);
      await loadPages();
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete page');
      console.error('Error deleting page:', error);
      setError(error);
    }
  };

  return {
    pages,
    loading,
    error,
    createPage,
    updatePage,
    deletePage
  };
}