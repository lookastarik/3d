import React from 'react';
import { FileText, Calendar, Trello, File, X } from 'lucide-react';

interface PageTypeMenuProps {
  onSelect: (type: 'note' | 'calendar' | 'kanban' | 'file') => void;
  onClose: () => void;
}

export function PageTypeMenu({ onSelect, onClose }: PageTypeMenuProps) {
  const options = [
    { type: 'note' as const, icon: FileText, label: 'Empty note', description: 'Start writing with a blank page' },
    { type: 'calendar' as const, icon: Calendar, label: 'Calendar', description: 'Create a calendar view' },
    { type: 'kanban' as const, icon: Trello, label: 'Kanban board', description: 'Manage tasks with boards' },
    { type: 'file' as const, icon: File, label: 'File upload', description: 'Upload and attach files' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Create new</h2>
          <div className="space-y-2">
            {options.map(({ type, icon: Icon, label, description }) => (
              <button
                key={type}
                onClick={() => onSelect(type)}
                className="w-full text-left p-4 rounded-lg hover:bg-gray-50 transition-colors flex items-start space-x-4"
                type="button"
              >
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium">{label}</div>
                  <div className="text-sm text-gray-500">{description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}