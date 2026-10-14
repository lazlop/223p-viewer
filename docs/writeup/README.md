# Write-ups: semantic visual reduction in 223p-viewer

Two write-ups on how the viewer serves several user mental models (inventory, topology, data &
control) as connected views over one semantic model, how it uses 223P/Brick semantics to decide
what each view draws, how it avoids overwhelming the user with progressive disclosure, and how
common building ontologies support each view.

- [`paper/paper.tex`](paper/paper.tex) + [`paper/refs.bib`](paper/refs.bib): academic paper draft
  (two-column `article`; swap the `\documentclass` line for a venue template such as `acmart`).
  Build with `pdflatex paper && bibtex paper && pdflatex paper && pdflatex paper` from `paper/`,
  or upload `paper/` and `figures/` together to Overleaf. Figures are referenced as `../figures/`.
- [`blog-post.md`](blog-post.md): blog post covering the same material for a general technical audience.
- [`figures/`](figures/): screenshots of the running app, used by both write-ups.

The numbers in the paper's evaluation table come from running the app's own pipeline
(`parseTtl` → `buildS223Model`/`buildBrickModel` → `buildFlowElements`/`buildInstrumentationOverlay`)
over the bundled models in `models/` at commit `326384c`. Re-run them if the pipeline changes.
