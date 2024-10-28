import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Editor } from '../components/Editor';
import { Welcome } from '../components/Welcome';

export function MainLayout() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/page/:id" element={<Editor />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </main>
    </div>
  );
}