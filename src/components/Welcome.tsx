import React from 'react';
import { FileText, Plus } from 'lucide-react';
import { usePages } from '../hooks/usePages';
import { useNavigate } from 'react-router-dom';

export function Welcome() {
  const { createPage } = usePages();
  const navigate = useNavigate();

  const handleCreatePage = async () => {
    const pageId = await createPage();
    if (pageId) {
      navigate(`/page/${pageId}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50">
      <div className="text-center space-y-6">
        <FileText className="w-16 h-16 text-gray-400 mx-auto" />
        <h1 className="text-2xl font-bold text-gray-800">Welcome to NotionClone</h1>
        <p className="text-gray-600">Create a new page to get started</p>
        <button
          onClick={handleCreatePage}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Page
        </button>
      </div>
    </div>
  );
}