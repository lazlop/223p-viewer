import type { Edge, Node } from "@xyflow/react";
import type { InstrumentationLink, InstrumentationRelation, ModelNode, S223Model } from "../types/s223";
import { isVisiblePoint, type FlowInstrumentationItem } from "./flowBuilder";
import { nearestVisibleAncestor } from "./hierarchy";

export type PointsRelation = InstrumentationRelation | "hasProperty";

export const RELATION_LABELS: Record<PointsRelation, string> = {
  observes: "observes",
  actuatedByProperty: "actuates",
  hasInput: "input",
  hasOutput: "output",
  hasObservationLocation: "location",
  hasPhysicalLocation: "location",
  actuates: "actuates",
  executedBy: "executed by",
  hasProperty: "hasProperty",
};

export interface PointsFlowEdgeData extends Record<string, unknown> {
  relation: PointsRelation;
  /** true when the edge's target got walked up to a visible ancestor because the true owner is
   * nested inside a container collapsed at this drill level (mirrors hierarchy.ts's projectEdges
   * for physical connections). */
  rolledUp: boolean;
}

export interface PropertyPillNodeData extends Record<string, unknown> {
  label: string;
  typeName?: string;
  value?: string;
  unitSymbol?: string;
  quantityKind?: string;
  enumerationKind?: string;
  mapsTo: string[];
}

const propertyPillId = (uri: string) => `points-prop::${uri}`;

function isPropertyRelation(relation: InstrumentationRelation): boolean {
  return relation === "observes" || relation === "actuatedByProperty" || relation === "hasInput" || relation === "hasOutput";
}

/**
 * Sensors & Controls overlay for the Equipment view: surfaces what a point is not already showing
 * as a first-class box — a small pill node for each Property it observes/actuates/inputs/outputs
 * (deduped, so two points sharing a property share the pill), wired point -> pill, and pill -> the
 * property's owning equipment box when that box is visible at this level (walking up to the
 * nearest visible ancestor, same as hierarchy.ts's projectEdges does for physical connections). A
 * location/executor/actuated-equipment link (hasObservationLocation, hasPhysicalLocation,
 * executedBy, actuates) targets a real container directly rather than a property, so it draws
 * straight to that box when visible.
 *
 * Which points get processed is NOT just "the ones already visible at this drill level" (tree
 * position) — it's every point in the whole model that counts (isVisiblePoint) AND is either
 * already a tree child here, or *attached* to something that's showing here, in one of two ways:
 *
 *   1. A location/executor/actuated-equipment link resolving to a container that's contained here.
 *   2. A property-relation link (observes/actuatedByProperty/hasInput/hasOutput) targeting a
 *      Property that already has a pill in this view — from another point's link, or from
 *      showAllProperties — regardless of whether that property has a declared owner at all.
 *
 * (2) runs as a second pass after (1) and showAllProperties have populated their pills, which is
 * what lets a Function connect to a property some other checkbox already surfaced even when the
 * Function itself has no owner-resolvable link of its own to hang a "contained here" test on —
 * hasInput/hasOutput properties commonly have no hasProperty owner declared anywhere, so requiring
 * one (as (1) does) left every Function an unreachable orphan. It's still one bounded pass, not a
 * fixed-point closure: a point pulled in only by (2) doesn't itself re-trigger a further round.
 *
 * Real 223P sensors/actuators/functions are frequently not physically nested inside the equipment
 * they instrument at all — they're linked purely functionally, and when the target property has no
 * declared owner (common in real data) modelBuilder.ts's resolveFunctionalParent can't nest them
 * anywhere, leaving them as unreachable orphans. Pulling them in by what they're attached to rather
 * than requiring tree position means a point instrumenting something locally-owned or -shown shows
 * up here even when it lives elsewhere in the tree, or nowhere reachable at all — this is exactly
 * what the old whole-model-flat view showed and the drill-down view had dropped. Those pulled-in
 * points are returned as `extraPointUris` so the caller can also render them as real equipment
 * boxes (see App.tsx), not just edges dangling from nothing.
 *
 * The single most common case a target edge can't resolve — a point linked to something on its OWN
 * immediate container — happens because that container is where you're currently drilled *into*,
 * so it's never itself rendered as a box at this level (same structural gap the plain Equipment
 * view already has: you can't see a container's own properties while inside it either). Property
 * links still get their pill node regardless (it only loses the pill -> owner edge); a location/
 * executor link with nowhere to land is returned in `summaries` for the point's own tooltip instead
 * of silently dropping it.
 *
 * `showAllProperties`, separately, pulls in a pill for every Property directly `hasProperty`-owned
 * by a box that's already visible at this level — including ones no Sensor/Actuator/Function
 * touches at all (e.g. a plain on/off status nobody instruments). This is unrelated to the points
 * loop above (it doesn't pull in any new equipment boxes, just pills for what's already shown), so
 * it always lands a direct, un-rolled-up edge straight to the owner.
 */
