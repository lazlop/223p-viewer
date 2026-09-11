import marimo

__generated_with = "0.24.1"
app = marimo.App()


@app.cell
def _():
    import pathlib
    import marimo as mo
    from s223_viewer_widget import S223ViewerWidget

    models_dir = pathlib.Path(__file__).parent.parent.parent / "models"
    source = (models_dir / "nist-bdg1-1.ttl").read_text()

    widget = mo.ui.anywidget(S223ViewerWidget(source=source, height="620px"))
    widget
    return mo, widget


@app.cell
def _(mo, widget):
    mo.md(f"Clipboard has **{len(widget.value['clipboard'])}** item(s).")
    return


@app.cell
def _(widget):
    widget.value["clipboard"]
    return


if __name__ == "__main__":
    app.run()
