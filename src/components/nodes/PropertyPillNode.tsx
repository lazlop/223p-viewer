import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { PointsFlowNodeData } from "../../lib/pointsFlowBuilder";

type PropertyPillNodeType = Node<PointsFlowNodeData, "propertyPill">;

export function PropertyPillNode({ data }: NodeProps<PropertyPillNodeType>) {
  const inline = [data.value, data.unitSymbol].filter(Boolean).join(" ");
  const hasDetail = Boolean(data.quantityKind) || Boolean(data.enumerationKind) || (data.mapsTo?.length ?? 0) > 0;

  return (
    <div className="points-node points-node--property">
      <Handle type="target" position={Position.Left} />
      <div className="points-node__label">{data.label}</div>
      {inline && <div className="points-node__pill-value">{inline}</div>}
      {hasDetail && (
        <div className="points-node__tooltip">
          {data.quantityKind && (
            <div className="tooltip-row">
              <strong>quantity kind</strong> {data.quantityKind}
            </div>
          )}
          {data.enumerationKind && (
            <div className="tooltip-row">
              <strong>enumeration</strong> {data.enumerationKind}
            </div>
          )}
          {data.mapsTo && data.mapsTo.length > 0 && (
            <div className="tooltip-ref">
              ↦ external ref{data.mapsTo.length > 1 ? "s" : ""}: {data.mapsTo.length}
            </div>
          )}
        </div>
      )}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
