import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { PointsFlowNodeData } from "../../lib/pointsFlowBuilder";
import { PropertyRows } from "../PropertyTooltip";

type PointNodeType = Node<PointsFlowNodeData, "pointNode">;

export function PointNode({ data }: NodeProps<PointNodeType>) {
  return (
    <div className="points-node points-node--point">
      <Handle type="target" position={Position.Left} />
      <div className="points-node__label">{data.label}</div>
      {data.typeName && <div className="points-node__type">{data.typeName}</div>}
      {data.ownProperties && data.ownProperties.length > 0 && (
        <div className="points-node__tooltip">
          <PropertyRows properties={data.ownProperties} />
        </div>
      )}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
