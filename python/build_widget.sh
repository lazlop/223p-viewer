#!/usr/bin/env bash
# Rebuilds the anywidget JS/CSS bundle from src/widget/entry.tsx and copies it into
# s223_viewer_widget/static/, which is what S223ViewerWidget's _esm/_css point at. Run this after
# any change under 223p-viewer/src/ that should reach the widget (App.tsx's Equipment tab and
# src/widget/ share lib/useEquipmentView.ts, so most changes there apply automatically too).
set -euo pipefail

cd "$(dirname "$0")/.."   # 223p-viewer/
npm run build:widget
cp widget-dist/widget.js widget-dist/widget.css python/s223_viewer_widget/static/
echo "Copied widget-dist/{widget.js,widget.css} -> python/s223_viewer_widget/static/"
