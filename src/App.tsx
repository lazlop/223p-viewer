import { useCallback, useMemo, useState, type ChangeEvent } from "react";
import { ReactFlowProvider, type EdgeTypes, type Node, type NodeTypes } from "@xyflow/react";
import defaultModelTtl from "../models/nist-bdg1-1.ttl?raw";
import { parseTtl } from "./lib/ttlParser";
import { buildS223Model } from "./lib/modelBuilder";
import { childrenOf, pathTo, rootNodes } from "./lib/hierarchy";
import { buildFlowElements } from "./lib/flowBuilder";
import { buildPointsFlowElements, type PointsFlowNodeData } from "./lib/pointsFlowBuilder";
import { layoutGraph } from "./lib/layout";
import { FlowCanvas } from "./components/FlowCanvas";
import { Breadcrumb } from "./components/Breadcrumb";
import { EquipmentNode } from "./components/nodes/EquipmentNode";
import { PointNode } from "./components/nodes/PointNode";
import { PropertyPillNode } from "./components/nodes/PropertyPillNode";
import { ReferenceNode } from "./components/nodes/ReferenceNode";
import { ConnectionEdge } from "./components/edges/ConnectionEdge";
import { InstrumentationEdge } from "./components/edges/InstrumentationEdge";
import type { S223Model } from "./types/s223";
import "./App.css";

const EQUIPMENT_NODE_TYPES: NodeTypes = { equipmentNode: EquipmentNode };
const EQUIPMENT_EDGE_TYPES: EdgeTypes = { connectionEdge: ConnectionEdge };
const POINTS_NODE_TYPES: NodeTypes = { pointNode: PointNode, propertyPill: PropertyPillNode, referenceNode: ReferenceNode };
const POINTS_EDGE_TYPES: EdgeTypes = { instrumentationEdge: InstrumentationEdge };

type ViewMode = "equipment" | "points";
type SystemMode = "inferred" | "literal";

function buildModel(text: string, systemMode: SystemMode): S223Model {
  const { graph } = parseTtl(text);
  return buildS223Model(graph, { inferSystemBoundaries: systemMode === "inferred" });
}

export default function App() {
  const [source, setSource] = useState(defaultModelTtl);
  const [fileName, setFileName] = useState("nist-bdg1-1.ttl (bundled example)");
  const [containerUri, setContainerUri] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("equipment");
  const [systemMode, setSystemMode] = useState<SystemMode>("inferred");

  const model = useMemo(() => buildModel(source, systemMode), [source, systemMode]);

  const path = useMemo(() => (containerUri ? pathTo(model, containerUri) : []), [model, containerUri]);

  const visibleUris = useMemo(() => {
    const list = containerUri ? childrenOf(model, containerUri) : rootNodes(model);
    return new Set(list.map((n) => n.uri));
  }, [model, containerUri]);

  const equipmentFlow = useMemo(() => {
    const flow = buildFlowElements(model, visibleUris);
    const laidOutNodes = layoutGraph(flow.nodes, flow.edges, (n) => n.data.connectionPoints.length);
    return { nodes: laidOutNodes, edges: flow.edges };
  }, [model, visibleUris]);

  const pointsFlow = useMemo(() => {
    const flow = buildPointsFlowElements(model);
    // TB (not the default LR): most chains here are short point->property->reference triples, so
    // LR makes every component ~3 boxes wide and only 1 tall — the grid-packer then only fits ~2
    // per row and stacks dozens of rows. Stacking each chain vertically instead keeps components
    // narrow, so far more fit side by side.
    const laidOutNodes = layoutGraph(flow.nodes, flow.edges, () => 0, "TB");
    return { nodes: laidOutNodes, edges: flow.edges };
  }, [model]);

  const handleNodeDoubleClick = useCallback(
    (nodeId: string) => {
      if (viewMode !== "equipment") return;
      const node = model.nodes.get(nodeId);
      if (node && node.children.length > 0) setContainerUri(nodeId);
    },
    [model, viewMode],
  );

  const handlePointsNodeClick = useCallback((node: Node<PointsFlowNodeData>) => {
    if (node.type !== "referenceNode") return;
    setViewMode("equipment");
    setContainerUri(node.data.jumpToContainerUri ?? null);
  }, []);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSource(String(reader.result));
      setFileName(file.name);
      setContainerUri(null);
      setViewMode("equipment");
    };
    reader.readAsText(file);
  }, []);

  const handleSystemModeChange = useCallback((mode: SystemMode) => {
    setSystemMode(mode);
    setContainerUri(null); // the containment tree can shift under a stale drill-in path
  }, []);

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__title">223P Model Viewer</div>
        <div className="app__view-toggle">
          <button
            className={`app__view-toggle-btn ${viewMode === "equipment" ? "app__view-toggle-btn--active" : ""}`}
            onClick={() => setViewMode("equipment")}
          >
            Equipment
          </button>
          <button
            className={`app__view-toggle-btn ${viewMode === "points" ? "app__view-toggle-btn--active" : ""}`}
            onClick={() => setViewMode("points")}
          >
            Sensors &amp; Controls
          </button>
        </div>
        {viewMode === "equipment" && <Breadcrumb path={path} onNavigate={setContainerUri} />}
        <div
          className="app__view-toggle"
          title="How Systems (s223:System) are handled: Inferred nests a System into whatever equipment most of its members already live in, or treats it as a real box if its wiring reaches outside equipment. Literal only uses explicit s223:hasBoundaryConnectionPoint declarations."
        >
          <button
            className={`app__view-toggle-btn ${systemMode === "inferred" ? "app__view-toggle-btn--active" : ""}`}
            onClick={() => handleSystemModeChange("inferred")}
          >
            Systems: Inferred
          </button>
          <button
            className={`app__view-toggle-btn ${systemMode === "literal" ? "app__view-toggle-btn--active" : ""}`}
            onClick={() => handleSystemModeChange("literal")}
          >
            Systems: Literal
          </button>
        </div>
        <div className="app__file">
          <span className="app__file-name" title={fileName}>
            {fileName}
          </span>
          <label className="app__file-button">
            Load .ttl
            <input type="file" accept=".ttl,text/turtle" onChange={handleFileChange} hidden />
          </label>
        </div>
      </header>
      <div className="app__canvas">
        <ReactFlowProvider>
          {viewMode === "equipment" ? (
            <FlowCanvas
              nodes={equipmentFlow.nodes}
              edges={equipmentFlow.edges}
              nodeTypes={EQUIPMENT_NODE_TYPES}
              edgeTypes={EQUIPMENT_EDGE_TYPES}
              viewKey={containerUri ?? "__root__"}
              onNodeDoubleClick={handleNodeDoubleClick}
            />
          ) : (
            <FlowCanvas
              nodes={pointsFlow.nodes}
              edges={pointsFlow.edges}
              nodeTypes={POINTS_NODE_TYPES}
              edgeTypes={POINTS_EDGE_TYPES}
              viewKey="__points__"
              onNodeClick={handlePointsNodeClick}
            />
          )}
        </ReactFlowProvider>
      </div>
    </div>
  );
}
