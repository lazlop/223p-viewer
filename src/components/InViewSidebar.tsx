import { useState, type ChangeEvent } from "react";
import type { ClipboardItem, InViewScope, ScopeEntity, ScopeLiteral } from "../lib/viewScope";
import { entityClipboardItem, literalClipboardItem } from "../lib/viewScope";

interface EntityPickerProps {
  title: string;
  placeholder: string;
  entities: ScopeEntity[];
  onPick: (entity: ScopeEntity) => void;
}

// Uncontrolled <select> used as a one-shot command picker rather than a state mirror: remounting
// via `key` after every pick is the simplest way to snap it back to the placeholder without
// fighting a controlled `value` that has nothing stable to reflect (the choice isn't "current
// state", it's a fire-and-forget "add this"). Exported for TripleQuerySidebar.tsx (the 223P-widget
// one-hop-triples flow), which reuses this exact picker for its own predicate/instance dropdowns.
export function EntityPicker({ title, placeholder, entities, onPick }: EntityPickerProps) {
  const [resetKey, setResetKey] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const idx = Number(e.target.value);
    if (!Number.isNaN(idx) && entities[idx]) onPick(entities[idx]);
    setResetKey((k) => k + 1);
  };

  return (
    <div className="in-view-sidebar__section">
      <div className="in-view-sidebar__section-title">
        {title} <span className="in-view-sidebar__count">{entities.length}</span>
      </div>
      <select key={resetKey} className="in-view-sidebar__select" defaultValue="" onChange={handleChange} disabled={entities.length === 0}>
        <option value="" disabled>
          {entities.length === 0 ? "none in view" : placeholder}
        </option>
        {entities.map((entity, i) => (
          <option key={entity.uri} value={i} title={entity.uri}>
            {entity.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface LiteralPickerProps {
  literals: ScopeLiteral[];
  onPick: (literal: ScopeLiteral) => void;
}

function LiteralPicker({ literals, onPick }: LiteralPickerProps) {
  const [resetKey, setResetKey] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const idx = Number(e.target.value);
    if (!Number.isNaN(idx) && literals[idx]) onPick(literals[idx]);
    setResetKey((k) => k + 1);
  };

  return (
    <div className="in-view-sidebar__section">
      <div className="in-view-sidebar__section-title">
        Literals <span className="in-view-sidebar__count">{literals.length}</span>
      </div>
      <select key={resetKey} className="in-view-sidebar__select" defaultValue="" onChange={handleChange} disabled={literals.length === 0}>
        <option value="" disabled>
          {literals.length === 0 ? "none in view" : "Add literal…"}
        </option>
        {literals.map((lit, i) => (
          <option key={`${lit.subjectUri}::${lit.predicate}::${lit.value}::${lit.datatype ?? ""}::${lit.language ?? ""}`} value={i} title={lit.predicate}>
            {lit.subjectLabel} · {lit.predicateLabel} = &quot;{lit.value}&quot;
          </option>
        ))}
      </select>
    </div>
  );
}

const KIND_LABEL: Record<ClipboardItem["kind"], string> = {
  instance: "Inst",
  class: "Class",
  predicate: "Pred",
  literal: "Lit",
  triple: "Triple",
};

interface InViewSidebarProps {
  scope: InViewScope;
  clipboard: ClipboardItem[];
  onAdd: (item: ClipboardItem) => void;
  onRemove: (key: string) => void;
  onClear: () => void;
  onClose: () => void;
}

export function InViewSidebar({ scope, clipboard, onAdd, onRemove, onClear, onClose }: InViewSidebarProps) {
  return (
    <aside className="in-view-sidebar">
      <div className="in-view-sidebar__header">
        <span>Query selection</span>
        <button className="in-view-sidebar__close" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>

      <div className="in-view-sidebar__pickers">
        <EntityPicker title="Instances" placeholder="Add instance…" entities={scope.instances} onPick={(e) => onAdd(entityClipboardItem("instance", e))} />
        <EntityPicker title="Classes" placeholder="Add class…" entities={scope.classes} onPick={(e) => onAdd(entityClipboardItem("class", e))} />
        <EntityPicker title="Predicates" placeholder="Add predicate…" entities={scope.predicates} onPick={(e) => onAdd(entityClipboardItem("predicate", e))} />
        <LiteralPicker literals={scope.literals} onPick={(l) => onAdd(literalClipboardItem(l))} />
      </div>

      <div className="in-view-sidebar__clipboard">
        <div className="in-view-sidebar__clipboard-header">
          <span>Clipboard ({clipboard.length})</span>
          {clipboard.length > 0 && (
            <button className="in-view-sidebar__clear" onClick={onClear}>
              Clear
            </button>
          )}
        </div>
        {clipboard.length === 0 ? (
          <div className="in-view-sidebar__empty">Nothing selected yet — pick from the dropdowns above.</div>
        ) : (
          <ul className="in-view-sidebar__clipboard-list">
            {clipboard.map((item) => (
              <li key={item.key} className="in-view-sidebar__clipboard-item">
                <span className="in-view-sidebar__clipboard-kind">{KIND_LABEL[item.kind]}</span>
                <span className="in-view-sidebar__clipboard-label" title={item.uri ?? item.predicate}>
                  {item.label}
                </span>
                <button className="in-view-sidebar__remove" onClick={() => onRemove(item.key)} aria-label={`Remove ${item.label}`}>
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
