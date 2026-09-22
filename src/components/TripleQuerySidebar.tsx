import type { ClipboardItem, InViewScope, ScopeEntity } from "../lib/viewScope";
import { entityClipboardItem } from "../lib/viewScope";
import { EntityPicker } from "./InViewSidebar";

interface TripleQuerySidebarProps {
  scope: InViewScope;
  clipboard: ClipboardItem[];
  onAddPredicateFilter: (item: ClipboardItem) => void;
  onPickInstance: (entity: ScopeEntity) => void;
  onRemove: (key: string) => void;
  onClear: () => void;
  onClose: () => void;
}

/**
 * The 223P-widget "query selection" sidebar (see viewScope.ts's computeOneHopTriples): instead of
 * adding instances/classes/predicates as standalone references, you pick which predicates to
 * traverse (hasUnit, hasAspect, type, contains, ...) — those live in the clipboard as ordinary
 * `kind: "predicate"` entries, doubling as the active filter — then pick an instance to pull every
 * triple where it's the subject or object on one of those predicates. The resulting `kind: "triple"`
 * entries are what an embedding host (another repo) reads back to build a descriptive SPARQL query;
 * see WidgetApp.tsx and python/s223_viewer_widget for how the clipboard trait is synced out.
 */
export function TripleQuerySidebar({ scope, clipboard, onAddPredicateFilter, onPickInstance, onRemove, onClear, onClose }: TripleQuerySidebarProps) {
  const activePredicates = clipboard.filter((item) => item.kind === "predicate");
  const triples = clipboard.filter((item) => item.kind === "triple");

  return (
    <aside className="in-view-sidebar">
      <div className="in-view-sidebar__header">
        <span>Query selection</span>
        <button className="in-view-sidebar__close" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>

      <div className="in-view-sidebar__pickers">
        <EntityPicker
          title="Predicates to include"
          placeholder="Add predicate to filter…"
          entities={scope.predicates}
          onPick={(e) => onAddPredicateFilter(entityClipboardItem("predicate", e))}
        />
        {activePredicates.length > 0 && (
          <ul className="in-view-sidebar__chip-list">
            {activePredicates.map((item) => (
              <li key={item.key} className="in-view-sidebar__chip" title={item.uri}>
                {item.label}
                <button className="in-view-sidebar__remove" onClick={() => onRemove(item.key)} aria-label={`Remove ${item.label}`}>
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <EntityPicker
          title="Instances"
          placeholder={activePredicates.length === 0 ? "Pick predicates above first" : "Pull one-hop graph…"}
          entities={activePredicates.length === 0 ? [] : scope.instances}
          onPick={onPickInstance}
        />
      </div>

      <div className="in-view-sidebar__clipboard">
        <div className="in-view-sidebar__clipboard-header">
          <span>Triples ({triples.length})</span>
          {clipboard.length > 0 && (
            <button className="in-view-sidebar__clear" onClick={onClear}>
              Clear
            </button>
          )}
        </div>
        {triples.length === 0 ? (
          <div className="in-view-sidebar__empty">
            Pick predicates to include above, then pick an instance to pull its one-hop graph on those predicates.
          </div>
        ) : (
          <ul className="in-view-sidebar__clipboard-list">
            {triples.map((item) => (
              <li
                key={item.key}
                className="in-view-sidebar__clipboard-item"
                title={`${item.subjectUri ?? ""}  ${item.predicate ?? ""}  ${item.isLiteral ? item.value : (item.objectUri ?? "")}`}
              >
                <span className="in-view-sidebar__clipboard-label">{item.label}</span>
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
