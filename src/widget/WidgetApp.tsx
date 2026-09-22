import { useCallback, useMemo, useState, type MouseEvent as ReactMouseEvent } from "react";
import { ReactFlowProvider, type EdgeTypes, type NodeTypes } from "@xyflow/react";
import { buildBrickModel } from "../lib/brickModelBuilder";
import { useEquipmentView } from "../lib/useEquipmentView";
import { computeOneHopTriples, type ClipboardItem, type ScopeEntity } from "../lib/viewScope";
import { FlowCanvas } from "../components/FlowCanvas";
import { InViewSidebar } from "../components/InViewSidebar";
import { TripleQuerySidebar } from "../components/TripleQuerySidebar";
import { Breadcrumb } from "../components/Breadcrumb";
import { EquipmentNode } from "../components/nodes/EquipmentNode";
import { PropertyPillNode } from "../components/nodes/PropertyPillNode";
import { ConnectionJunctionNode } from "../components/nodes/ConnectionJunctionNode";
import { ConnectionEdge } from "../components/edges/ConnectionEdge";
import { InstrumentationEdge } from "../components/edges/InstrumentationEdge";
import type { AnyModel, WidgetModelState } from "./anywidgetModel";
import { useModelState } from "./useModelState";

const NODE_TYPES: NodeTypes = {
  equipmentNode: EquipmentNode,
  propertyPill: PropertyPillNode,
  connectionJunction: ConnectionJunctionNode,
};
const EDGE_TYPES: EdgeTypes = { connectionEdge: ConnectionEdge, instrumentationEdge: InstrumentationEdge };

/**
 * The anywidget-hosted counterpart of App.tsx's Equipment tab: same rendering pipeline
 * (lib/useEquipmentView.ts), but driven by an anywidget model instead of App's own file-picker
 * state, and with the clipboard synced back to Python (traitlet `clipboard`) instead of just
 * sitting in local React state — that's the entire reason this bundle exists (see
 * python/s223_viewer_widget for the Python side).
 *
 * The query-selection sidebar itself differs by `kind`: Brick mode reuses App.tsx's own
 * instance/class/predicate/literal InViewSidebar, but 223P mode swaps in TripleQuerySidebar — pick
 * predicates to traverse (hasUnit, hasAspect, type, contains, ...), then pick an instance to pull
 * every triple where it's the subject or object on one of those predicates. That's a deliberately
 * widget-only, 223P-only change: it's aimed at feeding a descriptive SPARQL query in another repo,
 * which the plain reference-list clipboard doesn't carry enough structure for.
 */
