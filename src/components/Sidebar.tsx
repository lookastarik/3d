import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PlusCircle, File, Trash2, AlertCircle } from 'lucide-react';
import { usePages } from '../hooks/usePages';
import { PageTypeMenu } from './PageTypeMenu';

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pages, createPage, deletePage, error } = usePages();
  const [showTypeMenu, setShowTypeMenu] = useState(false);

  const handleCreatePage = async (type: 'note' | 'calendar' | 'kanban' | 'file') => {
    try {
      const pageId = await createPage(type);
      if (pageId) {
        navigate(`/page/${pageId}`);
        setShowTypeMenu(false);
      }
    } catch (err) {
      console.error('Failed to create page:', err);
    }
  };

  const handleDeletePage = async (pageId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await deletePage(pageId);
      if (location.pathname === `/page/${pageId}`) {
        navigate('/');
      }
    } catch (err) {
      console.error('Failed to delete page:', err);
    }
  };

  return (
    <div className="w-64 border-r bg-gray-50 overflow-auto flex flex-col">
      <div className="p-4">
        <button
          onClick={() => setShowTypeMenu(true)}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          type="button"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Page</span>
        </button>
      </div>
      
      {error && (
        <div className="px-4 py-2 bg-red-50 border-l-4 border-red-500 mb-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-600">{error.message}</span>
          </div>
        </div>
      )}

      <nav className="flex-1 px-3 py-2">
        {pages.map((page) => (
          <Link
            key={page.id}
            to={`/page/${page.id}`}
            className={`group flex items-center justify-between px-3 py-2 rounded-lg ${
              location.pathname === `/page/${page.id}`
                ? 'bg-gray-200'
                : 'hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-2">
              <File className="w-4 h-4 text-gray-500" />
              <span className="text-sm truncate">{page.title || 'Untitled'}</span>
            </div>
            <button
              onClick={(e) => page.id && handleDeletePage(page.id, e)}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded"
              type="button"
            >
              <Trash2 className="w-4 h-4 text-gray-500" />
            </button>
          </Link>
        ))}
      </nav>

      {showTypeMenu && (
        <PageTypeMenu
          onSelect={handleCreatePage}
          onClose={() => setShowTypeMenu(false)}
        />
      )}
    </div>
  );
}