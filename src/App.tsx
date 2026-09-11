import { useCallback, useMemo, useState, type ChangeEvent, type MouseEvent as ReactMouseEvent } from "react";
import { ReactFlowProvider, type Edge, type EdgeTypes, type Node, type NodeTypes } from "@xyflow/react";
import defaultModelTtl from "../models/nist-bdg1-1.ttl?raw";
import b59BuildingTtl from "../models/b59-building.ttl?raw";
import b59BschemaTtl from "../models/b59-bschema-threshold-30.ttl?raw";
import b59MembersTtl from "../models/b59-bschema-members-threshold-30.ttl?raw";
import brickModelTtl from "../models/brick-model.ttl?raw";
import { parseTtl } from "./lib/ttlParser";
import { buildS223Model } from "./lib/modelBuilder";
import { buildBrickModel, looksLikeBrickGraph } from "./lib/brickModelBuilder";
import { childrenOf, pathTo, rootNodes } from "./lib/hierarchy";
import { buildFlowElements, type FlowEdgeData, type FlowMember, type FlowNodeData } from "./lib/flowBuilder";
import {
  buildInstrumentationOverlay,
  type ConnectionJunctionNodeData,
  type PointsFlowEdgeData,
  type PropertyPillNodeData,
} from "./lib/pointsFlowBuilder";
import { layoutGraph } from "./lib/layout";
import { parseBschemaMembers, resolveMemberOwner, labelForMember } from "./lib/bschemaMembers";
import { computeInViewScope, EMPTY_URI_SET, type ClipboardItem } from "./lib/viewScope";
import { useEquipmentView } from "./lib/useEquipmentView";
import { FlowCanvas } from "./components/FlowCanvas";
import { InViewSidebar } from "./components/InViewSidebar";
import { Breadcrumb } from "./components/Breadcrumb";
import { EquipmentNode } from "./components/nodes/EquipmentNode";
import { PropertyPillNode } from "./components/nodes/PropertyPillNode";
import { ConnectionJunctionNode } from "./components/nodes/ConnectionJunctionNode";
import { ConnectionEdge } from "./components/edges/ConnectionEdge";
import { InstrumentationEdge } from "./components/edges/InstrumentationEdge";
import "./App.css";

const EQUIPMENT_NODE_TYPES: NodeTypes = {
  equipmentNode: EquipmentNode,
  propertyPill: PropertyPillNode,
  connectionJunction: ConnectionJunctionNode,
};
const EQUIPMENT_EDGE_TYPES: EdgeTypes = { connectionEdge: ConnectionEdge, instrumentationEdge: InstrumentationEdge };

type ViewTab = "equipment" | "bschema";
type SchemaMode = "s223" | "brick";

// layoutGraph's node-height heuristic keys off connection-point count, which only equipmentNode
// data carries — propertyPill and connectionJunction nodes have neither, so this reads as 0 for
// them and they fall back to the base node height.
function cpCountOf(n: { data: unknown }): number {
  const cp = (n.data as Record<string, unknown>).connectionPoints;
  return Array.isArray(cp) ? cp.length : 0;
}

