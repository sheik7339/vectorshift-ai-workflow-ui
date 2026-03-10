// inputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setInputType(e.target.value);

  const handles = [{ type: 'source', position: Position.Right, id: 'output' }];

  return (
    <BaseNode id={id} label="Input" handles={handles}>
      <label style={{ display: 'block' }}>
        Name:
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          style={{ width: '100%', marginTop: '5px', boxSizing: 'border-box' }}
        />
      </label>
      <label style={{ display: 'block' }}>
        Type:
        <select value={inputType} onChange={handleTypeChange} style={{ width: '100%', marginTop: '5px', boxSizing: 'border-box' }}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
}
