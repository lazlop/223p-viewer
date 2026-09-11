/** Minimal slice of anywidget's AFM (`AnyModel`) surface this widget depends on — good enough to
 * avoid taking a dependency on @anywidget/types just for one interface. See
 * https://anywidget.dev/en/afm/ for the full protocol; anywidget's Python side implements this via
 * a standard Jupyter Comm, so it works identically in JupyterLab, VS Code, Colab, and marimo. */
export interface AnyModel<T extends Record<string, unknown> = Record<string, unknown>> {
  get<K extends keyof T>(key: K): T[K];
  set<K extends keyof T>(key: K, value: T[K]): void;
  save_changes(): void;
  on(event: string, callback: () => void): void;
  off(event: string, callback: () => void): void;
}

export interface WidgetModelState extends Record<string, unknown> {
  /** Raw Turtle text for the model to visualize. Set from Python; the widget re-parses whenever
   * it changes. */
  source: string;
  /** Which builder to run `source` through — both map onto the same S223Model shape, so
   * everything downstream (layout, drill-down, the query-selection sidebar) is unaffected. */
  kind: "s223" | "brick";
  /** The query-selection clipboard (see lib/viewScope.ts's ClipboardItem) — the whole point of
   * this widget existing: built by clicking around the visualization, read back out from Python
   * (e.g. `widget.clipboard`) to drive a SPARQL query or similar downstream in a marimo notebook. */
  clipboard: Record<string, unknown>[];
  /** CSS height for the widget's root element (e.g. "600px"); notebook cells have no intrinsic
   * height to size a flex layout against otherwise. */
  height: string;
}
