import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useParams } from 'react-router-dom';
import { usePages } from '../hooks/usePages';
import { LoadingSpinner } from './LoadingSpinner';

export function Editor() {
  const { id } = useParams<{ id: string }>();
  const { pages, updatePage } = usePages();
  const [isLoading, setIsLoading] = useState(true);
  const page = pages.find(p => p.id === id);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing...',
      }),
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
    <div className="max-w-4xl mx-auto p-8">
      <input
        type="text"
        value={page?.title || 'Untitled'}
        onChange={(e) => id && updatePage(id, { title: e.target.value })}
        className="w-full text-3xl font-bold mb-8 bg-transparent border-none outline-none"
        placeholder="Untitled"
      />
      <EditorContent editor={editor} className="min-h-[500px] p-4 border rounded-lg bg-white shadow-sm" />
    </div>
  );
}