// Equipment view's quick-switch dropdown, alongside the file picker: `ttl` values are the exact
// raw-imported strings, so reference equality against `source` (see currentBundledId below) also
// picks up b59 as "selected" after a BSchema member-click jump, which loads the same string.
// Each entry's `schema` tags which model builder it needs (see the Schema selector next to this
// dropdown) — picking a bundled example sets that selector to match automatically.
const BUNDLED_EXAMPLES = [
  { id: "nist-bdg1-1", label: "nist-bdg1-1.ttl (bundled example)", ttl: defaultModelTtl, schema: "s223" },
  { id: "b59-building", label: "b59-building.ttl (bundled example)", ttl: b59BuildingTtl, schema: "s223" },
  { id: "brick-model", label: "brick-model.ttl (bundled example)", ttl: brickModelTtl, schema: "brick" },
] as const satisfies readonly { id: string; label: string; ttl: string; schema: SchemaMode }[];

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>("equipment");

  const [source, setSource] = useState(defaultModelTtl);
  const [fileName, setFileName] = useState("nist-bdg1-1.ttl (bundled example)");
  // Which model builder the Equipment tab's currently-loaded `source` needs — 223P and Brick
  // describe buildings with different RDF relations (see brickModelBuilder.ts), so this picks
  // between buildS223Model/buildBrickModel rather than the app having a separate Brick tab/view.
  // Set automatically by loadSource (bundled examples know their own schema; an arbitrary Load
  // .ttl file is sniffed via looksLikeBrickGraph) and otherwise overridable via the Schema select.
  const [schemaMode, setSchemaMode] = useState<SchemaMode>("s223");
  const [containerUri, setContainerUri] = useState<string | null>(null);
  const [showPoints, setShowPoints] = useState(false);
  const [showFunctions, setShowFunctions] = useState(false);
  const [showSensorsActuators, setShowSensorsActuators] = useState(true);
  const [showAllProperties, setShowAllProperties] = useState(false);
  // Set by a BSchema member click (see handleMemberClick): which box to visually call out and
  // focus the view on, in whatever Equipment-view model is currently loaded. Cleared on any other
  // navigation so it doesn't linger on the wrong box.
  const [highlightUri, setHighlightUri] = useState<string | null>(null);
  // Query-selection sidebar: click-selected box URIs, narrowing the dropdowns to just these boxes
  // instead of everything in the current view — see handleNodeClick below and
  // lib/useEquipmentView.ts's selectedUris option.
  const [selectedUris, setSelectedUris] = useState<Set<string>>(new Set());

  // Sensors & Controls toggle: same containment hierarchy and single-level drill-down as the
  // plain Equipment view — toggling it on pulls in every point (Sensor/Actuator/Function/
  // Controller, gated by the Functions and Sensors & Actuators sub-toggles) attached to what's
  // contained at this level, even ones that aren't themselves tree children here (see
  // buildInstrumentationOverlay's extraPointUris — real 223P points are frequently linked purely
  // functionally rather than physically nested in the equipment they instrument), adds Property-
  // pill nodes for what each of those points observes/actuates (wired point -> pill -> the
  // property's owning equipment box, when that box is visible), and shrinks/greys out boxes with
  // neither properties nor instrumentation of their own, so property- and instrumentation-bearing
  // equipment stands out without losing the structure it's organized by. See flowBuilder.ts,
  // pointsFlowBuilder.ts's buildInstrumentationOverlay, and lib/useEquipmentView.ts (this pipeline
  // is shared with the anywidget bundle in src/widget/).
  const {
    model,
    path,
    scope: equipmentScope,
    flow: equipmentFlow,
  } = useEquipmentView(source, {
    containerUri,
    showPoints,
    showFunctions,
    showSensorsActuators,
    showAllProperties,
    highlightUri,
    selectedUris,
    buildModel: schemaMode === "brick" ? buildBrickModel : buildS223Model,
  });

  // BSchema view: b59's threshold-30 class graph, its member graph (bs:Class -> real building
  // instance URIs), and the real b59 building model those instances resolve against — all bundled
  // and fixed for now (see the peer bschema-rs repo's eval/ fixtures). Parsed once; independent of
  // whatever the user has loaded into Equipment view via the file picker.
  const bschemaParsed = useMemo(() => parseTtl(b59BschemaTtl), []);
  const bschemaModel = useMemo(() => buildS223Model(bschemaParsed.graph), [bschemaParsed]);
  const bschemaMembers = useMemo(() => parseBschemaMembers(parseTtl(b59MembersTtl).graph), []);
  const b59BuildingModel = useMemo(() => buildS223Model(parseTtl(b59BuildingTtl).graph), []);
  const [bschemaContainerUri, setBschemaContainerUri] = useState<string | null>(null);

  // Query-selection sidebar: dropdowns of instances/classes/predicates/literals "in view" at the
  // current drill level (see lib/viewScope.ts), and a clipboard of picks from them — meant to be
  // read out from an embedding context (e.g. a marimo/anywidget host) rather than consumed inside
  // this app itself.
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clipboard, setClipboard] = useState<ClipboardItem[]>([]);
  const handleAddToClipboard = useCallback((item: ClipboardItem) => {
    setClipboard((prev) => (prev.some((p) => p.key === item.key) ? prev : [...prev, item]));
  }, []);
  const handleRemoveFromClipboard = useCallback((key: string) => {
    setClipboard((prev) => prev.filter((p) => p.key !== key));
  }, []);
  const handleClearClipboard = useCallback(() => setClipboard([]), []);

  // Click a box (or shift-click several) to narrow the pickers above to just that box plus
  // whatever its own hover tooltip surfaces, instead of everything in the current view — see
  // lib/viewScope.ts's collectBackingUris and useEquipmentView's selectedUris option. Shared
  // across both tabs' canvases since the semantics (and the underlying URI-set state) don't differ
  // between them; only which scope computation actually reads it does.
  // Typed on just `{ id }` (not `Node<FlowNodeData>`) since that's all this reads: a callback prop
  // typed `Node<TNodeData>` for FlowCanvas's generic TNodeData would otherwise pin TNodeData to
  // whatever this handler's parameter type says for every call site reusing it — including the
  // bschema canvas below and the Sensors & Controls overlay's mixed equipment/pill/junction nodes.
  const handleNodeClick = useCallback((node: { id: string }, event: ReactMouseEvent) => {
    setSelectedUris((prev) => {
      if (event.shiftKey) {
        const next = new Set(prev);
        if (next.has(node.id)) next.delete(node.id);
        else next.add(node.id);
        return next;
      }
      return prev.size === 1 && prev.has(node.id) ? new Set() : new Set([node.id]);
    });
  }, []);
  const handleClearSelection = useCallback(() => setSelectedUris(new Set()), []);

  const handleNodeDoubleClick = useCallback(
    (nodeId: string) => {
      const node = model.nodes.get(nodeId);
      if (node && node.children.length > 0) setContainerUri(nodeId);
      setHighlightUri(null);
      setSelectedUris(new Set());
    },
    [model],
  );

  const handleBreadcrumbNavigate = useCallback((uri: string | null) => {
    setContainerUri(uri);
    setHighlightUri(null);
    setSelectedUris(new Set());
  }, []);

  const loadSource = useCallback((ttl: string, name: string, schema: SchemaMode) => {
    setSource(ttl);
    setFileName(name);
    setSchemaMode(schema);
    setContainerUri(null);
    setShowPoints(false);
    setShowFunctions(false);
    setShowSensorsActuators(true);
    setShowAllProperties(false);
    setHighlightUri(null);
    setSelectedUris(new Set());
  }, []);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const text = String(reader.result);
        // An arbitrary loaded file doesn't come tagged with its schema the way a bundled example
        // does — sniff it from the parsed graph instead. The Schema select next to the file picker
        // still lets this be overridden afterward.
        const schema: SchemaMode = looksLikeBrickGraph(parseTtl(text).graph) ? "brick" : "s223";
        loadSource(text, file.name, schema);
      };
      reader.readAsText(file);
    },
    [loadSource],
  );

  const handleBundledSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const found = BUNDLED_EXAMPLES.find((b) => b.id === e.target.value);
      if (found) loadSource(found.ttl, found.label, found.schema);
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
      setSchemaMode("s223");
      setContainerUri(parentUri);
      setShowPoints(true);
      setShowFunctions(true);
      setShowSensorsActuators(true);
      setHighlightUri(ownerUri);
      setSelectedUris(new Set());
      setActiveTab("equipment");
    },
    [b59BuildingModel],
  );

  const bschemaOverlay = useMemo(
    () =>
      showPoints
        ? buildInstrumentationOverlay(bschemaModel, bschemaVisibleUris, showFunctions, showSensorsActuators, showAllProperties)
        : null,
    [bschemaModel, bschemaVisibleUris, showPoints, showFunctions, showSensorsActuators, showAllProperties],
  );

  const bschemaScope = useMemo(() => {
    if (selectedUris.size > 0) return computeInViewScope(bschemaParsed.graph, bschemaModel, selectedUris);
    return computeInViewScope(bschemaParsed.graph, bschemaModel, bschemaVisibleUris, bschemaOverlay?.extraPointUris ?? EMPTY_URI_SET);
  }, [bschemaParsed, bschemaModel, bschemaVisibleUris, bschemaOverlay, selectedUris]);

  // Layout is expensive (dagre, with several randomized crossing-minimization passes for dense
  // components — see lib/layout.ts) and depends only on which nodes/edges are visible, not on
  // box selection. Keeping it in its own memo means shift-clicking boxes (which changes
  // selectedUris on every click) doesn't re-run a full layout pass — only the cheap flag-
  // annotation step below reruns. See lib/useEquipmentView.ts's identical split.
  const bschemaLaidOut = useMemo(() => {
    let renderUris = bschemaVisibleUris;
    const overlay = bschemaOverlay;
    if (overlay && overlay.extraPointUris.size > 0) {
      renderUris = new Set([...bschemaVisibleUris, ...overlay.extraPointUris]);
    }

    const flow = buildFlowElements(bschemaModel, renderUris, showPoints, showFunctions, showSensorsActuators);
    // Annotated as one Node<union> (not a union of differently-typed Node<...> arrays) so
    // layoutGraph's `Node<T>[]` generic parameter unifies T against the whole union instead of
    // collapsing to just one branch. See lib/useEquipmentView.ts's identical flow memo.
    const nodes: Node<FlowNodeData | PropertyPillNodeData | ConnectionJunctionNodeData>[] = overlay
      ? [
          ...flow.nodes.map((n) => (overlay.summaries.has(n.id) ? { ...n, data: { ...n.data, instrumentation: overlay.summaries.get(n.id) } } : n)),
          ...overlay.nodes,
        ]
      : flow.nodes;
    const edges: Edge<FlowEdgeData | PointsFlowEdgeData>[] = overlay
      ? [
          ...flow.edges.filter((e) => !overlay.replacedConnectionEdgeIds.has(e.id)),
          ...overlay.edges,
          ...overlay.connectionSegmentEdges,
        ]
      : flow.edges;
    const processedNodes = nodes.map((n) => {
      const memberUris = bschemaMembers.get(n.id);
      if (!memberUris || memberUris.length === 0) return n;
      const members: FlowMember[] = memberUris.map((uri) => ({
        uri,
        label: labelForMember(b59BuildingModel, uri),
        navigable: resolveMemberOwner(b59BuildingModel, uri) !== undefined,
      }));
      return { ...n, data: { ...n.data, members, onMemberClick: handleMemberClick } };
    });
    return { nodes: layoutGraph(processedNodes, edges, cpCountOf), edges };
  }, [
    bschemaModel,
    bschemaVisibleUris,
    bschemaMembers,
    b59BuildingModel,
    handleMemberClick,
    showPoints,
    showFunctions,
    showSensorsActuators,
    bschemaOverlay,
  ]);

  // Cheap per-click step: stamp the selected flag onto the already-laid-out nodes. Untouched
  // nodes keep their prior object identity, so React Flow's per-node memoization can skip
  // re-rendering them.
  const bschemaFlow = useMemo(() => {
    if (selectedUris.size === 0) return bschemaLaidOut;
    const nodes = bschemaLaidOut.nodes.map((n) => (selectedUris.has(n.id) ? { ...n, data: { ...n.data, selected: true } } : n));
    return { nodes, edges: bschemaLaidOut.edges };
  }, [bschemaLaidOut, selectedUris]);

  const handleBschemaNodeDoubleClick = useCallback(
    (nodeId: string) => {
      const node = bschemaModel.nodes.get(nodeId);
      if (node && node.children.length > 0) setBschemaContainerUri(nodeId);
      setSelectedUris(new Set());
    },
    [bschemaModel],
  );

  const handleBschemaBreadcrumbNavigate = useCallback((uri: string | null) => {
    setBschemaContainerUri(uri);
    setSelectedUris(new Set());
  }, []);

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__title">223P Model Viewer</div>
        <div className="app__view-toggle">
          <button
            className={`app__view-toggle-btn ${activeTab === "equipment" ? "app__view-toggle-btn--active" : ""}`}
            aria-pressed={activeTab === "equipment"}
            onClick={() => {
              setActiveTab("equipment");
              setSelectedUris(new Set());
            }}
          >
            Equipment
          </button>
          <button
            className={`app__view-toggle-btn ${activeTab === "bschema" ? "app__view-toggle-btn--active" : ""}`}
            aria-pressed={activeTab === "bschema"}
            onClick={() => {
              setActiveTab("bschema");
              setSelectedUris(new Set());
            }}
          >
            BSchema
          </button>
        </div>
          {activeTab === "equipment" && (
            <Breadcrumb path={path} onNavigate={handleBreadcrumbNavigate} />
          )}
          {activeTab === "bschema" && (
            <Breadcrumb path={bschemaPath} onNavigate={handleBschemaBreadcrumbNavigate} />
          )}
          {/* Sensors & Controls has nothing to show for a Brick-schema model: a Brick Point is
              folded straight into its equipment's properties (see brickModelBuilder.ts), not left
              as a separate Sensor/Actuator/Function node this overlay could surface. */}
          {!(activeTab === "equipment" && schemaMode === "brick") && (
            <div className="app__view-toggle">
              <button
                className={`app__view-toggle-btn ${showPoints ? "app__view-toggle-btn--active" : ""}`}
                aria-pressed={showPoints}
                onClick={() => setShowPoints((v) => !v)}
              >
                Sensors &amp; Controls
              </button>
            </div>
          )}
          {!(activeTab === "equipment" && schemaMode === "brick") && showPoints && (
            <label className="app__sub-toggle">
              <input
                type="checkbox"
                checked={showSensorsActuators}
                onChange={(e) => setShowSensorsActuators(e.target.checked)}
              />
              Sensors &amp; Actuators
            </label>
          )}
          {!(activeTab === "equipment" && schemaMode === "brick") && showPoints && (
            <label className="app__sub-toggle">
              <input type="checkbox" checked={showFunctions} onChange={(e) => setShowFunctions(e.target.checked)} />
              Functions
            </label>
          )}
          {!(activeTab === "equipment" && schemaMode === "brick") && showPoints && (
            <label className="app__sub-toggle">
              <input
                type="checkbox"
                checked={showAllProperties}
                onChange={(e) => setShowAllProperties(e.target.checked)}
              />
              All Properties
            </label>
          )}
          <div className="app__header-right">
            {activeTab === "equipment" && (
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
                {/* Independent of the file picker above: which relations the currently-loaded .ttl
                    is interpreted with. A bundled example / Load .ttl pick sets this to match
                    automatically, but it stays a plain, overridable select. */}
                <select
                  className="app__bundled-select"
                  value={schemaMode}
                  onChange={(e) => setSchemaMode(e.target.value as SchemaMode)}
                  title="Schema"
                >
                  <option value="s223">223P schema</option>
                  <option value="brick">Brick schema</option>
                </select>
              </div>
            )}
            {activeTab === "bschema" && (
              <span className="app__file-name app__file-name--info">
                b59, threshold-30 — hover a box for its properties &amp; real members; click a member to jump to it in Equipment view
              </span>
            )}
            {selectedUris.size > 0 && (
              <button className="app__view-toggle-btn" onClick={handleClearSelection}>
                Clear box selection ({selectedUris.size})
              </button>
            )}
            <button
              className={`app__view-toggle-btn app__sidebar-toggle ${sidebarOpen ? "app__view-toggle-btn--active" : ""}`}
              aria-pressed={sidebarOpen}
              onClick={() => setSidebarOpen((v) => !v)}
              title="Click a box to narrow the dropdowns below to it; shift-click to select more than one"
            >
              Query selection{clipboard.length > 0 ? ` (${clipboard.length})` : ""}
            </button>
          </div>
      </header>
      <div className="app__body">
        <div className="app__canvas">
        <ReactFlowProvider>
          {activeTab === "equipment" && (
            <FlowCanvas
              nodes={equipmentFlow.nodes}
              edges={equipmentFlow.edges}
              nodeTypes={EQUIPMENT_NODE_TYPES}
              edgeTypes={EQUIPMENT_EDGE_TYPES}
              viewKey={`${fileName}::${schemaMode}::${containerUri ?? "__root__"}::${showPoints}::${showFunctions}::${showSensorsActuators}::${showAllProperties}`}
              focusNodeId={highlightUri ?? undefined}
              onNodeDoubleClick={handleNodeDoubleClick}
              onNodeClick={handleNodeClick}
              onPaneClick={handleClearSelection}
            />
          )}
          {activeTab === "bschema" && (
            <FlowCanvas
              nodes={bschemaFlow.nodes}
              edges={bschemaFlow.edges}
              nodeTypes={EQUIPMENT_NODE_TYPES}
              edgeTypes={EQUIPMENT_EDGE_TYPES}
               viewKey={`bschema::${bschemaContainerUri ?? "__root__"}::${showPoints}::${showFunctions}::${showSensorsActuators}::${showAllProperties}`}
              onNodeDoubleClick={handleBschemaNodeDoubleClick}
              onNodeClick={handleNodeClick}
              onPaneClick={handleClearSelection}
            />
          )}
        </ReactFlowProvider>
        </div>
        {sidebarOpen && (
          <InViewSidebar
            scope={activeTab === "equipment" ? equipmentScope : bschemaScope}
            clipboard={clipboard}
            onAdd={handleAddToClipboard}
            onRemove={handleRemoveFromClipboard}
            onClear={handleClearClipboard}
            onClose={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
