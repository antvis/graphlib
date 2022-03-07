import Graph from '../Graph';

export class CycleException extends Error {}

function topsort<NodeType>(graph: Graph<NodeType>) {
  var visited = new Set<NodeType>();
  var stack = new Set<NodeType>();
  var results: NodeType[] = [];

  function visit(node: NodeType) {
    if (stack.has(node)) {
      throw new CycleException();
    }

    if (!visited.has(node)) {
      stack.add(node);
      visited.add(node);
      graph.predecessors(node)?.forEach(visit);
      stack.delete(node);
      results.push(node);
    }
  }
  graph.sinks().forEach(visit);

  if (visited.size !== graph.nodeCount()) {
    throw new CycleException();
  }

  return results;
}

export default topsort;
