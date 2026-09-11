import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

/**
 * Invisible waypoint spliced into a physical connection arrow so a connection-owned property's
 * pill has a real node to point an edge at (see pointsFlowBuilder.ts's connection-owned-properties
 * pass) — rendered as just a small dot sitting on the arrow, with the arrow itself continuing
 * through it via two connectionEdge segments.
 */
function ConnectionJunctionNodeImpl() {
  return (
    <div className="connection-junction-node">
      <Handle type="target" id="in" position={Position.Left} />
      <Handle type="source" id="out" position={Position.Right} />
      <Handle type="target" id="prop" position={Position.Top} />
      <div className="connection-junction-node__dot" />
    </div>
  );
}

export const ConnectionJunctionNode = memo(ConnectionJunctionNodeImpl);
