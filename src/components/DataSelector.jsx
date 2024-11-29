import React from 'react';
import { useQuery } from '../contexts/QueryContext';
import { availableDataFiles } from '../data';

function DataSelector() {
  const { selectedFiles, setSelectedFiles } = useQuery();

  const handleCheckboxChange = (filename) => {
    setSelectedFiles(prev => {
      if (prev.includes(filename)) {
        return prev.filter(f => f !== filename);
      }
      return [...prev, filename];
    });
  };

  return (
    <div className="document-selector">
      <h3>Select Data Files</h3>
      <div className="document-group">
        {Object.keys(availableDataFiles).map(filename => (
          <label key={filename}>
            <input
              type="checkbox"
              name="dataFiles"
              value={filename}
              checked={selectedFiles.includes(filename)}
              onChange={() => handleCheckboxChange(filename)}
            />
            {filename}
          </label>
        ))}
      </div>
    </div>
  );
}

export default DataSelector;