import Graph, { DefaultEdgeType } from '../Graph';
import PriorityQueue from '../PriorityQueue';

const prim = <NodeType, EdgeType>(
  graph: Graph<NodeType, EdgeType>,
  weightFn: (node: DefaultEdgeType<NodeType, EdgeType>) => number,
) => {
  const result = new Graph<NodeType, EdgeType>();
  const parents = new Map<NodeType, NodeType>();
  const pq = new PriorityQueue<NodeType>();
  let v: NodeType;

  function updateNeighbors(edge: DefaultEdgeType<NodeType, EdgeType>) {
    const w = edge.v === v ? edge.w : edge.v;
    const pri = pq.priority(w);
    if (pri !== undefined) {
      const edgeWeight = weightFn(edge);
      if (edgeWeight < pri) {
        parents.set(w, v);
        pq.decrease(w, edgeWeight);
      }
    }
  }

  if (graph.nodeCount() === 0) {
    return result;
  }

  graph.nodes().forEach((node) => {
    pq.add(node, Number.POSITIVE_INFINITY);
    result.setNode(node);
  });

  // Start from an arbitrary node
  pq.decrease(graph.nodes()[0], 0);

  let init = false;
  while (pq.size() > 0) {
    v = pq.removeMin()!;
    
    if (parents.has(v)) {
      result.setEdge(v, parents.get(v)!);
    } else if (init) {
      throw new Error('Input graph is not connected: ' + graph.graph());
    } else {
      init = true;
    }

    graph.nodeEdges(v)?.forEach(updateNeighbors);
  }

  return result;
};

export default prim;
