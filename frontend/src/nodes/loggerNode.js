// loggerNode.js
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const LoggerNode = ({ id }) => {
    const handles = [
        { type: 'target', position: Position.Left, id: 'input' }
    ];

    return (
        <BaseNode id={id} label="Logger" handles={handles}>
            <div style={{ padding: '10px 0', textAlign: 'center' }}>Prints input to console</div>
        </BaseNode>
    );
}
