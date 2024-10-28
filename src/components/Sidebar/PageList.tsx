import React from 'react';
import { Link } from 'react-router-dom';
import { File, Trash2, Calendar, Trello } from 'lucide-react';
import { Page } from '../../types';

interface PageListProps {
  pages: Page[];
  currentPath: string;
  onDelete: (pageId: string) => void;
}

const PageIcon = ({ type }: { type: Page['type'] }) => {
  switch (type) {
    case 'calendar':
      return <Calendar className="w-4 h-4 text-gray-500" />;
    case 'kanban':
      return <Trello className="w-4 h-4 text-gray-500" />;
    case 'note':
    case 'file':
    default:
      return <File className="w-4 h-4 text-gray-500" />;
  }
};

export function PageList({ pages, currentPath, onDelete }: PageListProps) {
  return (
    <nav className="flex-1 px-3 py-2">
      {pages.map((page) => (
        <Link
          key={page.id}
          to={`/page/${page.id}`}
          className={`group flex items-center justify-between px-3 py-2 rounded-lg ${
            currentPath === `/page/${page.id}`
              ? 'bg-gray-200'
              : 'hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center space-x-2 min-w-0">
            <PageIcon type={page.type} />
            <span className="text-sm truncate">{page.title || 'Untitled'}</span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (page.id) onDelete(page.id);
            }}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity"
            type="button"
            aria-label="Delete page"
          >
            <Trash2 className="w-4 h-4 text-gray-500" />
          </button>
        </Link>
      ))}
    </nav>
  );
}