import type { RdfGraph } from "../types/rdf";
import type { ConnectionEdge, S223Model } from "../types/s223";
import { P, T } from "./namespaces";

const HUB_TYPES = new Set<string>([T.Connection, T.Conductor]);

/** True for ConnectionPoints and Connection/Conductor hub nodes — the only things a cnx/connectsThrough edge should link topologically. Equipment nodes can also appear as the source of a cnx edge (declaring their own port instead of using hasConnectionPoint, per modelBuilder.ts), which is ownership, not topology, and must not be unioned into a hub component. */
function isTopologyParticipant(model: S223Model, uri: string): boolean {
  if (model.connectionPoints.has(uri)) return true;
  const node = model.nodes.get(uri);
  return node ? HUB_TYPES.has(node.typeUri ?? "") : false;
}

/**
 * 223P connection topology is a hub chain, not a direct edge: a ConnectionPoint reaches its
 * counterpart through an intermediate s223:Connection or s223:Conductor entity, referenced via
 * either s223:cnx or s223:connectsThrough (both predicates are used interchangeably in real
 * data). Rather than hardcoding "exactly one hub node between two CPs", we union-find every node
 * touched by a cnx/connectsThrough edge into connected components — this collapses arbitrary-
 * length hub chains uniformly and degrades gracefully to a direct CP-CP link if one ever occurs.
 */
class UnionFind {
  private parent = new Map<string, string>();

  find(x: string): string {
    if (!this.parent.has(x)) this.parent.set(x, x);
    let root = x;
    while (this.parent.get(root) !== root) root = this.parent.get(root)!;
    let cur = x;
    while (this.parent.get(cur) !== root) {
      const next = this.parent.get(cur)!;
      this.parent.set(cur, root);
      cur = next;
    }
    return root;
  }

  union(a: string, b: string) {
    const ra = this.find(a);
    const rb = this.find(b);
    if (ra !== rb) this.parent.set(ra, rb);
  }
}

export function collapseConnections(graph: RdfGraph, model: S223Model): ConnectionEdge[] {
  const uf = new UnionFind();
  for (const edge of graph.edges) {
    if (edge.predicate !== P.cnx && edge.predicate !== P.connectsThrough) continue;
    if (!isTopologyParticipant(model, edge.source) || !isTopologyParticipant(model, edge.target)) continue;
    uf.union(edge.source, edge.target);
  }

  const components = new Map<string, { cps: string[]; hubs: string[] }>();
  for (const cpUri of model.connectionPoints.keys()) {
    const root = uf.find(cpUri);
    if (!components.has(root)) components.set(root, { cps: [], hubs: [] });
    components.get(root)!.cps.push(cpUri);
  }
  for (const nodeUri of model.nodes.keys()) {
    const root = uf.find(nodeUri);
    const comp = components.get(root);
    if (comp) comp.hubs.push(nodeUri);
  }

  const edges: ConnectionEdge[] = [];
  for (const [root, { cps, hubs }] of components) {
    const owned = cps
      .map((uri) => model.connectionPoints.get(uri)!)
      .filter((cp) => cp.ownerUri); // drop CPs nobody owns via hasConnectionPoint
    if (owned.length < 2) continue; // dangling hub, nothing to draw

    const outlets = owned.filter((cp) => cp.kind === "Outlet");
    const inlets = owned.filter((cp) => cp.kind === "Inlet");
    const other = owned.filter((cp) => cp.kind !== "Outlet" && cp.kind !== "Inlet");

    const pairs: [string, string][] = [];
    if (outlets.length > 0 && inlets.length > 0) {
      for (const o of outlets) for (const i of inlets) pairs.push([o.uri, i.uri]);
    } else {
      // No clear inlet/outlet split (bidirectional/other-only group) — connect pairwise in a
      // deterministic order so we don't duplicate the same undirected link both ways.
      const sorted = [...owned].sort((a, b) => a.uri.localeCompare(b.uri));
      for (let a = 0; a < sorted.length; a++) {
        for (let b = a + 1; b < sorted.length; b++) pairs.push([sorted[a].uri, sorted[b].uri]);
      }
      void other;
    }

    const hubNode = hubs.map((uri) => model.nodes.get(uri)!).find((n) => n.label);
    const hubLabel = hubNode?.label ?? "";
    const hubProperties = hubs.flatMap((uri) => model.nodes.get(uri)?.properties ?? []);
    const medium = owned.find((cp) => cp.medium)?.medium;

    for (const [fromCPUri, toCPUri] of pairs) {
      const fromCP = model.connectionPoints.get(fromCPUri)!;
      const toCP = model.connectionPoints.get(toCPUri)!;
      if (fromCP.ownerUri === toCP.ownerUri) continue; // skip self-loops within the same equipment
      edges.push({
        id: `${root}::${fromCPUri}::${toCPUri}`,
        hubUri: root,
        hubLabel,
        medium,
        fromEquipmentUri: fromCP.ownerUri!,
        fromCPUri,
        toEquipmentUri: toCP.ownerUri!,
        toCPUri,
        properties: hubProperties,
      });
    }
  }

  return edges;
}
