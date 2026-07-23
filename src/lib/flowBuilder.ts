import type { Edge, Node } from "@xyflow/react";
import type { CPKind, S223Model } from "../types/s223";
import { projectEdges } from "./hierarchy";

export interface FlowCP {
  uri: string;
  label: string;
  kind: CPKind;
  medium?: string;
  mapsTo: string[];
}

export interface FlowProperty {
  label: string;
  value?: string;
  unitSymbol?: string;
  quantityKind?: string;
  enumerationKind?: string;
  mapsTo: string[];
}

export interface FlowNodeData extends Record<string, unknown> {
  label: string;
  typeName?: string;
  kind: "equipment" | "space";
  hasChildren: boolean;
  connectionPoints: FlowCP[];
  properties: FlowProperty[];
}

export interface FlowEdgeData extends Record<string, unknown> {
  hubLabel: string;
  medium?: string;
  properties: FlowProperty[];
  /** true when this arrow doesn't terminate at the real connection points — at least one end got
   * walked up to a visible ancestor because the true owner is nested inside a collapsed container. */
  rolledUp: boolean;
}

function toFlowCP(model: S223Model, cpUri: string): FlowCP | undefined {
  const cp = model.connectionPoints.get(cpUri);
  if (!cp) return undefined;
  return { uri: cp.uri, label: cp.label, kind: cp.kind, medium: cp.medium, mapsTo: cp.mapsTo };
}

export function toFlowProperty(model: S223Model, propUri: string): FlowProperty | undefined {
  const p = model.properties.get(propUri);
  if (!p) return undefined;
  return {
    label: p.label,
    value: p.value,
    unitSymbol: p.unitSymbol,
    quantityKind: p.quantityKind,
    enumerationKind: p.enumerationKind,
    mapsTo: p.mapsTo,
  };
}

/**
 * Builds React Flow nodes/edges for one "view": the given set of visible container-node URIs —
 * either the model roots, or one container's children when drilled in.
 */
export function buildFlowElements(
  model: S223Model,
  visibleUris: Set<string>,
): { nodes: Node<FlowNodeData>[]; edges: Edge<FlowEdgeData>[] } {
  const nodes: Node<FlowNodeData>[] = [];

  for (const uri of visibleUris) {
    const n = model.nodes.get(uri);
    if (!n) continue;
    const connectionPoints = n.connectionPoints.map((cpUri) => toFlowCP(model, cpUri)).filter((cp): cp is FlowCP => Boolean(cp));
    const properties = n.properties.map((pUri) => toFlowProperty(model, pUri)).filter((p): p is FlowProperty => Boolean(p));
    const kind: FlowNodeData["kind"] = connectionPoints.length > 0 ? "equipment" : "space";

    nodes.push({
      id: uri,
      type: "equipmentNode",
      position: { x: 0, y: 0 },
      data: { label: n.label, typeName: n.typeName, kind, hasChildren: n.children.length > 0, connectionPoints, properties },
    });
  }

  const edges: Edge<FlowEdgeData>[] = projectEdges(model, visibleUris).map((pe) => {
    const primary = pe.raw[0];
    const mediums = new Set(pe.raw.map((r) => r.medium).filter((m): m is string => Boolean(m)));
    const hubLabel = pe.raw.length > 1 ? `${pe.raw.length} connections` : primary.hubLabel || "connection";
    return {
      id: pe.id,
      source: pe.source,
      sourceHandle: pe.sourceHandle,
      target: pe.target,
      targetHandle: pe.targetHandle,
      type: "connectionEdge",
      data: {
        hubLabel,
        medium: mediums.size === 1 ? [...mediums][0] : undefined,
        properties: pe.rolledUp
          ? []
          : primary.properties.map((pUri) => toFlowProperty(model, pUri)).filter((p): p is FlowProperty => Boolean(p)),
        rolledUp: pe.rolledUp,
      },
    };
  });

  return { nodes, edges };
}
