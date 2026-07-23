import { useCallback, useMemo, useState, type ChangeEvent } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import defaultModelTtl from "../models/nist-bdg1-1.ttl?raw";
import { parseTtl } from "./lib/ttlParser";
import { buildS223Model } from "./lib/modelBuilder";
import { collapseConnections } from "./lib/connectionTopology";
import { childrenOf, pathTo, rootNodes } from "./lib/hierarchy";
import { buildFlowElements } from "./lib/flowBuilder";
import { layoutGraph } from "./lib/layout";
import { FlowCanvas } from "./components/FlowCanvas";
import { Breadcrumb } from "./components/Breadcrumb";
import type { S223Model } from "./types/s223";
import "./App.css";

function buildModel(text: string): S223Model {
  const { graph } = parseTtl(text);
  const model = buildS223Model(graph);
  model.edges = collapseConnections(graph, model);
  return model;
}

export default function App() {
  const [source, setSource] = useState(defaultModelTtl);
  const [fileName, setFileName] = useState("nist-bdg1-1.ttl (bundled example)");
  const [containerUri, setContainerUri] = useState<string | null>(null);

  const model = useMemo(() => buildModel(source), [source]);

  const path = useMemo(() => (containerUri ? pathTo(model, containerUri) : []), [model, containerUri]);

  const visibleUris = useMemo(() => {
    const list = containerUri ? childrenOf(model, containerUri) : rootNodes(model);
    return new Set(list.map((n) => n.uri));
  }, [model, containerUri]);

  const { nodes, edges } = useMemo(() => {
    const flow = buildFlowElements(model, visibleUris, containerUri ?? undefined);
    const laidOutNodes = layoutGraph(flow.nodes, flow.edges, (n) => n.data.connectionPoints.length);
    return { nodes: laidOutNodes, edges: flow.edges };
  }, [model, visibleUris, containerUri]);

  const handleNodeDoubleClick = useCallback(
    (nodeId: string) => {
      const node = model.nodes.get(nodeId);
      if (node && node.children.length > 0) setContainerUri(nodeId);
    },
    [model],
  );

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSource(String(reader.result));
      setFileName(file.name);
      setContainerUri(null);
    };
    reader.readAsText(file);
  }, []);

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__title">223P Model Viewer</div>
        <Breadcrumb path={path} onNavigate={setContainerUri} />
        <div className="app__file">
          <span className="app__file-name" title={fileName}>
            {fileName}
          </span>
          <label className="app__file-button">
            Load .ttl
            <input type="file" accept=".ttl,text/turtle" onChange={handleFileChange} hidden />
          </label>
        </div>
      </header>
      <div className="app__canvas">
        <ReactFlowProvider>
          <FlowCanvas nodes={nodes} edges={edges} viewKey={containerUri ?? "__root__"} onNodeDoubleClick={handleNodeDoubleClick} />
        </ReactFlowProvider>
      </div>
    </div>
  );
}
