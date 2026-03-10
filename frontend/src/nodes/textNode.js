// textNode.js

import { useState, useRef, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { Position, useUpdateNodeInternals } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState(() => {
    // Correctly initialize handles mapped immediately on first render
    const initialText = data?.text || '{{input}}';
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const matches = [...initialText.matchAll(regex)].map(match => match[1]);
    return [...new Set(matches)];
  });
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const prevVariablesStr = useRef(JSON.stringify(variables));

  useEffect(() => {
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const matches = [...currText.matchAll(regex)].map(match => match[1]);
    const uniqueVariables = [...new Set(matches)];

    if (JSON.stringify(variables) !== JSON.stringify(uniqueVariables)) {
      setVariables(uniqueVariables);
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText, variables]);

  useEffect(() => {
    // Only inform React Flow once the actual variables data has visually mutated AFTER the first paint.
    const currentVariablesStr = JSON.stringify(variables);
    if (prevVariablesStr.current !== currentVariablesStr) {
      prevVariablesStr.current = currentVariablesStr;
      updateNodeInternals(id);
    }
  }, [variables, id, updateNodeInternals]);

  const handleTextChange = (e) => setCurrText(e.target.value);

  const handles = variables.map((variable, index) => ({
    type: 'target',
    position: Position.Left,
    id: variable,
    style: { top: `${((index + 1) * 100) / (variables.length + 1)}%` },
  }));

  handles.push({ type: 'source', position: Position.Right, id: 'output' });

  return (
    <BaseNode id={id} label="Text" handles={handles}>
      <label style={{ display: 'block' }}>
        Text:
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          style={{
            width: '100%',
            marginTop: '5px',
            resize: 'none',
            overflow: 'hidden',
            boxSizing: 'border-box',
            minHeight: '40px'
          }}
        />
      </label>
    </BaseNode>
  );
}
