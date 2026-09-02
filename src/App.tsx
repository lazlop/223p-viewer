import { useCallback, useMemo, useState, type ChangeEvent } from "react";
import { ReactFlowProvider, type EdgeTypes, type NodeTypes } from "@xyflow/react";
import defaultModelTtl from "../models/nist-bdg1-1.ttl?raw";
import b59BuildingTtl from "../models/b59-building.ttl?raw";
import b59BschemaTtl from "../models/b59-bschema-threshold-30.ttl?raw";
import b59MembersTtl from "../models/b59-bschema-members-threshold-30.ttl?raw";
import { parseTtl } from "./lib/ttlParser";
import { buildS223Model } from "./lib/modelBuilder";
import { childrenOf, pathTo, rootNodes } from "./lib/hierarchy";
import { buildFlowElements, type FlowMember } from "./lib/flowBuilder";
import { buildInstrumentationOverlay } from "./lib/pointsFlowBuilder";
import { layoutGraph } from "./lib/layout";
import { parseBschemaMembers, resolveMemberOwner, labelForMember } from "./lib/bschemaMembers";
import { FlowCanvas } from "./components/FlowCanvas";
import { Breadcrumb } from "./components/Breadcrumb";
import { EquipmentNode } from "./components/nodes/EquipmentNode";
import { PropertyPillNode } from "./components/nodes/PropertyPillNode";
import { ConnectionEdge } from "./components/edges/ConnectionEdge";
import { InstrumentationEdge } from "./components/edges/InstrumentationEdge";
import "./App.css";

const EQUIPMENT_NODE_TYPES: NodeTypes = { equipmentNode: EquipmentNode, propertyPill: PropertyPillNode };
const EQUIPMENT_EDGE_TYPES: EdgeTypes = { connectionEdge: ConnectionEdge, instrumentationEdge: InstrumentationEdge };

type ViewTab = "equipment" | "bschema";

