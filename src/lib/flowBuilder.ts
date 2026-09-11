import type { Edge, Node } from "@xyflow/react";
import type { CPKind, InstrumentationRelation, ModelNode, S223Model } from "../types/s223";
import { projectEdges } from "./hierarchy";
import { hasCoreInstrumentation, isLogicalGroupNode } from "./modelBuilder";

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

export type PointKind = "sensor" | "actuator" | "function" | "controller";

// Presentation-only bucketing of an already-resolved RDF type (`typeName`, e.g.
// "TemperatureSensor", "Actuator", "Function", "Thermostat") into a handful of visual categories
// for color-coding — not structure/ownership inference, just the same kind of type-driven styling
// as "equipment" vs "space".
export function pointKindOf(typeName?: string): PointKind {
  if (typeName?.endsWith("Sensor")) return "sensor";
  if (typeName?.endsWith("Actuator")) return "actuator";
  if (typeName?.endsWith("Function")) return "function";
  return "controller";
}

/** Sensors & Controls toggle: whether `n` counts as a point at all — has core instrumentation of
 * its own, and its bucket's sub-toggle is on. Functions and Sensors/Actuators each get their own
 * on/off switch because real 223P models can declare a lot of them, and which bucket is noise vs.
 * signal depends on what you're looking for; Controllers (Thermostats and the like) always show,
 * there being no third checkbox for them. */
export function isVisiblePoint(n: ModelNode, showFunctions: boolean, showSensorsActuators: boolean): boolean {
  if (!hasCoreInstrumentation(n)) return false;
  const kind = pointKindOf(n.typeName);
  if (kind === "function") return showFunctions;
  if (kind === "sensor" || kind === "actuator") return showSensorsActuators;
  return true;
}

export interface FlowNodeData extends Record<string, unknown> {
  label: string;
  typeName?: string;
  kind: "equipment" | "space";
  hasChildren: boolean;
  connectionPoints: FlowCP[];
  properties: FlowProperty[];
  /** labels of purely-logical groups (Systems, Zones) this node is a member of */
  groupMemberships: string[];
  /** Sensors & Controls toggle only: this node has instrumentation links of its own (it's a
   * Sensor/Actuator/Function/Thermostat), bucketed for border color-coding. Unset when the toggle
   * is off. */
  pointKind?: PointKind;
  /** Sensors & Controls toggle only: true when this node has neither properties nor
   * instrumentation links of its own — pure structural scaffolding (an empty container, a
   * pass-through hub-ish node) — so it renders shrunk and greyed to keep property- and
   * instrumentation-bearing boxes easy to pick out while still showing where they sit in the
   * containment tree. Always false when the toggle is off. */
  muted: boolean;
  /** Sensors & Controls toggle only: this point's own location/executor/actuated-equipment links
   * (never property links — those always get a pill node) that couldn't be drawn as an edge
   * because the container they're about isn't visible at this drill level — most commonly it's
   * the point's own immediate container, which is never itself rendered while you're drilled into
   * it. See pointsFlowBuilder.ts's buildInstrumentationOverlay. */
  instrumentation?: FlowInstrumentationItem[];
  /** BSchema view only: real building instances this bschema class summarizes (from the paired
   * bschema-members graph). See App.tsx's bschemaFlow and bschemaMembers.ts. */
  members?: FlowMember[];
  /** BSchema view only: click a navigable member to jump to it in Equipment view. */
  onMemberClick?: (uri: string) => void;
  /** Equipment view only: this is the box a BSchema member click just jumped to. */
  highlighted?: boolean;
  /** Query-selection sidebar: this box is click-selected, narrowing the dropdowns below to it (and
   * whatever its own hover tooltip surfaces) instead of everything in the current view. */
  selected?: boolean;
}

export interface FlowInstrumentationItem {
  relation: InstrumentationRelation;
  targetLabel?: string;
}

export interface FlowMember {
  uri: string;
  label: string;
  /** false when the member doesn't resolve to anything in the paired building model (e.g. an
   * ExternalReference) — rendered as inert text instead of a clickable link. */
  navigable: boolean;
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
  showInstrumentation = false,
  showFunctions = false,
  showSensorsActuators = true,
): { nodes: Node<FlowNodeData>[]; edges: Edge<FlowEdgeData>[] } {
  // Sensors/Actuators/Functions/Controllers are the Sensors & Controls overlay's content, not
  // plain Equipment's — with the toggle off, drop them (and route any edges around them) even
  // when they're genuine s223:contains/encloses tree children, so e.g. a FlowSensor physically
  // inside a VAV box only appears once the toggle surfaces it as a point, not as a bare box with
  // no connection points every time you drill into its container.
  const renderUris = showInstrumentation
    ? visibleUris
    : new Set([...visibleUris].filter((uri) => {
        const n = model.nodes.get(uri);
        return !n || !hasCoreInstrumentation(n);
      }));

  const nodes: Node<FlowNodeData>[] = [];

  for (const uri of renderUris) {
    const n = model.nodes.get(uri);
    if (!n || isLogicalGroupNode(n)) continue;
    const connectionPoints = n.connectionPoints.map((cpUri) => toFlowCP(model, cpUri)).filter((cp): cp is FlowCP => Boolean(cp));
    const properties = n.properties.map((pUri) => toFlowProperty(model, pUri)).filter((p): p is FlowProperty => Boolean(p));
    const groupMemberships = n.groupMemberships.map((groupUri) => model.nodes.get(groupUri)?.label).filter((l): l is string => Boolean(l));
    const kind: FlowNodeData["kind"] = connectionPoints.length > 0 ? "equipment" : "space";
    const isPoint = isVisiblePoint(n, showFunctions, showSensorsActuators);

    nodes.push({
      id: uri,
      type: "equipmentNode",
      position: { x: 0, y: 0 },
      data: {
        label: n.label,
        typeName: n.typeName,
        kind,
        hasChildren: n.children.length > 0,
        connectionPoints,
        properties,
        groupMemberships,
        pointKind: showInstrumentation && isPoint ? pointKindOf(n.typeName) : undefined,
        muted: showInstrumentation && properties.length === 0 && !isPoint,
      },
    });
  }

  const edges: Edge<FlowEdgeData>[] = projectEdges(model, renderUris).map((pe) => {
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
