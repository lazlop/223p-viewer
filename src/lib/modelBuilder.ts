import type { RdfGraph, RdfNode } from "../types/rdf";
import type {
  ChildRelation,
  ConnectionEdge,
  CPKind,
  ConnectionPointRef,
  InstrumentationRelation,
  ModelNode,
  PropertyRef,
  S223Model,
} from "../types/s223";
import { collapseConnections } from "./connectionTopology";
import { P, T, localName } from "./namespaces";
import { unitSymbol } from "./unitSymbols";

const CONNECTION_POINT_TYPES = new Set([T.InletConnectionPoint, T.OutletConnectionPoint, T.BidirectionalConnectionPoint]);
const HUB_TYPES = new Set([T.Connection, T.Conductor, T.Duct, T.Pipe]);
const OWL_ONTOLOGY = "http://www.w3.org/2002/07/owl#Ontology";

export interface ModelBuildOptions {
  /** Default false. Only affects Systems that resolve to a "majority container" — most of whose
   * members already live inside one piece of equipment/space (e.g. "Supply System" is really just
   * AHU's supply-side subdivision). When off, that System stays purely logical: flattened away,
   * membership surfaced only as hover text on each member wherever it actually lives. When on, the
   * System instead becomes a real drillable box nested inside that container, and every member is
   * moved into it — so drilling into the AHU shows a "Supply System" box instead of its members
   * flattened directly inside. Systems that don't resolve to a majority container (a real
   * standalone assembly, like a breaker panel, or one whose wiring reaches outside its own
   * membership) always render as a real box regardless of this option. */
  systemsAsBoxes?: boolean;
}

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

/** The container most of `memberUris` already live in (via contains/encloses/functional
 * attachment), if one accounts for a strict majority — used to infer "System1 is really just a
 * subdivision of Equipment/System2" even when a few members (e.g. an external loop) don't share it. */
function inferMajorityContainer(nodes: Map<string, ModelNode>, memberUris: string[]): string | undefined {
  const counts = new Map<string, number>();
  for (const uri of memberUris) {
    const parent = nodes.get(uri)?.parentUri;
    if (!parent) continue;
    counts.set(parent, (counts.get(parent) ?? 0) + 1);
  }
  let best: string | undefined;
  let bestCount = 0;
  for (const [uri, count] of counts) {
    if (count > bestCount) {
      best = uri;
      bestCount = count;
    }
  }
  return best && bestCount > memberUris.length / 2 ? best : undefined;
}

/** True if some member's collapsed connection topology reaches equipment that isn't itself a
 * member — real wiring evidence that the System has a genuine physical edge, even without an
 * explicit s223:hasBoundaryConnectionPoint declaration. */
function hasExternalConnection(edges: ConnectionEdge[], memberUris: Set<string>): boolean {
  return edges.some((e) => memberUris.has(e.fromEquipmentUri) !== memberUris.has(e.toEquipmentUri));
}

/**
 * Walks a parsed RdfGraph and produces a 223P-aware domain model: equipment/space/system
 * "container" nodes with resolved connection points, properties, structural children, and the
 * collapsed connection topology, plus a roots list (container nodes never referenced as another
 * container's child).
 */
