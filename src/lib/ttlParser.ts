import { Parser, type Quad } from "n3";
import type { PrefixMap, ParseStats, RdfEdge, RdfGraph, RdfNode } from "../types/rdf";

const RDF_TYPE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
const RDFS_LABEL = "http://www.w3.org/2000/01/rdf-schema#label";

function splitNamespace(uri: string): { namespace: string; localName: string } {
  const hashIdx = uri.lastIndexOf("#");
  if (hashIdx !== -1) {
    return { namespace: uri.slice(0, hashIdx + 1), localName: uri.slice(hashIdx + 1) };
  }
  const slashIdx = uri.lastIndexOf("/");
  if (slashIdx !== -1) {
    return { namespace: uri.slice(0, slashIdx + 1), localName: uri.slice(slashIdx + 1) };
  }
  return { namespace: "", localName: uri };
}

function getOrCreateNode(nodes: Map<string, RdfNode>, uri: string): RdfNode {
  let node = nodes.get(uri);
  if (!node) {
    const { namespace, localName } = splitNamespace(uri);
    node = { uri, types: [], label: localName, localName, namespace, properties: [] };
    nodes.set(uri, node);
  }
  return node;
}

/**
 * Parses Turtle text into a normalized RdfGraph, canonicalized to full URIs.
 * Synchronous — fine for files in the low tens of MB; a multi-MB file loaded on
 * the main thread could jank, but that's a later-phase concern (Web Worker).
 */
export function parseTtl(text: string): { graph: RdfGraph; stats: ParseStats } {
  const start = performance.now();
  const prefixes: PrefixMap = {};
  const nodes = new Map<string, RdfNode>();
  const edges: RdfEdge[] = [];
  let tripleCount = 0;

  const parser = new Parser({ format: "text/turtle" });
  const quads = parser.parse(text, undefined, (prefix, iri) => {
    prefixes[prefix] = iri.value;
  }) as Quad[];

  for (const quad of quads) {
    const subject = quad.subject;
    if (subject.termType !== "NamedNode" && subject.termType !== "BlankNode") continue;
    tripleCount++;

    const subjectUri = subject.value;
    const subjectNode = getOrCreateNode(nodes, subjectUri);
    const predicate = quad.predicate.value;
    const object = quad.object;

    if (predicate === RDF_TYPE && object.termType === "NamedNode") {
      subjectNode.types.push(object.value);
      continue;
    }

    if (predicate === RDFS_LABEL && object.termType === "Literal") {
      subjectNode.label = object.value;
      continue;
    }

    if (object.termType === "NamedNode" || object.termType === "BlankNode") {
      edges.push({ source: subjectUri, target: object.value, predicate });
      getOrCreateNode(nodes, object.value);
      subjectNode.properties.push({ predicate, object: object.value, isLiteral: false });
    } else if (object.termType === "Literal") {
      subjectNode.properties.push({
        predicate,
        object: object.value,
        isLiteral: true,
        language: object.language || undefined,
        datatype: object.datatype?.value,
      });
    }
  }

  const parseTimeMs = performance.now() - start;
  return {
    graph: { nodes, edges, prefixes },
    stats: { tripleCount, nodeCount: nodes.size, edgeCount: edges.length, parseTimeMs },
  };
}
