import type { RdfGraph, RdfNode } from "../types/rdf";
import type { ChildRelation, CPKind, ConnectionPointRef, InstrumentationRelation, ModelNode, PropertyRef, S223Model } from "../types/s223";
import { collapseConnections } from "./connectionTopology";
import { P, T, localName } from "./namespaces";
import { unitSymbol } from "./unitSymbols";

const CONNECTION_POINT_TYPES = new Set([T.InletConnectionPoint, T.OutletConnectionPoint, T.BidirectionalConnectionPoint]);
const HUB_TYPES = new Set([T.Connection, T.Conductor, T.Duct, T.Pipe]);
const OWL_ONTOLOGY = "http://www.w3.org/2002/07/owl#Ontology";

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
    ownerUris: [],
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
 * "container" nodes with resolved connection points, properties, structural children, and the
 * collapsed connection topology, plus a roots list (container nodes never referenced as another
 * container's child).
 */
export function buildS223Model(graph: RdfGraph): S223Model {
  const connectionPoints = new Map<string, ConnectionPointRef>();
  const properties = new Map<string, PropertyRef>();
  const nodes = new Map<string, ModelNode>();

  for (const node of graph.nodes.values()) {
    if (node.types.length === 0) continue; // untyped nodes are blank-node scaffolding, not renderable
    if (node.types.includes(OWL_ONTOLOGY)) continue; // the file's own owl:Ontology self-declaration, not model content
    if (hasAnyType(node, CONNECTION_POINT_TYPES) || node.types.some(isConnectionPointType)) {
      connectionPoints.set(node.uri, buildConnectionPoint(node));
      continue;
    }
    if (node.types.some(isPropertyType) || localName(node.types[0] ?? "").includes("ExternalReference")) {
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
      instrumentationLinks: [],
      groupMemberships: [],
    });
  }

  const referencedAsChild = new Set<string>();
  const propertyOwner = new Map<string, string>(); // property uri -> the equipment/space that hasProperty's it

  // Pass 1: connection-point ownership only. Resolved first (and fully) so System-membership
  // handling later already knows whether a given System has an explicit boundary port.
  // Three predicates declare ownership: hasConnectionPoint/hasBoundaryConnectionPoint (equipment
  // -> CP, the common case) and hasOptionalConnectionPoint (same direction, just marks the port as
  // optional — ownership-wise identical). A few real 223P models instead declare it in reverse,
  // CP -> equipment, via isConnectionPointOf. Some data (e.g. bschema-rs's generated class graphs)
  // redundantly asserts both directions for the same pair, and can legitimately claim a single CP
  // from several different owners at once (see ConnectionPointRef.ownerUris) — every distinct
  // claim is recorded in cp.ownerUris, deduped, while `cp.ownerUri` and owner.connectionPoints
  // still only take the first claim (guarded by `!cp.ownerUri`), so containment/hover/kind
  // rendering is unaffected and only connectionTopology.ts's edge pairing sees the extra owners.
  for (const edge of graph.edges) {
    if (edge.predicate === P.hasConnectionPoint || edge.predicate === P.hasBoundaryConnectionPoint || edge.predicate === P.hasOptionalConnectionPoint) {
      const cp = connectionPoints.get(edge.target);
      const owner = nodes.get(edge.source);
      if (cp && owner) {
        if (!cp.ownerUris.includes(owner.uri)) cp.ownerUris.push(owner.uri);
        if (!cp.ownerUri) {
          cp.ownerUri = owner.uri;
          owner.connectionPoints.push(cp.uri);
        }
      }
      continue;
    }
    if (edge.predicate === P.isConnectionPointOf) {
      const cp = connectionPoints.get(edge.source);
      const owner = nodes.get(edge.target);
      if (cp && owner) {
        if (!cp.ownerUris.includes(owner.uri)) cp.ownerUris.push(owner.uri);
        if (!cp.ownerUri) {
          cp.ownerUri = owner.uri;
          owner.connectionPoints.push(cp.uri);
        }
      }
    }
  }

  const childEdgePredicates: Record<string, ChildRelation> = {
    [P.contains]: "contains",
    [P.encloses]: "encloses",
  };

  // Predicates that describe how a Sensor/Actuator/Function relates to a Property/location it
  // senses or drives — first-class data (S223Model.nodes[].instrumentationLinks) rather than a
  // throwaway scan, so both the hierarchy fallback below and the Sensors & Controls view can
  // consume the same source of truth instead of each re-deriving it from raw RDF.
  const instrumentationPredicates: Record<string, InstrumentationRelation> = {
    [P.observes]: "observes",
    [P.actuatedByProperty]: "actuatedByProperty",
    [P.hasInput]: "hasInput",
    [P.hasOutput]: "hasOutput",
    [P.hasObservationLocation]: "hasObservationLocation",
    [P.hasPhysicalLocation]: "hasPhysicalLocation",
    // Distinct from actuatedByProperty: points straight at the equipment/component an Actuator
    // physically acts on (e.g. a Driver `actuates` the LightEngine it drives), not a Property.
    [P.actuates]: "actuates",
  };

  // Pass 2: everything except hasConnectionPoint/hasBoundaryConnectionPoint/
  // hasOptionalConnectionPoint/isConnectionPointOf (done above) and hasMember/hasDomainSpace
  // (deferred — see below, it needs the physical containment tree AND the collapsed connection
  // topology fully resolved first, to decide whether each group is a real container).
  const groupMembers = new Map<string, string[]>(); // System/Zone uri -> member uris, in file order
  // A property can also be owned by a ConnectionPoint rather than a container node (e.g. a
  // sensor/actuator port declares `hasProperty` on itself) — recorded separately since
  // ConnectionPoints aren't in `nodes`, and resolved through to the CP's owning equipment (once
  // known, after the cnx-ownership fallback below) by resolveFunctionalParent.
  const cpPropertyOwner = new Map<string, string>(); // property uri -> owning connection-point uri
  for (const edge of graph.edges) {
    if (
      edge.predicate === P.hasConnectionPoint ||
      edge.predicate === P.hasBoundaryConnectionPoint ||
      edge.predicate === P.hasOptionalConnectionPoint ||
      edge.predicate === P.isConnectionPointOf
    )
      continue;
    if (edge.predicate === P.hasProperty) {
      const prop = properties.get(edge.target);
      if (!prop) continue;
      const owner = nodes.get(edge.source);
      if (owner) {
        owner.properties.push(prop.uri);
        propertyOwner.set(prop.uri, owner.uri);
      } else if (connectionPoints.has(edge.source)) {
        cpPropertyOwner.set(prop.uri, edge.source);
      }
      continue;
    }
    const instrumentationRelation = instrumentationPredicates[edge.predicate];
    if (instrumentationRelation) {
      const subject = nodes.get(edge.source);
      if (subject) subject.instrumentationLinks.push({ relation: instrumentationRelation, targetUri: edge.target });
      continue;
    }
    if (edge.predicate === P.executes) {
      // Reverse direction: the Function (target) is what's "executed by" the equipment (source).
      const fn = nodes.get(edge.target);
      if (fn && nodes.has(edge.source)) fn.instrumentationLinks.push({ relation: "executedBy", targetUri: edge.source });
      continue;
    }
    if (edge.predicate === P.hasMember || edge.predicate === P.hasDomainSpace) {
      if (nodes.has(edge.source) && nodes.has(edge.target)) {
        if (!groupMembers.has(edge.source)) groupMembers.set(edge.source, []);
        groupMembers.get(edge.source)!.push(edge.target);
      }
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
    cp.ownerUris.push(owner.uri);
    owner.connectionPoints.push(cp.uri);
  }

  // A large share of Sensors/Actuators/Functions in real 223P data are never s223:contains'd
  // into any equipment — they're linked functionally instead (a Sensor observes a Property that
  // some equipment owns, or has an observation/physical location; an Actuator drives a Property;
  // a Function is run via another node's s223:executes). Falling back to those relations (now
  // captured on each node as instrumentationLinks, above) nests them under the equipment they
  // actually belong to instead of leaving them stranded as top-level roots. Only applies to nodes
  // still unclaimed after real containment, and only picks one parent (first match, in the
  // priority order below) to keep the hierarchy a tree.
  function resolveFunctionalParent(node: ModelNode): string | undefined {
    for (const link of node.instrumentationLinks) {
      if (link.relation !== "observes" && link.relation !== "actuatedByProperty" && link.relation !== "hasInput" && link.relation !== "hasOutput") continue;
      const owner = propertyOwner.get(link.targetUri);
      if (owner) return owner;
      const cpOwner = cpPropertyOwner.get(link.targetUri);
      const cpEquipment = cpOwner ? connectionPoints.get(cpOwner)?.ownerUri : undefined;
      if (cpEquipment) return cpEquipment;
    }
    for (const link of node.instrumentationLinks) {
      if (link.relation !== "hasObservationLocation" && link.relation !== "hasPhysicalLocation" && link.relation !== "actuates") continue;
      if (nodes.has(link.targetUri)) return link.targetUri; // points straight at a Space/Zone/Equipment container
      const cp = connectionPoints.get(link.targetUri);
      if (cp?.ownerUri) return cp.ownerUri;
    }
    return node.instrumentationLinks.find((link) => link.relation === "executedBy")?.targetUri;
  }

  for (const node of nodes.values()) {
    if (referencedAsChild.has(node.uri) || HUB_TYPES.has(node.typeUri ?? "")) continue;
    const parentUri = resolveFunctionalParent(node);
    const parent = parentUri ? nodes.get(parentUri) : undefined;
    if (!parent || parent.uri === node.uri) continue;
    parent.children.push({ uri: node.uri, via: "functional" });
    node.parentUri = parent.uri;
    referencedAsChild.add(node.uri);
  }

  const edges = collapseConnections(graph, { nodes, connectionPoints, properties, edges: [], roots: [] });

  // A System (s223:hasMember) or Zone (s223:hasDomainSpace) is an arbitrary logical grouping that
  // can cross physical equipment/space boundaries, unlike s223:contains/encloses — membership
  // never implies physical containment. Both are therefore always purely logical: never their own
  // box, at root level or drilled into (see isLogicalGroupNode). Membership is surfaced only as
  // hover text ("member of <group>") on each member, wherever it actually lives via
  // contains/encloses/functional.
  for (const [groupUri, memberUris] of groupMembers) {
    for (const memberUri of memberUris) {
      nodes.get(memberUri)!.groupMemberships.push(groupUri);
    }
  }

  const roots = [...nodes.values()]
    .filter((n) => !referencedAsChild.has(n.uri) && !HUB_TYPES.has(n.typeUri ?? "") && !isLogicalGroupNode(n) && !isInstrumentationNode(n))
    .map((n) => n.uri);

  return { nodes, connectionPoints, properties, edges, roots };
}

export function isLogicalGroupNode(n: ModelNode): boolean {
  return n.typeUri === T.System || n.typeUri === T.Zone;
}

const INSTRUMENTATION_TYPE_SUFFIXES = ["Sensor", "Actuator", "Function"];

/**
 * Sensors/Actuators/Functions (and Thermostats, which combine a Sensor + Function role) belong to
 * the Sensors & Controls view, not Equipment — but real 223P data leaves a good number of them
 * with no genuine physical containment (no contains/encloses, and no functional-parent match
 * either — see resolveFunctionalParent above). Left alone those surface as bare, wireless root
 * boxes in Equipment view (no connection points, so no edges ever reach them) — pure clutter, and
 * confusing since they duplicate content the Sensors & Controls view already shows properly.
 * Only excludes them from becoming ROOTS: one that genuinely has a contains/encloses parent (e.g.
 * a FlowSensor physically inside a VAV box) is unaffected and still renders normally once you
 * drill into that parent.
 */
function isInstrumentationNode(n: ModelNode): boolean {
  const name = n.typeName ?? "";
  return name === "Thermostat" || INSTRUMENTATION_TYPE_SUFFIXES.some((suffix) => name.endsWith(suffix));
}

// hasObservationLocation/hasPhysicalLocation are excluded on purpose: real 223P data (e.g.
// Luminaire fixtures declaring `hasPhysicalLocation` straight to their room) uses them on
// ordinary equipment just to site it, not to claim it senses or drives anything. The other six
// relations are only ever meaningful on a genuine Sensor/Actuator/Function/Thermostat, so they're
// what the Equipment view's Sensors & Controls toggle uses to decide what counts as a "point" for
// color-coding and instrumentation edges (see flowBuilder.ts, pointsFlowBuilder.ts) — structural,
// like isInstrumentationNode above, but narrower than "has any InstrumentationLink at all".
const CORE_INSTRUMENTATION_RELATIONS = new Set<InstrumentationRelation>([
  "observes",
  "actuatedByProperty",
  "hasInput",
  "hasOutput",
  "executedBy",
  "actuates",
]);

export function hasCoreInstrumentation(n: ModelNode): boolean {
  return n.instrumentationLinks.some((link) => CORE_INSTRUMENTATION_RELATIONS.has(link.relation));
}

export { labelOf };