export function buildInstrumentationOverlay(
  model: S223Model,
  visibleUris: Set<string>,
  showFunctions: boolean,
  showSensorsActuators: boolean,
  showAllProperties: boolean,
): {
  nodes: Node<PropertyPillNodeData>[];
  edges: Edge<PointsFlowEdgeData>[];
  summaries: Map<string, FlowInstrumentationItem[]>;
  extraPointUris: Set<string>;
} {
  const propertyOwner = new Map<string, string>();
  for (const n of model.nodes.values()) {
    for (const propUri of n.properties) propertyOwner.set(propUri, n.uri);
  }

  const nodes: Node<PropertyPillNodeData>[] = [];
  const edges: Edge<PointsFlowEdgeData>[] = [];
  const summaries = new Map<string, FlowInstrumentationItem[]>();
  const extraPointUris = new Set<string>();
  const addedProperties = new Set<string>();

  function resolveLinkTarget(link: InstrumentationLink): string | undefined {
    if (isPropertyRelation(link.relation)) return propertyOwner.get(link.targetUri);
    if (link.relation === "hasObservationLocation" || link.relation === "hasPhysicalLocation") {
      return model.nodes.has(link.targetUri) ? link.targetUri : model.connectionPoints.get(link.targetUri)?.ownerUri;
    }
    return link.targetUri; // executedBy / actuates
  }

  function ensurePropertyPill(propUri: string): string | undefined {
    const prop = model.properties.get(propUri);
    if (!prop) return undefined;
    const id = propertyPillId(propUri);
    if (addedProperties.has(propUri)) return id;
    addedProperties.add(propUri);
    nodes.push({
      id,
      type: "propertyPill",
      position: { x: 0, y: 0 },
      data: {
        label: prop.label,
        typeName: prop.typeName,
        value: prop.value,
        unitSymbol: prop.unitSymbol,
        quantityKind: prop.quantityKind,
        enumerationKind: prop.enumerationKind,
        mapsTo: prop.mapsTo,
      },
    });
    const ownerUri = propertyOwner.get(propUri);
    const target = ownerUri ? nearestVisibleAncestor(model, ownerUri, visibleUris) : undefined;
    if (target) {
      edges.push({
        id: `instr-prop-owner::${propUri}::${target}`,
        source: id,
        target,
        type: "instrumentationEdge",
        data: { relation: "hasProperty", rolledUp: target !== ownerUri },
      });
    }
    return id;
  }

  function processPoint(n: ModelNode) {
    for (const link of n.instrumentationLinks) {
      if (isPropertyRelation(link.relation)) {
        const pillId = ensurePropertyPill(link.targetUri);
        if (!pillId) continue;
        edges.push({
          id: `instr-overlay::${n.uri}::${link.relation}::${link.targetUri}`,
          source: n.uri,
          target: pillId,
          type: "instrumentationEdge",
          data: { relation: link.relation, rolledUp: false },
        });
        continue;
      }

      const rawTargetUri = resolveLinkTarget(link);
      if (!rawTargetUri) continue;

      const target = nearestVisibleAncestor(model, rawTargetUri, visibleUris);
      if (target && target !== n.uri) {
        edges.push({
          id: `instr-overlay::${n.uri}::${link.relation}::${link.targetUri}`,
          source: n.uri,
          target,
          type: "instrumentationEdge",
          data: { relation: link.relation, rolledUp: target !== rawTargetUri },
        });
        continue;
      }

      const list = summaries.get(n.uri) ?? [];
      list.push({ relation: link.relation, targetLabel: model.nodes.get(rawTargetUri)?.label });
      summaries.set(n.uri, list);
    }
  }

  // showAllProperties runs first so pass 2 below already sees its pills.
  if (showAllProperties) {
    for (const uri of visibleUris) {
      const n = model.nodes.get(uri);
      if (!n) continue;
      for (const propUri of n.properties) ensurePropertyPill(propUri);
    }
  }

  const includedUris = new Set<string>();

  // Pass 1: local tree children, and points that reverse-attach via a location/executor/
  // actuated-equipment link resolving to something contained here.
  for (const n of model.nodes.values()) {
    if (!isVisiblePoint(n, showFunctions, showSensorsActuators)) continue;

    const isLocal = visibleUris.has(n.uri);
    if (!isLocal) {
      const attachesViaEquipment = n.instrumentationLinks.some((link) => {
        if (isPropertyRelation(link.relation)) return false; // handled in pass 2, once pills exist
        const t = resolveLinkTarget(link);
        return t !== undefined && visibleUris.has(t);
      });
      if (!attachesViaEquipment) continue;
      extraPointUris.add(n.uri);
    }

    includedUris.add(n.uri);
    processPoint(n);
  }

  // Pass 2: any remaining point whose property-relation link targets a Property that already has
  // a pill from pass 1 or showAllProperties — see the doc comment above.
  for (const n of model.nodes.values()) {
    if (includedUris.has(n.uri) || !isVisiblePoint(n, showFunctions, showSensorsActuators)) continue;
    const attachesViaProperty = n.instrumentationLinks.some(
      (link) => isPropertyRelation(link.relation) && addedProperties.has(link.targetUri),
    );
    if (!attachesViaProperty) continue;
    if (!visibleUris.has(n.uri)) extraPointUris.add(n.uri);
    processPoint(n);
  }

  return { nodes, edges, summaries, extraPointUris };
}
