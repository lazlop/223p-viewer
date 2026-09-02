import { useCallback, useMemo, useState, type ChangeEvent } from "react";
import { ReactFlowProvider, type EdgeTypes, type NodeTypes } from "@xyflow/react";
import defaultModelTtl from "../models/nist-bdg1-1.ttl?raw";
import { parseTtl } from "./lib/ttlParser";
import { buildS223Model } from "./lib/modelBuilder";
import { childrenOf, pathTo, rootNodes } from "./lib/hierarchy";
import { buildFlowElements } from "./lib/flowBuilder";
import { buildInstrumentationOverlay } from "./lib/pointsFlowBuilder";
import { layoutGraph } from "./lib/layout";
import { FlowCanvas } from "./components/FlowCanvas";
import { Breadcrumb } from "./components/Breadcrumb";
import { EquipmentNode } from "./components/nodes/EquipmentNode";
import { PropertyPillNode } from "./components/nodes/PropertyPillNode";
import { ConnectionEdge } from "./components/edges/ConnectionEdge";
import { InstrumentationEdge } from "./components/edges/InstrumentationEdge";
import "./App.css";

const EQUIPMENT_NODE_TYPES: NodeTypes = { equipmentNode: EquipmentNode, propertyPill: PropertyPillNode };
const EQUIPMENT_EDGE_TYPES: EdgeTypes = { connectionEdge: ConnectionEdge, instrumentationEdge: InstrumentationEdge };

export default function App() {
  const [source, setSource] = useState(defaultModelTtl);
  const [fileName, setFileName] = useState("nist-bdg1-1.ttl (bundled example)");
  const [containerUri, setContainerUri] = useState<string | null>(null);
  const [showPoints, setShowPoints] = useState(false);
  const [showFunctions, setShowFunctions] = useState(false);
  const [showSensorsActuators, setShowSensorsActuators] = useState(true);
  const [showAllProperties, setShowAllProperties] = useState(false);

  const model = useMemo(() => buildS223Model(parseTtl(source).graph), [source]);

  const path = useMemo(() => (containerUri ? pathTo(model, containerUri) : []), [model, containerUri]);

  const visibleUris = useMemo(() => {
    const list = containerUri ? childrenOf(model, containerUri) : rootNodes(model);
    return new Set(list.map((n) => n.uri));
  }, [model, containerUri]);

  // Sensors & Controls toggle: same containment hierarchy and single-level drill-down as the
  // plain Equipment view — toggling it on pulls in every point (Sensor/Actuator/Function/
  // Controller, gated by the Functions and Sensors & Actuators sub-toggles) attached to what's
  // contained at this level, even ones that aren't themselves tree children here (see
  // buildInstrumentationOverlay's extraPointUris — real 223P points are frequently linked purely
  // functionally rather than physically nested in the equipment they instrument), adds Property-
  // pill nodes for what each of those points observes/actuates (wired point -> pill -> the
  // property's owning equipment box, when that box is visible), and shrinks/greys out boxes with
  // neither properties nor instrumentation of their own, so property- and instrumentation-bearing
  // equipment stands out without losing the structure it's organized by. See flowBuilder.ts and
  // pointsFlowBuilder.ts's buildInstrumentationOverlay.
  const equipmentFlow = useMemo(() => {
    let renderUris = visibleUris;
    const overlay = showPoints
      ? buildInstrumentationOverlay(model, visibleUris, showFunctions, showSensorsActuators, showAllProperties)
      : null;
    if (overlay && overlay.extraPointUris.size > 0) {
      renderUris = new Set([...visibleUris, ...overlay.extraPointUris]);
    }

    const flow = buildFlowElements(model, renderUris, showPoints, showFunctions, showSensorsActuators);
    let nodes: (typeof flow.nodes[number] | ReturnType<typeof buildInstrumentationOverlay>["nodes"][number])[] = flow.nodes;
    let edges = flow.edges;
    if (overlay) {
      edges = [...edges, ...overlay.edges];
      nodes = [
        ...flow.nodes.map((n) => (overlay.summaries.has(n.id) ? { ...n, data: { ...n.data, instrumentation: overlay.summaries.get(n.id) } } : n)),
        ...overlay.nodes,
      ];
    }
    const laidOutNodes = layoutGraph(nodes, edges, (n) => ("connectionPoints" in n.data ? n.data.connectionPoints.length : 0));
    return { nodes: laidOutNodes, edges };
  }, [model, visibleUris, showPoints, showFunctions, showSensorsActuators, showAllProperties]);

  const handleNodeDoubleClick = useCallback(
    (nodeId: string) => {
      const node = model.nodes.get(nodeId);
      if (node && node.children.length > 0) setContainerUri(nodeId);
    },
    [model],
  );

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSource(String(reader.result));
      setFileName(file.name);
      setContainerUri(null);
      setShowPoints(false);
      setShowFunctions(false);
      setShowSensorsActuators(true);
      setShowAllProperties(false);
    };
    reader.readAsText(file);
  }, []);

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__title">223P Model Viewer</div>
        <Breadcrumb path={path} onNavigate={setContainerUri} />
        <div className="app__view-toggle">
          <button
            className={`app__view-toggle-btn ${showPoints ? "app__view-toggle-btn--active" : ""}`}
            aria-pressed={showPoints}
            onClick={() => setShowPoints((v) => !v)}
          >
            Sensors &amp; Controls
          </button>
        </div>
        {showPoints && (
          <label className="app__sub-toggle">
            <input
              type="checkbox"
              checked={showSensorsActuators}
              onChange={(e) => setShowSensorsActuators(e.target.checked)}
            />
            Sensors &amp; Actuators
          </label>
        )}
        {showPoints && (
          <label className="app__sub-toggle">
            <input type="checkbox" checked={showFunctions} onChange={(e) => setShowFunctions(e.target.checked)} />
            Functions
          </label>
        )}
        {showPoints && (
          <label className="app__sub-toggle">
            <input
              type="checkbox"
              checked={showAllProperties}
              onChange={(e) => setShowAllProperties(e.target.checked)}
            />
            All Properties
          </label>
        )}
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
          <FlowCanvas
            nodes={equipmentFlow.nodes}
            edges={equipmentFlow.edges}
            nodeTypes={EQUIPMENT_NODE_TYPES}
            edgeTypes={EQUIPMENT_EDGE_TYPES}
            viewKey={`${containerUri ?? "__root__"}::${showPoints}::${showFunctions}::${showSensorsActuators}::${showAllProperties}`}
            onNodeDoubleClick={handleNodeDoubleClick}
          />
        </ReactFlowProvider>
      </div>
    </div>
  );
}
