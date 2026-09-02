import type { FlowMember, FlowProperty } from "../lib/flowBuilder";

const MEMBER_PREVIEW_COUNT = 12;

/** BSchema view: the real building instances a bschema class summarizes, in its properties
 * hover box. Navigable members (resolve to something in the paired building model) are clickable
 * links to Equipment view; others render as inert text. Long lists are truncated with a count. */
export function MemberRows({ members, onMemberClick }: { members: FlowMember[]; onMemberClick?: (uri: string) => void }) {
  if (members.length === 0) return null;
  const shown = members.slice(0, MEMBER_PREVIEW_COUNT);
  const hiddenCount = members.length - shown.length;
  return (
    <div className="tooltip-members">
      <div className="tooltip-members__header">Members ({members.length})</div>
      {shown.map((m) => (
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
      {hiddenCount > 0 && <div className="tooltip-members__more">+{hiddenCount} more</div>}
    </div>
  );
}

export function PropertyRows({ properties }: { properties: FlowProperty[] }) {
  if (properties.length === 0) return null;
  return (
    <>
      {properties.map((p, i) => (
        <div key={`${p.label}-${i}`} className="tooltip-row">
          <strong>{p.label}</strong>{" "}
          {p.value !== undefined && <span>{p.value}</span>}
          {p.unitSymbol && <span> {p.unitSymbol}</span>}
          {p.quantityKind && <span className="tooltip-meta"> ({p.quantityKind})</span>}
          {p.enumerationKind && <span className="tooltip-meta"> [{p.enumerationKind}]</span>}
          {p.mapsTo.length > 0 && (
            <div className="tooltip-ref">
              ↦ external ref{p.mapsTo.length > 1 ? "s" : ""}: {p.mapsTo.length}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
