import { useCallback, useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
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
  /** When set and present among `nodes`, fit the view to just this node (generous padding) instead
   * of fitting everything — used to draw the eye to a box just jumped to from elsewhere (e.g. a
   * BSchema member click). */
  focusNodeId?: string;
  onNodeDoubleClick?: (nodeId: string) => void;
  /** Passes the raw click event through so the caller can read `shiftKey` (query-selection
   * multi-select) without this component needing to know anything about that feature. */
  onNodeClick?: (node: Node<TNodeData>, event: ReactMouseEvent) => void;
  /** Fired on a click that hits empty canvas — used to clear a box selection. */
  onPaneClick?: () => void;
}

export function FlowCanvas<TNodeData extends Record<string, unknown>, TEdgeData extends Record<string, unknown>>({
  nodes,
  edges,
  nodeTypes,
  edgeTypes,
  viewKey,
  focusNodeId,
  onNodeDoubleClick,
  onNodeClick,
  onPaneClick,
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
    const id = window.setTimeout(() => {
      if (focusNodeId && nodes.some((n) => n.id === focusNodeId)) {
        fitView({ nodes: [{ id: focusNodeId }], duration: 300, padding: 2, maxZoom: 1 });
      } else {
        fitView({ duration: 200, padding: 0.2 });
      }
    }, 50);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewKey, focusNodeId]);

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
      onNodeClick={onNodeClick ? (event, node) => onNodeClick(node, event) : undefined}
      onPaneClick={onPaneClick}
      minZoom={0.05}
    >
      <Background />
      <Controls />
      <MiniMap pannable zoomable />
    </ReactFlow>
  );
}
