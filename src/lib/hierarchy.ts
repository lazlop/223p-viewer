import type { ConnectionEdge, ModelNode, S223Model } from "../types/s223";

export function childrenOf(model: S223Model, uri: string): ModelNode[] {
  const node = model.nodes.get(uri);
  if (!node) return [];
  return node.children.map((c) => model.nodes.get(c.uri)).filter((n): n is ModelNode => Boolean(n));
}

export function rootNodes(model: S223Model): ModelNode[] {
  return model.roots.map((uri) => model.nodes.get(uri)).filter((n): n is ModelNode => Boolean(n));
}

/** Ancestor chain from a root down to (and including) `uri`, for breadcrumb display. */
export function pathTo(model: S223Model, uri: string): ModelNode[] {
  const path: ModelNode[] = [];
  let current = model.nodes.get(uri);
  while (current) {
    path.unshift(current);
    current = current.parentUri ? model.nodes.get(current.parentUri) : undefined;
  }
  return path;
}

/** Walks parentUri up from `uri` until it reaches a node present in `visibleUris`. */
export function nearestVisibleAncestor(model: S223Model, uri: string, visibleUris: Set<string>): string | undefined {
  let current: string | undefined = uri;
  const seen = new Set<string>();
  while (current && !seen.has(current)) {
    if (visibleUris.has(current)) return current;
    seen.add(current);
    current = model.nodes.get(current)?.parentUri;
  }
  return undefined;
}

export interface ProjectedEdge {
  id: string;
  source: string;
  sourceHandle?: string;
  target: string;
  targetHandle?: string;
  /** false when this edge connects the exact two connection points that own it; true when at
   * least one endpoint got walked up to a visible ancestor because the real owner is nested
   * inside a container that isn't expanded at this view level. */
  rolledUp: boolean;
  raw: ConnectionEdge[];
}

/**
 * Most 223P connections cross container boundaries — a Luminaire's circuit runs to a breaker
 * inside a different System, a VAV box's hot water inlet runs to a boiler outside any space at
 * all. A strict "both endpoints visible at this exact level" filter (see the equivalent of the
 * old edgesAmong) leaves most of a real model's equipment looking disconnected. Instead, project
 * each endpoint up to the nearest ancestor that IS visible at the current level, and merge
 * raw edges that land on the same visible pair — this is what actually reads as "equipment
 * connects to equipment" once you're not simultaneously looking at both real endpoints.
 */
export function projectEdges(model: S223Model, visibleUris: Set<string>): ProjectedEdge[] {
  const groups = new Map<string, ProjectedEdge>();
  for (const e of model.edges) {
    const source = nearestVisibleAncestor(model, e.fromEquipmentUri, visibleUris);
    const target = nearestVisibleAncestor(model, e.toEquipmentUri, visibleUris);
    if (!source || !target || source === target) continue;

    const direct = source === e.fromEquipmentUri && target === e.toEquipmentUri;
    const key = direct ? `direct::${e.id}` : `rollup::${source}::${target}`;
    const existing = groups.get(key);
    if (existing) {
      existing.raw.push(e);
    } else {
      groups.set(key, {
        id: key,
        source,
        sourceHandle: direct ? e.fromCPUri : undefined,
        target,
        targetHandle: direct ? e.toCPUri : undefined,
        rolledUp: !direct,
        raw: [e],
      });
    }
  }
  return [...groups.values()];
}

export interface BoundaryLink {
  containerCPUri: string;
  childCPUri: string;
}

/**
 * When drilled into a container, its own connection points (the "outside" ports) are no longer
 * owned by any visible box, but s223:mapsTo often links them to the matching connection point on
 * one of the container's children — surface those as boundary links so the drilled-in view can
 * still show how the internals reach the outside world.
 */
export function boundaryLinks(model: S223Model, containerUri: string): BoundaryLink[] {
  const container = model.nodes.get(containerUri);
  if (!container) return [];
  const childUris = new Set(container.children.map((c) => c.uri));
  const links: BoundaryLink[] = [];

  for (const cpUri of container.connectionPoints) {
    const cp = model.connectionPoints.get(cpUri);
    if (!cp) continue;
    for (const target of cp.mapsTo) {
      const targetCP = model.connectionPoints.get(target);
      if (targetCP?.ownerUri && childUris.has(targetCP.ownerUri)) {
        links.push({ containerCPUri: cpUri, childCPUri: target });
      }
    }
  }
  // mapsTo can point either direction (parent boundary -> child, or child -> parent boundary),
  // so also check each child's owned CPs for a mapsTo back to one of the container's own CPs.
  for (const childUri of childUris) {
    const child = model.nodes.get(childUri);
    if (!child) continue;
    for (const cpUri of child.connectionPoints) {
      const cp = model.connectionPoints.get(cpUri);
      if (!cp) continue;
      for (const target of cp.mapsTo) {
        if (container.connectionPoints.includes(target)) {
          links.push({ containerCPUri: target, childCPUri: cpUri });
        }
      }
    }
  }

  return links;
}
