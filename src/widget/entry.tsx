import { createRoot, type Root } from "react-dom/client";
import { StrictMode } from "react";
import { WidgetApp } from "./WidgetApp";
import type { AnyModel, WidgetModelState } from "./anywidgetModel";
import "../App.css";
import "./widget.css";

/** anywidget's ESM widget protocol (https://anywidget.dev/en/afm/#anywidget-front-end-module):
 * a default export with a `render({ model, el })` that mounts into the given element and may
 * return a cleanup function, called when the view is destroyed (cell re-run, widget closed, ...).
 * `el` is a plain DOM node handed to us by whichever front end is hosting this (JupyterLab, VS
 * Code, Colab, marimo — anywidget itself is what makes this front-end-agnostic). */
function render({ model, el }: { model: AnyModel<WidgetModelState>; el: HTMLElement }) {
  const container = document.createElement("div");
  el.appendChild(container);
  const root: Root = createRoot(container);
  root.render(
    <StrictMode>
      <WidgetApp model={model} />
    </StrictMode>,
  );
  return () => root.unmount();
}

export default { render };
