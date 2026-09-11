import { memo, type CSSProperties } from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { FlowCP, FlowNodeData } from "../../lib/flowBuilder";
import { RELATION_LABELS } from "../../lib/pointsFlowBuilder";
import { MemberRows, PropertyRows } from "../PropertyTooltip";

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

function EquipmentNodeImpl({ data }: NodeProps<EquipmentNodeType>) {
  const left = data.connectionPoints.filter((cp) => sideFor(cp) === Position.Left);
  const right = data.connectionPoints.filter((cp) => sideFor(cp) === Position.Right);
  const pointClass = data.pointKind ? ` equipment-node--point equipment-node--point-${data.pointKind}` : "";
  const mutedClass = data.muted ? " equipment-node--muted" : "";
  const highlightedClass = data.highlighted ? " equipment-node--highlighted" : "";
  const selectedClass = data.selected ? " equipment-node--selected" : "";

  return (
    <div className={`equipment-node equipment-node--${data.kind}${pointClass}${mutedClass}${highlightedClass}${selectedClass}`}>
      {/* Handle-less fallback anchor: a "rolled up" connection edge (its real endpoint is nested
          inside a container that isn't expanded at this view level — see hierarchy.ts::projectEdges)
          carries no sourceHandle/targetHandle id, since it doesn't correspond to one exact
          connection point. Without an id-less Handle to match against, React Flow can't anchor the
          edge at all and silently drops it — this hit every rolled-up edge landing on a node with
          zero owned connection points (e.g. Floor1, a pure container) and even ones with real CP
          handles (the rollup still doesn't reference any specific one). One invisible handle of
          each type keeps those edges rendering without altering the visible per-CP dots. */}
      <Handle type="target" position={Position.Left} className="equipment-node__fallback-handle" />
      <Handle type="source" position={Position.Left} className="equipment-node__fallback-handle" />
      {left.map((cp, i) => (
        <ConnectionDot key={cp.uri} cp={cp} position={Position.Left} offsetPct={((i + 1) / (left.length + 1)) * 100} />
      ))}
      {right.map((cp, i) => (
        <ConnectionDot key={cp.uri} cp={cp} position={Position.Right} offsetPct={((i + 1) / (right.length + 1)) * 100} />
      ))}

      <div className="equipment-node__label">{data.label}</div>
      {data.typeName && <div className="equipment-node__type">{data.typeName}</div>}
      {data.hasChildren && <div className="equipment-node__hint">double-click to open</div>}

      {(data.properties.length > 0 ||
        data.groupMemberships.length > 0 ||
        (data.instrumentation && data.instrumentation.length > 0) ||
        (data.members && data.members.length > 0)) && (
        <div className="equipment-node__tooltip nowheel">
           {data.members && <MemberRows members={data.members} onMemberClick={data.onMemberClick} />}
           {data.groupMemberships.length > 0 && (
             <div className="tooltip-row">
               <strong>member of</strong> {data.groupMemberships.join(", ")}
             </div>
           )}
           <PropertyRows properties={data.properties} />
           {data.instrumentation?.map((item, i) => (
             <div key={i} className="tooltip-row">
               <strong>{RELATION_LABELS[item.relation]}</strong>
               {item.targetLabel ? ` ${item.targetLabel}` : ""}
             </div>
           ))}
        </div>
      )}
    </div>
  );
}

export const EquipmentNode = memo(EquipmentNodeImpl);
