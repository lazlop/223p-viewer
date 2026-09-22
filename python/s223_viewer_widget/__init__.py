"""anywidget wrapper around the 223p-viewer visualization + query-selection clipboard.

anywidget (https://anywidget.dev) widgets are plain ESM+CSS bundles hosted by a small Python
traitlets class, so the same widget works unmodified in Jupyter, JupyterLab, VS Code notebooks,
Google Colab, and marimo. In marimo specifically, wrap an instance with `mo.ui.anywidget(...)` to
get it into marimo's own reactive dataflow graph.

Example::

    import pathlib
    import marimo as mo
    from s223_viewer_widget import S223ViewerWidget

    widget = mo.ui.anywidget(
        S223ViewerWidget(source=pathlib.Path("model.ttl").read_text())
    )
    widget

    # in a later cell — reacts whenever the notebook clipboard changes in the UI above:
    widget.value["clipboard"]

See this package's README.md for how to (re)build the JS bundle in static/ from the 223p-viewer
TypeScript source (src/widget/entry.tsx) after changing anything under src/.
"""

from __future__ import annotations

import pathlib

import anywidget
import traitlets

_STATIC_DIR = pathlib.Path(__file__).parent / "static"

__all__ = ["S223ViewerWidget"]


class S223ViewerWidget(anywidget.AnyWidget):
    """Drill-down box-and-arrow view of an ASHRAE 223P or Brick RDF/Turtle model, plus a
    query-selection clipboard built from the UI's "Query selection" sidebar.

    Traits (all `sync=True`, so both directions of a change propagate over the widget's comm):
      - `source`: the raw Turtle text to visualize. Set this to switch models.
      - `kind`: `"s223"` (default) or `"brick"` — which relations `source` is parsed with. Both
        map onto the same internal model shape, so drill-down/layout behave identically either
        way, but the "Query selection" sidebar itself differs by kind (see `clipboard` below).
      - `clipboard`: the list of picks from the sidebar, each a dict with at least `kind`, `label`,
        and `key`. Shape depends on `kind`:
          - `"s223"` mode: pick which predicates to traverse (e.g. `hasUnit`, `hasAspect`, `type`,
            `contains`), then pick an instance to pull its one-hop graph on those predicates.
            `clipboard` then holds two item kinds — `"predicate"` entries (`uri` set) that are the
            *active filter*, plus `"triple"` entries for every triple where a picked instance was
            the subject or the object on one of those predicates: `subjectUri`/`subjectLabel`,
            `predicate`/`predicateLabel`, and either `objectUri`/`objectLabel` (a resource object)
            or `value`/`datatype`/`language` with `isLiteral: true` (a literal object), plus
            `sourceUri`/`sourceLabel` naming which instance pick produced it. This is the shape
            meant to be read out by another repo to build a descriptive SPARQL query.
          - `"brick"` mode: the original flat reference list — `kind` is
            `"instance" | "class" | "predicate" | "literal"`, with `uri` set for the first three or
            `subjectUri`/`predicate`/`value`/... for a literal.
        See 223p-viewer's src/lib/viewScope.ts::ClipboardItem for the exact TypeScript shape.
      - `height`: CSS height for the widget's root element (e.g. `"600px"`) — notebook cells have
        no intrinsic height for the widget's internal flex layout to size against otherwise.
    """

    _esm = _STATIC_DIR / "widget.js"
    _css = _STATIC_DIR / "widget.css"

    source = traitlets.Unicode("").tag(sync=True)
    kind = traitlets.Enum(["s223", "brick"], default_value="s223").tag(sync=True)
    clipboard = traitlets.List(trait=traitlets.Dict()).tag(sync=True)
    height = traitlets.Unicode("600px").tag(sync=True)
