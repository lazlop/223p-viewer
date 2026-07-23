import dagre from "@dagrejs/dagre";
import type { Edge, Node } from "@xyflow/react";

export const NODE_WIDTH = 200;
const BASE_HEIGHT = 56;
const HEIGHT_PER_CP = 18;
const MAX_CP_SIDE = 8; // beyond this many CPs on one side, height stops growing (dots get denser instead)
const COMPONENT_GAP = 60;
const MAX_ROW_WIDTH = 1600;

export function nodeHeight(cpCount: number): number {
  const perSide = Math.min(Math.ceil(cpCount / 2), MAX_CP_SIDE);
  return Math.max(BASE_HEIGHT, BASE_HEIGHT + perSide * HEIGHT_PER_CP);
}

function connectedComponents<T extends Record<string, unknown>>(nodes: Node<T>[], edges: Edge[]): Node<T>[][] {
  const adjacency = new Map<string, string[]>();
  for (const n of nodes) adjacency.set(n.id, []);
  for (const e of edges) {
    if (!adjacency.has(e.source) || !adjacency.has(e.target)) continue;
    adjacency.get(e.source)!.push(e.target);
    adjacency.get(e.target)!.push(e.source);
  }

  const byId = new Map(nodes.map((n) => [n.id, n]));
  const visited = new Set<string>();
  const components: Node<T>[][] = [];
  for (const start of nodes) {
    if (visited.has(start.id)) continue;
    const component: Node<T>[] = [];
    const stack = [start.id];
    visited.add(start.id);
    while (stack.length > 0) {
      const id = stack.pop()!;
      component.push(byId.get(id)!);
      for (const neighbor of adjacency.get(id) ?? []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      }
    }
    components.push(component);
  }
  return components;
}

function layoutComponent<T extends Record<string, unknown>>(
  nodes: Node<T>[],
  edges: Edge[],
  getCpCount: (node: Node<T>) => number,
  direction: "LR" | "TB",
): { nodes: Node<T>[]; width: number; height: number } {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: direction, nodesep: 40, ranksep: 110 });

  for (const node of nodes) {
    g.setNode(node.id, { width: NODE_WIDTH, height: nodeHeight(getCpCount(node)) });
  }
  const nodeIds = new Set(nodes.map((n) => n.id));
  for (const edge of edges) {
    if (nodeIds.has(edge.source) && nodeIds.has(edge.target)) g.setEdge(edge.source, edge.target);
  }
  dagre.layout(g);

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const positioned = nodes.map((node) => {
    const pos = g.node(node.id);
    const height = nodeHeight(getCpCount(node));
    const left = pos.x - NODE_WIDTH / 2;
    const top = pos.y - height / 2;
    minX = Math.min(minX, left);
    minY = Math.min(minY, top);
    maxX = Math.max(maxX, left + NODE_WIDTH);
    maxY = Math.max(maxY, top + height);
    return { ...node, position: { x: left, y: top }, style: { ...node.style, width: NODE_WIDTH, height } };
  });

  // Normalize this component's positions to start at (0, 0) so it can be shelf-packed independently.
  const width = maxX - minX;
  const height = maxY - minY;
  const normalized = positioned.map((n) => ({ ...n, position: { x: n.position.x - minX, y: n.position.y - minY } }));
  return { nodes: normalized, width, height };
}

/**
 * Real 223P models mostly consist of many small, mutually-disconnected clusters (a handful of
 * flow-connected equipment) plus a long tail of standalone points (sensors/actuators with no
 * s223:cnx wiring, just an `observes`/`hasObservationLocation` link elsewhere). A single dagre
 * pass treats all of that as one graph and stacks every disconnected node into one unreadably
 * tall column. Laying out each connected component independently and shelf-packing the results
 * into a grid keeps clusters coherent while giving singleton nodes a sane, scannable layout.
 */
export function layoutGraph<T extends Record<string, unknown>>(
  nodes: Node<T>[],
  edges: Edge[],
  getCpCount: (node: Node<T>) => number,
  direction: "LR" | "TB" = "LR",
): Node<T>[] {
  const components = connectedComponents(nodes, edges)
    .map((componentNodes) => layoutComponent(componentNodes, edges, getCpCount, direction))
    .sort((a, b) => b.height - a.height);

  const result: Node<T>[] = [];
  let cursorX = 0;
  let cursorY = 0;
  let rowHeight = 0;
  for (const component of components) {
    if (cursorX > 0 && cursorX + component.width > MAX_ROW_WIDTH) {
      cursorX = 0;
      cursorY += rowHeight + COMPONENT_GAP;
      rowHeight = 0;
    }
    for (const node of component.nodes) {
      result.push({ ...node, position: { x: node.position.x + cursorX, y: node.position.y + cursorY } });
    }
    cursorX += component.width + COMPONENT_GAP;
    rowHeight = Math.max(rowHeight, component.height);
  }

  return result;
}
