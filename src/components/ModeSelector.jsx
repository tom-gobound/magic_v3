import React from 'react';
import { useQuery } from '../contexts/QueryContext';

function ModeSelector() {
  const { mode, setMode } = useQuery();

  return (
    <div className="mode-selector">
      <label>
        <input
          type="radio"
          name="mode"
          value="server"
          checked={mode === 'server'}
          onChange={(e) => setMode(e.target.value)}
        />
        Server-side Processing
      </label>
      <label>
        <input
          type="radio"
          name="mode"
          value="client"
          checked={mode === 'client'}
          onChange={(e) => setMode(e.target.value)}
        />
        Client-side Processing
      </label>
    </div>
  );
}

export default ModeSelector;