import { memo } from "react";
import { BaseEdge, EdgeLabelRenderer, getBezierPath, type Edge, type EdgeProps } from "@xyflow/react";
import { RELATION_LABELS, type PointsFlowEdgeData } from "../../lib/pointsFlowBuilder";

type InstrumentationEdgeType = Edge<PointsFlowEdgeData, "instrumentationEdge">;

function InstrumentationEdgeImpl({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}: EdgeProps<InstrumentationEdgeType>) {
  const [edgePath, labelX, labelY] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: "#adb5bd",
          strokeWidth: data?.rolledUp ? 1 : 1.25,
          strokeDasharray: data?.rolledUp ? "5 4" : undefined,
        }}
      />
      {data && (
        <EdgeLabelRenderer>
          <div
            className="instrumentation-edge-hit"
            style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}
          >
            <div className="instrumentation-edge-label">{RELATION_LABELS[data.relation]}</div>
            {data.rolledUp && (
              <div className="instrumentation-edge-tooltip">
                <div className="tooltip-meta">via nested equipment — drill in to see the exact link</div>
              </div>
            )}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

export const InstrumentationEdge = memo(InstrumentationEdgeImpl);
