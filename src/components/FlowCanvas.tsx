import { useCallback, useEffect, useState } from "react";
import {
  applyNodeChanges,
  Background,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlow,
  useReactFlow,
  type Edge,
  type EdgeTypes,
  type Node,
  type NodeChange,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

interface FlowCanvasProps<TNodeData extends Record<string, unknown>, TEdgeData extends Record<string, unknown>> {
  nodes: Node<TNodeData>[];
  edges: Edge<TEdgeData>[];
  nodeTypes: NodeTypes;
  edgeTypes: EdgeTypes;
  /** Changes identity whenever the current view changes, to trigger a re-fit. */
  viewKey: string;
  onNodeDoubleClick?: (nodeId: string) => void;
  onNodeClick?: (node: Node<TNodeData>) => void;
}

export function FlowCanvas<TNodeData extends Record<string, unknown>, TEdgeData extends Record<string, unknown>>({
  nodes,
  edges,
  nodeTypes,
  edgeTypes,
  viewKey,
  onNodeDoubleClick,
  onNodeClick,
}: FlowCanvasProps<TNodeData, TEdgeData>) {
  // React Flow only reflects interaction state (selection, drag) back into what it renders if you
  // apply its change events onto the nodes array yourself.
  const [rfNodes, setRfNodes] = useState(nodes);
  useEffect(() => setRfNodes(nodes), [nodes]);

  const handleNodesChange = useCallback((changes: NodeChange<Node<TNodeData>>[]) => {
    setRfNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const { fitView } = useReactFlow();
  useEffect(() => {
    // Deferred: remounting via `key` races React Flow's own dimension measurement of freshly
    // swapped-in nodes — fitView can run against zero-size nodes. Waiting a tick lets it land.
    const id = window.setTimeout(() => fitView({ duration: 200, padding: 0.2 }), 50);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewKey]);

  return (
    <ReactFlow
      nodes={rfNodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onNodesChange={handleNodesChange}
      onlyRenderVisibleElements
      defaultEdgeOptions={{ markerEnd: { type: MarkerType.ArrowClosed, color: "#495057", width: 16, height: 16 } }}
      onNodeDoubleClick={onNodeDoubleClick ? (_, node) => onNodeDoubleClick(node.id) : undefined}
      onNodeClick={onNodeClick ? (_, node) => onNodeClick(node) : undefined}
      minZoom={0.05}
    >
      <Background />
      <Controls />
      <MiniMap pannable zoomable />
    </ReactFlow>
  );
}
