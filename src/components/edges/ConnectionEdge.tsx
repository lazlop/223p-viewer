import { memo } from "react";
import { BaseEdge, EdgeLabelRenderer, getBezierPath, type Edge, type EdgeProps } from "@xyflow/react";
import type { FlowEdgeData } from "../../lib/flowBuilder";
import { PropertyRows } from "../PropertyTooltip";

type ConnectionEdgeType = Edge<FlowEdgeData, "connectionEdge">;

function ConnectionEdgeImpl({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}: EdgeProps<ConnectionEdgeType>) {
  const [edgePath, labelX, labelY] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const hasDetail = Boolean(data?.hubLabel) || Boolean(data?.medium) || (data?.properties.length ?? 0) > 0;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: data?.rolledUp ? "#adb5bd" : "#495057",
          strokeWidth: data?.rolledUp ? 1.25 : 1.75,
          strokeDasharray: data?.rolledUp ? "5 4" : undefined,
        }}
      />
      {hasDetail && (
        <EdgeLabelRenderer>
          <div
            className="connection-edge-hit"
            style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}
          >
            <div className="connection-edge-dot" />
            <div className="connection-edge-tooltip">
              {data?.hubLabel && <strong>{data.hubLabel}</strong>}
              {data?.medium && <div>{data.medium}</div>}
              {data?.rolledUp && <div className="tooltip-meta">via nested equipment — drill in to see the exact link</div>}
              {data && <PropertyRows properties={data.properties} />}
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

export const ConnectionEdge = memo(ConnectionEdgeImpl);
