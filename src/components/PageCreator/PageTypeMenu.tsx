import React from 'react';
import { FileText, Calendar, Trello, File, X } from 'lucide-react';
import { PageType } from '../../types';

interface PageTypeMenuProps {
  onSelect: (type: PageType) => void;
  onClose: () => void;
}

const PAGE_TYPES = [
  {
    type: 'note' as const,
    icon: FileText,
    label: 'Empty note',
    description: 'Start writing with a blank page'
  },
  {
    type: 'calendar' as const,
    icon: Calendar,
    label: 'Calendar',
    description: 'Create a calendar view'
  },
  {
    type: 'kanban' as const,
    icon: Trello,
    label: 'Kanban board',
    description: 'Manage tasks with boards'
  },
  {
    type: 'file' as const,
    icon: File,
    label: 'File upload',
    description: 'Upload and attach files'
  }
] as const;

export function PageTypeMenu({ onSelect, onClose }: PageTypeMenuProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md m-4" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 pb-2">
          <h2 id="modal-title" className="text-xl font-semibold">Create new</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 pt-2">
          <div className="space-y-2">
            {PAGE_TYPES.map(({ type, icon: Icon, label, description }) => (
              <button
                key={type}
                onClick={() => onSelect(type)}
                className="w-full text-left p-4 rounded-lg hover:bg-gray-50 transition-colors flex items-start space-x-4 group"
                type="button"
              >
                <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
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