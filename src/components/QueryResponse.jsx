import React from 'react';
import { useQuery } from '../contexts/QueryContext';

function QueryResponse() {
  const { response, error } = useQuery();

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!response) {
    return null;
  }

  return (
    <div>
      <h3>Response</h3>
      <div id="response">
        <h4>Human Response:</h4>
        <p>{response.humanResponse}</p>

        <h4>Evaluation Result:</h4>
        <div className="evaluation-result">
          {JSON.stringify(response.evaluationResult, null, 2)}
        </div>

        <h4>JavaScript Code:</h4>
        <pre>
          <code>{response.javascript}</code>
        </pre>

        <h4>Generated Schema:</h4>
        <pre>
          <code>{JSON.stringify(response.schema, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
}

export default QueryResponse;