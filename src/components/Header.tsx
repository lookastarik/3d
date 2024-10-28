import React from 'react';
import { Settings } from 'lucide-react';

export function Header() {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 bg-white border-b">
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}