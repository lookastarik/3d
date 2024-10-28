import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <div className="animate-spin rounded-full h-8 w-8 border-l-2 border-gray-600 absolute top-0 left-0" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
}