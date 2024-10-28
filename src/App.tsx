import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;