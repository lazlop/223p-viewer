import { BaseEdge, EdgeLabelRenderer, getBezierPath, type Edge, type EdgeProps } from "@xyflow/react";
import type { PointsFlowEdgeData, PointsRelation } from "../../lib/pointsFlowBuilder";

type InstrumentationEdgeType = Edge<PointsFlowEdgeData, "instrumentationEdge">;

const RELATION_LABELS: Record<PointsRelation, string> = {
  observes: "observes",
  actuatedByProperty: "actuates",
  hasInput: "input",
  hasOutput: "output",
  hasObservationLocation: "location",
  hasPhysicalLocation: "location",
  executedBy: "executed by",
  hasProperty: "owned by",
};

export function InstrumentationEdge({
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
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={{ stroke: "#adb5bd", strokeWidth: 1.25 }} />
      {data && (
        <EdgeLabelRenderer>
          <div
            className="instrumentation-edge-label"
            style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}
          >
            {RELATION_LABELS[data.relation]}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
