# Handoff: 223P Model Viewer — System visualization

Written for picking this up in a fresh session. Focus area going forward: **how Systems
(`s223:System`) are visualized** — that's an active, opinionated area of the code with real
open questions, detailed below. Everything else (equipment boxes, connection points, the
Sensors & Controls view) is comparatively settled.

## What this project is

A browser app (Vite + React + React Flow, no backend) that visualizes ASHRAE 223P RDF/Turtle
building models with hardcoded 223P semantics — not a generic RDF graph viewer. Two toggleable
views sharing one parsed model:
- **Equipment**: physical equipment/spaces/systems as boxes, connection points as dots on the
  border, physical `cnx`/`connectsThrough` wiring collapsed into arrows, drill-down hierarchy
  with a breadcrumb.
- **Sensors & Controls**: Sensors/Actuators/Functions as first-class boxes, the Properties they
  reference as pills, and the equipment those properties belong to as clickable reference boxes
  (click jumps back into the Equipment view at the right spot).

Repo root: `/home/lazlo/Desktop/semantics/223p-viewer`. It's its own git repo (not nested under
a parent repo). Bundled example model: `models/nist-bdg1-1.ttl` (NIST/Pritoni office building
sample, imported via Vite's `?raw` suffix in `App.tsx`, no fetch needed). `npm run dev` serves
on port **3001** (not the Vite default 3000 — chosen to avoid clashing with a sibling project,
`building-kg-vis`, that also runs on 3000).

## How to run / verify

```
npm run dev          # http://localhost:3001, HMR
npx tsc -b            # typecheck — keep this clean after every change
npx eslint .           # lint — keep this clean too
npx vite build          # production bundle sanity check
```

No test suite exists. Verification in this project has instead been: (1) tsc+eslint+build clean,
(2) a throwaway `tsx` script that imports `modelBuilder`/`hierarchy` directly and prints stats
against the real bundled `.ttl` (fast, no browser — see pattern below), (3) an actual headless
Chromium pass via Playwright when the change is visual. Both are worth continuing.

**Node-script gotcha**: Node's ESM resolver resolves `node_modules` relative to the *importing
file's own location*, not `cwd`. A diagnostic script living outside `223p-viewer/` (e.g. in a
scratch/tmp dir) will fail to resolve `n3`/`@dagrejs/dagre`/etc. even if you `cd` into the
project first. Either write the script inside the project directory (and delete it before
committing — nothing like `.drive-check.mjs` or `.inspect-*.mjs` should ever be committed), or
copy a tmp-dir script in before running. Playwright wasn't preinstalled — `npm install --no-save
playwright && npx playwright install chromium --with-deps` got it working; no `chromium-cli` was
available in this environment. Pattern used repeatedly:
```js
import { chromium } from "playwright";
const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3001", { waitUntil: "networkidle" });
// ...interact, screenshot to a scratch path, read the screenshot back...
```
One sharp edge hit more than once: `.equipment-node__tooltip` divs are always in the DOM (just
`display: none` until hover), so a loose `page.locator(".equipment-node", { hasText: "X" })` can
false-positive on hidden tooltip text mentioning X inside some *other* box. Scope locators to
`.equipment-node__label` with an exact regex when checking "does box X exist."

## Architecture (data flow, single source of truth first)

```
raw .ttl text
  → ttlParser.ts (n3-based)               → RdfGraph (generic triples, prefixes)
  → modelBuilder.ts::buildS223Model(graph, options)
        internally also calls connectionTopology.ts::collapseConnections
                                           → S223Model  (the ONE typed domain model both views consume)
  → [Equipment view]  flowBuilder.ts::buildFlowElements(model, visibleUris)     → React Flow nodes/edges
  → [Points view]     pointsFlowBuilder.ts::buildPointsFlowElements(model)      → React Flow nodes/edges
  → layout.ts::layoutGraph(...)           → positioned nodes (dagre per connected-component + grid-pack)
  → components/FlowCanvas.tsx             → actual rendering (nodeTypes/edgeTypes passed as props)
