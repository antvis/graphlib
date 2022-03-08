import Graph, { DefaultEdgeType } from '../Graph';
import PriorityQueue from '../PriorityQueue';

const DEFAULT_WEIGHT_FUNC = () => 1;

const dijkstra = <NodeIDType, EdgeType>(
  graph: Graph<NodeIDType, any, EdgeType>,
  source: NodeIDType,
  weightFn?: (node: DefaultEdgeType<NodeIDType, EdgeType>) => number,
  edgeFn?: (node: NodeIDType) => DefaultEdgeType<NodeIDType, EdgeType>[],
) => {
  return runDijkstra<NodeIDType, EdgeType>(
    graph,
    source,
    weightFn || DEFAULT_WEIGHT_FUNC,
    edgeFn ||
      function (v: NodeIDType) {
        return graph.outEdges(v)!;
      },
  );
};

type Entry<NodeIDType> = {
  distance: number;
  predecessor?: NodeIDType;
};

const runDijkstra = <NodeIDType, EdgeType>(
  graph: Graph<NodeIDType, any, EdgeType>,
  source: NodeIDType,
  weightFn: (node: DefaultEdgeType<NodeIDType, EdgeType>) => number,
  edgeFn: (node: NodeIDType) => DefaultEdgeType<NodeIDType, EdgeType>[],
) => {
  const results: Record<string, Entry<NodeIDType>> = {};
  const pq = new PriorityQueue<NodeIDType>();
  let v: NodeIDType | undefined;
  let vEntry: Entry<NodeIDType> | undefined;

  var updateNeighbors = function (edge: DefaultEdgeType<NodeIDType, EdgeType>) {
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