export function WidgetApp({ model }: { model: AnyModel<WidgetModelState> }) {
  const [source] = useModelState<string>(model, "source");
  const [kind, setKind] = useModelState<WidgetModelState["kind"]>(model, "kind");
  const [clipboardRaw, setClipboardRaw] = useModelState<WidgetModelState["clipboard"]>(model, "clipboard");
  const [height] = useModelState<string>(model, "height");
  // ClipboardItem is a plain JSON-shaped object, so this cast is just narrowing what the model
  // (typed loosely as Record<string, unknown>[] so it round-trips through traitlets.List/Dict
  // cleanly) hands back.
  const clipboard = clipboardRaw as unknown as ClipboardItem[];

  const [containerUri, setContainerUri] = useState<string | null>(null);
  const [showPoints, setShowPoints] = useState(false);
  const [showFunctions, setShowFunctions] = useState(false);
  const [showSensorsActuators, setShowSensorsActuators] = useState(true);
  const [showAllProperties, setShowAllProperties] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // See App.tsx's identical selectedUris/handleNodeClick — click a box (shift-click for several)
  // to narrow the pickers below to just it, instead of everything in the current view. Typed on
  // just `{ id }` (not `Node<FlowNodeData>`) so it doesn't pin FlowCanvas's generic TNodeData away
  // from the mixed equipment/pill/junction node union the Sensors & Controls overlay produces.
  const [selectedUris, setSelectedUris] = useState<Set<string>>(new Set());
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

  const buildModel = useMemo(() => (kind === "brick" ? buildBrickModel : undefined), [kind]);

  const { model: viewModel, path, scope, flow, parsed } = useEquipmentView(source, {
    containerUri,
    showPoints,
    showFunctions,
    showSensorsActuators,
    showAllProperties,
    selectedUris,
    buildModel,
  });

  const handleNodeDoubleClick = useCallback(
    (nodeId: string) => {
      const node = viewModel.nodes.get(nodeId);
      if (node && node.children.length > 0) setContainerUri(nodeId);
      setSelectedUris(new Set());
    },
    [viewModel],
  );

  const handleBreadcrumbNavigate = useCallback((uri: string | null) => {
    setContainerUri(uri);
    setSelectedUris(new Set());
  }, []);

  const handleAddToClipboard = useCallback(
    (item: ClipboardItem) => {
      if (clipboard.some((p) => p.key === item.key)) return;
      setClipboardRaw([...clipboardRaw, item as unknown as Record<string, unknown>]);
    },
    [clipboard, clipboardRaw, setClipboardRaw],
  );
  const handleRemoveFromClipboard = useCallback(
    (key: string) => setClipboardRaw(clipboardRaw.filter((p) => (p as unknown as ClipboardItem).key !== key)),
    [clipboardRaw, setClipboardRaw],
  );
  const handleClearClipboard = useCallback(() => setClipboardRaw([]), [setClipboardRaw]);

  // 223P mode only (see this file's header comment): picking an instance pulls its one-hop graph
  // — every triple where it's the subject or object — restricted to whichever predicates are
  // currently in the clipboard as `kind: "predicate"` filter entries, and appends the new ones.
  const handlePickInstanceForQuery = useCallback(
    (entity: ScopeEntity) => {
      const predicateUris = new Set(clipboard.filter((item) => item.kind === "predicate" && item.uri).map((item) => item.uri!));
      const triples = computeOneHopTriples(parsed.graph, entity.uri, entity.label, predicateUris);
      const existingKeys = new Set(clipboard.map((item) => item.key));
      const additions = triples.filter((t) => !existingKeys.has(t.key));
      if (additions.length === 0) return;
      setClipboardRaw([...clipboardRaw, ...(additions as unknown as Record<string, unknown>[])]);
    },
    [clipboard, clipboardRaw, parsed, setClipboardRaw],
  );

  return (
    <div className="app s223-widget" style={{ height: height || "600px" }}>
      <header className="app__header">
        <div className="app__title">223P Model Viewer</div>
        <Breadcrumb path={path} onNavigate={handleBreadcrumbNavigate} />
        {/* Overrides the Python-set `kind` trait (round-trips back via useModelState, same as
            clipboard) — lets you flip a source between builders from the widget itself instead of
            re-running the notebook cell with a different `kind=` argument. Mirrors App.tsx's
            identical "223P schema / Brick schema" select. */}
        <select
          className="app__bundled-select"
          value={kind}
          onChange={(e) => setKind(e.target.value as WidgetModelState["kind"])}
          title="Schema"
        >
          <option value="s223">223P schema</option>
          <option value="brick">Brick schema</option>
        </select>
        {kind !== "brick" && (
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
        {kind !== "brick" && showPoints && (
          <label className="app__sub-toggle">
            <input type="checkbox" checked={showSensorsActuators} onChange={(e) => setShowSensorsActuators(e.target.checked)} />
            Sensors &amp; Actuators
          </label>
        )}
        {kind !== "brick" && showPoints && (
          <label className="app__sub-toggle">
            <input type="checkbox" checked={showFunctions} onChange={(e) => setShowFunctions(e.target.checked)} />
            Functions
          </label>
        )}
        {kind !== "brick" && showPoints && (
          <label className="app__sub-toggle">
            <input type="checkbox" checked={showAllProperties} onChange={(e) => setShowAllProperties(e.target.checked)} />
            All Properties
          </label>
        )}
        <div className="app__header-right">
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
            <FlowCanvas
              nodes={flow.nodes}
              edges={flow.edges}
              nodeTypes={NODE_TYPES}
              edgeTypes={EDGE_TYPES}
              viewKey={`${containerUri ?? "__root__"}::${showPoints}::${showFunctions}::${showSensorsActuators}::${showAllProperties}`}
              onNodeDoubleClick={handleNodeDoubleClick}
              onNodeClick={handleNodeClick}
              onPaneClick={handleClearSelection}
            />
          </ReactFlowProvider>
        </div>
        {sidebarOpen && kind === "brick" && (
          <InViewSidebar
            scope={scope}
            clipboard={clipboard}
            onAdd={handleAddToClipboard}
            onRemove={handleRemoveFromClipboard}
            onClear={handleClearClipboard}
            onClose={() => setSidebarOpen(false)}
          />
        )}
        {sidebarOpen && kind !== "brick" && (
          <TripleQuerySidebar
            scope={scope}
            clipboard={clipboard}
            onAddPredicateFilter={handleAddToClipboard}
            onPickInstance={handlePickInstanceForQuery}
            onRemove={handleRemoveFromClipboard}
            onClear={handleClearClipboard}
            onClose={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
