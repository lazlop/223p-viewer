import type { RdfGraph } from "../types/rdf";
import type { S223Model } from "../types/s223";

const RDFS_MEMBER = "http://www.w3.org/2000/01/rdf-schema#member";

/**
 * A bschema-members file is a set of `bs:Class a rdf:Seq ; rdfs:member <instance>, <instance> ...`
 * blocks — one rdf:Seq per bschema class, listing the real graph entities that class summarizes.
 * Literal-valued members (bs:Literal_* classes summarizing label/value strings, not entities) never
 * reach here: ttlParser only records an `rdfs:member` triple as a graph edge when its object is a
 * NamedNode/BlankNode, so they're already filtered out.
 */
export function parseBschemaMembers(graph: RdfGraph): Map<string, string[]> {
  const members = new Map<string, string[]>();
  for (const edge of graph.edges) {
    if (edge.predicate !== RDFS_MEMBER) continue;
    if (!members.has(edge.source)) members.set(edge.source, []);
    members.get(edge.source)!.push(edge.target);
  }
  return members;
}

/**
 * Where a bschema member URI actually lives in the (separately parsed) real building model: itself,
 * if it's a container/hub node already; its owning equipment, if it's a ConnectionPoint; or the
 * equipment/space that `hasProperty`'d it, if it's a Property. Returns undefined for a member that
 * doesn't resolve to anything navigable in Equipment view (e.g. an ExternalReference).
 */
export function resolveMemberOwner(model: S223Model, memberUri: string): string | undefined {
  if (model.nodes.has(memberUri)) return memberUri;
  const cp = model.connectionPoints.get(memberUri);
  if (cp) return cp.ownerUri;
  if (model.properties.has(memberUri)) {
    for (const node of model.nodes.values()) {
      if (node.properties.includes(memberUri)) return node.uri;
    }
  }
  return undefined;
}

/** Best-effort human label for a member URI, checked across all three model maps. */
export function labelForMember(model: S223Model, memberUri: string): string {
  return (
    model.nodes.get(memberUri)?.label ??
    model.connectionPoints.get(memberUri)?.label ??
    model.properties.get(memberUri)?.label ??
    memberUri.slice(Math.max(memberUri.lastIndexOf("#"), memberUri.lastIndexOf("/")) + 1)
  );
}