export function buildS223Model(graph: RdfGraph, options: ModelBuildOptions = {}): S223Model {
  const systemsAsBoxes = options.systemsAsBoxes ?? false;
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
      instrumentationLinks: [],
      systemMemberships: [],
      systemRendersAsBox: false,
    });
  }

  const referencedAsChild = new Set<string>();
  const propertyOwner = new Map<string, string>(); // property uri -> the equipment/space that hasProperty's it

  // Pass 1: connection-point ownership only. Resolved first (and fully) so System-membership
  // handling later already knows whether a given System has an explicit boundary port.
  for (const edge of graph.edges) {
    if (edge.predicate !== P.hasConnectionPoint && edge.predicate !== P.hasBoundaryConnectionPoint) continue;
    const cp = connectionPoints.get(edge.target);
    const owner = nodes.get(edge.source);
    if (cp && owner) {
      cp.ownerUri = owner.uri;
      owner.connectionPoints.push(cp.uri);
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
  };

  // Pass 2: everything except hasConnectionPoint/hasBoundaryConnectionPoint (done above) and
  // hasMember (deferred — see below, it needs the physical containment tree AND the collapsed
  // connection topology fully resolved first, to decide whether each System is a real container).
  const systemMembers = new Map<string, string[]>(); // system uri -> member uris, in file order
  for (const edge of graph.edges) {
    if (edge.predicate === P.hasConnectionPoint || edge.predicate === P.hasBoundaryConnectionPoint) continue;
    if (edge.predicate === P.hasProperty) {
      const prop = properties.get(edge.target);
      const owner = nodes.get(edge.source);
      if (prop && owner) {
        owner.properties.push(prop.uri);
        propertyOwner.set(prop.uri, owner.uri);
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
    if (edge.predicate === P.hasMember) {
      if (nodes.has(edge.source) && nodes.has(edge.target)) {
        if (!systemMembers.has(edge.source)) systemMembers.set(edge.source, []);
        systemMembers.get(edge.source)!.push(edge.target);
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
    }
    for (const link of node.instrumentationLinks) {
      if (link.relation !== "hasObservationLocation" && link.relation !== "hasPhysicalLocation") continue;
      if (nodes.has(link.targetUri)) return link.targetUri; // points straight at a Space/Zone container
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

  // The physical containment tree (contains/encloses/functional) is now fully resolved, so we can
  // collapse the connection topology (needed for the "member wired to outside equipment" boundary
  // check below) before finally deciding what to do with each System's hasMember edges.
  const edges = collapseConnections(graph, { nodes, connectionPoints, properties, edges: [], roots: [] });

  // A System is an arbitrary logical grouping that can cross physical equipment boundaries —
  // s223:hasMember doesn't by itself mean physical containment the way s223:contains does. Decide,
  // per System, whether it should render as its own box (real children, drill-in) or stay purely
  // logical (membership surfaced as hover text on the members instead):
  //   1. If most members already live inside one container (a "majority container" — e.g. "Supply
  //      System" is really just AHU's supply-side subdivision, its one external member
  //      notwithstanding), whether that becomes a real drillable box nested inside that container
  //      or stays flattened+text-only is exactly what `systemsAsBoxes` toggles (see
  //      ModelBuildOptions doc). Nothing else about System handling depends on that option.
  //   2. Otherwise, a System counts as a real (root-level) box if it has an explicit
  //      s223:hasBoundaryConnectionPoint, or if its members' wiring actually reaches equipment
  //      outside the system even with no explicit boundary port — both cases mean it behaves like
  //      a genuine standalone assembly, not a subdivision of something else, regardless of display
  //      mode.
  for (const [systemUri, memberUris] of systemMembers) {
    const system = nodes.get(systemUri)!;
    const hasExplicitBoundary = system.connectionPoints.length > 0;
    const majorityContainer = inferMajorityContainer(nodes, memberUris);
    const renderAsBox = majorityContainer ? systemsAsBoxes : hasExplicitBoundary || hasExternalConnection(edges, new Set(memberUris));
    system.systemRendersAsBox = renderAsBox;

    if (majorityContainer && systemsAsBoxes) {
      // Abstraction mode: the System becomes a real intermediate box nested inside the container
      // most of its members already live in, so drilling into that container shows the System box
      // instead of its members flattened directly inside — this overrides s223:contains as the
      // tree parent for every member (moving it out of wherever it used to live) rather than only
      // claiming members that don't already have a physical home, unlike the branch below.
      const container = nodes.get(majorityContainer)!;
      container.children.push({ uri: systemUri, via: "hasMember" });
      system.parentUri = majorityContainer;
      referencedAsChild.add(systemUri);
      for (const memberUri of memberUris) {
        const member = nodes.get(memberUri)!;
        if (member.parentUri) {
          const oldParent = nodes.get(member.parentUri);
          if (oldParent) oldParent.children = oldParent.children.filter((c) => c.uri !== memberUri);
        }
        system.children.push({ uri: memberUri, via: "hasMember" });
        member.parentUri = systemUri;
        referencedAsChild.add(memberUri);
      }
      continue;
    }

    for (const memberUri of memberUris) {
      const member = nodes.get(memberUri)!;
      if (renderAsBox && !referencedAsChild.has(memberUri)) {
        system.children.push({ uri: memberUri, via: "hasMember" });
        member.parentUri = systemUri;
        referencedAsChild.add(memberUri);
      } else {
        member.systemMemberships.push(systemUri);
      }
    }
  }

  const roots = [...nodes.values()]
    .filter((n) => !referencedAsChild.has(n.uri) && !HUB_TYPES.has(n.typeUri ?? "") && !isInvisibleSystem(n))
    .map((n) => n.uri);

  return { nodes, connectionPoints, properties, edges, roots };
}

/** A System not being treated as a physical container is a purely logical grouping (see the
 * hasMember handling above) — it should never itself be rendered as a box, at root level or
 * drilled into. */
export function isInvisibleSystem(n: ModelNode): boolean {
  return n.typeUri === T.System && !n.systemRendersAsBox;
}

export { labelOf };
