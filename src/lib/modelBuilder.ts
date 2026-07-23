import type { RdfGraph, RdfNode } from "../types/rdf";
import type { ChildRelation, CPKind, ConnectionPointRef, ModelNode, PropertyRef, S223Model } from "../types/s223";
import { P, T, localName } from "./namespaces";
import { unitSymbol } from "./unitSymbols";

const CONNECTION_POINT_TYPES = new Set([T.InletConnectionPoint, T.OutletConnectionPoint, T.BidirectionalConnectionPoint]);
const HUB_TYPES = new Set([T.Connection, T.Conductor]);

function hasAnyType(node: RdfNode, types: Set<string>): boolean {
  return node.types.some((t) => types.has(t));
}

function isConnectionPointType(typeUri: string): boolean {
  return CONNECTION_POINT_TYPES.has(typeUri) || localName(typeUri).endsWith("ConnectionPoint");
}

function isPropertyType(typeUri: string): boolean {
  return localName(typeUri).endsWith("Property");
}

function cpKindOf(node: RdfNode): CPKind {
  if (node.types.includes(T.InletConnectionPoint)) return "Inlet";
  if (node.types.includes(T.OutletConnectionPoint)) return "Outlet";
  if (node.types.includes(T.BidirectionalConnectionPoint)) return "Bidirectional";
  return "Other";
}

function labelOf(graph: RdfGraph, uri: string): string {
  return graph.nodes.get(uri)?.label ?? localName(uri);
}

function buildConnectionPoint(node: RdfNode): ConnectionPointRef {
  const mediumProp = node.properties.find((p) => p.predicate === P.hasMedium && !p.isLiteral);
  const mapsTo = node.properties.filter((p) => p.predicate === P.mapsTo && !p.isLiteral).map((p) => p.object);
  return {
    uri: node.uri,
    label: node.label,
    kind: cpKindOf(node),
    medium: mediumProp ? localName(mediumProp.object) : undefined,
    ownerUri: undefined,
    mapsTo,
  };
}

function buildProperty(node: RdfNode): PropertyRef {
  const valueProp = node.properties.find((p) => p.predicate === P.hasValue && p.isLiteral);
  const qkProp = node.properties.find((p) => p.predicate === P.hasQuantityKind && !p.isLiteral);
  const unitProp = node.properties.find((p) => p.predicate === P.hasUnit && !p.isLiteral);
  const enumProp = node.properties.find((p) => p.predicate === P.hasEnumerationKind && !p.isLiteral);
  const mapsTo = node.properties.filter((p) => p.predicate === P.mapsTo && !p.isLiteral).map((p) => p.object);
  const unitLocal = unitProp ? localName(unitProp.object) : undefined;

  return {
    uri: node.uri,
    label: node.label,
    typeName: node.types[0] ? localName(node.types[0]) : undefined,
    value: valueProp?.object,
    quantityKind: qkProp ? localName(qkProp.object) : undefined,
    unit: unitLocal,
    unitSymbol: unitLocal ? unitSymbol(unitLocal) : undefined,
    enumerationKind: enumProp ? localName(enumProp.object) : undefined,
    mapsTo,
  };
}

/**
 * Walks a parsed RdfGraph and produces a 223P-aware domain model: equipment/space/system
 * "container" nodes with resolved connection points, properties, and structural children,
 * plus a roots list (container nodes never referenced as another container's child).
 */
export function buildS223Model(graph: RdfGraph): S223Model {
  const connectionPoints = new Map<string, ConnectionPointRef>();
  const properties = new Map<string, PropertyRef>();
  const nodes = new Map<string, ModelNode>();

  for (const node of graph.nodes.values()) {
    if (node.types.length === 0) continue; // untyped nodes are blank-node scaffolding, not renderable
    if (hasAnyType(node, CONNECTION_POINT_TYPES) || node.types.some(isConnectionPointType)) {
      connectionPoints.set(node.uri, buildConnectionPoint(node));
      continue;
    }
    if (node.types.some(isPropertyType)) {
      properties.set(node.uri, buildProperty(node));
      continue;
    }
    // Everything else with an s223 (or other) type is a "container" node: equipment, hub
    // (Connection/Conductor), System, PhysicalSpace, DomainSpace, etc. Hubs are absorbed into
    // ConnectionEdges by connectionTopology.ts rather than rendered as their own boxes, but we
    // still index them here since they carry hasProperty/label info referenced by edges.
    nodes.set(node.uri, {
      uri: node.uri,
      label: node.label,
      typeUri: node.types[0],
      typeName: node.types[0] ? localName(node.types[0]) : undefined,
      connectionPoints: [],
      properties: [],
      children: [],
    });
  }

  // Ownership + children + property attachment
  const childEdgePredicates: Record<string, ChildRelation> = {
    [P.contains]: "contains",
    [P.hasMember]: "hasMember",
    [P.encloses]: "encloses",
  };
  const referencedAsChild = new Set<string>();

  for (const edge of graph.edges) {
    if (edge.predicate === P.hasConnectionPoint || edge.predicate === P.hasBoundaryConnectionPoint) {
      const cp = connectionPoints.get(edge.target);
      const owner = nodes.get(edge.source);
      if (cp && owner) {
        cp.ownerUri = owner.uri;
        owner.connectionPoints.push(cp.uri);
      }
      continue;
    }
    if (edge.predicate === P.hasProperty) {
      const prop = properties.get(edge.target);
      const owner = nodes.get(edge.source);
      if (prop && owner) owner.properties.push(prop.uri);
      continue;
    }
    const via = childEdgePredicates[edge.predicate];
    if (via) {
      const parent = nodes.get(edge.source);
      const child = nodes.get(edge.target);
      if (parent && child) {
        parent.children.push({ uri: child.uri, via });
        child.parentUri = parent.uri;
        referencedAsChild.add(child.uri);
      }
    }
  }

  // Real 223P data (verified against nist-bdg1-1.ttl) isn't fully consistent about
  // hasConnectionPoint: ~1/6 of equipment nodes there instead declare their own port with
  // `s223:cnx` (or connectsThrough) straight from the equipment to a ConnectionPoint, skipping
  // hasConnectionPoint entirely (e.g. `VAVBox1 s223:cnx VAVBox1Outlet`). Treat that as ownership
  // too, but only as a fallback (hasConnectionPoint wins if a CP already has an owner) and only
  // when the source is a genuine equipment/space/system node, not a Connection/Conductor hub —
  // hub->CP cnx edges are real topology links, not ownership, and are handled by
  // connectionTopology.ts instead.
  for (const edge of graph.edges) {
    if (edge.predicate !== P.cnx && edge.predicate !== P.connectsThrough) continue;
    const owner = nodes.get(edge.source);
    const cp = connectionPoints.get(edge.target);
    if (!owner || !cp || cp.ownerUri || HUB_TYPES.has(owner.typeUri ?? "")) continue;
    cp.ownerUri = owner.uri;
    owner.connectionPoints.push(cp.uri);
  }

  const roots = [...nodes.values()]
    .filter((n) => !referencedAsChild.has(n.uri) && !HUB_TYPES.has(n.typeUri ?? ""))
    .map((n) => n.uri);

  return { nodes, connectionPoints, properties, edges: [], roots };
}

export { labelOf };
