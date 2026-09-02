import type { FlowMember, FlowProperty } from "../lib/flowBuilder";

/** BSchema view: the real building instances a bschema class summarizes, in its properties
 * hover box. Navigable members (resolve to something in the paired building model) are clickable
 * links to Equipment view; others render as inert text. The hover box scrolls (see
 * .equipment-node__tooltip in App.css) so the full list is reachable rather than truncated. */
export function MemberRows({ members, onMemberClick }: { members: FlowMember[]; onMemberClick?: (uri: string) => void }) {
  if (members.length === 0) return null;
  return (
    <div className="tooltip-members">
      <div className="tooltip-members__header">Members ({members.length})</div>
      {members.map((m) => (
        <div key={m.uri} className="tooltip-row">
          {m.navigable ? (
            <button
              type="button"
              className="tooltip-member-link"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onMemberClick?.(m.uri);
              }}
            >
              {m.label}
            </button>
          ) : (
            <span className="tooltip-member-inert">{m.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export function PropertyRows({ properties }: { properties: FlowProperty[] }) {
  if (properties.length === 0) return null;
  return (
    <div className="tooltip-properties">
      <div className="tooltip-properties__header">Properties ({properties.length})</div>
      {properties.map((p, i) => (
        <div key={`${p.label}-${i}`} className="tooltip-row">
          <strong>{p.label}</strong>{" "}
          {p.value !== undefined && <span>{p.value}</span>}
          {p.unitSymbol && <span> {p.unitSymbol}</span>}
          {p.quantityKind && <span className="tooltip-meta"> ({p.quantityKind})</span>}
          {p.enumerationKind && <span className="tooltip-meta"> [{p.enumerationKind}]</span>}
        </div>
      ))}
    </div>
  );
}
