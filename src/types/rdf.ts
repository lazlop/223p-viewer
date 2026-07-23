export interface PrefixMap {
  [prefix: string]: string;
}

export interface RdfProperty {
  predicate: string; // full URI
  object: string; // full URI (if relationship) or literal value
  isLiteral: boolean;
  language?: string;
  datatype?: string;
}

export interface RdfNode {
  uri: string; // full URI, canonical key
  types: string[]; // full URIs from rdf:type
  label: string; // rdfs:label if present, else local name
  localName: string;
  namespace: string;
  properties: RdfProperty[]; // every non-type, non-label triple where this node is the subject
}

export interface RdfEdge {
  source: string;
  target: string;
  predicate: string; // full URI
}

export interface RdfGraph {
  nodes: Map<string, RdfNode>;
  edges: RdfEdge[];
  prefixes: PrefixMap; // prefixes as declared in the source file(s), for CURIE display only
}

export interface ParseStats {
  tripleCount: number;
  nodeCount: number;
  edgeCount: number;
  parseTimeMs: number;
}
