import type { CSSProperties } from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { FlowCP, FlowNodeData } from "../../lib/flowBuilder";
import { PropertyRows } from "../PropertyTooltip";

type EquipmentNodeType = Node<FlowNodeData, "equipmentNode">;

const CP_COLOR: Record<FlowCP["kind"], string> = {
  Inlet: "#4C6EF5",
  Outlet: "#F08C00",
  Bidirectional: "#37B24D",
  Other: "#868E96",
};

function sideFor(cp: FlowCP): Position {
  return cp.kind === "Outlet" ? Position.Right : Position.Left;
}

function ConnectionDot({ cp, position, offsetPct }: { cp: FlowCP; position: Position; offsetPct: number }) {
  const isLeft = position === Position.Left;
  // Two handles stacked exactly on top of each other, same id: React Flow resolves an edge's
  // `sourceHandle`/`targetHandle` by (nodeId, handleId, handleType), so a connection point that
  // must sometimes act as a source (outlet) and sometimes as a target (inlet, or a boundary link
  // arriving from a container frame) needs both roles registered at the same visual dot.
  const dotStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    transform: "none",
    borderRadius: "50%",
    background: CP_COLOR[cp.kind],
    border: "2px solid var(--bg)",
  };
  const wrapStyle: CSSProperties = {
    position: "absolute",
    top: `${offsetPct}%`,
    width: 10,
    height: 10,
    ...(isLeft ? { left: -6 } : { right: -6 }),
  };
  return (
    <div className="cp-dot-wrap" style={wrapStyle}>
      <Handle type="target" id={cp.uri} position={position} style={dotStyle} />
      <Handle type="source" id={cp.uri} position={position} style={dotStyle} />
      <div className={`cp-tooltip ${isLeft ? "cp-tooltip--left" : "cp-tooltip--right"}`}>
        <strong>{cp.label}</strong>
        <div>
          {cp.kind}
          {cp.medium ? ` · ${cp.medium}` : ""}
        </div>
      </div>
    </div>
  );
}

export function EquipmentNode({ data }: NodeProps<EquipmentNodeType>) {
  const left = data.connectionPoints.filter((cp) => sideFor(cp) === Position.Left);
  const right = data.connectionPoints.filter((cp) => sideFor(cp) === Position.Right);

  return (
    <div className={`equipment-node equipment-node--${data.kind}`}>
      {left.map((cp, i) => (
        <ConnectionDot key={cp.uri} cp={cp} position={Position.Left} offsetPct={((i + 1) / (left.length + 1)) * 100} />
      ))}
      {right.map((cp, i) => (
        <ConnectionDot key={cp.uri} cp={cp} position={Position.Right} offsetPct={((i + 1) / (right.length + 1)) * 100} />
      ))}

      <div className="equipment-node__label">{data.label}</div>
      {data.typeName && <div className="equipment-node__type">{data.typeName}</div>}
      {data.hasChildren && <div className="equipment-node__hint">double-click to open</div>}

      {data.properties.length > 0 && (
        <div className="equipment-node__tooltip">
          <PropertyRows properties={data.properties} />
        </div>
      )}
    </div>
  );
}
