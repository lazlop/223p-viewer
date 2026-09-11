import type { RdfGraph } from "../types/rdf";
import type { ConnectionEdge, ConnectionPointRef, ModelNode, PropertyRef, S223Model } from "../types/s223";
import { localName } from "./namespaces";
import { buildProperty } from "./modelBuilder";

export const BRICK = "https://brickschema.org/schema/Brick#";

const brick = (localPart: string) => `${BRICK}${localPart}`;

const P = {
  feeds: brick("feeds"),
  isFedBy: brick("isFedBy"),
  hasPoint: brick("hasPoint"),
  isPointOf: brick("isPointOf"),
  hasPart: brick("hasPart"),
  isPartOf: brick("isPartOf"),
  hasLocation: brick("hasLocation"),
  isLocationOf: brick("isLocationOf"),
};

/** True if anything in the graph is typed with a class in the Brick namespace — used by App.tsx
 * to auto-pick this builder (over buildS223Model) for an arbitrary loaded .ttl file. */
export function looksLikeBrickGraph(graph: RdfGraph): boolean {
  for (const node of graph.nodes.values()) {
    if (node.types.some((t) => t.startsWith(BRICK))) return true;
  }
  return false;
}

/**
 * Brick's relationship set is much flatter than 223P's: no connection-point/hub layer, and no
 * separate first-class "point" box either. A Brick Point (Sensor/Setpoint/Command/...) is exactly
 * a 223P Property in spirit — an observable/settable value declared directly on itself (via
 * qudt:hasUnit/hasQuantityKind, the same predicates 223P Properties use), owned by one piece of
 * equipment — so it's folded straight into ModelNode.properties via modelBuilder.ts's own
 * buildProperty, instead of becoming its own box. Only equipment/zone/location instances become
 * boxes, rendered through the exact same EquipmentNode/layout/hierarchy pipeline 223P models use:
 *   - every Brick instance NOT reached via hasPoint/isPointOf -> a ModelNode
 *   - hasPoint/isPointOf -> a PropertyRef pushed onto the owning equipment's `properties`
 *   - hasPart/isPartOf/hasLocation/isLocationOf -> a "contains" child edge between two boxes
 *   - feeds/isFedBy -> a ConnectionEdge between two boxes, through a synthetic Outlet/Inlet
 *     connection-point pair invented per edge (Brick has no connection points of its own), so
 *     EquipmentNode's existing per-CP handles and hierarchy.ts's roll-up-on-drill-in logic
 *     (projectEdges) work completely unmodified.
 * What makes a node a Point is purely relational — something else declares hasPoint on it (or it
 * declares isPointOf) — not its class name or which properties it happens to carry. A class named
 * like a sensor, or one that carries its own qudt:hasUnit/hasQuantityKind, is NOT treated as a
 * Point unless an actual hasPoint/isPointOf edge says so: guessing from a naming convention or an
 * incidental property is exactly the kind of per-file heuristic this project avoids elsewhere (see
 * the BOPTest-specific ref:/boptestrules: predicates below). A genuine Brick model declares hasPoint for every
 * point it has; if the bundled brick-model.ttl doesn't (several points, e.g.
 * heaPum_reaTRet/heaPum_reaTSup, and the CO2 sensors like hvac_reaZonCor_CO2Zon, are never
 * targets of hasPoint from anything), that's the source file under-declaring its own topology, not
 * something to paper over here — so those render as ordinary, disconnected boxes instead of
 * folding into a property list, exactly like the Chiller/HeatPump case below and exactly what a
 * reader should see: this is what the model actually says, not what a human would guess it means.
 */
export function buildBrickModel(graph: RdfGraph): S223Model {
  const pointUris = new Set<string>();
  for (const edge of graph.edges) {
    if (edge.predicate === P.hasPoint) pointUris.add(edge.target);
    else if (edge.predicate === P.isPointOf) pointUris.add(edge.source);
  }

  const nodes = new Map<string, ModelNode>();
  const properties = new Map<string, PropertyRef>();

  for (const node of graph.nodes.values()) {
    if (!node.types.some((t) => t.startsWith(BRICK))) continue; // skip ref:BOPTestReference/etc. scaffolding
    const typeUri = node.types[0];
    const typeName = localName(typeUri);
    if (pointUris.has(node.uri)) {
      properties.set(node.uri, buildProperty(node));
      continue; // Points never become boxes
    }
    nodes.set(node.uri, {
      uri: node.uri,
      label: node.label,
      typeUri,
      typeName,
      connectionPoints: [],
      properties: [],
      children: [],
      instrumentationLinks: [],
      groupMemberships: [],
    });
  }

  const referencedAsChild = new Set<string>();
  const connectionPoints = new Map<string, ConnectionPointRef>();
  const edges: ConnectionEdge[] = [];
  let syntheticEdgeCounter = 0;

  function addChild(parentUri: string, childUri: string) {
    const parent = nodes.get(parentUri);
    const child = nodes.get(childUri);
    if (!parent || !child || parent.uri === child.uri || referencedAsChild.has(child.uri)) return;
    parent.children.push({ uri: child.uri, via: "contains" });
    child.parentUri = parent.uri;
    referencedAsChild.add(child.uri);
  }

  function addPropertyOwnership(ownerUri: string, pointUri: string) {
    const owner = nodes.get(ownerUri);
    const prop = properties.get(pointUri);
    if (owner && prop) owner.properties.push(prop.uri);
  }

  function addFeeds(fromUri: string, toUri: string) {
    const from = nodes.get(fromUri);
    const to = nodes.get(toUri);
    if (!from || !to || from.uri === to.uri) return;
    const id = `feeds::${from.uri}::${to.uri}::${syntheticEdgeCounter++}`;
    const outUri = `${id}#out`;
    const inUri = `${id}#in`;
    connectionPoints.set(outUri, { uri: outUri, label: "feeds", kind: "Outlet", ownerUri: from.uri, ownerUris: [from.uri], mapsTo: [] });
    connectionPoints.set(inUri, { uri: inUri, label: "feeds", kind: "Inlet", ownerUri: to.uri, ownerUris: [to.uri], mapsTo: [] });
    from.connectionPoints.push(outUri);
    to.connectionPoints.push(inUri);
    edges.push({
      id,
      hubUri: id,
      hubLabel: "feeds",
      fromEquipmentUri: from.uri,
      fromCPUri: outUri,
      toEquipmentUri: to.uri,
      toCPUri: inUri,
      properties: [],
    });
  }

  for (const edge of graph.edges) {
    switch (edge.predicate) {
      case P.hasPoint:
        addPropertyOwnership(edge.source, edge.target);
        break;
      case P.isPointOf:
        addPropertyOwnership(edge.target, edge.source);
        break;
      case P.hasPart:
      case P.isLocationOf:
        addChild(edge.source, edge.target);
        break;
      case P.isPartOf:
      case P.hasLocation:
        addChild(edge.target, edge.source);
        break;
      case P.feeds:
        addFeeds(edge.source, edge.target);
        break;
      case P.isFedBy:
        addFeeds(edge.target, edge.source);
        break;
      default:
        break;
    }
  }

  const roots = [...nodes.values()].filter((n) => !referencedAsChild.has(n.uri)).map((n) => n.uri);

  return { nodes, connectionPoints, properties, edges, roots };
}
