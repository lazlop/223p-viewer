import { useMemo } from "react";
import type { Edge, Node } from "@xyflow/react";
import type { RdfGraph } from "../types/rdf";
import type { S223Model } from "../types/s223";
import { parseTtl } from "./ttlParser";
import { buildS223Model } from "./modelBuilder";
import { childrenOf, pathTo, rootNodes } from "./hierarchy";
import { buildFlowElements, type FlowEdgeData, type FlowMember, type FlowNodeData } from "./flowBuilder";
import {
  buildInstrumentationOverlay,
  type ConnectionJunctionNodeData,
  type PointsFlowEdgeData,
  type PropertyPillNodeData,
} from "./pointsFlowBuilder";
import { layoutGraph } from "./layout";
import { computeInViewScope, EMPTY_URI_SET } from "./viewScope";

// layoutGraph's node-height heuristic keys off connection-point count, which only equipmentNode
// data carries — propertyPill and connectionJunction nodes have neither, so this reads as 0 for
// them and they fall back to the base node height.
function cpCountOf(n: { data: unknown }): number {
  const cp = (n.data as Record<string, unknown>).connectionPoints;
  return Array.isArray(cp) ? cp.length : 0;
}

export interface EquipmentViewOptions {
  containerUri: string | null;
  showPoints: boolean;
  showFunctions: boolean;
  showSensorsActuators: boolean;
  showAllProperties: boolean;
  highlightUri?: string | null;
  /** Query-selection sidebar: click-selected box URIs. When non-empty, replaces the current view's
   * whole visible set as the dropdowns' backing set — narrowing them to just these boxes plus
   * whatever their own hover tooltip surfaces (connection points, properties, instrumentation)
   * instead of everything in view. See lib/viewScope.ts's collectBackingUris. */
  selectedUris?: Set<string>;
  /** Defaults to buildS223Model — pass buildBrickModel for a Brick source instead. Both share the
   * same `(graph) => S223Model` shape, so every downstream step (hierarchy, overlay, scope, flow)
   * works unmodified regardless of which one built the model. */
  buildModel?: (graph: RdfGraph) => S223Model;
}

/**
 * The Equipment-view pipeline (parse -> model -> containment slice -> instrumentation overlay ->
 * query-selection scope -> laid-out flow nodes/edges), factored out of App.tsx so an embedding
 * host (e.g. the anywidget bundle in src/widget/) can reuse it without re-deriving App's own
 * multi-tab state machine.
 */
export function useEquipmentView(source: string, opts: EquipmentViewOptions) {
  const { containerUri, showPoints, showFunctions, showSensorsActuators, showAllProperties, highlightUri, selectedUris, buildModel } = opts;

  const parsed = useMemo(() => parseTtl(source), [source]);
  const model = useMemo(() => (buildModel ?? buildS223Model)(parsed.graph), [parsed, buildModel]);

  const path = useMemo(() => (containerUri ? pathTo(model, containerUri) : []), [model, containerUri]);

  const visibleUris = useMemo(() => {
    const list = containerUri ? childrenOf(model, containerUri) : rootNodes(model);
    return new Set(list.map((n) => n.uri));
  }, [model, containerUri]);

  const overlay = useMemo(
    () => (showPoints ? buildInstrumentationOverlay(model, visibleUris, showFunctions, showSensorsActuators, showAllProperties) : null),
    [model, visibleUris, showPoints, showFunctions, showSensorsActuators, showAllProperties],
  );

  const scope = useMemo(() => {
    if (selectedUris && selectedUris.size > 0) return computeInViewScope(parsed.graph, model, selectedUris);
    return computeInViewScope(parsed.graph, model, visibleUris, overlay?.extraPointUris ?? EMPTY_URI_SET);
  }, [parsed, model, visibleUris, overlay, selectedUris]);

  // Layout is expensive (dagre, with several randomized crossing-minimization passes for dense
  // components — see lib/layout.ts) and depends only on which nodes/edges are visible, not on
  // per-node selection/highlight flags. Keeping it in its own memo means clicking/shift-clicking
  // boxes (which changes highlightUri/selectedUris on every click) doesn't re-run a full layout
  // pass — only the cheap flag-annotation step below reruns.
  const laidOut = useMemo(() => {
    let renderUris = visibleUris;
    if (overlay && overlay.extraPointUris.size > 0) {
      renderUris = new Set([...visibleUris, ...overlay.extraPointUris]);
    }

    const built = buildFlowElements(model, renderUris, showPoints, showFunctions, showSensorsActuators);
    // Annotated as one Node<union> (not a union of differently-typed Node<...> arrays, which is
    // what a `let` reassigned inside `if (overlay)` would infer) so layoutGraph's `Node<T>[]`
    // generic parameter unifies T against the whole union instead of collapsing to just one branch
    // — TS infers T from the first Node<...> variant it sees in a union-of-Nodes argument, silently
    // dropping the other node kinds from the result and breaking FlowCanvas's prop type downstream.
    const nodes: Node<FlowNodeData | PropertyPillNodeData | ConnectionJunctionNodeData>[] = overlay
      ? [
          ...built.nodes.map((n) => (overlay.summaries.has(n.id) ? { ...n, data: { ...n.data, instrumentation: overlay.summaries.get(n.id) } } : n)),
          ...overlay.nodes,
        ]
      : built.nodes;
    const edges: Edge<FlowEdgeData | PointsFlowEdgeData>[] = overlay
      ? [
          ...built.edges.filter((e) => !overlay.replacedConnectionEdgeIds.has(e.id)),
          ...overlay.edges,
          ...overlay.connectionSegmentEdges,
        ]
      : built.edges;
    return { nodes: layoutGraph(nodes, edges, cpCountOf), edges };
  }, [model, visibleUris, overlay, showPoints, showFunctions, showSensorsActuators]);

  // Cheap per-click step: stamp highlighted/selected flags onto the already-laid-out nodes. Only
  // touches the node objects whose flag actually changed, so unaffected nodes keep their prior
  // object identity and React Flow/React.memo can skip re-rendering them.
  const flow = useMemo(() => {
    if (!highlightUri && (!selectedUris || selectedUris.size === 0)) return laidOut;
    const nodes = laidOut.nodes.map((n) => {
      const withHighlight = highlightUri && n.id === highlightUri ? { ...n, data: { ...n.data, highlighted: true } } : n;
      return selectedUris?.has(n.id) ? { ...withHighlight, data: { ...withHighlight.data, selected: true } } : withHighlight;
    });
    return { nodes, edges: laidOut.edges };
  }, [laidOut, highlightUri, selectedUris]);

  return { parsed, model, path, visibleUris, overlay, scope, flow };
}

export type { FlowMember };
