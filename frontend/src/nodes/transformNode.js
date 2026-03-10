// transformNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const TransformNode = ({ id, data }) => {
    const [expression, setExpression] = useState(data?.expression || 'x * 2');
    const handles = [
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' }
    ];

    return (
        <BaseNode id={id} label="Transform" handles={handles}>
            <label style={{ display: 'block' }}>
                Expression:
                <input
                    type="text"
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                    style={{ width: '100%', marginTop: '5px', boxSizing: 'border-box' }}
                />
            </label>
        </BaseNode>
    );
}
