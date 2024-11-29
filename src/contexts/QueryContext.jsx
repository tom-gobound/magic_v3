import React, { createContext, useContext, useState } from 'react';
import { getSelectedData } from '../data';
import { analyzeQuery } from '../utils/queryAnalyzer';

const QueryContext = createContext();

export function QueryProvider({ children }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [mode, setMode] = useState('client');
  const [question, setQuestion] = useState('');
  const [context, setContext] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyzeQuery = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one data file.');
      return;
    }

    setError(null);
    setResponse(null);
    setIsLoading(true);

    try {
      const queryObject = await getSelectedData(selectedFiles);
      const result = await analyzeQuery(queryObject, question, context, mode);
      setResponse(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    selectedFiles,
    setSelectedFiles,
    mode,
    setMode,
    question,
    setQuestion,
    context,
    setContext,
    response,
    error,
    isLoading,
    handleAnalyzeQuery
  };

  return (
    <QueryContext.Provider value={value}>
      {children}
    </QueryContext.Provider>
  );
}

export function useQuery() {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error('useQuery must be used within a QueryProvider');
  }
  return context;
}