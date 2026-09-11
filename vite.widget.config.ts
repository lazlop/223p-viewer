import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Builds src/widget/entry.tsx as a single self-contained ES module (React and all) plus one CSS
// file, per anywidget's front-end module protocol (https://anywidget.dev/en/afm/) — anywidget
// loads _esm/_css as plain strings/paths and injects them itself, so this has to be a standalone
// bundle with no runtime dependency on the app's own index.html/dev server. See
// python/s223_viewer_widget for the Python side that points at this build's output.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "widget-dist",
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: "src/widget/entry.tsx",
      formats: ["es"],
      fileName: () => "widget.js",
    },
    rollupOptions: {
      output: {
        // Fixed names (no content hash) so python/s223_viewer_widget/__init__.py can point at a
        // stable path across rebuilds.
        assetFileNames: "widget.[ext]",
      },
    },
  },
});
