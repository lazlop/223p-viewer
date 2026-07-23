import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { PointsFlowNodeData } from "../../lib/pointsFlowBuilder";

type ReferenceNodeType = Node<PointsFlowNodeData, "referenceNode">;

export function ReferenceNode({ data }: NodeProps<ReferenceNodeType>) {
  return (
    <div className="points-node points-node--reference">
      <Handle type="target" position={Position.Left} />
      <div className="points-node__label">{data.label}</div>
      {data.typeName && <div className="points-node__type">{data.typeName}</div>}
      <div className="points-node__hint">click to view in Equipment view ↗</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
