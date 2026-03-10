import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const BaseNode = ({ id, label, children, handles, style }) => {
    const removeNode = useStore((state) => state.removeNode);

    return (
        <div style={{
            minWidth: 220,
            padding: '12px',
            borderRadius: '10px',
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            boxShadow: '0 6px 12px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            position: 'relative',
            ...style
        }}>
            <button
                onClick={() => removeNode(id)}
                style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#94a3b8',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    transition: '0.2s ease',
                    fontSize: '14px',
                    lineHeight: '1'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.color = '#ef4444';
                    e.currentTarget.style.backgroundColor = '#fee2e2';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.color = '#94a3b8';
                    e.currentTarget.style.backgroundColor = 'transparent';
                }}
                title="Remove Node"
            >
                ✕
            </button>

            {handles.map((handle) => (
                <Handle
                    key={`${id}-handle-${handle.id}-${handle.type}`}
                    type={handle.type}
                    position={handle.position}
                    id={handle.id}
                    style={{
                        width: '8px',
                        height: '8px',
                        background: '#3b82f6',
                        border: '2px solid #ffffff',
                        boxShadow: '0 0 0 1px #cbd5e1',
                        ...handle.style,
                    }}
                />
            ))}
            <div style={{ fontWeight: '600', fontSize: '15px', color: '#1e293b', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', paddingRight: '20px' }}>
                {label}
            </div>
            <div style={{ fontSize: '13px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {children}
            </div>
        </div>
    );
};