// Equipment view's quick-switch dropdown, alongside the file picker: `ttl` values are the exact
// raw-imported strings, so reference equality against `source` (see currentBundledId below) also
// picks up b59 as "selected" after a BSchema member-click jump, which loads the same string.
const BUNDLED_EXAMPLES = [
  { id: "nist-bdg1-1", label: "nist-bdg1-1.ttl (bundled example)", ttl: defaultModelTtl },
  { id: "b59-building", label: "b59-building.ttl (bundled example)", ttl: b59BuildingTtl },
] as const;

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>("equipment");

  const [source, setSource] = useState(defaultModelTtl);
  const [fileName, setFileName] = useState("nist-bdg1-1.ttl (bundled example)");
  const [containerUri, setContainerUri] = useState<string | null>(null);
  const [showPoints, setShowPoints] = useState(false);
  const [showFunctions, setShowFunctions] = useState(false);
  const [showSensorsActuators, setShowSensorsActuators] = useState(true);
  const [showAllProperties, setShowAllProperties] = useState(false);
  // Set by a BSchema member click (see handleMemberClick): which box to visually call out and
  // focus the view on, in whatever Equipment-view model is currently loaded. Cleared on any other
  // navigation so it doesn't linger on the wrong box.
  const [highlightUri, setHighlightUri] = useState<string | null>(null);

  const model = useMemo(() => buildS223Model(parseTtl(source).graph), [source]);

  // BSchema view: b59's threshold-30 class graph, its member graph (bs:Class -> real building
  // instance URIs), and the real b59 building model those instances resolve against — all bundled
  // and fixed for now (see the peer bschema-rs repo's eval/ fixtures). Parsed once; independent of
  // whatever the user has loaded into Equipment view via the file picker.
  const bschemaModel = useMemo(() => buildS223Model(parseTtl(b59BschemaTtl).graph), []);
  const bschemaMembers = useMemo(() => parseBschemaMembers(parseTtl(b59MembersTtl).graph), []);
  const b59BuildingModel = useMemo(() => buildS223Model(parseTtl(b59BuildingTtl).graph), []);
  const [bschemaContainerUri, setBschemaContainerUri] = useState<string | null>(null);

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
    const laidOutNodes = layoutGraph(nodes, edges, (n) => ("connectionPoints" in n.data ? n.data.connectionPoints.length : 0)).map((n) =>
      highlightUri && n.id === highlightUri ? { ...n, data: { ...n.data, highlighted: true } } : n,
    );
    return { nodes: laidOutNodes, edges };
  }, [model, visibleUris, showPoints, showFunctions, showSensorsActuators, showAllProperties, highlightUri]);

  const handleNodeDoubleClick = useCallback(
    (nodeId: string) => {
      const node = model.nodes.get(nodeId);
      if (node && node.children.length > 0) setContainerUri(nodeId);
      setHighlightUri(null);
    },
    [model],
  );

  const handleBreadcrumbNavigate = useCallback((uri: string | null) => {
    setContainerUri(uri);
    setHighlightUri(null);
  }, []);

  const loadSource = useCallback((ttl: string, name: string) => {
    setSource(ttl);
    setFileName(name);
    setContainerUri(null);
    setShowPoints(false);
    setShowFunctions(false);
    setShowSensorsActuators(true);
    setShowAllProperties(false);
    setHighlightUri(null);
  }, []);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => loadSource(String(reader.result), file.name);
      reader.readAsText(file);
    },
    [loadSource],
  );

  const handleBundledSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const found = BUNDLED_EXAMPLES.find((b) => b.id === e.target.value);
      if (found) loadSource(found.ttl, found.label);
    },
    [loadSource],
  );

  const currentBundledId = useMemo(() => BUNDLED_EXAMPLES.find((b) => b.ttl === source)?.id ?? "", [source]);

  // BSchema view: same single-level containment drill-down as Equipment view, over the bschema
  // class graph instead of a real building — see bschemaModel above.
  const bschemaPath = useMemo(
    () => (bschemaContainerUri ? pathTo(bschemaModel, bschemaContainerUri) : []),
    [bschemaModel, bschemaContainerUri],
  );

  const bschemaVisibleUris = useMemo(() => {
    const list = bschemaContainerUri ? childrenOf(bschemaModel, bschemaContainerUri) : rootNodes(bschemaModel);
    return new Set(list.map((n) => n.uri));
  }, [bschemaModel, bschemaContainerUri]);

  // Jump from a bschema class box's Members hover list to the real piece of equipment it
  // summarizes, in Equipment view: resolve the member to its owning container/hub/space (itself,
  // if it already is one), load the b59 building model there (whatever the user had loaded before
  // is replaced — the member only exists in b59's own instance graph), drill Equipment view to that
  // node's parent so the node itself is in the visible set, and highlight+focus it. Forces the
  // Sensors & Controls overlay (and both its sub-toggles) on since the target may well be a
  // Sensor/Actuator/Function, which plain Equipment view never renders as its own box.
  const handleMemberClick = useCallback(
    (memberUri: string) => {
      const ownerUri = resolveMemberOwner(b59BuildingModel, memberUri);
      if (!ownerUri) return;
      const ownerPath = pathTo(b59BuildingModel, ownerUri);
      const parentUri = ownerPath.length > 1 ? ownerPath[ownerPath.length - 2].uri : null;

      setSource(b59BuildingTtl);
      setFileName("b59-building.ttl (from BSchema member)");
      setContainerUri(ownerUri);
      setShowPoints(true);
      setShowFunctions(true);
      setShowSensorsActuators(true);
      setHighlightUri(null);
      setActiveTab("equipment");
    },
    [b59BuildingModel],
  );

  const bschemaFlow = useMemo(() => {
    const flow = buildFlowElements(bschemaModel, bschemaVisibleUris);
    const nodes = flow.nodes.map((n) => {
      const memberUris = bschemaMembers.get(n.id);
      if (!memberUris || memberUris.length === 0) return n;
      const members: FlowMember[] = memberUris.map((uri) => ({
        uri,
        label: labelForMember(b59BuildingModel, uri),
        navigable: resolveMemberOwner(b59BuildingModel, uri) !== undefined,
      }));
      return { ...n, data: { ...n.data, members, onMemberClick: handleMemberClick } };
    });
    const laidOutNodes = layoutGraph(nodes, flow.edges, (n) => ("connectionPoints" in n.data ? n.data.connectionPoints.length : 0));
    return { nodes: laidOutNodes, edges: flow.edges };
  }, [bschemaModel, bschemaVisibleUris, bschemaMembers, b59BuildingModel, handleMemberClick]);

  const handleBschemaNodeDoubleClick = useCallback(
    (nodeId: string) => {
      const node = bschemaModel.nodes.get(nodeId);
      if (node && node.children.length > 0) setBschemaContainerUri(nodeId);
    },
    [bschemaModel],
  );

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__title">223P Model Viewer</div>
        <div className="app__view-toggle">
          <button
            className={`app__view-toggle-btn ${activeTab === "equipment" ? "app__view-toggle-btn--active" : ""}`}
            aria-pressed={activeTab === "equipment"}
            onClick={() => setActiveTab("equipment")}
          >
            Equipment
          </button>
          <button
            className={`app__view-toggle-btn ${activeTab === "bschema" ? "app__view-toggle-btn--active" : ""}`}
            aria-pressed={activeTab === "bschema"}
            onClick={() => setActiveTab("bschema")}
          >
            BSchema
          </button>
        </div>
        {activeTab === "equipment" ? (
          <Breadcrumb path={path} onNavigate={handleBreadcrumbNavigate} />
        ) : (
          <Breadcrumb path={bschemaPath} onNavigate={setBschemaContainerUri} />
        )}
        {activeTab === "equipment" && (
          <>
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
              <select className="app__bundled-select" value={currentBundledId} onChange={handleBundledSelect}>
                <option value="" disabled>
                  Bundled example…
                </option>
                {BUNDLED_EXAMPLES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
              </select>
              <label className="app__file-button">
                Load .ttl
                <input type="file" accept=".ttl,text/turtle" onChange={handleFileChange} hidden />
              </label>
            </div>
          </>
        )}
        {activeTab === "bschema" && (
          <span className="app__file-name app__file-name--info">
            b59, threshold-30 — hover a box for its properties &amp; real members; click a member to jump to it in Equipment view
          </span>
        )}
      </header>
      <div className="app__canvas">
        <ReactFlowProvider>
          {activeTab === "equipment" ? (
            <FlowCanvas
              nodes={equipmentFlow.nodes}
              edges={equipmentFlow.edges}
              nodeTypes={EQUIPMENT_NODE_TYPES}
              edgeTypes={EQUIPMENT_EDGE_TYPES}
              viewKey={`${fileName}::${containerUri ?? "__root__"}::${showPoints}::${showFunctions}::${showSensorsActuators}::${showAllProperties}`}
              focusNodeId={highlightUri ?? undefined}
              onNodeDoubleClick={handleNodeDoubleClick}
            />
          ) : (
            <FlowCanvas
              nodes={bschemaFlow.nodes}
              edges={bschemaFlow.edges}
              nodeTypes={EQUIPMENT_NODE_TYPES}
              edgeTypes={EQUIPMENT_EDGE_TYPES}
              viewKey={`bschema::${bschemaContainerUri ?? "__root__"}`}
              onNodeDoubleClick={handleBschemaNodeDoubleClick}
            />
          )}
        </ReactFlowProvider>
      </div>
    </div>
  );
}
