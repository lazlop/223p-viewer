export type CPKind = "Inlet" | "Outlet" | "Bidirectional" | "Other";

export interface PropertyRef {
  uri: string;
  label: string;
  typeName?: string;
  value?: string;
  quantityKind?: string;
  unit?: string; // local name, e.g. DEG_F
  unitSymbol?: string;
  enumerationKind?: string;
  mapsTo: string[]; // uris of mapped properties/points (external references)
}

export interface ConnectionPointRef {
  uri: string;
  label: string;
  kind: CPKind;
  medium?: string;
  ownerUri?: string; // equipment/system/space that owns it via hasConnectionPoint — the first claim seen; see ownerUris
  // Every distinct owner that claims this CP via hasConnectionPoint/hasBoundaryConnectionPoint/
  // hasOptionalConnectionPoint/isConnectionPointOf, in first-seen order (ownerUri is ownerUris[0]).
  // In a real building model a CP has exactly one true owner, so this is almost always length <= 1.
  // A bschema class graph is different: bschema-rs buckets many distinct real connection points —
  // each with its own real owner — into one summary ConnectionPoint node whenever they look alike,
  // so the same bschema CP can legitimately be `isConnectionPointOf` a dozen different bschema
  // classes at once. connectionTopology.ts pairs across every owner on each side (not just the
  // first) so those classes still show as connected instead of silently losing 2..n-1 of their
  // real connections to whichever owner was encountered first.
  ownerUris: string[];
  mapsTo: string[]; // uris of corresponding connection points (e.g. an internal CP mapped to its parent's boundary CP)
}

export type ChildRelation = "contains" | "encloses" | "functional";

// The "instrumentation" layer: how a Sensor/Actuator/Function relates to a Property it senses or
// drives, a location it observes, or (for Functions) the equipment that executes it. targetUri is
// a property uri, connection-point uri, or container-node uri depending on the relation.
export type InstrumentationRelation =
  | "observes"
  | "actuatedByProperty"
  | "hasInput"
  | "hasOutput"
  | "hasObservationLocation"
  | "hasPhysicalLocation"
  | "actuates"
  | "executedBy";

export interface InstrumentationLink {
  relation: InstrumentationRelation;
  targetUri: string;
}

export interface ModelNode {
  uri: string;
  label: string;
  typeUri?: string;
  typeName?: string;
  connectionPoints: string[]; // uris into S223Model.connectionPoints
  properties: string[]; // uris into S223Model.properties
  children: { uri: string; via: ChildRelation }[];
  parentUri?: string;
  instrumentationLinks: InstrumentationLink[];
  // Logical groups (s223:System via hasMember, s223:Zone via hasDomainSpace) this node belongs
  // to. Both are arbitrary groupings that can cross equipment/space boundaries, so membership
  // doesn't imply physical containment the way contains/encloses does. Surfaced as hover text
  // rather than a drill-in relationship; see modelBuilder.ts's isLogicalGroupNode.
  groupMemberships: string[]; // uris into S223Model.nodes
}

export interface ConnectionEdge {
  id: string;
  hubUri: string;
  hubLabel: string;
  medium?: string;
  fromEquipmentUri: string;
  fromCPUri: string;
  toEquipmentUri: string;
  toCPUri: string;
  properties: string[]; // hub-level property uris
}

export interface S223Model {
  nodes: Map<string, ModelNode>;
  connectionPoints: Map<string, ConnectionPointRef>;
  properties: Map<string, PropertyRef>;
  edges: ConnectionEdge[];
  roots: string[];
}
