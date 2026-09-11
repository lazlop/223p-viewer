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
    query-selection clipboard built by clicking instances/classes/predicates/literals in the UI.

    Traits (all `sync=True`, so both directions of a change propagate over the widget's comm):
      - `source`: the raw Turtle text to visualize. Set this to switch models.
      - `kind`: `"s223"` (default) or `"brick"` — which relations `source` is parsed with. Both
        map onto the same internal model shape, so drill-down/layout/the clipboard sidebar behave
        identically either way.
      - `clipboard`: the list of picks from the UI's "Query selection" sidebar, each a dict with
        at least `kind` (`"instance" | "class" | "predicate" | "literal"`), `label`, and `key`,
        plus `uri` for the first three or `subjectUri`/`predicate`/`value`/... for a literal (see
        223p-viewer's src/lib/viewScope.ts::ClipboardItem for the exact shape). This is the trait
        a notebook actually reads out — everything else is just what's needed to render.
      - `height`: CSS height for the widget's root element (e.g. `"600px"`) — notebook cells have
        no intrinsic height for the widget's internal flex layout to size against otherwise.
    """

    _esm = _STATIC_DIR / "widget.js"
    _css = _STATIC_DIR / "widget.css"

    source = traitlets.Unicode("").tag(sync=True)
    kind = traitlets.Enum(["s223", "brick"], default_value="s223").tag(sync=True)
    clipboard = traitlets.List(trait=traitlets.Dict()).tag(sync=True)
    height = traitlets.Unicode("600px").tag(sync=True)
