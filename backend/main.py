from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    parsed_pipeline = json.loads(pipeline)
    
    nodes = parsed_pipeline.get('nodes', [])
    edges = parsed_pipeline.get('edges', [])
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    adj = {node['id']: [] for node in nodes}
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source in adj:
            adj[source].append(target)
            
    visited = set()
    rec_stack = set()
    
    def is_cyclic(v):
        visited.add(v)
        rec_stack.add(v)
        
        for neighbor in adj.get(v, []):
            if neighbor not in visited:
                if is_cyclic(neighbor):
                    return True
            elif neighbor in rec_stack:
                return True
                
        rec_stack.remove(v)
        return False
        
    is_dag = True
    for node_id in adj:
        if node_id not in visited:
            if is_cyclic(node_id):
                is_dag = False
                break
                
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }
