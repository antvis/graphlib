import Graph, { DefaultEdgeType } from '../Graph';
import PriorityQueue from '../PriorityQueue';

const DEFAULT_WEIGHT_FUNC = () => 1;

const dijkstra = <NodeType, EdgeType>(
  graph: Graph<NodeType, EdgeType>,
  source: NodeType,
  weightFn?: (node: DefaultEdgeType<NodeType, EdgeType>) => number,
  edgeFn?: (node: NodeType) => DefaultEdgeType<NodeType, EdgeType>[],
) => {
  return runDijkstra<NodeType, EdgeType>(
    graph,
    source,
    weightFn || DEFAULT_WEIGHT_FUNC,
    edgeFn ||
      function (v: NodeType) {
        return graph.outEdges(v)!;
      },
  );
};

type Entry<NodeType> = {
  distance: number;
  predecessor?: NodeType;
};

const runDijkstra = <NodeType, EdgeType>(
  graph: Graph<NodeType, EdgeType>,
  source: NodeType,
  weightFn: (node: DefaultEdgeType<NodeType, EdgeType>) => number,
  edgeFn: (node: NodeType) => DefaultEdgeType<NodeType, EdgeType>[],
) => {
  const results: Record<string, Entry<NodeType>> = {};
  const pq = new PriorityQueue<NodeType>();
  let v: NodeType | undefined;
  let vEntry: Entry<NodeType> | undefined;

  var updateNeighbors = function (edge: DefaultEdgeType<NodeType, EdgeType>) {
    const w = edge.v !== v ? edge.v : edge.w;
    const wEntry = results[String(w)]!;
    const weight = weightFn(edge);

    const distance = vEntry!.distance + weight;

    if (weight < 0) {
      throw new Error(
        'dijkstra does not allow negative edge weights. ' +
          'Bad edge: ' +
          edge +
          ' Weight: ' +
          weight,
      );
    }

    if (distance < wEntry.distance) {
      wEntry.distance = distance;
      wEntry.predecessor = v;
      pq.decrease(w, distance);
    }
  };

  graph.nodes().forEach(function (v) {
    const distance = v === source ? 0 : Number.POSITIVE_INFINITY;
    results[String(v)] = { distance: distance };
    pq.add(v, distance);
  });

  while (pq.size() > 0) {
    v = pq.removeMin()!;

    vEntry = results[String(v)];
    if (vEntry && vEntry.distance === Number.POSITIVE_INFINITY) {
      break;
    }
    edgeFn(v).forEach(updateNeighbors);
  }

  return results;
};

export default dijkstra;
