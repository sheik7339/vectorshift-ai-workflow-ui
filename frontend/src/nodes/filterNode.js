// filterNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const FilterNode = ({ id, data }) => {
    const [condition, setCondition] = useState(data?.condition || '');
    const handles = [
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'true', style: { top: '30%' } },
        { type: 'source', position: Position.Right, id: 'false', style: { top: '70%' } }
    ];

    return (
        <BaseNode id={id} label="Filter" handles={handles}>
            <label style={{ display: 'block' }}>
                Condition:
                <input
                    type="text"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    placeholder="e.g. x > 5"
                    style={{ width: '100%', marginTop: '5px', boxSizing: 'border-box' }}
                />
            </label>
        </BaseNode>
    );
}
