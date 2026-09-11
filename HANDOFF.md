# Handoff: 223P Model Viewer — System visualization

Written for picking this up in a fresh session. Focus area going forward: **how Systems
(`s223:System`) are visualized** — this went through several iterations (see below) and landed on
a deliberately simple, settled answer. If you're tempted to make Systems render as boxes again,
read "History: approaches tried and abandoned" first — it's been tried twice already. Everything
else (equipment boxes, connection points, the Sensors & Controls view) is comparatively settled
too.

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

The Equipment view also visualizes Brick-schema RDF/Turtle models (bundled example:
`models/brick-model.ttl`) — not as a separate tab, but as a **Schema** selector (223P/Brick) next
to the file picker, since a Brick equipment/zone renders exactly like a 223P one once its Points
are folded into properties. See "Brick model support" below and `lib/brickModelBuilder.ts`.

The Equipment view's rendering pipeline is also packaged as a standalone
[anywidget](https://anywidget.dev), so it (and its query-selection clipboard) can be embedded in a
Jupyter or marimo notebook instead of only this standalone app — see "anywidget / marimo
integration" below, `src/widget/`, and `python/`.

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
root), `viewMode` (`"equipment" | "points"`). `buildS223Model` takes no options anymore (see
below) — it re-runs the whole left-hand-side of the pipeline whenever `source` changes (cheap —
the bundled file parses in ~30ms, no need to memoize further).

Key files, one line each:
- `types/s223.ts` — `S223Model`, `ModelNode`, `ConnectionPointRef`, `PropertyRef`,
  `ConnectionEdge`, `InstrumentationLink`. Read this first to understand the domain model shape.
- `lib/modelBuilder.ts` — the one big function. Parses ownership (`hasConnectionPoint`,
  `hasBoundaryConnectionPoint`), properties, the "instrumentation" layer (`observes`,
  `actuatedByProperty`, `hasInput`/`hasOutput`, `hasObservationLocation`/`hasPhysicalLocation`,
  `executes`), the physical containment tree (`contains`/`encloses` + a fallback that nests
  otherwise-orphaned Sensors/Actuators/Functions under whatever they instrument), a `cnx`-as-
  ownership fallback (~1/6 of equipment in the sample data declares its own port via `cnx`
  instead of `hasConnectionPoint`), and — last — **System membership** (see below; this part is
  now deliberately simple).
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

## System visualization — current state (deliberately simple)

### The core tension
`s223:System` is an **arbitrary logical grouping** (`s223:hasMember`) that can cross physical
equipment boundaries — unlike `s223:contains`/`s223:encloses`, membership doesn't imply physical
containment. A System and the physical containment tree can independently claim the same node as
their "parent," and a single-parent drill-down tree can only honor one.

### What's implemented now
The tension above is resolved by never letting `hasMember` compete for tree position at all:
**every System is always purely logical.** In `modelBuilder.ts`, System membership is resolved
last (after the physical containment tree is built), and it does exactly one thing — for every
`hasMember` edge, record the membership as text:

```ts
for (const [systemUri, memberUris] of systemMembers) {
  for (const memberUri of memberUris) {
    nodes.get(memberUri)!.systemMemberships.push(systemUri);
  }
}
```

- A System **never renders as a box**, at root level or drilled into — `isSystemNode(n)` (exported
  from `modelBuilder.ts`, just `n.typeUri === T.System`) is the single predicate both the `roots`
  computation and `flowBuilder.ts`'s render loop use to exclude it, unconditionally.
