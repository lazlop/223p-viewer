# 223p-viewer

A browser app (Vite + React + React Flow, no backend) that visualizes [ASHRAE
223P](https://www.ashrae.org/) RDF/Turtle building models — hardcoded 223P semantics, not a
generic RDF graph viewer. It also understands Brick-schema models via a schema selector, since a
Brick equipment/zone renders the same way once its Points are folded into properties.

Two toggleable views over one parsed model:

- **Equipment** — physical equipment/spaces/systems as boxes, connection points as dots on the
  border, physical `cnx`/`connectsThrough` wiring collapsed into arrows, drill-down hierarchy with
  a breadcrumb.
- **Sensors & Controls** — Sensors/Actuators/Functions as first-class boxes, the Properties they
  reference as pills, and the equipment those properties belong to as clickable reference boxes
  (click jumps back into the Equipment view at the right spot).

Clicking (shift-click to select several) boxes narrows a **query-selection sidebar** — pick
instances/classes/predicates/literals into a clipboard for later use.

The Equipment view's rendering pipeline is also packaged as a standalone
[anywidget](https://anywidget.dev), so it — and the query-selection clipboard — can be embedded in
a Jupyter or marimo notebook instead of only this standalone app. See [`python/README.md`](python/README.md).

## Getting started

```bash
npm install
npm run dev          # http://localhost:3001, HMR
```

The dev server binds `0.0.0.0:3001` (not Vite's default 3000, to avoid clashing with a sibling
project) — see `vite.config.ts`. Load a model via the file picker, or pick one of the bundled
examples in `models/` (also listed in the picker's dropdown): `nist-bdg1-1.ttl` (223P), `b59-building.ttl` (223P), `brick-model.ttl` (Brick).

## Verifying a change

There is no test suite. Instead:

```bash
npx tsc -b            # typecheck — keep clean after every change
npx eslint .          # lint — keep clean too
npx vite build        # production bundle sanity check
```

For anything touching the parsing/layout pipeline, a throwaway script that imports
`modelBuilder`/`hierarchy` directly and prints stats against a bundled `.ttl` is faster than a
browser round-trip. For visual changes, a headless-Chromium Playwright pass is worth it — see
`HANDOFF.md`'s "How to run / verify" section for the exact pattern and a gotcha around Node's
module resolution for scripts living outside this directory.

## Project structure

```
src/
  lib/            parsing (ttlParser), model building (modelBuilder, brickModelBuilder),
                  layout (dagre, in layout.ts), flow/element builders (flowBuilder,
                  pointsFlowBuilder), and useEquipmentView.ts — the shared pipeline both
                  App.tsx's Equipment tab and the anywidget (src/widget/) run through
  components/     React Flow nodes/edges and the sidebar/breadcrumb/tooltip UI
  widget/         the anywidget front-end module (a trimmed, single-tab counterpart of
                  App.tsx's Equipment tab) — see python/README.md
  types/          RDF and 223P-model TypeScript types
  App.tsx         the standalone app: tabs, file picker, schema selector, both views
models/           bundled example .ttl files (223P and Brick)
python/           the anywidget/marimo packaging — see python/README.md
```

## Further reading

- [`HANDOFF.md`](HANDOFF.md) — the deep-context doc: design history (including approaches tried
  and abandoned for visualizing Systems — read this before changing that), Brick-model support
  details, and the anywidget/marimo integration notes. Start here before non-trivial changes.
- [`python/README.md`](python/README.md) — the anywidget package: setup, rebuilding the JS bundle,
  using the widget from marimo/Jupyter, and the synced-trait reference.
