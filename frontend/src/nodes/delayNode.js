// delayNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const DelayNode = ({ id, data }) => {
    const [delay, setDelay] = useState(data?.delay || 1000);
    const handles = [
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' }
    ];

    return (
        <BaseNode id={id} label="Delay" handles={handles}>
            <label style={{ display: 'block' }}>
                Delay (ms):
                <input
                    type="number"
                    value={delay}
                    onChange={(e) => setDelay(e.target.value)}
                    style={{ width: '100%', marginTop: '5px', boxSizing: 'border-box' }}
                />
            </label>
        </BaseNode>
    );
}