- This holds **even when a System has its own explicit `hasBoundaryConnectionPoint`** — e.g.
  Breaker panel1 has 6 real boundary connection points, and still never becomes a box; its 6
  breaker/circuit members are simply wherever `contains`/`encloses`/functional-attachment actually
  puts them (often nowhere else, so they surface as their own root-level boxes), each carrying a
  `member of Breaker panel1` hover-text line (`EquipmentNode.tsx`'s tooltip).
- `ModelNode.systemMemberships: string[]` is the only trace of `hasMember` that survives into the
  tree-shaped model. There's no "how should this System be displayed" decision left to make
  anywhere — no options object, no toggle, no heuristics.

There is no longer a header toggle for this at all — the whole "Systems: ___" control was removed
from `App.tsx`. `buildS223Model(graph)` takes no options.

### History: approaches tried and abandoned
This has been rebuilt three times across the project's history. Each rewrite is preserved so
nothing gets reinvented from scratch if a future session wants to revisit box-rendering for
Systems — **see the `systems-view-experiments` git tag**, which snapshots the commit right before
the final simplification (includes the Flat/Abstracted toggle and majority-container nesting logic
below, fully working, in case that's ever wanted again instead of what's live now):

1. **Every System always renders as its own box** (the original approach): broke because of the
   core tension above — e.g. "Return System" (a return fan + exhaust damper, no
   `hasBoundaryConnectionPoint`) rendered as a disconnected box even though both members are also
   `contains`-children of the AHU. See `git show 0232d0c`.
2. **Heuristic-driven**: a System with no explicit boundary port got nested into whichever
   container held a strict majority of its members (`inferMajorityContainer` — e.g. "Supply
   System" is really just AHU's supply-side subdivision, since 7 of its 8 members are already
   `contains`-children of the AHU), staying purely logical; otherwise it rendered as a real
   root-level box if it had an explicit boundary port or its members' wiring reached outside the
   System. A **Systems: Inferred / Systems: Literal** toggle switched between this and
   RDF-boundary-only. See `git show 33c3fce`, `git show 0232d0c`.
3. **`systemsAsBoxes` display toggle**: kept the majority-container heuristic from (2), but added a
   **Systems: Flat / Systems: Abstracted** toggle — Abstracted mode made a majority-container
   System a real drillable box nested inside that container, *moving* every member into it
   (the one place `hasMember` was allowed to override `contains` as tree parent, since the user
   opted in explicitly). This is the version tagged as `systems-view-experiments`. Before landing
   there, an even softer alternative was tried and rejected within the same session: a dashed
   bounding-box "cluster frame" drawn over the *flattened* layout rather than an actual box to
   drill into (`flowBuilder.ts::computeSystemGroups` + `layout.ts::computeGroupFrameNodes`/
   `computeGroupLabelNodes` + two node components) — abandoned once the user tried it and preferred
   an actual drillable abstraction over a soft visual hint. It also had a real unresolved bug where
   two Systems' frames could overlap and a frame could visually enclose a non-member node, since
   dagre's layout has zero awareness of System membership.

The move from (3) to the current state was a deliberate simplification, not a bug fix: the user
asked to drop the toggle entirely and always flatten, even for Systems with real boundary
ports — one fewer decision surfaced to the user, one axis of behavior removed from the codebase.

### Known gaps / open threads for next session
- **Sensors & Controls view doesn't show `systemMemberships` at all.** `EquipmentNode.tsx` has a
  `member of <System>` tooltip line; `PointNode.tsx` (the equivalent box in the other view) never
  got the same treatment. Inconsistent — worth deciding if it should.
- Only tried against one model (`nist-bdg1-1.ttl`, 4 Systems total, fairly simple topology).
  Trying other real 223P models via "Load .ttl" would be the fastest way to find whether always-
  flatten feels wrong anywhere, before considering resurrecting anything from
  `systems-view-experiments`.

## Brick model support

Brick models are visualized through the **same Equipment tab** as 223P, not a separate view — see
`App.tsx`'s `schemaMode` state (`"s223" | "brick"`) and the **Schema** select next to the file
picker. The key insight: a Brick Point (Sensor/Setpoint/Command/...) reached via
`hasPoint`/`isPointOf` is exactly a 223P Property in spirit — an observable/settable value
declared directly on itself via `qudt:hasUnit`/`hasQuantityKind` (the *same* predicates 223P
Properties use), owned by one piece of equipment. So `lib/brickModelBuilder.ts::buildBrickModel`
folds Points straight into `ModelNode.properties` (reusing `modelBuilder.ts`'s own `buildProperty`
— exported for this) instead of giving them their own box, and only equipment/zone/location
instances become `ModelNode`s at all. That means a Brick model renders through the exact same
`S223Model` shape, and the exact same EquipmentNode/ConnectionEdge/layout/hierarchy pipeline, that
223P models do — no second rendering pipeline, no second view to maintain:
- every Brick instance NOT reached via `hasPoint`/`isPointOf` → a `ModelNode` (equipment/zone/etc.)
- `hasPoint`/`isPointOf` → a `PropertyRef` pushed onto the owning equipment's `properties`
- `hasPart`/`isPartOf`/`hasLocation`/`isLocationOf` → a `"contains"` child edge between two boxes
- `feeds`/`isFedBy` → a `ConnectionEdge`, through a synthetic Outlet/Inlet connection-point pair
  invented per edge (Brick has no connection points of its own) — this is what lets a `feeds`
  edge render as a real dot-to-dot arrow using `EquipmentNode`'s existing per-CP handles.
- What makes a node a Point is **purely relational**: something else declares `hasPoint` on it, or
  it declares `isPointOf` — nothing else. Earlier iterations of this tried to also catch a Point by
  a class-name suffix (Sensor/Setpoint/Command/...) or by it carrying its own
  `qudt:hasUnit`/`hasQuantityKind`, to paper over the bundled `brick-model.ttl`'s incomplete
  `hasPoint` coverage (see below). Both were deliberately reverted: guessing Point-hood from a
  naming convention or an incidental property is exactly the kind of per-file heuristic this
  project avoids elsewhere, and it's not what actually makes something a Point in Brick's own
  model — the `hasPoint`/`isPointOf` relation is.
- Consequence: the bundled `brick-model.ttl` doesn't declare `hasPoint` for every point it has —
  `heaPum_reaTRet`/`heaPum_reaTSup` (Sensors under `heaPum`) and all five `hvac_reaZon*_CO2Zon`
  Sensors (each carrying its own `qudt:hasUnit qudt:PPM`, so they visually look exactly like every
  properly-linked point) are never the target of a `hasPoint` edge from anything. Since nothing
  points at them, they aren't Points under the relational definition — they render as ordinary,
  disconnected boxes, same as `chi`/`heaPum` below, rather than folding into a property list. This
  is a **data gap in the source file**, not a viewer bug: it's showing exactly what the model
  declares, not what a human would guess the modeler meant.
- The BOPTest-specific `ref:*`/`boptestrules:*` predicates in the bundled file (a non-standard
  cross-reference layer on top of Brick, e.g. `ref:equipment "Chiller"` as a *string*, or
  `boptestrules:pointOf brick:AHU` pointing at the **class**, not an instance) are intentionally
  ignored for the same reason — resolving those would need per-file string-matching heuristics, not
  real Brick semantics, even though they *could* recover some of the missing links above.
- `chi` (Chiller) and `heaPum` (HeatPump) show up as unconnected boxes for a different, simpler
  reason: the bundled file never declares `feeds`/`isFedBy` on either of them at all (only `ahu`
  and the 5 VAVs do) — there's no topology data to draw an edge from, regardless of how Points are
  classified.
- The Sensors & Controls toggle row is hidden when `schemaMode === "brick"` (it has nothing to
  show — there's no separate Sensor/Actuator/Function node left once Points become properties).
- `BUNDLED_EXAMPLES` entries carry their own `schema` tag, so picking one from the dropdown sets
  `schemaMode` to match automatically; picking an arbitrary file via "Load .ttl" instead sniffs it
  with `looksLikeBrickGraph` (any node typed in the Brick namespace). Either way, the Schema select
  itself stays a plain, independently-overridable control — per the explicit ask that landed this
  design, there should be a manual schema selector *in addition to* the file selector, not only
  auto-detection.
- Verified against the bundled `brick-model.ttl` (a BOPTEST/BESTEST-Air-derived AHU + 5 VAV/Zone
  pairs + Chiller + HeatPump) via the same tsc/eslint/build + throwaway-Playwright-script pattern
  described above: switching Schema to Brick and picking the bundled example renders AHU → 5×VAV →
  5×Zone `feeds` arrows at root exactly like a 223P Equipment view, and hovering `ahu` shows all 22
  `hasPoint` children as a 22-row property list (name + unit + quantity kind) in the standard
  tooltip — no separate point boxes at all. `chi`, `heaPum`, `heaPum_reaTRet`/`heaPum_reaTSup`, and
  the 5 `_CO2Zon` sensors render as ordinary disconnected boxes, per the data gaps above.
- Not yet tried against any other Brick model — only one bundled example exists so far. Worth
  trying a model with real `hasPart`/`hasLocation` containment (the bundled file only exercises
  `feeds` and `hasPoint`) to check the containment mapping once a second example turns up.

## anywidget / marimo integration

The query-selection clipboard (see above) is now actually consumable from an embedding host, not
just architecturally set up for one: `src/widget/` is a second, parallel front end — an
[anywidget](https://anywidget.dev) ESM module — alongside App.tsx's own SPA, and `python/` is the
Python package that hosts it. Both share the exact same rendering pipeline via
`lib/useEquipmentView.ts` (extracted from what used to be inlined in App.tsx's Equipment tab — see
that file's own header comment), so a change there (or anywhere it depends on: modelBuilder,
flowBuilder, pointsFlowBuilder, layout, viewScope) applies to both automatically.

- `src/widget/entry.tsx` — the anywidget front-end-module entry point (`export default { render }`
  per anywidget's AFM protocol). Mounts `WidgetApp.tsx` into whatever `el` the host hands it.
- `src/widget/WidgetApp.tsx` — a trimmed single-tab (Equipment or Brick, via a `kind` trait)
  version of App.tsx's Equipment tab: same `useEquipmentView` pipeline, same
  `InViewSidebar`/`Breadcrumb`/`FlowCanvas`, but driven by an anywidget model instead of App's
  file-picker state, and — the actual point of this — the clipboard is a **synced trait**
  (`useModelState`, the standard anywidget+React pattern: `model.get`/`model.on("change:...")` in,
  `model.set` + `model.save_changes()` out) instead of local React state that just sits there.
- `src/widget/useModelState.ts` / `anywidgetModel.ts` — the generic anywidget-model React hook and
  a minimal local `AnyModel` type (skipped the `@anywidget/types` package for one interface).
- `vite.widget.config.ts` — separate Vite lib-mode build (`npm run build:widget`) producing a
  single self-contained `widget-dist/{widget.js,widget.css}` (no dependency on the SPA's
  index.html/dev server — anywidget loads `_esm`/`_css` as standalone strings/paths).
- `python/s223_viewer_widget/` — the `anywidget.AnyWidget` subclass (`source`, `kind`, `clipboard`,
  `height` traits) plus the built JS/CSS copied into `static/` (`python/build_widget.sh` rebuilds
  and re-copies after a JS change). `python/README.md` has marimo/Jupyter usage; `python/pyproject.toml`
  is a `uv`-managed package (`cd python && uv sync`).

Verified end-to-end (no real browser available in this environment — Playwright refuses to install
chromium/firefox on this host's Ubuntu 20.04, so this was checked two other ways instead): (1) a
real marimo server (`uv run marimo run examples/demo.py --headless`) loads `S223ViewerWidget` with
the bundled `nist-bdg1-1.ttl` and serves without error; (2) a jsdom-based script imported the
actual built `widget-dist/widget.js`, called its `render({model, el})` with a fake anywidget model
standing in for the Python/comm side, confirmed the query-selection sidebar renders with live data
from the real model (148 instances), and confirmed picking one calls
`model.set("clipboard", [...])` + `model.save_changes()` — the exact mechanism a real host
(marimo's `mo.ui.anywidget(...).value["clipboard"]`, confirmed by reading marimo's own
`from_anywidget.py` source) reads back. Worth a real browser check (Playwright, once available on
a newer host) to confirm React Flow's own layout/rendering inside the widget, since jsdom has no
real layout engine and reports 0 equipment boxes rendered for that reason alone — a jsdom
limitation, not a sign of an actual bug, but not proof either.

## Git state

Clean working tree, all committed, `master` branch, no remote configured. The `systems-view-
experiments` tag marks the commit just before Systems were simplified to always-flatten — see
"History: approaches tried and abandoned" above. Check `git log --oneline` for the current history;
commit messages have real detail on *why*, not just *what*, especially the System-related ones —
worth reading `git show` on those before making further changes there.
