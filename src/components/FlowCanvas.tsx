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
  type Node,
  type NodeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { EquipmentNode } from "./nodes/EquipmentNode";
import { ConnectionEdge } from "./edges/ConnectionEdge";
import type { FlowEdgeData, FlowNodeData } from "../lib/flowBuilder";

const nodeTypes = { equipmentNode: EquipmentNode };
const edgeTypes = { connectionEdge: ConnectionEdge };

interface FlowCanvasProps {
  nodes: Node<FlowNodeData>[];
  edges: Edge<FlowEdgeData>[];
  /** Changes identity whenever the drilled-in view changes, to trigger a re-fit. */
  viewKey: string;
  onNodeDoubleClick?: (nodeId: string) => void;
}

export function FlowCanvas({ nodes, edges, viewKey, onNodeDoubleClick }: FlowCanvasProps) {
  // React Flow only reflects interaction state (selection, drag) back into what it renders if you
  // apply its change events onto the nodes array yourself.
  const [rfNodes, setRfNodes] = useState(nodes);
  useEffect(() => setRfNodes(nodes), [nodes]);

  const handleNodesChange = useCallback((changes: NodeChange<Node<FlowNodeData>>[]) => {
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
      minZoom={0.05}
    >
      <Background />
      <Controls />
      <MiniMap pannable zoomable />
    </ReactFlow>
  );
}
