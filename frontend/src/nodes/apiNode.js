// apiNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const ApiNode = ({ id, data }) => {
    const [endpoint, setEndpoint] = useState(data?.endpoint || 'https://api.example.com');
    const handles = [
        { type: 'target', position: Position.Left, id: 'trigger' },
        { type: 'source', position: Position.Right, id: 'response' }
    ];

    return (
        <BaseNode id={id} label="API Request" handles={handles}>
            <label style={{ display: 'block' }}>
                Endpoint:
                <input
                    type="text"
                    value={endpoint}
                    onChange={(e) => setEndpoint(e.target.value)}
                    style={{ width: '100%', marginTop: '5px', boxSizing: 'border-box' }}
                />
            </label>
        </BaseNode>
    );
}
