import { generateJsonSchema } from './schemaGenerator';
import { CodeExecutor } from './workerManager';

const API_BASE_URL = 'https://javascript-code-generator.onrender.com/api';

export async function analyzeQuery(queryObject, question, context, mode) {
  if (!queryObject || Object.keys(queryObject).length === 0) {
    throw new Error('Query object is required');
  }

  if (mode === 'server') {
    return await analyzeWithServer(queryObject, question, context);
  } else {
    return await analyzeWithClient(queryObject, question, context);
  }
}

async function analyzeWithServer(queryObject, question, context) {
  const response = await fetch(`${API_BASE_URL}/analyze/server`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      queryObject,
      question,
      context,
    }),
  });

  if (!response.ok) {
    throw new Error('Server response was not ok');
  }

  return await response.json();
}

async function analyzeWithClient(queryObject, question, context) {
  const schema = generateJsonSchema(queryObject);
  const response = await fetch(`${API_BASE_URL}/analyze/client`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      schema,
      question,
      context,
    }),
  });

  if (!response.ok) {
    throw new Error('Server response was not ok');
  }

  const result = await response.json();
  const codeExecutor = new CodeExecutor();

  try {
    const evaluationResult = await codeExecutor.execute(
      result.javascript,
      queryObject
    );
    codeExecutor.terminate();

    return {
      ...result,
      evaluationResult,
      schema,
    };
  } catch (error) {
    codeExecutor.terminate();
    throw new Error(`Error evaluating code: ${error.message}`);
  }
}