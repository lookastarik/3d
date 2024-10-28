import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Editor } from '../components/Editor';
import { Welcome } from '../components/Welcome';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/page/:id" element={<Editor />} />
        <Route path="/" element={<Welcome />} />
      </Route>
    </Routes>
  );
}