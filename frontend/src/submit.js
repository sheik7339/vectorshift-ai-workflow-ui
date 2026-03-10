// submit.js

import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("pipeline", JSON.stringify({ nodes, edges }));

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            alert(`Nodes count: ${data.num_nodes}\nEdges count: ${data.num_edges}\nIs DAG: ${data.is_dag}`);
        } catch (error) {
            console.error(error);
            alert("Error submitting pipeline.");
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', backgroundColor: '#fff', borderTop: '1px solid #e2e8f0' }}>
            <button
                type="button"
                onClick={handleSubmit}
                style={{
                    backgroundColor: '#1C2536',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
            >
                Submit
            </button>
        </div>
    );
}
