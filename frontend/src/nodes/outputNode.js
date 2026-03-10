// outputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setOutputType(e.target.value);

  const handles = [{ type: 'target', position: Position.Left, id: 'input' }];

  return (
    <BaseNode id={id} label="Output" handles={handles}>
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
        <select value={outputType} onChange={handleTypeChange} style={{ width: '100%', marginTop: '5px', boxSizing: 'border-box' }}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
}
