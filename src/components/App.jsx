import React from 'react';
import DataSelector from './DataSelector';
import ModeSelector from './ModeSelector';
import QueryForm from './QueryForm';
import QueryResponse from './QueryResponse';
import { QueryProvider } from '../contexts/QueryContext';

function App() {
  return (
    <QueryProvider>
      <div className="container">
        <h1>Data Query Analyzer</h1>
        <DataSelector />
        <ModeSelector />
        <QueryForm />
        <QueryResponse />
      </div>
    </QueryProvider>
  );
}

export default App;