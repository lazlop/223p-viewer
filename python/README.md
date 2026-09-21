# s223-viewer-widget

An [anywidget](https://anywidget.dev) wrapper around 223p-viewer's Equipment/Brick visualization
and query-selection clipboard, for use in Jupyter, JupyterLab, VS Code notebooks, and — the
motivating case — [marimo](https://marimo.io).

anywidget widgets are just an ESM+CSS bundle plus a small Python `traitlets` class; the same
widget works unmodified across every one of those front ends. This package's JS side
(`s223_viewer_widget/static/widget.js` + `widget.css`) is built from the same React source as the
223p-viewer app itself — see `../src/widget/` — so it renders identically and stays in sync with
the app as that evolves (both go through `../src/lib/useEquipmentView.ts`).

## Setup

```bash
cd 223p-viewer/python
uv sync            # installs anywidget, traitlets, and (dev) marimo into ./.venv
```

The JS bundle is already built and committed under `s223_viewer_widget/static/`. If you change
anything under `223p-viewer/src/` (most usefully `src/lib/useEquipmentView.ts` or anything it
depends on — that's the same pipeline App.tsx's Equipment tab uses, or `src/widget/` itself),
rebuild it with:

```bash
cd 223p-viewer        # repo root, not python/
npm install           # only needed once, or after package.json changes
./python/build_widget.sh
```

`build_widget.sh` runs `npm run build:widget` (a separate Vite lib-mode config,
`vite.widget.config.ts`, that bundles `src/widget/entry.tsx` into a single self-contained ES
module — no dependency on the SPA's dev server/index.html, per anywidget's front-end-module
protocol) and copies the result into `s223_viewer_widget/static/{widget.js,widget.css}`. Commit
those two files along with your source change — they're checked in rather than built at install
time, so a `uv sync` alone (no Node involved) is enough for anyone just *using* the widget.

To sanity-check a rebuild, `uv run marimo run examples/demo.py --headless` serves the bundled demo
against the freshly built bundle.

## Use in marimo

```python
import pathlib
import marimo as mo
from s223_viewer_widget import S223ViewerWidget

widget = mo.ui.anywidget(
    S223ViewerWidget(source=pathlib.Path("model.ttl").read_text())
)
widget
```

```python
# in a later cell — reactive: re-runs whenever a pick is made or removed in the UI above
widget.value["clipboard"]
```

`mo.ui.anywidget(...).value` is a plain dict of every synced trait
(`{"source": ..., "kind": ..., "clipboard": [...], "height": ...}`); `widget.kind`,
`widget.source`, etc. also work directly (marimo forwards attribute access to the wrapped
`AnyWidget`).

A runnable example lives at `examples/demo.py` — `uv run marimo edit examples/demo.py` (or
`marimo run` to serve it read-only).

## Use in Jupyter / JupyterLab / VS Code

Identical, no marimo-specific wrapping needed — anywidget's whole point:

```python
from s223_viewer_widget import S223ViewerWidget

widget = S223ViewerWidget(source=open("model.ttl").read())
widget                      # displays inline
widget.clipboard            # read the clipboard directly (a list of dicts) whenever you like
```

## Widget traits

| Trait       | Type                        | Direction        | Notes                                                                                          |
|-------------|-----------------------------|-------------------|--------------------------------------------------------------------------------------------------|
| `source`    | `str`                       | Python → JS       | Raw Turtle text. Reassign to switch models.                                                     |
| `kind`      | `"s223"` \| `"brick"`       | Python ↔ JS       | Which relations to parse `source` with. Both map onto the same model shape. Also exposed as a "223P schema / Brick schema" dropdown in the widget itself, so you can flip it while debugging (e.g. a Brick file rendering as disconnected boxes because `kind` was left at its `"s223"` default) without re-running the notebook cell — the change round-trips back to Python the same way `clipboard` does. |
| `clipboard` | `list[dict]`                | JS → Python       | The query-selection clipboard. Each item has `kind`, `label`, `key`, and `uri` (or, for a literal, `subjectUri`/`predicate`/`value`/...) — see `../src/lib/viewScope.ts`'s `ClipboardItem`. |
| `height`    | `str` (CSS length)          | Python → JS       | Default `"600px"`. Notebook cells have no intrinsic height for the widget's flex layout to size against otherwise. |

Drill-down position, the Sensors & Controls toggles, and the sidebar's open/closed state are kept
as local UI state in the widget and are **not** synced traits — only `clipboard` and `kind`
round-trip back to Python.

## Packaging note

This is set up for local, in-repo use (an editable `uv` install), not publishing. If it's ever
worth publishing, the `[build-system]`/`[tool.hatch.build]` section in `pyproject.toml` is already
set up to include `static/` in a wheel — nothing else should need to change.
