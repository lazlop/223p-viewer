import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { PropertyPillNodeData } from "../../lib/pointsFlowBuilder";

type PropertyPillNodeType = Node<PropertyPillNodeData, "propertyPill">;

export function PropertyPillNode({ data }: NodeProps<PropertyPillNodeType>) {
  return (
    <div className="property-pill-node">
      <Handle type="target" position={Position.Left} />
      <div className="property-pill-node__label">{data.label}</div>
      {(data.value !== undefined || data.unitSymbol) && (
        <div className="property-pill-node__value">
          {data.value}
          {data.unitSymbol && ` ${data.unitSymbol}`}
        </div>
      )}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
