import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import { useParams } from 'react-router-dom';
import { usePages } from '../../hooks/usePages';
import { LoadingSpinner } from '../LoadingSpinner';
import { MenuBar } from './MenuBar';

export function Editor() {
  const { id } = useParams<{ id: string }>();
  const { pages, updatePage } = usePages();
  const [isLoading, setIsLoading] = useState(true);
  const page = pages.find(p => p.id === id);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Type "/" for commands...',
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Highlight,
    ],
    content: page?.content || '',
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[500px] p-4',
      },
    },
    onUpdate: ({ editor }) => {
      if (id) {
        const content = editor.getHTML();
        updatePage(id, { content });
      }
    },
  });

  useEffect(() => {
    if (editor && page?.content) {
      if (editor.getHTML() !== page.content) {
        editor.commands.setContent(page.content);
      }
    }
  }, [editor, page?.content]);

  useEffect(() => {
    if (page) {
      setIsLoading(false);
    }
  }, [page]);

  if (isLoading || !editor) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="px-8 py-4">
        <input
          type="text"
          value={page?.title || 'Untitled'}
          onChange={(e) => id && updatePage(id, { title: e.target.value })}
          className="w-full text-3xl font-bold mb-4 bg-transparent border-none outline-none"
          placeholder="Untitled"
        />
      </div>
      <MenuBar editor={editor} />
      <div className="px-8 py-4">
        <EditorContent editor={editor} className="min-h-[500px] prose max-w-none" />
      </div>
    </div>
  );
}