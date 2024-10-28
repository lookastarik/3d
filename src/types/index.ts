export type PageType = 'note' | 'calendar' | 'kanban' | 'file';

export interface Page {
  id?: string;
  title: string;
  content: string;
  type: PageType;
  createdAt: number;
  updatedAt: number;
}

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
}