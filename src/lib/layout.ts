import dagre from "@dagrejs/dagre";
import type { graphlib } from "@dagrejs/dagre";
import type { Edge, Node } from "@xyflow/react";

// dagre re-exports graphlib's Graph type itself (`dagre.graphlib.Graph`); importing the type via
// dagre avoids a phantom dependency on `@dagrejs/graphlib`, which isn't a direct package.json
// dependency — it's only present because dagre installs it transitively.
type Graph = graphlib.Graph;

export const NODE_WIDTH = 200;
const BASE_HEIGHT = 56;
const HEIGHT_PER_CP = 18;
const MAX_CP_SIDE = 8; // beyond this many CPs on one side, height stops growing (dots get denser instead)
const COMPONENT_GAP = 60;
const MAX_ROW_WIDTH = 1600;

// A single dagre pass produces a reasonably clean layout for small/tree-like components, but for
// larger, densely-interlinked ones (e.g. a Sensors & Controls "instrumentation cluster" where many
// unrelated points share a handful of hub reference/property nodes) dagre's crossing-minimization
// is a local-search heuristic seeded by node/edge insertion order — it can land in a visibly worse
// local optimum than another equally-valid insertion order would produce, and its fixed default
// spacing (40/110) gets cramped once several nodes in a rank have 3+ edges apiece. Components at or
// above DENSE_COMPONENT_NODE_THRESHOLD nodes therefore get (a) extra nodesep/ranksep so same-rank
// nodes and their edge labels have room to breathe, and (b) several extra dagre passes over
// randomly-shuffled insertion orders, keeping whichever pass has the fewest measured edge
// crossings. Small components (the vast majority of real 223P models — mostly 2-6 node chains) are
// left through the exact single-pass, default-spacing path as before, so they render pixel-identical
// to before this was added.
const DENSE_COMPONENT_NODE_THRESHOLD = 8;
const DENSE_NODESEP = 70;
const DENSE_RANKSEP = 130;
const MIN_CROSSING_TRIALS = 6;
const MAX_CROSSING_TRIALS = 40;

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

// Deterministic PRNG (mulberry32) so re-laying-out the same model twice (e.g. re-render without a
// model change) always produces the same result — no visible "jitter" between renders.
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(arr: T[], rng: () => number): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function segmentsIntersect(p1: [number, number], p2: [number, number], p3: [number, number], p4: [number, number]): boolean {
  const ccw = (a: [number, number], b: [number, number], c: [number, number]) =>
    (c[1] - a[1]) * (b[0] - a[0]) > (b[1] - a[1]) * (c[0] - a[0]);
  return ccw(p1, p3, p4) !== ccw(p2, p3, p4) && ccw(p1, p2, p3) !== ccw(p1, p2, p4);
}

/** Straight-line crossing count between node centers — a cheap, order-only proxy for how tangled
 * the real (bezier/step) edges will look; good enough to compare candidate layouts of the same
 * graph against each other. Edges sharing an endpoint don't count (they meet, not "cross"). */
function countCrossings(componentEdges: Edge[], g: Graph): number {
  const segments: [[number, number], [number, number]][] = [];
  for (const e of componentEdges) {
    const s = g.node(e.source);
    const t = g.node(e.target);
    segments.push([[s.x, s.y], [t.x, t.y]]);
  }
  let crossings = 0;
  for (let i = 0; i < segments.length; i++) {
    for (let j = i + 1; j < segments.length; j++) {
      const a = componentEdges[i];
      const b = componentEdges[j];
      if (a.source === b.source || a.source === b.target || a.target === b.source || a.target === b.target) continue;
      if (segmentsIntersect(segments[i][0], segments[i][1], segments[j][0], segments[j][1])) crossings++;
    }
  }
  return crossings;
}

function runDagre<T extends Record<string, unknown>>(
  nodeOrder: Node<T>[],
  edgeOrder: Edge[],
  getCpCount: (node: Node<T>) => number,
  direction: "LR" | "TB",
  nodesep: number,
  ranksep: number,
): Graph {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: direction, nodesep, ranksep });
  for (const node of nodeOrder) {
    g.setNode(node.id, { width: NODE_WIDTH, height: nodeHeight(getCpCount(node)) });
  }
  for (const edge of edgeOrder) g.setEdge(edge.source, edge.target);
  dagre.layout(g);
  return g;
}

function layoutComponent<T extends Record<string, unknown>>(
  nodes: Node<T>[],
  edges: Edge[],
  getCpCount: (node: Node<T>) => number,
  direction: "LR" | "TB",
): { nodes: Node<T>[]; width: number; height: number } {
  const nodeIds = new Set(nodes.map((n) => n.id));
  const componentEdges = edges.filter((e) => nodeIds.has(e.source) && nodeIds.has(e.target));

  // A lone, edgeless node (real 223P/bschema data can produce hundreds of these — e.g.
  // ExternalReference clutter with no s223:contains and no connection points) has nothing for
  // dagre to lay out; skip straight to (0, 0) instead of paying its full graph-construction
  // overhead once per node. At real-building scale (hundreds of singleton components) this is the
  // difference between the shelf-packing pass finishing near-instantly and taking several seconds.
  if (nodes.length === 1) {
    const height = nodeHeight(getCpCount(nodes[0]));
    return { nodes: [{ ...nodes[0], position: { x: 0, y: 0 }, style: { ...nodes[0].style, width: NODE_WIDTH, height } }], width: NODE_WIDTH, height };
  }

  let best: Graph;
  if (nodes.length < DENSE_COMPONENT_NODE_THRESHOLD) {
    // Small component: single pass, original insertion order, original spacing — identical to
    // this function's behavior before dense-component handling was added.
    best = runDagre(nodes, componentEdges, getCpCount, direction, 40, 110);
  } else {
    const rng = mulberry32(0x2f6e2b1);
    const trialCount = Math.max(
      MIN_CROSSING_TRIALS,
      Math.min(MAX_CROSSING_TRIALS, Math.round(6000 / (nodes.length + componentEdges.length + 1))),
    );
    // Always try the natural (unshuffled) order first so a shuffle can never make things worse.
    best = runDagre(nodes, componentEdges, getCpCount, direction, DENSE_NODESEP, DENSE_RANKSEP);
    let bestScore = countCrossings(componentEdges, best);
    for (let i = 0; i < trialCount && bestScore > 0; i++) {
      const candidate = runDagre(
        shuffled(nodes, rng),
        shuffled(componentEdges, rng),
        getCpCount,
        direction,
        DENSE_NODESEP,
        DENSE_RANKSEP,
      );
      const score = countCrossings(componentEdges, candidate);
      if (score < bestScore) {
        best = candidate;
        bestScore = score;
      }
    }
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const positioned = nodes.map((node) => {
    const pos = best.node(node.id);
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