```

`App.tsx` owns all top-level state: `source` (ttl text), `containerUri` (drill position, null =
root), `viewMode` (`"equipment" | "points"`), `systemMode` (`"inferred" | "literal"`, see below).
`buildModel(text, systemMode)` re-runs the whole left-hand-side of the pipeline whenever `source`
or `systemMode` changes (cheap — the bundled file parses in ~30ms, no need to memoize further).

Key files, one line each:
- `types/s223.ts` — `S223Model`, `ModelNode`, `ConnectionPointRef`, `PropertyRef`,
  `ConnectionEdge`, `InstrumentationLink`. Read this first to understand the domain model shape.
- `lib/modelBuilder.ts` — the one big function. Parses ownership (`hasConnectionPoint`,
  `hasBoundaryConnectionPoint`), properties, the "instrumentation" layer (`observes`,
  `actuatedByProperty`, `hasInput`/`hasOutput`, `hasObservationLocation`/`hasPhysicalLocation`,
  `executes`), the physical containment tree (`contains`/`encloses` + a fallback that nests
  otherwise-orphaned Sensors/Actuators/Functions under whatever they instrument), a `cnx`-as-
  ownership fallback (~1/6 of equipment in the sample data declares its own port via `cnx`
  instead of `hasConnectionPoint`), and — last, because it needs everything above already
  resolved — **System membership handling** (see below).
- `lib/connectionTopology.ts` — union-find that collapses the 2-hop `cnx`/`connectsThrough` hub
  chain (Equipment → ConnectionPoint ← Connection/Conductor/Duct/Pipe hub → ConnectionPoint ←
  Equipment) into direct equipment-to-equipment `ConnectionEdge`s.
- `lib/hierarchy.ts` — `childrenOf`, `rootNodes`, `pathTo` (breadcrumb), and `projectEdges` (walks
  each connection edge's endpoints up to the nearest *visible* ancestor at the current drill
  level, so cross-boundary connections still show as a dashed "rolled up" arrow instead of just
  vanishing — most real 223P wiring crosses container boundaries).
- `lib/flowBuilder.ts` / `lib/pointsFlowBuilder.ts` — per-view React Flow element builders.
- `lib/layout.ts` — dagre per connected-component, then shelf-packs components into a grid
  (plain dagre on the whole graph produced absurd tall/narrow layouts once ~50% of nodes are
  disconnected singletons, which is normal for real 223P data).
- `components/nodes/EquipmentNode.tsx` — box with one `<Handle>` pair per connection point
  (stacked source+target at the same id, since a dot can be either end of different edges),
  hover tooltip shows properties AND (new) `member of <System>` lines.
- `components/nodes/{PointNode,PropertyPillNode,ReferenceNode}.tsx` +
  `components/edges/InstrumentationEdge.tsx` — Sensors & Controls view only.

## System visualization — current state (the thing to keep iterating on)

### The core tension
`s223:System` is an **arbitrary logical grouping** (`s223:hasMember`) that can cross physical
equipment boundaries — unlike `s223:contains`/`s223:encloses`, membership doesn't imply physical
containment. Rendering every System as its own box was the original (naive) approach and it
produced real problems once tested against `nist-bdg1-1.ttl`:
- "Return System" (`hasMember` on a return fan + exhaust damper, no
  `hasBoundaryConnectionPoint`) rendered as a disconnected box, even though both its members are
  *also* `s223:contains`-children of the AHU — two predicates asserting different "parents" for
  the same nodes, and a single-parent tree model can only honor one.
- "Supply System" has one explicit `hasBoundaryConnectionPoint`, but 7 of its 8 members are
  `contains`-children of the AHU too, and that one boundary CP belongs to the 8th member (a
  free-standing "External loop" coil) — the System is really just AHU's supply-side subdivision
  wearing one dangling, disconnected-looking port.

### What's implemented now
In `modelBuilder.ts`, System membership is resolved **last**, after the physical containment tree
and the collapsed connection topology (`edges`) are both fully known.

1. For each System, `inferMajorityContainer` (in `modelBuilder.ts`) checks whether *more than
   half* of its members already share the same `parentUri` in the physical tree.
2. **If a majority container exists** (the common case — e.g. Supply System is really just AHU's
   supply-side subdivision, Return System too), `ModelBuildOptions.systemsAsBoxes` (default
   `false`) decides how it's displayed — this is the one true axis of user choice now, exposed as
   the header toggle **Systems: Flat** / **Systems: Abstracted**:
   - **Flat** (`systemsAsBoxes: false`): the System stays purely logical — no box anywhere,
     `hasMember` becomes hover text (`member of <System>`) on each member wherever it *actually*
     lives (still nested under the majority container, untouched).
   - **Abstracted** (`systemsAsBoxes: true`): the System becomes a **real, drillable box**, nested
     as a child of the majority container. Every member is *moved* into the System's children —
     this is the one place `s223:hasMember` is allowed to override `s223:contains` as the tree
     parent, specifically because the user opted into it. Concretely: drilling into the AHU shows
     a "Supply System" box instead of 7 flattened pieces of equipment; drilling into that box shows
     the equipment (plus its 8th member, "External loop", which had no other physical home either
     way).
3. **If no majority container exists** (a System's members are scattered, or it's a genuine
   standalone assembly like a breaker panel), it renders as a real **root-level** box regardless of
   the toggle above — either because it has an explicit `hasBoundaryConnectionPoint` (Breaker
   panel1), or because its members' collapsed connection topology reaches equipment outside the
   System (`hasExternalConnection` — generalizes "boundary connection point" from "must be
   RDF-asserted" to "can be inferred from actual wiring"; untested against real data so far, see
   gaps below). Once a System qualifies this way, its members become real tree-children and the
   **existing** `projectEdges` rollup mechanism automatically draws dashed arrows for any member's
   external connection — no separate dot-synthesis code was needed; it turned out to already be
   handled by machinery built for a different problem (cross-container `contains` rollup) earlier
   in the project.
4. `isInvisibleSystem(n)` (exported from `modelBuilder.ts`) is the single predicate both the
   `roots` computation and `flowBuilder.ts`'s render loop use to decide "does this System get a
   box at all." It reads `n.systemRendersAsBox`, set once during the pass above.

A header toggle (**Systems: Flat** / **Systems: Abstracted**) switches `App.tsx`'s
`systemDisplayMode` state, which fully rebuilds the model (cheap) and resets `containerUri` to
`null` (the containment tree genuinely differs between modes, so a stale drill path could point at
a container that doesn't mean the same thing anymore).

Two earlier approaches were tried and abandoned before landing here, worth knowing about so they
aren't reinvented:
- **Every System always renders as its own box** (the original, pre-this-project-history
  approach): broke because `hasMember` and `contains` can independently claim the same node as
  their "parent," and a single-parent tree can only honor one — surfaced as Return System floating
  disconnected from the AHU even though its members physically live there. See `git show 0232d0c`.
- **A dashed bounding-box "cluster frame" drawn over the flattened Flat-mode layout**, rather than
  an actual box you drill into: tried, then explicitly rejected in favor of the real-box toggle
  above once the user tried it and preferred an actual drillable abstraction over a soft visual
  hint. Removed entirely in this session (was `flowBuilder.ts::computeSystemGroups` +
  `layout.ts::computeGroupFrameNodes`/`computeGroupLabelNodes` + two node components) — don't
  resurrect without reason; it had a real unresolved bug where two Systems' frames could overlap
  and a frame could visually enclose a non-member node, since dagre's layout has zero awareness of
  System membership.

Verified against the bundled model (both modes): root count is 45 either way; in Abstracted mode,
drilling into AHU shows "Supply System" and "Return System" as real boxes with their equipment
correctly moved inside (confirmed via breadcrumb `Root/AHU/Supply System` and its 8 children);
Breaker panel1 (no majority container — its members are scattered breakers/circuits, not
concentrated in one piece of equipment) is unaffected by the toggle in either mode, as expected.

### Known gaps / open threads for next session
- **The "no majority container, external wiring" rule is untested against real data.** All 4
  Systems in the bundled model resolve via either explicit-boundary (Breaker panel1) or majority-
  container (the other 3) — none of them exercise the "no majority container, but has external
  wiring" path. Worth either constructing a synthetic test case or finding/trying a different 223P
  model that has one (the app supports "Load .ttl" for any file).
- **The >50% majority threshold is a first guess**, not tuned against multiple examples. Only one
  real case (Supply System, 7/8 = 87.5%) validated it. Consider: should it weight by something
  other than raw member count (e.g. connection-point count per member)? Should transitively-nested
  containers count (`inferMajorityContainer` currently only looks at each member's *immediate*
  `parentUri`, not the full ancestor chain)?
- **Sensors & Controls view doesn't show `systemMemberships` at all.** `EquipmentNode.tsx` has a
  `member of <System>` tooltip line; `PointNode.tsx` (the equivalent box in the other view) never
  got the same treatment. Inconsistent — worth deciding if it should.
- Only tried against one model (`nist-bdg1-1.ttl`, 4 Systems total, fairly simple topology).
  Trying other real 223P models via "Load .ttl" would be the fastest way to find where the
  heuristics break down or feel wrong, before investing more in tuning them.

## Git state

Clean working tree, all committed, `master` branch, no remote configured. Recent history (newest
first) — `git log --oneline`:
```
33c3fce Infer System boundaries, with a toggle back to literal RDF behavior
0232d0c Treat Systems as logical groupings unless they have real boundary ports
9f4aa1f Remove the container/boundary frame from the drilled-in Equipment view
b1d2d01 Add a Sensors & Controls view for the instrumentation layer
204eda5 Attach more equipment into the hierarchy instead of leaving it floating
5d88aed Initial commit: 223P model viewer
```
Each commit message has real detail on *why*, not just *what* — worth reading `git show` on the
System-related ones (`33c3fce`, `0232d0c`) before making further changes there.
