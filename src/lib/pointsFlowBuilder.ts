import type { Edge, Node } from "@xyflow/react";
import type { InstrumentationRelation, ModelNode, S223Model } from "../types/s223";
import { toFlowProperty, type FlowProperty } from "./flowBuilder";

export type PointsRelation = InstrumentationRelation | "hasProperty";

export interface PointsFlowNodeData extends Record<string, unknown> {
  kind: "point" | "property" | "reference";
  label: string;
  typeName?: string;
  // property-only
  value?: string;
  unitSymbol?: string;
  quantityKind?: string;
  enumerationKind?: string;
  mapsTo?: string[];
  // point-only: properties this point itself owns via hasProperty (rare, but same as EquipmentNode)
  ownProperties?: FlowProperty[];
  // reference-only: where to land in the Equipment view (the referenced node's parent, so the
  // node itself is visible as a box there) — undefined means it's a root, so land at "Root".
  jumpToContainerUri?: string;
  /** the real S223Model uri this reference node stands in for */
  referencedUri?: string;
}

export interface PointsFlowEdgeData extends Record<string, unknown> {
  relation: PointsRelation;
}

const referenceNodeId = (uri: string) => `points-ref::${uri}`;

/**
 * Flat, single-level view (no drill-down) of the "instrumentation layer": every node that has at
 * least one InstrumentationLink (Sensors, Actuators, Functions, Thermostats/Controllers — defined
 * structurally by having such a link, not by matching type-name substrings) becomes a first-class
 * point node; the Properties it observes/actuates/inputs/outputs become small pill nodes; and
 * whatever equipment/space those properties (or observation/physical locations, or executors)
 * resolve to becomes a muted reference node you can click to jump to in the Equipment view.
 */
export function buildPointsFlowElements(model: S223Model): {
  nodes: Node<PointsFlowNodeData>[];
  edges: Edge<PointsFlowEdgeData>[];
} {
  const nodes: Node<PointsFlowNodeData>[] = [];
  const edges: Edge<PointsFlowEdgeData>[] = [];
  const addedProperties = new Set<string>();
  const addedReferences = new Set<string>();

  const propertyOwner = new Map<string, string>();
  for (const n of model.nodes.values()) {
    for (const propUri of n.properties) propertyOwner.set(propUri, n.uri);
  }

  function ensureReference(uri: string): string | undefined {
    const target = model.nodes.get(uri);
    if (!target) return undefined;
    const id = referenceNodeId(uri);
    if (!addedReferences.has(uri)) {
      addedReferences.add(uri);
      nodes.push({
        id,
        type: "referenceNode",
        position: { x: 0, y: 0 },
        data: {
          kind: "reference",
          label: target.label,
          typeName: target.typeName,
          jumpToContainerUri: target.parentUri,
          referencedUri: target.uri,
        },
      });
    }
    return id;
  }

  function ensurePropertyPill(propUri: string): string | undefined {
    const prop = model.properties.get(propUri);
    if (!prop) return undefined;
    if (!addedProperties.has(propUri)) {
      addedProperties.add(propUri);
      nodes.push({
        id: propUri,
        type: "propertyPill",
        position: { x: 0, y: 0 },
        data: {
          kind: "property",
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
      const refId = ownerUri ? ensureReference(ownerUri) : undefined;
      if (refId) {
        edges.push({
          id: `hasProperty::${propUri}::${ownerUri}`,
          source: propUri,
          target: refId,
          type: "instrumentationEdge",
          data: { relation: "hasProperty" },
        });
      }
    }
    return propUri;
  }

  function ensurePointNode(n: ModelNode) {
    nodes.push({
      id: n.uri,
      type: "pointNode",
      position: { x: 0, y: 0 },
      data: {
        kind: "point",
        label: n.label,
        typeName: n.typeName,
        ownProperties: n.properties.map((pUri) => toFlowProperty(model, pUri)).filter((p): p is FlowProperty => Boolean(p)),
      },
    });
  }

  for (const n of model.nodes.values()) {
    if (n.instrumentationLinks.length === 0) continue;
    ensurePointNode(n);

    for (const link of n.instrumentationLinks) {
      if (
        link.relation === "observes" ||
        link.relation === "actuatedByProperty" ||
        link.relation === "hasInput" ||
        link.relation === "hasOutput"
      ) {
        const propId = ensurePropertyPill(link.targetUri);
        if (!propId) continue;
        edges.push({
          id: `${n.uri}::${link.relation}::${propId}`,
          source: n.uri,
          target: propId,
          type: "instrumentationEdge",
          data: { relation: link.relation },
        });
        continue;
      }

      if (link.relation === "hasObservationLocation" || link.relation === "hasPhysicalLocation") {
        let targetContainerUri: string | undefined;
        if (model.nodes.has(link.targetUri)) {
          targetContainerUri = link.targetUri; // points straight at a Space/Zone
        } else {
          targetContainerUri = model.connectionPoints.get(link.targetUri)?.ownerUri;
        }
        const refId = targetContainerUri ? ensureReference(targetContainerUri) : undefined;
        if (!refId) continue;
        edges.push({
          id: `${n.uri}::${link.relation}::${refId}`,
          source: n.uri,
          target: refId,
          type: "instrumentationEdge",
          data: { relation: link.relation },
        });
        continue;
      }

      if (link.relation === "executedBy") {
        const refId = ensureReference(link.targetUri);
        if (!refId) continue;
        edges.push({
          id: `${n.uri}::executedBy::${refId}`,
          source: n.uri,
          target: refId,
          type: "instrumentationEdge",
          data: { relation: "executedBy" },
        });
      }
    }
  }

  return { nodes, edges };
}
