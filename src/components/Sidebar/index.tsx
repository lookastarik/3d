import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PlusCircle, AlertCircle } from 'lucide-react';
import { usePages } from '../../hooks/usePages';
import { PageTypeMenu } from '../PageCreator/PageTypeMenu';
import { PageList } from './PageList';
import { PageType } from '../../types';

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pages, createPage, deletePage, error } = usePages();
  const [showTypeMenu, setShowTypeMenu] = useState(false);

  const handleCreatePage = async (type: PageType) => {
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

  const handleDeletePage = async (pageId: string) => {
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
    <div className="w-64 border-r bg-gray-50 overflow-auto flex flex-col h-full">
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
        <div className="mx-4 p-3 bg-red-50 border-l-4 border-red-500 rounded">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span className="text-sm text-red-600">{error.message}</span>
          </div>
        </div>
      )}

      <PageList
        pages={pages}
        currentPath={location.pathname}
        onDelete={handleDeletePage}
      />

      {showTypeMenu && (
        <PageTypeMenu
          onSelect={handleCreatePage}
          onClose={() => setShowTypeMenu(false)}
        />
      )}
    </div>
  );
}