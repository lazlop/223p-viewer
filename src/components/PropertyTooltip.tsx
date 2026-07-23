import type { FlowProperty } from "../lib/flowBuilder";

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
