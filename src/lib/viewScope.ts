import type { RdfGraph } from "../types/rdf";
import type { S223Model } from "../types/s223";
import { projectEdges } from "./hierarchy";
import { RDFS, localName } from "./namespaces";

const RDF_TYPE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
const RDFS_LABEL = `${RDFS}label`;

export interface ScopeEntity {
  uri: string;
  label: string;
}

export interface ScopeLiteral {
  subjectUri: string;
  subjectLabel: string;
  predicate: string;
  predicateLabel: string;
  value: string;
  datatype?: string;
  language?: string;
}

export interface InViewScope {
  instances: ScopeEntity[];
  classes: ScopeEntity[];
  predicates: ScopeEntity[];
  literals: ScopeLiteral[];
}

export type ClipboardItemKind = "instance" | "class" | "predicate" | "literal";

export interface ClipboardItem {
  key: string;
  kind: ClipboardItemKind;
  label: string;
  uri?: string; // instance / class / predicate
  subjectUri?: string; // literal
  subjectLabel?: string; // literal
  predicate?: string; // literal
  datatype?: string; // literal
  language?: string; // literal
  value?: string; // literal
}

export const EMPTY_URI_SET: ReadonlySet<string> = new Set();

/**
 * Every URI "in play" for what's currently rendered: each visible box/point plus everything its
 * hover tooltip or own box surfaces (connection points, properties, group memberships,
 * instrumentation targets) — and, for connection arrows, every real equipment/CP/hub URI
 * hierarchy.ts's projectEdges folded into that arrow (ProjectedEdge.raw), so a single "rolled up"
 * dashed line still contributes everything it stands for even though only its two visible
 * endpoints are actually drawn. This is the URI set the four dropdowns below are built from — not
 * just the strictly-rendered node set, since predicates/literals live one hop out from a box, on
 * the RDF nodes a box's own fields reference (its CPs, properties, etc).
 */
function collectBackingUris(model: S223Model, visibleUris: Set<string>, extraUris: ReadonlySet<string>): Set<string> {
  const backing = new Set<string>();
  const add = (uri: string | undefined) => {
    if (uri) backing.add(uri);
  };

  for (const uri of new Set([...visibleUris, ...extraUris])) {
    add(uri);
    const n = model.nodes.get(uri);
    if (!n) continue;
    for (const cpUri of n.connectionPoints) {
      add(cpUri);
      model.connectionPoints.get(cpUri)?.mapsTo.forEach(add);
    }
    for (const pUri of n.properties) {
      add(pUri);
      model.properties.get(pUri)?.mapsTo.forEach(add);
    }
    n.groupMemberships.forEach(add);
    for (const link of n.instrumentationLinks) add(link.targetUri);
  }

  for (const pe of projectEdges(model, visibleUris)) {
    for (const raw of pe.raw) {
      add(raw.hubUri);
      add(raw.fromCPUri);
      add(raw.toCPUri);
      add(raw.fromEquipmentUri);
      add(raw.toEquipmentUri);
      for (const propUri of raw.properties) {
        add(propUri);
        model.properties.get(propUri)?.mapsTo.forEach(add);
      }
    }
  }

  return backing;
}

/** Builds the four dropdown lists (instances/classes/predicates/literals) from every RDF triple
 * whose subject is "in view" per collectBackingUris above. Literals keep their raw RDF form
 * (value + datatype/language), not the app's formatted display strings, so they stay usable as
 * real query filter values later. */
export function computeInViewScope(
  graph: RdfGraph,
  model: S223Model,
  visibleUris: Set<string>,
  extraUris: ReadonlySet<string> = EMPTY_URI_SET,
): InViewScope {
  const backing = collectBackingUris(model, visibleUris, extraUris);

  const instances = new Map<string, ScopeEntity>();
  const classes = new Map<string, ScopeEntity>();
  const predicates = new Map<string, ScopeEntity>();
  const literals: ScopeLiteral[] = [];
  const seenLiterals = new Set<string>();

  for (const uri of backing) {
    const rn = graph.nodes.get(uri);
    if (!rn) continue;
    instances.set(uri, { uri, label: rn.label });

    if (rn.types.length > 0) predicates.set(RDF_TYPE, { uri: RDF_TYPE, label: "type" });
    for (const typeUri of rn.types) {
      if (!classes.has(typeUri)) {
        classes.set(typeUri, { uri: typeUri, label: graph.nodes.get(typeUri)?.label ?? localName(typeUri) });
      }
    }

    if (rn.label && rn.label !== rn.localName) {
      const litKey = `${uri}::${RDFS_LABEL}::${rn.label}`;
      if (!seenLiterals.has(litKey)) {
        seenLiterals.add(litKey);
        literals.push({ subjectUri: uri, subjectLabel: rn.label, predicate: RDFS_LABEL, predicateLabel: "label", value: rn.label });
      }
    }

    for (const prop of rn.properties) {
      if (prop.isLiteral) {
        const litKey = `${uri}::${prop.predicate}::${prop.object}::${prop.datatype ?? ""}::${prop.language ?? ""}`;
        if (seenLiterals.has(litKey)) continue;
        seenLiterals.add(litKey);
        literals.push({
          subjectUri: uri,
          subjectLabel: rn.label,
          predicate: prop.predicate,
          predicateLabel: localName(prop.predicate),
          value: prop.object,
          datatype: prop.datatype,
          language: prop.language,
        });
      } else if (!predicates.has(prop.predicate)) {
        predicates.set(prop.predicate, { uri: prop.predicate, label: localName(prop.predicate) });
      }
    }
  }

  const byLabel = (a: ScopeEntity, b: ScopeEntity) => a.label.localeCompare(b.label);
  return {
    instances: [...instances.values()].sort(byLabel),
    classes: [...classes.values()].sort(byLabel),
    predicates: [...predicates.values()].sort(byLabel),
    literals: literals.sort((a, b) => a.subjectLabel.localeCompare(b.subjectLabel) || a.predicateLabel.localeCompare(b.predicateLabel)),
  };
}

export function entityClipboardItem(kind: "instance" | "class" | "predicate", entity: ScopeEntity): ClipboardItem {
  return { key: `${kind}::${entity.uri}`, kind, label: entity.label, uri: entity.uri };
}

export function literalClipboardItem(lit: ScopeLiteral): ClipboardItem {
  return {
    key: `literal::${lit.subjectUri}::${lit.predicate}::${lit.value}::${lit.datatype ?? ""}::${lit.language ?? ""}`,
    kind: "literal",
    label: `${lit.subjectLabel} · ${lit.predicateLabel} = "${lit.value}"`,
    subjectUri: lit.subjectUri,
    subjectLabel: lit.subjectLabel,
    predicate: lit.predicate,
    datatype: lit.datatype,
    language: lit.language,
    value: lit.value,
  };
}
