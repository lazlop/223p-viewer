export const S223 = "http://data.ashrae.org/standard223#";
export const QUDT = "http://qudt.org/schema/qudt/";
export const UNIT = "http://qudt.org/vocab/unit/";
export const QUANTITY_KIND = "http://qudt.org/vocab/quantitykind/";
export const RDFS = "http://www.w3.org/2000/01/rdf-schema#";
export const XSD = "http://www.w3.org/2001/XMLSchema#";

export const s223 = (localName: string) => `${S223}${localName}`;

// Predicates
export const P = {
  contains: s223("contains"),
  hasMember: s223("hasMember"),
  encloses: s223("encloses"),
  hasConnectionPoint: s223("hasConnectionPoint"),
  hasBoundaryConnectionPoint: s223("hasBoundaryConnectionPoint"),
  hasOptionalConnectionPoint: s223("hasOptionalConnectionPoint"),
  isConnectionPointOf: s223("isConnectionPointOf"),
  cnx: s223("cnx"),
  connectsThrough: s223("connectsThrough"),
  hasProperty: s223("hasProperty"),
  hasMedium: s223("hasMedium"),
  hasValue: s223("hasValue"),
  hasEnumerationKind: s223("hasEnumerationKind"),
  mapsTo: s223("mapsTo"),
  hasQuantityKind: `${QUDT}hasQuantityKind`,
  hasUnit: `${QUDT}hasUnit`,
  observes: s223("observes"),
  hasObservationLocation: s223("hasObservationLocation"),
  hasPhysicalLocation: s223("hasPhysicalLocation"),
  actuatedByProperty: s223("actuatedByProperty"),
  hasInput: s223("hasInput"),
  hasOutput: s223("hasOutput"),
  executes: s223("executes"),
  hasDomainSpace: s223("hasDomainSpace"),
  actuates: s223("actuates"),
};

// Types
export const T = {
  InletConnectionPoint: s223("InletConnectionPoint"),
  OutletConnectionPoint: s223("OutletConnectionPoint"),
  BidirectionalConnectionPoint: s223("BidirectionalConnectionPoint"),
  Connection: s223("Connection"),
  Conductor: s223("Conductor"),
  // Verified against the published ontology (data.ashrae.org/BACnet/223p/223p.ttl): Duct and
  // Pipe are rdfs:subClassOf s223:Connection, same as Conductor — all three are physical carrier
  // hubs that should collapse into a connection arrow, not render as their own box.
  Duct: s223("Duct"),
  Pipe: s223("Pipe"),
  System: s223("System"),
  PhysicalSpace: s223("PhysicalSpace"),
  DomainSpace: s223("DomainSpace"),
  Zone: s223("Zone"),
};

export function localName(uri: string): string {
  const hashIdx = uri.lastIndexOf("#");
  if (hashIdx !== -1) return uri.slice(hashIdx + 1);
  const slashIdx = uri.lastIndexOf("/");
  return slashIdx !== -1 ? uri.slice(slashIdx + 1) : uri;
}
