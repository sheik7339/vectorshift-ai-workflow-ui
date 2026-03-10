// draggableNode.js

import { useStore } from './store';

export const DraggableNode = ({ type, label }) => {
  const addNode = useStore((state) => state.addNode);
  const getNodeID = useStore((state) => state.getNodeID);
  const nodesCount = useStore((state) => state.nodes.length);

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const onClick = () => {
    const id = getNodeID(type);
    const x = (nodesCount % 4) * 300;
    const y = Math.floor(nodesCount / 4) * 200;

    const newNode = {
      id,
      type,
      position: { x, y },
      data: { id, nodeType: type },
    };
    addNode(newNode);
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      onClick={onClick}
      style={{
        cursor: 'grab',
        minWidth: '100px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '20px',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        justifyContent: 'center',
        flexDirection: 'column',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        transition: '0.2s ease',
      }}
      draggable
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = '#f3f4f6';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = '#ffffff';
      }}
    >
      <span style={{ color: '#334155', fontSize: '14px', fontWeight: '500' }}>{label}</span>
    </div>
  );
};