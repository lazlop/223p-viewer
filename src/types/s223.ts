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
  ownerUri?: string; // equipment/system/space that owns it via hasConnectionPoint
  mapsTo: string[]; // uris of corresponding connection points (e.g. an internal CP mapped to its parent's boundary CP)
}

export type ChildRelation = "contains" | "hasMember" | "encloses" | "functional";

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
  // Systems this node is s223:hasMember of, but only ones NOT being treated as a physical
  // container (see ModelNode.systemRendersAsBox) — a System is an arbitrary logical grouping that
  // can cross equipment boundaries, so membership in one doesn't imply physical containment.
  // Surfaced as hover text rather than a drill-in relationship.
  systemMemberships: string[]; // uris into S223Model.nodes
  // Only meaningful when typeUri is s223:System: true when the System should render as its own
  // box with real children (an explicit s223:hasBoundaryConnectionPoint, or — in inferred mode —
  // topology showing a member wired to equipment outside the system, and no single container most
  // of its members already live inside). False means it's treated as purely logical.
  systemRendersAsBox: boolean;
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
