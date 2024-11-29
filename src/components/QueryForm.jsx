import React from 'react';
import { useQuery } from '../contexts/QueryContext';
import { ClipLoader } from 'react-spinners';

function QueryForm() {
  const { 
    question,
    setQuestion,
    context,
    setContext,
    handleAnalyzeQuery,
    isLoading
  } = useQuery();

  return (
    <div>
      <div>
        <h3>Question</h3>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question"
          disabled={isLoading}
        />
      </div>

      <div>
        <h3>Context</h3>
        <textarea
          rows="3"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Provide additional context for your question"
          disabled={isLoading}
        />
      </div>

      <button 
        onClick={handleAnalyzeQuery} 
        disabled={isLoading}
        className="analyze-button"
      >
        {isLoading ? (
          <div className="button-content">
            <ClipLoader size={20} color="#ffffff" />
            <span>Analyzing...</span>
          </div>
        ) : (
          'Analyze'
        )}
      </button>
    </div>
  );
}

export default QueryForm;